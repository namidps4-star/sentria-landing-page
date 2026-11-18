type Alert = { level: "critical" | "warning"; text: string }

export function AfricaQueuePreview({ alerts, lang }: { alerts: Alert[]; lang: "en" | "fr" }) {
  const reviewLabel = lang === "en" ? "Review →" : "Vérifier →"
  return (
    <div className="afr-queue" role="list">
      {alerts.map((a, i) => (
        <div key={i} className="afr-queue__row" role="listitem">
          <span className={`afr-queue__dot afr-queue__dot--${a.level}`} aria-hidden="true" />
          <span className="afr-queue__text">{a.text}</span>
          <div className="afr-queue__conf">
            <div className={`afr-queue__bar afr-queue__bar--${a.level === "critical" ? "85" : "72"}`} aria-hidden="true" />
            <span className="afr-queue__pct">{a.level === "critical" ? "85%" : "72%"}</span>
          </div>
          <span className="afr-queue__btn" aria-hidden="true">{reviewLabel}</span>
        </div>
      ))}
    </div>
  )
}
