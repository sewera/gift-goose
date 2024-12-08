package config

import (
	"encoding/json"
	"github.com/sewera/gift-goose/log"
	"net/url"
	"os"
)

func GetHostFromJSONOrReturnDefault() *url.URL {
	file := "app.config.json"

	warnAndReturnDefault := func() string {
		defaultHost := "localhost:8090"
		log.Warn("cannot read " + file + ", falling back to default host: " + defaultHost + ".")
		return defaultHost
	}

	data, err := os.ReadFile(file)
	if err != nil {
		parsed, err := url.Parse(warnAndReturnDefault())
		if err != nil {
			log.Fatal(err)
		}
		return parsed
	}

	var config *struct {
		PBHost string `json:"pbHost"`
	}
	err = json.Unmarshal(data, &config)
	if err != nil {
		parsed, err := url.Parse(warnAndReturnDefault())
		if err != nil {
			log.Fatal(err)
		}
		return parsed
	}
	parsed, err := url.Parse(config.PBHost)
	if err != nil {
		log.Fatal(err)
	}
	return parsed
}
