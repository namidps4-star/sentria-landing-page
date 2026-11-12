import "./africa-capabilities.css"
import { CAPABILITIES } from "@/content/africa-activities"
import { CapabilityBubble } from "@/components/capability-bubble"

const LABELS = {
  en: {
    problem: "Problem",
    solution: "Solution",
    hint: "Hover or tap to see SentrIA at work",
    example: "SentrIA alert",
    youImport: "You import",
  },
  fr: {
    problem: "Problème",
    solution: "Solution",
    hint: "Survolez ou touchez pour voir SentrIA à l'œuvre",
    example: "Alerte SentrIA",
    youImport: "Vous importez",
  },
} as const

export function AfricaCapabilities({ slug, lang }: { slug: string; lang: "en" | "fr" }) {
  const c = CAPABILITIES[slug]?.[lang]
  if (!c) return null
  const labels = LABELS[lang]
  return (
    <section className="afr-caps" aria-labelledby={`afr-caps-${slug}-${lang}`}>
      <h2 id={`afr-caps-${slug}-${lang}`}>{c.heading}</h2>
      <ul className="afr-caps-list">
        {c.items.map((item) => (
          <li key={item.title} className="afr-caps-row">
            <CapabilityBubble
              problem={item.problem}
              example={item.example}
              imports={item.imports}
              labels={labels}
            />
            <div className="afr-caps-ed">
              <h3>{item.title}</h3>
              <p>{item.does}</p>
            </div>
          </li>
        ))}
      </ul>
      <p className="afr-caps-not">{c.notDo}</p>
    </section>
  )
}
