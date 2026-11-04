"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import { T } from "./t"

type Step = { n: string; h: string; p: string }

/**
 * The four implementation steps as a cluster of circles inside one soft blob. One step is active
 * at a time (black, with a ring that fills as the autoplay runs); the heading and its sentence sit
 * on the left. It advances on its own while on screen; hover, focus or a click picks a step.
 * Reduced motion: no autoplay, no entrance, the ring stays full.
 */
export function FlowCluster({ steps, head }: { steps: readonly Step[]; head: ReactNode }) {
  const root = useRef<HTMLDivElement>(null)
  const [step, setStep] = useState(0)
  const [seen, setSeen] = useState(false)
  const [vis, setVis] = useState(false)
  const [hold, setHold] = useState(false)
  const [still, setStill] = useState(false)

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
      { threshold: 0.35 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!vis || hold || still) return
    const t = window.setInterval(() => setStep((s) => (s + 1) % steps.length), 4200)
    return () => window.clearInterval(t)
  }, [vis, hold, still, steps.length])

  const pick = (i: number) => {
    setStep(i)
    setHold(true)
  }
  const cur = steps[step]

  return (
    <div
      ref={root}
      className={`fl${seen ? " in" : ""}${hold || still ? " hold" : ""}`}
      data-step={step + 1}
      onPointerLeave={() => setHold(false)}
    >
      <svg width="0" height="0" className="fl-defs" aria-hidden="true" focusable="false">
        <filter id="fl-goo" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="13" />
          <feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 30 -13" />
        </filter>
      </svg>
      <div className="fl-left">
        {head}
        <div className="fl-pan" key={step} aria-live="polite">
          <span className="fl-no">
            {cur.n} <i>/ 0{steps.length}</i>
          </span>
          <h3>
            <T s={cur.h} />
          </h3>
          <p>
            <T s={cur.p} />
          </p>
        </div>
        <ol className="fl-tabs">
          {steps.map((s, i) => (
            <li key={s.n}>
              <button type="button" data-on={step === i ? "1" : undefined} onClick={() => pick(i)} onPointerEnter={(e) => e.pointerType === "mouse" && pick(i)}>
                <b>{s.n}</b>
                <span>
                  <T s={s.h} />
                </span>
              </button>
            </li>
          ))}
        </ol>
      </div>
      <div className="fl-cl" role="group" aria-label="Implementation steps">
        <div className="fl-blob" aria-hidden="true">
          {steps.map((s, i) => (
            <i key={s.n} className={`fl-b fl-b${i + 1}`} />
          ))}
        </div>
        {steps.map((s, i) => (
          <button
            key={s.n}
            type="button"
            className={`fl-c fl-c${i + 1}`}
            style={{ "--i": i } as React.CSSProperties}
            data-on={step === i ? "1" : undefined}
            aria-pressed={step === i}
            aria-label={`${s.n} ${s.h}`}
            onPointerEnter={(e) => e.pointerType === "mouse" && pick(i)}
            onClick={() => pick(i)}
            onFocus={() => setStep(i)}
          >
            <svg className="fl-ring" viewBox="0 0 100 100" aria-hidden="true">
              <circle cx="50" cy="50" r="48.5" pathLength="1" />
            </svg>
            <span className="fl-dt">
              <em />
              {s.n}
            </span>
            <h4>
              <T s={s.h} />
            </h4>
          </button>
        ))}
      </div>
    </div>
  )
}
