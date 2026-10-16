"use client"

import { useSyncExternalStore } from "react"
import { C } from "@/content/en"
import { T } from "./t"
import { Eyebrow, iv } from "./ui"

export const FIT_KEYS = ["industry", "healthcare", "agriculture", "transportation", "logistics", "energy", "retail"] as const
export type FitKey = (typeof FIT_KEYS)[number]
// The cards keep the order they had on the previous page.
const CARD_KEYS: FitKey[] = ["industry", "healthcare", "logistics", "agriculture", "transportation", "energy", "retail"]

let current: FitKey = "industry"
const listeners = new Set<() => void>()
const subscribe = (cb: () => void) => {
  listeners.add(cb)
  return () => {
    listeners.delete(cb)
  }
}
const get = () => current
const getServer = (): FitKey => "industry"

function setFit(k: FitKey) {
  current = k
  listeners.forEach((f) => f())
}

function useFit() {
  return useSyncExternalStore(subscribe, get, getServer)
}

/** The strip under the hero: pick a sector and jump to its card. */
export function QuickFit() {
  const active = useFit()
  const q = C.quickfit
  return (
    <div className="quickfit">
      <div className="wrap quickfit-in">
        <span className="quickfit-label">
          <T s={q.label} />
        </span>
        <div className="pills" role="group" aria-label={q.label}>
          {q.tabs.map((t, i) => (
            <button
              key={t}
              type="button"
              className="pill"
              aria-pressed={active === FIT_KEYS[i]}
              onClick={() => {
                setFit(FIT_KEYS[i])
                const el = document.querySelector(`[data-fit-card="${FIT_KEYS[i]}"]`)
                const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
                el?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "center" })
              }}
            >
              <T s={t} />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export function FitSection() {
  const active = useFit()
  const s = C.fit
  return (
    <section id="fit" className="sc sc-sand fit">
      <div className="wrap">
        <Eyebrow>
          <T s={s.eyebrow} />
        </Eyebrow>
        <h2 className="h2" data-rv="rise">
          <T s={s.title} />
        </h2>
        <div className="tabs" role="group" aria-label={s.title} data-rv="rise" style={iv(1)}>
          {s.tabs.map((t, i) => (
            <button key={t} type="button" className="tab" aria-pressed={active === FIT_KEYS[i]} onClick={() => setFit(FIT_KEYS[i])}>
              <T s={t} />
            </button>
          ))}
        </div>
        <div className="fit-grid">
          {s.cards.map((c, i) => {
            const key = CARD_KEYS[i]
            return (
              <article
                key={c.n}
                className="fit-card"
                data-fit-card={key}
                data-active={active === key ? "1" : undefined}
                data-tilt=""
                data-rv="rise"
                style={iv(i)}
              >
                <span className="num">{c.n}</span>
                <h3>
                  <T s={c.h} />
                </h3>
                <p>
                  <T s={c.p} />
                </p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
