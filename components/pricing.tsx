"use client"

import { useState } from "react"

import { useLang } from "@/components/lang"
import { B } from "@/components/t"
import { Check, iv } from "@/components/ui"
import { DEFAULT_CURRENCY, SITE_CURRENCIES, SITE_PRICES, formatPrice, type SiteCurrency } from "@/content/prices"

type Plan = {
  id: "decouverte" | "pro" | "business" | "entreprise"
  name: { en: string; fr: string }
  blurb: { en: string; fr: string }
  items: { en: string; fr: string }[]
  cta: { en: string; fr: string }
  featured?: boolean
}

/* What each plan includes is what the app enforces today (lib/plans.ts ENTITLEMENTS in the app). */
const PLANS: Plan[] = [
  {
    id: "decouverte",
    name: { en: "Discovery", fr: "Découverte" },
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
    name: { en: "Pro", fr: "Pro" },
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
    name: { en: "Business", fr: "Business" },
    blurb: { en: "For several linked sites.", fr: "Pour plusieurs sites reliés." },
    items: [
      { en: "3 sites, 10 users", fr: "3 sites, 10 utilisateurs" },
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
    name: { en: "Enterprise", fr: "Entreprise" },
    blurb: { en: "Multi-sector, multi-site.", fr: "Multi-secteur, multi-site." },
    items: [
      { en: "Unlimited sectors, sites and users", fr: "Secteurs, sites et utilisateurs illimités" },
      { en: "Full history", fr: "Historique complet" },
      { en: "Dedicated onboarding", fr: "Mise en route dédiée" },
    ],
    cta: { en: "Talk to us", fr: "Parlez-nous" },
  },
]

export function PricingGrid() {
  const lang = useLang()
  const [currency, setCurrency] = useState<SiteCurrency>(DEFAULT_CURRENCY)

  return (
    <>
      <div className="price-cur" role="group" aria-label={lang === "fr" ? "Devise" : "Currency"}>
        <span>
          <B en="Show prices in" fr="Afficher les prix en" />
        </span>
        {SITE_CURRENCIES.map((c) => (
          <button key={c} type="button" aria-pressed={currency === c} onClick={() => setCurrency(c)}>
            {c === "XOF" ? "FCFA" : c}
          </button>
        ))}
      </div>
      <div className="plans plans-4">
        {PLANS.map((p, i) => {
          const tier = p.id === "pro" ? 0 : p.id === "business" ? 1 : null
          const amount = tier === null ? null : SITE_PRICES[currency][tier]
          return (
            <article key={p.id} className={`plan${p.featured ? " featured" : ""}`} data-tilt="" data-rv="rise" data-plan={p.id} style={iv(i + 2)}>
              <h3>
                <B en={p.name.en} fr={p.name.fr} />
              </h3>
              <p className="plan-p">
                <B en={p.blurb.en} fr={p.blurb.fr} />
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
                    <Check />
                    <span>
                      <B en={it.en} fr={it.fr} />
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
    </>
  )
}
