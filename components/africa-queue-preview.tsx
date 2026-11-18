"use client"

type Alert = { level: "critical" | "warning"; text: string }

const CONF = [85, 72, 68, 64]

const BAR_POS = [
  { left: 0,  width: 40 },
  { left: 10, width: 52 },
  { left: 0,  width: 72 },
  { left: 5,  width: 60 },
]

function parseAlert(a: Alert, confIdx: number) {
  const parts = a.text.split(/\.\s+/)
  const last = parts[parts.length - 1].replace(/\.$/, "")
  const isAction = /^(Transfer|Arrange|Review|Suggested|Order|Check|Sell|Handle|Deliver)/i.test(last)
  const signal = isAction && parts.length > 1 ? parts.slice(0, -1).join(". ") : a.text.replace(/\.$/, "")
  const action = isAction ? last : null
  return { signal, action, conf: CONF[confIdx] ?? 60 }
}

const ACTION_LABEL: Record<"en" | "fr", Record<"critical" | "warning", string>> = {
  en: { critical: "Act now →", warning: "Review →" },
  fr: { critical: "Agir →",    warning: "Vérifier →" },
}

function barDates(pos: { left: number; width: number }, lang: "en" | "fr") {
  const startDay = Math.round(pos.left / 100 * 30)
  const endDay   = startDay + Math.round(pos.width / 100 * 30)
  const todayTxt = lang === "en" ? "Today" : "Aujourd'hui"
  const start    = startDay === 0 ? todayTxt : `+${startDay}d`
  return `${start} → +${endDay}d`
}

export function AfricaQueuePreview({ alerts, lang }: { alerts: Alert[]; lang: "en" | "fr" }) {
  const sorted = alerts
    .map((a, i) => ({ a, i }))
    .sort((x, y) => (x.a.level === "critical" ? -1 : 1) - (y.a.level === "critical" ? -1 : 1))
  const confMap: Record<number, number> = {}
  sorted.forEach(({ i }, rank) => { confMap[i] = rank })

  const todayLabel  = lang === "en" ? "TODAY"            : "AUJOURD'HUI"
  const kickerLabel = lang === "en" ? "Decision queue"   : "File de décisions"
  const headlineA   = lang === "en" ? "Act on the right one." : "Agissez au bon endroit."
  const headlineB   = lang === "en" ? " Ranked by urgency."   : " Classé par urgence."

  return (
    <div className="afr-gt" aria-label={kickerLabel}>

      {/* Section header */}
      <div className="afr-gt-header">
        <p className="afr-gt-kicker">{kickerLabel}</p>
        <h2 className="afr-gt-headline">
          <strong>{headlineA}</strong>
          <span>{headlineB}</span>
        </h2>
      </div>

      {/* Timeline ruler */}
      <div className="afr-gt-ruler">
        <div className="afr-gt-ticks">
          {Array.from({ length: 31 }, (_, d) => (
            <div
              key={d}
              className={`afr-gt-tk${d % 7 === 0 ? " afr-gt-tk--maj" : ""}`}
              style={{ left: `${(d / 30) * 100}%` }}
            />
          ))}
        </div>
        <div className="afr-gt-rlabels">
          <span className="afr-gt-rl" style={{ left: "23.3%" }}>+7d</span>
          <span className="afr-gt-rl" style={{ left: "46.6%" }}>+14d</span>
          <span className="afr-gt-rl" style={{ left: "70%" }}>+21d</span>
          <span className="afr-gt-rl" style={{ left: "100%" }}>+30d</span>
        </div>
        <div className="afr-gt-today-pill">{todayLabel}</div>
      </div>

      {/* Bars */}
      <div className="afr-gt-bars">
        {sorted.map(({ a, i }, rank) => {
          const { signal, action, conf } = parseAlert(a, rank)
          const actionText = action ?? ACTION_LABEL[lang][a.level]
          const pos = BAR_POS[rank] ?? BAR_POS[BAR_POS.length - 1]
          const dates = barDates(pos, lang)
          return (
            <div
              key={i}
              className={`afr-gt-bar afr-gt-bar--${a.level}`}
              style={{
                marginLeft: `${pos.left}%`,
                width: `${pos.width}%`,
                opacity: rank >= 2 ? 1 - rank * 0.06 : 1,
              }}
            >
              <div className="afr-gt-bar-inner" />
              <div className="afr-gt-bar-cap-l" />
              <div className="afr-gt-bar-ring" />
              <div className="afr-gt-bar-prog" />
              <div className="afr-gt-bar-body">
                <span className="afr-gt-bar-name">{signal}</span>
                <span className="afr-gt-bar-dates">{dates}</span>
              </div>
              <div className="afr-gt-bar-right">
                <span className="afr-gt-bar-conf">{conf}%</span>
                <span className="afr-gt-bar-action">{actionText}</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* TODAY vertical line */}
      <div className="afr-gt-today-line" />
    </div>
  )
}
