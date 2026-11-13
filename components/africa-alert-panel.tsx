import { ALERT_PREVIEW } from "@/content/africa-activities"

const LABEL = {
  en: { title: "Live alerts", sub: "Real wording · Sample numbers" },
  fr: { title: "Alertes en direct", sub: "Texte réel · Chiffres d'exemple" },
} as const

const ICON = {
  critical: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="7" stroke="#ff7a5c" strokeWidth="1.5" />
      <path d="M8 5v3.5M8 10.5v.5" stroke="#ff7a5c" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  warning: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 2L14.5 13.5H1.5L8 2Z" stroke="#ffc857" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M8 7v2.5M8 11v.5" stroke="#ffc857" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
}

export function AfricaAlertPanel({ lang }: { lang: "en" | "fr" }) {
  const l = LABEL[lang]
  return (
    <aside className="afr-panel" aria-label={l.title}>
      <div className="afr-panel-head">
        <span className="afr-panel-live">
          <i className="afr-panel-dot" aria-hidden="true" />
          {l.title}
        </span>
        <span className="afr-panel-sub">{l.sub}</span>
      </div>
      <ol className="afr-panel-list">
        {ALERT_PREVIEW[lang].map((a, i) => (
          <li key={i} className={`afr-alert-card afr-alert-card-${a.level}`}>
            <span className="afr-alert-icon">{ICON[a.level]}</span>
            <span className="afr-alert-body">{a.text}</span>
          </li>
        ))}
      </ol>
    </aside>
  )
}
