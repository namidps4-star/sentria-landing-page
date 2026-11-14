import { CAPABILITIES } from "@/content/africa-activities"

export function AfricaCapabilities({ slug, lang }: { slug: string; lang: "en" | "fr" }) {
  const c = CAPABILITIES[slug]?.[lang]
  if (!c) return null
  const youImport = lang === "en" ? "You import" : "Vous importez"
  const youSee = lang === "en" ? "What you see" : "Ce que vous voyez"
  return (
    <section className="afr-caps" aria-labelledby={`afr-caps-${slug}-${lang}`}>
      <h2 id={`afr-caps-${slug}-${lang}`}>{c.heading}</h2>
      <p className="afr-caps-not">{c.notDo}</p>
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
              <blockquote className="afr-caps-alert">{item.example}</blockquote>
            </div>
          </li>
        ))}
      </ul>
      {c.steps && (
        <div className="afr-caps-block">
          <h3>{c.stepsHeading}</h3>
          <ol className="afr-steps">
            {c.steps.map((st, i) => (
              <li key={st.title}>
                <span className="afr-step-n">{i + 1}</span>
                <div>
                  <b>{st.title}</b>
                  <p>{st.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}
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
