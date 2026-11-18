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

  return (
    <div className="afr-dcard" ref={ref} data-vis={vis ? "1" : "0"}>
      <p className="afr-dcard__kicker">{KICKER[lang]}</p>

      {/* Diagram — decorative, desktop only */}
      <div className="afr-dcard__stage" aria-hidden="true">
        <svg className="afr-dcard__svg" viewBox="0 0 760 450" xmlns="http://www.w3.org/2000/svg" fill="none">
          <defs>
            <marker id="dcard-ah" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0,0.5 L0,5.5 L6,3 z" fill="#0b0c08" />
            </marker>
          </defs>
          {/* Orbit rings */}
          <ellipse cx="175" cy="150" rx="148" ry="68" stroke="#0b0c08" strokeWidth="1.2" strokeOpacity="0.22" />
          <ellipse cx="568" cy="108" rx="118" ry="52" stroke="#0b0c08" strokeWidth="1.2" strokeOpacity="0.22" />
          <ellipse cx="600" cy="302" rx="112" ry="51" stroke="#0b0c08" strokeWidth="1.2" strokeOpacity="0.22" />
          {/* Arrows */}
          <path d="M322,142 C410,95 440,98 450,108" stroke="#0b0c08" strokeWidth="1.1" strokeOpacity="0.55" markerEnd="url(#dcard-ah)" />
          <path d="M318,162 C400,220 448,268 488,295" stroke="#0b0c08" strokeWidth="1.1" strokeOpacity="0.55" markerEnd="url(#dcard-ah)" />
          <path d="M565,160 C542,258 475,335 410,398" stroke="#0b0c08" strokeWidth="1.1" strokeOpacity="0.55" markerEnd="url(#dcard-ah)" />
          <path d="M524,345 C492,378 460,390 420,398" stroke="#0b0c08" strokeWidth="1.1" strokeOpacity="0.55" markerEnd="url(#dcard-ah)" />
        </svg>

        {/* Evidence */}
        <div className="afr-dcard__node" style={{ left: "23.0%", top: "33.3%", "--nd": ".2s" } as CSSProperties}>
          <span className="afr-dcard__pill">{l0}</span>
        </div>

        {/* Confidence */}
        <div className="afr-dcard__node" style={{ left: "74.7%", top: "24.0%", "--nd": ".35s" } as CSSProperties}>
          {conf ? (
            <span className="afr-dcard__pill afr-dcard__pill--num">
              {conf.num}<span>{conf.unit}</span>
            </span>
          ) : (
            <span className="afr-dcard__pill">{l1}</span>
          )}
        </div>

        {/* Impact */}
        <div className="afr-dcard__node" style={{ left: "78.9%", top: "67.1%", "--nd": ".5s" } as CSSProperties}>
          <span className="afr-dcard__pill">{l2}</span>
        </div>

        {/* Outcome */}
        <div className="afr-dcard__node" style={{ left: "46.7%", top: "91.1%", "--nd": ".7s" } as CSSProperties}>
          <span className="afr-dcard__pill afr-dcard__pill--dashed">{l3}</span>
        </div>
      </div>

      {/* Value list */}
      <dl className="afr-dcard__list">
        <div className="afr-dcard__item afr-dcard__item--ev" style={{ "--ri": 0 } as CSSProperties}>
          <dt>{l0}</dt>
          <dd>{card.evidence}</dd>
        </div>
        <div className="afr-dcard__item afr-dcard__item--cf" style={{ "--ri": 1 } as CSSProperties}>
          <dt>{l1}</dt>
          <dd>{conf ? <><strong>{conf.num}{conf.unit}</strong>{conf.rest ? " " + conf.rest : ""}</> : card.confidence}</dd>
        </div>
        <div className="afr-dcard__item afr-dcard__item--im" style={{ "--ri": 2 } as CSSProperties}>
          <dt>{l2}</dt>
          <dd>{card.impact}</dd>
        </div>
        <div className="afr-dcard__item afr-dcard__item--oc" style={{ "--ri": 3 } as CSSProperties}>
          <dt>{l3}</dt>
          <dd>{card.outcome}</dd>
        </div>
      </dl>
    </div>
  )
}
