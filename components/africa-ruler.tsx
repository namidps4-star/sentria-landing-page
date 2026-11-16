import "./africa-grossiste.css"

// Shape visuals for the grossiste capability rows. Labels and figures come from the page's own examples.
const TEXT = {
  en: {
    stock: { a: "Pharmacy Centrale", aSub: "34 units unsold", b: "Clinique du Nord", bSub: "reordered 30 units", move: "Suggested transfer: 30 units" },
    value: { a: "Metformin 500mg", aSub: "180,000 FCFA", b: "Amoxicillin 500mg", bSub: "72,000 FCFA", c: "Paracetamol 1g", cSub: "24,000 FCFA" },
  },
  fr: {
    stock: { a: "Pharmacie Centrale", aSub: "34 unités invendues", b: "Clinique du Nord", bSub: "a recommandé 30 unités", move: "Transfert proposé : 30 unités" },
    value: { a: "Metformine 500mg", aSub: "180 000 FCFA", b: "Amoxicilline 500mg", bSub: "72 000 FCFA", c: "Paracétamol 1g", cSub: "24 000 FCFA" },
  },
}

// Rows 3 and 4: days of cover against the next delivery, and a pharmacy's order gap.
const MORE = {
  en: {
    unit: "days left",
    move: "Next delivery in 5 days. Two pharmacies run out before it.",
    gapLabel: "Pharmacie Nord",
    gapSub: "No order for 21 days. Usual gap: 7 days.",
    gapMove: "Call the pharmacy this week.",
  },
  fr: {
    unit: "jours restants",
    move: "Prochaine livraison dans 5 jours. Deux pharmacies tombent à zéro avant.",
    gapLabel: "Pharmacie Nord",
    gapSub: "Aucune commande depuis 21 jours. Écart habituel : 7 jours.",
    gapMove: "Appelez la pharmacie cette semaine.",
  },
}
const COVER_ROWS: [string, string, number][] = [
  ["Pharmacie du Port", "Paracetamol 1g", 2],
  ["Pharmacie Centrale", "Amoxicillin 500mg", 4],
  ["Clinique du Nord", "Metformin 500mg", 9],
]
const COVER_SCALE = 14
const DELIVERY_IN = 5
const WEEKS = 8
const ORDERED_WEEKS = 5

function CoverRuler({ lang }: { lang: "en" | "fr" }) {
  const t = MORE[lang]
  return (
    <div className="rl rl-cover" aria-hidden="true">
      {COVER_ROWS.map(([place, product, days]) => (
        <div className="rl-row" key={place}>
          <div className="rl-row-top">
            <b>{place}</b>
            <span>
              {product}, {days} {t.unit}
            </span>
          </div>
          <div className="rl-bar">
            <i style={{ width: `${(days / COVER_SCALE) * 100}%` }} data-low={days < DELIVERY_IN ? "1" : undefined} />
            <em style={{ left: `${(DELIVERY_IN / COVER_SCALE) * 100}%` }} />
          </div>
        </div>
      ))}
      <p className="rl-move">{t.move}</p>
    </div>
  )
}

function GapRuler({ lang }: { lang: "en" | "fr" }) {
  const t = MORE[lang]
  return (
    <div className="rl rl-gap" aria-hidden="true">
      <div className="rl-row-top">
        <b>{t.gapLabel}</b>
      </div>
      <div className="rl-dots">
        {Array.from({ length: WEEKS }, (_, i) => (
          <span key={i} data-on={i < ORDERED_WEEKS ? "1" : undefined} />
        ))}
      </div>
      <p className="rl-gapsub">{t.gapSub}</p>
      <p className="rl-move">{t.gapMove}</p>
    </div>
  )
}

export function CapRuler({ index, lang }: { index: number; lang: "en" | "fr" }) {
  if (index === 2) return <CoverRuler lang={lang} />
  if (index === 3) return <GapRuler lang={lang} />
  if (index === 0) {
    const t = TEXT[lang].stock
    return (
      <div className="rl rl-stock" aria-hidden="true">
        <div className="rl-track">
          <div className="rl-line" />
          <div className="rl-fill" />
          <span className="rl-tick" style={{ left: "75%" }} />
          <span className="rl-tick" style={{ left: "85%" }} />
          <span className="rl-lb r" style={{ left: "85%" }}><b>{t.a}</b><span>{t.aSub}</span></span>
          <span className="rl-lb c dn" style={{ left: "75%" }}><b>{t.b}</b><span>{t.bSub}</span></span>
        </div>
        <p className="rl-move">{t.move}</p>
      </div>
    )
  }
  const t = TEXT[lang].value
  return (
    <div className="rl rl-value" aria-hidden="true">
      <div className="rl-track">
        <div className="rl-line" />
        <span className="rl-tick rl-tick-m" style={{ left: "13.3%" }} />
        <span className="rl-tick rl-tick-m" style={{ left: "40%" }} />
        <span className="rl-tick rl-tick-m" style={{ left: "100%" }} />
        <span className="rl-lb l" style={{ left: "13.3%" }}><b>{t.c}</b><span>{t.cSub}</span></span>
        <span className="rl-lb c dn" style={{ left: "40%" }}><b>{t.b}</b><span>{t.bSub}</span></span>
        <span className="rl-lb r" style={{ left: "100%" }}><b>{t.a}</b><span>{t.aSub}</span></span>
      </div>
    </div>
  )
}
