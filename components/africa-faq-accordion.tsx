import "./africa-faq-accordion.css"

/* Questions as rows that open. The heading stays in view on the left while the rows scroll on the right. The first
   row starts open and only one is open at a time (the shared name groups the details elements, so it needs no script). */
type Item = { q: string; a: string }

const TEXT = {
  en: { sub: "Short answers, in plain words. Still unsure? Book a demo and ask us.", cta: "Book a demo" },
  fr: { sub: "Des réponses courtes, en mots simples. Un doute ? Réservez une démo et posez-nous la question.", cta: "Réserver une démo" },
}

export function AfricaFaqAccordion({ id, kicker, heading, items, lang }: { id: string; kicker?: string; heading: string; items: Item[]; lang: "en" | "fr" }) {
  const t = TEXT[lang]
  return (
    <section className="afr-fa" aria-labelledby={id} data-rv="rise">
      <div className="afr-fa-in">
        <div className="afr-fa-head">
          {kicker && <p className="eyebrow">{kicker}</p>}
          <h2 id={id}>{heading}</h2>
          <p className="afr-fa-sub">{t.sub}</p>
          <a className="afr-fa-cta" href={`/${lang}#demo`}>
            {t.cta} <span aria-hidden="true">→</span>
          </a>
        </div>
        <div className="afr-fa-list">
          {items.map((it, i) => (
            <details key={it.q} name="afr-fa" open={i === 0}>
              <summary>
                <span className="q">{it.q}</span>
                <i aria-hidden="true" />
              </summary>
              <div className="a">
                <p>{it.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
