"use client"

import { useEffect, useRef } from "react"

/**
 * Hero motion: the headline waves like a flag and a glass lens magnifies the
 * headline under the pointer.
 *
 * Cost is kept to almost nothing at the moment the opening ends:
 *  - the wave is a set of Web Animations (compositor, no script per frame),
 *    started on the real letters only;
 *  - the lens copy of the headline is built the first time the pointer
 *    arrives, and its letters join the same wave (same start time);
 *  - the lens loop runs only while the pointer is over the hero.
 * None of it runs with reduced motion, and the lens never runs on touch.
 */
const PERIOD_MS = ((2 * Math.PI) / 1.3) * 1000 // same speed as before
const FRAMES: Keyframe[] = [
  { transform: "translate3d(0,0,0) rotate(1.7deg)" },
  { transform: "translate3d(0,9px,0) rotate(0deg)", offset: 0.25 },
  { transform: "translate3d(0,0,0) rotate(-1.7deg)", offset: 0.5 },
  { transform: "translate3d(0,-9px,0) rotate(0deg)", offset: 0.75 },
  { transform: "translate3d(0,0,0) rotate(1.7deg)" },
]

export function HeroFx() {
  const lensRef = useRef<HTMLDivElement>(null)
  const worldRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const stage = document.getElementById("hero-stage")
    const h1 = document.getElementById("hero-h")
    const lens = lensRef.current
    const world = worldRef.current
    if (!stage || !h1 || !lens || !world) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) return
    const fine = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 861px)").matches

    const root = document.documentElement
    const S = 1.38
    let R = 105
    let hox = 0
    let hoy = 0
    let raf = 0
    let ptr = { x: 0, y: 0, in: false }
    const pos = { x: 0, y: 0 }
    let letters: HTMLElement[] = []
    let clone: HTMLElement | null = null
    let waves: Animation[] = []
    let t0 = 0
    let playing = true

    const letterList = (host: HTMLElement) => Array.from(host.querySelectorAll<HTMLElement>(".wvl")).filter((e) => e.offsetParent !== null)

    const wave = (els: HTMLElement[]) =>
      els.map((el, i) => {
        const a = el.animate(FRAMES, { duration: PERIOD_MS, iterations: Infinity, easing: "cubic-bezier(0.37, 0, 0.63, 1)", delay: -((i * 0.42) / 1.3) * 1000 })
        a.startTime = t0 // every letter, and the lens copy, share one clock
        if (!playing) a.pause()
        return a
      })

    const startWaves = () => {
      waves.forEach((a) => a.cancel())
      letters = letterList(h1)
      t0 = Number(document.timeline.currentTime ?? 0)
      waves = wave(letters)
      clone = null
      world.innerHTML = ""
    }

    // The lens copy is made once, the first time the pointer comes over the hero.
    const ensureClone = () => {
      if (clone || !fine) return
      clone = document.createElement("div") // a div, not another h1: the page has one heading level 1
      clone.className = `${h1.className} lens-clone`
      clone.innerHTML = h1.innerHTML
      clone.setAttribute("aria-hidden", "true")
      world.appendChild(clone)
      waves.push(...wave(letterList(clone)))
      measure()
    }

    const measure = () => {
      const sr = stage.getBoundingClientRect()
      R = Math.max(80, Math.min(120, sr.width * 0.075))
      lens.style.setProperty("--R", `${R}px`)
      if (!clone) return
      const hr = h1.getBoundingClientRect()
      hox = hr.left - sr.left
      hoy = hr.top - sr.top
      clone.style.left = `${hr.left - sr.left}px`
      clone.style.top = `${hr.top - sr.top}px`
      clone.style.width = `${hr.width}px`
      world.style.width = `${sr.width}px`
      world.style.height = `${sr.height}px`
    }

    const lensTick = () => {
      raf = 0
      if (ptr.in) {
        if (!lens.dataset.on) {
          pos.x = ptr.x
          pos.y = ptr.y
        }
        pos.x += (ptr.x - pos.x) * 0.2
        pos.y += (ptr.y - pos.y) * 0.2
        lens.style.transform = `translate3d(${pos.x - R}px,${pos.y - R}px,0)`
        world.style.transform = `translate3d(${R - pos.x * S}px,${R - pos.y * S}px,0) scale(${S})`
        // the lens is clear glass, so the real headline is cut out under it: no doubled letters
        h1.style.setProperty("--lx", `${pos.x - hox}px`)
        h1.style.setProperty("--ly", `${pos.y - hoy}px`)
        h1.style.setProperty("--lr", `${R}px`)
        h1.dataset.lens = "1"
        lens.dataset.on = "1"
        raf = requestAnimationFrame(lensTick)
      } else if (lens.dataset.on) {
        delete lens.dataset.on
        delete h1.dataset.lens
      }
    }

    const onMove = (e: PointerEvent) => {
      const sr = stage.getBoundingClientRect()
      ptr = { x: e.clientX - sr.left, y: e.clientY - sr.top, in: true }
      ensureClone()
      if (!raf) raf = requestAnimationFrame(lensTick)
    }
    const onLeave = () => {
      ptr.in = false
      if (!raf) raf = requestAnimationFrame(lensTick)
    }
    const onResize = () => {
      measure()
    }

    const setPlaying = (on: boolean) => {
      playing = on
      waves.forEach((a) => (on ? a.play() : a.pause()))
    }
    const io = new IntersectionObserver(([e]) => setPlaying(e.isIntersecting && !document.hidden))
    io.observe(stage)
    const onVis = () => setPlaying(!document.hidden)
    document.addEventListener("visibilitychange", onVis)

    // The headline text changes with the language: rebuild the wave then.
    const mo = new MutationObserver(() => startWaves())
    mo.observe(root, { attributes: true, attributeFilter: ["lang"] })

    // Start only once the opening is over, so nothing competes with it.
    let waitObserver: MutationObserver | null = null
    const begin = () => {
      startWaves()
      measure()
    }
    if (root.classList.contains("op-run") && !root.classList.contains("op-done")) {
      waitObserver = new MutationObserver(() => {
        if (root.classList.contains("op-done")) {
          waitObserver?.disconnect()
          begin()
        }
      })
      waitObserver.observe(root, { attributes: true, attributeFilter: ["class"] })
    } else {
      begin()
    }

    window.addEventListener("resize", onResize)
    if (fine) {
      stage.addEventListener("pointermove", onMove)
      stage.addEventListener("pointerleave", onLeave)
    }

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      mo.disconnect()
      waitObserver?.disconnect()
      document.removeEventListener("visibilitychange", onVis)
      window.removeEventListener("resize", onResize)
      stage.removeEventListener("pointermove", onMove)
      stage.removeEventListener("pointerleave", onLeave)
      waves.forEach((a) => a.cancel())
    }
  }, [])

  return (
    <div className="lens" ref={lensRef} aria-hidden="true">
      <div className="lens-world" ref={worldRef} />
      <span className="lens-ring" />
    </div>
  )
}
