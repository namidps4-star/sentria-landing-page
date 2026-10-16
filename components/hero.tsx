import type { CSSProperties } from "react"
import { C } from "@/content/en"
import { FR } from "@/content/fr"
import { T, B } from "./t"
import { Check } from "./ui"
import { HeroFx } from "./hero-fx"

const d = (n: number) => ({ ["--d" as string]: `${n * 0.12}s` }) as CSSProperties

function letters(text: string) {
  return [...text].map((c, i) => (
    <span key={i} className="wvl">
      {c === " " ? " " : c}
    </span>
  ))
}

/** One headline line, split into letters (for the wave), in both languages. */
function Line({ s, tone, n }: { s: string; tone?: "lime"; n: number }) {
  const f = FR[s]
  return (
    <span className={`hl${tone ? ` ${tone}` : ""}`} style={d(n)} aria-hidden="true">
      <span className="en">{letters(s)}</span>
      {f && f !== s ? (
        <span className="fr" lang="fr">
          {letters(f)}
        </span>
      ) : null}
    </span>
  )
}

export function Hero() {
  const h = C.hero
  return (
    <section id="top" className="hero" aria-labelledby="hero-h">
      <div className="hero-stage" id="hero-stage">
        <div className="wrap hero-in">
          <div className="hero-top">
            <p className="hero-eyebrow" data-h="" style={d(0)}>
              <span className="dot" aria-hidden="true" />
              <T s={h.eyebrow} />
            </p>
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
              <Line s={h.l1} n={0} />
              <Line s={h.l2} tone="lime" n={1} />
              <Line s={h.l3} n={2} />
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
        <a className="strip-b" href="#secteurs">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M8 5.5v13l11-6.5z" fill="currentColor" />
          </svg>
          <span className="sr-only">
            <B en="Watch the sector film" fr="Voir le film des secteurs" />
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
