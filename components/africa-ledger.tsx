import type { Capabilities, Drawing as DrawingSpec } from "@/content/africa-activities"
import type { Mood } from "@/content/africa-designs"
import { TransferCards } from "./africa-transfer"
import { RankedLine } from "./africa-ranked"
import "./africa-ledger.css"

/* The capabilities of an activity page as a ledger: a figure from each alert, the product's own copy under
   its heading, the imports as chips, and a small drawing of the alert. The figure, the drawing and its labels
   come from each row's content, so every activity uses the same template. */

type Lang = "en" | "fr"
type Item = Capabilities["items"][number]

/* Four drawings, one per kind of alert. The labels are the row's own words. */
function Drawing({ drawing }: { drawing: DrawingSpec }) {
  const [a = "", b = "", c = ""] = drawing.labels
  if (drawing.kind === "ranked") return <RankedLine labels={drawing.labels} />
  if (drawing.kind === "transfer") return <TransferCards labels={drawing.labels} />
  if (drawing.kind === "bars")
    return (
      <svg viewBox="0 0 400 110" aria-hidden="true">
        <text x="0" y="12">{a}</text>
        <rect x="0" y="20" width="229" height="16" rx="8" fill="currentColor" />
        <rect x="229" y="20" width="171" height="16" rx="8" fill="none" stroke="currentColor" strokeDasharray="4 4" opacity=".5" />
        <text x="0" y="66">{b}</text>
        <rect x="0" y="74" width="400" height="16" rx="8" fill="#0f2e1f" />
      </svg>
    )
  if (drawing.kind === "timeline")
    return (
      <svg viewBox="0 0 400 110" aria-hidden="true">
        <line x1="0" y1="50" x2="400" y2="50" stroke="currentColor" strokeWidth="2" opacity=".3" />
        <rect x="240" y="44" width="160" height="12" rx="6" fill="#0f2e1f" />
        <circle cx="240" cy="50" r="9" fill="currentColor" />
        <text x="240" y="26" textAnchor="middle">{a}</text>
        <text x="0" y="92">{b}</text>
        <text x="400" y="92" textAnchor="end">{c}</text>
      </svg>
    )
  if (drawing.kind === "pair")
    return (
      <svg viewBox="0 0 400 110" aria-hidden="true">
        <line x1="60" y1="50" x2="340" y2="50" stroke="currentColor" strokeWidth="2" opacity=".3" />
        <circle cx="60" cy="50" r="10" fill="#0f2e1f" />
        <circle cx="340" cy="50" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
        <text x="0" y="26">{a}</text>
        <text x="400" y="26" textAnchor="end">{b}</text>
      </svg>
    )
  return (
    <svg viewBox="0 0 400 110" aria-hidden="true">
      <rect x="0" y="18" width="143" height="12" rx="6" fill="currentColor" opacity=".35" />
      <rect x="0" y="54" width="257" height="12" rx="6" fill="#0f2e1f" />
      <rect x="0" y="90" width="400" height="12" rx="6" fill="none" stroke="currentColor" strokeDasharray="4 4" opacity=".5" />
      <text x="0" y="12">{a}</text>
      <text x="0" y="48">{b}</text>
      <text x="0" y="84">{c}</text>
    </svg>
  )
}

/* The imports line becomes chips: the part after the colon, split on commas and "and" / "et". */
function chipsOf(imports: string) {
  const list = imports.includes(":") ? imports.slice(imports.indexOf(":") + 1) : imports
  return list
    .split(/,| and | et /)
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => s[0].toUpperCase() + s.slice(1))
}

/* The mood sets the layout of the rows (content/africa-designs.ts). The default is the pharmacy ledger. */
export function AfricaLedger({ id, kicker, heading, items, notDo, lang, mood = "ledger" }: { id: string; kicker?: string; heading: string; items: Item[]; notDo: string; lang: Lang; mood?: Mood }) {
  const youImport = lang === "en" ? "You import" : "Vous importez"
  return (
    <section className="afr-led" data-mood={mood} aria-labelledby={id}>
      {kicker && <p className="eyebrow">{kicker}</p>}
      <h2 id={id}>{heading}</h2>
      <ul className="afr-led-rows">
        {items.map((item, i) => (
          <li key={item.title} className="afr-led-row" data-rv="rise" style={{ "--i": i } as React.CSSProperties}>
            <span className={`afr-led-num${item.figure.length > 3 ? " sm" : ""}`}>{item.figure}</span>
            <div className="afr-led-txt">
              <h3>{item.title}</h3>
              <p className="afr-led-does">{item.does.split(/(?<=\.)\s/)[0]}</p>
              <p className="afr-led-imp">{youImport}</p>
              <ul className="afr-led-chips">
                {chipsOf(item.imports).map((chip) => (
                  <li key={chip}>{chip}</li>
                ))}
              </ul>
            </div>
            <div className="afr-led-vis">
              <div className="afr-led-art">
                <Drawing drawing={item.drawing} />
              </div>
              <p className="afr-led-alert">{item.example}</p>
            </div>
          </li>
        ))}
      </ul>
      <p className="afr-led-not">{notDo}</p>
    </section>
  )
}
