"use client"

import { CARD_MONEY, CREDITS } from "@/content/wholesale-cards"
import type { SiteCurrency } from "@/content/prices"
import { money, num } from "./wc-format"

/* Expiry credits: returned batches, the amount ready to claim in the visitor's currency, and the deadline. */
export function WcCreditsCard({ lang, currency = "USD" }: { lang: "en" | "fr"; currency?: SiteCurrency }) {
  const fr = lang === "fr"
  const cur = currency
  const c = CARD_MONEY[cur].credits
  const ready = c[0] + c[1]
  const rows = [
    { name: "Amoxicilline 500 mg", en: "Amoxicillin 500 mg", lot: "L-224 · 40", days: 3, value: c[0], status: "ok" },
    { name: "Stylo insuline 3 ml", en: "Insulin pen 3 ml", lot: "I-118 · 12", days: 9, value: c[1], status: "ok" },
    { name: "Paracétamol 1 g", en: "Paracetamol 1 g", lot: "P-307 · 60", days: null, value: c[2], status: "wait" },
    { name: "Vitamine C 1 g", en: "Vitamin C 1 g", lot: "V-051 · 8", days: null, value: c[3], status: "check" },
  ]
  return (
    <div className="wc-card">
      <div className="wc-kicker">{fr ? "Avoirs sur péremption" : "Expiry credits"}</div>
      <div className="wc-title">{fr ? "Réclamez l'avoir avant la date limite" : "Claim the credit before the deadline"}</div>
      <div className="wc-big-row wc-split">
        <div>
          <div className="wc-lbl">{fr ? "Prêt à réclamer" : "Ready to claim"}</div>
          <div className="wc-big">{num(ready, lang)}<em>{cur}</em></div>
        </div>
        <div className="wc-side">
          <div className="wc-lbl">{fr ? "Jours avant la limite" : "Days to deadline"}</div>
          <div className="wc-big sm">{num(CREDITS.daysLeft, lang)} {fr ? "jours" : "days"}</div>
          <div className="wc-bar"><i /></div>
        </div>
      </div>
      <table className="wc-table">
        <thead>
          <tr>
            <th>{fr ? "Produit" : "Product"}</th>
            <th className="r">{fr ? "Avoir" : "Credit"}</th>
            <th className="r">{fr ? "Statut" : "Status"}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, k) => (
            <tr key={r.en} style={{ animationDelay: `${0.4 + k * 0.12}s` }}>
              <td>
                {fr ? r.name : r.en}
                <small className="wc-small">{r.lot}</small>
              </td>
              <td className="r">{money(r.value, cur, lang)}</td>
              <td className="r">
                <span className={`wc-status${r.status === "ok" ? " ok" : ""}`}>
                  {r.status === "ok"
                    ? fr ? `Réclamer · ${r.days} j` : `Claim now · ${r.days} d`
                    : r.status === "wait"
                      ? fr ? "Apparié" : "Matched"
                      : fr ? "Vérifier" : "Check"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="wc-foot">
        {fr ? "Chaque lot périmé est rapproché du relevé de retour du distributeur. Vous envoyez les demandes, pas SentrIA." : "Each expired batch is matched to the distributor's return report. You send the claims, not SentrIA."}
      </p>
    </div>
  )
}
