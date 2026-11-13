"use client"

import { useEffect, useId, useRef, useState } from "react"
import type { KeyboardEvent, TouchEvent, WheelEvent } from "react"
import { ALERT_PREVIEW } from "@/content/africa-activities"
import "./africa-alert-panel.css"

const LABEL = {
  en: { title: "Live alerts", count: (n: number) => `${n} alerts active`, next: "Next alert", list: "Live alerts list" },
  fr: { title: "Alertes en direct", count: (n: number) => `${n} alertes actives`, next: "Alerte suivante", list: "Liste des alertes en direct" },
} as const

const ROW = 104
const GAP = 12
const STEP = ROW + GAP
const HOLD_MS = 8000
const AUTO_MS = 4800

/* A glossy sphere with a specular highlight and an embossed mark: drawn in SVG, not an icon font. */
function Orb({ level }: { level: "critical" | "warning" }) {
  const id = useId()
  const c =
    level === "critical"
      ? { hi: "#ffc2ae", mid: "#f0573a", lo: "#8f1f0c" }
      : { hi: "#fff0b3", mid: "#f6b530", lo: "#8a5600" }
  return (
    <svg viewBox="0 0 56 56" aria-hidden="true">
      <defs>
        <radialGradient id={`${id}-b`} cx="36%" cy="30%" r="78%">
          <stop offset="0%" stopColor={c.hi} />
          <stop offset="48%" stopColor={c.mid} />
          <stop offset="100%" stopColor={c.lo} />
        </radialGradient>
        <radialGradient id={`${id}-s`} cx="50%" cy="46%" r="52%">
          <stop offset="70%" stopColor="#000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.28" />
        </radialGradient>
        <linearGradient id={`${id}-m`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0.82" />
        </linearGradient>
        <filter id={`${id}-f`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.6" />
        </filter>
      </defs>
      <circle cx="28" cy="31" r="24" fill="#000" opacity="0.28" filter={`url(#${id}-f)`} />
      <circle cx="28" cy="28" r="24" fill={`url(#${id}-b)`} />
      <circle cx="28" cy="28" r="24" fill={`url(#${id}-s)`} />
      <ellipse cx="21" cy="17" rx="10" ry="5.5" fill="#fff" opacity="0.55" transform="rotate(-24 21 17)" />
      {level === "critical" ? (
        <g>
          <rect x="25.2" y="17.5" width="5.6" height="13" rx="2.8" fill="#000" opacity="0.25" transform="translate(0 1)" />
          <rect x="25.2" y="17.5" width="5.6" height="13" rx="2.8" fill={`url(#${id}-m)`} />
          <circle cx="28" cy="37.2" r="3.1" fill="#000" opacity="0.25" transform="translate(0 1)" />
          <circle cx="28" cy="37.2" r="3.1" fill={`url(#${id}-m)`} />
        </g>
      ) : (
        <g>
          <path d="M28 15.5 L40.5 37.5 H15.5 Z" fill="#000" opacity="0.25" transform="translate(0 1)" stroke="#000" strokeWidth="3" strokeLinejoin="round" />
          <path d="M28 15.5 L40.5 37.5 H15.5 Z" fill={`url(#${id}-m)`} stroke={`url(#${id}-m)`} strokeWidth="3" strokeLinejoin="round" />
          <rect x="26.3" y="23" width="3.4" height="8.6" rx="1.7" fill={c.lo} />
          <circle cx="28" cy="34.6" r="1.9" fill={c.lo} />
        </g>
      )}
    </svg>
  )
}

export function AfricaAlertPanel({ lang }: { lang: "en" | "fr" }) {
  const l = LABEL[lang]
  const alerts = ALERT_PREVIEW[lang]
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
    if (paused || n < 2) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const t = setInterval(() => setActive((i) => (i + 1) % n), AUTO_MS)
    return () => clearInterval(t)
  }, [paused, n])

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
        <span className="alp-pill">
          <i className="alp-dot" aria-hidden="true" />
          {l.title}
        </span>
        <span className="alp-count">{l.count(n)}</span>
        <button type="button" className="alp-next" aria-label={l.next} onClick={() => go(1)}>
          ↗
        </button>
      </div>
      <div
        className="alp-stage"
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
            // Signed distance from the active row, going the short way round the list.
            let d = (i - active + n) % n
            if (d > n / 2) d -= n
            const abs = Math.abs(d)
            const on = d === 0
            const [name, ...rest] = a.text.split(":")
            const detail = rest.join(":").trim()
            return (
              <li
                key={i}
                className={`alp-item alp-${a.level}${on ? " alp-on" : ""}`}
                aria-current={on ? "true" : undefined}
                style={{
                  transform: `translateY(${d * STEP}px) rotateX(${-d * 20}deg) scale(${1 - abs * 0.07})`,
                  opacity: abs > 1.5 ? 0 : 1 - abs * 0.4,
                  zIndex: 10 - abs,
                }}
              >
                <span className="alp-orb">
                  <Orb level={a.level} />
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
