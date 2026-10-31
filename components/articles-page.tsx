"use client"

import Image from "next/image"
import { useState } from "react"

import { B } from "@/components/t"
import { ARTICLES, DEPARTMENTS, SECTORS, type Article } from "@/content/articles"

import "./articles.css"

type SectorKey = (typeof SECTORS)[number]["key"]

/* Articles page, option A: the photo hero with the three latest articles on
   it, then a sector slider and a department slider, then the grid. */
export function ArticlesPage() {
  const [sector, setSector] = useState<SectorKey>("all")
  const [dept, setDept] = useState("all")

  const latest = ARTICLES.slice(0, 3)
  const shown = ARTICLES.filter(
    (a) => (sector === "all" || a.sector === sector) && (dept === "all" || a.dept === dept)
  )
  const departments = sector === "all" ? [] : DEPARTMENTS[sector]

  function pickSector(next: SectorKey) {
    setSector(next)
    setDept("all")
  }

  return (
    <main className="art" id="main">
      <section className="art-hero" aria-labelledby="ar-title">
        <Image src="/articles/hero.jpg" alt="" fill priority sizes="(max-width: 1280px) 100vw, 1280px" />
        <div className="art-hero-copy">
          <span className="art-pill">
            <B en="Articles" fr="Articles" />
          </span>
          <h1 id="ar-title">
            <B en="Field notes on stock, cold chains and fleets." fr="Notes de terrain sur les stocks, la chaîne du froid et les flottes." />
          </h1>
          <p className="art-lede">
            <B en="Short, practical reads from the SentrIA team." fr="Des lectures courtes et concrètes, par l'équipe SentrIA." />
          </p>
          <a className="art-cta" href="#articles-list">
            <B en="Read the latest" fr="Lire les derniers" />
          </a>
        </div>
        <div className="art-strip">
          {latest.map((a) => (
            <article className="art-tile" key={a.id}>
              <div className="art-tile-img">
                <Image src={a.image} alt="" fill sizes="(max-width: 900px) 100vw, 360px" />
              </div>
              <div className="art-tile-meta">
                <B en={`${a.minutes} min read · ${a.tag.en}`} fr={`${a.minutes} min · ${a.tag.fr}`} />
              </div>
              <h2 className="art-tile-title">
                <B en={a.title.en} fr={a.title.fr} />
              </h2>
            </article>
          ))}
        </div>
      </section>

      <div className="art-filters" id="articles-list">
        <div className="art-seg" role="group" aria-label="Sector">
          {SECTORS.map((s) => (
            <button key={s.key} type="button" aria-pressed={sector === s.key} onClick={() => pickSector(s.key)}>
              <B en={s.label.en} fr={s.label.fr} />
            </button>
          ))}
        </div>
        {departments.length > 0 && (
          <div className="art-seg sub" role="group" aria-label="Department">
            {departments.map((d) => (
              <button key={d.key} type="button" aria-pressed={dept === d.key} onClick={() => setDept(d.key)}>
                <B en={d.label.en} fr={d.label.fr} />
              </button>
            ))}
          </div>
        )}
        <span className="art-count">
          <B en={`${shown.length} articles`} fr={`${shown.length} articles`} />
        </span>
      </div>

      <div className="art-grid">
        {shown.length === 0 && (
          <p className="art-empty">
            <B en="No article in this part yet." fr="Pas encore d'article dans cette partie." />
          </p>
        )}
        {shown.map((a: Article) => (
          <article className="art-card" key={a.id}>
            <div className="art-card-img">
              <Image src={a.image} alt="" fill sizes="(max-width: 900px) 50vw, 360px" />
              <span className="art-card-tag">
                <B en={a.tag.en} fr={a.tag.fr} />
              </span>
            </div>
            <div className="art-card-body">
              <h2>
                <B en={a.title.en} fr={a.title.fr} />
              </h2>
              <p>
                <B en={`${a.minutes} min read`} fr={`${a.minutes} min de lecture`} />
              </p>
            </div>
          </article>
        ))}
      </div>
    </main>
  )
}
