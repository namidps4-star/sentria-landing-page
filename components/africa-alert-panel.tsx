import { ALERT_PREVIEW } from "@/content/africa-activities"

const LABEL = {
  en: { title: "Example alerts", note: "Sample numbers, real alert wording" },
  fr: { title: "Exemples d'alertes", note: "Chiffres d'exemple, texte d'alerte réel" },
} as const

export function AfricaAlertPanel({ lang }: { lang: "en" | "fr" }) {
  const l = LABEL[lang]
  return (
    <aside className="afr-panel" aria-label={l.title}>
      <p className="afr-panel-head">
        <b>{l.title}</b>
        <span>{l.note}</span>
      </p>
      <ol>
        {ALERT_PREVIEW[lang].map((a) => (
          <li key={a.text} className={`afr-alert afr-alert-${a.level}`}>
            <i aria-hidden="true" />
            <span>{a.text}</span>
          </li>
        ))}
      </ol>
    </aside>
  )
}
