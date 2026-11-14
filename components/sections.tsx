import { C } from "@/content/en"
import { T, B, LangPick } from "./t"
import { WordPicker } from "./rv"
import { Check, Eyebrow, iv } from "./ui"
import { Sec, H2 } from "./section-frame"

/* ------------------------------------------------------------------ proof */

export function Proof() {
  // Removed: the scrolling strip of words carried no information. Pages still render <Proof />, and it draws nothing.
  return null
}

/* ------------------------------------------------------------- situations */

export function Situations() {
  const s = C.situations
  return (
    <section id="situations" className="rv-sec">
      <div className="wrap">
        <p className="rv-kicker" data-rv="fade">
          <B en="The problem" fr="Le problème" />
        </p>
        <h2 className="rv-h" data-rv="rise">
          <T s={s.title} />
        </h2>
        <p className="rv-lead" data-rv="rise" style={iv(1)}>
          <T s={s.lead} />
        </p>
        <WordPicker
          label={s.title}
          items={s.items.map((it) => ({ h: <T key="h" s={it.h} />, p: <T key="p" s={it.p} /> }))}
        />
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ shift */

export function Shift() {
  const s = C.shift
  return (
    <section className="rv-sec rv-dark rv-shift">
      <div className="wrap">
        <p className="rv-kicker" data-rv="fade">
          <B en="The shift" fr="Le changement" />
        </p>
        <h2 className="rv-h" data-rv="rise">
          <LangPick
            en={
              <>
                Move from monitoring to <em>deciding.</em>
              </>
            }
            fr={
              <>
                Passez du suivi à la <em>décision.</em>
              </>
            }
          />
        </h2>
        <div className="rv-split" data-rv="rise" style={iv(1)}>
          <div className="rv-side">
            <span className="rv-tag">
              <T s={s.before.k} />
            </span>
            <h3 className="rv-q">
              <T s={s.before.q} />
            </h3>
            <p>
              <T s={s.before.p} />
            </p>
          </div>
          <div className="rv-vline" aria-hidden="true" />
          <div className="rv-side rv-side-us">
            <span className="rv-pill">
              <T s={s.after.k} />
            </span>
            <h3 className="rv-q">
              <T s={s.after.q} />
            </h3>
            <p>
              <T s={s.after.p} />
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------- method */

export function Method() {
  const s = C.method
  return (
    <section id="methode" className="rv-sec">
      <div className="wrap">
        <p className="rv-kicker" data-rv="fade">
          <B en="The method" fr="La méthode" />
        </p>
        <h2 className="rv-h" data-rv="rise">
          <T s={s.title} />
        </h2>
        <WordPicker
          label={s.title}
          items={s.steps.map((st) => ({ h: <T key="h" s={st.h} />, p: <T key="p" s={st.p} /> }))}
          foot={
            <p className="rv-loop">
              <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5" />
              </svg>
              <B en="The outcome feeds back into Observe" fr="Le résultat alimente à nouveau Observer" />
            </p>
          }
        />
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------- why */

export function Why() {
  const s = C.why
  const cell = (v: string) => {
    if (v === "✓")
      return (
        <>
          <Check />
          <span className="sr-only">
            <B en="Yes" fr="Oui" />
          </span>
        </>
      )
    if (v === "—")
      return (
        <>
          <span aria-hidden="true">—</span>
          <span className="sr-only">
            <B en="No" fr="Non" />
          </span>
        </>
      )
    return <T s={v} />
  }
  return (
    <Sec tone="cream" className="why">
      <Eyebrow>
        <T s={s.eyebrow} />
      </Eyebrow>
      <H2>
        <T s={s.title} />
      </H2>
      <div className="table" role="table" data-rv="rise">
        <div className="trow thead" role="row">
          <div role="columnheader">
            <T s={s.cols[0]} />
          </div>
          <div role="columnheader">
            <T s={s.cols[1]} />
          </div>
          <div role="columnheader" className="col-us">
            <T s={s.cols[2]} />
          </div>
        </div>
        {s.rows.map((r, i) => (
          <div className="trow" role="row" key={r[0]} style={iv(i)}>
            <div role="rowheader" className="c-name">
              <T s={r[0]} />
            </div>
            <div role="cell" className="c-old">
              {cell(r[1])}
            </div>
            <div role="cell" className="col-us c-us">
              {cell(r[2])}
            </div>
          </div>
        ))}
      </div>
    </Sec>
  )
}

export { Cockpit, Pricing, Flow, DataSec, Reasoning } from "./section-product"
export { Promise_, Trust, Final } from "./section-close"
export { Footer } from "./footer"
