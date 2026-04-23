#!/usr/bin/env python3
"""Build distributable plugin package into ./dist.

Rules:
- Ensure dist/ exists.
- Rebuild dist from scratch each run.
- Copy backend/ excluding __pycache__ and .pyc files.
- Copy all root-level *.py files.
- Copy root requirements.txt.
- Copy stash_renamer.yml but rewrite ui javascript path to ui/bundle.js.
- Copy ui/dist/bundle.js to dist/ui/bundle.js.
"""

from __future__ import annotations

import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parent
DIST = ROOT / "dist"
BACKEND_SRC = ROOT / "backend"
BACKEND_DST = DIST / "backend"
UI_BUNDLE_SRC = ROOT / "ui" / "dist" / "bundle.js"
UI_BUNDLE_DST = DIST / "ui" / "bundle.js"
PLUGIN_YML_SRC = ROOT / "stash_renamer.yml"
PLUGIN_YML_DST = DIST / "stash_renamer.yml"
REQUIREMENTS_SRC = ROOT / "requirements.txt"
REQUIREMENTS_DST = DIST / "requirements.txt"


def _ignore_backend(path: str, names: list[str]) -> set[str]:
    ignored: set[str] = set()
    for name in names:
        if name == "__pycache__":
            ignored.add(name)
        if name == ".DS_Store":
            ignored.add(name)
        if name.endswith(".pyc") or name.endswith(".pyo"):
            ignored.add(name)
    return ignored


def _copy_backend() -> None:
    if not BACKEND_SRC.exists():
        raise FileNotFoundError(f"backend directory not found: {BACKEND_SRC}")

    if BACKEND_DST.exists():
        shutil.rmtree(BACKEND_DST)

    shutil.copytree(BACKEND_SRC, BACKEND_DST, ignore=_ignore_backend)


def _copy_root_python_files() -> None:
    for py_file in ROOT.glob("*.py"):
        if py_file.name == Path(__file__).name:
            continue
        shutil.copy2(py_file, DIST / py_file.name)


def _copy_requirements() -> None:
    if not REQUIREMENTS_SRC.exists():
        raise FileNotFoundError(f"requirements file not found: {REQUIREMENTS_SRC}")
    shutil.copy2(REQUIREMENTS_SRC, REQUIREMENTS_DST)


def _rewrite_plugin_yml() -> None:
    if not PLUGIN_YML_SRC.exists():
        raise FileNotFoundError(f"plugin manifest not found: {PLUGIN_YML_SRC}")

    text = PLUGIN_YML_SRC.read_text(encoding="utf-8")
    text = text.replace('"ui/dist/bundle.js"', '"ui/bundle.js"')
    text = text.replace("'ui/dist/bundle.js'", "'ui/bundle.js'")
    text = text.replace("- ui/dist/bundle.js", "- ui/bundle.js")
    PLUGIN_YML_DST.write_text(text, encoding="utf-8")


def _copy_ui_bundle() -> None:
    if not UI_BUNDLE_SRC.exists():
        raise FileNotFoundError(
            "UI bundle not found. Build UI first so ui/dist/bundle.js exists."
        )

    UI_BUNDLE_DST.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(UI_BUNDLE_SRC, UI_BUNDLE_DST)


def build_dist() -> None:
    if DIST.exists():
        shutil.rmtree(DIST)
    DIST.mkdir(parents=True, exist_ok=True)

    _copy_backend()
    _copy_root_python_files()
    _copy_requirements()
    _rewrite_plugin_yml()
    _copy_ui_bundle()


def main() -> int:
    try:
        build_dist()
        print(f"dist prepared at: {DIST}")
        return 0
    except Exception as exc:
        print(f"ERROR: {exc}")
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
