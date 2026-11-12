"use client"

import { useEffect, useRef, useState } from "react"
import { C } from "@/content/en"
import { T } from "./t"
import { Eyebrow, iv } from "./ui"

const CALENDLY_SRC = "https://assets.calendly.com/assets/external/widget.js"

/**
 * The four demo points as a full-circle dial. The four steps repeat round the ring (twelve slots), so
 * the dial only ever turns one way: after 04 it keeps going round and 01 comes back, with no rewind.
 * The active step sits at the middle, upright and large with its sentence beside it. It advances on
 * its own while on screen; hover, focus or a click picks a step by the shortest turn.
 * Reduced motion: no autoplay and no turning animation.
 */
function DemoDial({ points }: { points: readonly string[] }) {
  const root = useRef<HTMLDivElement>(null)
  const SLOTS = points.length * 3
  const SPREAD = 360 / SLOTS
  const [n, setN] = useState(0) // unbounded, so the rotation always continues the same way
  const [seen, setSeen] = useState(false)
  const [vis, setVis] = useState(false)
  const [hold, setHold] = useState(false)
  const [still, setStill] = useState(false)
  const at = ((n % points.length) + points.length) % points.length

  useEffect(() => {
    const el = root.current
    if (!el) return
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    queueMicrotask(() => setStill(rm))
    if (rm || !("IntersectionObserver" in window)) {
      queueMicrotask(() => setSeen(true))
      return
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setSeen(true)
        setVis(e.isIntersecting)
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!vis || hold || still) return
    const t = window.setInterval(() => setN((v) => v + 1), 4200)
    return () => window.clearInterval(t)
  }, [vis, hold, still])

  // a click or hover on slot k turns the dial by the shortest way round
  const pick = (k: number) => {
    setN((v) => {
      const cur = ((v % SLOTS) + SLOTS) % SLOTS
      let d = k - cur
      if (d > SLOTS / 2) d -= SLOTS
      if (d < -SLOTS / 2) d += SLOTS
      return v + d
    })
    setHold(true)
  }

  return (
    <div
      ref={root}
      className={`dd${seen ? " in" : ""}${hold || still ? " hold" : ""}`}
      onPointerLeave={() => setHold(false)}
      style={{ "--rot": `${-n * SPREAD}deg` } as React.CSSProperties}
    >
      <svg className="dd-track" viewBox="0 0 100 100" aria-hidden="true">
        <circle className="dd-base" cx="50" cy="50" r="49.5" />
        <circle className="dd-run" cx="50" cy="50" r="49.5" pathLength="1" key={n} />
      </svg>
      <div className="dd-wheel" role="group" aria-label="Demo agenda">
        {Array.from({ length: SLOTS }, (_, k) => {
          const slotNow = ((n % SLOTS) + SLOTS) % SLOTS
          let dist = Math.abs(k - slotNow)
          dist = Math.min(dist, SLOTS - dist)
          return (
            <button
              key={k}
              type="button"
              className="dd-it"
              data-on={dist === 0 ? "1" : undefined}
              style={{ "--a": `${k * SPREAD}deg`, "--dist": dist, "--vis": dist >= 3 ? 0 : 1 } as React.CSSProperties}
              aria-pressed={dist === 0}
              aria-label={`0${(k % points.length) + 1} ${points[k % points.length]}`}
              tabIndex={k < points.length ? 0 : -1}
              aria-hidden={k >= points.length ? true : undefined}
              onPointerEnter={(e) => e.pointerType === "mouse" && pick(k)}
              onClick={() => pick(k)}
              onFocus={() => pick(k)}
            >
              <i className="dd-dot" />
              <b>0{(k % points.length) + 1}</b>
            </button>
          )
        })}
      </div>
      <div className="dd-now" key={n} aria-live="polite">
        <strong>0{at + 1}</strong>
        <p>
          <T s={points[at]} />
        </p>
      </div>
    </div>
  )
}

export function Demo() {
  const s = C.demo
  const cal = useRef<HTMLDivElement>(null)

  // Calendly is heavy (its own app and iframe). It loads only when the booking box is about to
  // come into view, so it never competes with the opening or the hero.
  useEffect(() => {
    const el = cal.current
    if (!el) return
    const load = () => {
      if (document.querySelector(`script[src="${CALENDLY_SRC}"]`)) return
      const sc = document.createElement("script")
      sc.src = CALENDLY_SRC
      sc.async = true
      document.body.appendChild(sc)
    }
    if (!("IntersectionObserver" in window)) {
      load()
      return
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          load()
          io.disconnect()
        }
      },
      { rootMargin: "900px 0px" },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section id="demo" className="sc sc-sand demo">
      <div className="wrap demo-grid">
        <div>
          <Eyebrow>
            <T s={s.eyebrow} />
          </Eyebrow>
          <h2 className="h2" data-rv="rise">
            <T s={s.title} />
          </h2>
          <p className="lead" data-rv="rise" style={iv(1)}>
            <T s={s.lead} />
          </p>
          <DemoDial points={s.points} />
        </div>

        <div className="cal" data-rv="right" ref={cal}>
          <div className="cal-h">
            <b>
              <T s={s.widget} />
            </b>
            <span className="live">
              <i aria-hidden="true" />
              <T s={s.avail} />
            </span>
          </div>
          <div className="calendly-inline-widget" data-url="https://calendly.com/hello-sentria/30min" suppressHydrationWarning>
            {/* Shown only until the Calendly script replaces it with the booking widget. */}
            <a className="btn btn-ink cal-fallback" href="https://calendly.com/hello-sentria/30min" target="_blank" rel="noopener">
              <T s="Book a demo →" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
