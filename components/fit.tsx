"use client"

import Image from "next/image"
import { useSyncExternalStore } from "react"
import industry from "@/assets/sectors/industry.webp"
import health from "@/assets/sectors/health-2.webp"
import agriculture from "@/assets/sectors/agriculture.webp"
import transportation from "@/assets/sectors/transportation.webp"
import logistics from "@/assets/sectors/logistics.webp"
import energy from "@/assets/sectors/energy.jpg"
import retail from "@/assets/sectors/retail.webp"
import { C } from "@/content/en"
import { T } from "./t"
import { TAGLINES } from "@/content/taglines"
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

const PHOTOS = { industry, healthcare: health, agriculture, transportation, logistics, energy, retail }

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
        <div className="rv-fit" data-rv="rise" style={iv(1)}>
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
          <div className="rv-fit-photo">
            {FIT_KEYS.map((k) => (
              <Image
                key={k}
                src={PHOTOS[k]}
                alt=""
                fill
                sizes="(min-width: 1024px) 600px, 92vw"
                data-on={active === k ? "1" : undefined}
                className="rv-fit-img"
              />
            ))}
            <div className="rv-fit-shade" aria-hidden="true" />
            <p className="rv-fit-chip">
              <B en={TAGLINES[active].en} fr={TAGLINES[active].fr} />
            </p>
            <a className="rv-fit-cta" href="#demo">
              <T s={C.hero.cta1} />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
