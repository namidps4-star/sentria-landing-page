"use client"

import { useEffect, useRef, useState } from "react"
import { T } from "./t"

type Step = { n: string; h: string; p: string }

/**
 * The four implementation steps as overlapping circles (charcoal, lime, off-white, deep lime).
 * One step is active at a time: it rises to the front and its column lights up. The steps advance
 * on their own while the section is on screen; hover, focus or a click picks one. Reduced motion:
 * no autoplay, no entrance.
 */
export function FlowCircles({ steps }: { steps: readonly Step[] }) {
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
      { threshold: 0.3 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!vis || hold || still) return
    const t = window.setInterval(() => setStep((s) => (s + 1) % steps.length), 3800)
    return () => window.clearInterval(t)
  }, [vis, hold, still, steps.length])

  const pick = (i: number, e?: React.PointerEvent) => {
    if (e && e.pointerType !== "mouse") return
    setStep(i)
    setHold(true)
  }

  return (
    <div ref={root} className={`fc${seen ? " in" : ""}`} data-step={step + 1} onPointerLeave={() => setHold(false)}>
      <div className="fc-row" role="group" aria-label="Implementation steps">
        {steps.map((s, i) => (
          <button
            key={s.n}
            type="button"
            className={`fc-c fc-c${i + 1}`}
            data-on={step === i ? "1" : undefined}
            aria-pressed={step === i}
            aria-label={`${s.n} ${s.h}`}
            onPointerEnter={(e) => pick(i, e)}
            onClick={() => {
              setStep(i)
              setHold(true)
            }}
            onFocus={() => setStep(i)}
          >
            <b>{s.n}</b>
          </button>
        ))}
      </div>
      <ol className="fc-cols">
        {steps.map((s, i) => (
          <li key={s.n} data-on={step === i ? "1" : undefined} onPointerEnter={(e) => pick(i, e)}>
            <h3>
              <T s={s.h} />
            </h3>
            <p>
              <T s={s.p} />
            </p>
          </li>
        ))}
      </ol>
    </div>
  )
}
