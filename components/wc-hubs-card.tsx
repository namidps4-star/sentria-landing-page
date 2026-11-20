import { CARD_MONEY, HUBS } from "@/content/wholesale-cards"
import type { SiteCurrency } from "@/content/prices"
import { WcPillBars } from "./wc-pill-bars"
import { money, num } from "./wc-format"

/* Regional hubs: days out of stock by distance from supply, as pill bars. */
export function WcHubsCard({ lang, currency = "USD" }: { lang: "en" | "fr"; currency?: SiteCurrency }) {
  const fr = lang === "fr"
  return (
    <div className="wc-card">
      <div className="wc-kicker">{fr ? "Dépôts régionaux" : "Regional hubs"}</div>
      <div className="wc-title">{fr ? "Ruptures selon la distance" : "Stock-outs by distance"}</div>
      <div className="wc-sub wc-spaced">{fr ? "90 derniers jours · toutes les pharmacies" : "Last 90 days · all pharmacies in the group"}</div>
      <WcPillBars
        items={HUBS.bands.map((b) => ({ label: `${b.km} km`, value: b.pct, text: `${b.pct}%` }))}
      />
      <div className="wc-tiles three">
        <div className="wc-tile"><b>{num(HUBS.farPharmacies, lang)} / {num(HUBS.totalPharmacies, lang)}</b><small>{fr ? "pharmacies au-delà de 60 km" : "pharmacies beyond 60 km"}</small></div>
        <div className="wc-tile"><b>{money(CARD_MONEY[currency].lost, currency, lang)}</b><small>{fr ? "ventes perdues, 90 jours" : "sales lost, 90 days"}</small></div>
        <div className="wc-tile on"><b>{fr ? "Dépôt à 60 km" : "Hub at 60 km"}</b><small>{fr ? "suggestion" : "suggested"}</small></div>
      </div>
      <p className="wc-foot">
        {fr ? "Le dépôt est une décision logistique. SentrIA montre les preuves. Écran d'exemple, chiffres fictifs." : "The hub is a logistics decision. SentrIA shows the evidence. Example screen, numbers made up."}
      </p>
    </div>
  )
}
