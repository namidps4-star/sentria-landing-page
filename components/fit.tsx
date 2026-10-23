"use client"

import { useSyncExternalStore } from "react"
import { C } from "@/content/en"
import { T } from "./t"
import { TAGLINES } from "@/content/taglines"
import { SECTOR_DATA } from "@/content/sectors"
import { SECTORS } from "./sectors"
import { B } from "./t"
import { iv } from "./ui"

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
    <section id="fit" className="rv-sec fit">
      <div className="wrap">
        <p className="rv-kicker" data-rv="fade">
          <T s={s.eyebrow} />
        </p>
        <h2 className="rv-h" data-rv="rise">
          <T s={s.title} />
        </h2>
        <p className="rv-lead" data-rv="rise" style={iv(1)}>
          <T s={C.sectors.lead} />
        </p>
        <div className="rv-fit" data-rv="rise" style={iv(2)}>
          <div className="rv-fit-list">
            <div role="group" aria-label={s.title}>
              {s.tabs.map((t, i) => (
                <button
                  key={t}
                  type="button"
                  className="rv-fit-item"
                  data-fit-card={FIT_KEYS[i]}
                  aria-pressed={active === FIT_KEYS[i]}
                  onClick={() => setFit(FIT_KEYS[i])}
                  onMouseEnter={() => setFit(FIT_KEYS[i])}
                >
                  <T s={t} />
                </button>
              ))}
            </div>
            <div className="rv-fit-ps">
              {CARD_KEYS.map((k, i) => (
                <p key={k} className="rv-fit-p" data-on={active === k ? "1" : undefined} aria-hidden={active === k ? undefined : true}>
                  <T s={s.cards[i].p} />
                </p>
              ))}
            </div>
          </div>

          {/* In place of a photo: the sector's own signals, set out as a board. */}
          <div className="rv-board-wrap">
            {SECTORS.map((sec) => {
              const d = sec.data ? SECTOR_DATA[sec.data] : null
              const tag = TAGLINES[sec.key]
              const on = active === sec.key
              return (
                <div key={sec.key} className="rv-board" data-on={on ? "1" : undefined} aria-hidden={on ? undefined : true}>
                  <p className="rv-b-name">
                    <T s={sec.title} />
                  </p>
                  <p className="rv-b-tag">
                    <B en={tag.en} fr={tag.fr} />
                  </p>
                  <p className="rv-b-desc">{d ? <B en={d.en.description} fr={d.fr.description} /> : <T s={s.cards[6].p} />}</p>
                  {d ? (
                    <ul className="rv-b-sig">
                      {d.en.signals.map((sg, k) => (
                        <li key={sg[0]} style={{ ["--k" as string]: k } as React.CSSProperties}>
                          <strong>
                            <B en={sg[0]} fr={d.fr.signals[k][0]} />
                          </strong>
                          <span>
                            <B en={sg[1]} fr={d.fr.signals[k][1]} />
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  <a className="rv-fit-cta" href="#demo">
                    <T s={C.hero.cta1} />
                  </a>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
