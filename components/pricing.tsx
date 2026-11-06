"use client"

import { useEffect, useState } from "react"

import { useLang } from "@/components/lang"
import { B } from "@/components/t"
import { Check, iv } from "@/components/ui"
import { DEFAULT_CURRENCY, currencyForTimeZone, SITE_PRICES, formatPrice, perSite, type SiteCurrency } from "@/content/prices"

type Plan = {
  id: "decouverte" | "pro" | "business" | "entreprise"
  name: string
  blurb: { en: string; fr: string }
  items: { en: string; fr: string; soon?: boolean }[]
  cta: { en: string; fr: string }
  featured?: boolean
}

/* What each plan includes is what the app enforces today (lib/plans.ts ENTITLEMENTS in the app). */
const PLANS: Plan[] = [
  {
    id: "decouverte",
    name: "Découverte",
    blurb: { en: "To see it work on one site.", fr: "Pour le voir fonctionner sur un site." },
    items: [
      { en: "1 site, 1 user", fr: "1 site, 1 utilisateur" },
      { en: "20 questions to the assistant per month", fr: "20 questions à l'assistant par mois" },
      { en: "30 days of history", fr: "30 jours d'historique" },
    ],
    cta: { en: "Start free", fr: "Commencer gratuitement" },
  },
  {
    id: "pro",
    name: "Pro",
    blurb: { en: "For one team running one site.", fr: "Pour une équipe qui gère un site." },
    items: [
      { en: "1 site, 3 users", fr: "1 site, 3 utilisateurs" },
      { en: "Unlimited questions", fr: "Questions illimitées" },
      { en: "1 year of history", fr: "1 an d'historique" },
      { en: "SMS alerts", fr: "Alertes par SMS" },
      { en: "Treatment tracking", fr: "Suivi des traitements" },
    ],
    cta: { en: "Choose Pro", fr: "Choisir Pro" },
  },
  {
    id: "business",
    name: "Business",
    blurb: { en: "For several linked sites.", fr: "Pour plusieurs sites reliés." },
    items: [
      { en: "3 sites, 10 users", fr: "3 sites, 10 utilisateurs" },
      { en: "Intelligence: learned supplier lead times", fr: "Intelligence : délais fournisseurs appris" },
      { en: "Intelligence: seasonal advice", fr: "Intelligence : conseils saisonniers", soon: true },
      { en: "Linked departments", fr: "Départements reliés" },
      { en: "2 years of history", fr: "2 ans d'historique" },
      { en: "SMS alerts", fr: "Alertes par SMS" },
      { en: "Treatment tracking", fr: "Suivi des traitements" },
    ],
    cta: { en: "Choose Business", fr: "Choisir Business" },
    featured: true,
  },
  {
    id: "entreprise",
    name: "Entreprise",
    blurb: { en: "Multi-sector, multi-site.", fr: "Multi-secteur, multi-site." },
    items: [
      { en: "Unlimited sectors, sites and users", fr: "Secteurs, sites et utilisateurs illimités" },
      { en: "Full history", fr: "Historique complet" },
      { en: "Dedicated onboarding", fr: "Mise en route dédiée" },
    ],
    cta: { en: "Talk to us", fr: "Parlez-nous" },
  },
]

/* The app's Intelligence mark (a chip with a bolt), drawn the same, in lime. */
function IntelligenceMark() {
  return (
    <svg className="intel-mark" viewBox="0 0 24 24" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5">
        <path d="M7 10C7 8.58579 7 7.87868 7.43934 7.43934C7.87868 7 8.58579 7 10 7H14C15.4142 7 16.1213 7 16.5607 7.43934C17 7.87868 17 8.58579 17 10V14C17 15.4142 17 16.1213 16.5607 16.5607C16.1213 17 15.4142 17 14 17H10C8.58579 17 7.87868 17 7.43934 16.5607C7 16.1213 7 15.4142 7 14V10Z" />
        <path strokeLinejoin="round" d="M12.4286 10L11 12H13L11.5714 14" />
        <path d="M4 12C4 8.22876 4 6.34315 5.17157 5.17157C6.34315 4 8.22876 4 12 4C15.7712 4 17.6569 4 18.8284 5.17157C20 6.34315 20 8.22876 20 12C20 15.7712 20 17.6569 18.8284 18.8284C17.6569 20 15.7712 20 12 20C8.22876 20 6.34315 20 5.17157 18.8284C4 17.6569 4 15.7712 4 12Z" />
        <path d="M4 12H2M22 12H20M4 9H2M22 9H20M4 15H2M22 15H20M12 20L12 22M12 2L12 4M9 20L9 22M9 2L9 4M15 20L15 22M15 2L15 4" />
      </g>
    </svg>
  )
}

function Soon() {
  return (
    <svg className="ck" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ opacity: 0.6 }}>
      <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" />
    </svg>
  )
}

export function PricingGrid() {
  const lang = useLang()
  const [currency, setCurrency] = useState<SiteCurrency>(DEFAULT_CURRENCY)

  // Start from the visitor's region. The server HTML shows euros, then the browser picks its own currency.
  useEffect(() => {
    setCurrency(currencyForTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone)) // eslint-disable-line react-hooks/set-state-in-effect
  }, [])

  return (
    <>
      <div className="plans plans-4" data-currency={currency}>
        {PLANS.map((p, i) => {
          const tier = p.id === "pro" ? 0 : p.id === "business" ? 1 : null
          const amount = tier === null ? null : SITE_PRICES[currency][tier]
          return (
            <article key={p.id} className={`plan${p.featured ? " featured" : ""}`} data-tilt="" data-rv="rise" data-plan={p.id} style={iv(i + 2)}>
              <h3>{p.name}</h3>
              <p className="plan-p">
                <B en={p.blurb.en} fr={p.blurb.fr} />
                {p.id === "business" && amount !== null ? (
                  <>
                    {" "}
                    <B en={`About ${formatPrice(perSite(amount), currency, "en")} per site.`} fr={`Environ ${formatPrice(perSite(amount), currency, "fr")} par site.`} />
                  </>
                ) : null}
              </p>
              <div className="price">
                {amount !== null ? (
                  <>
                    <span className="price-amount" data-amount={amount}>
                      {formatPrice(amount, currency, lang)}
                    </span>
                    <span className="price-per">
                      <B en="per month" fr="par mois" />
                    </span>
                    {p.featured ? (
                      <span className="badge">
                        <B en="Recommended" fr="Recommandé" />
                      </span>
                    ) : null}
                  </>
                ) : p.id === "decouverte" ? (
                  <>
                    <span className="price-amount">
                      <B en="Free" fr="Gratuit" />
                    </span>
                    <span className="price-per">
                      <B en="Business trial for 14 days" fr="Essai Business de 14 jours" />
                    </span>
                  </>
                ) : (
                  <>
                    <span className="price-amount price-quote">
                      <B en="Contact us" fr="Nous contacter" />
                    </span>
                    <span className="price-per">
                      <B en="Priced to your scope" fr="Selon votre périmètre" />
                    </span>
                  </>
                )}
              </div>
              <ul>
                {p.items.map((it) => (
                  <li key={it.en}>
                    {it.soon ? <Soon /> : <Check />}
                    <span>
                      <B en={it.en} fr={it.fr} />
                      {it.soon ? (
                        <span className="soon-tag">
                          <B en="Soon" fr="Bientôt" />
                        </span>
                      ) : null}
                    </span>
                  </li>
                ))}
              </ul>
              <a className={`btn ${p.featured ? "btn-ink" : "btn-line"}`} href="#demo" data-mag="">
                <B en={p.cta.en} fr={p.cta.fr} />
              </a>
            </article>
          )
        })}
      </div>
      <div className="intel-row" data-rv="rise">
        <section className="intel">
          <h3>
            <IntelligenceMark />
            SentrIA Intelligence{" "}
            <span>
              <B en="Business and Entreprise" fr="Business et Entreprise" />
            </span>
          </h3>
          <p className="intel-lead">
            <B en="Your own history, turned into better orders." fr="Votre propre historique, transformé en meilleures commandes." />
          </p>
          <ul>
            <li>
              <Check />
              <span>
                <B en="Supplier lead times learned from your history" fr="Délais fournisseurs appris sur votre historique" />
              </span>
            </li>
            <li>
              <Soon />
              <span>
                <B
                  en="Seasonal stock advice, such as malaria in the rainy season and flu in the harmattan"
                  fr="Conseils de stock saisonniers, comme le paludisme en saison des pluies et la grippe à l'harmattan"
                />
                <span className="soon-tag">
                  <B en="Soon" fr="Bientôt" />
                </span>
              </span>
            </li>
          </ul>
          <p className="intel-note">
            <B
              en="Seasonal advice starts from your region's calendar, then from your own history after 3 months of data. It is stock advice, never medical advice."
              fr="Les conseils saisonniers partent du calendrier de votre région, puis de votre propre historique après 3 mois de données. Ce sont des conseils de stock, jamais des conseils médicaux."
            />
          </p>
        </section>
        <section className="lock">
          <h3>
            <B en="Join now, keep today's price" fr="Rejoignez-nous maintenant, gardez le prix d'aujourd'hui" />
          </h3>
          <p>
            <B
              en="Customers who join now keep their price for 24 months. What we add to your plan comes at no extra cost."
              fr="Les clients qui nous rejoignent maintenant gardent leur prix pendant 24 mois. Ce que nous ajoutons à votre offre ne coûte rien de plus."
            />
          </p>
        </section>
      </div>
    </>
  )
}
