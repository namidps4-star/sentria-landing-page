import { C } from "@/content/en"
import { T } from "./t"
import { TrustCluster } from "./trust-cluster"
import { Arrow, Eyebrow, iv } from "./ui"
import { Sec, H2 } from "./section-frame"

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
      <TrustCluster
        steps={s.lines.map((l, i) => ({ n: String(i + 1), h: l }))}
        head={
          <H2>
            <T s={s.title} />
          </H2>
        }
      />
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
