"use client"

import { useEffect, useRef } from "react"
import { C } from "@/content/en"
import { T } from "./t"
import { Check, Eyebrow, iv } from "./ui"

const CALENDLY_SRC = "https://assets.calendly.com/assets/external/widget.js"

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
          <ul className="points">
            {s.points.map((p, i) => (
              <li key={p} data-rv="left" style={iv(i + 2)}>
                <span className="tick" aria-hidden="true">
                  <Check />
                </span>
                <T s={p} />
              </li>
            ))}
          </ul>
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
