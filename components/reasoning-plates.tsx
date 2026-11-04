"use client"

import { useEffect, useRef, useState } from "react"
import { T } from "./t"

type Item = { n: string; h: string; p: string }

/**
 * The three reasons as tall plates (lime, grey, off-white). One is open at a time: it widens and
 * shows its text. They advance on their own while on screen; hover, focus or a click picks one.
 * Reduced motion: no autoplay, no entrance.
 */
export function ReasoningPlates({ items }: { items: readonly Item[] }) {
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
    const t = window.setInterval(() => setStep((s) => (s + 1) % items.length), 4200)
    return () => window.clearInterval(t)
  }, [vis, hold, still, items.length])

  return (
    <div ref={root} className={`rp${seen ? " in" : ""}`} onPointerLeave={() => setHold(false)}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return
        const t = (e.target as HTMLElement).closest<HTMLElement>(".rp-p")
        if (!t) return
        const r = t.getBoundingClientRect()
        t.style.setProperty("--mx", `${e.clientX - r.left}px`)
        t.style.setProperty("--my", `${e.clientY - r.top}px`)
      }}>
      {items.map((it, i) => (
        <button
          key={it.n}
          type="button"
          className={`rp-p rp-p${i + 1}`}
          data-on={step === i ? "1" : undefined}
          aria-pressed={step === i}
          onPointerEnter={(e) => {
            if (e.pointerType !== "mouse") return
            setStep(i)
            setHold(true)
          }}
          onClick={() => {
            setStep(i)
            setHold(true)
          }}
          onFocus={() => setStep(i)}
        >
          <i className="rp-bg" aria-hidden="true" />
          {i < items.length - 1 ? <i className="rp-bump" aria-hidden="true" /> : null}
          <b>{it.n}</b>
          <span className="rp-tag" aria-hidden="true">
            <T s={it.h} />
          </span>
          <span className="rp-in">
            <h3>
              <T s={it.h} />
            </h3>
            <p>
              <T s={it.p} />
            </p>
          </span>
        </button>
      ))}
    </div>
  )
}
