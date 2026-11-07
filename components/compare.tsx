import { T, B } from "./t"
import { Mark } from "./ui"
import { CompareFx } from "./compare-fx"

/**
 * How SentrIA compares with the usual ways of watching operations. A real table: row headings on the
 * left, one column per option, and SentrIA's column (logo and name) full all the way down.
 * The black cells are PLACEHOLDER content and need the team's review before this goes live.
 */
const ROWS = [
  "Evidence for every risk",
  "Confidence and impact shown",
  "Ranked by operational impact",
  "Action from standard mitigation methods",
  "Decision logged, outcome measured",
  "Works on top of your existing tools",
]
const COLS = ["Dashboards", "Alert tools", "Spreadsheets", "Consultants"]
// 1 = the option covers the row. Placeholder pattern.
const COVER = [
  [0, 0, 1, 1],
  [0, 0, 0, 1],
  [0, 1, 0, 0],
  [0, 0, 0, 1],
  [0, 0, 0, 0],
  [1, 1, 1, 0],
]

export function Compare() {
  return (
    <section className="rv-sec cmp" id="compare">
      <CompareFx />
      <div className="wrap">
        <p className="rv-kicker" data-rv="fade">
          <B en="How it compares" fr="Comparaison" />
        </p>
        <h2 className="rv-h" data-rv="rise">
          <T s="Not a dashboard. A decision layer." />
        </h2>
        <div className="cmp-scroll" data-rv="rise">
          <table className="cmp-table">
            <thead>
              <tr>
                <td />
                {COLS.map((c) => (
                  <th key={c} scope="col">
                    <T s={c} />
                  </th>
                ))}
                <th scope="col" className="cmp-us">
                  <span className="cmp-logo">
                    <Mark />
                  </span>
                  <span className="cmp-name">SentrIA</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r, i) => (
                <tr key={r} style={{ "--r": i } as React.CSSProperties}>
                  <th scope="row">
                    <T s={r} />
                  </th>
                  {COVER[i].map((v, j) => (
                    <td key={j} className={v ? "cmp-on" : "cmp-off"} style={{ "--c": j } as React.CSSProperties}>
                      <span className="sr-only">{v ? <B en="Covered" fr="Couvert" /> : <B en="Not covered" fr="Non couvert" />}</span>
                    </td>
                  ))}
                  <td className="cmp-us">
                    <span className="sr-only">
                      <B en="Covered" fr="Couvert" />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
