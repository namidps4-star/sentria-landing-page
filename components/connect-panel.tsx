"use client"

import { useCallback, useEffect, useState } from "react"
import type { CSSProperties, ReactNode } from "react"
import { bi, reduced, useInView, Ico, Step } from "./connect-shared"

export function Panel({
  id,
  num,
  line1,
  line2,
  lead,
  metaValue,
  steps,
  kind,
  children,
}: {
  id: string
  num: string
  line1: string
  line2: ReactNode
  lead: ReactNode
  metaValue: ReactNode
  steps: Step[]
  kind: "csv" | "erp" | "iot" | "api"
  children: ReactNode
}) {
  const { ref, seen, vis } = useInView<HTMLElement>()
  const [step, setStep] = useState(0)
  const [hold, setHold] = useState(false)

  // Parallax on the art, only while the panel is on screen.
  useEffect(() => {
    const el = ref.current
    if (!el || !vis || reduced()) return
    let raf = 0
    const tick = () => {
      raf = 0
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight
      const p = (r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2)
      const pc = Math.max(-1, Math.min(1, p))
      el.style.setProperty("--py", (pc * -16).toFixed(1))
      // The API gateway opens as the panel travels up the screen: lid first, then the base.
      const open = Math.max(0, Math.min(1, (0.55 - pc) / 0.6))
      const ease = (x: number) => x * x * (3 - 2 * x)
      el.style.setProperty("--open", open.toFixed(3))
      el.style.setProperty("--lid", ease(Math.max(0, Math.min(1, (open - 0.3) / 0.7))).toFixed(3))
      el.style.setProperty("--base", ease(Math.max(0, Math.min(1, open / 0.7))).toFixed(3))
    }
    const on = () => {
      if (!raf) raf = requestAnimationFrame(tick)
    }
    tick()
    window.addEventListener("scroll", on, { passive: true })
    window.addEventListener("resize", on)
    return () => {
      window.removeEventListener("scroll", on)
      window.removeEventListener("resize", on)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [vis, ref])

  // The three steps light up in turn while the panel is on screen.
  useEffect(() => {
    if (!vis || hold || reduced()) return
    const t = window.setInterval(() => setStep((s) => (s + 1) % steps.length), 2600)
    return () => window.clearInterval(t)
  }, [vis, hold, steps.length])

  const onMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || reduced()) return
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty("--tx", (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3))
    e.currentTarget.style.setProperty("--ty", (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3))
  }, [])
  const onLeave = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.style.setProperty("--tx", "0")
    e.currentTarget.style.setProperty("--ty", "0")
  }, [])

  return (
    <section
      ref={ref}
      className={`cs-panel cs-${kind}${seen ? " in" : ""}${vis ? " vis" : ""}`}
      data-step={step}
      aria-labelledby={`${id}-h`}
    >
      <div className="cs-copy">
        <span className="cs-vline" aria-hidden="true" />
        <span className="cs-hl a" aria-hidden="true" />
        <span className="cs-hl b" aria-hidden="true" />
        <div className="cs-numwrap" aria-hidden="true">
          <span className="cs-num">{num}</span>
        </div>
        <h3 id={`${id}-h`} className="cs-h">
          <span className="cs-ln">
            <span>{line1}</span>
          </span>
          <span className="cs-ln" style={{ ["--l" as string]: 1 } as CSSProperties}>
            <span>{line2}</span>
          </span>
        </h3>
        <p className="cs-lead">{lead}</p>
        <p className="cs-meta">
          {bi("Source", "Source")} : <b>{metaValue}</b>
        </p>
        <ul
          className="cs-steps"
          aria-label={"Flow"}
          onMouseLeave={() => setHold(false)}
          onBlur={() => setHold(false)}
        >
          <li className="cs-lab" aria-hidden="true">
            {bi("Flow", "Flux")} :
          </li>
          {steps.map((s, i) => (
            <li
              key={i}
              className="cs-step"
              data-i={i}
              style={{ ["--s" as string]: i } as CSSProperties}
              onMouseEnter={() => {
                setHold(true)
                setStep(i)
              }}
            >
              <Ico d={s.icon} />
              {s.label}
            </li>
          ))}
        </ul>
      </div>
      <div className="cs-art" onPointerMove={onMove} onPointerLeave={onLeave}>
        <div className="cs-art-in">{children}</div>
        <span className="cs-sheen" aria-hidden="true" />
      </div>
    </section>
  )
}

/* ----------------------------------------------------------- ERP screen */
