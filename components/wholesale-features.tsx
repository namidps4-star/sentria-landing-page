import Image from "next/image"
import { WHOLESALE_FEATURES } from "@/content/wholesale-features"
import "./wholesale-features.css"

/* Five hero blocks for the wholesaler page, one per planned feature. Each one says it is planned. */
export function WholesaleFeatures({ lang }: { lang: "en" | "fr" }) {
  const planned = lang === "en" ? "Planned" : "Prévu"
  const cta = lang === "en" ? "Book a demo →" : "Demander une démo →"
  const href = lang === "en" ? "/en#demo" : "/fr#demo"
  return (
    <section className="wsf" aria-label={lang === "en" ? "Planned wholesale features" : "Fonctions prévues pour les grossistes"}>
      {WHOLESALE_FEATURES.map((f) => (
        <article key={f.key} className="wsf-item">
          <div className="wrap wsf-grid">
            <div className="wsf-text">
              <span className="wsf-tag">{planned}</span>
              <div className="wsf-kicker">{f.kicker[lang]}</div>
              <h2 className="wsf-h">
                {f.h2[lang][0]}
                <br />
                {f.h2[lang][1]}
              </h2>
              <p className="wsf-lead">{f.lead[lang]}</p>
              <p className="wsf-note">{f.note[lang]}</p>
              <a className="btn btn-lime" href={href}>
                {cta}
              </a>
            </div>
            <figure className="wsf-fig">
              <Image src={f.image} alt={f.alt[lang]} width={880} height={620} sizes="(max-width: 760px) 100vw, 560px" />
            </figure>
          </div>
        </article>
      ))}
    </section>
  )
}
