import "./africa-move.css"

/* The 30-unit transfer as two tall cards, one dot per unit. Once the section is in view the 30 dots leave
   Centrale from the bottom up and fill Nord, and both counters follow. */
const TOTAL = 120
const TEXT = {
  en: {
    kicker: "Wholesaler",
    title: "30 units move instead of a new order.",
    lead: "Pharmacie Centrale holds 34 units of Metformin 500mg unsold. Clinique du Nord is reordering 30. SentrIA proposes the transfer.",
    a: { n: "Centrale", unit: "units", sub: "Unsold", side: "30 units", sideSub: "Transfer" },
    b: { n: "Nord", unit: "units", sub: "Reordering", side: "Metformin", sideSub: "500mg" },
    note: "The numbers are examples. You decide whether to move the stock.",
  },
  fr: {
    kicker: "Grossiste",
    title: "30 unités se déplacent au lieu d'une nouvelle commande.",
    lead: "La Pharmacie Centrale garde 34 unités de Metformine 500mg invendues. La Clinique du Nord en recommande 30. SentrIA propose le transfert.",
    a: { n: "Centrale", unit: "unités", sub: "Invendues", side: "30 unités", sideSub: "Transfert" },
    b: { n: "Nord", unit: "unités", sub: "Recommande", side: "Metformine", sideSub: "500mg" },
    note: "Les chiffres sont des exemples. Vous décidez si le stock bouge.",
  },
}

function Dots({ lit, kind }: { lit: number; kind: "from" | "to" }) {
  return (
    <div className="afr-mv-dots" aria-hidden="true">
      {Array.from({ length: TOTAL }, (_, i) => {
        const up = TOTAL - 1 - i // 0 at the bottom
        if (kind === "from") {
          const cls = up >= lit ? "off" : up < 4 ? "keep" : "go"
          return <i key={i} className={cls} style={{ "--k": up } as React.CSSProperties} />
        }
        return <i key={i} className={up < lit ? "come" : "off"} style={{ "--k": up } as React.CSSProperties} />
      })}
    </div>
  )
}

export function AfricaMove({ lang }: { lang: "en" | "fr" }) {
  const t = TEXT[lang]
  return (
    <section className="afr-mv" data-rv="rise" aria-label={t.title}>
      <div className="afr-mv-in">
        <div className="afr-mv-copy">
          <p className="eyebrow">{t.kicker}</p>
          <h2>{t.title}</h2>
          <p className="afr-mv-lead">{t.lead}</p>
          <p className="afr-mv-note">{t.note}</p>
        </div>
        <div className="afr-mv-cards" role="img" aria-label={`${t.a.n}: 34 ${t.a.unit} ${t.a.sub}. ${t.b.n}: 30 ${t.b.unit}. ${t.a.side}.`}>
          <div className="afr-mv-card from">
            <p className="afr-mv-name">{t.a.n}</p>
            <div className="afr-mv-stats">
              <div>
                <p className="afr-mv-num" aria-hidden="true" />
                <p className="afr-mv-sub">{t.a.unit} {t.a.sub.toLowerCase()}</p>
              </div>
              <div className="afr-mv-side">
                {t.a.side}
                <span>{t.a.sideSub}</span>
              </div>
            </div>
            <Dots lit={34} kind="from" />
          </div>
          <div className="afr-mv-card to">
            <p className="afr-mv-name">{t.b.n}</p>
            <div className="afr-mv-stats">
              <div>
                <p className="afr-mv-num" aria-hidden="true" />
                <p className="afr-mv-sub">{t.b.unit} {t.b.sub.toLowerCase()}</p>
              </div>
              <div className="afr-mv-side">
                {t.b.side}
                <span>{t.b.sideSub}</span>
              </div>
            </div>
            <Dots lit={30} kind="to" />
          </div>
        </div>
      </div>
    </section>
  )
}
