import type { SiteCurrency } from "@/content/prices"
import type { ActivityFeature } from "@/content/activity-features"
import { WcPillBars } from "./wc-pill-bars"
import { money } from "./wc-format"

/* Example rates from USD for the example figures only (not live rates). */
const RATE: Record<SiteCurrency, number> = { USD: 1, EUR: 0.92, XOF: 600, KES: 130, NGN: 1500, GHS: 15 }
export const scaled = (usd: number, cur: SiteCurrency) => Math.round(usd * RATE[cur] / 10) * 10

/* One feature card: a big figure, bars, a short table with a status, three tiles and one action. */
export function WcFeatureCard({ feature, lang, currency }: { feature: ActivityFeature; lang: "en" | "fr"; currency: SiteCurrency }) {
  const c = feature.card[lang]
  const fmt = (usd: number) => money(scaled(usd, currency), currency, lang)
  const bars = c.bars.map((b) =>
    feature.kind === "money"
      ? { label: b.label, value: b.usd ?? 0, text: fmt(b.usd ?? 0) }
      : { label: b.label, value: b.pct ?? 0, text: b.text ?? `${b.pct}%` },
  )
  return (
    <div className="wc-card">
      <div className="wc-kicker">{c.kicker}</div>
      <div className="wc-title">{c.title}</div>
      <div className="wc-big-row">
        <div>
          <div className="wc-lbl">{c.bigLabel}</div>
          <div className="wc-big sm">{feature.kind === "money" ? fmt(Number(c.big.replace(/[^0-9]/g, "")) || 0) : c.big}</div>
        </div>
      </div>
      <WcPillBars items={bars} />
      <table className="wc-table">
        <thead>
          <tr>
            <th>{c.rowHead[0]}</th>
            <th>{c.rowHead[1]}</th>
            <th className="r">{c.rowHead[2]}</th>
          </tr>
        </thead>
        <tbody>
          {c.rows.map((r, k) => (
            <tr key={r.cells[0]} style={{ animationDelay: `${0.4 + k * 0.12}s` }}>
              <td>{r.cells[0]}</td>
              <td>{r.cells[1]}{r.usd !== undefined ? ` · ${fmt(r.usd)}` : ""}</td>
              <td className="r"><span className={`wc-status${r.warn ? "" : " ok"}`}>{r.status}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="wc-tiles three">
        {c.tiles.map((t) => (
          <div key={t[1]} className="wc-tile"><b>{t[0]}</b><small>{t[1]}</small></div>
        ))}
        <div className="wc-tile on"><b>{c.action[0]}</b><small>{c.action[1]}</small></div>
      </div>
      <p className="wc-foot">{NOTE[lang]}</p>
    </div>
  )
}

const NOTE = { en: "Example screen. The numbers are made up.", fr: "Écran d'exemple. Les chiffres sont fictifs." }
