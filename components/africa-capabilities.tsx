import { ACTIVITY_LIST, CAPABILITIES } from "@/content/africa-activities"
import { FAQ_WORDS } from "@/content/africa-activity-pages"
import { SECTOR_PAGE } from "@/content/sector-pages"
import { AfricaLedger } from "./africa-ledger"
import { AfricaSteps } from "./africa-steps"
import { AfricaExample } from "./africa-example"
import { AfricaFaqGrid } from "./africa-faq-grid"

/* Every activity page uses this one template: the ledger of capabilities, then the three steps and a worked
   example on the dark ground, then the four questions as a lime grid. Only the content differs. */
export function AfricaCapabilities({ slug, lang }: { slug: string; lang: "en" | "fr" }) {
  const c = CAPABILITIES[slug]?.[lang]
  if (!c) return null
  const youImport = lang === "en" ? "You import" : "Vous importez"
  const kicker = ACTIVITY_LIST.find((a) => a.slug === slug)?.kicker?.[lang] ?? SECTOR_PAGE[slug]?.name[lang]
  const firstSentence = c.items[0]?.does.split(/(?<=\.)\s/)[0] ?? ""
  const id = `afr-caps-${slug}-${lang}`
  const pharmacy = slug === "pharmacie"
  return (
    <>
      <AfricaLedger id={id} kicker={kicker} heading={c.heading} items={c.items} notDo={c.notDo} lang={lang} />
      <section className="afr-caps afr-caps--rest">
        {c.steps && <AfricaSteps heading={c.stepsHeading ?? ""} steps={c.steps} kicker={kicker} />}
        {c.example && (
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
          />
        )}
      </section>
      {c.faq && <AfricaFaqGrid id={`${id}-faq`} kicker={kicker} heading={c.faqHeading ?? ""} items={c.faq} lang={lang} words={pharmacy ? undefined : FAQ_WORDS[lang]} />}
    </>
  )
}
