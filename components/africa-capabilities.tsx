import { ACTIVITY_LIST, CAPABILITIES } from "@/content/africa-activities"
import { SHARED } from "@/content/africa-activity-pages"
import { designFor } from "@/content/africa-designs"
import { SECTOR_PAGE } from "@/content/sector-pages"
import { AfricaLedger } from "./africa-ledger"
import { AfricaStage } from "./africa-stage"
import { MapHero } from "./africa-network-map"
import { AfricaSteps } from "./africa-steps"
import { AfricaExample } from "./africa-example"
import { AfricaFaqAccordion, type FaqTone } from "./africa-faq-accordion"
import "./africa-variants.css"

/* Every activity page uses the same parts: the ledger of capabilities, the three steps and a worked example,
   then the questions. An activity without its own steps or questions gets the shared ones, so every page has
   the same parts. The look of each part (its mood, example style and questions style) comes from
   content/africa-designs.ts, so each activity page is laid out differently. */
/* Each activity keeps its own ground for the questions: lime, sand or ink, from its design. */
const TONES: Record<string, FaqTone> = { grid: "lime", list: "sand", night: "night" }

export function AfricaCapabilities({ slug, lang }: { slug: string; lang: "en" | "fr" }) {
  const c = CAPABILITIES[slug]?.[lang]
  if (!c) return null
  const design = designFor(slug)
  const youImport = lang === "en" ? "You import" : "Vous importez"
  const kicker = ACTIVITY_LIST.find((a) => a.slug === slug)?.kicker?.[lang] ?? SECTOR_PAGE[slug]?.name[lang]
  const firstSentence = c.items[0]?.does.split(/(?<=\.)\s/)[0] ?? ""
  const id = `afr-caps-${slug}-${lang}`
  const pharmacy = slug === "pharmacie"
  const shared = SHARED[lang]
  const steps = c.steps ?? shared.steps
  const stepsHeading = c.stepsHeading ?? shared.stepsHeading
  const faq = c.faq ?? shared.faq
  const faqHeading = c.faqHeading ?? shared.faqHeading
  return (
    <>
      {slug === "grossiste-pharma" && <AfricaStage lang={lang} />}
      {slug !== "grossiste-pharma" && <AfricaLedger id={id} kicker={kicker} heading={c.heading} items={c.items} notDo={c.notDo} lang={lang} mood={design.mood} />}
      <section className="afr-caps afr-caps--rest">
        <AfricaSteps heading={stepsHeading} steps={steps} kicker={kicker} />
        {c.example && slug === "grossiste-pharma" && <MapHero kicker={kicker} title={c.example.title} result={c.example.result} lang={lang} />}
        {c.example && slug !== "grossiste-pharma" && (
          <AfricaExample
            kicker={kicker}
            title={c.example.title}
            lines={c.example.lines}
            result={c.example.result}
            first={firstSentence}
            imports={c.items[0].imports}
            youImport={youImport}
            lang={lang}
            scale={pharmacy}
            style={design.example}
          />
        )}
      </section>
      <AfricaFaqAccordion id={`${id}-faq`} kicker={kicker} heading={faqHeading} items={faq} lang={lang} tone={TONES[design.faq]} />
    </>
  )
}
