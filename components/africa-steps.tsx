"use client"

import { useEffect, useRef } from "react"
import "./africa-steps.css"

type Step = { title: string; text: string }

function FileGraphic() {
  return (
    <div className="as-file">
      <i className="a" />
      <i />
      <i />
      <i />
    </div>
  )
}

function BarsGraphic() {
  return (
    <div className="as-bars">
      <span className="hi"><i style={{ "--w": "90%" } as React.CSSProperties} /></span>
      <span><i style={{ "--w": "60%" } as React.CSSProperties} /></span>
      <span><i style={{ "--w": "35%" } as React.CSSProperties} /></span>
    </div>
  )
}

function ActGraphic() {
  return (
    <div className="as-act">
      <span className="ln" />
      <span className="fill" />
      <span className="end" />
    </div>
  )
}

const GRAPHICS = [FileGraphic, BarsGraphic, ActGraphic]

export function AfricaSteps({ heading, steps, kicker }: { heading: string; steps: Step[]; kicker?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce) {
      el.classList.add("is-on")
      return
    }
    // The pull plays when the reader scrolls down and at least 35% of the block is on screen.
    // Once the block sits fully below the screen (the reader scrolled back up), the steps go grey again.
    let lastY = window.scrollY
    let down = false
    let frame = 0
    const check = () => {
      frame = 0
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight
      const shown = Math.min(r.bottom, vh) - Math.max(r.top, 0)
      if (down && shown >= 0.35 * r.height) el.classList.add("is-on")
      if (r.top > vh) el.classList.remove("is-on")
    }
    const onScroll = () => {
      const y = window.scrollY
      down = y > lastY
      lastY = y
      if (!frame) frame = requestAnimationFrame(check)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div className="afr-steps-block" ref={ref}>
      {kicker && <p className="eyebrow">{kicker}</p>}
      <h3>{heading}</h3>
      <div className="as-list">
        {steps.map((st, i) => {
          const Graphic = GRAPHICS[i] ?? FileGraphic
          return (
            <div key={st.title}>
              {i > 0 && (
                <div className={`as-string s${i + 1}`} aria-hidden="true">
                  <span /><span /><span /><span /><span />
                </div>
              )}
              <div className={`as-item as-${i + 1}${i === 1 ? " flip" : ""}`}>
                <span className="as-num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <div className="as-txt">
                  <h4>{st.title}</h4>
                  <p>{st.text}</p>
                </div>
                <svg className="as-arr" viewBox="0 0 40 40" aria-hidden="true">
                  <path d="M10 30 L30 10 M16 10 H30 V24" />
                </svg>
                <div className="as-gfx" aria-hidden="true">
                  <Graphic />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
