import { ACTIVITY_LIST, CAPABILITIES } from "@/content/africa-activities"
import { FAQ_WORDS, SHARED } from "@/content/africa-activity-pages"
import { designFor } from "@/content/africa-designs"
import { SECTOR_PAGE } from "@/content/sector-pages"
import { AfricaLedger } from "./africa-ledger"
import { AfricaSteps } from "./africa-steps"
import { AfricaExample } from "./africa-example"
import { AfricaExampleCurve } from "./africa-example-curve"
import { AfricaFaqGrid } from "./africa-faq-grid"
import "./africa-variants.css"

/* Every activity page uses the same parts: the ledger of capabilities, the three steps and a worked example,
   then the questions. An activity without its own steps or questions gets the shared ones, so every page has
   the same parts. The look of each part (its mood, example style and questions style) comes from
   content/africa-designs.ts, so each activity page is laid out differently. */
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
      <AfricaLedger id={id} kicker={kicker} heading={c.heading} items={c.items} notDo={c.notDo} lang={lang} mood={design.mood} />
      <section className="afr-caps afr-caps--rest">
        <AfricaSteps heading={stepsHeading} steps={steps} kicker={kicker} />
        {c.example && (
          slug === "grossiste-pharma" ? (
            <AfricaExampleCurve
              kicker={kicker}
              title={c.example.title}
              result={c.example.result}
              lang={lang}
            />
          ) : (
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
          )
        )}
      </section>
      <AfricaFaqGrid
        id={`${id}-faq`}
        kicker={kicker}
        heading={faqHeading}
        items={faq}
        lang={lang}
        words={pharmacy ? undefined : FAQ_WORDS[lang]}
        style={design.faq}
      />
    </>
  )
}
