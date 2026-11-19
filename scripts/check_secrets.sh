#!/usr/bin/env bash
# Scans the files Git tracks for credentials, private keys and the owner's private contact details.
# No dependencies. Prints file and line numbers only, never the matched text.
# Usage: scripts/check_secrets.sh            scan the tracked files in the working tree
#        scripts/check_secrets.sh --staged   scan what is staged for the next commit (used by the hook)
# Exit 0 = nothing found, 1 = something found, 2 = the scan could not run.
set -u

cd "$(git rev-parse --show-toplevel 2>/dev/null)" || { echo "check_secrets: not inside a git repository"; exit 2; }

SOURCE=()
if [ "${1:-}" = "--staged" ]; then
  SOURCE=(--cached)
fi

PATTERNS=(
  'BEGIN ([A-Z]+ )?PRIVATE KEY'
  'AKIA[0-9A-Z]{16}'
  'sk_live_[0-9A-Za-z]{16,}'
  'sk-[A-Za-z0-9_-]{32,}'
  'gh[pousr]_[A-Za-z0-9]{36,}'
  'xox[abprs]-[A-Za-z0-9-]{10,}'
  'AIza[0-9A-Za-z_-]{35}'
  'eyJ[A-Za-z0-9_-]{15,}\.eyJ[A-Za-z0-9_-]{15,}\.[A-Za-z0-9_-]{10,}'
  'hello\.sentria@gmail\.com'
)

found=0
for pattern in "${PATTERNS[@]}"; do
  hits=$(git grep -nIE "${SOURCE[@]}" -e "$pattern" -- . ':!pnpm-lock.yaml' 2>/dev/null | cut -d: -f1,2)
  if [ -n "$hits" ]; then
    found=1
    echo "FOUND pattern: $pattern"
    echo "$hits" | sed 's/^/   /'
  fi
done

env_files=$(git ls-files "${SOURCE[@]}" | grep -E '(^|/)\.env($|\.)' | grep -v '\.env\.example$')
if [ -n "$env_files" ]; then
  found=1
  echo "FOUND tracked environment file(s):"
  echo "$env_files" | sed 's/^/   /'
fi

if [ "$found" -eq 0 ]; then
  echo "secret scan: clean ($(git ls-files | wc -l | tr -d ' ') tracked files)"
  exit 0
fi
echo "secret scan: FAILED. Remove the value, rotate it if it was ever real, and never commit it again."
exit 1
