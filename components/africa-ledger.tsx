import type { Capabilities } from "@/content/africa-activities"
import "./africa-ledger.css"

/* Pharmacy capabilities as a ledger: a figure from each alert, the product's own
   copy under its heading, the imports as chips, and a small drawing of the alert. */

type Lang = "en" | "fr"

const LABELS: Record<Lang, { figures: string[]; stock: string; delivery: string; now: string; mid: string; end: string; expired: string; received: string; promised: string; real: string; worst: string }> = {
  en: {
    figures: ["4", "18", "15 Oct", "9"],
    stock: "stock · 4 days",
    delivery: "delivery · 7 days",
    now: "today",
    mid: "18 days",
    end: "30 days",
    expired: "expired 15 Oct",
    received: "received 1 Nov",
    promised: "promised 5",
    real: "real average 9",
    worst: "worst 14",
  },
  fr: {
    figures: ["4", "18", "15 oct", "9"],
    stock: "stock · 4 jours",
    delivery: "livraison · 7 jours",
    now: "aujourd'hui",
    mid: "18 jours",
    end: "30 jours",
    expired: "périmé le 15 oct",
    received: "reçu le 1er nov",
    promised: "promis 5",
    real: "réel moyen 9",
    worst: "pire 14",
  },
}

/* The imports line becomes chips: the part after the colon, split on commas and "and" / "et". */
function chipsOf(imports: string) {
  const list = imports.includes(":") ? imports.slice(imports.indexOf(":") + 1) : imports
  return list
    .split(/,| and | et /)
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => s[0].toUpperCase() + s.slice(1))
}

function Drawing({ index, t }: { index: number; t: (typeof LABELS)[Lang] }) {
  if (index === 0)
    return (
      <svg viewBox="0 0 400 110" aria-hidden="true">
        <text x="0" y="12">{t.stock}</text>
        <rect x="0" y="20" width="229" height="16" rx="8" fill="currentColor" />
        <rect x="229" y="20" width="171" height="16" rx="8" fill="none" stroke="currentColor" strokeDasharray="4 4" opacity=".5" />
        <text x="0" y="66">{t.delivery}</text>
        <rect x="0" y="74" width="400" height="16" rx="8" fill="#0f2e1f" />
      </svg>
    )
  if (index === 1)
    return (
      <svg viewBox="0 0 400 110" aria-hidden="true">
        <line x1="0" y1="50" x2="400" y2="50" stroke="currentColor" strokeWidth="2" opacity=".3" />
        <rect x="240" y="44" width="160" height="12" rx="6" fill="#0f2e1f" />
        <circle cx="240" cy="50" r="9" fill="currentColor" />
        <text x="240" y="26" textAnchor="middle">{t.mid}</text>
        <text x="0" y="92">{t.now}</text>
        <text x="400" y="92" textAnchor="end">{t.end}</text>
      </svg>
    )
  if (index === 2)
    return (
      <svg viewBox="0 0 400 110" aria-hidden="true">
        <line x1="60" y1="50" x2="340" y2="50" stroke="currentColor" strokeWidth="2" opacity=".3" />
        <circle cx="60" cy="50" r="10" fill="#0f2e1f" />
        <circle cx="340" cy="50" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
        <text x="60" y="26" textAnchor="middle">{t.expired}</text>
        <text x="340" y="26" textAnchor="middle">{t.received}</text>
      </svg>
    )
  return (
    <svg viewBox="0 0 400 110" aria-hidden="true">
      <rect x="0" y="18" width="143" height="12" rx="6" fill="currentColor" opacity=".35" />
      <rect x="0" y="54" width="257" height="12" rx="6" fill="#0f2e1f" />
      <rect x="0" y="90" width="400" height="12" rx="6" fill="none" stroke="currentColor" strokeDasharray="4 4" opacity=".5" />
      <text x="0" y="12">{t.promised}</text>
      <text x="0" y="48">{t.real}</text>
      <text x="0" y="84">{t.worst}</text>
    </svg>
  )
}

export function AfricaLedger({ id, kicker, heading, items, notDo, lang }: { id: string; kicker?: string; heading: string; items: Capabilities["items"]; notDo: string; lang: Lang }) {
  const t = LABELS[lang]
  const youImport = lang === "en" ? "You import" : "Vous importez"
  return (
    <section className="afr-led" aria-labelledby={id}>
      {kicker && <p className="eyebrow">{kicker}</p>}
      <h2 id={id}>{heading}</h2>
      <ul className="afr-led-rows">
        {items.map((item, i) => (
          <li key={item.title} className="afr-led-row" data-rv="rise" style={{ "--i": i } as React.CSSProperties}>
            <span className={`afr-led-num${t.figures[i]?.length > 3 ? " sm" : ""}`}>{t.figures[i]}</span>
            <div className="afr-led-txt">
              <h3>{item.title}</h3>
              <p className="afr-led-does">{item.does.split(/(?<=\.)\s/)[0]}</p>
              <p className="afr-led-imp">{youImport}</p>
              <ul className="afr-led-chips">
                {chipsOf(item.imports).map((chip) => (
                  <li key={chip}>{chip}</li>
                ))}
              </ul>
            </div>
            <div className="afr-led-vis">
              <Drawing index={i} t={t} />
              <p className="afr-led-alert">{item.example}</p>
            </div>
          </li>
        ))}
      </ul>
      <p className="afr-led-not">{notDo}</p>
    </section>
  )
}
