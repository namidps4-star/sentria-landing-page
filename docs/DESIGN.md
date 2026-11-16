# SentrIA design

This file records how the landing site and the app are designed. It is written from the code.
When the code and this file disagree, check the code first, then correct this file in the same commit.

Sources: landing `app/globals.css`, `app/revamp.css`, `app/_shell/shell.tsx`, `components/africa-*`,
`components/sector-*`, `components/fit.tsx`, `components/motion.tsx`; app `app/globals.css`, `app/layout.tsx`
and the app's CLAUDE.md.

## 1. The product in design terms

- Tagline (footer): the operational decision layer: evidence, confidence, impact and outcome, for every risk.
- A page shows one working moment of the product. It does not give a tour.
- Pharmacy is the reference page. Every activity page uses its template (section 2.7).
- Plain words. Short sentences. The numbers are examples and are labelled as examples.

## 2. Landing site

### 2.1 Stack and routes

- Next.js 16 App Router, React 19, TypeScript, pnpm. Dev server: `pnpm dev -p 3100`.
- English has no prefix: `/`, `/sectors/<sector>`, `/africa/en/<activity>`.
- French uses a prefix: `/fr`, `/fr/secteurs/<sector>`, `/afrique/fr/<activity>`.
- Fonts load in `app/_shell/shell.tsx`.

### 2.2 Colour tokens (`app/globals.css`, `:root`)

| Token | Value | Use |
| --- | --- | --- |
| `--ink` | #0b0c08 | page ground, dark sections, ink text |
| `--ink-2`, `--ink-3`, `--ink-4` | #10120b, #15170d, #1b1e10 | olive grounds |
| `--paper` | #14150f | dark paper |
| `--cream` | #f5f3ea | light ground, cream bands, the ledger |
| `--sand` | #ece7d6 | older sand section; activity pages no longer use it |
| `--lime` | #d6ff3f | accent, primary button, highlighted dots and figures |
| `--lime-deep` | #9fcc1b | eyebrow line |
| `--lime-dim` | #7c9a2a | eyebrow text on dark |
| `--muted` | #969989 | secondary text |
| `--muted-l` | #65685c | labels |
| `--coral` | #ff5a4e | critical alert icon |
| `--amber` | #ffb84d | warning alert icon |

Literal colour used in components, not a token: deep green `#0f2e1f` (hero overlay, example band,
bar fills, dots). Lime-on-cream needs an ink outline or a deep-green fill to read.

### 2.3 Typography

| Face | Variable or source | Used for |
| --- | --- | --- |
| Syne 700 | `--f-display` (`app/fonts/syne-700.woff2`) | headlines h1 to h3 |
| Poppins 400, 500, 600 | `--f-body` (`app/fonts/poppins-*.woff2`) | body, labels, chips, buttons |
| Unbounded 600 | `--f-open` | the large wordmark at the foot of the page |
| Michroma 400 | `--f-brand` | brand wordmark |
| Chillax Light | `AfricaNumeral` (`public/fonts/Chillax-Light.woff2`) | big figures: ledger figures, step numbers, example numbers |
| absans 400 | `--f-hero` | loaded in the shell; no use found in the code checked |

Sizes checked in the code:

- Activity hero headline: `clamp(40px, 4.4vw, 62px)`, line height 1.04. Pharmacy and other sector heroes: `clamp(34px, 5.6vw, 80px)`. Hub heroes are larger.
- Activity lead: `clamp(15px, 1.15vw, 17px)`.
- Start line (audience, "For ..."): 12px, uppercase, letter spacing .14em, 60% opacity.
- Eyebrow: 12px, weight 600, uppercase, letter spacing .15em, a 30px lime-deep line before it.
- Hero stats: numbers 40px, one-line description 13px.
- Ledger figure: Chillax Light, `clamp(96px, 10.4vw, 150px)`, line height .8.
- Body: 16px to 17px, line height 1.55 to 1.65.

### 2.4 Buttons

- Primary: lime pill (`#d6ff3f`, ink text), padding 14px 24px, 15px, radius 999px. One per hero: "Book a demo →" (FR "Demander une démo →").
- Secondary: outline pill, cream border at 28%, transparent. Used as a link to the sector page: "See all X activities →".
- Links inside a sector hero: a small underlined text link, not a filled button.

### 2.5 Layout

- Side padding: `--pad: clamp(20px, 4vw, 56px)`.
- Section headers sit top left on hub pages: a small label with a lime dot, then the title and lead left-aligned. No centred headers (CLAUDE.md).
- Activity hero at 1440 by 900: copy on the left, alert panel on the right, lime stats strip at the bottom. The hero fits one screen (measured 900px tall).
- Below 960px: the copy stacks, buttons go full width, the alert panel follows the copy.
- Check: no sideways scroll at 390px (`scrollWidth - innerWidth` at or below 0).

### 2.6 Hero anatomy (`components/africa-hero.tsx`, `AfricaHero`)

Top to bottom:

1. Photo from Unsplash under a deep-green overlay (`afr-hero--deep`), with a credit line.
2. Headline: three lines. The middle line is lime.
3. Lead: one or two plain sentences on what SentrIA does.
4. Start line: who it is for.
5. Two buttons: primary "Book a demo →", secondary link to the sector.
6. Right side, `AfricaAlertPanel`: "Example alerts", three cards. Critical uses a coral icon, warning an amber icon. Sample numbers.
7. Bottom: lime stats strip, three stats (number, label, one-line example).
8. Proof band: words that scroll on lime: Confidence, Impact, Outcome, Evidence.

Compact size (`compact` prop, class `afr-hero--compact`) is used on every activity page.

### 2.7 Activity page template

Every activity page renders the same sections in the same order. Pharmacy is the reference.

1. Hero (2.6).
2. Ledger (`components/africa-ledger.tsx`, cream). Kicker, then a heading that says what SentrIA shows. Three or four rows. Each row:
   - a big figure from the row's example (Chillax Light), on the left;
   - the title, one sentence on what SentrIA does, and "You import" chips;
   - on the right, a drawing with the row's own labels, then the example alert sentence.
   Four drawing kinds: `bars`, `timeline`, `pair`, `compare`. Then one "does not" line.
3. Dark section (`afr-caps--rest`, ink ground):
   - `AfricaSteps`: "Start in three steps", three steps with a drawing each.
   - `AfricaExample`: worked example on a deep-green band. Chips for the example lines, a result line.
4. FAQ grid (`components/africa-faq-grid.tsx`, lime, two by two). Four cells, each with a drawing (file, connections, separate accounts, dial) and a question with its answer. The dial words: pharmacy "routine / alert list / first patient"; other activities "routine / alert list / first action".

Content:

- `content/africa-activities.ts`: pharmacy, wholesaler, farm, plus the shared maps.
- `content/africa-activity-pages.ts`: the other 21 activities, and the steps and questions shared by all activities.
- Routes: `app/(en)/africa/[lang]/[activity]/page.tsx`, `app/(fr)/afrique/[lang]/[activity]/page.tsx`.

Rules for activity rows:

- One row is one thing SentrIA does.
- The figure is one number from the example.
- The drawing does one job, with its own labels.
- Products named in a row are real features. Planned features are labelled as planned.

### 2.8 Sector pages (7 sectors)

- Health: `/sectors/healthcare` (FR `/fr/secteurs/sante`). Own page with the activity ring and the sector heroes.
- Industry, agriculture, transportation, logistics, energy, retail: general hero, the sector's activity ring (`ActivityRing`), and the sector heroes.
- Sector heroes (`SectorHeroes`, cream band `.sp-heroes`). Three per sector. Each hero:
  - a quiet problem line;
  - the outcome as the headline (h3);
  - one example line;
  - one picture (inline SVG) that does one job;
  - a text link "Book a demo →".
  A note under the three: "The numbers are examples."

### 2.9 Homepage

- Quick strip (`QuickFit`): seven pills, one per sector. Picking one scrolls to its card.
- Sector board (`FitSection`, `components/fit.tsx`): sector name, tagline, description, three signals, two links: "Book a demo" and "See all X activities →" (the sector page).

### 2.10 Motion

- Scroll reveal: `data-rv` values `rise` (default), `left`, `right`, `scale`, `fade`. Duration .95s. Ease `cubic-bezier(0.2, 0.7, 0.2, 1)`. Stagger: `--i` times 90ms.
- `components/motion.tsx`, the `Motion` component: adds `data-in` when an element enters the view (IntersectionObserver). Also `data-par` (parallax), `data-prog` (scroll progress into `--p`), `data-tilt`, `data-spot`, `data-mag`, `data-count`, `data-step`.
- Steps on the activity page: a scroll-linked pull. Items arrive one after another.
- Reduced motion: `prefers-reduced-motion` shows everything at once.
- Status: reveal is on the landing and Africa pages. An earlier count found about 20 components still without reveal. Check before saying "all".

### 2.11 Pictures

- Unsplash only, high quality. Credit line on every photo: "Photo: Name, Unsplash".
- One picture per activity, never repeated on another page.
- No AI-generated images, no recognisable faces, no pictures unrelated to the activity.

### 2.12 Copy

- English and French change together. Check both before saying a change is done.
- No em dashes. No "it's not X, it's Y" contrast. No hype words. Short sentences, plain nouns.
- Example numbers are labelled as examples.
- Only working features are written as working. CSV works today. ERP, API and IoT are planned, and the connections drawing says so.
- Chat replies may use the caveman style. UI copy does not.

### 2.13 Never use

From the app's design rules, applied to the landing page too:

- purple-blue gradients, gradient text;
- an "Introducing" badge;
- a glowing halo behind an element;
- frosted-glass panels or icon tiles;
- rows of identical feature cards;
- cards inside cards;
- a coloured stripe on one side of a card;
- a giant "10M+" style stat;
- "01, 02, 03" labels on sections or steps;
- a pulsing green dot;
- beige with an italic serif;
- the word "supercharge";
- em dashes in copy.

Known conflict: `AfricaSteps` shows large numbers 01 to 03 on the steps. This conflicts with the rule above. Decide whether to keep them.

### 2.14 Checks before saying a page is done

1. `pnpm exec tsc --noEmit -p .`, and `pnpm exec eslint <changed files>`.
2. Each route returns 200: `/africa/en/<activity>` and `/afrique/fr/<activity>`.
3. Screenshots at 1440 by 900 and at 390 px. Set `data-in` on the `[data-rv]` elements first, because the reveal waits for scroll.
4. No sideways scroll at 390 px.
5. Check EN and FR together.
6. Push to `new_feat` only.

### 2.15 Open items

Kept here so they are not lost. Update this list when one is closed.

1. The 21 new activity pages: rows, examples and numbers were written by the assistant. Sample numbers. The product side has not checked the claims.
2. Africa pages: the primary "Book a demo" button points to `#demo`, but Africa pages have no demo section. Only the homepage has one.
3. The Africa hub page (`/africa`) does not link to the 21 activity pages. Only the sector pages do.
4. The pharmacy page's "does not" line says "your wholesaler's live stock". That is wrong for pharmacies.
5. The step numbers 01 to 03 conflict with section 2.13.
6. Reveal motion is not on about 20 components yet.
7. Phone check (390 px) of the new activity pages not done.
8. The compact hero also applies to the pharmacy page. Confirm this is wanted.

## 3. App (sentria-frontend)

### 3.1 Stack

Next.js 16 App Router, React 19, Tailwind v4, Supabase Auth, pnpm. Deployed on Vercel. Backend: the Sentria repo (FastAPI) on Render.

### 3.2 Fonts (`app/layout.tsx`, `next/font/google`)

- Plus Jakarta Sans: `--font-body`, text.
- Outfit: `--font-display`, headings.
- Michroma, one weight: `--font-brand-face`, the sidebar wordmark.
- Geist Mono: `--font-geist-mono`.

### 3.3 Colours (`app/globals.css`, oklch)

Light (`:root`):

- background oklch(0.965 0.002 110); card oklch(1 0 0); canvas #ffffff.
- foreground oklch(0.18 0.005 110); primary oklch(0.19 0.004 110).
- muted-foreground oklch(0.52 0.006 110); border oklch(0.91 0.003 110); track oklch(0.3 0.004 110).
- brand (lime) oklch(0.88 0.205 124), brand-foreground oklch(0.22 0.04 124); brand-deep #0f2e1f.
- warning oklch(0.54 0.14 58); destructive oklch(0.577 0.245 27.325).

Dark (`.dark`):

- canvas oklch(0.125 0.002 110); card oklch(0.225 0.002 110).
- primary oklch(0.922 0 0); brand oklch(0.85 0.195 124); deep-card = brand-deep.
- border white at 10%; muted-foreground oklch(0.708 0 0).
- destructive oklch(0.704 0.191 22.216); warning oklch(0.8 0.145 78).

### 3.4 Shape and surfaces

- Radius token: 1rem (16px). Smaller and larger radii derive from it.
- Squircle: `.squircle` sets `corner-shape: squircle`. Add it next to a large `rounded-[...]` on big surfaces. So far only the sidebar (64px) has it. Small controls stay round.
- Cards: lime, black and grey rounded cards. Pastel tags. No big cards, no faded colours, no hidden controls.
- Scroll bars are hidden in `globals.css`. The rule for content: show every row, or wrap or paginate. No scroll bars inside cards, lists or bars.

### 3.5 Theme

- Dark mode by the `.dark` class. Use theme tokens, never `dark:` variants.
- Light, dark and 390 px must all look right.

### 3.6 Conventions

- Every user-facing string in French and English, through `tx(fr, en)` or `localized()`.
- A mockup of an existing screen starts from a real screenshot of the running app.
- Each feature gets a Playwright suite in `tests/e2e/`, listed in `run-all.js`, with screenshots in light, dark and 390 px.
- Do not hand-edit `lib/icons.tsx`, `lib/icon-data.ts` (generated) or the lockfiles.

## 4. Keeping this file true

- Read the code before you change this file.
- Change this file in the same commit as a design decision.
- Order of trust: code, then this file, then memory.
