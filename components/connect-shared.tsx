"use client"

import { useEffect, useRef, useState } from "react"
import type { ReactNode } from "react"
import { B } from "./t"

export const bi = (en: string, fr: string) => <B en={en} fr={fr} />

export const reduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches

/** Seen once (for the entrance) and visible now (for loops and parallax). */
export function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [seen, setSeen] = useState(false)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (reduced() || !("IntersectionObserver" in window)) {
      queueMicrotask(() => setSeen(true))
      return
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setSeen(true)
        setVis(e.isIntersecting)
      },
      { threshold: 0.22 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return { ref, seen, vis }
}

/** Counts up to a value once, when `go` turns true. Final value immediately under reduced motion. */
export function useCountUp(target: number, go: boolean, decimals = 0) {
  const [v, setV] = useState(target)
  const done = useRef(false)
  useEffect(() => {
    if (!go || done.current) return
    done.current = true
    if (reduced()) return
    const t0 = performance.now()
    const dur = 1100
    let raf = 0
    const step = (t: number) => {
      const p = Math.min(1, (t - t0) / dur)
      const e = 1 - Math.pow(1 - p, 4)
      setV(target * e)
      if (p < 1) raf = requestAnimationFrame(step)
      else setV(target)
    }
    queueMicrotask(() => setV(0))
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [go, target])
  return decimals ? v.toFixed(decimals) : Math.round(v).toLocaleString("en-US").replace(/,/g, " ")
}

/* ----------------------------------------------------------------- icons */

export const I = {
  table: <><rect x="4" y="5" width="16" height="14" rx="1.5" /><path d="M4 10h16M10 5v14" /></>,
  check: <><circle cx="12" cy="12" r="8" /><path d="M8.5 12.5l2.5 2.5 4.5-5" /></>,
  down: <path d="M12 4v11M7.5 10.5L12 15l4.5-4.5M5 19.5h14" />,
  nodes: <><circle cx="6" cy="12" r="2.4" /><circle cx="18" cy="6" r="2.4" /><circle cx="18" cy="18" r="2.4" /><path d="M8.2 11l7.6-3.9M8.2 13l7.6 3.9" /></>,
  sync: <path d="M19.5 12a7.5 7.5 0 1 1-2.2-5.3M19.5 4.5v4.5h-4.5" />,
  chart: <><path d="M4 18l5-6 4 3 7-8" /><path d="M4 20.5h16" /></>,
  chip: <><rect x="8" y="8" width="8" height="8" rx="1" /><path d="M10 8V5M14 8V5M10 19v-3M14 19v-3M8 10H5M8 14H5M19 10h-3M19 14h-3" /></>,
  wave: <path d="M3 12h3l2-5 4 10 3-8 2 3h4" />,
  alert: <><path d="M12 4l8.5 15h-17z" /><path d="M12 10v4M12 16.5v.5" /></>,
  link: <path d="M9 7l-5 5 5 5M15 7l5 5-5 5" />,
  send: <path d="M5 12h13M13.5 7.5L18 12l-4.5 4.5" />,
  recv: <path d="M19 12H6M10.5 7.5L6 12l4.5 4.5" />,
}
export const Ico = ({ d }: { d: ReactNode }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    {d}
  </svg>
)

/* ----------------------------------------------------------------- panel */

export type Step = { icon: ReactNode; label: ReactNode }
