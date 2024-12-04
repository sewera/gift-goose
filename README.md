# Pocketbase, Vite, React, and Mantine template

Full-stack application template using Pocketbase as backend,
and Vite + React + Mantine combo as frontend.


## Cheat sheet

- `make` — download all dependencies (see [Workspace setup](#workspace-setup) below);
- `make -j2 d` — full-stack development servers;
- `make t` — ui component unit tests;
- `make tu` — ui component update Jest snapshots;
- `make -j2 b` — build `ui/dist` and Pocketbase simultaneously;
- `make s` — run Pocketbase serving `ui/dist` under `/`;
- `make v` — run only frontend Vite development server;
- `make cp` — copies example config to a working copy and links it to ui;
- `make cc` — cleans all working config files;
- `make c` — clean all dist files (`ui/dist` and `./pocketbase`).


## Prerequisites

- Make:
  - Linux — should be already installed,
    if not, install package:
    [Arch Linux](https://archlinux.org/packages/core/x86_64/make/),
    [Ubuntu](https://packages.ubuntu.com/search?keywords=make&searchon=names),
    [Any distro (pkgs.com)](https://pkgs.org/download/make),
  - macOS — should be already installed,
    an alternative would be:
    [GNU Make for macOS](https://formulae.brew.sh/formula/make),
  - [Windows](https://stackoverflow.com/questions/32127524/how-to-install-and-use-make-in-windows);
- [Go](https://go.dev/dl/) `>=1.18` (`>=1.19` on Windows);
- [Node.js](https://nodejs.org/en/download/) `16.x` or later,
  - Using a node version manager (nvm) is advised:
    - [POSIX (Linux/macOS)](https://github.com/nvm-sh/nvm),
    - [Windows](https://github.com/coreybutler/nvm-windows).


## Quick start

### Workspace setup

After installing prerequisites, you have to set up the workspace.
The following commands will download a proper Node.js,
enable it in the workspace, install [Yarn](https://yarnpkg.com/),
and download all the dependencies, both for ui and Go.

```sh
nvm install  # if using nvm
nvm use      # if using nvm
npm -g i yarn
make
```

### Other commands

The following command will open a dev Vite server
with hot reload, and a Pocketbase server alongside it.

```sh
make -j2 dev
```

or `make -j2 d` for short.

The following will only build and run the Pocketbase executable.

```sh
make pb
```

The following will build the static _dist_ Vite package,
and run a Pocketbase server that serves it under the root path (`/`).

```sh
make start
```

or `make s` for short.

It is an equivalent of:

```sh
make build pb
```

or `make b pb` for short.

The following command will unit test the ui components using [Jest](https://jestjs.io/).

```sh
make test
```

or `make t` for short.

To update the snapshots when running component unit tests, run:

```sh
make test-update
```

or `make tu` for short.

To copy an example config file (`app.config.example.json` to `app.config.json`),
which contains the backend (Pocketbase) host, run:

```sh
make copy-example-config
```

or `make cp` for short.

To clean all working config files, run:

```sh
make clean-config
```

or `make cc` for short.

To clean all dist files, i.e.: `ui/dist` and `./pocketbase`, run:

```sh
make clean
```

or `make c` for short.

### Credentials

| Field | Value               |
| ----- | ------------------- |
| Email | `admin@sewera.dev`  |
| Pass  | `panda-blog-scorer` |

### Default URLs

- Vite DEV server: <http://localhost:3000/>
- Static UI served by Pocketbase: <http://localhost:8090/>
- REST API: <http://localhost:8090/api/>
- Admin UI: <http://localhost:8090/_/>

The Pocketbase URL can be configured in `app.config.json`.
Both backend and frontend will respect this configuration.
See also `make copy-example-config` recipe.


## Further reading

- [The Makefile](./Makefile);
- [Pocketbase documentation](https://pocketbase.io/docs);
- [Pocketbase JS/TS SDK](https://github.com/pocketbase/js-sdk);
- [Vite configuration documentation](https://vitejs.dev/config/);
- [Mantine documentation](https://mantine.dev/pages/getting-started/), especially:
  - [Mantine Core components](https://mantine.dev/core/app-shell/),
  - [MantineProvider](https://mantine.dev/theming/mantine-provider/) — tl;dr:
    It is not required if using the default theme,
  - [Mantine UI component library](https://ui.mantine.dev/);
- [React Router documentation](https://reactrouter.com/en/main), especially:
  - [Link component](https://reactrouter.com/en/main/components/link),
  - [Browser router](https://reactrouter.com/en/main/routers/create-browser-router) — tl;dr:
    Add new paths to [main.tsx](./ui/src/main.tsx);
- [Zustand (store) documentation](https://docs.pmnd.rs/zustand);
- [Jest documentation](https://jestjs.io/docs), especially:
  - [Getting started](https://jestjs.io/docs/getting-started),
  - [Snapshot testing](https://jestjs.io/docs/snapshot-testing);
