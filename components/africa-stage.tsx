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
    cards: { a: ["Centrale", "units unsold", "30 units", "Transfer"], b: ["Nord", "units reordering", "Metformin", "500mg"] },
    money: [["Paracetamol 1g", "24k", "Last"], ["Amoxicillin 500mg", "72k", "Next"], ["Metformin 500mg", "180k", "First"]],
    gap: { shop: "Pharmacie du Port: stock gap", stock: "Stock: 2 days", out: "No stock: 3 days", del: "Next delivery arrives on Day 5", today: "Today", end: "Day 5", act: "Action required" },
    cal: { shop: "Pharmacie Nord", usual: "Usual gap: 7 days", over: "No order: 14 more days", today: "Today", days: ["M", "T", "W", "T", "F", "S", "S"] },
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
    cards: { a: ["Centrale", "unités invendues", "30 unités", "Transfert"], b: ["Nord", "unités recommandées", "Metformine", "500mg"] },
    money: [["Paracétamol 1g", "24k", "Dernier"], ["Amoxicilline 500mg", "72k", "Ensuite"], ["Metformine 500mg", "180k", "Premier"]],
    gap: { shop: "Pharmacie du Port : écart de stock", stock: "Stock : 2 jours", out: "Rupture : 3 jours", del: "La prochaine livraison arrive le jour 5", today: "Aujourd'hui", end: "Jour 5", act: "Action requise" },
    cal: { shop: "Pharmacie Nord", usual: "Écart habituel : 7 jours", over: "Sans commande : 14 jours de plus", today: "Aujourd'hui", days: ["L", "M", "M", "J", "V", "S", "D"] },
  },
}

const DOTS = 120
function Cards({ t }: { t: (typeof TEXT)["en"]["cards"] }) {
  const card = (kind: "from" | "to", c: string[]) => (
    <div className={`afr-st-card ${kind}`}>
      <p className="nm">{c[0]}</p>
      <div className="row">
        <div>
          <p className="big" aria-hidden="true" />
          <p className="sub">{c[1]}</p>
        </div>
        <p className="side">
          {c[2]}
          <span>{c[3]}</span>
        </p>
      </div>
      <div className="dots" aria-hidden="true">
        {Array.from({ length: DOTS }, (_, i) => {
          const up = DOTS - 1 - i
          const cls = kind === "from" ? (up >= 34 ? "off" : up < 4 ? "keep" : "go") : up < 30 ? "come" : "off"
          return <i key={i} className={cls} style={{ "--k": up } as React.CSSProperties} />
        })}
      </div>
    </div>
  )
  return (
    <div className="afr-st-cards">
      {card("from", t.a)}
      {card("to", t.b)}
    </div>
  )
}

function Money({ pts }: { pts: string[][] }) {
  const XY = [[120, 310], [330, 240], [540, 120]]
  return (
    <svg className="afr-st-money" viewBox="0 0 660 430" aria-hidden="true">
      <text className="ghost" x="0" y="290">180k</text>
      <path className="line" pathLength={1} d="M120 310 C210 310,235 240,330 240 C430 240,445 120,540 120" fill="none" strokeWidth="5" strokeLinecap="round" />
      {pts.map(([name, value, rank], i) => {
        const [x, y] = XY[i]
        return (
          <g key={name} className={`pt${i === 2 ? " top" : ""}`} style={{ "--p": i } as React.CSSProperties}>
            <rect x={x - 96} y={y - 70} width="192" height="42" rx="21" />
            <text x={x} y={y - 44} className="nm">{name} <tspan className="val">{value}</tspan></text>
            <circle cx={x} cy={y} r={i === 2 ? 11 : 8} />
            <text x={x} y="408" className="ax">{rank}</text>
          </g>
        )
      })}
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
      <p className="shop">{t.shop}</p>
      <div className="head">{t.days.map((d, i) => <span key={i}>{d}</span>)}</div>
      <div className="grid">
        {cells.map((c, i) => (
          <i key={i} className={c} style={{ "--k": i } as React.CSSProperties} />
        ))}
      </div>
      <p className="legend">
        <span className="usual">{t.usual}</span>
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
        <div className="afr-st-panel" key={`p${i}`}>
          {seen && i === 0 && <Cards t={t.cards} />}
          {seen && i === 1 && <Money pts={t.money} />}
          {seen && i === 2 && <Gap t={t.gap} />}
          {seen && i === 3 && <Calendar t={t.cal} />}
        </div>
      </div>
    </section>
  )
}
