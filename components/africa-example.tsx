import type { ExampleStyle } from "@/content/africa-designs"
import "./africa-example.css"

// The day scale: the three numbers the example's own lines give (4 days in stock, delivery promised in 7, real average 11).
const SCALE_LABELS = {
  en: ["days in stock", "promised", "real average"],
  fr: ["jours de stock", "promis", "moyenne réelle"],
}
const SCALE_NUMS = ["4", "7", "11"]
const SCALE_POS = ["36.4%", "63.6%", "100%"]

type Props = {
  kicker?: string
  title: string
  lines: string[]
  result: string
  first: string
  imports: string
  youImport: string
  lang: "en" | "fr"
  scale: boolean
  style?: ExampleStyle
}

export function AfricaExample({ kicker, title, lines, result, first, imports, youImport, lang, scale, style = "band" }: Props) {
  const labels = SCALE_LABELS[lang]
  return (
    <div className={`afr-ex-band ex-${style}`} data-rv="rise">
      {kicker && <p className="eyebrow">{kicker}</p>}
      <h3 className="afr-ex-h">{title}</h3>
      <div className="afr-ex-info">
        <p>{first}</p>
        <p className="afr-ex-imp">
          <b>{youImport}:</b> {imports}
        </p>
      </div>
      <div className="afr-ex-panel">
        <ul className="afr-ex-chips">
          {lines.map((l) => (
            <li key={l}>{l}</li>
          ))}
        </ul>
        {scale && (
          <div className="afr-ex-ruler" aria-hidden="true">
            {SCALE_NUMS.map((n, i) => (
              <span key={n} className={`afr-ex-num${i === 2 ? " r" : ""}`} style={{ left: SCALE_POS[i] }}>
                {n}
              </span>
            ))}
            <div className="afr-ex-track" />
            <div className="afr-ex-fill" />
            {SCALE_POS.map((p) => (
              <span key={p} className="afr-ex-tick" style={{ left: p }} />
            ))}
            {labels.map((lab, i) => (
              <span key={lab} className={`afr-ex-lab${i === 2 ? " r" : ""}`} style={{ left: SCALE_POS[i] }}>
                {lab}
              </span>
            ))}
          </div>
        )}
        <p className="afr-ex-res">{result}</p>
      </div>
    </div>
  )
}
