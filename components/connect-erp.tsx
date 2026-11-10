"use client"

import { useState } from "react"
import type { CSSProperties } from "react"
import { bi, useCountUp } from "./connect-shared"

export type Tab = "overview" | "inventory" | "orders" | "suppliers"
export type Chip = "hi" | "md" | "lo"
export const CHIP: Record<Chip, [string, string]> = { hi: ["High", "Élevé"], md: ["Medium", "Moyen"], lo: ["Low", "Faible"] }

export type Table = { title: [string, string]; cols: [string, string][]; rows: (string | Chip)[][] }
export const TABLES: Record<Tab, Table> = {
  overview: {
    title: ["Inventory at risk", "Stocks à risque"],
    cols: [["SKU", "Réf."], ["Item", "Article"], ["On hand", "En stock"], ["Cover", "Couverture"], ["Risk", "Risque"]],
    rows: [
      ["4411", "Hydraulic seal", "38", "2.1 d", "hi"],
      ["2078", "Pallet wrap", "410", "6.4 d", "md"],
      ["9312", "Filter cartridge", "96", "3.0 d", "hi"],
      ["5560", "Label roll", "1 220", "19 d", "lo"],
      ["7745", "Bearing 6204", "152", "7.8 d", "md"],
    ],
  },
  inventory: {
    title: ["Stock by site", "Stocks par site"],
    cols: [["Site", "Site"], ["Zone", "Zone"], ["Items", "Articles"], ["Cover", "Couverture"], ["Risk", "Risque"]],
    rows: [
      ["Lyon A", "Inbound", "2 410", "14 d", "lo"],
      ["Lyon A", "Cold", "318", "4.2 d", "hi"],
      ["Lyon B", "Bulk", "5 902", "21 d", "lo"],
      ["Marseille", "Pick", "1 044", "6.8 d", "md"],
      ["Lille", "Spare parts", "763", "3.4 d", "hi"],
    ],
  },
  orders: {
    title: ["Orders due", "Commandes à livrer"],
    cols: [["Order", "Commande"], ["Customer", "Client"], ["Lines", "Lignes"], ["Due", "Échéance"], ["Risk", "Risque"]],
    rows: [
      ["SO-8812", "Atelier Nord", "14", "Today", "hi"],
      ["SO-8815", "Maison Dubois", "6", "Today", "md"],
      ["SO-8821", "Logis Sud", "22", "Tomorrow", "lo"],
      ["SO-8824", "Atelier Nord", "3", "Tomorrow", "md"],
      ["SO-8830", "Cora Frères", "9", "Fri", "lo"],
    ],
  },
  suppliers: {
    title: ["Late suppliers", "Fournisseurs en retard"],
    cols: [["Supplier", "Fournisseur"], ["PO", "Cmd"], ["Lines", "Lignes"], ["Delay", "Retard"], ["Risk", "Risque"]],
    rows: [
      ["Metalis", "PO-2291", "8", "+5 d", "hi"],
      ["Packo", "PO-2284", "3", "+2 d", "md"],
      ["Rhône Seals", "PO-2277", "5", "+4 d", "hi"],
      ["Nordic Wrap", "PO-2269", "2", "+1 d", "lo"],
      ["Bearings Co", "PO-2262", "6", "+3 d", "md"],
    ],
  },
}
export const TAB_LABEL: Record<Tab, [string, string]> = {
  overview: ["Overview", "Vue d’ensemble"],
  inventory: ["Inventory", "Stocks"],
  orders: ["Orders", "Commandes"],
  suppliers: ["Suppliers", "Fournisseurs"],
}
export const QUEUE: { id: string; title: [string, string]; sub: [string, string] }[] = [
  { id: "q1", title: ["Reorder 4411", "Réapprovisionner 4411"], sub: ["Supplier lead 9 d", "Délai fournisseur 9 j"] },
  { id: "q2", title: ["Expedite 9312", "Accélérer 9312"], sub: ["Order PO-2291", "Commande PO-2291"] },
  { id: "q3", title: ["Review 2078", "Revoir 2078"], sub: ["Demand +12 %", "Demande +12 %"] },
]

export function ErpScreen({ active }: { active: boolean }) {
  const [tab, setTab] = useState<Tab>("overview")
  const [done, setDone] = useState<Record<string, boolean>>({})
  const approved = Object.values(done).filter(Boolean).length
  const need = 3 - approved
  const cover = useCountUp(14.2, active, 1)
  const open = useCountUp(1284, active)
  const late = useCountUp(7, active)
  const t = TABLES[tab]
  const tabs = Object.keys(TABLES) as Tab[]

  return (
    <div className="cs-monitor" role="group" aria-label="Sample ERP operations screen">
      <div className="cs-chrome" aria-hidden="true">
        <i /> <i /> <i />
        <span className="cs-url">operations.sentria.app</span>
      </div>
      <div className="cs-app">
        <nav className="cs-rail" aria-hidden="true">
          <b className="on" /> <b /> <b /> <b />
        </nav>
        <div className="cs-main">
          <header className="cs-top">
            <div>
              <small>{bi("Warehouse Lyon · Operations", "Entrepôt Lyon · Opérations")}</small>
              <h4>{bi("Stock and orders", "Stocks et commandes")}</h4>
            </div>
            <div className="cs-tabs" role="tablist" aria-label="ERP views">
              {tabs.map((k) => (
                <button
                  key={k}
                  type="button"
                  role="tab"
                  aria-selected={tab === k}
                  className={tab === k ? "on" : ""}
                  onClick={() => setTab(k)}
                >
                  {bi(TAB_LABEL[k][0], TAB_LABEL[k][1])}
                </button>
              ))}
            </div>
          </header>
          <div className="cs-kpis">
            <div className="cs-kpi">
              <small>{bi("Stock coverage", "Couverture stock")}</small>
              <strong>{cover}<span> {bi("days", "jours")}</span></strong>
              <em>{bi("of demand", "de la demande")}</em>
            </div>
            <div className="cs-kpi">
              <small>{bi("Open orders", "Commandes ouvertes")}</small>
              <strong>{open}</strong>
              <em>{bi("86 due today", "86 à livrer aujourd’hui")}</em>
            </div>
            <div className="cs-kpi">
              <small>{bi("Late suppliers", "Fournisseurs en retard")}</small>
              <strong>{late}</strong>
              <em key={need} className="cs-pop">
                {need > 0 ? bi(`${need} need action`, `${need} à traiter`) : bi("All handled", "Tout est traité")}
              </em>
            </div>
          </div>
          <div className="cs-grid2">
            <div className="cs-card" role="tabpanel">
              <h5>{bi(t.title[0], t.title[1])}</h5>
              <div key={tab} className="cs-rows">
                <div className="cs-tr th">
                  {t.cols.map((c, i) => (
                    <span key={i}>{bi(c[0], c[1])}</span>
                  ))}
                </div>
                {t.rows.map((r, ri) => (
                  <div className="cs-tr" key={ri} style={{ ["--r" as string]: ri } as CSSProperties}>
                    {r.map((c, ci) =>
                      ci === r.length - 1 ? (
                        <span key={ci}>
                          <u className={c}>{bi(CHIP[c as Chip][0], CHIP[c as Chip][1])}</u>
                        </span>
                      ) : (
                        <span key={ci}>{c}</span>
                      )
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="cs-card">
              <h5>{bi("Decision queue", "File de décisions")}</h5>
              {QUEUE.map((q) => (
                <div className={`cs-q${done[q.id] ? " done" : ""}`} key={q.id}>
                  <b>{bi(q.title[0], q.title[1])}</b>
                  <small>{bi(q.sub[0], q.sub[1])}</small>
                  <button
                    type="button"
                    aria-pressed={!!done[q.id]}
                    onClick={() => setDone((d) => ({ ...d, [q.id]: !d[q.id] }))}
                  >
                    {done[q.id] ? bi("Approved ✓", "Approuvé ✓") : bi("Approve", "Approuver")}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ main */
