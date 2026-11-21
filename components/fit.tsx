"use client"

import { useCallback, useEffect, useRef, useSyncExternalStore, useState } from "react"
import { C } from "@/content/en"
import { T } from "./t"
import type { HubSector } from "@/content/africa-sector-catalog"
import { AfricaHubBrowse } from "./africa-hub-browse"
import { iv } from "./ui"
import { useLang } from "./lang"
import { FR } from "@/content/fr"

export const FIT_KEYS = ["industry", "healthcare", "agriculture", "transportation", "logistics", "energy", "retail"] as const
export type FitKey = (typeof FIT_KEYS)[number]

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
  const lang = useLang()
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
            aria-label={lang === "fr" ? FR[q.label] ?? q.label : q.label}
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
                  const el = document.getElementById("fit")
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

/* The quick picks map onto the hub's sectors; the hub shows the same seven as the Africa page. */
const HUB_OF: Record<FitKey, HubSector> = {
  industry: "industry",
  healthcare: "health",
  agriculture: "agriculture",
  transportation: "transportation",
  logistics: "logistics",
  energy: "energy",
  retail: "distribution",
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
        <div data-rv="rise" style={iv(2)}>
          <AfricaHubBrowse lang={lang} global header={false} from={HUB_OF[active]} />
        </div>
      </div>
    </section>
  )
}
