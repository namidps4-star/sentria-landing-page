import { ACTIVITY_LIST, CAPABILITIES, SECTOR_ALERTS } from "@/content/africa-activities"
import { SHARED } from "@/content/africa-activity-pages"
import { designFor } from "@/content/africa-designs"
import { SECTOR_PAGE } from "@/content/sector-pages"
import { AfricaScenes } from "./africa-scenes"
import { AfricaStage } from "./africa-stage"
import { MapHero } from "./africa-network-map"
import { AfricaStepsPanels } from "./africa-steps-panels"
import { AfricaMorning } from "./africa-morning"
import { AfricaExample } from "./africa-example"
import { AfricaFaqAccordion, type FaqTone } from "./africa-faq-accordion"
import { AfricaQueuePreview } from "./africa-queue-preview"
import { AfricaDecisionCard } from "./africa-decision-card"
import "./africa-variants.css"

/* Every activity page uses the same parts: the numbers of the activity, the three steps and a worked example,
   then the questions. An activity without its own steps or questions gets the shared ones, so every page has
   the same parts. The look of each part (its mood, example style and questions style) comes from
   content/africa-designs.ts, so each activity page is laid out differently. */
/* Each activity keeps its own ground for the questions: lime, sand or ink, from its design. */
const TONES: Record<string, FaqTone> = { grid: "lime", list: "sand", night: "night" }

const BAND_COLORS = ["ink", "white", "lime", "olive", "sand", "grey", "cream"] as const
type BandColor = (typeof BAND_COLORS)[number]

/* 27 activities in page order — each pair (queue, dcard) offset by 3 so adjacent bands contrast */
const SLUG_ORDER = [
  "pharmacie", "grossiste-pharma", "exploitation-agricole",
  "cooperative-agricole", "silo-stockage", "grossiste-distributeur",
  "supermarche-hypermarche", "chaine-magasins", "epicerie-proximite",
  "port-conteneurs", "entrepot-manutention", "transport-distribution",
  "preparation-expedition", "chaine-froid", "plusieurs-activites",
  "usine-production", "atelier-soustraitance", "usine-agroalimentaire",
  "transporteur-routier", "flotte-entreprise", "location-vehicules",
  "centrale-production", "generateurs-secours", "distribution-energetique",
  "clinique-hopital", "laboratoire", "veterinaire",
]

function bandFor(slug: string): { queue: BandColor; dcard: BandColor } {
  const i = SLUG_ORDER.indexOf(slug)
  const idx = i < 0 ? 0 : i
  const q = BAND_COLORS[idx % BAND_COLORS.length]
  return { queue: q, dcard: "ink" }
}

export function AfricaCapabilities({ slug, lang }: { slug: string; lang: "en" | "fr" }) {
  const c = CAPABILITIES[slug]?.[lang]
  if (!c) return null
  const design = designFor(slug)
  const youImport = lang === "en" ? "You import" : "Vous importez"
  const kicker = ACTIVITY_LIST.find((a) => a.slug === slug)?.kicker?.[lang] ?? SECTOR_PAGE[slug]?.name[lang]
  const firstSentence = c.items[0]?.does.split(/(?<=\.)\s/)[0] ?? ""
  const id = `afr-caps-${slug}-${lang}`
  const pharmacy = slug === "pharmacie"
  const alerts = SECTOR_ALERTS[slug]?.[lang] ?? []
  const bands = bandFor(slug)
  const shared = SHARED[lang]
  const steps = c.steps ?? shared.steps
  const stepsHeading = c.stepsHeading ?? shared.stepsHeading
  const faq = c.faq ?? shared.faq
  const faqHeading = c.faqHeading ?? shared.faqHeading
  return (
    <>
      {slug === "grossiste-pharma" && <AfricaStage lang={lang} />}
      {slug !== "grossiste-pharma" && <AfricaScenes kicker={kicker} items={c.items} lang={lang} />}
      <section className="afr-caps afr-caps--rest">
        <AfricaStepsPanels heading={stepsHeading} steps={steps} kicker={kicker} lang={lang} />
        {c.example && slug === "grossiste-pharma" && <MapHero kicker={kicker} title={c.example.title} result={c.example.result} lang={lang} />}
        {c.example && pharmacy && (
          <AfricaExample
            kicker={kicker}
            title={c.example.title}
            lines={c.example.lines}
            result={c.example.result}
            first={firstSentence}
            imports={c.items[0].imports}
            youImport={youImport}
            lang={lang}
            scale
            style={design.example}
          />
        )}
        {c.example && slug !== "grossiste-pharma" && !pharmacy && <AfricaMorning kicker={kicker} title={c.example.title} lines={c.example.lines} result={c.example.result} lang={lang} />}
      </section>
      {alerts.length > 0 && (
        <section className={`afr-queue-sec afr-queue-sec--${bands.queue}`}>
          <div className="wrap">
            <AfricaQueuePreview alerts={alerts} lang={lang} />
          </div>
        </section>
      )}
      {c.decisionCard && (
        <section className={`afr-dcard-sec afr-dcard-sec--${bands.dcard}`}>
          <div className="wrap">
            <AfricaDecisionCard card={c.decisionCard} lang={lang} />
          </div>
        </section>
      )}
      <AfricaFaqAccordion id={`${id}-faq`} kicker={kicker} heading={faqHeading} items={faq} lang={lang} tone={TONES[design.faq]} />
    </>
  )
}
