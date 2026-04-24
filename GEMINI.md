# Stash Stashero Plugin

This repository contains a StashApp plugin designed to rename files based on user-defined templates.

## Architecture

The plugin is divided into a Python backend for processing and a React (TypeScript) frontend for the user interface.

### Backend (Python)
- **Entrypoint:** `stashero.py` is invoked directly by StashApp as a plugin, reading JSON input from `stdin`.
- **Core Logic:** `backend/app.py` parses the operational mode from Stash and delegates tasks to specific services (renaming, undoing, saving templates, etc.).
- **Renamer Engine:** `backend/renamer/engine.py` handles the actual execution of renaming tasks.
- **Stash Interaction:** The backend communicates with Stash using GraphQL (`backend/services/graphql.py`) for introspecting tags, performers, studios, and fetching scenes.
- **Templating:** Relies on Liquid templates (`python-liquid` in `requirements.txt`).
- **State/History:** Uses a SQLite database (typically `rename_operations.db` created dynamically) to persist templates, user settings, and renaming history (to support the Undo feature).

### Frontend (React/TypeScript)
- **Location:** Code resides in `ui/src/`.
- **Entrypoint:** `ui/src/main.tsx` utilizes the `PluginApi` to patch the Stash UI. It injects a main navigation button, a settings panel route (`/plugins/stashero`), and tabs for Editor, Results, and Settings.
- **State Management:** Uses a custom service approach (`ui/src/services/renamerRuntimeState.ts`) combined with React Context and standard hooks.
- **Build System:** Webpack bundles the source code into the `ui/dist` folder (or syncs directly to the Stash plugin folder via scripts).
- **Package Manager:** Uses `pnpm` (configured via `ui/package.json` and `ui/pnpm-workspace.yaml`).

## Development Workflow

### UI / Frontend Tools
- **Install:** Navigate to `ui/` and run `pnpm install`.
- **Build:** `pnpm run compile` or `pnpm run build` (Note: the current `package.json` includes custom sync scripts to a remote dev server in `pau`).
- **Linting & Formatting:** The project uses **Biome**. 
  - Run checks: `pnpm run biome:check`
  - Auto-fix: `pnpm run biome:fix`
  - Format only: `pnpm run biome:format`

### Backend Tools
- Python >= 3.8+ is expected.
- Install dependencies via `pip install -r requirements.txt`.

## Conventions
- **Frontend:** Follow strict TypeScript typing. Keep components modularized in `ui/src/components/`, pages in `ui/src/views/`, and reusable logic in `ui/src/hooks/` and `ui/src/utils/`. Do not bypass types using `any` unless absolutely necessary for external integrations.
- **Backend:** Code is neatly modularized into `backend/filter`, `backend/graphql`, `backend/renamer`, `backend/services`, etc. Stick to strong typing (`typing.Dict`, `typing.List`, `typing.Optional`) in Python files.
