"use client"

import type { ReactNode } from "react"
import { WHOLESALE_FEATURES } from "@/content/wholesale-features"
import { useSiteCurrency } from "./site-currency"
import { WcStockCard } from "./wc-stock-card"
import { WcForecastCard } from "./wc-forecast-card"
import { WcCreditsCard } from "./wc-credits-card"
import { WcColdChainCard } from "./wc-cold-chain-card"
import { WcHubsCard } from "./wc-hubs-card"
import "./wc-cards.css"
import "./wholesale-features.css"

/* Five hero blocks for the wholesaler page, one per feature.
   The mockup is a live card component; money follows the visitor's currency (USD fallback). */
export function WholesaleFeatures({ lang }: { lang: "en" | "fr" }) {
  const currency = useSiteCurrency()
  const cta = lang === "en" ? "Book a demo →" : "Demander une démo →"
  const href = lang === "en" ? "/en#demo" : "/fr#demo"
  const cards: Record<string, ReactNode> = {
    abc: <WcStockCard lang={lang} currency={currency} />,
    forecast: <WcForecastCard lang={lang} />,
    credits: <WcCreditsCard lang={lang} currency={currency} />,
    sensors: <WcColdChainCard lang={lang} />,
    hubs: <WcHubsCard lang={lang} currency={currency} />,
  }
  return (
    <section className="wsf" aria-label={lang === "en" ? "Wholesale features" : "Fonctions pour les grossistes"}>
      {WHOLESALE_FEATURES.map((f) => (
        <article key={f.key} className="wsf-item">
          <div className="wrap wsf-grid">
            <div className="wsf-text">
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
            <figure className="wsf-fig" aria-label={f.alt[lang]}>
              {cards[f.key]}
            </figure>
          </div>
        </article>
      ))}
    </section>
  )
}
