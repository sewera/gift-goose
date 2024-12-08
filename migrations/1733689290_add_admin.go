package migrations

import (
	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		participants, err := app.FindCollectionByNameOrId("participants")
		if err != nil {
			return err
		}
		admin := core.NewRecord(participants)
		admin.Set("id", "0000")
		admin.Set("name", "Admin")
		admin.Set("exclude", true)

		return app.Save(admin)
	}, func(app core.App) error {
		admin, err := app.FindRecordById("participants", "0000")
		if err != nil {
			return err
		}
		return app.Delete(admin)
	})
}
