"use client"

import { useEffect } from "react"
import { SentriaWordmark } from "@/components/sentria-wordmark"

/**
 * The opening, about 3.5 s: the wordmark rises letter by letter, the lime shards grow
 * from the baseline, the ® fades in (about 2.1 s), then the black panel lifts away with
 * the wordmark trailing behind it. Pure CSS, so it ends itself (visibility: hidden) even if no script runs.
 * Only shown when <html> has .op-run (set before paint by the head script).
 * The timings are shared with the hero entrance (--t0) and the scroll unlock (components/motion.tsx): change them together.
 */
export function Opening() {
  useEffect(() => {
    const root = document.documentElement
    if (!root.classList.contains("op-wait")) return
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
          <SentriaWordmark />
        </div>
      </div>
    </div>
  )
}
