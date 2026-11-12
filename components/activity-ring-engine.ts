import type { MutableRefObject, RefObject } from "react"
import type { ActivityCard } from "@/content/africa-activity-cards"
import { blurLevel, cardPose, entrance, makeGeo, wrapOffset, type Geo } from "./activity-ring-motion"
import { kick, newPhys, step, type Phys } from "./activity-ring-physics"

export type RingRefs = {
  stage: RefObject<HTMLDivElement | null>
  cardEls: MutableRefObject<(HTMLElement | null)[]>
  veilEls: MutableRefObject<(HTMLElement | null)[]>
  cursor: RefObject<HTMLDivElement | null>
  cursorLabel: RefObject<HTMLSpanElement | null>
  bar: RefObject<HTMLElement | null>
  phys: MutableRefObject<Phys>
  activeRef: MutableRefObject<number>
  hover: MutableRefObject<number>
  didDrag: MutableRefObject<boolean>
  goTo: MutableRefObject<(i: number) => void>
  stepBy: MutableRefObject<(d: number) => void>
}
export type RingWords = { view: string; open: string; soon: string }

const DRAG = 0.0052 // cards per pixel dragged

/* The ring's animation loop and input: drag, sideways scroll, page-scroll spin, hover cursor. Returns the cleanup. */
export function startRing(refs: RingRefs, cards: ActivityCard[], text: RingWords, setActive: (i: number) => void): (() => void) | undefined {
  const { stage, cardEls, veilEls, cursor, cursorLabel, bar, phys, activeRef, hover, didDrag, goTo, stepBy } = refs
  const n = cards.length
  const el = stage.current
  if (!el) return
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches
  const p = (phys.current = newPhys(reduced))
  let geo: Geo = makeGeo(el.clientWidth, el.clientHeight)
  const measure = () => {
    geo = makeGeo(el.clientWidth, el.clientHeight)
    cardEls.current.forEach((c) => c && ((c.style.width = `${geo.cardW}px`), (c.style.height = `${geo.cardH}px`)))
  }
  measure()
  const ro = new ResizeObserver(measure)
  ro.observe(el)

  const imgs = cardEls.current.map((c) => c?.querySelector("img") ?? null)
  const levels: number[] = []
  let visible = false
  let startedAt = 0
  let raf = 0
  let last = 0
  let lastX = 0
  let lastV = 0
  let speed = 0
  const mouse = { x: 0, y: 0, in: false }
  const spring = { px: 0, vx: 0, py: 0, vy: 0, a: 0 }

  const nearest = (i: number) => {
    let d = (((i - Math.round(p.x)) % n) + n) % n
    if (d > n / 2) d -= n
    return Math.round(p.x) + d
  }
  goTo.current = (i) => {
    p.v = 0
    p.target = nearest(i)
  }
  stepBy.current = (d) => {
    p.v = 0
    p.target = (p.target ?? Math.round(p.x)) + d
  }

  const cardAt = (x: number, y: number) => {
    const hit = document.elementsFromPoint(x, y).find((e) => e instanceof HTMLElement && e.dataset.card !== undefined && e.dataset.far !== "1")
    return hit instanceof HTMLElement ? Number(hit.dataset.card) : -1
  }

  const frame = (now: number) => {
    raf = requestAnimationFrame(frame)
    if (!visible || document.hidden) {
      last = 0
      lastX = p.x
      return
    }
    if (!startedAt) startedAt = now
    const dt = last ? Math.min((now - last) / 1000, 1 / 30) : 1 / 60
    last = now
    step(p, now)
    const dv = Math.abs(p.v - lastV)
    speed = reduced || p.drag ? Math.min(1, Math.abs(p.x - lastX) / 0.5) : Math.max(0.9 * speed, Math.min(1, Math.max(Math.abs(p.x - lastX) / 0.5, 9 * dv)))
    if (reduced) speed = 0
    lastX = p.x
    lastV = p.v
    const t = (now - startedAt) / 1000
    for (let i = 0; i < n; i++) {
      const c = cardEls.current[i]
      if (!c) continue
      const v = wrapOffset(i, p.x, n)
      const k = Math.abs(v)
      const sp = reduced || t > 2.4 ? 1 : entrance(t, k)
      const pose = cardPose(v, geo, sp)
      c.style.transform = pose.transform
      c.style.opacity = pose.opacity.toFixed(3)
      c.style.zIndex = String(pose.z)
      c.dataset.far = k > 2.7 ? "1" : "0"
      const veil = veilEls.current[i]
      if (veil) veil.style.opacity = pose.veil.toFixed(3)
      const lv = reduced ? 0 : blurLevel(k, speed, sp)
      if (levels[i] !== lv && imgs[i]) {
        imgs[i]!.style.filter = lv > 0 ? `url(#afr-ca-${lv})` : "none"
        levels[i] = lv
      }
    }
    const idx = ((Math.round(p.x) % n) + n) % n
    if (idx !== activeRef.current) {
      activeRef.current = idx
      setActive(idx)
    }
    if (bar.current) bar.current.style.transform = `scaleX(${(0.04 + 0.96 * (idx / (n - 1))).toFixed(3)})`

    const ring = cursor.current
    if (ring) {
      const k = 700, c = 46
      spring.vx += (-k * (spring.px - mouse.x) - c * spring.vx) * dt
      spring.px += spring.vx * dt
      spring.vy += (-k * (spring.py - mouse.y) - c * spring.vy) * dt
      spring.py += spring.vy * dt
      const moving = p.drag || p.target !== null || Math.abs(p.v) > 0.03
      spring.a += ((hover.current >= 0 && mouse.in && !moving ? 1 : 0) - spring.a) * 0.2
      ring.style.transform = `translate3d(${(spring.px - 37.5).toFixed(1)}px, ${(spring.py - 37.5).toFixed(1)}px, 0)`
      ring.style.opacity = spring.a.toFixed(3)
      ring.style.visibility = spring.a > 0.015 ? "visible" : "hidden"
      const h = hover.current
      const word = h < 0 ? "" : h !== activeRef.current ? text.view : cards[h].slug ? text.open : text.soon
      if (cursorLabel.current && cursorLabel.current.textContent !== word && word) cursorLabel.current.textContent = word
    }
  }

  const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0.08 })
  io.observe(el)
  raf = requestAnimationFrame(frame)

  // Scrolling the page with the pointer over the ring spins it too, so the blur follows the scroll speed.
  let lastY = window.scrollY
  const onScroll = () => {
    const dy = window.scrollY - lastY
    lastY = window.scrollY
    if (visible && mouse.in && !reduced) kick(p, dy * 3.5e-4, performance.now())
  }
  // Sideways scrolling (trackpad or shift + wheel) turns the ring directly; with reduced motion it steps one card.
  let lastStep = 0
  const onWheel = (e: WheelEvent) => {
    if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return
    e.preventDefault()
    const now = performance.now()
    if (reduced) {
      if (now - lastStep > 350) {
        lastStep = now
        stepBy.current(Math.sign(e.deltaX))
      }
      return
    }
    kick(p, 7e-4 * e.deltaX, now)
  }
  // Dragging turns the ring; vertical drags are left to the page.
  const d = { on: false, x0: 0, y0: 0, xs: 0, lx: 0, axis: "" }
  const onDown = (e: PointerEvent) => {
    d.on = true
    d.x0 = d.lx = e.clientX
    d.y0 = e.clientY
    d.xs = p.x
    d.axis = ""
    didDrag.current = false
  }
  const onMove = (e: PointerEvent) => {
    if (!d.on) return
    const dx = e.clientX - d.x0
    const dy = e.clientY - d.y0
    if (!d.axis && Math.hypot(dx, dy) > 8) d.axis = Math.abs(dx) > Math.abs(dy) ? "h" : "v"
    if (d.axis !== "h") return
    if (Math.abs(dx) > 6) didDrag.current = true
    p.drag = true
    p.target = null
    p.lastInput = performance.now()
    p.x = d.xs - DRAG * dx
    p.v = -(DRAG * (e.clientX - d.lx))
    d.lx = e.clientX
  }
  const onUp = () => {
    d.on = false
    p.drag = false
    p.lastInput = performance.now()
    if (reduced) p.target = Math.round(p.x)
    setTimeout(() => (didDrag.current = false), 0)
  }
  const onHover = (e: PointerEvent) => {
    if (e.pointerType === "touch") return
    const r = el.getBoundingClientRect()
    mouse.x = e.clientX - r.left
    mouse.y = e.clientY - r.top
    if (!mouse.in) {
      spring.px = mouse.x
      spring.py = mouse.y
      spring.vx = spring.vy = 0
    }
    mouse.in = true
    hover.current = cardAt(e.clientX, e.clientY)
    el.dataset.hover = hover.current >= 0 ? "1" : "0"
  }
  const onLeave = () => {
    mouse.in = false
    hover.current = -1
    el.dataset.hover = "0"
  }
  window.addEventListener("scroll", onScroll, { passive: true })
  el.addEventListener("wheel", onWheel, { passive: false })
  el.addEventListener("pointerdown", onDown)
  el.addEventListener("pointermove", onHover)
  el.addEventListener("pointerleave", onLeave)
  window.addEventListener("pointermove", onMove)
  window.addEventListener("pointerup", onUp)
  window.addEventListener("pointercancel", onUp)
  return () => {
    cancelAnimationFrame(raf)
    ro.disconnect()
    io.disconnect()
    window.removeEventListener("scroll", onScroll)
    el.removeEventListener("wheel", onWheel)
    el.removeEventListener("pointerdown", onDown)
    el.removeEventListener("pointermove", onHover)
    el.removeEventListener("pointerleave", onLeave)
    window.removeEventListener("pointermove", onMove)
    window.removeEventListener("pointerup", onUp)
    window.removeEventListener("pointercancel", onUp)
  }
}
