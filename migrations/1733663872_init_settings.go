package migrations

import (
	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
	"github.com/sewera/gift-goose/log"
)

func init() {
	m.Register(func(app core.App) error {
		settings := app.Settings()
		settings.Meta.AppName = "Gift Goose"
		log.Info("settings initialized")
		return nil
	}, func(app core.App) error {
		return nil
	})
}
