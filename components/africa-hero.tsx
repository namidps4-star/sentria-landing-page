import type { ReactNode } from "react"
import Image from "next/image"
import { Header } from "./header"
import { Footer, Proof } from "./sections"
import { AfricaActivities } from "./africa-activities"
import { Motion } from "./motion"
import "./africa.css"

export type Copy = {
  h1: [string, string, string]
  lead: string
  start: string
  cta: string
  cta2: string
  cta2Href: string
  photoAlt: string
  stats: [string, string, string][]
}

export const AFRICA_EN: Copy = {
  h1: ["Stock days.", "Batch dates.", "Order today."],
  lead: "For pharmacists who lose sales to empty shelves. SentrIA calculates your days of cover, flags FEFO batches, and tells you what to order — per product, per supplier.",
  start: "Starting in Africa.",
  cta: "Book a demo →",
  cta2: "How it works",
  cta2Href: "/articles/how-to-count-pharmacy-stock",
  photoAlt: "Two customers reading a medicine box at a pharmacy shelf in Lagos",
  stats: [
    ["30", "Days of stock", "Worked out for each product, from the last 30 days of sales."],
    ["FEFO", "Batches that expire first", "The batches closest to their date are flagged, so they leave first."],
    ["+4d", "What to order today", "The quantity you need, based on each supplier's real delivery time."],
  ],
}

export const AFRIQUE_FR: Copy = {
  h1: ["Jours de stock.", "Priorité des lots.", "Commandez aujourd'hui."],
  lead: "Pour les pharmaciens qui perdent des ventes face aux ruptures. SentrIA calcule vos jours de couverture, identifie les lots FEFO et vous dit quoi commander — par produit, par fournisseur.",
  start: "Démarrage en Afrique.",
  cta: "Demander une démo →",
  cta2: "Comment ça marche",
  cta2Href: "/articles/compter-le-stock-en-pharmacie",
  photoAlt: "Deux clients lisent une boîte de médicament devant un rayon de pharmacie à Lagos",
  stats: [
    ["30", "Jours de stock", "Calculés sur les ventes des 30 derniers jours, produit par produit."],
    ["FEFO", "Lots qui expirent en premier", "Les lots les plus proches de leur date sont signalés en premier."],
    ["+4j", "À commander aujourd'hui", "La quantité dont vous avez besoin, selon le délai réel de chaque fournisseur."],
  ],
}

/* The regional hero: pharmacy first, for African pharmacies. */
export function AfricaHero({ copy = AFRICA_EN, id = "afr", activities, extra, panel }: { copy?: Copy; id?: string; activities?: "en" | "fr"; extra?: ReactNode; panel?: ReactNode }) {
  return (
    <>
      <Header />
      <main id="main" className="afr">
        <section className="afr-hero" aria-labelledby={`${id}-h`}>
          <Image src="/africa/pharmacy-lagos.jpg" alt={copy.photoAlt} fill priority sizes="100vw" className="afr-photo" />
          <div className="afr-copy">
            <h1 id={`${id}-h`} data-rv="rise">
              {copy.h1[0]}
              <br />
              <span className="afr-lime">{copy.h1[1]}</span>
              <br />
              {copy.h1[2]}
            </h1>
            <p className="afr-lead" data-rv="rise" style={{ "--i": 1 } as React.CSSProperties}>
              {copy.lead}
            </p>
            <p className="afr-start" data-rv="fade" style={{ "--i": 2 } as React.CSSProperties}>{copy.start}</p>
            <div className="afr-actions" data-rv="rise" style={{ "--i": 2 } as React.CSSProperties}>
              <a className="afr-btn afr-btn-p" href="#demo">
                {copy.cta}
              </a>
              <a className="afr-btn afr-btn-s" href={copy.cta2Href}>
                {copy.cta2}
              </a>
            </div>
          </div>
          {panel}
          <p className="afr-credit">Photo: Ninthgrid, Unsplash</p>
          <ul className="afr-stats" aria-label="SentrIA">
            {copy.stats.map(([num, label, desc], i) => (
              <li key={label} data-rv="rise" style={{ "--i": i } as React.CSSProperties}>
                <b>{num}</b>
                <span className="afr-stat-label">{label}</span>
                <span className="afr-stat-desc">{desc}</span>
              </li>
            ))}
          </ul>
        </section>
        <Proof />
        {extra}
        {activities && <AfricaActivities lang={activities} />}
      </main>
      <Footer />
      <Motion />
    </>
  )
}
