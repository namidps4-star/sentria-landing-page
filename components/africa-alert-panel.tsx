import { ALERT_PREVIEW } from "@/content/africa-activities"

const LABEL = {
  en: { title: "Live alerts", count: (n: number) => `${n} alerts active` },
  fr: { title: "Alertes en direct", count: (n: number) => `${n} alertes actives` },
} as const

const ICON_CRITICAL = (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <circle cx="9" cy="9" r="8" stroke="currentColor" strokeWidth="1.5" />
    <path d="M9 6v3.5M9 11.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)
const ICON_WARNING = (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path d="M9 2.5L16 15.5H2L9 2.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M9 8v2.5M9 12v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

export function AfricaAlertPanel({ lang }: { lang: "en" | "fr" }) {
  const l = LABEL[lang]
  const alerts = ALERT_PREVIEW[lang]
  return (
    <aside className="afr-panel" aria-label={l.title}>
      <div className="afr-panel-top">
        <span className="afr-panel-pill">
          <i className="afr-panel-dot" aria-hidden="true" />
          {l.title}
        </span>
        <span className="afr-panel-count">{l.count(alerts.length)}</span>
      </div>
      <ol className="afr-panel-rows">
        {alerts.map((a, i) => (
          <li key={i} className={`afr-row afr-row-${a.level}`}>
            <span className="afr-row-icon" aria-hidden="true">
              {a.level === "critical" ? ICON_CRITICAL : ICON_WARNING}
            </span>
            <span className="afr-row-text">{a.text}</span>
            <svg className="afr-row-arrow" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </li>
        ))}
      </ol>
    </aside>
  )
}
