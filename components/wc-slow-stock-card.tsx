import { SLOW_STOCK_COPY, SLOW_STOCK_MONEY } from "@/content/pharmacy-features"
import type { SiteCurrency } from "@/content/prices"
import { WcPillBars } from "./wc-pill-bars"
import { money } from "./wc-format"

/* Slow stock: money by days since the last sale, the products that have not sold in 60 days, and the action. */
export function WcSlowStockCard({ lang, currency = "USD" }: { lang: "en" | "fr"; currency?: SiteCurrency }) {
  const c = SLOW_STOCK_COPY[lang]
  const m = SLOW_STOCK_MONEY[currency]
  return (
    <div className="wc-card">
      <div className="wc-kicker">{c.title}</div>
      <div className="wc-lbl" style={{ marginTop: 22 }}>{c.tiedUp}</div>
      <WcPillBars
        items={c.buckets.map((label, k) => ({ label, value: m.buckets[k], text: money(m.buckets[k], currency, lang) }))}
      />
      <table className="wc-table">
        <thead>
          <tr>
            <th>{c.table[0]}</th>
            <th className="r">{c.table[1]}</th>
            <th className="r">{c.table[2]}</th>
          </tr>
        </thead>
        <tbody>
          {c.rows.map((r, k) => (
            <tr key={r[0]} style={{ animationDelay: `${0.4 + k * 0.12}s` }}>
              <td>{r[0]}</td>
              <td className="r">{r[1]}</td>
              <td className="r">{money(m.products[k], currency, lang)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="wc-tiles three">
        <div className="wc-tile"><b>{c.tiles[0][0]}</b><small>{c.tiles[0][1]}</small></div>
        <div className="wc-tile"><b>{c.tiles[1][0]}</b><small>{c.tiles[1][1]}</small></div>
        <div className="wc-tile on"><b>{c.action[0]}</b><small>{c.action[1]}</small></div>
      </div>
      <p className="wc-foot">{c.foot}</p>
    </div>
  )
}
