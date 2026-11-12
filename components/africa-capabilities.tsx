import "./africa-capabilities.css"
import { CAPABILITIES } from "@/content/africa-capabilities"
import { CapabilityOrbit } from "@/components/capability-orbit"

const LABELS = {
  en: {
    alert: "SentrIA alert",
    youImport: "You import",
    hint: "Hover a bubble",
    hintOpen: "Solution open",
    cta: "Book a demo",
    ctaHref: "#demo",
  },
  fr: {
    alert: "Alerte SentrIA",
    youImport: "Vous importez",
    hint: "Survolez une bulle",
    hintOpen: "Solution ouverte",
    cta: "Demander une démo",
    ctaHref: "#demo",
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
