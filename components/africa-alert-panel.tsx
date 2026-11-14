"use client"

import { useEffect, useRef, useState } from "react"
import type { KeyboardEvent, TouchEvent, WheelEvent } from "react"
import { ALERT_PREVIEW } from "@/content/africa-activities"
import "./africa-alert-panel.css"

const LABEL = {
  en: { title: "Example alerts", count: (n: number) => `${n} example alerts`, next: "Next alert", list: "Example alerts list" },
  fr: { title: "Alertes exemples", count: (n: number) => `${n} alertes exemples`, next: "Alerte suivante", list: "Liste des alertes exemples" },
} as const

const ROW = 104
const GAP = 12
const STEP = ROW + GAP
const HOLD_MS = 8000
const AUTO_MS = 4800

export function AfricaAlertPanel({ lang, auto = true, alerts: custom }: { lang: "en" | "fr"; auto?: boolean; alerts?: { level: "critical" | "warning"; text: string }[] }) {
  const l = LABEL[lang]
  const alerts = custom ?? ALERT_PREVIEW[lang]
  const n = alerts.length
  const [active, setActive] = useState(0)
  const [hover, setHover] = useState(false)
  const [focus, setFocus] = useState(false)
  const [hold, setHold] = useState(false)
  const holdTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const wheelAcc = useRef(0)
  const lastStep = useRef(0)
  const touchY = useRef<number | null>(null)

  const paused = hover || focus || hold

  // Keep the list still for a while after the reader touches it, then let it turn again.
  const holdFor = () => {
    setHold(true)
    if (holdTimer.current) clearTimeout(holdTimer.current)
    holdTimer.current = setTimeout(() => setHold(false), HOLD_MS)
  }
  useEffect(() => () => {
    if (holdTimer.current) clearTimeout(holdTimer.current)
  }, [])

  // Turn the list on its own every few seconds, unless the reader is on it or has asked for less motion.
  useEffect(() => {
    if (!auto || paused || n < 2) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const t = setInterval(() => setActive((i) => (i + 1) % n), AUTO_MS)
    return () => clearInterval(t)
  }, [auto, paused, n])

  const go = (d: number) => {
    setActive((i) => (i + d + n) % n)
    holdFor()
  }

  const onWheel = (e: WheelEvent<HTMLDivElement>) => {
    wheelAcc.current += e.deltaY
    const now = Date.now()
    if (Math.abs(wheelAcc.current) >= 50 && now - lastStep.current > 380) {
      go(wheelAcc.current > 0 ? 1 : -1)
      wheelAcc.current = 0
      lastStep.current = now
    }
  }

  const onTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    touchY.current = e.touches[0].clientY
  }
  const onTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (touchY.current === null) return
    const y = e.touches[0].clientY
    const dy = touchY.current - y
    if (Math.abs(dy) >= 36) {
      go(dy > 0 ? 1 : -1)
      touchY.current = y
    }
  }

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowDown") { e.preventDefault(); go(1) }
    if (e.key === "ArrowUp") { e.preventDefault(); go(-1) }
  }

  return (
    <aside className="afr-panel alp" aria-label={l.title}>
      <div className="alp-top">
        <span className="alp-pill">{l.title}</span>
        <span className="alp-count">{l.count(n)}</span>
        <button type="button" className="alp-next" aria-label={l.next} onClick={() => go(1)}>
          ↗
        </button>
      </div>
      <div
        className="alp-stage"
        style={{ height: n * ROW + (n - 1) * GAP }}
        role="group"
        aria-label={l.list}
        tabIndex={0}
        onWheel={onWheel}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onKeyDown={onKeyDown}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      >
        <ol className="alp-stack">
          {alerts.map((a, i) => {
            // The row being read sits on top; the others stack under it in order.
            const pos = (i - active + n) % n
            const on = pos === 0
            const [name, ...rest] = a.text.split(":")
            const detail = rest.join(":").trim()
            return (
              <li
                key={i}
                className={`alp-item alp-${a.level}${on ? " alp-on" : ""}`}
                aria-current={on ? "true" : undefined}
                style={{ transform: `translateY(${pos * STEP}px)`, zIndex: n - pos }}
              >
                <span className="alp-orb" aria-hidden="true">
                  <span className="alp-ball">
                    <b>!</b>
                  </span>
                </span>
                <span className="alp-text">
                  <b>{name.trim()}</b>
                  <span className="alp-detail">{detail}</span>
                </span>
                <span className="alp-chev" aria-hidden="true" />
              </li>
            )
          })}
        </ol>
      </div>
    </aside>
  )
}
