import "./africa-capabilities.css"
import { CAPABILITIES } from "@/content/africa-activities"
import { CapabilityOrbit } from "@/components/capability-orbit"

const LABELS = {
  en: {
    alert: "SentrIA alert",
    youImport: "You import",
    restTitle: "Hover a bubble",
    restText: "to see what SentrIA does for you.",
  },
  fr: {
    alert: "Alerte SentrIA",
    youImport: "Vous importez",
    restTitle: "Survolez une bulle",
    restText: "pour voir ce que SentrIA fait pour vous.",
  },
} as const

export function AfricaCapabilities({ slug, lang }: { slug: string; lang: "en" | "fr" }) {
  const c = CAPABILITIES[slug]?.[lang]
  if (!c) return null
  return (
    <section className="afr-caps" aria-labelledby={`afr-caps-${slug}-${lang}`}>
      <h2 id={`afr-caps-${slug}-${lang}`}>{c.heading}</h2>
      <p className="afr-caps-not">{c.notDo}</p>
      <CapabilityOrbit items={c.items} labels={LABELS[lang]} />
    </section>
  )
}
