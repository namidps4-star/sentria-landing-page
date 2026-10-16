"use client"

import { useEffect, useRef } from "react"

type Letter = { el: HTMLElement; clone: HTMLElement | null; phase: number; cx: number; cy: number }

/**
 * Hero motion: the headline waves like a flag (a sine per letter), letters
 * near the pointer lift higher, and a glass lens magnifies the headline under
 * the pointer. Everything stops when the hero is off screen or the tab is
 * hidden, and none of it runs with reduced motion or on touch screens.
 */
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

    let letters: Letter[] = []
    let clone: HTMLElement | null = null
    let R = 105
    const S = 1.38
    let stageW = 0
    let visible = true
    let raf = 0
    let ptr = { x: 0, y: 0, in: false }
    const pos = { x: 0, y: 0 }
    let lastMeasure = 0
    const cleanupFns: Array<() => void> = []

    const build = () => {
      world.innerHTML = ""
      clone = null
      if (fine) {
        // A div, not another h1: the page has exactly one heading level 1.
        clone = document.createElement("div")
        clone.className = `${h1.className} lens-clone`
        clone.innerHTML = h1.innerHTML
        clone.setAttribute("aria-hidden", "true")
        world.appendChild(clone)
      }
      const own = Array.from(h1.querySelectorAll<HTMLElement>(".wvl")).filter((e) => e.offsetParent !== null)
      const cl = clone ? Array.from(clone.querySelectorAll<HTMLElement>(".wvl")).filter((e) => e.offsetParent !== null) : []
      letters = own.map((el, i) => ({ el, clone: cl[i] ?? null, phase: i * 0.42, cx: 0, cy: 0 }))
      measure()
    }

    const measure = () => {
      const sr = stage.getBoundingClientRect()
      stageW = sr.width
      R = Math.max(80, Math.min(120, sr.width * 0.075))
      lens.style.setProperty("--R", `${R}px`)
      const hr = h1.getBoundingClientRect()
      if (clone) {
        clone.style.left = `${hr.left - sr.left}px`
        clone.style.top = `${hr.top - sr.top}px`
        clone.style.width = `${hr.width}px`
        world.style.width = `${sr.width}px`
        world.style.height = `${sr.height}px`
      }
      letters.forEach((l) => {
        const r = l.el.getBoundingClientRect()
        l.cx = r.left - sr.left + r.width / 2
        l.cy = r.top - sr.top + r.height / 2
      })
      lastMeasure = performance.now()
    }

    const onMove = (e: PointerEvent) => {
      const sr = stage.getBoundingClientRect()
      ptr = { x: e.clientX - sr.left, y: e.clientY - sr.top, in: true }
      kick()
    }
    const onLeave = () => {
      ptr.in = false
    }

    // The flag wave runs as Web Animations (on the compositor, no script per frame).
    // Every letter shares one curve and differs only by its start offset.
    const PERIOD = (2 * Math.PI) / 1.3 // seconds, same speed as before
    let waves: Animation[] = []
    const startWaves = () => {
      waves.forEach((a) => a.cancel())
      waves = []
      const all = letters.flatMap((l) => (l.clone ? [l.el, l.clone] : [l.el]))
      const delays = letters.flatMap((l, i) => (l.clone ? [i, i] : [i]))
      all.forEach((el, k) => {
        const a = el.animate(
          [
            { transform: "translate3d(0,0,0) rotate(1.7deg)" },
            { transform: "translate3d(0,9px,0) rotate(0deg)", offset: 0.25 },
            { transform: "translate3d(0,0,0) rotate(-1.7deg)", offset: 0.5 },
            { transform: "translate3d(0,-9px,0) rotate(0deg)", offset: 0.75 },
            { transform: "translate3d(0,0,0) rotate(1.7deg)" },
          ],
          { duration: PERIOD * 1000, iterations: Infinity, easing: "cubic-bezier(0.37, 0, 0.63, 1)", delay: -((delays[k] * 0.42) / 1.3) * 1000 },
        )
        waves.push(a)
      })
    }
    const setWaves = (play: boolean) => waves.forEach((a) => (play ? a.play() : a.pause()))

    // The lens follows the pointer with a small loop that only runs while the pointer is over the hero.
    const lensTick = () => {
      raf = 0
      if (!clone) return
      if (ptr.in) {
        if (!lens.dataset.on) {
          pos.x = ptr.x
          pos.y = ptr.y
        }
        pos.x += (ptr.x - pos.x) * 0.2
        pos.y += (ptr.y - pos.y) * 0.2
        lens.style.transform = `translate3d(${pos.x - R}px,${pos.y - R}px,0)`
        world.style.transform = `translate3d(${R - pos.x * S}px,${R - pos.y * S}px,0) scale(${S})`
        lens.dataset.on = "1"
        raf = requestAnimationFrame(lensTick)
      } else if (lens.dataset.on) {
        delete lens.dataset.on
      }
    }
    const kick = () => {
      if (!raf && fine && clone) raf = requestAnimationFrame(lensTick)
    }

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      setWaves(visible && !document.hidden)
    })
    io.observe(stage)

    const mo = new MutationObserver(() => rebuild())
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] })

    const rebuild = () => {
      build()
      startWaves()
    }
    // Wait for the opening to finish before the wave starts, so nothing competes with it.
    const root = document.documentElement
    let startedWaves = false
    const begin = () => {
      if (startedWaves) return
      startedWaves = true
      rebuild()
    }
    if (root.classList.contains("op-run") && !root.classList.contains("op-done")) {
      build()
      const wait = new MutationObserver(() => {
        if (root.classList.contains("op-done")) {
          wait.disconnect()
          begin()
        }
      })
      wait.observe(root, { attributes: true, attributeFilter: ["class"] })
      cleanupFns.push(() => wait.disconnect())
    } else {
      begin()
    }
    window.addEventListener("resize", rebuild)
    if (fine) {
      stage.addEventListener("pointermove", onMove)
      stage.addEventListener("pointerleave", onLeave)
    }

    return () => {
      cleanupFns.forEach((f) => f())
      waves.forEach((a) => a.cancel())
      cancelAnimationFrame(raf)
      io.disconnect()
      mo.disconnect()
      window.removeEventListener("resize", rebuild)
      stage.removeEventListener("pointermove", onMove)
      stage.removeEventListener("pointerleave", onLeave)
      letters.forEach((l) => {
        l.el.style.transform = ""
      })
    }
  }, [])

  return (
    <div className="lens" ref={lensRef} aria-hidden="true">
      <div className="lens-world" ref={worldRef} />
      <span className="lens-ring" />
    </div>
  )
}
