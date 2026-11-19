<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project rules

These rules apply to every assistant session in this repository. `PROJECT_MAP.md` describes the code; `docs/DESIGN.md` is the design law for the homepage. Each rule says how it is enforced. Where enforcement is "reviewer", the reviewer checks it in the diff.

## 1. Stack

- Next.js 16.3.8 (App Router), React 19, TypeScript 5.7 in strict mode, ESLint 9 flat config (`eslint.config.mjs`, `eslint-config-next`).
- pnpm with `pnpm-lock.yaml`. Browser suites: Playwright, plain JavaScript in `tests/e2e`.
- Deployed on Vercel from git (`vercel.json`). No database, no authentication, no API routes in this repository.

## 2. Structure

- Routes and layouts only in `app/`. UI in `components/`. Copy, prices, article data and SEO data in `content/`. Styles in `styles/` and `app/*.css`.
- Business rules for what a visitor sees live in `content/`, not in components.
- Configuration in the root config files. Secrets are never configuration (see section 4).
- Reviewer: a new top-level folder or a file outside these places needs a line in `PROJECT_MAP.md`.

## 3. Conventions

- Files: kebab-case. Component exports: PascalCase. Content modules: kebab-case with a short noun.
- English and French change together: copy, routes and metadata. Check both before saying a change is done (`tests/e2e/content.js` and `interact.js` cover parts of this).
- Errors: a route that cannot find its content calls `notFound()` or `permanentRedirect()`. Do not catch and hide an error. `scripts/verify.sh` shows every failure.
- Logging: no `console.log` in committed code. Reviewer: `git diff` shows none.
- Types: no `any` and no `@ts-ignore` unless a comment says why. `tsc --noEmit` is enforced by `scripts/verify.sh`.
- Documentation: a comment only when the reason is not obvious. Design rules belong in `docs/DESIGN.md`, not in code comments.

## 4. Security

- Never write a secret, API key, token, password or private contact address into a tracked file. `scripts/check_secrets.sh` blocks the common patterns and any `.env` file that Git tracks. Enforced by `scripts/verify.sh` and by `.githooks/pre-commit` (once enabled per clone).
- Never disable or weaken a security check to make a test pass: not the secret scan, not the audit, not a lint or type rule, not an `e2e` assertion. A failing check is reported, not bypassed.
- Validate every external input. The site has no forms today; a new form or endpoint must validate on the server and be reviewed before merge.
- Least privilege: no new external script, stylesheet or iframe host without approval. The current list is in `PROJECT_MAP.md`.
- `.env*` files are read-denied for the assistant (`.claude/settings.json`).

## 5. Forbidden without approval

- Modifying production directly, or deploying by any means other than a reviewed merge.
- Changing deployment settings: `vercel.json`, `next.config.mjs`, Vercel project settings.
- Adding, upgrading or removing a dependency (`package.json`, `pnpm-lock.yaml`). The assistant's `ask` rules in `.claude/settings.json` stop `pnpm add`, `install`, `update`, `remove` and `audit fix`. A new dependency needs a written justification in the commit message.
- Deleting data, files or branches the assistant did not create in this session.
- Changing legal text (`content/legal.ts` and the privacy and terms pages) or the price list (`content/prices.ts`).
- Overwriting existing behaviour without first searching for its callers (`grep` the symbol, check `PROJECT_MAP.md`) and running `scripts/verify.sh`.

## 6. Session startup protocol

1. Read this file and `PROJECT_MAP.md`. `CLAUDE.md` imports both, so Claude Code loads them at the start of each session. Other assistants: load them by hand.
2. Run `git status -sb` and `git branch --show-current`. The branch must be `new_feat`. If the tree has changes you did not make, stop and ask before touching them.
3. Restate the requested task in one sentence. If it is ambiguous or touches a restricted area (section 5), ask one question before editing.
4. Identify the files involved using `PROJECT_MAP.md`. Read them before editing them.

## 7. Completion protocol

A task is complete only when all of these hold. Otherwise say which one does not:

1. `scripts/verify.sh` has run after the last change, and its output (pass or failure) is shown in the report.
2. `git diff --stat` and `git diff` were reviewed. No unintended files changed.
3. The secret scan is clean (it runs inside `verify.sh`) and no secret or private contact address was added.
4. `PROJECT_MAP.md` was updated if the architecture changed.
5. Every check that could not run is named, with the reason.

Report in four parts: IMPLEMENTATION SUMMARY (what changed, files, decisions), VERIFICATION (commands, passed checks, failed checks, the relevant output), SECURITY (implications, dependencies, possible vulnerabilities), REMAINING WORK (limitations, open issues, checks not performed). Never state a check passed unless it was run in this session.

## 8. What enforces these rules

- Technical, in this repository: `.claude/settings.json` (deny and ask rules), `scripts/verify.sh`, `scripts/check_secrets.sh`, `.githooks/pre-commit` (enable with `git config core.hooksPath .githooks`).
- Owner actions, not in the repository: branch protection on `main` and required checks in GitHub; Vercel deployment protection; a CI workflow that runs `scripts/verify.sh` on each pull request. These need a decision before they exist.
- Written rules alone do not stop a determined action. Where a rule matters, the control must be technical.
