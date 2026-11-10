"use client"

import { Panel } from "./connect-panel"
import { ErpScreen } from "./connect-erp"
import { T } from "./t"
import { bi, useInView, I } from "./connect-shared"

/* ------------------------------------------------------------------------
   Connect stack: four vertical panels (CSV, ERP, IoT, API) that replace the
   three data cards. Motion thesis: each panel arrives as a technical frame
   that draws itself (rules, then the numeral rising from behind its rule),
   then the art settles. Loops (steps, pulses, scan) run only while a panel
   is on screen. Everything is visible without JavaScript and settles to its
   final state under prefers-reduced-motion.
   ------------------------------------------------------------------------ */

export function ConnectStack() {
  const { ref: erpRef, seen: erpSeen } = useInView<HTMLDivElement>()
  return (
    <div className="cs-stack">
      <Panel
        id="cs-csv"
        num="01"
        kind="csv"
        line1="CSV"
        line2={bi("file import", "import de fichiers")}
        lead={bi(
          "Bring operational data in as a file. Columns are mapped and checked before anything is loaded.",
          "Importez vos données opérationnelles sous forme de fichier. Les colonnes sont associées et vérifiées avant tout chargement."
        )}
        metaValue={bi("Files", "Fichiers")}
        steps={[
          { icon: I.table, label: bi("Map columns", "Associer les colonnes") },
          { icon: I.check, label: bi("Check rows", "Vérifier les lignes") },
          { icon: I.down, label: bi("Load", "Charger") },
        ]}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="cs-img" src="/connect/csv.webp" width={736} height={1104} loading="lazy" decoding="async" alt="" />
        <span className="cs-scan" aria-hidden="true" />
      </Panel>

      <Panel
        id="cs-erp"
        num="02"
        kind="erp"
        line1="ERP"
        line2={bi("connection", "connexion")}
        lead={<T s="Use your production, orders, procurement, and inventory data." />}
        metaValue={bi("Orders, stock, procurement", "Commandes, stocks, achats")}
        steps={[
          { icon: I.nodes, label: bi("Connect", "Connecter") },
          { icon: I.sync, label: bi("Sync", "Synchroniser") },
          { icon: I.chart, label: bi("Rank risks", "Classer les risques") },
        ]}
      >
        <div ref={erpRef} className="cs-erp-bg">
          <ErpScreen active={erpSeen} />
        </div>
        <span className="cs-cred">{bi("Sample data", "Données d’exemple")}</span>
      </Panel>

      <Panel
        id="cs-iot"
        num="03"
        kind="iot"
        line1="IoT"
        line2={bi("sensors", "capteurs")}
        lead={<T s="Turn machine and sensor signals into operational alerts." />}
        metaValue={bi("Machines and sensors", "Machines et capteurs")}
        steps={[
          { icon: I.chip, label: bi("Connect sensors", "Connecter les capteurs") },
          { icon: I.wave, label: bi("Read signals", "Lire les signaux") },
          { icon: I.alert, label: bi("Raise alerts", "Lever des alertes") },
        ]}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="cs-img" src="/connect/iot.webp" width={720} height={1280} loading="lazy" decoding="async" alt="" />
        <span className="cs-pulse" aria-hidden="true">
          <i /> <i /> <i />
        </span>
      </Panel>

      <Panel
        id="cs-api"
        num="04"
        kind="api"
        line1="API"
        line2={bi("access", "accès")}
        lead={<T s="Connect the systems already present in your technical environment." />}
        metaValue={bi("Existing systems", "Systèmes existants")}
        steps={[
          { icon: I.link, label: bi("Connect systems", "Connecter les systèmes") },
          { icon: I.send, label: bi("Send data", "Envoyer les données") },
          { icon: I.recv, label: bi("Receive risks", "Recevoir les risques") },
        ]}
      >
        <span className="cs-glow" aria-hidden="true" />
        <div className="cs-gw" role="img" aria-label="Wireframe of a gateway device opening: lid, circuit board and base">
          {/* eslint-disable @next/next/no-img-element */}
          <img className="cs-gw-l base" src="/connect/gw-base.webp" width={540} height={750} loading="lazy" decoding="async" alt="" />
          <img className="cs-gw-l board" src="/connect/gw-board.webp" width={540} height={750} loading="lazy" decoding="async" alt="" />
          <img className="cs-gw-l lid" src="/connect/gw-lid.webp" width={540} height={750} loading="lazy" decoding="async" alt="" />
          {/* eslint-enable @next/next/no-img-element */}
        </div>
      </Panel>
    </div>
  )
}
