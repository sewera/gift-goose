package main

import (
	"encoding/json"
	"errors"
	"log"
	"os"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/cmd"
	"github.com/pocketbase/pocketbase/core"
)

func main() {
	setLogger()

	app := NewApp()
	app.setHostFromJSON()
	app.serveStatic()
	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}

func setLogger() {
	log.Default().SetFlags(0)
}

func logWarn(msg string) {
	log.Default().Println(">> warn: " + msg)
}

func logInfo(msg string) {
	log.Default().Println(">> info: " + msg)
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
	serve.PersistentFlags().Set("http", getHostFromJSONOrReturnDefault())
	a.RootCmd.AddCommand(serve)
}

func getHostFromJSONOrReturnDefault() string {
	file := "app.config.json"

	warnAndReturnDefault := func() string {
		defaultHost := "localhost:8090"
		logWarn("cannot read " + file + ", falling back to default host: " + defaultHost + ".")
		return defaultHost
	}

	data, err := os.ReadFile(file)
	if err != nil {
		return warnAndReturnDefault()
	}

	var config *struct {
		PBHost string `json:"pbHost"`
	}
	err = json.Unmarshal(data, &config)
	if err != nil {
		return warnAndReturnDefault()
	}
	return config.PBHost
}

// serveStatic serves the compiled ui files
// from "ui/dist" on the root path ("/")
func (a *App) serveStatic() {
	staticServePath := "/*"
	uiDist := "ui/dist"
	a.OnServe().BindFunc(func(serveEvent *core.ServeEvent) error {
		if err := checkForUIDist(uiDist); err != nil {
			logWarn("ui/dist: " + err.Error())
			return serveEvent.Next()
		}
		logInfo("ui/dist: serving at " + staticServePath)
		serveEvent.Router.GET(staticServePath, apis.Static(os.DirFS(uiDist), true))
		return serveEvent.Next()
	})
}

func checkForUIDist(path string) error {
	if _, err := os.Stat(path); errors.Is(err, os.ErrNotExist) {
		return errors.New("not compiled: " + path + " directory not found (try to run `make build`)")
	}
	return nil
}
