import "./africa-faq-grid.css"

/* Pharmacy FAQ as a lime 2x2 grid: each answer has a small drawing, the question, and the live answer.
   Drawings are shapes with a few labels; the accent is the ink. */

type Item = { q: string; a: string }
type Lang = "en" | "fr"

const LABELS: Record<Lang, { sep: [string, string, string]; day: [string, string, string] }> = {
  en: { sep: ["separate", "yours", "separate"], day: ["routine", "alert list", "first patient"] },
  fr: { sep: ["séparés", "le vôtre", "séparés"], day: ["routine", "liste d'alertes", "premier patient"] },
}

const ACC = "#0b0c08"

function Drawing({ index, lang }: { index: number; lang: Lang }) {
  const t = LABELS[lang]
  if (index === 0)
    return (
      <svg viewBox="0 0 160 120" aria-hidden="true">
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
  if (index === 1)
    return (
      <svg viewBox="0 0 160 120" aria-hidden="true">
        <line x1="80" y1="60" x2="26" y2="34" stroke="currentColor" strokeWidth="2" />
        <line x1="80" y1="60" x2="134" y2="34" stroke="currentColor" strokeWidth="2" strokeDasharray="3 4" opacity=".5" />
        <line x1="80" y1="60" x2="26" y2="86" stroke="currentColor" strokeWidth="2" strokeDasharray="3 4" opacity=".5" />
        <line x1="80" y1="60" x2="134" y2="86" stroke="currentColor" strokeWidth="2" strokeDasharray="3 4" opacity=".5" />
        <circle cx="80" cy="60" r="14" fill="currentColor" />
        <circle cx="26" cy="34" r="9" fill={ACC} />
        <circle cx="134" cy="34" r="9" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" />
        <circle cx="26" cy="86" r="9" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" />
        <circle cx="134" cy="86" r="9" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" />
        <text fontSize="10" x="26" y="14" textAnchor="middle">CSV</text>
        <text fontSize="10" x="134" y="14" textAnchor="middle">ERP</text>
        <text fontSize="10" x="26" y="114" textAnchor="middle">API</text>
        <text fontSize="10" x="134" y="114" textAnchor="middle">IoT</text>
      </svg>
    )
  if (index === 2)
    return (
      <svg viewBox="0 0 160 120" aria-hidden="true">
        <rect x="8" y="18" width="44" height="44" rx="8" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <rect x="58" y="18" width="44" height="44" rx="8" fill={ACC} />
        <rect x="108" y="18" width="44" height="44" rx="8" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <text fontSize="11" x="30" y="88" textAnchor="middle">{t.sep[0]}</text>
        <text fontSize="11" x="80" y="88" textAnchor="middle">{t.sep[1]}</text>
        <text fontSize="11" x="130" y="88" textAnchor="middle">{t.sep[2]}</text>
      </svg>
    )
  return (
    <svg viewBox="0 0 160 120" aria-hidden="true">
      <line x1="20" y1="66" x2="140" y2="66" stroke="currentColor" strokeWidth="3" opacity=".3" />
      <circle cx="24" cy="66" r="11" fill="currentColor" />
      <circle cx="80" cy="66" r="11" fill={ACC} />
      <circle cx="136" cy="66" r="11" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <text fontSize="11" x="24" y="40" textAnchor="middle">{t.day[0]}</text>
      <text fontSize="11" x="80" y="40" textAnchor="middle">{t.day[1]}</text>
      <text fontSize="11" x="136" y="100" textAnchor="middle">{t.day[2]}</text>
    </svg>
  )
}

export function AfricaFaqGrid({ id, kicker, heading, items, lang }: { id: string; kicker?: string; heading: string; items: Item[]; lang: Lang }) {
  return (
    <section className="afr-fg" aria-labelledby={id}>
      {kicker && <p className="eyebrow">{kicker}</p>}
      <h2 id={id}>{heading}</h2>
      <div className="afr-fg-grid">
        {items.map((it, i) => (
          <div key={it.q} className="afr-fg-cell" data-rv="rise">
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
