"use client"

import { useEffect, useRef, useState } from "react"
import type { CSSProperties } from "react"
import { SECTOR_ACTIVITIES, cardsFor, type HubSector } from "@/content/africa-sector-catalog"
import { ActivityRing } from "./activity-ring"
import { COPY } from "./africa-activities"
import "./africa-browse.css"

type Lang = "en" | "fr"

/* The hub's two steps: a white row of sectors, then the black carousel of the chosen sector's activities.
   Each sector's activities come from the app's catalog (content/africa-sector-catalog.ts); the count is taken from it. */
const SECTORS: { id: HubSector; name: { en: string; fr: string }; photo: string }[] = [
  { id: "health", name: { en: "Health", fr: "Santé" }, photo: "/africa/hq/row-health.jpg" },
  { id: "agriculture", name: { en: "Agriculture", fr: "Agriculture" }, photo: "/africa/hq/row-agriculture.jpg" },
  { id: "distribution", name: { en: "Distribution", fr: "Distribution" }, photo: "/africa/hq/row-distribution.jpg" },
  { id: "logistics", name: { en: "Logistics", fr: "Logistique" }, photo: "/africa/hq/row-logistics.jpg" },
  { id: "industry", name: { en: "Industry", fr: "Industrie" }, photo: "/africa/hq/row-industry.jpg" },
  { id: "transportation", name: { en: "Transportation", fr: "Transport" }, photo: "/africa/hq/row-transportation.jpg" },
  { id: "energy", name: { en: "Energy", fr: "Énergie" }, photo: "/africa/hq/row-energy.jpg" },
]

// "1 activity", "5 activities"; "1 activité", "5 activités".
const countLabel = (n: number, lang: Lang) => (lang === "fr" ? `${n} activité${n > 1 ? "s" : ""}` : `${n} ${n === 1 ? "activity" : "activities"}`)

export function AfricaHubBrowse({ lang }: { lang: Lang }) {
  const t = COPY[lang]
  const [sector, setSector] = useState<string | null>(null)
  const acts = useRef<HTMLElement>(null)
  const current = SECTORS.find((s) => s.id === sector)
  const cards = current ? cardsFor(current.id) : []

  // The arc: the seven cards travel slowly around it. The travel stops while the cursor or keyboard focus is
  // on the row, and the photos float instead. Reduced motion keeps the arc still.
  const row = useRef<HTMLDivElement>(null)
  const stopped = useRef({ hover: false, focus: false })
  const setStop = (kind: "hover" | "focus", on: boolean) => {
    stopped.current[kind] = on
    if (stopped.current.hover || stopped.current.focus) row.current?.setAttribute("data-stopped", "")
    else row.current?.removeAttribute("data-stopped")
  }

  useEffect(() => {
    const el = row.current
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const cards = Array.from(el.querySelectorAll<HTMLElement>(".sp-card"))
    const SLOTS_PER_SECOND = 0.12 // about one slot every 8 seconds; a full turn of seven takes about a minute
    let offset = 0
    let last = performance.now()
    let frame = 0
    const tick = (now: number) => {
      const dt = Math.min(now - last, 100) / 1000 // after a long pause (background tab) the arc must not jump
      last = now
      if (!el.hasAttribute("data-stopped")) offset = (offset + dt * SLOTS_PER_SECOND) % 7
      cards.forEach((card, i) => {
        // Place on a ring of seven slots, running from -3.5 to 3.5 with the centre at 0.
        const p = ((((i + 0.5 + offset) % 7) + 7) % 7) - 3.5
        // Full opacity across the middle, fading over the last half slot at each end.
        const op = Math.min(1, Math.max(0, 1 - (Math.abs(p) - 3) / 0.5))
        card.style.setProperty("--p", p.toFixed(4))
        card.style.setProperty("--op", op.toFixed(3))
      })
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [])

  const pick = (id: string) => {
    setSector(id)
    requestAnimationFrame(() => acts.current?.scrollIntoView({ behavior: "smooth", block: "start" }))
  }

  return (
    <>
      <section className="sp" aria-labelledby={`sp-${lang}`}>
        <p className="sp-eyebrow" data-rv="fade">{lang === "fr" ? "Secteurs" : "Sectors"}</p>
        <h2 id={`sp-${lang}`} className="sp-title" data-rv="rise">
          {lang === "fr" ? "Choisissez votre secteur." : "Pick your sector."}
        </h2>
        <p className="sp-lead" data-rv="rise" style={{ "--i": 1 } as CSSProperties}>{lang === "fr" ? "Chaque secteur ouvre ses activités ci-dessous." : "Each sector opens its own activities below."}</p>
        <div className="sp-grid" ref={row} onPointerEnter={() => setStop("hover", true)} onPointerLeave={() => setStop("hover", false)} onFocus={() => setStop("focus", true)} onBlur={() => setStop("focus", false)}>
          {SECTORS.map((s, i) => (
            <button key={s.id} type="button" className={`sp-card${sector === s.id ? " is-on" : ""}`} aria-pressed={sector === s.id} onClick={() => pick(s.id)} data-rv="rise" style={{ "--i": i } as CSSProperties}>
              <span className="sp-photo">
                <img src={s.photo} alt="" loading="lazy" />
                <span className="sp-info">
                  <span className="sp-name">{s.name[lang]}</span>
                  <span className="sp-count">{countLabel(SECTOR_ACTIVITIES[s.id].length, lang)}</span>
                </span>
              </span>
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
          <ActivityRing key={sector} lang={lang} base={t.base} cards={cards} text={t.text} />
        </section>
      )}
    </>
  )
}
