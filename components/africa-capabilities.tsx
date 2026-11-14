import { ACTIVITY_LIST, CAPABILITIES } from "@/content/africa-activities"
import { CapRuler } from "./africa-ruler"
import { AfricaSteps } from "./africa-steps"

export function AfricaCapabilities({ slug, lang }: { slug: string; lang: "en" | "fr" }) {
  const c = CAPABILITIES[slug]?.[lang]
  if (!c) return null
  const youImport = lang === "en" ? "You import" : "Vous importez"
  const youSee = lang === "en" ? "What you see" : "Ce que vous voyez"
  const kicker = ACTIVITY_LIST.find((a) => a.slug === slug)?.kicker?.[lang]
  return (
    <section className={slug === "grossiste-pharma" ? "afr-caps afr-caps--sand" : "afr-caps"} aria-labelledby={`afr-caps-${slug}-${lang}`}>
      {kicker && <p className="eyebrow">{kicker}</p>}
      <h2 id={`afr-caps-${slug}-${lang}`}>{c.heading}</h2>
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
      {c.steps && <AfricaSteps heading={c.stepsHeading ?? ""} steps={c.steps} />}
      {c.example && (
        <div className="afr-caps-block">
          <h3>{c.example.title}</h3>
          <div className="afr-ex">
            <ul>
              {c.example.lines.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
            <p>{c.example.result}</p>
          </div>
        </div>
      )}
      {c.faq && (
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
      )}
    </section>
  )
}
