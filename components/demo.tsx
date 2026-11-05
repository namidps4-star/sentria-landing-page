"use client"

import { useEffect, useRef, useState } from "react"
import { C } from "@/content/en"
import { T } from "./t"
import { Eyebrow, iv } from "./ui"

const CALENDLY_SRC = "https://assets.calendly.com/assets/external/widget.js"

const SPREAD = 34 // degrees between steps on the dial

/**
 * The four demo points as a dial: a curved track with the numerals tilted along it. The active
 * step sits at the middle, upright and large with its sentence beside it; the track turns to bring
 * the next one in. It advances on its own while on screen; hover, focus or a click picks a step.
 * Reduced motion: no autoplay and no turning animation.
 */
function DemoDial({ points }: { points: readonly string[] }) {
  const root = useRef<HTMLDivElement>(null)
  const [step, setStep] = useState(0)
  const [vis, setVis] = useState(false)
  const [hold, setHold] = useState(false)
  const [still, setStill] = useState(false)

  useEffect(() => {
    const el = root.current
    if (!el) return
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    queueMicrotask(() => setStill(rm))
    if (rm || !("IntersectionObserver" in window)) return
    const io = new IntersectionObserver(([e]) => setVis(e.isIntersecting), { threshold: 0.4 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!vis || hold || still) return
    const t = window.setInterval(() => setStep((s) => (s + 1) % points.length), 4200)
    return () => window.clearInterval(t)
  }, [vis, hold, still, points.length])

  const pick = (i: number) => {
    setStep(i)
    setHold(true)
  }

  return (
    <div ref={root} className="dd" onPointerLeave={() => setHold(false)} style={{ "--rot": `${-step * SPREAD}deg` } as React.CSSProperties}>
      <div className="dd-wheel" role="group" aria-label="Demo agenda">
        {points.map((p, i) => (
          <button
            key={p}
            type="button"
            className="dd-it"
            data-on={step === i ? "1" : undefined}
            style={{ "--a": `${i * SPREAD}deg` } as React.CSSProperties}
            aria-pressed={step === i}
            aria-label={`0${i + 1} ${p}`}
            onPointerEnter={(e) => e.pointerType === "mouse" && pick(i)}
            onClick={() => pick(i)}
            onFocus={() => setStep(i)}
          >
            <i className="dd-dot" />
            <b>0{i + 1}</b>
          </button>
        ))}
      </div>
      <div className="dd-now" key={step} aria-live="polite">
        <strong>0{step + 1}</strong>
        <p>
          <T s={points[step]} />
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
