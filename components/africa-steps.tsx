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

export function AfricaSteps({ heading, steps }: { heading: string; steps: Step[] }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce || !("IntersectionObserver" in window)) {
      el.classList.add("is-on")
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          el.classList.add("is-on")
          io.disconnect()
        }
      },
      { threshold: 0.35 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div className="afr-steps-block" ref={ref}>
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
