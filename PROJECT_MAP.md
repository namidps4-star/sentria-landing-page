# Project map

Last checked against the repository: 2026-11-19 (branch `new_feat`). Update this file in the same commit as any architectural change. If it disagrees with the code, the code wins; fix this file.

## Overview

`sentria-landing-page` is the public marketing site for SentrIA at sentriahq.dev. It is a static Next.js 16 App Router site: no database, no API routes, no server-side data fetching and no authentication. Every page is built from typed content modules in `content/` and the components in `components/`. The product app (`app.sentriahq.dev`) and the data backend are separate repositories and are not part of this one.

Stack: Next.js 16.3.8, React 19, TypeScript 5.7 (strict), ESLint 9 (`eslint-config-next`), pnpm (`pnpm-lock.yaml`), Playwright browser suites in `tests/e2e`, three.js 0.187 (Africa globe), deployed on Vercel (`vercel.json`, framework `nextjs`).

## Directories

| Path | Responsibility |
| --- | --- |
| `app/` | Routes and layouts only. `(home)` = `/`, `(en)` = English pages, `(fr)` = French pages, `_shell/` = the shared site shell and metadata. |
| `components/` | UI. One component per file; no data beyond props and the `content/` modules. |
| `content/` | All copy and data as typed modules: `en-*.ts` and `fr.ts` (homepage copy), `articles.ts` + `article-pages/` (articles), `africa-*.ts` and `sector-*.ts` (Africa and sector pages), `prices.ts` (plan prices), `legal.ts`, `seo.ts`. Business rules for copy live here, not in components. |
| `styles/`, `app/*.css` | Stylesheets. `app/globals.css` and `app/revamp.css` are the homepage's tokens and base styles; `styles/` holds the section partials imported by the layouts. |
| `public/` | Static files served as-is (photos, icons, email logo). About 60 MB. |
| `assets/` | Source images and credits (`assets/sectors/CREDITS.md`). Not served. |
| `docs/` | `DESIGN.md` (design law for the homepage) and `mockups/` (design references). |
| `email/` | Outreach email footer (`footer.html`, `footer.txt`). Not part of the build. |
| `legacy/` | The previous single-page site (`legacy/index.html`). Excluded from lint and types; used as the reference for the content guard. |
| `tests/e2e/` | Playwright browser suites, run by `scripts/verify.sh` against the production build. |
| `scripts/` | Verification: `verify.sh` (all checks) and `check_secrets.sh` (secret scan). |
| `.githooks/` | Git hooks. `pre-commit` runs the secret scan. Enable once per clone: `git config core.hooksPath .githooks`. |
| `.claude/` | Assistant configuration: `settings.json` (permission rules) and `skills/`. |

## Entry points

- `proxy.ts`: runs on every request except `_next`, `api`, and files with an extension. It stores the visitor's country in the `sentria_country` cookie (from Vercel's `x-vercel-ip-country`) and redirects `/` to `/fr` or `/en` by browser language.
- `app/(home)/layout.tsx` and `app/(home)/page.tsx`: the root page.
- `app/(en)/layout.tsx`, `app/(fr)/layout.tsx`: the two language trees. Each sets `<html lang>` through `SiteShell`.
- `next.config.mjs`: image formats and sizes; `poweredByHeader: false`.

## Routes

- English (`app/(en)`): `/en`, `/activities`, `/activities/[activity]`, `/africa`, `/africa/hub`, `/africa/en/[activity]` (English slugs; French slugs redirect here), `/articles`, `/articles/[slug]`, `/sectors/[sector]`, `/privacy`, `/terms`, `/motion`, `/sitemap.xml`, `/robots.txt`.
- French (`app/(fr)`): `/fr`, `/fr/activites`, `/fr/activites/[activity]`, `/afrique`, `/afrique/hub`, `/afrique/fr/[activity]`, `/fr/articles`, `/fr/secteurs/[sector]`, `/fr/privacy`, `/fr/terms`, and four article pages under `/articles/`.
- There are no `route.ts` handlers. Nothing is served under `/api`.

## Data flow

- Build time: `content/` modules render to static HTML (`generateStaticParams` for activity and sector pages). Article and sitemap pages revalidate hourly (`revalidate = 3600`).
- Request time: `proxy.ts` only reads the Vercel country header and sets a cookie. `components/pricing.tsx` and the FAQ read that cookie in the browser to pick the currency.
- No database, no environment variables read by application code, no `fetch` calls in `app/`, `components/` or `content/`.

## Authentication and authorization

None in this repository. The header's "Sign in" link goes to `https://app.sentriahq.dev`, which is outside this repo. The demo booking widget is Calendly, loaded in the browser.

## External integrations

- Calendly: `components/demo.tsx` loads `assets.calendly.com/assets/external/widget.js` and shows `calendly.com/hello-sentria/30min`.
- Vercel: the `x-vercel-ip-country` header in `proxy.ts`.
- Sign-in target: `app.sentriahq.dev` (`components/header.tsx`).
- Source links: the articles and Africa pages link out to published reports (PubMed, Springer, NHS Wales, WHO and others). Links are checked by hand, not by the build.
- Photos: static files in `public/`, credited in their captions (Unsplash).

## Critical business logic

- Plan prices: `content/prices.ts` mirrors the billing list the app uses. Changing a price here without changing the app creates a mismatch the visitor will see.
- Copy and translation: `content/fr.ts` maps English strings to French for the homepage. Every visible change must be made in both languages.
- Article updates: `content/articles.ts` (`ARTICLE_UPDATES`, `liveUpdate`, `isLive`) decides which text and cards are visible by date (UTC).
- SEO: `content/seo.ts` (titles, descriptions, hreflang), `app/(en)/sitemap.ts`, the `alternates` metadata on each Africa page.
- Africa activity addresses: `content/africa-urls.ts` maps each French activity key to its English slug; `components/activity-ring.tsx` builds links from it.

## Sensitive files and restricted areas

Changes here need explicit approval and a note in the commit message:

- `proxy.ts`: country cookie and root redirects. A mistake here changes every page.
- `next.config.mjs`, `vercel.json`, `package.json`, `pnpm-lock.yaml`: build, runtime and dependencies. Upgrades affect production.
- `content/prices.ts`: must match the app's billing list.
- `content/legal.ts`, `app/(en)/privacy`, `app/(en)/terms` and their French versions: legal text; needs a legal reviewer.
- `email/`: outreach footer; opt-out wording needs legal review.
- `scripts/verify.sh`, `scripts/check_secrets.sh`, `.githooks/`, `.claude/settings.json`, `AGENTS.md`, `CLAUDE.md`: the harness. Weakening any of them needs approval.
- `tests/e2e/`: the reference lists and selectors. A test change must keep its assertion.
- `.gitignore` ignores `HANDOFF.md` and `handoff.md`. They are local notes, not sources of truth.

## Known open items

- `next` 16.3.8 has open critical and high advisories (fixed in 16.4.5 and later). Upgrading changes the production runtime: needs approval.
- `tests/e2e/content.js` fails on old strings missing from the new pages: a copy decision (restore the copy or update the reference).
- `tests/e2e/layout.js` reports a `requestStorageAccess` page error from a third-party script in the test sandbox. The error is not in this repository's code.
