"use client"

import { useEffect, useRef, useState } from "react"
import type { Capabilities } from "@/content/africa-activities"
import "./africa-stage.css"
import "./africa-scenes.css"

/* The numbers of an activity page. The big number changes through the figures of the activity's own rows, and
   the picture beside it draws what each number means. The picture comes from the row's drawing:
   pair = units move from one place to another, bars = a gap between what you have and what comes next,
   compare = three values on a line, timeline = a gauge toward a limit, or a calendar when the days run past
   the usual gap. The scene restarts each time it is shown. It plays once in view, moves on every 8 seconds,
   stops while the pointer or focus is on it, and does not advance on its own under reduced motion. */

type Lang = "en" | "fr"
type Item = Capabilities["items"][number]

const T = {
  en: {
    count: ["", "", "Two", "Three", "Four", "Five", "Six"],
    title: (n: string) => `${n} numbers SentrIA finds for you.`,
    example: "Example",
    note: "The numbers are examples.",
    action: "Action required",
    alert: "Alert",
    today: "Today",
    days: ["M", "T", "W", "T", "F", "S", "S"],
    from: "Before",
    to: "After",
  },
  fr: {
    count: ["", "", "Deux", "Trois", "Quatre", "Cinq", "Six"],
    title: (n: string) => `${n} chiffres que SentrIA trouve pour vous.`,
    example: "Exemple",
    note: "Les chiffres sont des exemples.",
    action: "Action requise",
    alert: "Alerte",
    today: "Aujourd'hui",
    days: ["L", "M", "M", "J", "V", "S", "D"],
    from: "Avant",
    to: "Après",
  },
}

const first = (s: string) => s.split(/(?<=\.)\s/)[0]
const find = (s: string) => s.match(/-?\d+(?:[.,]\d+)?/g)
const num = (s: string) => {
  const m = find(s)
  return m ? parseFloat(m[0].replace(",", ".")) : NaN
}
const lastNum = (s: string) => {
  const m = find(s)
  return m ? parseFloat(m[m.length - 1].replace(",", ".")) : NaN
}
const split = (s: string): [string, string] => {
  const i = s.search(/\s*[:·]\s*/)
  if (i < 0) return ["", s]
  return [s.slice(0, i).trim(), s.slice(i).replace(/^\s*[:·]\s*/, "").trim()]
}
const smooth = (pts: number[][]) => {
  let d = `M${pts[0][0]} ${pts[0][1]}`
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[i + 2] ?? p2
    d += `C${Math.round(p1[0] + (p2[0] - p1[0] + (p1[0] - p0[0])) / 6 * 1)} ${Math.round(p1[1] + (p2[1] - p0[1]) / 6)},${Math.round(p2[0] - (p3[0] - p1[0]) / 6)} ${Math.round(p2[1] - (p3[1] - p1[1]) / 6)},${p2[0]} ${p2[1]}`
  }
  return d
}

/* Two quantities side by side: two cards of dots, one dot field per quantity, filling from the bottom while the
   figures count up. The taller field is the larger quantity. */
function Pair({ item, n }: { item: Item; n: number }) {
  const [a = "", b = ""] = item.drawing.labels
  const va = Number.isFinite(num(a)) ? num(a) : n
  const vb = Number.isFinite(num(b)) ? num(b) : n
  const cap = Math.max(va, vb, 1) / 0.85
  const card = (kind: "from" | "to", label: string, v: number, k: number) => {
    const [head, rest] = split(label)
    return (
      <div className={`afr-sc-card ${kind}`} style={{ "--f1": Math.round((v / cap) * 100), "--u1": Math.round(v) } as React.CSSProperties}>
        <div className="top">
          <span className="circle">{k}</span>
          <span className="ico">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M3 21h18M5 21V7l7-4 7 4v14" />
              <rect x="9" y="13" width="6" height="8" />
            </svg>
            <em>{head || label}</em>
          </span>
        </div>
        <div className="row">
          <div>
            <p className="big" aria-hidden="true" />
            <p className="sub">{head && !/^[\d\s.,]+$/.test(rest) ? rest : ""}</p>
          </div>
        </div>
        <div className="field" aria-hidden="true">
          <div className="dim" />
          <div className="lit" />
        </div>
      </div>
    )
  }
  return (
    <div className="afr-sc-cards" role="img" aria-label={`${a}. ${b}.`}>
      {card("from", a, va, 1)}
      {card("to", b, vb, 2)}
    </div>
  )
}

/* A gap: what you have, then what comes next, on one bar. */
function Bars({ item, t }: { item: Item; t: (typeof T)["en"] }) {
  const [a = "", b = ""] = item.drawing.labels
  const [head, rest] = split(a)
  const na = num(rest || a)
  const nb = num(b)
  const r = Number.isFinite(na) && Number.isFinite(nb) && na > 0 && nb > 0 ? Math.min(0.75, Math.max(0.25, na / (na + nb))) : 0.4
  return (
    <div className="afr-st-gap">
      {head && <p className="shop">{head}</p>}
      <div className="bar">
        <i className="dot" />
        <span className="stock" style={{ flex: r * 10 }}>{head ? rest : a}</span>
        <span className="out" style={{ flex: (1 - r) * 10 }}>{b}</span>
        <i className="dot" />
      </div>
      <p className="cap">{item.example}</p>
      <p className="act">{t.action}</p>
    </div>
  )
}

/* Three values on a line. The line starts flat and finds each value; the highest is lit. */
function Compare({ item }: { item: Item }) {
  const X = [120, 330, 540]
  const parts = item.drawing.labels.slice(0, 3).map((l) => {
    const m = find(l)
    const v = m ? m[0] : ""
    const name = (m ? l.replace(m[0], "") : l).replace(/\s+/g, " ").trim() || l
    return { name, value: v, n: m ? parseFloat(v.replace(",", ".")) : NaN }
  })
  if (parts.every((p) => Number.isFinite(p.n))) parts.sort((x, y) => x.n - y.n)
  const vals = parts.map((p) => p.n)
  const ok = vals.every(Number.isFinite)
  const lo = Math.min(...vals)
  const hi = Math.max(...vals)
  const y = parts.map((p, i) => (ok && hi > lo ? Math.round(332 - ((p.n - lo) / (hi - lo)) * 208) : [250, 332, 124][i]))
  const top = 2
  const path = `M70 ${y[0]} H${X[0] + 5} ${smooth(parts.map((_, i) => [X[i], y[i]])).replace(/^M\d+ \d+/, "")}`
  return (
    <svg className="afr-st-money" viewBox="0 0 660 430" aria-hidden="true">
      <defs>
        <linearGradient id="afr-st-line" gradientUnits="userSpaceOnUse" x1="70" y1="0" x2="540" y2="0">
          <stop offset="0" stopColor="#7d8070" />
          <stop offset=".62" stopColor="#c9cbb8" />
          <stop offset="1" stopColor="#d6ff3f" />
        </linearGradient>
      </defs>
      <path className="line" pathLength={1} d={path} fill="none" stroke="url(#afr-st-line)" strokeWidth="7" strokeLinecap="round" />
      {parts.map((p, i) => (
        <g key={i} className={`pt${i === top ? " top" : ""}`} style={{ "--p": i } as React.CSSProperties}>
          <rect x={X[i] - 56} y="40" width="112" height="40" rx="20" />
          <text x={X[i]} y="66" className="v">{p.value || p.name}</text>
          <circle className={i === top ? "core" : "dotn"} cx={X[i]} cy={y[i]} r={i === top ? 12 : 8} />
          <text x={X[i]} y="392" className="ax">{p.value ? p.name : ""}</text>
        </g>
      ))}
    </svg>
  )
}

/* A gauge toward a limit, or a calendar when the days run past the usual gap. */
function Timeline({ item, t }: { item: Item; t: (typeof T)["en"] }) {
  const [a = "", b = "", c = ""] = item.drawing.labels
  const A = num(a)
  const C = lastNum(c)
  const days = /\d+\s*(d|j|day|jour)/i.test(item.figure)
  if (days && Number.isFinite(A) && Number.isFinite(C) && A > C && C > 0 && A <= 400) {
    const lime = Math.min(Math.round(C), 21)
    const done = Math.min(Math.round(A), 27)
    const cells = Array.from({ length: 28 }, (_, i) => (i < lime ? "usual" : i < done ? "over" : i === done ? "today" : "empty"))
    return (
      <div className="afr-st-cal">
        <div className="top">
          <div>
            <p className="shop">{a}</p>
            <p className="gap">{c}</p>
          </div>
          <p className="alert">{t.alert}</p>
        </div>
        <div className="head">{t.days.map((d, i) => <span key={i}>{d}</span>)}</div>
        <div className="grid">
          {cells.map((k, i) => (
            <i key={i} className={k} style={{ "--k": i } as React.CSSProperties} />
          ))}
        </div>
        <p className="legend">
          <span className="usual">{c}</span>
          <span className="over">{a}</span>
          <span className="today">{t.today}</span>
        </p>
      </div>
    )
  }
  const ratio = Number.isFinite(A) && Number.isFinite(C) && C > 0 ? A / C : 0.6
  const fill = Math.min(ratio, 1) * 80
  const over = ratio > 1 ? Math.min((ratio - 1) * 80, 20) : 0
  return (
    <div className="afr-sc-gauge">
      <p className="read">{a}</p>
      <div className="track">
        <i className="fill" style={{ width: `${fill}%` }} />
        {over > 0 && <i className="over" style={{ left: "80%", width: `${over}%` }} />}
        <i className="limit" />
      </div>
      <div className="ends">
        <span>{b}</span>
        <span className="lim">{c}</span>
      </div>
      <p className="cap">{item.example}</p>
      <p className="act">{t.action}</p>
    </div>
  )
}

function Viz({ item, t }: { item: Item; t: (typeof T)["en"] }) {
  const k = item.drawing.kind
  const n = /^\d+$/.test(item.figure) ? parseInt(item.figure, 10) : NaN
  if (k === "pair" && n >= 2 && n <= 60) return <Pair item={item} n={n} />
  if (k === "compare" && item.drawing.labels.length >= 3) return <Compare item={item} />
  if (k === "timeline" && item.drawing.labels.length >= 3) return <Timeline item={item} t={t} />
  return <Bars item={item} t={t} />
}

export function AfricaScenes({ kicker, items, lang }: { kicker?: string; items: Item[]; lang: Lang }) {
  const t = T[lang]
  const list = items.filter((it) => it.drawing && it.figure)
  const count = list.length
  const [i, setI] = useState(0)
  const [seen, setSeen] = useState(false)
  const [hold, setHold] = useState(false)
  const [calm, setCalm] = useState(false)
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    setCalm(window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    const el = root.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setSeen(true), io.disconnect()), { threshold: 0.35 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!seen || hold || calm || count < 2) return
    const id = window.setTimeout(() => setI((n) => (n + 1) % count), 8000)
    return () => window.clearTimeout(id)
  }, [seen, hold, calm, i, count])

  if (!count) return null
  const it = list[i]
  const m = it.figure.match(/^([+\-−]?)(\d+)(?:[.,]\d+)?(.*)$/)
  const title = t.title(t.count[count] || String(count))
  return (
    <section
      ref={root}
      className="afr-st afr-sc"
      aria-label={title}
      onMouseEnter={() => setHold(true)}
      onMouseLeave={() => setHold(false)}
      onFocus={() => setHold(true)}
      onBlur={() => setHold(false)}
    >
      <div className="afr-st-in">
        <div className="afr-st-copy">
          {kicker && <p className="eyebrow">{kicker}</p>}
          <h2>{title}</h2>
          <div className="afr-st-now" key={`n${i}`} aria-live="polite">
            <p className="num" style={m ? ({ "--c": m[2] } as React.CSSProperties) : undefined} aria-label={it.figure}>
              {m ? <span aria-hidden="true" className="c" data-k={m[3]} data-p={m[1]} /> : <span>{it.figure}</span>}
            </p>
            <p className="unit">{it.title}</p>
            <p className="text">{first(it.does)}</p>
            <p className="afr-sc-ex">
              <b>{t.example}</b> {it.example}
            </p>
          </div>
          <div className="afr-st-tabs" role="tablist">
            {list.map((x, k) => (
              <button key={x.title} role="tab" aria-selected={k === i} className={k === i ? "on" : ""} onClick={() => setI(k)}>
                {x.figure}
                <i className={k === i && seen && !calm ? "run" : ""} style={{ animationPlayState: hold ? "paused" : "running" }} key={`${k}-${i}`} />
              </button>
            ))}
          </div>
          <p className="afr-st-note">{t.note}</p>
        </div>
        <div className="afr-st-panel" key={`p${i}`} data-scene={`k-${it.drawing.kind}`}>
          {seen && <Viz item={it} t={t} />}
        </div>
      </div>
    </section>
  )
}
