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

export function CapRuler({ index, lang }: { index: number; lang: "en" | "fr" }) {
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
