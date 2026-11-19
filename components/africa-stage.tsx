"use client"

import { useEffect, useRef, useState } from "react"
import "./africa-stage.css"

/* The wholesaler's opening stage. One big number changes through 30, 180k, 2 and 21, and the panel beside it
   draws what each number means. The scene restarts each time it is shown (its key changes). The stage plays
   once it is in view, moves on every 8 seconds, stops while the pointer or focus is on it, and does not
   advance by itself under reduced motion. The tabs always work. */

type Lang = "en" | "fr"

const TEXT = {
  en: {
    kicker: "Wholesaler",
    title: "Four numbers SentrIA finds in your network.",
    note: "The numbers are examples.",
    scenes: [
      { n: "30", tab: "30 units", unit: "units to transfer", text: "Pharmacie Centrale holds 34 units of Metformin 500mg unsold. Clinique du Nord is reordering 30. SentrIA proposes the transfer." },
      { n: "180", k: "k", tab: "180k FCFA", unit: "FCFA at stake", text: "Transfers are ranked by the value at stake. Metformin 500mg comes first." },
      { n: "2", tab: "2 days", unit: "days until a stock-out", text: "Pharmacie du Port has 2 days of paracetamol 1g left. Your next delivery is in 5 days." },
      { n: "21", tab: "21 days", unit: "days without an order", text: "Pharmacie Nord usually orders every 7 days. It has not ordered in 21 days. Call this week." },
    ],
    cards: { a: ["Centrale", "Unsold", "30 units", "Transfer", "units"], b: ["Nord", "Reordering", "Metformin", "500mg", "units"] },
    money: [["Amoxicillin 500mg", "72k", "Mid value"], ["Paracetamol 1g", "24k", "Lowest value"], ["Metformin 500mg", "180k", "Highest value"]],
    gap: { shop: "Pharmacie du Port: stock gap", stock: "Stock: 2 days", out: "No stock: 3 days", del: "Next delivery arrives on Day 5", today: "Today", end: "Day 5", act: "Action required" },
    cal: { shop: "Pharmacie Nord", usual: "Usual gap: 7 days", over: "No order: 14 more days", today: "Today", alert: "Alert", normal: "Usual week", days: ["M", "T", "W", "T", "F", "S", "S"] },
  },
  fr: {
    kicker: "Grossiste",
    title: "Quatre chiffres que SentrIA trouve dans votre réseau.",
    note: "Les chiffres sont des exemples.",
    scenes: [
      { n: "30", tab: "30 unités", unit: "unités à transférer", text: "La Pharmacie Centrale garde 34 unités de Metformine 500mg invendues. La Clinique du Nord en recommande 30. SentrIA propose le transfert." },
      { n: "180", k: "k", tab: "180k FCFA", unit: "FCFA en jeu", text: "Les transferts sont classés par valeur en jeu. Metformine 500mg passe en premier." },
      { n: "2", tab: "2 jours", unit: "jours avant une rupture", text: "La Pharmacie du Port a encore 2 jours de paracétamol 1g. Votre prochaine livraison est dans 5 jours." },
      { n: "21", tab: "21 jours", unit: "jours sans commande", text: "La Pharmacie Nord commande d'habitude tous les 7 jours. Elle n'a rien commandé depuis 21 jours. Appelez cette semaine." },
    ],
    cards: { a: ["Centrale", "Invendues", "30 unités", "Transfert", "unités"], b: ["Nord", "Recommandées", "Metformine", "500mg", "unités"] },
    money: [["Amoxicilline 500mg", "72k", "Valeur moyenne"], ["Paracétamol 1g", "24k", "Valeur la plus basse"], ["Metformine 500mg", "180k", "Valeur la plus haute"]],
    gap: { shop: "Pharmacie du Port : écart de stock", stock: "Stock : 2 jours", out: "Rupture : 3 jours", del: "La prochaine livraison arrive le jour 5", today: "Aujourd'hui", end: "Jour 5", act: "Action requise" },
    cal: { shop: "Pharmacie Nord", usual: "Écart habituel : 7 jours", over: "Sans commande : 14 jours de plus", today: "Aujourd'hui", alert: "Alerte", normal: "Semaine habituelle", days: ["L", "M", "M", "J", "V", "S", "D"] },
  },
}

const PHARMA = (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <rect x="3" y="4" width="18" height="16" rx="3" />
    <path d="M12 8v8M8 12h8" />
  </svg>
)
const CLINIC = (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M3 21h18M5 21V7l7-4 7 4v14" />
    <rect x="9" y="13" width="6" height="8" />
  </svg>
)

/* Two tall cards, a dense field of dots that fills from the bottom. The shelf is the same size on both cards:
   Centrale drops from 64% to 8% (34 units to 4) and Nord rises from 0% to 57% (0 to 30). */
function Cards({ t }: { t: (typeof TEXT)["en"]["cards"] }) {
  const card = (kind: "from" | "to", c: string[]) => {
    const ico = (
      <span className="ico">
        {kind === "from" ? PHARMA : CLINIC}
        <em>{c[0]}</em>
      </span>
    )
    const circle = <span className="circle">{kind === "from" ? 1 : 2}</span>
    return (
      <div className={`afr-st-card ${kind}`}>
        <div className="top">
          {kind === "from" ? circle : ico}
          {kind === "from" ? ico : circle}
        </div>
        <div className="row">
          <div>
            <p className="big" aria-hidden="true" data-unit={c[4]} />
            <p className="sub">{c[1]}</p>
          </div>
          <p className="side">
            {c[2]}
            <span>{c[3]}</span>
          </p>
        </div>
        <div className="field" aria-hidden="true">
          <div className="dim" />
          <div className="lit" />
          <p className="tag" />
        </div>
      </div>
    )
  }
  return (
    <div className="afr-st-cards">
      {card("from", t.a)}
      {card("to", t.b)}
    </div>
  )
}

/* A flat start, a rise, a peak. Pills on top, names underneath, the line draws left to right. */
function Money({ pts }: { pts: string[][] }) {
  const X = [120, 330, 540]
  return (
    <svg className="afr-st-money" viewBox="0 0 660 430" aria-hidden="true">
      <defs>
        <linearGradient id="afr-st-line" gradientUnits="userSpaceOnUse" x1="70" y1="0" x2="540" y2="0">
          <stop offset="0" stopColor="#7d8070" />
          <stop offset=".62" stopColor="#c9cbb8" />
          <stop offset="1" stopColor="#d6ff3f" />
        </linearGradient>
      </defs>
      <path className="line" pathLength={1} d="M70 230 H125 C215 230,250 332,330 332 C430 332,450 136,540 124" fill="none" stroke="url(#afr-st-line)" strokeWidth="7" strokeLinecap="round" />
      <g className="node">
        <circle className="ring" cx="540" cy="124" r="14" />
        <circle className="core" cx="540" cy="124" r="14" />
      </g>
      {pts.map(([name, value, kind], i) => (
        <g key={name} className={`pt${i === 2 ? " top" : ""}`} style={{ "--p": i } as React.CSSProperties}>
          <rect x={X[i] - 56} y="40" width="112" height="40" rx="20" />
          <text x={X[i]} y="66" className="v">{value}</text>
          {i < 2 && <circle className="dotn" cx={X[i]} cy={i === 0 ? 230 : 332} r="8" />}
          <text x={X[i]} y="376" className="kd">{kind}</text>
          <text x={X[i]} y="402" className="ax">{name}</text>
        </g>
      ))}
    </svg>
  )
}

function Gap({ t }: { t: (typeof TEXT)["en"]["gap"] }) {
  return (
    <div className="afr-st-gap">
      <p className="shop">{t.shop}</p>
      <div className="ends">
        <span>{t.today}</span>
        <span>{t.end}</span>
      </div>
      <div className="bar">
        <i className="dot" />
        <span className="stock">{t.stock}</span>
        <span className="out">{t.out}</span>
        <i className="dot" />
      </div>
      <p className="cap">{t.del}</p>
      <p className="act">{t.act}</p>
    </div>
  )
}

function Calendar({ t }: { t: (typeof TEXT)["en"]["cal"] }) {
  const cells = Array.from({ length: 28 }, (_, i) => (i < 7 ? "usual" : i < 21 ? "over" : i === 21 ? "today" : "empty"))
  return (
    <div className="afr-st-cal">
      <div className="top">
        <div>
          <p className="shop">{t.shop}</p>
          <p className="gap">{t.usual}</p>
        </div>
        <p className="alert">{t.alert}</p>
      </div>
      <div className="head">{t.days.map((d, i) => <span key={i}>{d}</span>)}</div>
      <div className="grid">
        {cells.map((c, i) => (
          <i key={i} className={c} style={{ "--k": i } as React.CSSProperties} />
        ))}
      </div>
      <p className="legend">
        <span className="usual">{t.normal}</span>
        <span className="over">{t.over}</span>
        <span className="today">{t.today}</span>
      </p>
    </div>
  )
}

export function AfricaStage({ lang }: { lang: Lang }) {
  const t = TEXT[lang]
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
    if (!seen || hold || calm) return
    const id = window.setTimeout(() => setI((n) => (n + 1) % 4), 8000)
    return () => window.clearTimeout(id)
  }, [seen, hold, calm, i])

  const s = t.scenes[i]
  return (
    <section
      ref={root}
      className="afr-st"
      aria-label={t.title}
      onMouseEnter={() => setHold(true)}
      onMouseLeave={() => setHold(false)}
      onFocus={() => setHold(true)}
      onBlur={() => setHold(false)}
    >
      <div className="afr-st-in">
        <div className="afr-st-copy">
          <p className="eyebrow">{t.kicker}</p>
          <h2>{t.title}</h2>
          <div className="afr-st-now" key={`n${i}`} aria-live="polite">
            <p className="num" style={{ "--c": s.n } as React.CSSProperties} aria-label={`${s.n}${s.k ?? ""}`}>
              <span aria-hidden="true" className="c" data-k={s.k ?? ""} />
            </p>
            <p className="unit">{s.unit}</p>
            <p className="text">{s.text}</p>
          </div>
          <div className="afr-st-tabs" role="tablist">
            {t.scenes.map((sc, k) => (
              <button key={sc.tab} role="tab" aria-selected={k === i} className={k === i ? "on" : ""} onClick={() => setI(k)}>
                {sc.tab}
                <i className={k === i && seen && !calm ? "run" : ""} style={{ animationPlayState: hold ? "paused" : "running" }} key={`${k}-${i}`} />
              </button>
            ))}
          </div>
          <p className="afr-st-note">{t.note}</p>
        </div>
        <div className="afr-st-panel" key={`p${i}`} data-scene={i}>
          {seen && i === 0 && <Cards t={t.cards} />}
          {seen && i === 1 && <Money pts={t.money} />}
          {seen && i === 2 && <Gap t={t.gap} />}
          {seen && i === 3 && <Calendar t={t.cal} />}
        </div>
      </div>
    </section>
  )
}
