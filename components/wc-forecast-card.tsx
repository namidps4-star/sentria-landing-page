import { FORECAST } from "@/content/wholesale-cards"
import { WcLineChart } from "./wc-line-chart"
import { num } from "./wc-format"

/* Demand forecast: twelve weeks of sales, four forecast weeks in a likely range, and the order. */
export function WcForecastCard({ lang }: { lang: "en" | "fr" }) {
  const fr = lang === "fr"
  const F = FORECAST
  const mark = 11
  return (
    <div className="wc-card">
      <div className="wc-kicker">{fr ? "Prévision de la demande" : "Demand forecast"}</div>
      <div className="wc-title">{fr ? "Commandez selon l'usage attendu" : "Order from expected use"}</div>
      <div className="wc-big-row">
        <div className="wc-side">
          <div className="wc-lbl">{fr ? "Prévision, 4 semaines" : "Forecast, next 4 weeks"}</div>
          <div className="wc-big sm">{num(F.weeks4, lang)}</div>
          <div className="wc-sub">{fr ? "boîtes" : "boxes"}</div>
        </div>
      </div>
      <WcLineChart
        values={F.sales}
        forecast={{ values: F.forecast, low: F.low, high: F.high }}
        yTicks={[50, 100, 150]}
        yMin={30}
        yMax={160}
        xLabels={[
          { at: 0, text: "W1" },
          { at: 4, text: "W4" },
          { at: 8, text: "W8" },
          { at: 11, text: "W12" },
          { at: 15, text: "W16" },
        ]}
        mark={{ at: mark, label: fr ? `Semaine 12 : ${F.sales[mark]}` : `Week 12: ${F.sales[mark]}`, sub: fr ? "ventes réelles" : "actual sales" }}
        ariaLabel={fr ? "Ventes des 12 dernières semaines et prévision sur 4 semaines" : "Sales for the past 12 weeks and a four-week forecast"}
      />
      <div className="wc-legend">
        <span><i className="lg-s" />{fr ? "Ventes, 12 semaines" : "Sales, past 12 weeks"}</span>
        <span><i className="lg-f" />{fr ? "Prévision" : "Forecast"}</span>
        <span><i className="lg-r" />{fr ? "Fourchette probable" : "Likely range"}</span>
      </div>
      <div className="wc-tiles">
        <div className="wc-tile"><b>{num(F.onHand, lang)}</b><small>{fr ? "en stock" : "on hand"}</small></div>
        <div className="wc-tile"><b>{num(F.weeks4, lang)}</b><small>{fr ? "prévision, 4 semaines" : "forecast, 4 weeks"}</small></div>
        <div className="wc-tile"><b>{num(F.safety, lang)}</b><small>{fr ? "stock de sécurité" : "safety stock"}</small></div>
      </div>
      <div className="wc-order">
        <div className="wc-lbl">{fr ? "Commande suggérée" : "Suggested order"}</div>
        <div className="wc-big">{num(F.order, lang)}<em>{fr ? "boîtes" : "boxes"}</em></div>
      </div>
      <p className="wc-foot">
        {fr
          ? "Commande = prévision + stock de sécurité − stock en main. Délai : livraisons réelles du fournisseur, 3 jours."
          : "Order = forecast + safety stock − on hand. Lead time from your supplier's real deliveries: 3 days."}
      </p>
    </div>
  )
}
