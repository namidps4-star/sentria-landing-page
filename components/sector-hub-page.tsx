import type { CSSProperties } from "react"
import { AfricaHero } from "./africa-hero"
import { ActivityRing } from "./activity-ring"
import { cardsFor, type HubSector } from "@/content/africa-sector-catalog"
import { SECTOR_DATA as HERO_DATA } from "@/content/sector-pages"
import { SECTOR_DATA as SECTOR_TEXT } from "@/content/sectors"
import { SECTOR_LIST } from "@/content/africa-activities"
import { GENERAL_ACTIVITIES } from "@/content/general-activities"
import "./sector-page.css"

/* A sector's own page: its activities in the ring (each one linking to its page), then the three heroes of the sector.
   Used for the sectors that have no page of their own yet. Healthcare keeps its own page. */
export type HubSectorKey = "industry" | "agriculture" | "transportation" | "logistics" | "energy" | "retail"

/* The sector copy and photo come from the sector's live page: the same hero as the pharmacy page. */
const GENERAL_KEY: Record<HubSectorKey, string> = {
  industry: "industry",
  agriculture: "exploitation-agricole",
  transportation: "transportation",
  logistics: "logistics",
  energy: "energy",
  retail: "retail",
}

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
  const general = GENERAL_ACTIVITIES.find((g) => g.key === GENERAL_KEY[sector])
  if (!general) return null
  const ringText = en
    ? { carousel: "carousel", label: `${t.title} activities`, prev: "Previous activity", next: "Next activity", more: "Read more →", view: "View", open: "Open", hint: "Scroll or drag" }
    : { carousel: "carrousel", label: `Activités : ${t.title}`, prev: "Activité précédente", next: "Activité suivante", more: "Lire la suite →", view: "Voir", open: "Ouvrir", hint: "Faites défiler ou glissez" }
  return (
    <AfricaHero
      copy={general.copy[lang]}
      id={sector}
      photo={general.photo}
      extra={
        <>
          <section className="sp-acts" id="activities" aria-labelledby="sp-acts-h">
            <h2 id="sp-acts-h">{en ? `${t.title} activities` : `Activités : ${t.title}`}</h2>
            <ActivityRing lang={lang} base="" cards={cards} text={ringText} />
          </section>
          <SectorHeroes hero={HUB[sector].heroes} lang={lang} />
        </>
      }
    />
  )
}

/* The one next step under each hero, and the note that the numbers are examples. */
const HERO_LINK = { en: { label: "Book a demo →", href: "/en#demo" }, fr: { label: "Demander une démo →", href: "/fr#demo" } }
const HERO_NOTE = { en: "The numbers are examples.", fr: "Les chiffres sont des exemples." }

/* The three heroes of a sector, on their own (used under the healthcare page's activities too).
   Each hero: the problem today, the outcome, how it works with one example, one picture doing one job, one link. */
export function SectorHeroes({ hero, lang, head = true }: { hero: HubSector; lang: "en" | "fr"; head?: boolean }) {
  const data = HERO_DATA[hero]
  const link = HERO_LINK[lang]
  return (
    <section className="sp-heroes" aria-labelledby="sp-head">
      {head && <h2 id="sp-head">{data.head[lang]}</h2>}
      <div className="sp-grid">
        {data.heroes.map((h, i) => (
          <article key={i} className="sp-hero" data-rv="rise" style={{ "--i": i * 4 } as CSSProperties}>
            <p className="sp-problem">{h.problem[lang]}</p>
            <h3>{h.title[lang]}</h3>
            <p>{h.ex[lang]}</p>
            <div className="sp-viz" dangerouslySetInnerHTML={{ __html: h.svg[lang] }} />
            <a className="sp-link" href={link.href}>
              {link.label}
            </a>
          </article>
        ))}
      </div>
      <p className="sp-note">{HERO_NOTE[lang]}</p>
    </section>
  )
}
