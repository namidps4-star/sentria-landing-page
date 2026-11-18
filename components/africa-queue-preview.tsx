"use client"
import { useEffect, useRef, useState, type CSSProperties } from "react"

type Alert = { level: "critical" | "warning"; text: string }

const CONF = [85, 72, 68, 64]

function parseAlert(a: Alert, rank: number) {
  const parts = a.text.split(/\.\s+/)
  const last = parts[parts.length - 1].replace(/\.$/, "")
  const isAction = /^(Transfer|Arrange|Review|Suggested|Order|Check|Sell|Handle|Deliver)/i.test(last)
  const signal = isAction && parts.length > 1 ? parts.slice(0, -1).join(". ") : a.text.replace(/\.$/, "")
  const action = isAction ? last : null
  const cut = signal.search(/\s?:\s/)
  const first = signal.match(/^.+?[.!?](?=\s|$)/)
  let title = signal
  let detail = ""
  if (cut > 0) {
    title = signal.slice(0, cut)
    detail = signal.slice(signal.indexOf(":", cut) + 1).trim()
  } else if (first && first[0].length < signal.length) {
    title = first[0].replace(/\.$/, "")
    detail = signal.slice(first[0].length).trim()
  }
  return { title, detail, action, conf: CONF[rank] ?? 60 }
}

const ACTION_LABEL: Record<"en" | "fr", Record<"critical" | "warning", string>> = {
  en: { critical: "Act now →", warning: "Review →" },
  fr: { critical: "Agir →",    warning: "Vérifier →" },
}

const sw = { fill: "none", stroke: "currentColor", strokeWidth: 2.2, strokeLinecap: "round", strokeLinejoin: "round" } as const

const Sun = () => (
  <svg viewBox="0 0 24 24" {...sw} strokeWidth={2} aria-hidden="true">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
)
const Moon = () => (
  <svg viewBox="0 0 24 24" {...sw} strokeWidth={2} aria-hidden="true">
    <path d="M20 14.5A8 8 0 019.5 4 8 8 0 1020 14.5z" />
  </svg>
)
const Warn = () => (
  <svg viewBox="0 0 24 24" {...sw} aria-hidden="true">
    <path d="M12 3l10 18H2z" />
    <path d="M12 10v5M12 18v.5" />
  </svg>
)
const Clock = () => (
  <svg viewBox="0 0 24 24" {...sw} aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
)

export function AfricaQueuePreview({ alerts, lang }: { alerts: Alert[]; lang: "en" | "fr" }) {
  const [vis, setVis] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect() } },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const sorted = alerts
    .map((a, i) => ({ a, i }))
    .sort((x, y) => (x.a.level === "critical" ? -1 : 1) - (y.a.level === "critical" ? -1 : 1))

  const kickerLabel = lang === "en" ? "Decision queue" : "File de décisions"
  const headlineA   = lang === "en" ? "Act on the right one." : "Agissez au bon endroit."
  const headlineB   = lang === "en" ? " Ranked by urgency."   : " Classé par urgence."
  const confLabel   = lang === "en" ? "conf."                  : "conf."
  const nowLabel    = lang === "en" ? "NOW"                    : "MAINTENANT"
  const footLabel   = lang === "en"
    ? `${sorted.length} decisions open, most urgent first.`
    : `${sorted.length} décisions ouvertes, les plus urgentes d'abord.`

  return (
    <div className="afr-gt" ref={ref} aria-label={kickerLabel} data-vis={vis ? "1" : "0"}>
      <div className="afr-gt-header">
        <p className="afr-gt-kicker">{kickerLabel}</p>
        <h2 className="afr-gt-headline">
          <strong>{headlineA}</strong>
          <span>{headlineB}</span>
        </h2>
      </div>

      <div className="afr-vq">
        <div className="afr-vq-cap"><i><Sun /></i></div>

        <div className="afr-vq-rows">
          <div className="afr-vq-spine" />
          {sorted.map(({ a, i }, rank) => {
            const { title, detail, action, conf } = parseAlert(a, rank)
            const actionText = action ?? ACTION_LABEL[lang][a.level]
            return (
              <div
                key={i}
                className={`afr-vq-row afr-vq-row--k${rank % 4}`}
                style={{ "--ri": rank } as CSSProperties}
              >
                {rank === 0 && (
                  <div className="afr-vq-now" aria-hidden="true"><b>{nowLabel}</b></div>
                )}
                <div className="afr-vq-idx">
                  {conf}
                  <small>{confLabel}</small>
                </div>
                <div className="afr-vq-pill">
                  {a.level === "critical" ? <Warn /> : <Clock />}
                </div>
                <div className="afr-vq-card">
                  <div className="afr-vq-title">{title}</div>
                  {detail && <div className="afr-vq-meta">{detail}</div>}
                  <span className="afr-vq-go">{actionText}</span>
                  <span className="afr-vq-box" aria-hidden="true" />
                </div>
              </div>
            )
          })}
        </div>

        <div className="afr-vq-cap afr-vq-cap--end"><i><Moon /></i></div>
        <p className="afr-vq-foot">{footLabel}</p>
      </div>
    </div>
  )
}
