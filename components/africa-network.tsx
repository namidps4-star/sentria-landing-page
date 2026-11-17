import "./africa-network.css"

/* The wholesaler's opening section: the pharmacy network as nodes. A lime line joins the pharmacy with unsold
   stock to the one reordering it, a dot runs along it, and the 30 counts up once the section is in view. */
const TEXT = {
  en: {
    kicker: "Wholesaler",
    title: "One pharmacy reorders what another can't sell.",
    sub: "units to transfer. SentrIA names both pharmacies and the product.",
    from: ["Pharmacie Centrale", "34 unsold"],
    to: ["Clinique du Nord", "reordering 30"],
    tiles: [["180k", "FCFA at stake"], ["2 days", "until a stock-out"], ["21 days", "without an order"]],
    note: "The numbers are examples.",
  },
  fr: {
    kicker: "Grossiste",
    title: "Une pharmacie recommande ce qu'une autre n'écoule pas.",
    sub: "unités à transférer. SentrIA nomme les deux pharmacies et le produit.",
    from: ["Pharmacie Centrale", "34 invendues"],
    to: ["Clinique du Nord", "recommande 30"],
    tiles: [["180k", "FCFA en jeu"], ["2 jours", "avant une rupture"], ["21 jours", "sans commande"]],
    note: "Les chiffres sont des exemples.",
  },
}

const LINE = "M233 451 C290 370,350 320,417 299"

export function AfricaNetwork({ lang }: { lang: "en" | "fr" }) {
  const t = TEXT[lang]
  return (
    <section className="afr-net" data-rv="rise" aria-label={t.title}>
      <div className="afr-net-copy">
        <p className="eyebrow">{t.kicker}</p>
        <h2>{t.title}</h2>
        <p className="afr-net-30" aria-hidden="true" />
        <p className="afr-net-sub">
          <span className="sr-only">30 </span>
          {t.sub}
        </p>
        <ul className="afr-net-tiles">
          {t.tiles.map(([n, l]) => (
            <li key={l}>
              <b>{n}</b>
              {l}
            </li>
          ))}
        </ul>
        <p className="afr-net-note">{t.note}</p>
      </div>
      <svg className="afr-net-map" viewBox="0 0 700 720" role="img" aria-label={`${t.from[0]}, ${t.from[1]}. ${t.to[0]}, ${t.to[1]}.`}>
        <g className="links" stroke="currentColor" strokeWidth="2">
          <line x1="500" y1="205" x2="590" y2="105" />
          <line x1="560" y1="300" x2="625" y2="372" />
          <line x1="190" y1="615" x2="318" y2="650" />
        </g>
        <path className="flow" pathLength={1} d={LINE} fill="none" strokeWidth="4" strokeLinecap="round" />
        <circle className="runner" r="9" style={{ offsetPath: `path("${LINE}")` }} />
        <g className="n">
          <circle cx="590" cy="60" r="46" />
          <text x="590" y="64">Est</text>
          <circle cx="640" cy="425" r="58" />
          <text x="640" y="429">Sud</text>
          <circle cx="360" cy="650" r="52" />
          <text x="360" y="654">Port</text>
        </g>
        <g className="n from">
          <circle cx="150" cy="520" r="108" />
          <text x="150" y="512">{t.from[0]}</text>
          <text x="150" y="536" className="v">{t.from[1]}</text>
        </g>
        <g className="n to">
          <circle cx="500" cy="230" r="108" />
          <text x="500" y="222">{t.to[0]}</text>
          <text x="500" y="246" className="v">{t.to[1]}</text>
        </g>
      </svg>
    </section>
  )
}
