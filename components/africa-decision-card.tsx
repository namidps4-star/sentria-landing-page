"use client"
import { useEffect, useRef, useState, type CSSProperties } from "react"

export type DecisionCardData = {
  evidence: string
  confidence: string
  impact: string
  outcome: string
}

const LABELS: Record<"en" | "fr", [string, string, string, string]> = {
  en: ["Evidence", "Confidence", "Impact", "Outcome"],
  fr: ["Preuve", "Confiance", "Impact", "Résultat"],
}

const KICKER: Record<"en" | "fr", string> = {
  en: "One decision. Four fields.",
  fr: "Une décision. Quatre champs.",
}

function parseConf(text: string): { num: string; unit: string; rest: string } | null {
  const m = text.match(/^(\d+)\s*(%?)\s*[—–-]?\s*(.*)$/)
  if (!m) return null
  return { num: m[1], unit: m[2] || "", rest: m[3] }
}

export function AfricaDecisionCard({ card, lang }: { card: DecisionCardData; lang: "en" | "fr" }) {
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

  const [l0, l1, l2, l3] = LABELS[lang]
  const conf = parseConf(card.confidence)

  const fields = [
    { label: l0, value: card.evidence,    mod: "ev", stat: null,                        size: "md" },
    { label: l1, value: card.confidence,  mod: "cf", stat: conf ? conf.num + conf.unit : null, size: "lg" },
    { label: l2, value: card.impact,      mod: "im", stat: null,                        size: "md" },
    { label: l3, value: card.outcome,     mod: "oc", stat: null,                        size: "sm" },
  ] as const

  return (
    <div className="afr-dcard" ref={ref} data-vis={vis ? "1" : "0"}>
      <p className="afr-dcard__kicker">{KICKER[lang]}</p>

      {/* Squircle row */}
      <div className="afr-dcard__sqs">
        {fields.map((f, i) => (
          <div
            key={f.mod}
            className={`afr-dcard__sq-wrap afr-dcard__sq-wrap--${f.size}`}
            style={{ "--ri": i } as CSSProperties}
          >
            {/* Number / stat above — always visible */}
            <div className="afr-dcard__sq-stat">
              {f.stat
                ? <span className="afr-dcard__sq-stat-num">{f.stat}</span>
                : <span className="afr-dcard__sq-stat-lbl">{f.label}</span>
              }
            </div>
            {/* Squircle shape */}
            <div className={`afr-dcard__sq afr-dcard__sq--${f.mod}`} aria-hidden="true" />
          </div>
        ))}
      </div>

      {/* Values table below */}
      <dl className="afr-dcard__tbl">
        {fields.map((f, i) => (
          <div key={f.mod} className={`afr-dcard__tcol afr-dcard__tcol--${f.mod}`} style={{ "--ri": i } as CSSProperties}>
            <dt>{f.label}</dt>
            <dd>
              {f.mod === "cf" && conf
                ? <><strong>{conf.num}{conf.unit}</strong>{conf.rest ? " " + conf.rest : ""}</>
                : f.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
