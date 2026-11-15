import "./africa-faq-grid.css"

/* Pharmacy FAQ as a lime 2x2 grid: each answer has a drawing, the question, and the live answer.
   Connections: the SentrIA mark in a full circle, with ERP, API, IoT and CSV around it.
   Routine: a dial. A sweep turns once every 3 s and the ticks light as it passes; "routine",
   "alert list" and "first patient" appear in that order. The four drawings reveal one after another. */

type Item = { q: string; a: string }
type Lang = "en" | "fr"

const LABELS: Record<
  Lang,
  { sep: [string, string, string]; day: [string, string, string]; planned: string; today: string; hub: { erp: string; api: string; iot: string; csv: string } }
> = {
  en: {
    sep: ["separate", "yours", "separate"],
    day: ["routine", "alert list", "first patient"],
    planned: "planned",
    today: "works today",
    hub: { erp: "ERP", api: "API", iot: "IoT", csv: "CSV" },
  },
  fr: {
    sep: ["séparés", "le vôtre", "séparés"],
    day: ["routine", "liste d'alertes", "premier patient"],
    planned: "prévu",
    today: "fonctionne aujourd'hui",
    hub: { erp: "ERP", api: "API", iot: "IoT", csv: "CSV" },
  },
}

const ACC = "#0b0c08"
const SYNE = { fontFamily: "var(--f-display), sans-serif", fontWeight: 700 } as React.CSSProperties
const BODY = { fontFamily: "var(--f-body), sans-serif" } as React.CSSProperties

/* Connections: five discs in a cross, a smooth outline around them, the mark in the middle. */
const R = 61
const OUT = 73.5
const C = {
  hub: [350, 460],
  top: [349, 295],
  left: [187, 460],
  right: [513, 460],
  bottom: [349, 625],
} as const

function Connections({ lang }: { lang: Lang }) {
  const t = LABELS[lang]
  const [hx, hy] = C.hub
  const names = [C.top, C.left, C.right, C.bottom]
  const block = (c: readonly number[], name: string, sub: string, ink: string) => (
    <>
      <text x={c[0]} y={c[1] + 6} textAnchor="middle" fontSize="30" fill={ink} style={SYNE}>
        {name}
      </text>
      <text x={c[0]} y={c[1] + 32} textAnchor="middle" fontSize="19" fill={ink} opacity=".6" style={BODY}>
        {sub}
      </text>
    </>
  )
  return (
    <svg viewBox="105 215 490 490" aria-hidden="true" style={{ height: 260 }}>
      <defs>
        <filter id="faq-union" x="-30%" y="-30%" width="160%" height="160%" colorInterpolationFilters="sRGB">
          <feGaussianBlur in="SourceAlpha" stdDeviation="20" result="b" />
          <feColorMatrix in="b" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 34 -12" result="g0" />
          <feGaussianBlur in="g0" stdDeviation="10" result="b2" />
          <feColorMatrix in="b2" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 34 -15" result="g" />
          <feMorphology in="g" operator="erode" radius="1.6" result="e" />
          <feComposite in="g" in2="e" operator="out" result="ring" />
          <feFlood floodColor="#444444" result="c" />
          <feComposite in="c" in2="ring" operator="in" />
        </filter>
      </defs>
      <g filter="url(#faq-union)">
        {[C.hub, ...names].map((c, i) => (
          <circle key={i} cx={c[0]} cy={c[1]} r={OUT} fill="#fff" />
        ))}
      </g>
      {[C.top, C.left, C.bottom, C.right].map((c, i) => (
        <circle key={i} cx={c[0]} cy={c[1]} r={R} fill="#212121" />
      ))}
      <circle cx={hx} cy={hy} r={R} fill="#232323" />
      <circle cx={hx} cy={hy} r={37} fill="#313131" stroke="#2c2c2c" strokeWidth="1.2" />
      <circle cx={hx} cy={hy} r={31} fill="#141414" stroke="#3a3a3a" strokeWidth="1" />
      <g transform={`translate(${hx - 25} ${hy - 25}) scale(0.5)`} strokeWidth="10" strokeLinejoin="round">
        <path d="M14 42.5a23 23 0 0 1 46 0z" fill="#d6ff3f" stroke="#d6ff3f" />
        <path d="M40 57.5a23 23 0 0 0 46 0z" fill="#f5f3ea" stroke="#f5f3ea" />
        <rect x="9" y="40" width="10" height="17.5" rx="5" fill="#d6ff3f" stroke="none" />
        <rect x="81" y="42.5" width="10" height="17.5" rx="5" fill="#f5f3ea" stroke="none" />
      </g>
      <path d="M422 460.5 L440 460.5" stroke="#f5f3ea" strokeWidth="2" fill="none" />
      <path d="M433 455 L440 460.5 L433 466" stroke="#f5f3ea" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {block(C.top, t.hub.erp, t.planned, "#f5f3ea")}
      {block(C.left, t.hub.api, t.planned, "#f5f3ea")}
      {block(C.bottom, t.hub.iot, t.planned, "#f5f3ea")}
      <circle cx={C.right[0]} cy={C.right[1] - 22} r="5" fill="#d6ff3f" />
      <text x={C.right[0]} y={C.right[1] + 6} textAnchor="middle" fontSize="30" fill="#d6ff3f" style={SYNE}>
        {t.hub.csv}
      </text>
      <text x={C.right[0]} y={C.right[1] + 32} textAnchor="middle" fontSize="19" fill="#f5f3ea" opacity=".6" style={BODY}>
        {t.today}
      </text>
    </svg>
  )
}

/* Routine: a dial that turns once every 3 s. Ticks light as the sweep passes; the words follow it. */
const DIAL = { N: 72, CX: 150, CY: 90, RIN: 40, ROUT: 62, LR: 76, DUR: 3 }
const DIAL_HI = new Set([18, 36, 54, 4, 27, 63])

function Routine({ lang }: { lang: Lang }) {
  const t = LABELS[lang]
  const { N, CX, CY, RIN, ROUT, LR, DUR } = DIAL
  const ticks: React.ReactElement[] = []
  for (let i = 0; i < N; i++) {
    const f = Math.max(i / N, 0.001)
    const hi = DIAL_HI.has(i)
    const a = (i / N) * Math.PI * 2 - Math.PI / 2
    const r0 = hi ? 28 : RIN
    const base = hi ? 0.5 : 0.3
    const kt = `0;${f.toFixed(4)};${Math.min(f + 0.12, 1).toFixed(4)};1`
    ticks.push(
      <line
        key={i}
        x1={(CX + Math.cos(a) * r0).toFixed(2)}
        y1={(CY + Math.sin(a) * r0).toFixed(2)}
        x2={(CX + Math.cos(a) * ROUT).toFixed(2)}
        y2={(CY + Math.sin(a) * ROUT).toFixed(2)}
        stroke={ACC}
        strokeWidth={hi ? 4 : 1.4}
        strokeLinecap="round"
        opacity={base}
      >
        <animate attributeName="opacity" values={`${base};1;${base};${base}`} keyTimes={kt} dur={`${DUR}s`} repeatCount="indefinite" />
      </line>,
    )
  }
  const words: { word: string; i: number; anchor: "start" | "middle" | "end" }[] = [
    { word: t.day[0], i: 18, anchor: "start" },
    { word: t.day[1], i: 36, anchor: "middle" },
    { word: t.day[2], i: 54, anchor: "end" },
  ]
  return (
    <svg viewBox="0 0 300 180" aria-hidden="true" style={{ height: 200 }}>
      {ticks}
      <g>
        <line x1={CX} y1={CY} x2={CX} y2={CY - ROUT - 4} stroke={ACC} strokeWidth="1.6" strokeLinecap="round" />
        <animateTransform attributeName="transform" type="rotate" from={`0 ${CX} ${CY}`} to={`360 ${CX} ${CY}`} dur={`${DUR}s`} repeatCount="indefinite" />
      </g>
      <circle cx={CX} cy={CY} r="3" fill={ACC} />
      {words.map((w) => {
        const f = w.i / N
        const a = (w.i / N) * Math.PI * 2 - Math.PI / 2
        const x = CX + Math.cos(a) * LR
        const y = CY + Math.sin(a) * LR + 4
        const kt = `0;${Math.max(f, 0.001).toFixed(4)};0.9;1`
        return (
          <text key={w.word} x={x} y={y} textAnchor={w.anchor} fontSize="12.5" fill={ACC} opacity="0" style={BODY}>
            {w.word}
            <animate attributeName="opacity" values="0;1;1;0" keyTimes={kt} dur={`${DUR}s`} repeatCount="indefinite" />
          </text>
        )
      })}
    </svg>
  )
}

function Drawing({ index, lang }: { index: number; lang: Lang }) {
  const t = LABELS[lang]
  if (index === 0)
    return (
      <svg viewBox="0 0 160 120" aria-hidden="true" style={{ height: 200 }}>
        <rect x="4" y="4" width="152" height="112" rx="6" fill="none" stroke="currentColor" strokeWidth="2" />
        <rect x="16" y="16" width="22" height="12" fill="currentColor" />
        <rect x="44" y="16" width="22" height="12" fill="currentColor" />
        <rect x="72" y="16" width="22" height="12" fill="currentColor" />
        <rect x="100" y="16" width="22" height="12" fill="currentColor" />
        <rect x="128" y="16" width="16" height="12" fill="currentColor" />
        <line x1="16" y1="46" x2="144" y2="46" stroke="currentColor" strokeWidth="2" opacity=".3" />
        <rect x="16" y="54" width="128" height="14" fill={ACC} />
        <line x1="16" y1="78" x2="144" y2="78" stroke="currentColor" strokeWidth="2" opacity=".3" />
        <line x1="16" y1="94" x2="144" y2="94" stroke="currentColor" strokeWidth="2" opacity=".3" />
      </svg>
    )
  if (index === 1) return <Connections lang={lang} />
  if (index === 2)
    return (
      <svg viewBox="0 0 160 120" aria-hidden="true" style={{ height: 200 }}>
        <rect x="8" y="18" width="44" height="44" rx="8" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <rect x="58" y="18" width="44" height="44" rx="8" fill={ACC} />
        <rect x="108" y="18" width="44" height="44" rx="8" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <text fontSize="11" x="30" y="88" textAnchor="middle">{t.sep[0]}</text>
        <text fontSize="11" x="80" y="88" textAnchor="middle">{t.sep[1]}</text>
        <text fontSize="11" x="130" y="88" textAnchor="middle">{t.sep[2]}</text>
      </svg>
    )
  return <Routine lang={lang} />
}

export function AfricaFaqGrid({ id, kicker, heading, items, lang }: { id: string; kicker?: string; heading: string; items: Item[]; lang: Lang }) {
  return (
    <section className="afr-fg" aria-labelledby={id}>
      {kicker && <p className="eyebrow">{kicker}</p>}
      <h2 id={id}>{heading}</h2>
      <div className="afr-fg-grid">
        {items.map((it, i) => (
          <div key={it.q} className="afr-fg-cell" data-rv="rise" style={{ "--i": i * 5 } as React.CSSProperties}>
            <div className="afr-fg-art">
              <Drawing index={i} lang={lang} />
            </div>
            <h3>{it.q}</h3>
            <p>{it.a}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
