"use client"

import { useEffect } from "react"
import { C } from "@/content/en"
import { T } from "./t"

const WORD = "SentrIA"

function Letters() {
  return (
    <div className="op-word">
      {[...WORD].map((c, i) => (
        <span key={i} className={`op-l${i >= 5 ? " op-ia" : ""}`} style={{ animationDelay: `${0.05 + i * 0.05}s` }}>
          {c}
        </span>
      ))}
    </div>
  )
}

/**
 * The opening: SentrIA in Unbounded rises letter by letter ("IA" in lime), a
 * thin lime line draws under it with the first line of the page, then the dark
 * layer melts away. No glow, no seam.
 * Pure CSS, so it ends itself (visibility: hidden) even if no script runs.
 * Only shown when <html> has .op-run (set before paint by the head script).
 */
export function Opening() {
  useEffect(() => {
    const root = document.documentElement
    if (!root.classList.contains("op-wait")) return
    // Play as soon as the fonts are ready and two frames are painted (never wait for images).
    // The head script lifts the pause after 0.9 s whatever happens.
    let cancelled = false
    Promise.resolve(document.fonts ? document.fonts.ready : undefined).then(() => {
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          if (!cancelled) root.classList.remove("op-wait")
        })
      )
    })
    return () => {
      cancelled = true
    }
  }, [])
  return (
    <div className="op" aria-hidden="true">
      <div className="op-bg">
        <Letters />
        <p className="op-tag">
          <T s={C.hero.l1} /> <T s={C.hero.l2} /> <T s={C.hero.l3} />
        </p>
        <div className="op-bar">
          <i />
        </div>
      </div>
    </div>
  )
}
