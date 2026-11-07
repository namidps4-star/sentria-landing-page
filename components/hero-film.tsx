"use client"

import Image from "next/image"
import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { C } from "@/content/en"
import { TAGLINES } from "@/content/taglines"
import { B, T } from "./t"
import { SECTORS } from "./sectors"

const BEAT_MS = 5600
// How long the dark opening phase lasts before the headline slides home and photos appear.
const PHASE_MS = 2800

/**
 * The film behind the hero headline: the seven sectors, one photo at a time,
 * crossfading with a slow push-in, under a dark layer so the headline stays
 * readable. It carries the old "Where SentrIA applies next." title and the
 * sector's own line. It starts once the opening is over, pauses while the
 * pointer or the keyboard is on the caption, and stays still with reduced motion.
 *
 * Two-phase opening (concept A):
 *   1. Dark background, headline centered and scaled up — plays during typing.
 *   2. After PHASE_MS, the headline slides home and the sector photos fade in.
 */
export function HeroFilm() {
  const [active, setActive] = useState(0)
  const [reduced, setReduced] = useState(false)
  const [paused, setPaused] = useState(false)
  const [ready, setReady] = useState(false)
  const box = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    const root = document.documentElement
    if (!root.classList.contains("op-run") || root.classList.contains("op-done")) {
      setReady(true)
      return
    }
    // Wait for the opening panel to lift before starting the film.
    const mo = new MutationObserver(() => {
      if (root.classList.contains("op-done")) {
        mo.disconnect()
        setReady(true)
      }
    })
    mo.observe(root, { attributes: true, attributeFilter: ["class"] })
    return () => mo.disconnect()
  }, [])

  // Phase 1 → 2: center the headline on the dark background, then slide it
  // back to its grid position while the first sector photo fades in.
  useLayoutEffect(() => {
    if (!ready || reduced) return

    const h = document.getElementById("hero-h") as HTMLElement | null
    const stage = document.getElementById("hero-stage") as HTMLElement | null
    if (!h || !stage) return

    // Compute the offset needed to put the headline's midpoint at the stage center.
    const hr = h.getBoundingClientRect()
    const sr = stage.getBoundingClientRect()
    const dx = sr.left + sr.width / 2 - (hr.left + hr.width / 2)
    const dy = sr.top + sr.height / 2 - (hr.top + hr.height / 2)

    // Snap headline to center with no visible transition.
    h.style.transition = "none"
    h.style.transform = `translate(${dx}px, ${dy}px) scale(1.1)`
    stage.dataset.phase = "opening"

    // After the typing animation has had time to finish, slide the headline
    // home and reveal the photos.
    const id = window.setTimeout(() => {
      h.style.transition = "transform 1100ms cubic-bezier(0.42, 0, 0.18, 1)"
      h.style.transform = ""
      stage.dataset.phase = "settled"
      window.setTimeout(() => {
        h.style.transition = ""
      }, 1200)
    }, PHASE_MS)

    return () => {
      window.clearTimeout(id)
      h.style.transition = ""
      h.style.transform = ""
      delete stage.dataset.phase
    }
  }, [ready, reduced])

  useEffect(() => {
    if (reduced || paused || !ready) return
    const id = window.setInterval(() => {
      if (document.hidden) return
      setActive((a) => (a + 1) % SECTORS.length)
    }, BEAT_MS)
    return () => window.clearInterval(id)
  }, [reduced, paused, ready])

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
      <p className="hf-tag" aria-live="off">
        <B en={tag.en} fr={tag.fr} />
      </p>

      <div
        className="hf-cap"
        ref={box}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <p className="hf-s" aria-live="off">
          <T s={sec.title} />
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
      </div>
    </>
  )
}
