import "./africa-money.css"

/* The wholesaler's money section: three transfers on one rising line, the biggest last and in lime.
   The line draws and the points appear in turn once the section is in view. */
const TEXT = {
  en: {
    kicker: "Wholesaler",
    title: "The transfer worth the most money, first.",
    lead: "Transfers are ranked by the value at stake. Metformin 500mg, 180,000 FCFA, comes first.",
    pts: [["Paracetamol 1g", "24k", "Last"], ["Amoxicillin 500mg", "72k", "Next"], ["Metformin 500mg", "180k", "First"]],
    note: "The numbers are examples.",
  },
  fr: {
    kicker: "Grossiste",
    title: "Le transfert qui vaut le plus d'argent, en premier.",
    lead: "Les transferts sont classés par valeur en jeu. Metformine 500mg, 180 000 FCFA, passe en premier.",
    pts: [["Paracétamol 1g", "24k", "Dernier"], ["Amoxicilline 500mg", "72k", "Ensuite"], ["Metformine 500mg", "180k", "Premier"]],
    note: "Les chiffres sont des exemples.",
  },
}
const XY = [
  [170, 300],
  [450, 230],
  [730, 110],
]

export function AfricaMoney({ lang }: { lang: "en" | "fr" }) {
  const t = TEXT[lang]
  return (
    <section className="afr-mon" data-rv="rise" aria-label={t.title}>
      <div className="afr-mon-in">
        <p className="eyebrow">{t.kicker}</p>
        <h2>{t.title}</h2>
        <p className="afr-mon-lead">{t.lead}</p>
        <svg className="afr-mon-graph" viewBox="0 0 900 430" role="img" aria-label={t.pts.map((p) => `${p[0]} ${p[1]}`).join(", ")}>
          <text className="ghost" x="10" y="290" aria-hidden="true">180k</text>
          <path className="line" pathLength={1} d="M170 300 C300 300,330 230,450 230 C580 230,600 110,730 110" fill="none" strokeWidth="5" strokeLinecap="round" />
          {t.pts.map(([name, value, rank], i) => {
            const [x, y] = XY[i]
            return (
              <g key={name} className={`pt${i === 2 ? " top" : ""}`} style={{ "--p": i } as React.CSSProperties}>
                <rect x={x - 100} y={y - 74} width="200" height="44" rx="22" />
                <text x={x} y={y - 47} className="nm">
                  {name} <tspan className="val">{value}</tspan>
                </text>
                <circle cx={x} cy={y} r={i === 2 ? 11 : 8} />
                <text x={x} y="410" className="ax">{rank}</text>
              </g>
            )
          })}
        </svg>
        <p className="afr-mon-note">{t.note}</p>
      </div>
    </section>
  )
}
