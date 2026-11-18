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

export function AfricaDecisionCard({ card, lang }: { card: DecisionCardData; lang: "en" | "fr" }) {
  const [l0, l1, l2, l3] = LABELS[lang]
  const fields: [string, string][] = [
    [l0, card.evidence],
    [l1, card.confidence],
    [l2, card.impact],
    [l3, card.outcome],
  ]
  return (
    <div className="afr-dcard">
      <p className="afr-dcard__kicker">{KICKER[lang]}</p>
      <div className="afr-dcard__grid">
        {fields.map(([label, value]) => (
          <div key={label} className="afr-dcard__slot">
            <span className="afr-dcard__label">{label}</span>
            <p className="afr-dcard__value">{value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
