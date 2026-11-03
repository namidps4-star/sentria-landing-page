"use client"

import { useEffect } from "react"
import { SentriaWordmark } from "@/components/sentria-wordmark"

function MarkPieces() {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className="op-mark">
      <g className="op-m-top">
        <path d="M14 42.5a23 23 0 0 1 46 0z" fill="var(--lime)" stroke="var(--lime)" strokeWidth="10" strokeLinejoin="round" />
        <rect x="9" y="40" width="10" height="17.5" rx="5" fill="var(--lime)" />
      </g>
      <g className="op-m-bot">
        <path d="M40 57.5a23 23 0 0 0 46 0z" fill="#fff" stroke="#fff" strokeWidth="10" strokeLinejoin="round" />
        <rect x="81" y="42.5" width="10" height="17.5" rx="5" fill="#fff" />
      </g>
    </svg>
  )
}

/**
 * The opening, about 3.5 s: the dome mark settles (0.15 s), the wordmark rises letter by letter,
 * the lime shards grow from the baseline, the ® fades in (about 2.1 s), then the black panel lifts
 * away with the lock-up trailing behind it. Pure CSS, so it ends itself (visibility: hidden) even if no script runs.
 * Only shown when <html> has .op-run (set before paint by the head script).
 * The timings are shared with the hero entrance (--t0) and the scroll unlock (components/motion.tsx): change them together.
 */
export function Opening() {
  useEffect(() => {
    const root = document.documentElement
    if (!root.classList.contains("op-wait")) return
    let cancelled = false
    const fonts = document.fonts
    Promise.resolve(fonts ? fonts.load("600 100px Chillax").then(() => fonts.ready, () => fonts.ready) : undefined).then(() => {
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
        <div className="op-lock">
          <MarkPieces />
          <SentriaWordmark />
        </div>
      </div>
    </div>
  )
}
