import type { CSSProperties } from "react"
import { Header } from "./header"
import { Footer } from "./sections"
import { Motion } from "./motion"
import { ActivityRing } from "./activity-ring"
import { cardsFor, type HubSector } from "@/content/africa-sector-catalog"
import { SECTOR_DATA as HERO_DATA } from "@/content/sector-pages"
import { SECTOR_DATA as SECTOR_TEXT } from "@/content/sectors"
import { SECTOR_LIST } from "@/content/africa-activities"
import "./sector-page.css"

/* A sector's own page: its activities in the ring (each one linking to its page), then the three heroes of the sector.
   Used for the sectors that have no page of their own yet. Healthcare keeps its own page. */
export type HubSectorKey = "industry" | "agriculture" | "transportation" | "logistics" | "energy" | "retail"

const HUB: Record<HubSectorKey, { hub: HubSector; heroes: HubSector }> = {
  industry: { hub: "industry", heroes: "industry" },
  agriculture: { hub: "agriculture", heroes: "agriculture" },
  transportation: { hub: "transportation", heroes: "transportation" },
  logistics: { hub: "logistics", heroes: "logistics" },
  energy: { hub: "energy", heroes: "energy" },
  retail: { hub: "distribution", heroes: "distribution" },
}

function text(key: HubSectorKey, lang: "en" | "fr") {
  if (key === "retail") {
    const s = SECTOR_LIST.find((x) => x.key === "retail")!
    return { title: s.name[lang], desc: s.direct[lang] }
  }
  const s = SECTOR_TEXT[key]
  return { title: s[lang].title, desc: s[lang].description }
}

export function SectorHubPage({ sector, lang }: { sector: HubSectorKey; lang: "en" | "fr" }) {
  const en = lang === "en"
  const t = text(sector, lang)
  const cards = cardsFor(HUB[sector].hub)
  const heroes = HERO_DATA[HUB[sector].heroes].heroes
  const head = HERO_DATA[HUB[sector].heroes].head[lang]
  const ringText = en
    ? { carousel: "carousel", label: `${t.title} activities`, prev: "Previous activity", next: "Next activity", more: "Read more →", view: "View", open: "Open", hint: "Scroll or drag" }
    : { carousel: "carrousel", label: `Activités : ${t.title}`, prev: "Activité précédente", next: "Activité suivante", more: "Lire la suite →", view: "Voir", open: "Ouvrir", hint: "Faites défiler ou glissez" }
  return (
    <>
      <Header />
      <main id="main" className="sp">
        <section className="sp-top">
          <p className="sp-eb">{t.title}</p>
          <h1>{t.title}</h1>
          <p className="sp-lead">{t.desc}</p>
          <div className="sp-cta">
            <a className="sp-btn" href={en ? "/en#demo" : "/fr#demo"}>
              {en ? "Book a demo →" : "Demander une démo →"}
            </a>
            <a className="sp-link" href={en ? "/africa" : "/afrique"}>
              {en ? "All sectors" : "Tous les secteurs"}
            </a>
          </div>
        </section>
        <section className="sp-acts" id="activities" aria-labelledby="sp-acts-h">
          <h2 id="sp-acts-h">{en ? `${t.title} activities` : `Activités : ${t.title}`}</h2>
          <ActivityRing lang={lang} base="" cards={cards} text={ringText} />
        </section>
        <section className="sp-heroes" aria-labelledby="sp-head">
          <h2 id="sp-head">{head}</h2>
          <div className="sp-grid">
            {heroes.map((h, i) => (
              <article key={i} className="sp-hero" data-rv="rise" style={{ "--i": i * 4 } as CSSProperties}>
                <div className="sp-viz" dangerouslySetInnerHTML={{ __html: h.svg[lang] }} />
                <h3>{h.title[lang]}</h3>
                <p>{h.ex[lang]}</p>
                {h.cap && <p className="sp-cap">{h.cap[lang]}</p>}
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
      <Motion />
    </>
  )
}

/* The three heroes of a sector, on their own (used under the healthcare page's activities too). */
export function SectorHeroes({ hero, lang }: { hero: HubSector; lang: "en" | "fr" }) {
  const data = HERO_DATA[hero]
  return (
    <section className="sp-heroes" aria-labelledby="sp-head">
      <h2 id="sp-head">{data.head[lang]}</h2>
      <div className="sp-grid">
        {data.heroes.map((h, i) => (
          <article key={i} className="sp-hero" data-rv="rise" style={{ "--i": i * 4 } as CSSProperties}>
            <div className="sp-viz" dangerouslySetInnerHTML={{ __html: h.svg[lang] }} />
            <h3>{h.title[lang]}</h3>
            <p>{h.ex[lang]}</p>
            {h.cap && <p className="sp-cap">{h.cap[lang]}</p>}
          </article>
        ))}
      </div>
    </section>
  )
}
