"use client"

import { useEffect } from "react"

/**
 * Plays the comparison table's entrance once, when it is first about half on screen. The CSS only hides
 * the cells under `.js` plus `prefers-reduced-motion: no-preference`, so without JS or with reduced
 * motion the table is simply shown.
 */
export function CompareFx() {
  useEffect(() => {
    const t = document.querySelector<HTMLElement>(".cmp-table")
    if (!t) return
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      t.setAttribute("data-in", "1")
      return
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return
        t.setAttribute("data-in", "1")
        io.disconnect()
      },
      { threshold: 0.35 },
    )
    io.observe(t)
    return () => io.disconnect()
  }, [])
  return null
}
