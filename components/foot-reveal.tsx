"use client"

import { useEffect } from "react"

/**
 * Reveals the big SentrIA wordmark in the footer on pages that do not mount the
 * home page's scroll engine (articles, article list, legal pages). On the home
 * page the engine already does this; marking the same element twice is harmless.
 */
export function FootReveal() {
  useEffect(() => {
    const el = document.querySelector<HTMLElement>(".foot-band .mega")
    if (!el || el.hasAttribute("data-in")) return
    const show = () => el.setAttribute("data-in", "1")
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      show()
      return
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          show()
          io.disconnect()
        }
      },
      { threshold: 0.15 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return null
}
