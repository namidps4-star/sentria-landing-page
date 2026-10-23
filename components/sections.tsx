import type { ReactNode } from "react"
import { C } from "@/content/en"
import { FR } from "@/content/fr"
import { T, B } from "./t"
import { WordPicker } from "./rv"
import { Arrow, Check, Eyebrow, iv } from "./ui"

type Tone = "cream" | "sand" | "dark" | "olive" | "lime" | "deep"

function Sec({ id, tone, className = "", children }: { id?: string; tone: Tone; className?: string; children: ReactNode }) {
  return (
    <section id={id} className={`sc sc-${tone} ${className}`}>
      <div className="wrap">{children}</div>
    </section>
  )
}

function H2({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <h2 className={`h2 ${className}`} data-rv="rise">
      {children}
    </h2>
  )
}

/* ------------------------------------------------------------------ proof */

export function Proof() {
  const group = (hidden: boolean) => (
    <ul className="marq-group" aria-hidden={hidden || undefined}>
      {C.proof.map((p) => (
          <li key={p.n}>
            <span>
              <T s={p.t} />
            </span>
            <i aria-hidden="true" />
          </li>
      ))}
    </ul>
  )
  return (
    <div className="proof">
      <div className="marq">
        <div className="marq-track">
          {group(false)}
        </div>
      </div>
    </div>
  )
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
          <span className="en">
            Move from monitoring to <em>deciding.</em>
          </span>
          <span className="fr" lang="fr">
            Passez du suivi à la <em>décision.</em>
          </span>
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

/* ---------------------------------------------------------------- cockpit */

export function Cockpit() {
  const s = C.cockpit
  return (
    <section id="cockpit" className="rv-sec rv-dark rv-queue">
      <div className="wrap">
        <p className="rv-kicker" data-rv="fade">
          <B en="The decision queue" fr="La file de décisions" />
        </p>
        <h2 className="rv-h" data-rv="rise">
          <T s={s.title} />
        </h2>
        <p className="rv-lead" data-rv="rise" style={iv(1)}>
          <T s={s.lead} />
        </p>
        <ol className="rv-rows" data-rv="rise" style={iv(2)}>
          {s.queue.map((q) => {
            const [en, pct] = q.a.split(", ")
            const fr = (FR[q.a] ?? q.a).split(", ")[0]
            return (
              <li key={q.t} className="rv-row">
                <span className="rv-r-t">
                  <T s={q.t} />
                </span>
                <span className="rv-r-a">
                  <B en={en} fr={fr} />
                </span>
                <span className="rv-r-n">{pct}</span>
              </li>
            )
          })}
        </ol>
        <ul className="rv-feats">
          {s.features.map((f) => (
            <li key={f.h}>
              <strong>
                <T s={f.h} />
              </strong>
              <span>
                <T s={f.p} />
              </span>
            </li>
          ))}
        </ul>
        <p className="rv-ex">
          <B en="Example queue." fr="Exemple de file." />
        </p>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- pricing */

export function Pricing() {
  const s = C.pricing
  return (
    <Sec id="tarifs" tone="sand" className="pricing">
      <Eyebrow>
        <T s={s.eyebrow} />
      </Eyebrow>
      <H2>
        <T s={s.title} />
      </H2>
      <p className="lead" data-rv="rise" style={iv(1)}>
        <T s={s.lead} />
      </p>
      <div className="plans">
        {s.plans.map((p, i) => {
          const featured = "badge" in p
          return (
            <article key={p.name} className={`plan${featured ? " featured" : ""}`} data-tilt="" data-rv="rise" style={iv(i + 2)}>
              {"badge" in p ? (
                <span className="badge">
                  <T s={p.badge} />
                </span>
              ) : null}
              <h3>
                <T s={p.name} />
              </h3>
              <p className="plan-p">
                <T s={p.p} />
              </p>
              <div className="price">
                <T s={p.price} />
              </div>
              <ul>
                {p.items.map((it) => (
                  <li key={it}>
                    <Check />
                    <T s={it} />
                  </li>
                ))}
              </ul>
              <a className={`btn ${featured ? "btn-ink" : "btn-line"}`} href="#demo" data-mag="">
                <T s={p.cta} />
              </a>
            </article>
          )
        })}
      </div>
      <p className="note" data-rv="fade">
        <T s={s.note} />
      </p>
    </Sec>
  )
}

/* ------------------------------------------------------------------- flow */

export function Flow() {
  const s = C.flow
  return (
    <Sec tone="deep" className="flow">
      <Eyebrow>
        <T s={s.eyebrow} />
      </Eyebrow>
      <H2>
        <T s={s.title} />
      </H2>
      <ol className="flow-steps" data-prog="through">
        <span className="flow-line" aria-hidden="true">
          <i />
        </span>
        {s.steps.map((st, i) => (
          <li key={st.n} className="flow-step" data-step="" data-rv="rise" style={iv(i)}>
            <span className="num">{st.n}</span>
            <h3>
              <T s={st.h} />
            </h3>
            <p>
              <T s={st.p} />
            </p>
          </li>
        ))}
      </ol>
    </Sec>
  )
}

/* ------------------------------------------------------------------- data */

export function DataSec() {
  const s = C.data
  return (
    <Sec tone="dark" className="datasec">
      <Eyebrow>
        <T s={s.eyebrow} />
      </Eyebrow>
      <H2>
        <T s={s.title} />
      </H2>
      <p className="lead" data-rv="rise" style={iv(1)}>
        <T s={s.lead} />
      </p>
      <div className="grid3">
        {s.items.map((it, i) => (
          <article key={it.k} className="card card-dark" data-tilt="" data-rv="rise" style={iv(i + 2)}>
            <span className="tagline">
              <T s={it.k} />
            </span>
            <h3 className="mono-h">
              <T s={it.h} />
            </h3>
            <p>
              <T s={it.p} />
            </p>
            <span className="pulse-line" aria-hidden="true" />
          </article>
        ))}
      </div>
    </Sec>
  )
}

/* -------------------------------------------------------------- reasoning */

export function Reasoning() {
  const s = C.reasoning
  return (
    <Sec tone="cream" className="reasoning">
      <Eyebrow>
        <T s={s.eyebrow} />
      </Eyebrow>
      <H2>
        <T s={s.title} />
      </H2>
      <div className="grid3">
        {s.items.map((it, i) => (
          <article key={it.n} className="card card-light card-open" data-tilt="" data-rv="rise" style={iv(i)}>
            <span className="num">{it.n}</span>
            <h3>
              <T s={it.h} />
            </h3>
            <p>
              <T s={it.p} />
            </p>
          </article>
        ))}
      </div>
    </Sec>
  )
}

/* ---------------------------------------------------------------- promise */

export function Promise_() {
  const s = C.promise
  return (
    <Sec tone="lime" className="promise">
      <Eyebrow>
        <T s={s.eyebrow} />
      </Eyebrow>
      <H2>
        <T s={s.title} />
      </H2>
      <ul className="promise-list">
        {s.items.map((it, i) => (
          <li key={it.h} data-rv="rise" style={iv(i)}>
            <strong>
              <T s={it.h} />
            </strong>
            <span>
              <T s={it.p} />
            </span>
            <Arrow />
          </li>
        ))}
      </ul>
    </Sec>
  )
}

/* ------------------------------------------------------------------ trust */

export function Trust() {
  const s = C.trust
  return (
    <Sec tone="olive" className="trust">
      <div className="trust-grid">
        <H2>
          <T s={s.title} />
        </H2>
        <ul>
          {s.lines.map((l, i) => (
            <li key={l} data-rv="right" style={iv(i)}>
              <span className="lock" aria-hidden="true">
                <Check />
              </span>
              <T s={l} />
            </li>
          ))}
        </ul>
      </div>
    </Sec>
  )
}

/* ------------------------------------------------------------------ final */

export function Final() {
  const s = C.final
  return (
    <section className="rv-final">
      <div className="rv-final-glow" aria-hidden="true" />
      <div className="wrap rv-final-in">
        <h2 className="rv-final-h" data-rv="rise">
          <T s={s.a} />{" "}
          <span className="rv-grey">
            <T s={s.b} />
          </span>
        </h2>
        <div className="rv-final-foot">
          <a className="btn btn-lime btn-xl" href="#demo" data-mag="" data-rv="scale" style={iv(2)}>
            <T s={s.cta} />
          </a>
          <p className="rv-final-lead" data-rv="rise" style={iv(1)}>
            <T s={s.lead} />
          </p>
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------- footer */

export function Footer() {
  const f = C.footer
  const link = (href: string, s: string) => (
    <li>
      <a href={href}>
        <T s={s} />
      </a>
    </li>
  )
  return (
    <footer className="foot">
      <div className="wrap foot-top">
        <div className="foot-l">
          <p className="foot-hook">
            <B en="Drop us a line, and we'll get in touch!" fr="Écrivez-nous, nous vous répondons vite !" />
          </p>
          <a className="foot-sched" href="#demo">
            <B en="Schedule a call" fr="Planifier un appel" />
          </a>
          <a className="foot-brand" href="#top">
            {f.brand}
          </a>
          <p className="foot-tag">
            <T s={f.tag} />
          </p>
        </div>
        <div className="foot-r">
          <a className="foot-mail" href="mailto:hello@sentria.dev" data-mag="">
            <span>hello@sentria.dev</span>
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M7 17L17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <div className="foot-cols">
            <div>
              <h4>
                <T s={f.product} />
              </h4>
              <ul>
                {link("#cockpit", "Decision queue")}
                {link("#methode", "Method")}
                {link("#tarifs", "Pricing")}
                {link("#fit", "Sectors")}
              </ul>
            </div>
            <div>
              <h4>
                <T s={f.resources} />
              </h4>
              <ul>
                {link("#faq", "FAQ")}
                {link("#demo", "Demo")}
                {link("#demo", "Contact")}
                {link("mailto:privacy@sentria.io", "Privacy")}
                {link("mailto:legal@sentria.io", "Terms")}
              </ul>
            </div>
            <div>
              <h4>{f.brand}</h4>
              <ul>
                {link("#demo", "Talk to the team")}
                {link("#tarifs", "Pricing")}
                {link("#demo", "Book a call")}
              </ul>
            </div>
          </div>
          <div className="foot-copy">
            <span>
              <T s={f.copy} />
            </span>
            <span>
              <T s={f.line} />
            </span>
          </div>
        </div>
      </div>
      <div className="foot-band" aria-hidden="true">
        <div className="mega" data-rv="rise">
          {[..."SentrIA"].map((c, i) => (
            <span key={i} style={iv(i)}>
              {c}
            </span>
          ))}
        </div>
      </div>
    </footer>
  )
}
