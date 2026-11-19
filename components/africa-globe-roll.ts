import type { MouseEvent as ReactMouseEvent } from "react"
import "./africa-globe-roll.css"

const EARTH = "/africa/earth-blue-marble.jpg"
const START_LON = -100 // the globe starts over the Americas
const AFRICA_LON = 20 // the middle of Africa
const DURATION = 1400

/* Shows a globe that rolls from the Americas to Africa, then opens the page. Reduced motion skips straight there. */
export function rollGlobeClick(e: ReactMouseEvent, href: string): void {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
  e.preventDefault()
  rollGlobeTo(href)
}

function rollGlobeTo(href: string): void {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.location.assign(href)
    return
  }
  if (document.querySelector(".globe-roll")) return

  const overlay = document.createElement("div")
  overlay.className = "globe-roll"
  overlay.setAttribute("aria-hidden", "true")
  const sphere = document.createElement("div")
  sphere.className = "globe-roll__sphere"
  overlay.appendChild(sphere)
  document.body.appendChild(overlay)

  // The sphere's diameter D shows half of the world; the texture is 2D wide for the full 360 degrees.
  const D = sphere.clientWidth
  const texW = 2 * D
  sphere.style.backgroundSize = `${texW}px ${D}px`
  const offsetFor = (lon: number) => D / 2 - ((lon + 180) / 360) * texW
  const from = offsetFor(START_LON)
  const to = offsetFor(AFRICA_LON)

  requestAnimationFrame(() => {
    overlay.dataset.on = "1"
  })

  const t0 = performance.now()
  const frame = (now: number) => {
    const t = Math.min(1, (now - t0) / DURATION)
    const eased = 1 - Math.pow(1 - t, 3)
    sphere.style.backgroundPosition = `${from + (to - from) * eased}px 0`
    if (t < 1) requestAnimationFrame(frame)
    else window.location.assign(href)
  }
  sphere.style.backgroundImage = `url(${EARTH})`
  requestAnimationFrame(frame)
}
