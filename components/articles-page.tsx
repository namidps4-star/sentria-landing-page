"use client"

import Image from "next/image"
import Link from "next/link"

import { ArticleCard } from "@/components/article-card"
import { useEffect, useState } from "react"

import { useLang } from "@/components/lang"
import { B } from "@/components/t"
import { ARTICLE_PAGES, ARTICLES, DEPARTMENTS, SECTORS, isLive, type Article } from "@/content/articles"

import "./articles.css"

type SectorKey = (typeof SECTORS)[number]["key"]

/* Articles page, option A: the photo hero with the three latest articles on
   it, then a sector slider and a department slider, then the grid. */
export function ArticlesPage() {
  const [sector, setSector] = useState<SectorKey>("all")
  const [dept, setDept] = useState("all")
  const lang = useLang()

  // A link ending in #health opens the page with the health filter on.
  useEffect(() => {
    if (window.location.hash === "#health") setSector("health") // eslint-disable-line react-hooks/set-state-in-effect
  }, [])

  const live = ARTICLES.filter(isLive)
  const latest = live.slice(0, 3)
  const pageDesc = (id: string | undefined, lang: "en" | "fr") => (id ? ARTICLE_PAGES.find((p) => p.pairId === id && p.lang === lang)?.description : undefined)
  const pageDate = (id: string) => ({ en: ARTICLE_PAGES.find((p) => p.pairId === id && p.lang === "en")?.dateLabel ?? "", fr: ARTICLE_PAGES.find((p) => p.pairId === id && p.lang === "fr")?.dateLabel ?? "" })
  const pageDescBi = (id: string) => ({ en: pageDesc(id, "en") ?? "", fr: pageDesc(id, "fr") ?? "" })
  // The link goes to the article in the visitor's language, English as the fallback.
  const pageSlug = (id: string) =>
    ARTICLE_PAGES.find((p) => p.pairId === id && p.lang === lang)?.slug ??
    ARTICLE_PAGES.find((p) => p.pairId === id && p.lang === "en")?.slug ??
    ""
  const shown = live.filter(
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
        <Image src={latest[0]?.image ?? "/articles/hero.jpg"} alt="" fill priority sizes="(max-width: 1280px) 100vw, 1280px" />
        <div className="art-hero-copy">
          <span className="art-pill">
            <B en="Articles" fr="Articles" />
          </span>
          <h1 id="ar-title">
            {latest[0] ? (
              <B en={latest[0].title.en} fr={latest[0].title.fr} />
            ) : (
              <B en="Field notes on stock, cold chains and fleets." fr="Notes de terrain sur les stocks, la chaîne du froid et les flottes." />
            )}
          </h1>
          <p className="art-lede">
            <B en={pageDesc(latest[0]?.id, "en") ?? "Short, practical reads from the SentrIA team."} fr={pageDesc(latest[0]?.id, "fr") ?? "Des lectures courtes et concrètes, par l'équipe SentrIA."} />
          </p>
          {latest[0] ? (
            <Link className="art-cta" href={`/articles/${pageSlug(latest[0].id)}`}>
              <B en="Read the article" fr="Lire l'article" />
            </Link>
          ) : (
            <a className="art-cta" href="#articles-list">
              <B en="Read the latest" fr="Lire les derniers" />
            </a>
          )}
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
          <B
            en={`${shown.length} article${shown.length === 1 ? "" : "s"}`}
            fr={`${shown.length} article${shown.length === 1 ? "" : "s"}`}
          />
        </span>
      </div>

      <div className="art-grid">
        {shown.length === 0 && (
          <p className="art-empty">
            <B en="No article in this part yet." fr="Pas encore d'article dans cette partie." />
          </p>
        )}
        {shown.map((a: Article) => (
          <ArticleCard
            key={a.id}
            href={`/articles/${pageSlug(a.id)}`}
            image={a.image}
            tag={a.tag}
            minutes={a.minutes}
            date={pageDate(a.id)}
            title={a.title}
            description={pageDescBi(a.id)}
          />
        ))}
      </div>
    </main>
  )
}
