"use client"

import { useEffect } from "react"
import { SLOW_STOCK_COPY } from "@/content/pharmacy-features"
import { useSiteCurrency } from "./site-currency"
import { WcSlowStockCard } from "./wc-slow-stock-card"
import "./wc-cards.css"
import "./wholesale-features.css"

/* The pharmacy feature block: slow stock. Same layout as the wholesaler blocks; the card moves in when it is seen. */
export function PharmacyFeatures({ lang }: { lang: "en" | "fr" }) {
  const currency = useSiteCurrency()
  const c = SLOW_STOCK_COPY[lang]
  const cta = lang === "en" ? "Book a demo →" : "Demander une démo →"
  const href = lang === "en" ? "/en#demo" : "/fr#demo"

  useEffect(() => {
    const figs = document.querySelectorAll<HTMLElement>(".wsf-fig")
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.setAttribute("data-in", "")
            io.unobserve(e.target)
          }
        }),
      { threshold: 0.2 },
    )
    figs.forEach((f) => io.observe(f))
    return () => io.disconnect()
  }, [])

  return (
    <section className="wsf" aria-label={lang === "en" ? "Pharmacy features" : "Fonctions pour les pharmacies"}>
      <article className="wsf-item">
        <div className="wrap wsf-grid">
          <div className="wsf-text">
            <div className="wsf-kicker">{c.kicker}</div>
            <h2 className="wsf-h">
              {c.h2[0]}
              <br />
              {c.h2[1]}
            </h2>
            <p className="wsf-lead">{c.lead}</p>
            <p className="wsf-note">{c.note}</p>
            <a className="btn btn-lime" href={href}>
              {cta}
            </a>
          </div>
          <figure className="wsf-fig">
            <WcSlowStockCard lang={lang} currency={currency} />
          </figure>
        </div>
      </article>
    </section>
  )
}
