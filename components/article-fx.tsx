"use client"

import { useEffect } from "react"

/**
 * Small, once-only motion for an article page: the hand-drawn marks sweep on and the photos and the
 * call-to-action card fade up as they are first reached. Text itself never moves. With reduced motion
 * (or no IntersectionObserver) everything is simply shown, and the CSS only hides things under
 * `.js` plus `prefers-reduced-motion: no-preference`.
 */
export function ArticleFx() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".blog .bmk, .blog-hero, .blog-figure, .blog-cta"))
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      els.forEach((e) => e.setAttribute("data-in", "1"))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue
          e.target.setAttribute("data-in", "1")
          io.unobserve(e.target)
        }
      },
      { threshold: 0.45 },
    )
    els.forEach((e) => io.observe(e))
    return () => io.disconnect()
  }, [])
  return null
}
