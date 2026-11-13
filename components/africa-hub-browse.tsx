"use client"

import { useRef, useState } from "react"
import type { CSSProperties } from "react"
import { ACTIVITY_CARDS } from "@/content/africa-activity-cards"
import { ActivityRing } from "./activity-ring"
import { COPY } from "./africa-activities"
import "./africa-browse.css"

type Lang = "en" | "fr"

/* The hub's two steps: a white row of sectors, then the black carousel of the chosen sector's activities. */
const SECTORS = [
  { id: "health", name: { en: "Health", fr: "Santé" }, count: { en: "5 activities", fr: "5 activités" }, photo: "/africa/activities/pharmacy.jpg", cards: ["pharmacie", "grossiste-pharma"] },
  { id: "agriculture", name: { en: "Agriculture", fr: "Agriculture" }, count: { en: "3 activities", fr: "3 activités" }, photo: "/africa/activities/farm.jpg", cards: ["exploitation-agricole"] },
  { id: "distribution", name: { en: "Distribution", fr: "Distribution" }, count: { en: "3 activities", fr: "3 activités" }, photo: "/africa/activities/retail.jpg", cards: ["retail"] },
  { id: "logistics", name: { en: "Logistics", fr: "Logistique" }, count: { en: "4 activities", fr: "4 activités" }, photo: "/africa/activities/logistics.jpg", cards: ["logistics"] },
  { id: "industry", name: { en: "Industry", fr: "Industrie" }, count: { en: "Soon", fr: "Bientôt" }, photo: "/africa/activities/industry.jpg", cards: [] as string[] },
  { id: "transportation", name: { en: "Transportation", fr: "Transport" }, count: { en: "1 activity", fr: "1 activité" }, photo: "/africa/activities/transport.jpg", cards: ["transportation"] },
  { id: "energy", name: { en: "Energy", fr: "Énergie" }, count: { en: "1 activity", fr: "1 activité" }, photo: "/africa/activities/energy.jpg", cards: ["energy"] },
]

export function AfricaHubBrowse({ lang }: { lang: Lang }) {
  const t = COPY[lang]
  const [sector, setSector] = useState<string | null>(null)
  const acts = useRef<HTMLElement>(null)
  const current = SECTORS.find((s) => s.id === sector)
  const cards = current ? ACTIVITY_CARDS.filter((c) => (current.cards as readonly string[]).includes(c.id)) : []

  const pick = (id: string) => {
    setSector(id)
    requestAnimationFrame(() => acts.current?.scrollIntoView({ behavior: "smooth", block: "start" }))
  }

  return (
    <>
      <section className="sp" aria-labelledby={`sp-${lang}`}>
        <p className="sp-eyebrow">{lang === "fr" ? "Secteurs" : "Sectors"}</p>
        <h2 id={`sp-${lang}`} className="sp-title">
          {lang === "fr" ? "Choisissez votre secteur." : "Pick your sector."}
        </h2>
        <p className="sp-lead">{lang === "fr" ? "Chaque secteur ouvre ses activités ci-dessous." : "Each sector opens its own activities below."}</p>
        <div className="sp-grid">
          {SECTORS.map((s, i) => (
            <button key={s.id} type="button" className={`sp-card${sector === s.id ? " is-on" : ""}`} aria-pressed={sector === s.id} onClick={() => pick(s.id)} style={{ "--i": i } as CSSProperties}>
              <span className="sp-photo">
                <img src={s.photo} alt="" loading="lazy" />
              </span>
              <span className="sp-name">{s.name[lang]}</span>
              <span className="sp-count">{s.count[lang]}</span>
            </button>
          ))}
        </div>
      </section>
      {current && (
        <section className="afr-acts sp-acts" ref={acts} aria-labelledby={`afr-acts-${lang}`}>
          <div className="sp-back">
            <button type="button" onClick={() => setSector(null)}>
              {lang === "fr" ? "← Tous les secteurs" : "← All sectors"}
            </button>
          </div>
          <p className="eyebrow">{t.eyebrow}</p>
          <h2 id={`afr-acts-${lang}`}>{lang === "fr" ? `Activités : ${current.name[lang]}` : `${current.name[lang]} activities`}</h2>
          {cards.length ? (
            <ActivityRing key={sector} lang={lang} base={t.base} cards={cards} text={t.text} />
          ) : (
            <p className="sp-soon">{lang === "fr" ? "Bientôt disponible." : "Coming soon."}</p>
          )}
        </section>
      )}
    </>
  )
}
