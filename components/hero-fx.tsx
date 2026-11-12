"use client"

import { useEffect, useRef } from "react"
import { LensGlass } from "./lens-glass-layers"
import { glassParts, moveGlass, sizeLensFilter } from "./lens-glass"

/**
 * Hero motion: the headline waves like a flag and a glass lens, built like the Loupe on
 * motionin.design, magnifies and bends everything under the pointer: the photo, the
 * headline, the proof lines and the caption.
 *
 * Cost is kept to almost nothing at the moment the opening ends:
 *  - the wave is a set of Web Animations (compositor, no script per frame),
 *    started on the real letters only;
 *  - the lens copy of the hero is built the first time the pointer arrives
 *    (and again when the photo changes); its headline letters join the same wave;
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
  const defsRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const stage = document.getElementById("hero-stage")
    const h1 = document.getElementById("hero-h")
    const lens = lensRef.current
    const world = worldRef.current
    const defs = defsRef.current
    if (!stage || !h1 || !lens || !world || !defs) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) return
    const fine = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 861px)").matches

    const root = document.documentElement
    const S = 1.32
    let R = 105
    let size = 0
    let raf = 0
    let ptr = { x: 0, y: 0, in: false }
    const pos = { x: 0, y: 0 }
    let letters: HTMLElement[] = []
    let clone: HTMLElement | null = null
    let waves: Animation[] = []
    let copyWaves: Animation[] = []
    const glass = glassParts(lens)
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

    // The wave starts only after the headline has finished typing itself.
    let token = 0
    const startAfterTyping = () => {
      const mine = ++token
      const typing = h1.getAnimations({ subtree: true }).filter((a) => ((a as CSSAnimation).animationName ?? "").startsWith("wvl-"))
      if (!typing.length) return startWaves()
      Promise.allSettled(typing.map((a) => a.finished)).then(() => {
        if (mine === token) startWaves()
      })
    }

    const startWaves = () => {
      waves.forEach((a) => a.cancel())
      letters = letterList(h1)
      t0 = Number(document.timeline.currentTime ?? 0)
      waves = wave(letters)
      dropCopy()
    }

    const dropCopy = () => {
      copyWaves.forEach((a) => a.cancel())
      copyWaves = []
      clone = null
      world.innerHTML = ""
    }

    // The lens copy is made the first time the pointer comes over the hero, and again when the photo changes.
    // It is the hero without the lens: only the photo that is showing, the dark layer, the headline, the proof lines, the caption.
    const buildCopy = () => {
      const copy = document.createElement("div") // a div, not another stage: ids are stripped and the page keeps one heading level 1
      copy.className = "hero-stage lens-copy"
      copy.setAttribute("aria-hidden", "true")
      copy.setAttribute("inert", "")
      Array.from(stage.children).forEach((child) => {
        const el = child as HTMLElement
        if (el.classList.contains("lens")) return
        if (el.classList.contains("hero-film")) {
          const film = el.cloneNode(false) as HTMLElement
          const slide = el.querySelector(".hf-slide[data-active=\"1\"]")
          const scrim = el.querySelector(".hf-scrim")
          if (slide) film.appendChild(slide.cloneNode(true))
          if (scrim) film.appendChild(scrim.cloneNode(true))
          copy.appendChild(film)
          return
        }
        copy.appendChild(el.cloneNode(true))
      })
      copy.querySelectorAll("[id]").forEach((n) => n.removeAttribute("id"))
      // the page keeps one heading level 1: the copy's headline becomes a plain div with the same classes
      copy.querySelectorAll("h1").forEach((h) => {
        const div = document.createElement("div")
        div.className = h.className
        div.innerHTML = h.innerHTML
        h.replaceWith(div)
      })
      copy.querySelectorAll("a, button").forEach((n) => n.setAttribute("tabindex", "-1"))
      return copy
    }

    const ensureClone = () => {
      if (clone || !fine) return
      clone = buildCopy()
      world.appendChild(clone)
      const copyH1 = clone.querySelector<HTMLElement>(".hero-h")
      if (copyH1) copyWaves = wave(letterList(copyH1))
      waves.push(...copyWaves)
      measure()
    }

    const measure = () => {
      const sr = stage.getBoundingClientRect()
      R = Math.round(Math.max(80, Math.min(120, sr.width * 0.075)))
      lens.style.setProperty("--R", `${R}px`)
      if (size !== R * 2) {
        size = R * 2
        sizeLensFilter(defs, size)
      }
      world.style.width = `${sr.width}px`
      world.style.height = `${sr.height}px`
      if (clone) {
        clone.style.width = `${sr.width}px`
        clone.style.height = `${sr.height}px`
      }
    }

    const lensTick = () => {
      raf = 0
      if (ptr.in) {
        if (!lens.dataset.on) {
          pos.x = ptr.x
          pos.y = ptr.y
        }
        const vx = (ptr.x - pos.x) * 0.2
        const vy = (ptr.y - pos.y) * 0.2
        pos.x += vx
        pos.y += vy
        lens.style.transform = `translate3d(${pos.x - R}px,${pos.y - R}px,0)`
        world.style.transform = `translate3d(${R - pos.x * S}px,${R - pos.y * S}px,0) scale(${S})`
        if (glass) moveGlass(glass, performance.now() / 1000, vx, vy)
        lens.dataset.on = "1"
        raf = requestAnimationFrame(lensTick)
      } else if (lens.dataset.on) {
        delete lens.dataset.on
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

    // The photo changes every few seconds: the lens copy must show the new one.
    const film = stage.querySelector(".hero-film")
    const fo = new MutationObserver(() => {
      dropCopy()
      if (ptr.in) ensureClone()
    })
    if (film) fo.observe(film, { attributes: true, attributeFilter: ["data-active"], subtree: true })

    // The headline text changes with the language: rebuild the wave then.
    const mo = new MutationObserver(() => startAfterTyping())
    mo.observe(root, { attributes: true, attributeFilter: ["lang"] })

    // Start only once the opening is over, so nothing competes with it.
    let waitObserver: MutationObserver | null = null
    const begin = () => {
      startAfterTyping()
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
      fo.disconnect()
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
      <LensGlass worldRef={worldRef} defsRef={defsRef} />
    </div>
  )
}
