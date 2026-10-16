"use client"

import Script from "next/script"
import { C } from "@/content/en"
import { T } from "./t"
import { Check, Eyebrow, iv } from "./ui"

export function Demo() {
  const s = C.demo
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

        <div className="cal" data-rv="right">
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
      <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="lazyOnload" />
    </section>
  )
}
