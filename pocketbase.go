package main

import (
	"errors"
	"github.com/pocketbase/pocketbase/plugins/migratecmd"
	"github.com/sewera/gift-goose/config"
	"github.com/sewera/gift-goose/log"
	"os"
	"strings"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/cmd"
	"github.com/pocketbase/pocketbase/core"

	_ "github.com/sewera/gift-goose/migrations"
)

func main() {
	app := NewApp()
	isGoRun := strings.HasPrefix(os.Args[0], os.TempDir())
	migratecmd.MustRegister(app, app.RootCmd, migratecmd.Config{
		Automigrate: isGoRun,
	})

	app.setHostFromJSON()
	app.serveStatic()
	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}

type App struct {
	*pocketbase.PocketBase
}

func NewApp() *App {
	return &App{
		PocketBase: pocketbase.New(),
	}
}

// setHostFromJSON is equivalent to running
// standard PocketBase with "--http=<host>" flag
func (a *App) setHostFromJSON() {
	serve := cmd.NewServeCommand(a, true)
	serve.Use = "serve-from-config"
	serve.Short = "Starts the web server from JSON config"
	err := serve.PersistentFlags().Set("http", config.GetHostFromJSONOrReturnDefault().Host)
	if err != nil {
		log.Error("failed to set host")
		return
	}
	a.RootCmd.AddCommand(serve)
}

// serveStatic serves the compiled ui files
// from "ui/dist" on the root path ("/")
func (a *App) serveStatic() {
	uiDist := "ui/dist"
	a.OnServe().BindFunc(func(se *core.ServeEvent) error {
		if err := checkForUIDist(uiDist); err != nil {
			log.Warn("ui/dist: " + err.Error())
			return se.Next()
		}
		log.Info("ui/dist: serving at /")
		se.Router.GET("/{path...}", apis.Static(os.DirFS(uiDist), true))
		return se.Next()
	})
}

func checkForUIDist(path string) error {
	if _, err := os.Stat(path); errors.Is(err, os.ErrNotExist) {
		return errors.New("not compiled: " + path + " directory not found (try to run `make build`)")
	}
	return nil
}
