#!/bin/bash
# Pre-commit: run regression + smoke tests against local dev server
# Usage: bash scripts/pre-commit-test.sh
# Exits 0 if all pass, 1 if any fail

set -e

cd "$(dirname "$0")/../apps/web"

echo "🧪 Running SandSync regression tests..."

npx playwright test e2e/regression.spec.ts e2e/story-flow.spec.ts e2e/powersync.spec.ts \
  --reporter=list \
  "$@"

echo ""
echo "🧪 Running SandSync API tests..."
cd "$(dirname "$0")/../apps/api"
bun test src/__tests__/api.test.ts
echo "✅ API tests passed."

echo ""
echo "✅ All tests passed — safe to commit."
