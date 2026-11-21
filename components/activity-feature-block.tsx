"use client"

import { useEffect } from "react"
import { ACTIVITY_FEATURES } from "@/content/activity-features"
import { useSiteCurrency } from "./site-currency"
import { WcFeatureCard } from "./wc-feature-card"
import "./wc-cards.css"
import "./wholesale-features.css"

/* The feature block of one activity: the text on one side, the card on the other. The card's motion starts when it is seen. */
export function ActivityFeatureBlock({ slug, lang }: { slug: string; lang: "en" | "fr" }) {
  const currency = useSiteCurrency()
  const f = ACTIVITY_FEATURES.find((x) => x.slug === slug)
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
    figs.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
  if (!f) return null
  const c = f.copy[lang]
  const cta = c.cta
  const href = lang === "en" ? "/en#demo" : "/fr#demo"
  return (
    <section className="wsf" aria-label={lang === "en" ? "Feature" : "Fonction"}>
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
            <WcFeatureCard feature={f} lang={lang} currency={currency} />
          </figure>
        </div>
      </article>
    </section>
  )
}
