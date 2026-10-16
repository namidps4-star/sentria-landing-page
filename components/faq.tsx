"use client"

import { useState } from "react"
import { C } from "@/content/en"
import { T } from "./t"
import { Eyebrow, iv } from "./ui"

export function Faq() {
  const s = C.faq
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section id="faq" className="sc sc-cream faq">
      <div className="wrap faq-grid">
        <div>
          <Eyebrow>
            <T s={s.eyebrow} />
          </Eyebrow>
          <h2 className="h2" data-rv="rise">
            <T s={s.title} />
          </h2>
        </div>
        <div className="faq-list">
          {s.items.map((it, i) => {
            const isOpen = open === i
            return (
              <div key={it.q} className="faq-item" data-open={isOpen ? "1" : undefined} data-rv="rise" style={iv(i)}>
                <h3>
                  <button type="button" aria-expanded={isOpen} aria-controls={`faq-a-${i}`} id={`faq-q-${i}`} onClick={() => setOpen(isOpen ? null : i)}>
                    <span>
                      <T s={it.q} />
                    </span>
                    <i className="plus" aria-hidden="true" />
                  </button>
                </h3>
                <div id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`} className="faq-a">
                  <div>
                    <p>
                      <T s={it.a} />
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
