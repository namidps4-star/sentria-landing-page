"use client"

import { useEffect, useRef, useState } from "react"
import "./africa-decision-hero.css"

export type DecisionHeroData = {
  product: string
  boxes: number
  perDay: number
  promised: number
  real: number
  confidence: number
}

const LABELS = {
  product: "Product",
  evidence: "Evidence",
  confidence: "Confidence",
  impact: "Impact",
  outcome: "Outcome",
  daysInStock: "Days in stock",
  unit: "days of stock vs {real} days real delivery",
}

function useCountUp(target: number, run: boolean, ms = 900) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!run) return
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) {
      setValue(target)
      return
    }
    const t0 = performance.now()
    let frame = 0
    const tick = (now: number) => {
      const t = Math.min(1, (now - t0) / ms)
      setValue(Math.round(target * (1 - Math.pow(1 - t, 3))))
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [target, run, ms])
  return value
}

export const PHARMACIE_DECISION: DecisionHeroData = { product: "Amoxicillin 500 mg", boxes: 32, perDay: 8, promised: 7, real: 11, confidence: 87 }

export function AfricaDecisionHero({ data }: { data: DecisionHeroData }) {
  const root = useRef<HTMLDivElement>(null)
  const [seen, setSeen] = useState(false)

  useEffect(() => {
    const el = root.current
    if (!el) return
    if (!("IntersectionObserver" in window)) {
      setSeen(true)
      return
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true)
          io.disconnect()
        }
      },
      { threshold: 0.2 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const days = Math.floor(data.boxes / data.perDay)
  const shown = useCountUp(days, seen)
  const shareStock = days / data.real

  return (
    <div className="adh" ref={root} data-seen={seen ? "1" : undefined}>
      <div className="adh-head">
        <p className="adh-ref">{LABELS.product}: {data.product}</p>
        <p className="adh-ix">
          {days} / {data.promised} / {data.real}
        </p>
      </div>

      <div className="adh-grid">
        <ol className="adh-rows">
          <li style={{ ["--i" as string]: 0 }}>
            <span className="adh-no">01.</span>
            <span>
              <b>{LABELS.evidence}</b>
              <small>
                {data.boxes} boxes on shelf. Sales {data.perDay} a day.
              </small>
            </span>
          </li>
          <li style={{ ["--i" as string]: 1 }}>
            <span className="adh-no">02.</span>
            <span>
              <b>{LABELS.confidence}</b>
              <small>{data.confidence}%, from 24 months of sales.</small>
            </span>
          </li>
          <li style={{ ["--i" as string]: 2 }}>
            <span className="adh-no">03.</span>
            <span>
              <b>{LABELS.impact}</b>
              <small>
                Promised {data.promised} days. Real average {data.real}.
              </small>
            </span>
          </li>
          <li style={{ ["--i" as string]: 3 }}>
            <span className="adh-no">04.</span>
            <span>
              <b>{LABELS.outcome}</b>
              <small>Order now. Decision logged.</small>
            </span>
          </li>
        </ol>

        <div className="adh-stock">
          <p className="adh-label">{LABELS.daysInStock}</p>
          <div className="adh-bar" aria-hidden="true">
            <i className="adh-fill" style={{ ["--s" as string]: shareStock }} />
            <i className="adh-tick" style={{ left: `${shareStock * 100}%` }} />
            <i className="adh-tick adh-tick--end" />
          </div>
          <p className="adh-num" aria-label={`${days} ${LABELS.daysInStock}`}>
            {shown}
          </p>
          <p className="adh-unit">{LABELS.unit.replace("{real}", String(data.real))}</p>
        </div>
      </div>
    </div>
  )
}
