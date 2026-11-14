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
    if (reduce || !("IntersectionObserver" in window)) {
      el.classList.add("is-on")
      return
    }
    // The pull plays only when the reader scrolls down into the block. Scrolling back above it resets the steps to grey.
    let down = false
    let lastY = window.scrollY
    const onScroll = () => {
      down = window.scrollY > lastY
      lastY = window.scrollY
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.intersectionRatio >= 0.35 && down) el.classList.add("is-on")
          else if (e.intersectionRatio < 0.35 && e.boundingClientRect.top > 0) el.classList.remove("is-on")
        })
      },
      { threshold: [0, 0.35] },
    )
    io.observe(el)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      io.disconnect()
      window.removeEventListener("scroll", onScroll)
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
