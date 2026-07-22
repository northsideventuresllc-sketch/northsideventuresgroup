#!/bin/bash
set -euo pipefail

# Only run in Claude Code on the web (remote) sessions.
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "$CLAUDE_PROJECT_DIR"

# Prefer npm install over npm ci: the container is cached after this hook
# completes, so a mutating install is fine and faster on repeat boots.
npm install
