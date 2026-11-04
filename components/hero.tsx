import type { CSSProperties } from "react"
import { C } from "@/content/en"
import { FR } from "@/content/fr"
import { T, B } from "./t"
import { Check } from "./ui"
import { HeroFx } from "./hero-fx"
import { HeroFilm } from "./hero-film"

const d = (n: number) => ({ ["--d" as string]: `${n * 0.06}s` }) as CSSProperties

/* Each letter carries its position in the typing sequence (--c) and a small irregular lag (--j), so the headline types itself. */
function letters(text: string, start: number) {
  return [...text].map((c, i) => (
    <span key={i} className="wvl" style={{ ["--c" as string]: start + i, ["--j" as string]: ((start + i) * 7) % 5 } as CSSProperties}>
      {c === " " ? " " : c}
    </span>
  ))
}

/** One headline line, split into letters (for the typing, then the wave), in both languages. */
function Line({ s, tone, n, en0, fr0 }: { s: string; tone?: "lime"; n: number; en0: number; fr0: number }) {
  const f = FR[s]
  return (
    <span className={`hl${tone ? ` ${tone}` : ""}`} style={d(n)} aria-hidden="true">
      <span className="en">{letters(s, en0)}</span>
      {f && f !== s ? (
        <span className="fr" lang="fr">
          {letters(f, fr0)}
        </span>
      ) : null}
    </span>
  )
}

export function Hero() {
  const h = C.hero
  // Start index of each line in the typing sequence, per language (a short pause between lines).
  const len = (s: string, fr: boolean) => [...(fr ? FR[s] ?? s : s)].length
  const GAP = 4
  const en1 = len(h.l1, false) + GAP
  const en2 = en1 + len(h.l2, false) + GAP
  const fr1 = len(h.l1, true) + GAP
  const fr2 = fr1 + len(h.l2, true) + GAP
  return (
    <section id="top" className="hero" aria-labelledby="hero-h">
      <div className="hero-stage" id="hero-stage">
        <HeroFilm />
        <div className="wrap hero-in">
          <div className="hero-top">
            <ul className="hero-checks">
              {h.checks.map((c, i) => (
                <li key={c} data-h="" style={d(i + 1)}>
                  <T s={c} />
                  <Check />
                </li>
              ))}
            </ul>
          </div>

          <div className="hero-copy" id="hero-copy">
            <h1 id="hero-h" className="hero-h">
              <span className="sr-only">
                <T s={h.l1} /> <T s={h.l2} /> <T s={h.l3} />
              </span>
              <Line s={h.l1} n={0} en0={0} fr0={0} />
              <Line s={h.l2} tone="lime" n={1} en0={en1} fr0={fr1} />
              <Line s={h.l3} n={2} en0={en2} fr0={fr2} />
            </h1>
            <p className="hero-lead" data-h="" style={d(5)}>
              <T s={h.lead} />
            </p>
          </div>
        </div>

        <a className="hero-down" href="#product" data-h="" style={d(7)} aria-label="Scroll to the product">
          <svg viewBox="0 0 24 64" fill="none" aria-hidden="true">
            <path d="M12 2v58M3 50l9 10 9-10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
        <HeroFx />
      </div>

      <div className="hero-strip" data-h="" style={d(6)}>
        <a className="strip-a" href="#demo" data-mag="">
          <span>
            <T s={h.cta1} />
          </span>
        </a>
        <a className="strip-b" href="#fit">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M8 5.5v13l11-6.5z" fill="currentColor" />
          </svg>
          <span className="sr-only">
            <B en="See the sectors" fr="Voir les secteurs" />
          </span>
        </a>
        <a className="strip-c" href="#methode">
          <span>
            <T s={h.cta2} />
          </span>
        </a>
      </div>
    </section>
  )
}
