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
    { label: l0, value: card.evidence, mod: "ev", conf: null },
    { label: l1, value: card.confidence, mod: "cf", conf: conf },
    { label: l2, value: card.impact, mod: "im", conf: null },
    { label: l3, value: card.outcome, mod: "oc", conf: null },
  ] as const

  return (
    <div className="afr-dcard" ref={ref} data-vis={vis ? "1" : "0"}>
      <p className="afr-dcard__kicker">{KICKER[lang]}</p>

      <div className="afr-dcard__grid">
        {fields.map((f, i) => (
          <div
            key={f.mod}
            className={`afr-dcard__col afr-dcard__col--${f.mod}`}
            style={{ "--ri": i } as CSSProperties}
          >
            <span className="afr-dcard__field-label">{f.label}</span>
            <div className="afr-dcard__sq" aria-hidden="true">
              {f.conf && (
                <span className="afr-dcard__sq-num">
                  {f.conf.num}
                  <span className="afr-dcard__sq-unit">{f.conf.unit}</span>
                </span>
              )}
            </div>
            <p className="afr-dcard__val">
              {f.conf ? (
                <><strong>{f.conf.num}{f.conf.unit}</strong>{f.conf.rest ? " " + f.conf.rest : ""}</>
              ) : f.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
