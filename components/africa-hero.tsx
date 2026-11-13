import type { ReactNode } from "react"
import Image from "next/image"
import { Header } from "./header"
import { Footer } from "./sections"
import { AfricaActivities } from "./africa-activities"
import "./africa.css"

export type Copy = {
  h1: [string, string, string]
  lead: string
  start: string
  cta: string
  cta2: string
  cta2Href: string
  photoAlt: string
  stats: [string, string][]
}

export const AFRICA_EN: Copy = {
  h1: ["Pharmacy stock,", "days left", "and order in time."],
  lead: "Count your shelves. SentrIA works out how many days of stock you have left and warns you before a delivery is late.",
  start: "Starting in Africa.",
  cta: "Book a demo →",
  cta2: "Read how a count works",
  cta2Href: "/articles/how-to-count-pharmacy-stock",
  photoAlt: "Two customers reading a medicine box at a pharmacy shelf in Lagos",
  stats: [
    ["Days of stock", "From the last 30 days of sales, per product."],
    ["Real delivery times", "Each supplier's actual lead time, not the promised one."],
    ["Warnings in time", "A message before a product runs out, not after."],
  ],
}

export const AFRIQUE_FR: Copy = {
  h1: ["Stock de pharmacie,", "jours restants", "et commande à temps."],
  lead: "Comptez vos rayons. SentrIA calcule le nombre de jours de stock restants et vous prévient avant qu'une livraison soit en retard.",
  start: "Démarrage en Afrique.",
  cta: "Demander une démo →",
  cta2: "Voir comment fonctionne un comptage",
  cta2Href: "/articles/compter-le-stock-en-pharmacie",
  photoAlt: "Deux clients lisent une boîte de médicament devant un rayon de pharmacie à Lagos",
  stats: [
    ["Jours de stock", "Calculés sur les ventes des 30 derniers jours, produit par produit."],
    ["Délais réels", "Le délai réel de chaque fournisseur, pas le délai promis."],
    ["Alertes à temps", "Un message avant qu'un produit ne s'épuise, pas après."],
  ],
}

/* The regional hero: pharmacy first, for African pharmacies. */
export type HeroPhoto = { src: string; credit: string }
const AFRICA_PHOTO: HeroPhoto = { src: "/africa/pharmacy-lagos.jpg", credit: "Photo: Ninthgrid, Unsplash" }

export function AfricaHero({ copy = AFRICA_EN, id = "afr", activities, extra, photo = AFRICA_PHOTO }: { copy?: Copy; id?: string; activities?: "en" | "fr"; extra?: ReactNode; photo?: HeroPhoto }) {
  return (
    <>
      <Header />
      <main id="main" className="afr">
        <section className="afr-hero" aria-labelledby={`${id}-h`}>
          <Image src={photo.src} alt={copy.photoAlt} fill priority sizes="100vw" className="afr-photo" />
          <div className="afr-copy">
            <h1 id={`${id}-h`}>
              {copy.h1[0]}
              <br />
              <span className="afr-lime">{copy.h1[1]}</span>
              <br />
              {copy.h1[2]}
            </h1>
            <p className="afr-lead">
              {copy.lead}
            </p>
            <p className="afr-start">{copy.start}</p>
            <div className="afr-actions">
              <a className="afr-btn afr-btn-p" href="#demo">
                {copy.cta}
              </a>
              <a className="afr-btn afr-btn-s" href={copy.cta2Href}>
                {copy.cta2}
              </a>
            </div>
          </div>
          <p className="afr-credit">{photo.credit}</p>
          <ul className="afr-stats" aria-label="SentrIA">
            {copy.stats.map(([b, t]) => (
              <li key={b}>
                <b>{b}</b>
                {t}
              </li>
            ))}
          </ul>
        </section>
        {extra}
        {activities && <AfricaActivities lang={activities} />}
      </main>
      <Footer />
    </>
  )
}
