import type { CSSProperties } from "react"
import { Header } from "./header"
import { Footer } from "./sections"
import { Motion } from "./motion"
import { SECTOR_DATA, SECTOR_PAGE } from "@/content/sector-pages"
import "./sector-page.css"

/* An Africa activity with no page of its own yet: its name and the app's own line, then the three heroes of its sector.
   The picture of each hero is a drawing made from the product's numbers; the numbers marked as examples are sample numbers. */
export function SectorActivityPage({ id, lang }: { id: string; lang: "en" | "fr" }) {
  const page = SECTOR_PAGE[id]
  if (!page) return null
  const sector = SECTOR_DATA[page.sector]
  const en = lang === "en"
  return (
    <>
      <Header />
      <main id="main" className="sp">
        <section className="sp-top">
          <p className="sp-eb">{sector.name[lang]}</p>
          <h1>{page.name[lang]}</h1>
          <p className="sp-lead">{page.desc[lang]}</p>
          <div className="sp-cta">
            <a className="sp-btn" href={en ? "/en#demo" : "/fr#demo"}>
              {en ? "Book a demo →" : "Demander une démo →"}
            </a>
            <a className="sp-link" href={en ? "/africa" : "/afrique"}>
              {en ? "All sectors" : "Tous les secteurs"}
            </a>
          </div>
        </section>
        <section className="sp-heroes" aria-labelledby="sp-head">
          <h2 id="sp-head">{sector.head[lang]}</h2>
          <div className="sp-grid">
            {sector.heroes.map((h, i) => (
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
