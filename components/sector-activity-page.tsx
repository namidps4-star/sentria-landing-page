import { AfricaHero } from "./africa-hero"
import { SectorHeroes } from "./sector-hub-page"
import { cardsFor, type HubSector } from "@/content/africa-sector-catalog"
import { GENERAL_ACTIVITIES } from "@/content/general-activities"
import { SECTOR_PAGE, type SectorKey } from "@/content/sector-pages"
import "./sector-page.css"

/* An Africa activity with no page of its own yet. It opens with the pharmacy hero, adapted to its sector
   (the sector's own hero copy and stats), then the activity's name and line, then the three heroes of its sector. */
const SECTOR_COPY: Record<SectorKey, string> = {
  health: "clinique-hopital",
  agriculture: "exploitation-agricole",
  distribution: "retail",
  logistics: "logistics",
  industry: "industry",
  transportation: "transportation",
  energy: "energy",
}

export function SectorActivityPage({ id, lang }: { id: string; lang: "en" | "fr" }) {
  const page = SECTOR_PAGE[id]
  if (!page) return null
  const general = GENERAL_ACTIVITIES.find((g) => g.key === SECTOR_COPY[page.sector])
  if (!general) return null
  const card = cardsFor(page.sector as HubSector).find((c) => c.id === id)
  const photo = card ? { src: card.photo, credit: `Photo: ${card.by}, Unsplash` } : general.photo
  return (
    <AfricaHero
      copy={general.copy[lang]}
      id={id}
      photo={photo}
      extra={
        <>
          <section className="sp-top sp-intro">
            <p className="sp-eb">{page.name[lang]}</p>
            <h2>{page.name[lang]}</h2>
            <p className="sp-lead">{page.desc[lang]}</p>
          </section>
          <SectorHeroes hero={page.sector as HubSector} lang={lang} head={false} />
        </>
      }
    />
  )
}

