"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { C } from "@/content/en"
import { TAGLINES } from "@/content/taglines"
import { useText } from "./lang"
import { B, T } from "./t"
import { SECTORS } from "./sectors"

const BEAT_MS = 5600

/**
 * The film behind the hero headline: the seven sectors, one photo at a time,
 * crossfading with a slow push-in, under a dark layer so the headline stays
 * readable. It carries the old "Where SentrIA applies next." title and the
 * sector's own line. It starts once the opening is over, pauses while the
 * pointer or the keyboard is on the caption, and stays still with reduced motion.
 */
export function HeroFilm() {
  const [active, setActive] = useState(0)
  const [reduced, setReduced] = useState(false)
  const [paused, setPaused] = useState(false)
  const [held, setHeld] = useState(false)
  const [ready, setReady] = useState(false)
  const text = useText()
  const box = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    const root = document.documentElement
    if (!root.classList.contains("op-run") || root.classList.contains("op-done")) {
      setReady(true)
      return
    }
    // Wait for the opening to end, so the first photo is not spent behind the black panel.
    const mo = new MutationObserver(() => {
      if (root.classList.contains("op-done")) {
        mo.disconnect()
        setReady(true)
      }
    })
    mo.observe(root, { attributes: true, attributeFilter: ["class"] })
    return () => mo.disconnect()
  }, [])

  useEffect(() => {
    if (reduced || paused || held || !ready) return
    const id = window.setInterval(() => {
      if (document.hidden) return
      setActive((a) => (a + 1) % SECTORS.length)
    }, BEAT_MS)
    return () => window.clearInterval(id)
  }, [reduced, paused, held, ready])

  const dirTimer = useRef<number | null>(null)
  const dirRef = useRef<-1 | 0 | 1>(0)

  // Document-level mousemove: hero-in and hf-cap sit on top of the film so we
  // cannot attach to hero-film itself. We check the hero-stage bounding rect and
  // use 35%/65% edge zones so the midpoint does not flicker between directions.
  // hf-cap's onMouseLeave must NOT call setPaused(false) or it fights this timer.
  useEffect(() => {
    const step = (d: -1 | 1) => setActive((a) => d < 0 ? (a - 1 + SECTORS.length) % SECTORS.length : (a + 1) % SECTORS.length)
    const applyDir = (d: -1 | 0 | 1) => {
      if (d === dirRef.current) return
      if (dirTimer.current != null) { window.clearInterval(dirTimer.current); dirTimer.current = null }
      dirRef.current = d
      if (d === 0) { setPaused(false); return }
      setPaused(true)
      step(d)
      dirTimer.current = window.setInterval(() => step(d), 700)
    }
    const onMove = (e: MouseEvent) => {
      const hero = document.getElementById("hero-stage")
      if (!hero) return
      const r = hero.getBoundingClientRect()
      if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) { applyDir(0); return }
      const frac = (e.clientX - r.left) / r.width
      applyDir(frac < 0.35 ? -1 : frac > 0.65 ? 1 : 0)
    }
    document.addEventListener("mousemove", onMove, { passive: true })
    return () => { document.removeEventListener("mousemove", onMove); applyDir(0) }
  }, [])

  const s = C.sectors
  const sec = SECTORS[active]
  const tag = TAGLINES[sec.key]

  return (
    <>
      <div className="hero-film" data-still={reduced ? "1" : undefined} data-ready={ready ? "1" : undefined} aria-hidden="true">
        {SECTORS.map((x, i) => (
          <div key={x.key} className="hf-slide" data-active={i === active ? "1" : undefined}>
            <Image src={x.photo} alt="" fill priority={i === 0} sizes="100vw" quality={90} className="hf-img" />
          </div>
        ))}
        <div className="hf-scrim" />
      </div>

      <div
        className="hf-cap"
        ref={box}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <p className="hf-s" aria-live="off">
          <T s={sec.title} />
        </p>
        <p className="hf-line" aria-live="off">
          <B en={tag.en} fr={tag.fr} />
        </p>
        <div className="hf-dots" role="group" aria-label={s.title}>
          {SECTORS.map((x, i) => (
            <button key={x.key} type="button" className="hf-dot" aria-pressed={i === active} onClick={() => setActive(i)}>
              <span className="sr-only">
                <T s={x.title} />
              </span>
            </button>
          ))}
        </div>
        <button
          type="button"
          className="hf-pause"
          aria-pressed={held}
          aria-label={held ? text("Play the sector film", "Reprendre le défilement des secteurs") : text("Pause the sector film", "Mettre en pause le défilement des secteurs")}
          onClick={() => setHeld((h) => !h)}
        >
          {held ? <B en="Play" fr="Lecture" /> : <B en="Pause" fr="Pause" />}
        </button>
      </div>
    </>
  )
}
