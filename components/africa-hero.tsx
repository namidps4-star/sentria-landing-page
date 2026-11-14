import type { ReactNode } from "react"
import Image from "next/image"
import { Header } from "./header"
import { Footer, Proof } from "./sections"
import { AfricaHubBrowse } from "./africa-hub-browse"
import { Motion } from "./motion"
import "./africa.css"
import "./africa-hub.css"
import "./africa-sector.css"
import "./africa-light.css"

export type Copy = {
  h1: [string, string, string]
  lead: string
  start: string
  cta: string
  cta2: string
  cta2Href: string
  photoAlt: string
  /* Width of the longest headline line, in em: the headline is sized to fill the space beside the panel. Default 7.9. */
  fit?: number
  stats: [string, string, string][]
}

export const AFRICA_EN: Copy = {
  h1: ["Stock intelligence", "", "for every sector."],
  lead: "Pick your sector. SentrIA works out how many days of stock you have left and warns you before a delivery is late.",
  start: "Starting in Africa.",
  cta: "Book a demo →",
  cta2: "How it works",
  cta2Href: "/articles/how-to-count-pharmacy-stock",
  photoAlt: "Two customers reading a medicine box at a pharmacy shelf in Lagos",
  fit: 8.5,
  stats: [
    ["30", "Days of stock", "Worked out for each product, from the last 30 days of sales."],
    ["FEFO", "Batches that expire first", "The batches closest to their date are flagged, so they leave first."],
    ["+4d", "Order earlier", "The quantity you need, based on each supplier's real delivery time."],
  ],
}

export const AFRIQUE_FR: Copy = {
  h1: ["Intelligence du stock", "", "pour chaque secteur."],
  lead: "Choisissez votre secteur. SentrIA calcule le nombre de jours de stock restants et vous prévient avant qu'une livraison soit en retard.",
  start: "Démarrage en Afrique.",
  cta: "Demander une démo →",
  cta2: "Comment ça marche",
  cta2Href: "/articles/compter-le-stock-en-pharmacie",
  photoAlt: "Deux clients lisent une boîte de médicament devant un rayon de pharmacie à Lagos",
  fit: 11.3,
  stats: [
    ["30", "Jours de stock", "Calculés sur les ventes des 30 derniers jours, produit par produit."],
    ["FEFO", "Lots qui expirent en premier", "Les lots les plus proches de leur date sont signalés en premier."],
    ["+4j", "Commander plus tôt","La quantité dont vous avez besoin, selon le délai réel de chaque fournisseur."],
  ],
}

/* Hyphenated words stay on one line: "stock-out" never breaks into "stock-" and "out". */
const keepWords = (s: string) => s.replace(/(\S)-(\S)/g, "$1‑$2")

/* The regional hero: pharmacy first, for African pharmacies.
   Hub pages (those with the activities section) are static: no entrance motion, no headline effects. */
export type HeroPhoto = { src: string; credit: string }
const AFRICA_PHOTO: HeroPhoto = { src: "/africa/pharmacy-lagos.jpg", credit: "Photo: Angel Sinigersky, Unsplash" }

export function AfricaHero({ copy = AFRICA_EN, id = "afr", activities, extra, panel, photo = AFRICA_PHOTO }: { copy?: Copy; id?: string; activities?: "en" | "fr"; extra?: ReactNode; panel?: ReactNode; photo?: HeroPhoto }) {
  const rise = "rise"
  const fade = "fade"
  return (
    <>
      <Header />
      <main id="main" className="afr">
        <section className={`afr-hero afr-hero--light${activities ? " afr-hero--hub" : " afr-hero--sector"}`} aria-labelledby={`${id}-h`}>
          {activities ? (
            <video
              className="afr-photo"
              src="/videos/africa-hub-cinematic.mp4"
              poster={photo.src}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-hidden="true"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
            />
          ) : (
            <Image src={photo.src} alt={copy.photoAlt} fill priority sizes="100vw" className="afr-photo" />
          )}
          <div className="afr-copy">
            {activities ? (
              <h1 id={`${id}-h`} data-rv={rise}>
                {copy.h1.filter(Boolean).map((line, row) => (
                  <span key={row} className="afr-line">
                    {line}
                  </span>
                ))}
              </h1>
            ) : (
              <h1 id={`${id}-h`} data-rv={rise} style={{ "--fit": copy.fit } as React.CSSProperties}>
                {keepWords(copy.h1[0])}
                <br />
                <span className="afr-lime">{keepWords(copy.h1[1])}</span>
                <br />
                {keepWords(copy.h1[2])}
              </h1>
            )}
            <p className="afr-lead" data-rv={rise} style={{ "--i": 1 } as React.CSSProperties}>
              {copy.lead}
            </p>
            <p className="afr-start" data-rv={fade} style={{ "--i": 2 } as React.CSSProperties}>{copy.start}</p>
            <div className="afr-actions" data-rv={rise} style={{ "--i": 2 } as React.CSSProperties}>
              <a className="afr-btn afr-btn-p" href="#demo">
                {copy.cta}
              </a>
              <a className="afr-btn afr-btn-s" href={copy.cta2Href}>
                {copy.cta2}
              </a>
            </div>
          </div>
          {panel}
          <p className="afr-credit">{photo.credit}</p>
          <ul className="afr-stats" aria-label="SentrIA">
            {copy.stats.map(([num, label, desc], i) => (
              <li key={label} data-rv={rise} style={{ "--i": i } as React.CSSProperties}>
                <b>{num}</b>
                <span className="afr-stat-label">{label}</span>
                <span className="afr-stat-desc">{desc}</span>
              </li>
            ))}
          </ul>
        </section>
        <Proof />
        {extra}
        {activities && <AfricaHubBrowse lang={activities} />}
      </main>
      <Footer />
      <Motion />
    </>
  )
}
