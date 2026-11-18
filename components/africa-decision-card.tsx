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

/* Extract a leading number from the confidence string, e.g. "88% — based on..." → { num: "88", unit: "%", rest: "based on..." } */
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
      <div className="afr-dcard__grid">

        {/* Evidence */}
        <div className="afr-dcard__slot afr-dcard__slot--ev" style={{ "--ri": 0 } as CSSProperties}>
          <span className="afr-dcard__label">{l0}</span>
          <p className="afr-dcard__value">{card.evidence}</p>
        </div>

        {/* Confidence */}
        <div className="afr-dcard__slot afr-dcard__slot--cf" style={{ "--ri": 1 } as CSSProperties}>
          <span className="afr-dcard__label">{l1}</span>
          {conf ? (
            <>
              <div className="afr-dcard__big" aria-hidden="true">
                {conf.num}<span>{conf.unit}</span>
              </div>
              <p className="afr-dcard__value afr-dcard__value--sub">{conf.rest}</p>
            </>
          ) : (
            <p className="afr-dcard__value">{card.confidence}</p>
          )}
        </div>

        {/* Impact */}
        <div className="afr-dcard__slot afr-dcard__slot--im" style={{ "--ri": 2 } as CSSProperties}>
          <span className="afr-dcard__label">{l2}</span>
          <p className="afr-dcard__value">{card.impact}</p>
        </div>

        {/* Outcome */}
        <div className="afr-dcard__slot afr-dcard__slot--oc" style={{ "--ri": 3 } as CSSProperties}>
          <span className="afr-dcard__label">{l3}</span>
          <p className="afr-dcard__value">{card.outcome}</p>
        </div>

      </div>
    </div>
  )
}
