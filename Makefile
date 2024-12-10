GO:=$(shell go version 2>/dev/null)

PB_SRC=pocketbase.go
PB_EXE=pocketbase

UI=ui
UI_STATIC=public
DIST=dist

BACKEND_CONFIG=app.config.json
EXAMPLE_BACKEND_CONFIG=app.config.example.json

FRONTEND_CONFIG_FILENAME=app.config.js
FRONTEND_CONFIG=$(UI)/$(UI_STATIC)/$(FRONTEND_CONFIG_FILENAME)
EXAMPLE_FRONTEND_CONFIG_FILENAME=app.config.example.js
EXAMPLE_FRONTEND_CONFIG=$(UI)/$(EXAMPLE_FRONTEND_CONFIG_FILENAME)

.DEFAULT_GOAL := workspace
.PHONY: workspace print-help-ui print-help-go deps copy-example-config start dev pb vite clean-config clean build ui-build test test-update cp s d v cc c b t tu

cp: copy-example-config
s: start
d: dev
v: vite
cc: clean-config
c: clean
b: build
t: test
tu: test-update

workspace: print-help-ui print-help-go deps copy-example-config

print-help-ui:
ifneq ($(NVM_DIR),"")
	@echo '> nvm installed, run `nvm install` and `nvm use` in your shell'
else ifneq ("$(wildcard $(HOME)/.nvm/nvm.sh)","")
	@echo '> nvm installed, run `nvm install` and `nvm use` in your shell'
else
$(error nvm not installed, consider installing it or install latest LTS node.js manually)
endif

print-help-go:
ifdef GO
	@echo "> go installed"
	@echo "> $(shell go version)"
else
$(error go not installed, install version specified in 'go.mod' or later)
endif

deps: deps-ui deps-go

deps-ui:
	@cd ui; npm install
	@echo "> deps for ui installed"

deps-go:
	@go mod download
	@echo "> deps for go installed"

copy-example-config: $(BACKEND_CONFIG) $(FRONTEND_CONFIG)

$(BACKEND_CONFIG):
	@cp $(EXAMPLE_BACKEND_CONFIG) $(BACKEND_CONFIG)

$(FRONTEND_CONFIG):
	@cp $(EXAMPLE_FRONTEND_CONFIG) $(FRONTEND_CONFIG)

start: build
	@$(MAKE) pb

dev: pb vite # remember to start with -j2 (`make -j2 dev`)

pb: $(PB_EXE)
	@echo "> starting $(PB_EXE)"
	@./$(PB_EXE) serve-from-config

vite: $(FRONTEND_CONFIG)
	@echo "> starting Vite in dev mode"
	@cd ui; npm run dev

clean-config:
	@rm -f $(BACKEND_CONFIG) $(FRONTEND_CONFIG)

clean:
	@rm -f $(PB_EXE)
	@rm -rf $(UI)/$(DIST)
	@echo "> build files cleaned"

build: ui-build $(PB_EXE)

build-with-gift-prefix: ui-build-with-gift-prefix $(PB_EXE)

$(PB_EXE): $(PB_SRC)
	@go build -o $(PB_EXE) $(PB_SRC)
	@echo "> $(PB_EXE) built"

ui-build: $(FRONTEND_CONFIG)
	@cd ui; npm run build
	@echo "> $(UI)/$(DIST) built"

ui-build-with-gift-prefix: $(FRONTEND_CONFIG)
	@cd ui; npm run buildWithGiftPrefix
	@echo "> $(UI)/$(DIST) built with gift prefix"

test:
	@cd ui; npm run test

test-update:
	@cd ui; npm run test:update

archive: copy-example-config build
	tar --exclude="ui/node_modules" --exclude="gift-goose-dist.tar" --exclude=".git" -cvf gift-goose-dist.tar ./
