"use client"

import { useEffect, useRef } from "react"
import { LensGlass } from "./lens-glass-layers"
import { glassParts, moveGlass, sizeLensFilter } from "./lens-glass"
import { bob, clampTo, flingFrom, glide, newBody, type Bounds, type Trail } from "./lens-drag"
import { useLang } from "./lang"
import { buildLensCopy } from "./lens-copy"

/**
 * Hero motion: the headline waves like a flag, and a glass lens rests on the word "evidence".
 * The lens is built like the Loupe and moves like Isle (both on motionin.design): you grab it,
 * fling it, and it glides to a stop. It magnifies and bends everything under it: the photo,
 * the headline, the proof lines and the caption.
 *
 * Cost is kept to almost nothing at the moment the opening ends:
 *  - the wave is a set of Web Animations (compositor, no script per frame),
 *    started on the real letters only;
 *  - the lens copy of the hero is built once the headline has typed itself
 *    (and again when the photo changes); its headline letters join the same wave;
 *  - the lens loop runs only while the hero is on screen.
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
  const lang = useLang()
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
    const body = newBody()
    let trail: Trail = []
    let grab = { x: 0, y: 0 }
    let last = 0
    let onScreen = true
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
      if (fine) {
        ensureClone()
        goHome()
      }
    }

    const dropCopy = () => {
      copyWaves.forEach((a) => a.cancel())
      copyWaves = []
      clone = null
      world.innerHTML = ""
    }

    // The lens copy is made once the headline has typed itself, and again when the photo changes (see lens-copy.ts).
    const ensureClone = () => {
      if (clone || !fine) return
      clone = buildLensCopy(stage)
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

    const bounds = (): Bounds => {
      const sr = stage.getBoundingClientRect()
      return { minX: R, maxX: Math.max(R, sr.width - R), minY: R, maxY: Math.max(R, sr.height - R) }
    }

    // Home: the middle of the last word of the lime headline line ("evidence").
    const goHome = () => {
      const sr = stage.getBoundingClientRect()
      const line = h1.querySelector<HTMLElement>(".hl.lime")
      const ls = line ? letterList(line) : []
      let i = ls.length
      while (i > 0 && (ls[i - 1].textContent ?? "").trim() !== "") i--
      const word = ls.slice(i)
      if (!line || !word.length) return
      const first = word[0].getBoundingClientRect()
      const end = word[word.length - 1].getBoundingClientRect()
      const lr = line.getBoundingClientRect()
      body.x = (first.left + end.right) / 2 - sr.left
      body.y = (lr.top + lr.bottom) / 2 - sr.top
      body.vx = body.vy = 0
      body.moved = false
      clampTo(body, bounds())
      lens.dataset.on = "1"
      draw()
      wake()
    }

    const draw = () => {
      const t = performance.now() / 1000
      const rest = !body.dragging && !body.vx && !body.vy
      const y = body.y + (rest ? bob(t) : 0)
      lens.style.transform = `translate3d(${body.x - R}px,${y - R}px,0)`
      world.style.transform = `translate3d(${R - body.x * S}px,${R - y * S}px,0) scale(${S})`
      if (glass) moveGlass(glass, t, body.vx / 60, body.vy / 60)
    }

    const loop = () => {
      raf = 0
      if (!onScreen || document.hidden || !lens.dataset.on) return
      const now = performance.now()
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      glide(body, dt, bounds())
      draw()
      raf = requestAnimationFrame(loop)
    }
    const wake = () => {
      if (raf || !onScreen) return
      last = performance.now()
      raf = requestAnimationFrame(loop)
    }

    const onDown = (e: PointerEvent) => {
      if (e.button !== 0) return
      lens.setPointerCapture(e.pointerId)
      const sr = stage.getBoundingClientRect()
      grab = { x: e.clientX - sr.left - body.x, y: e.clientY - sr.top - body.y }
      body.dragging = true
      body.moved = true
      body.vx = body.vy = 0
      trail = []
      lens.dataset.drag = "1"
      lens.dataset.used = "1"
      wake()
    }
    const onMove = (e: PointerEvent) => {
      if (!body.dragging) return
      const sr = stage.getBoundingClientRect()
      body.x = e.clientX - sr.left - grab.x
      body.y = e.clientY - sr.top - grab.y
      clampTo(body, bounds())
      trail.push({ t: performance.now(), x: body.x, y: body.y })
      if (trail.length > 12) trail.shift()
    }
    const onUp = () => {
      if (!body.dragging) return
      body.dragging = false
      const v = flingFrom(trail, performance.now())
      body.vx = v.vx
      body.vy = v.vy
      delete lens.dataset.drag
      wake()
    }

    const onResize = () => {
      measure()
      if (body.moved) clampTo(body, bounds())
      else if (fine && clone) goHome()
      draw()
    }

    const setPlaying = (on: boolean) => {
      playing = on
      waves.forEach((a) => (on ? a.play() : a.pause()))
      onScreen = on
      if (on) wake()
    }
    const io = new IntersectionObserver(([e]) => setPlaying(e.isIntersecting && !document.hidden))
    io.observe(stage)
    const onVis = () => setPlaying(!document.hidden)
    document.addEventListener("visibilitychange", onVis)

    // The photo changes every few seconds: the lens copy must show the new one.
    const film = stage.querySelector(".hero-film")
    const fo = new MutationObserver(() => {
      dropCopy()
      if (fine) ensureClone()
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
      lens.addEventListener("pointerdown", onDown)
      lens.addEventListener("pointermove", onMove)
      lens.addEventListener("pointerup", onUp)
      lens.addEventListener("pointercancel", onUp)
    }

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      mo.disconnect()
      fo.disconnect()
      waitObserver?.disconnect()
      document.removeEventListener("visibilitychange", onVis)
      window.removeEventListener("resize", onResize)
      lens.removeEventListener("pointerdown", onDown)
      lens.removeEventListener("pointermove", onMove)
      lens.removeEventListener("pointerup", onUp)
      lens.removeEventListener("pointercancel", onUp)
      waves.forEach((a) => a.cancel())
    }
  }, [])

  return (
    <div className="lens" ref={lensRef} aria-hidden="true">
      <LensGlass worldRef={worldRef} defsRef={defsRef} />
      <span className="lens-hint">{lang === "fr" ? "Glissez-moi" : "Drag me"}</span>
    </div>
  )
}
