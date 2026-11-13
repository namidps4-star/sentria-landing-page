"use client"

import { useCallback, useEffect, useRef, useSyncExternalStore, useState } from "react"
import { C } from "@/content/en"
import { T } from "./t"
import { TAGLINES } from "@/content/taglines"
import { SECTOR_DATA } from "@/content/sectors"
import { SECTORS } from "./sectors"
import { B } from "./t"
import { iv } from "./ui"
import { useLang } from "./lang"

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

/**
 * The strip under the hero: pick a sector and jump to its card. The sectors sit in one pale track
 * and a lime thumb slides under the picked one. On a phone the track scrolls sideways.
 */
export function QuickFit() {
  const active = useFit()
  const q = C.quickfit
  const track = useRef<HTMLDivElement>(null)
  const [thumb, setThumb] = useState<{ x: number; w: number } | null>(null)
  const [seen, setSeen] = useState(false)
  const [moving, setMoving] = useState(false)

  const measure = useCallback(() => {
    const el = track.current
    if (!el) return
    const on = el.querySelector<HTMLElement>('[aria-pressed="true"]')
    if (!on) return
    setThumb({ x: on.offsetLeft, w: on.offsetWidth })
  }, [])

  useEffect(() => {
    measure()
    const el = track.current
    if (!el) return
    // keep the picked pill in view when the track scrolls (phones)
    const on = el.querySelector<HTMLElement>('[aria-pressed="true"]')
    if (on && el.scrollWidth > el.clientWidth) el.scrollTo({ left: on.offsetLeft - (el.clientWidth - on.offsetWidth) / 2, behavior: "smooth" })
    setMoving(true)
    const mv = window.setTimeout(() => setMoving(false), 1000)
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    document.fonts?.ready.then(measure)
    return () => {
      ro.disconnect()
      window.clearTimeout(mv)
    }
  }, [active, measure])

  // the track wipes in the first time it is on screen
  useEffect(() => {
    // watch the strip around the track, not the track: the track is clipped away until it is revealed
    const el = track.current?.closest<HTMLElement>(".quickfit")
    if (!el) return
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      queueMicrotask(() => setSeen(true))
      return
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true)
          io.disconnect()
        }
      },
      { threshold: 0.5 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // a faint hint follows the cursor, and a soft light moves with it
  const hover = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return
    const t = e.currentTarget
    const r = t.getBoundingClientRect()
    t.style.setProperty("--mx", `${e.clientX - r.left}px`)
    const pill = (e.target as HTMLElement).closest<HTMLElement>(".qf-pill")
    if (pill) {
      t.style.setProperty("--hx", `${pill.offsetLeft}px`)
      t.style.setProperty("--hw", `${pill.offsetWidth}px`)
      t.dataset.hint = "1"
    }
  }

  return (
    <div className="quickfit">
      <div className="wrap quickfit-in qf">
        <span className="quickfit-label">
          <T s={q.label} />
        </span>
        <div className={`qf-scroll${seen ? " in" : ""}`} ref={track}>
          <div
            className="qf-track"
            role="group"
            aria-label={q.label}
            onPointerMove={hover}
            onPointerLeave={(e) => {
              delete e.currentTarget.dataset.hint
            }}
          >
            <i className="qf-hint" aria-hidden="true" />
            <i
              className="qf-thumb"
              aria-hidden="true"
              data-ready={thumb ? "1" : undefined}
              data-move={moving ? "1" : undefined}
              style={thumb ? ({ "--tx": `${thumb.x}px`, "--tw": `${thumb.w}px` } as React.CSSProperties) : undefined}
            />
            {q.tabs.map((t, i) => (
              <button
                key={t}
                type="button"
                className="qf-pill"
                style={{ "--i": i } as React.CSSProperties}
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
    </div>
  )
}

// Every sector's own page, for anyone outside Africa.
const GENERAL_PAGE: Partial<Record<FitKey, { href: { en: string; fr: string }; label: { en: string; fr: string } }>> = {
  industry: { href: { en: "/activities/industry", fr: "/fr/activites/industrie" }, label: { en: "See the industry page →", fr: "Voir la page industrie →" } },
  healthcare: { href: { en: "/activities/pharmacy", fr: "/fr/activites/pharmacie" }, label: { en: "See the pharmacy page →", fr: "Voir la page pharmacie →" } },
  agriculture: { href: { en: "/activities/farm", fr: "/fr/activites/exploitation-agricole" }, label: { en: "See the farm page →", fr: "Voir la page exploitation agricole →" } },
  transportation: { href: { en: "/activities/transportation", fr: "/fr/activites/transport" }, label: { en: "See the transport page →", fr: "Voir la page transport →" } },
  logistics: { href: { en: "/activities/logistics", fr: "/fr/activites/logistique" }, label: { en: "See the logistics page →", fr: "Voir la page logistique →" } },
  energy: { href: { en: "/activities/energy", fr: "/fr/activites/energie" }, label: { en: "See the energy page →", fr: "Voir la page énergie →" } },
  retail: { href: { en: "/activities/retail", fr: "/fr/activites/commerce" }, label: { en: "See the retail page →", fr: "Voir la page commerce →" } },
}

export function FitSection() {
  const active = useFit()
  const lang = useLang()
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
                  <div className="rv-fit-acts">
                    <a className="rv-fit-cta" href="#demo">
                      <T s={C.hero.cta1} />
                    </a>
                    {GENERAL_PAGE[sec.key as FitKey] && (
                      <a className="rv-fit-cta rv-fit-go" href={GENERAL_PAGE[sec.key as FitKey]!.href[lang]}>
                        <B en={GENERAL_PAGE[sec.key as FitKey]!.label.en} fr={GENERAL_PAGE[sec.key as FitKey]!.label.fr} />
                      </a>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
