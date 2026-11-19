"use client"

import { ALERT_PREVIEW } from "@/content/africa-activities"
import "./africa-alert-panel.css"

type Alert = { level: "critical" | "warning"; text: string }

const LABEL = {
  en: { title: "Example alerts", count: (n: number) => `${n} example alerts`, critical: "Critical", warning: "Warning", action: "Action" },
  fr: { title: "Alertes exemples", count: (n: number) => `${n} alertes exemples`, critical: "Critique", warning: "Alerte", action: "Action" },
} as const

// The dot bar: 80 dots. Critical lights more of it than a warning. A drawing, not a measurement.
const DOTS = 80
const LIT: Record<Alert["level"], number> = { critical: 60, warning: 36 }

// "Amoxicillin 500mg: 4 days of stock. ..." -> name, the first figure in the text, and the last sentence (the action).
function split(text: string) {
  const [name, ...rest] = text.split(":")
  const detail = rest.join(":").trim()
  const figure = detail.match(/\d[\d.,]*\s?(?:%|°C|days?|jours?|units?|unités?|boxes?|boîtes?|hours?|h|FCFA|kW)?/)?.[0] ?? ""
  const sentences = detail.split(/(?<=\.)\s+/)
  const action = sentences[sentences.length - 1] ?? ""
  return { name: name.trim(), figure: figure.trim(), detail, action: action.trim() }
}

export function AfricaAlertPanel({ lang, alerts: custom }: { lang: "en" | "fr"; auto?: boolean; alerts?: Alert[] }) {
  const l = LABEL[lang]
  const alerts = custom ?? ALERT_PREVIEW[lang]
  return (
    <aside className="afr-panel alp" aria-label={l.title}>
      <div className="alp-top">
        <span className="alp-pill">{l.title}</span>
        <span className="alp-count">{l.count(alerts.length)}</span>
      </div>
      <ol className="alp-list">
        {alerts.map((a, i) => {
          const s = split(a.text)
          const lit = LIT[a.level]
          return (
            <li key={i} className={`alp-card alp-${a.level}`}>
              <div className="alp-head">
                <span className="alp-index" aria-hidden="true">{i + 1}</span>
                <span className="alp-level">{l[a.level]}</span>
              </div>
              <div className="alp-big">
                <b>{s.figure || s.name}</b>
                <span>{s.figure ? s.name : ""}</span>
              </div>
              <p className="alp-detail">{s.detail}</p>
              <div className="alp-dots" aria-hidden="true">
                {Array.from({ length: DOTS }, (_, k) => (
                  <i key={k} className={k < lit ? "on" : undefined} />
                ))}
              </div>
              <div className="alp-foot">
                <span>{l.action}</span>
                <span>{s.action}</span>
              </div>
            </li>
          )
        })}
      </ol>
    </aside>
  )
}
