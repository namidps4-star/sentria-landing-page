"use client"

import { useEffect } from "react"

const WORD = "SentrIA"

function Letters() {
  return (
    <div className="op-word">
      {[...WORD].map((c, i) => (
        <i key={i} className={i >= 5 ? "op-ia" : undefined}>
          {c}
        </i>
      ))}
    </div>
  )
}

/** The mark in two pieces, so the lime dome and the white bowl can settle into place on their own. */
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
 * The opening, about 3.5 s, in Unbounded: the two halves of the mark settle
 * (0.15 s), the mark glides left while the name is revealed in one sweep with "IA"
 * in lime (1 s), they hold, then the black panel lifts away with the name trailing
 * behind it and the page is underneath (2.55 s). No line, no caption, no glow. Pure CSS, so it ends itself (visibility: hidden) even if no script runs.
 * Only shown when <html> has .op-run (set before paint by the head script).
 * The timings are shared with the hero entrance (--t0) and the scroll unlock (a little before the end, so the unlock never loses a race with the end of the opening)
 * (components/motion.tsx): change them together.
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
        <div className="op-lock">
          <MarkPieces />
          <Letters />
        </div>
      </div>
    </div>
  )
}
