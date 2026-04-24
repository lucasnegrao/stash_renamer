#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
UI_DIR="$ROOT_DIR/ui"
DIST_DIR="$ROOT_DIR/dist"
TARGET_REPO_URL="https://github.com/lucasnegrao/stashero-repo.git"
TARGET_REPO_DIR="${TARGET_REPO_DIR:-/tmp/stashero-repo}"
TARGET_PLUGIN_DIR="plugins/stashero"
TARGET_BRANCH="${TARGET_BRANCH:-main}"

log() {
  printf '[publish] %s\n' "$1"
}

if [[ ! -d "$UI_DIR" ]]; then
  echo "UI directory not found: $UI_DIR" >&2
  exit 1
fi

log "Running UI pipeline: npm run pau"
(
  cd "$UI_DIR"
  npm run pau
)

log "Building dist via build_dist.py"
(
  cd "$ROOT_DIR"
  python3 build_dist.py
)

if [[ ! -d "$DIST_DIR" ]]; then
  echo "Dist directory not found after build: $DIST_DIR" >&2
  exit 1
fi

if [[ -d "$TARGET_REPO_DIR/.git" ]]; then
  log "Using existing target repo at $TARGET_REPO_DIR"
  (
    cd "$TARGET_REPO_DIR"
    git fetch origin
    git checkout "$TARGET_BRANCH"
    git pull --ff-only origin "$TARGET_BRANCH"
  )
else
  log "Cloning target repo to $TARGET_REPO_DIR"
  rm -rf "$TARGET_REPO_DIR"
  git clone "$TARGET_REPO_URL" "$TARGET_REPO_DIR"
  (
    cd "$TARGET_REPO_DIR"
    git checkout "$TARGET_BRANCH"
  )
fi

log "Resetting cloned repo working tree (keeping .git only)"
find "$TARGET_REPO_DIR" -mindepth 1 -maxdepth 1 ! -name ".git" -exec rm -rf {} +

log "Syncing dist to $TARGET_PLUGIN_DIR"
mkdir -p "$TARGET_REPO_DIR/$TARGET_PLUGIN_DIR"
rsync -av --delete "$DIST_DIR/" "$TARGET_REPO_DIR/$TARGET_PLUGIN_DIR/"

log "Committing and pushing changes"
(
  cd "$TARGET_REPO_DIR"
  git add "$TARGET_PLUGIN_DIR"
  if git diff --cached --quiet; then
    log "No changes to commit."
    exit 0
  fi

  git commit -m "Update stashero plugin distribution"
  git push origin "$TARGET_BRANCH"
)

log "Publish completed successfully."
