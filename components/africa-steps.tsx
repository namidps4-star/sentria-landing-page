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
    const root = ref.current
    if (!root) return
    const tiles = Array.from(root.querySelectorAll<HTMLElement>(".as-item"))
    const strings = Array.from(root.querySelectorAll<HTMLElement>(".as-string"))
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce) {
      tiles.forEach((t) => t.style.setProperty("--p", "1"))
      strings.forEach((s) => s.style.setProperty("--p", "1"))
      return
    }
    // Scroll-linked. Each tile's slot rises up the screen as the reader scrolls down: the tile follows it up
    // and takes its colour. Tile 2 gets there before tile 3, so they pull up one by one. Scrolling back up reverses it.
    let frame = 0
    const update = () => {
      frame = 0
      const vh = window.innerHeight
      tiles.forEach((tile, i) => {
        if (i === 0) return // step 1 is lit from the start
        const slot = tile.parentElement?.getBoundingClientRect()
        if (!slot) return
        const p = Math.min(1, Math.max(0, (vh * 0.92 - slot.top) / (vh * 0.5)))
        tile.style.setProperty("--p", p.toFixed(3))
        // The string above the tile draws down first.
        strings[i - 1]?.style.setProperty("--p", Math.min(1, p * 2).toFixed(3))
      })
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
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
              <div className="as-wrap">
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
            </div>
          )
        })}
      </div>
    </div>
  )
}
