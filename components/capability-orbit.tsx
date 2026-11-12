"use client"

import { useCallback, useEffect, useId, useRef, useState, type ButtonHTMLAttributes, type CSSProperties } from "react"
import type { Capability } from "@/content/africa-capabilities"
import { CapabilityBubble } from "@/components/capability-bubble"
import { CapabilityScreen } from "@/components/capability-screen"
import { CapabilityTrail } from "@/components/capability-trail"

type Labels = {
  alert: string
  youImport: string
  hint: string
  hintOpen: string
  cta: string
  ctaHref: string
}

const WIDE = "(min-width: 1280px)"
const REDUCED = "(prefers-reduced-motion: reduce)"
const DEGREES_PER_SECOND = 26
const CLOSE_DELAY_MS = 700
const CY = 320
const RY = 205
const BUBBLE = 170
const CARD_HALF = 449 // half the open card: 870px inner + 28px frame
const GLIDE = "transform .8s cubic-bezier(.16,1,.3,1)"

const baseAngle = (i: number, n: number) => 40 + (i * 360) / n

/**
 * The capabilities orbit a white screen. Hover (mouse), tap or keyboard focus on a bubble stops the orbit
 * and swaps the screen to that capability. Below 1280px there is no orbit: screen on top, bubbles in a grid.
 */
export function CapabilityOrbit({ items, labels }: { items: Capability[]; labels: Labels }) {
  const n = items.length
  const [wide, setWide] = useState(false)
  const [ready, setReady] = useState(false)
  const [active, setActive] = useState<number | null>(null)
  const [shown, setShown] = useState(0)
  const panelId = useId()
  const stage = useRef<HTMLDivElement>(null)
  const bubs = useRef<(HTMLDivElement | null)[]>([])
  const trails = useRef<(HTMLDivElement | null)[]>([])
  const geo = useRef({ w: 0, rx: 0 })
  const angle = useRef(0)
  const paused = useRef(false)
  const closeTimer = useRef<number | null>(null)
  const lastPointer = useRef("")
  const wideRef = useRef(false)
  const openIndex = useRef<number | null>(null)
  const paintRef = useRef<() => void>(() => {})

  const glideTimer = useRef<number | null>(null)
  const setGlide = (on: boolean) => {
    bubs.current.forEach((b) => {
      if (b) b.style.transition = on ? GLIDE : ""
    })
  }

  const clearTimer = () => {
    if (closeTimer.current !== null) window.clearTimeout(closeTimer.current)
    closeTimer.current = null
  }
  const activate = useCallback((i: number) => {
    clearTimer()
    paused.current = true
    if (glideTimer.current !== null) window.clearTimeout(glideTimer.current)
    if (wideRef.current) setGlide(true)
    openIndex.current = i
    setShown(i)
    setActive(i)
    if (wideRef.current) paintRef.current()
  }, [])
  const close = useCallback(() => {
    clearTimer()
    paused.current = false
    openIndex.current = null
    setActive(null)
    // Keep the glide on while the bubble eases back into the orbit, then switch it off.
    if (glideTimer.current !== null) window.clearTimeout(glideTimer.current)
    glideTimer.current = window.setTimeout(() => setGlide(false), 900)
  }, [])
  const scheduleClose = useCallback(() => {
    clearTimer()
    closeTimer.current = window.setTimeout(close, CLOSE_DELAY_MS)
  }, [close])

  const paint = useCallback(() => {
    const { rx } = geo.current
    const cx = geo.current.w / 2
    for (let i = 0; i < n; i++) {
      const b = bubs.current[i]
      const t = trails.current[i]
      if (!b) continue
      const a = baseAngle(i, n) + angle.current
      const r = (a * Math.PI) / 180
      const depth = Math.sin(r)
      let x = cx + rx * Math.cos(r) - BUBBLE / 2
      const y = CY + RY * depth - BUBBLE / 2
      let sc = 0.78 + 0.22 * ((depth + 1) / 2)
      const isOpen = openIndex.current === i
      if (isOpen) {
        // The open bubble glides out beside the card so it stays visible, filled with lime.
        const side = x + BUBBLE / 2 >= cx ? 1 : -1
        const off = Math.min(CARD_HALF + BUBBLE / 2 + 28, geo.current.w / 2 - BUBBLE / 2 - 4)
        x = cx + side * off - BUBBLE / 2
        sc = 1
      }
      b.style.transform = `translate(${x.toFixed(1)}px,${y.toFixed(1)}px) scale(${sc.toFixed(3)})`
      b.style.zIndex = isOpen || (depth > 0 && openIndex.current === null) ? "8" : "1"
      if (t) t.style.transform = `rotate(${a.toFixed(2)}deg)`
    }
  }, [n])

  useEffect(() => {
    paintRef.current = paint
  }, [paint])

  const clearPaint = useCallback(() => {
    for (let i = 0; i < n; i++) {
      const b = bubs.current[i]
      if (b) {
        b.style.transform = ""
        b.style.zIndex = ""
      }
    }
  }, [n])

  // Wide or narrow. Narrow screens have no hover and no orbit, so they start with the first capability open.
  useEffect(() => {
    const mql = window.matchMedia(WIDE)
    const apply = () => {
      wideRef.current = mql.matches
      setWide(mql.matches)
      if (mql.matches) close()
      else activate(0)
    }
    apply()
    // Switch transitions on only after the first layout, so nothing animates on page load.
    const raf = requestAnimationFrame(() => requestAnimationFrame(() => setReady(true)))
    mql.addEventListener("change", apply)
    return () => {
      cancelAnimationFrame(raf)
      mql.removeEventListener("change", apply)
      clearTimer()
    }
  }, [activate, close])

  // Size the ellipse to the stage.
  useEffect(() => {
    const el = stage.current
    if (!el || !wide) return
    const measure = () => {
      const w = el.clientWidth
      const rx = Math.min(640, w / 2 - 100)
      geo.current = { w, rx }
      el.style.setProperty("--rx", `${rx}px`)
      el.style.setProperty("--sy", String(RY / rx))
      paint()
    }
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    measure()
    return () => ro.disconnect()
  }, [wide, paint])

  // The orbit: runs only on wide screens, with motion allowed, while the stage is on screen.
  useEffect(() => {
    if (!wide) {
      clearPaint()
      return
    }
    const reduced = window.matchMedia(REDUCED)
    let raf = 0
    let last = 0
    let speed = 1
    let visible = true
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      // Stop dead on hover so the bubble never slides out from under the pointer; resume smoothly.
      speed = paused.current ? 0 : speed + (1 - speed) * Math.min(1, dt * 3)
      angle.current = (angle.current + speed * DEGREES_PER_SECOND * dt) % 360
      paint()
      raf = requestAnimationFrame(tick)
    }
    const run = () => {
      cancelAnimationFrame(raf)
      paint()
      if (reduced.matches || !visible) return
      last = performance.now()
      raf = requestAnimationFrame(tick)
    }
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      run()
    })
    if (stage.current) io.observe(stage.current)
    reduced.addEventListener("change", run)
    run()
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      reduced.removeEventListener("change", run)
    }
  }, [wide, paint, clearPaint])

  const handlersFor = (i: number): ButtonHTMLAttributes<HTMLButtonElement> => ({
    onPointerDown: (e) => {
      lastPointer.current = e.pointerType
    },
    onPointerEnter: (e) => {
      if (e.pointerType === "mouse") activate(i)
    },
    onPointerLeave: (e) => {
      if (e.pointerType === "mouse") scheduleClose()
    },
    onFocus: () => {
      // A tap focuses the button and then clicks it; the click decides, so it must not run twice.
      if (lastPointer.current === "touch" || lastPointer.current === "pen") return
      activate(i)
    },
    onBlur: (e) => {
      if (wideRef.current && !stage.current?.contains(e.relatedTarget as Node | null)) scheduleClose()
    },
    onClick: () => {
      const type = lastPointer.current
      lastPointer.current = ""
      if (type === "mouse") return
      if (wideRef.current && (type === "touch" || type === "pen") && active === i) close()
      else activate(i)
    },
  })

  return (
    <div
      className="afr-orb"
      ref={stage}
      data-orbit={wide ? "1" : "0"}
      data-ready={ready ? "1" : "0"}
      onKeyDown={(e) => {
        if (e.key === "Escape" && wideRef.current) close()
      }}
    >
      <div className="afr-orb-sys" aria-hidden="true">
        <span className="afr-orb-ring" />
        {items.map((item, i) => (
          <div
            key={item.title}
            className="afr-orb-trail"
            ref={(el) => {
              trails.current[i] = el
            }}
            style={{ transform: `rotate(${baseAngle(i, n)}deg)` } as CSSProperties}
          >
            <CapabilityTrail />
          </div>
        ))}
      </div>

      <CapabilityScreen
        items={items}
        shown={shown}
        open={active !== null}
        labels={labels}
        id={panelId}
        onPointerEnter={(e) => {
          if (e.pointerType === "mouse" && active !== null) clearTimer()
        }}
        onPointerLeave={(e) => {
          if (e.pointerType === "mouse" && active !== null) scheduleClose()
        }}
      />

      <div className="afr-orb-bubs">
        {items.map((item, i) => (
          <div
            key={item.title}
            className="afr-orb-bub"
            ref={(el) => {
              bubs.current[i] = el
            }}
          >
            <CapabilityBubble
              title={item.title}
              icon={item.icon}
              active={active === i}
              panelId={panelId}
              handlers={handlersFor(i)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
