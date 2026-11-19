# SentrIA landing page design

Scope: the main landing page (`/en`, `/fr`) and the parts of the site it shares: the header, the footer,
and the type, colour, button and motion rules. Not covered here: the Africa pages and the app.

Sources: `components/home-page.tsx` (section order), `components/hero.tsx`, `components/hero-film.tsx`,
`components/sections.tsx`, `components/fit.tsx`, `components/compare.tsx`, `components/faq.tsx`,
`components/demo.tsx`, `components/opening.tsx`, `components/header.tsx`, `components/footer.tsx`,
`components/motion.tsx`; styles in `app/globals.css` and `app/revamp.css`; copy in `content/en-story.ts`.

When the code and this file disagree, the code wins. Fix this file in the same commit.

## 1. What the page does

- It sells one idea in plain words: SentrIA turns risk into a ranked decision. Each decision carries evidence, confidence, impact, and an outcome that feeds back.
- Footer tagline: "The operational decision layer: evidence, confidence, impact and outcome, for every risk."
- Order of the page: the problem first, then the product on one screen, then how it works, who it fits, the trust points, the questions, and one call to book a demo.

## 2. Page order

Measured at 1440 px. Top to bottom.

| # | Section | Ground (rendered) | Headline (EN) | Job |
| --- | --- | --- | --- | --- |
| 0 | Opening | black tile grid | none | Plays on load: a grid of tiles dissolves diagonally, the wordmark and "Loading" show, then the page appears. |
| 1 | Header | floating dark pill over the hero | none | Navigation, language switch, Sign in, and the lime "Book a demo →". |
| 2 | Hero | ink, full-bleed sector photo under a dark layer | "See the risk. / See the evidence. / Decide." | The sector film, the lead, three check lines, and the call to action strip. |
| 3 | Proof | lime, 101 px high | scrolling words | Evidence, Confidence, Impact, Outcome. Nothing more. |
| 4 | Product tour | near-white #fbfbfd | "Every risk, ranked. One screen." | A product window with captions. |
| 5 | Quick pick | sand #ece7d6, 96 px high | "Not sure where you fit in? Pick one:" | Seven sector pills. |
| 6 | Situations | near-white | "Your data already knows. It just doesn't explain itself." | The problem. |
| 7 | Shift | ink | "Move from monitoring to deciding." | Monitoring against deciding. |
| 8 | Compare | white | "Not a dashboard. A decision layer." | Contrast with a dashboard. |
| 9 | Method | near-white | "An operational loop, not another dashboard." | Observe, understand, prioritise, act. |
| 10 | Cockpit | ink | "What needs your attention now." | A ranked queue with percentages. |
| 11 | Pricing | sand | "Plans and prices." | Four plans. Business is highlighted in lime. |
| 12 | Flow | #121313 | "From your data to a defended decision." | Three numbered steps (see section 11). |
| 13 | Sectors | near-white | "Where do you fit in?" | A sector list with a board: tagline, description, three signals, two links. |
| 14 | Data | #10120b | "Use what you already have." | What SentrIA works with from data you already have. |
| 15 | Reasoning | #000 | "Every risk comes with its reasoning." | The reasoning panels. |
| 16 | Promise | lime | "Less noise. Better decisions. Measured outcomes." | Four promises, each with an arrow. |
| 17 | Trust | olive #1b1e10 | "Your data stays under your control." | Access and control. |
| 18 | FAQ | lime | "The questions we get asked." | Questions that open. |
| 19 | Demo | light grey #f2f2f0 | "Let's see where SentrIA can save you time, and defend the decision." | Booking card and a dial. |
| 20 | Final | ink | "The next decision may already be in your data." | One "Book a demo" button. |
| 21 | Footer | ink, with a lime band | none | Links, contact, copyright, and a very large "SentrIA" wordmark. |

Rendered colours differ from the class names in some places. `.sc-deep` is defined with the lime-deep token, but the Flow and Reasoning sections render dark because a later rule overrides them. The rendered colour is what counts.

## 3. Colour

Tokens in `app/globals.css`, `:root`:

| Token | Value | Use |
| --- | --- | --- |
| `--ink` | #0b0c08 | page ground, dark sections, dark text |
| `--ink-2`, `--ink-3`, `--ink-4` | #10120b, #15170d, #1b1e10 | dark grounds; `--ink-4` is the olive section |
| `--paper` | #14150f | text on lime |
| `--cream` | #f5f3ea | text on dark |
| `--sand` | #ece7d6 | the sand bands |
| `--lime` | #d6ff3f | accent, the proof band, the promise and FAQ sections, buttons |
| `--lime-deep` | #9fcc1b | eyebrow line |
| `--lime-dim` | #7c9a2a | eyebrow text on dark |
| `--muted` | #969989 | secondary text |
| `--muted-l` | #65685c | labels |
| `--coral` | #ff5a4e | critical alert |
| `--amber` | #ffb84d | warning alert |

Light sections use their own neutral set in `app/revamp.css` (`.rv-sec`): background #fbfbfd, text #1d1d1f, muted text #6e6e73, rule #d2d2d7.

Pattern on the page: the grounds alternate between light, dark and lime, with sand as a breather. Two sections of the same ground rarely sit next to each other.

## 4. Type

- Headlines: Syne 700 (`--f-display`). Section headline `.rv-h`: `clamp(34px, 5vw, 68px)`, line height 1.05, letter spacing -0.03em, 17 characters wide, balanced across lines. Plain `.h2`: `clamp(32px, 4.5vw, 74px)`, line height 1.03. Hero headline: `clamp(34px, 6.1vw, 110px)`.
- Body: Poppins 400, 500, 600 (`--f-body`).
- Lead under a headline: `.rv-lead`, `clamp(16px, 1.4vw, 19px)`, line height 1.6, muted, 620 px wide at most.
- Kicker above a headline: `.rv-kicker`, 13px, weight 600, muted, with a short line before it.
- Footer wordmark: Unbounded 600 (`--f-open`).
- Michroma 400 (`--f-brand`) is used for some brand elements.
- Width: `.wrap` is 1360 px at most, with side padding `--pad: clamp(20px, 4vw, 56px)`.
- Section padding: `clamp(72px, 9vw, 136px)` top and bottom.

## 5. Buttons

- `.btn`: inline flex, minimum height 46px, padding 0 24px, radius 999px, 15px, weight 600, gap 10px.
- `.btn-lime`: lime with ink text. On hover it turns #e6ff7a and gains a soft lime shadow (see section 11).
- `.btn-ink`, `.btn-line`, `.btn-xl` (larger) are the other variants.
- Hero call to action strip: three equal blocks. Lime "Book a demo →", a cream play button for the product tour, and a sand "See how it works".
- Header: lime "Book a demo →" pill.
- A section that asks for action ends in one "Book a demo" button. Other actions are text links.

## 6. Header and footer

- Header: a floating dark pill over the hero. It has the logo mark and the word SentrIA, the navigation links, the EN/FR switch, Sign in, and the lime "Book a demo →". The links point to `/#situations`, `/#methode`, `/#cockpit`, `/#tarifs`, `/#fit`, `/#faq`, `/articles` and `/africa`. The English labels are Situations, Method, Decision queue, Pricing, Sectors, FAQ, Articles and Africa.
- Footer: ink ground. A left column with "Drop us a line and we'll get in touch" and a "Book a demo" link. A large contact address in capitals. Three link columns (Product, Resources, SentrIA), and a copyright line. Below all of it, a lime band carrying the very large "SentrIA" wordmark.

## 7. Hero

- Ground: ink, with a full-bleed photo of one sector under a dark layer so the headline stays readable.
- Sector film (`hero-film.tsx`): seven sectors, one photo at a time. Each photo crossfades with a slow push-in. The film changes on a timer. It starts after the intro, pauses while the pointer or the keyboard is on the caption, and stays still under reduced motion. A Pause/Play button under the dots holds the film for the visitor (WCAG 2.2.2).
- Caption: the sector name in Syne, its one-line tagline, and seven progress dots.
- Headline, three lines: "See the risk." then "See the evidence." in lime, then "Decide." The letters type in one after another, then wave (`.wvl`, with `--c` for position and `--j` for a small lag).
- Lead paragraph on the right, 16 to 17 px.
- Three check lines at the top right, uppercase, each with a lime check: evidence for every risk; confidence and impact shown; decision logged, outcome measured.
- Bottom strip: three call-to-action blocks (see section 5).

## 8. Motion

- Reveal: `data-rv` on sections, cards and headings. Values: `rise` (the default), `left`, `right`, `scale`, `fade`. Duration 0.95 s, ease `cubic-bezier(0.2, 0.7, 0.2, 1)`, stagger `--i` times 90 ms.
- `components/motion.tsx`: adds `data-in` when an element enters the view. Also `data-par` (parallax), `data-prog` (progress into `--p`), `data-tilt`, `data-spot`, `data-mag` (magnetic button), `data-count`, and `data-step`.
- Opening intro: CSS only, the tiles dissolve.
- Proof band: a continuous marquee.
- Reduced motion (`prefers-reduced-motion`): reveals show at once, and the hero film stays still.
- Status: an earlier count found about 20 components without reveal. Check before saying "all".

## 9. Pictures and visuals

- Hero photos: one per sector, real photographs of that sector's sites. Industry shows factory stacks and cooling towers.
- Pictures come from Unsplash or another licensed high-quality source. No AI-generated images. No recognisable faces. Each picture must match its sector.
- Credit each Unsplash photo as "Photo: Name, Unsplash".
- Drawings in the sections (the product window, the queue, the plans, the dial) are inline SVG or CSS. Each drawing does one job.

## 10. Copy

- English and French change together. Check both before saying a change is done.
- Headlines are short sentences, often in threes, with full stops.
- Example numbers are labelled as examples.
- A planned feature is labelled planned. A working feature is written as working.
- No em dashes. No hype words. No "Introducing" badge. The word "supercharge" is out.
- New copy avoids the "not X, it's Y" contrast. The homepage already has one: "Not a dashboard. A decision layer." (section 11).
- Chat replies may use the caveman style. Page copy does not.

## 11. Never use, and the open conflicts

Never use, from the design rules:

- purple-blue gradients, and gradient text;
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

Open conflicts, to decide:

1. The Flow section (12) shows four numbered circles, 01 to 04. Kept at the founder's request, which overrides the "01, 02, 03" never-use rule for this section.
2. ~~`.btn-lime:hover` adds a lime shadow.~~ Resolved: `box-shadow: 0 10px 40px rgba(214,255,63,0.35)` is a tinted elevation shadow (Y-offset, directional). Not a halo. Keep it.
3. ~~The compare headline "Not a dashboard. A decision layer." uses the contrast form.~~ Resolved: the rule bans *new* contrast copy; this one predates the rule. Keep it, add no more.

## 12. Checks before saying a homepage change is done

1. `pnpm exec tsc --noEmit -p .` and `pnpm exec eslint <changed files>`.
2. `/en` and `/fr` return 200.
3. Screenshots at 1440 by 900 and at 390 px. Set `data-in` on the `[data-rv]` elements first, because the reveal waits for scroll.
4. No sideways scroll at 390 px.
5. English and French checked together.
6. Push to `new_feat` only.

## 13. Open items (landing page)

1. Decide the three conflicts in section 11.
2. ~~Reveal motion is missing on about 20 components.~~ Resolved: audited all homepage components. The only missing `data-rv` was on the `rv-feats` `<li>` items in Cockpit; added. Interactive sub-components (FlowCircles, ReasoningPlates, TrustCluster, DemoDial, ConnectStack, QuickFit) use their own `useInView`/`seen→.in` reveal and need no `data-rv`.
3. ~~Check the whole homepage at 390 px.~~ Resolved: no horizontal overflow. One fix: compare table (`cmp-table`) had `min-width: 520px` — third column was clipped on mobile. Added `@media (max-width: 480px)` to drop min-width and reduce font/padding so all three columns fit.
4. ~~Check the French homepage section by section.~~ Resolved: all 21 sections rendered and compared with EN. Fixed untranslated text: skip link, footer Privacy/Terms, the ERP sample table (item names, zones, "d" to "j", Today/Tomorrow/Fri), the expiring-batch queue line, the queue percentages (French spacing, now read from the FR string), the coverage figure (decimal comma), and "rip-and-replace" in the FR copy (now "sans tout remplacer"). Visual pass at 1440 px on the FR page: hero, cockpit, ERP panel, FAQ and pricing render without clipping; the ERP label "Label roll" is now "Étiquettes" to fit its cell. 390 px pass on the FR page: no element past the viewport, document 387 px wide; the footer tagline has a non-breaking space before its colon.
6. ~~Every plan button links to the demo, and "Start free" had no signup behind it.~~ Resolved: the Discovery button reads "Book a demo" (EN) and "Réserver une démo" (FR), matching the demo form it opens. A self-serve signup is still not built.
7. ~~The compare table's dashboard cells were blocks with the words only for screen readers.~~ Resolved: each cell shows its word (Yes, Partially, No) as a chip, and a legend line sits under the table in EN and FR.
8. ~~The decision queue showed "94%" with no label.~~ Resolved: each percentage reads "94% confidence" (EN) and "94 % de confiance" (FR).
9. ~~The FAQ priced in euros while Tarifs showed the visitor's currency.~~ Resolved: the FAQ answer uses `{pro}` and `{business}` placeholders, filled from `SITE_PRICES` through `useSiteCurrency()` (`components/site-currency.ts`), the same hook Tarifs uses. Copy says "in your currency" in EN and FR.
