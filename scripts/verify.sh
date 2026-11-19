#!/usr/bin/env bash
# The one command that decides whether a change is ready. Runs every check the repository
# supports, in order, and stops at the first mandatory check that fails. A check that
# does not exist in this repository is printed as NOT CONFIGURED, never as passed.
#
# Usage: scripts/verify.sh            (needs node_modules: run pnpm install first)
# Env:   VERIFY_PORT   port for the production server used by the browser suites (default 3300)
set -u

cd "$(dirname "$0")/.." || exit 2
PORT="${VERIFY_PORT:-3300}"
NOT_CONFIGURED=()
SERVER_PID=""

cleanup() {
  if [ -n "$SERVER_PID" ]; then
    kill "$SERVER_PID" 2>/dev/null
    wait "$SERVER_PID" 2>/dev/null
  fi
}
trap cleanup EXIT

step() { printf '\n== %s\n' "$1"; }
pass() { printf 'PASS: %s\n' "$1"; }
fail() { printf '\nFAIL: %s\nVerification stopped. Nothing after this step ran.\n' "$1"; exit 1; }
skip() { printf 'NOT CONFIGURED: %s\n' "$1"; NOT_CONFIGURED+=("$1"); }

step "1. Formatting"
skip "no formatter declared (no Prettier, Biome or dprint in package.json; add one with approval, then run its check mode here)"

step "2. Lint (eslint, next core-web-vitals)"
pnpm lint || fail "lint"
pass "lint"

step "3. Static types (tsc --noEmit, strict)"
pnpm exec tsc --noEmit -p . || fail "static types"
pass "static types"

step "4. Unit tests"
if node -e 'const p=require("./package.json");const d={...p.dependencies,...p.devDependencies};const s=(p.scripts||{}).test;process.exit(s||d.vitest||d.jest||d["node:test"]?0:1)'; then
  pnpm test || fail "unit tests"
  pass "unit tests"
else
  skip "no unit test runner (no test script, Vitest or Jest in package.json)"
fi

step "5. Secret detection (scripts/check_secrets.sh)"
scripts/check_secrets.sh || fail "secret detection"
pass "secret detection"

step "6. Dependency vulnerabilities (pnpm audit, production dependencies, high and critical)"
pnpm audit --prod --audit-level=high || fail "dependency vulnerabilities (high or critical advisory open)"
pass "dependency vulnerabilities"

step "7. Build (next build)"
pnpm build || fail "build"
pass "build"

step "8. Integration and browser suites (tests/e2e against the production build)"
if [ ! -f tests/e2e/run-all.js ]; then
  skip "no browser suites"
else
  pnpm exec next start -p "$PORT" >/tmp/verify-server.log 2>&1 &
  SERVER_PID=$!
  ready=0
  for _ in $(seq 1 60); do
    if [ "$(curl -s -o /dev/null -w '%{http_code}' "http://localhost:$PORT/en")" = "200" ]; then ready=1; break; fi
    sleep 1
  done
  [ "$ready" = 1 ] || fail "production server did not answer on port $PORT (see /tmp/verify-server.log)"
  E2E_URL="http://localhost:$PORT" node tests/e2e/run-all.js || fail "browser suites"
  pass "browser suites"
fi

printf '\n== Summary\n'
printf 'All executed checks passed.\n'
if [ "${#NOT_CONFIGURED[@]}" -gt 0 ]; then
  printf 'Not configured in this repository (not run, not passed):\n'
  printf '  - %s\n' "${NOT_CONFIGURED[@]}"
fi
exit 0
