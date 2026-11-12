import { C } from "@/content/en"
import { T, B } from "./t"
import { Mark } from "./ui"
import { CompareFx } from "./compare-fx"

/**
 * SentrIA against a traditional dashboard, row by row, with the wording from the site's own comparison
 * (content `why`). Dashboard cells are blocks: solid when it does the job, half when partly, empty when
 * not. SentrIA's column is lime and says what it does in each row.
 */
export function Compare() {
  const s = C.why
  return (
    <section className="rv-sec cmp" id="compare">
      <CompareFx />
      <div className="wrap">
        <p className="rv-kicker" data-rv="fade">
          <T s={s.eyebrow} />
        </p>
        <h2 className="rv-h" data-rv="rise">
          <T s={s.title} />
        </h2>
        <div className="cmp-scroll" data-rv="rise">
          <table className="cmp-table">
            <thead>
              <tr>
                <td />
                <th scope="col">
                  <T s={s.cols[1]} />
                </th>
                <th scope="col" className="cmp-us">
                  <span className="cmp-logo">
                    <Mark />
                  </span>
                  <span className="cmp-name">SentrIA</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {s.rows.map((r, i) => {
                const old = r[1]
                const cls = old === "✓" ? "cmp-on" : old === "Partially" ? "cmp-on cmp-part" : "cmp-off"
                return (
                  <tr key={r[0]} style={{ "--r": i } as React.CSSProperties}>
                    <th scope="row">
                      <T s={r[0]} />
                    </th>
                    <td className={cls} style={{ "--c": 0 } as React.CSSProperties}>
                      <span className="sr-only">{old === "✓" ? <B en="Yes" fr="Oui" /> : old === "Partially" ? <B en="Partially" fr="Partiellement" /> : <B en="No" fr="Non" />}</span>
                    </td>
                    <td className="cmp-us">
                      <span className="cmp-val">{r[2] === "✓" ? "✓" : <T s={r[2]} />}</span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
