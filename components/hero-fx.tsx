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
    let waveStart = 0

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
    }
    const onLeave = () => {
      ptr.in = false
    }

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick)
      if (!visible || document.hidden) return
      // keep the main thread free while the opening plays
      const rootEl = document.documentElement
      if (rootEl.classList.contains("op-run") && !rootEl.classList.contains("op-done")) return
      if (now - lastMeasure > 700) measure()
      if (!waveStart) waveStart = now
      const ramp = Math.min(1, (now - waveStart) / 1400) // ease the wave in, so it does not pop on
      const t = now / 1000
      for (const l of letters) {
        let amp = 9
        if (ptr.in) {
          const dx = l.cx - ptr.x
          const dy = l.cy - ptr.y
          amp += 15 * Math.exp(-(dx * dx + dy * dy) / (2 * 150 * 150))
        }
        const p = l.phase + t * 1.3
        const tf = `translate3d(0,${(Math.sin(p) * amp * ramp).toFixed(2)}px,0) rotate(${(Math.cos(p) * 1.7 * ramp).toFixed(2)}deg)`
        l.el.style.transform = tf
        if (l.clone) l.clone.style.transform = tf
      }
      if (fine && clone) {
        // The lens exists only while the pointer is over the hero: nothing runs for it otherwise.
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
        } else if (lens.dataset.on) {
          delete lens.dataset.on
        }
      }
    }

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
    })
    io.observe(stage)

    const mo = new MutationObserver(() => build())
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] })

    build()
    window.addEventListener("resize", build)
    if (fine) {
      stage.addEventListener("pointermove", onMove)
      stage.addEventListener("pointerleave", onLeave)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      mo.disconnect()
      window.removeEventListener("resize", build)
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
