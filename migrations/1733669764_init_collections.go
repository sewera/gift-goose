package migrations

import (
	"errors"
	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
	"github.com/pocketbase/pocketbase/tools/types"
	"github.com/sewera/gift-goose/log"
)

func init() {
	m.Register(func(app core.App) error {
		desiresCollection, _ := app.FindCollectionByNameOrId("desires")
		if desiresCollection == nil {
			desiresCollection = core.NewBaseCollection("desires")
			desiresCollection.ViewRule = types.Pointer("")
			desiresCollection.UpdateRule = types.Pointer("@request.headers.x_participant_id = participants_via_desire.id")
			id := desiresCollection.Fields.GetByName("id").(*core.TextField)
			id.AutogeneratePattern = "[A-Z]{3}"
			id.Pattern = "^[A-Z]{3}$"
			id.Min = 3
			id.Max = 3
			desiresCollection.Fields.Add(&core.TextField{
				Name:     "wants",
				Required: false,
			})
		}
		err := app.SaveNoValidate(desiresCollection)
		if err != nil {
			return err
		}
		log.Info("desires collection initialized")

		participantsCollection, _ := app.FindCollectionByNameOrId("participants")
		if participantsCollection == nil {
			participantsCollection = core.NewBaseCollection("participants")
			participantsCollection.ListRule = types.Pointer(`@request.headers.x_participant_id = "0000" && @request.headers.x_admin_key = "2137"`)
			participantsCollection.ViewRule = types.Pointer("")
			participantsCollection.UpdateRule = types.Pointer(`@request.headers.x_participant_id = "0000" && @request.headers.x_admin_key = "2137"`)

			id := participantsCollection.Fields.GetByName("id").(*core.TextField)
			id.AutogeneratePattern = "[0-9]{4}"
			id.Pattern = "^[0-9]{4}$"
			id.Min = 4
			id.Max = 4

			participantsCollection.Fields.Add(&core.TextField{
				Name: "name",
			})

			participantsCollection.Fields.Add(&core.RelationField{
				Name:          "assignedReceiver",
				CascadeDelete: false,
				MinSelect:     0,
				MaxSelect:     1,
				CollectionId:  participantsCollection.Id,
			})

			participantsCollection.Fields.Add(&core.RelationField{
				Name:          "desire",
				CascadeDelete: false,
				MinSelect:     0,
				MaxSelect:     1,
				CollectionId:  desiresCollection.Id,
			})

			participantsCollection.Fields.Add(&core.BoolField{
				Name: "exclude",
			})
		}

		err = app.SaveNoValidate(participantsCollection)
		if err != nil {
			return err
		}
		log.Info("participants collection initialized")
		return nil
	}, func(app core.App) error {
		participantsCollection, _ := app.FindCollectionByNameOrId("participants")
		desiresCollection, _ := app.FindCollectionByNameOrId("desires")

		var err1, err2 error
		if participantsCollection != nil {
			err1 = app.Delete(participantsCollection)
		}
		if desiresCollection != nil {
			err2 = app.Delete(desiresCollection)
		}
		return errors.Join(err1, err2)
	})
}
