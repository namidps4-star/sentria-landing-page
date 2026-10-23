"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { C } from "@/content/en"
import { TAGLINES } from "@/content/taglines"
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
  const [ready, setReady] = useState(false)
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
      </div>
    </>
  )
}
