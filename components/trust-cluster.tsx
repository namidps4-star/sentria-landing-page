"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import { T } from "./t"

type Item = { n: string; h: string }
const ICONS = [
  // architecture: stacked layers
  <path key="a" d="M16 5 4 11l12 6 12-6-12-6ZM4 16l12 6 12-6M4 21l12 6 12-6" />,
  // access and data controls: padlock
  <g key="b">
    <rect x="6" y="14" width="20" height="14" rx="3" />
    <path d="M10 14V10a6 6 0 0 1 12 0v4M16 20v3" />
  </g>,
  // progressive integration: two linked rings
  <g key="c">
    <circle cx="11" cy="16" r="6" />
    <circle cx="21" cy="16" r="6" />
  </g>,
  // deployment: box with an arrow
  <g key="d">
    <path d="M5 12v13a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V12M3 7h26v5H3zM16 15v8M12.5 18.5 16 15l3.5 3.5" />
  </g>,
]


/**
 * The four trust lines as a cluster of circles inside one soft blob, each line written in its
 * circle. One is active at a time (black, with a ring that fills as the autoplay runs). It advances on its own while on screen; hover, focus or a click picks a step.
 * Reduced motion: no autoplay, no entrance, the ring stays full.
 */
export function TrustCluster({ steps, head }: { steps: readonly Item[]; head: ReactNode }) {
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

  return (
    <div
      ref={root}
      className={`tc${seen ? " in" : ""}${hold || still ? " hold" : ""}`}
      data-step={step + 1}
      onPointerLeave={() => setHold(false)}
    >
      <svg width="0" height="0" className="tc-defs" aria-hidden="true" focusable="false">
        <filter id="tc-goo" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="20" />
          <feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 26 -11" />
        </filter>
      </svg>
      <div className="tc-left">
        {head}
        <p className="tc-line" key={step} aria-live="polite">
          <T s={steps[step].h} />
        </p>
      </div>
      <div className="tc-cl" role="group" aria-label="Data control">
        <div className="tc-blob" aria-hidden="true">
          <i className="tc-b tc-b0" />
          {steps.map((s, i) => (
            <i key={s.n} className={`tc-b tc-b${i + 1}`} />
          ))}
        </div>
        {steps.map((s, i) => (
          <button
            key={s.n}
            type="button"
            className={`tc-c tc-c${i + 1}`}
            style={{ "--i": i } as React.CSSProperties}
            data-on={step === i ? "1" : undefined}
            aria-pressed={step === i}
            aria-label={s.h}
            onPointerEnter={(e) => e.pointerType === "mouse" && pick(i)}
            onClick={() => pick(i)}
            onFocus={() => setStep(i)}
          >
            <svg className="tc-ring" viewBox="0 0 100 100" aria-hidden="true">
              <circle cx="50" cy="50" r="48.5" pathLength="1" />
            </svg>
            <svg className="tc-ic" viewBox="0 0 32 32" aria-hidden="true">
              {ICONS[i % ICONS.length]}
            </svg>
          </button>
        ))}
      </div>
    </div>
  )
}
