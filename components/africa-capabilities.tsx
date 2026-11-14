import { ACTIVITY_LIST, CAPABILITIES } from "@/content/africa-activities"
import { CapRuler } from "./africa-ruler"
import { AfricaSteps } from "./africa-steps"
import { AfricaExample } from "./africa-example"
import { AfricaLedger } from "./africa-ledger"
import { AfricaFaqGrid } from "./africa-faq-grid"

export function AfricaCapabilities({ slug, lang }: { slug: string; lang: "en" | "fr" }) {
  const c = CAPABILITIES[slug]?.[lang]
  if (!c) return null
  const youImport = lang === "en" ? "You import" : "Vous importez"
  const youSee = lang === "en" ? "What you see" : "Ce que vous voyez"
  const kicker = ACTIVITY_LIST.find((a) => a.slug === slug)?.kicker?.[lang]
  const firstSentence = c.items[0]?.does.split(/(?<=\.)\s/)[0] ?? ""
  const id = `afr-caps-${slug}-${lang}`
  const dark = (
    <>
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
          scale={slug === "pharmacie"}
        />
      )}
    </>
  )
  const faqList = c.faq && (
    <div className="afr-caps-block">
      <h3>{c.faqHeading}</h3>
      <dl className="afr-faq">
        {c.faq.map((f) => (
          <div key={f.q}>
            <dt>{f.q}</dt>
            <dd>{f.a}</dd>
          </div>
        ))}
      </dl>
    </div>
  )

  /* Pharmacy: the list is a cream ledger, the steps and day scale stay in the dark section,
     and the FAQ is a lime 2x2 grid of drawings. */
  if (slug === "pharmacie") {
    return (
      <>
        <AfricaLedger id={id} kicker={kicker} heading={c.heading} items={c.items} notDo={c.notDo} lang={lang} />
        <section className="afr-caps afr-caps--rest">{dark}</section>
        {c.faq && <AfricaFaqGrid id={`${id}-faq`} kicker={kicker} heading={c.faqHeading ?? ""} items={c.faq} lang={lang} />}
      </>
    )
  }

  return (
    <section className={slug === "grossiste-pharma" ? "afr-caps afr-caps--sand" : "afr-caps"} aria-labelledby={id}>
      {kicker && <p className="eyebrow">{kicker}</p>}
      <h2 id={id}>{c.heading}</h2>
      <ul>
        {c.items.map((item, i) => (
          <li key={item.title} className="afr-caps-row" data-rv="rise" style={{ "--i": i } as React.CSSProperties}>
            <div className="afr-caps-copy">
              <h3>{item.title}</h3>
              <p>{item.does}</p>
              <p className="afr-caps-imp">
                <b>{youImport}:</b> {item.imports}
              </p>
            </div>
            <div className="afr-caps-view">
              <span className="afr-caps-tag">{youSee}</span>
              {slug === "grossiste-pharma" && <CapRuler index={i} lang={lang} />}
              <blockquote className="afr-caps-alert">{item.example}</blockquote>
            </div>
          </li>
        ))}
      </ul>
      <p className="afr-caps-not">{c.notDo}</p>
      {dark}
      {faqList}
    </section>
  )
}
