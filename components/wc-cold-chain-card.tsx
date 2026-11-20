import { COLD } from "@/content/wholesale-cards"
import { WcLineChart } from "./wc-line-chart"
import { num } from "./wc-format"

/* Cold chain: one pallet's 24-hour trace against the 2 to 8 °C range. The range shows as moving water. */
export function WcColdChainCard({ lang }: { lang: "en" | "fr" }) {
  const fr = lang === "fr"
  return (
    <div className="wc-card">
      <div className="wc-kicker">{fr ? "Chaîne du froid" : "Cold chain"}</div>
      <div className="wc-title">{fr ? "Palette par palette, chambre froide 3" : "Pallet by pallet, cold room 3"}</div>
      <div className="wc-big-row wc-split">
        <div>
          <div className="wc-lbl">{fr ? "Hors plage" : "Out of range"}</div>
          <div className="wc-big">1<em>{fr ? "palette" : "pallet"}</em></div>
        </div>
        <div className="wc-side">
          <div className="wc-lbl">{fr ? "Temps hors plage" : "Time out of range"}</div>
          <div className="wc-big sm">{COLD.minutesOut} min</div>
          <div className="wc-sub">P-14 · 14:20 – 15:05</div>
        </div>
      </div>
      <WcLineChart
        values={COLD.trace}
        yTicks={[2, 8]}
        yMin={0}
        yMax={13}
        band={{ lo: 2, hi: 8, wave: true }}
        xLabels={[
          { at: 0, text: "00:00" },
          { at: 24, text: "12:00" },
          { at: 47, text: "24:00" },
        ]}
        mark={{ at: COLD.peakIndex, label: `${COLD.peak} °C`, sub: "15:00 · P-14" }}
        ariaLabel={fr ? "Température sur 24 heures entre 2 et 8 degrés" : "Temperature over 24 hours between 2 and 8 degrees"}
      />
      <div className="wc-tiles three">
        <div className="wc-tile"><b>{num(COLD.pallets, lang)}</b><small>{fr ? "palettes suivies" : "pallets monitored"}</small></div>
        <div className="wc-tile"><b>{num(COLD.inRange, lang)}</b><small>{fr ? "dans la plage" : "within range"}</small></div>
        <div className="wc-tile on"><b>{fr ? "Vérifier P-14" : "Check P-14"}</b><small>{fr ? "action" : "action"}</small></div>
      </div>
      <p className="wc-foot">
        {fr
          ? "Les enregistreurs viennent d'un partenaire matériel. SentrIA lit leurs données. Écran d'exemple, chiffres fictifs."
          : "The loggers come from a hardware partner. SentrIA reads their data. Example screen, numbers made up."}
      </p>
    </div>
  )
}
