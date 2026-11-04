"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import type { CSSProperties, ReactNode } from "react"
import { B, T } from "./t"

/* ------------------------------------------------------------------------
   Connect stack: four vertical panels (CSV, ERP, IoT, API) that replace the
   three data cards. Motion thesis: each panel arrives as a technical frame
   that draws itself (rules, then the numeral rising from behind its rule),
   then the art settles. Loops (steps, pulses, scan) run only while a panel
   is on screen. Everything is visible without JavaScript and settles to its
   final state under prefers-reduced-motion.
   ------------------------------------------------------------------------ */

const bi = (en: string, fr: string) => <B en={en} fr={fr} />

const reduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches

/** Seen once (for the entrance) and visible now (for loops and parallax). */
function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [seen, setSeen] = useState(false)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (reduced() || !("IntersectionObserver" in window)) {
      queueMicrotask(() => setSeen(true))
      return
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setSeen(true)
        setVis(e.isIntersecting)
      },
      { threshold: 0.22 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return { ref, seen, vis }
}

/** Counts up to a value once, when `go` turns true. Final value immediately under reduced motion. */
function useCountUp(target: number, go: boolean, decimals = 0) {
  const [v, setV] = useState(target)
  const done = useRef(false)
  useEffect(() => {
    if (!go || done.current) return
    done.current = true
    if (reduced()) return
    const t0 = performance.now()
    const dur = 1100
    let raf = 0
    const step = (t: number) => {
      const p = Math.min(1, (t - t0) / dur)
      const e = 1 - Math.pow(1 - p, 4)
      setV(target * e)
      if (p < 1) raf = requestAnimationFrame(step)
      else setV(target)
    }
    queueMicrotask(() => setV(0))
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [go, target])
  return decimals ? v.toFixed(decimals) : Math.round(v).toLocaleString("en-US").replace(/,/g, " ")
}

/* ----------------------------------------------------------------- icons */

const I = {
  table: <><rect x="4" y="5" width="16" height="14" rx="1.5" /><path d="M4 10h16M10 5v14" /></>,
  check: <><circle cx="12" cy="12" r="8" /><path d="M8.5 12.5l2.5 2.5 4.5-5" /></>,
  down: <path d="M12 4v11M7.5 10.5L12 15l4.5-4.5M5 19.5h14" />,
  nodes: <><circle cx="6" cy="12" r="2.4" /><circle cx="18" cy="6" r="2.4" /><circle cx="18" cy="18" r="2.4" /><path d="M8.2 11l7.6-3.9M8.2 13l7.6 3.9" /></>,
  sync: <path d="M19.5 12a7.5 7.5 0 1 1-2.2-5.3M19.5 4.5v4.5h-4.5" />,
  chart: <><path d="M4 18l5-6 4 3 7-8" /><path d="M4 20.5h16" /></>,
  chip: <><rect x="8" y="8" width="8" height="8" rx="1" /><path d="M10 8V5M14 8V5M10 19v-3M14 19v-3M8 10H5M8 14H5M19 10h-3M19 14h-3" /></>,
  wave: <path d="M3 12h3l2-5 4 10 3-8 2 3h4" />,
  alert: <><path d="M12 4l8.5 15h-17z" /><path d="M12 10v4M12 16.5v.5" /></>,
  link: <path d="M9 7l-5 5 5 5M15 7l5 5-5 5" />,
  send: <path d="M5 12h13M13.5 7.5L18 12l-4.5 4.5" />,
  recv: <path d="M19 12H6M10.5 7.5L6 12l4.5 4.5" />,
}
const Ico = ({ d }: { d: ReactNode }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    {d}
  </svg>
)

/* ----------------------------------------------------------------- panel */

type Step = { icon: ReactNode; label: ReactNode }

function Panel({
  id,
  num,
  line1,
  line2,
  lead,
  metaValue,
  steps,
  kind,
  children,
}: {
  id: string
  num: string
  line1: string
  line2: ReactNode
  lead: ReactNode
  metaValue: ReactNode
  steps: Step[]
  kind: "csv" | "erp" | "iot" | "api"
  children: ReactNode
}) {
  const { ref, seen, vis } = useInView<HTMLElement>()
  const [step, setStep] = useState(0)
  const [hold, setHold] = useState(false)

  // Parallax on the art, only while the panel is on screen.
  useEffect(() => {
    const el = ref.current
    if (!el || !vis || reduced()) return
    let raf = 0
    const tick = () => {
      raf = 0
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight
      const p = (r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2)
      const pc = Math.max(-1, Math.min(1, p))
      el.style.setProperty("--py", (pc * -16).toFixed(1))
      // The API gateway opens as the panel travels up the screen: lid first, then the base.
      const open = Math.max(0, Math.min(1, (0.55 - pc) / 0.6))
      const ease = (x: number) => x * x * (3 - 2 * x)
      el.style.setProperty("--open", open.toFixed(3))
      el.style.setProperty("--lid", ease(Math.max(0, Math.min(1, (open - 0.3) / 0.7))).toFixed(3))
      el.style.setProperty("--base", ease(Math.max(0, Math.min(1, open / 0.7))).toFixed(3))
    }
    const on = () => {
      if (!raf) raf = requestAnimationFrame(tick)
    }
    tick()
    window.addEventListener("scroll", on, { passive: true })
    window.addEventListener("resize", on)
    return () => {
      window.removeEventListener("scroll", on)
      window.removeEventListener("resize", on)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [vis, ref])

  // The three steps light up in turn while the panel is on screen.
  useEffect(() => {
    if (!vis || hold || reduced()) return
    const t = window.setInterval(() => setStep((s) => (s + 1) % steps.length), 2600)
    return () => window.clearInterval(t)
  }, [vis, hold, steps.length])

  const onMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || reduced()) return
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty("--tx", (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3))
    e.currentTarget.style.setProperty("--ty", (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3))
  }, [])
  const onLeave = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.style.setProperty("--tx", "0")
    e.currentTarget.style.setProperty("--ty", "0")
  }, [])

  return (
    <section
      ref={ref}
      className={`cs-panel cs-${kind}${seen ? " in" : ""}${vis ? " vis" : ""}`}
      data-step={step}
      aria-labelledby={`${id}-h`}
    >
      <div className="cs-copy">
        <span className="cs-vline" aria-hidden="true" />
        <span className="cs-hl a" aria-hidden="true" />
        <span className="cs-hl b" aria-hidden="true" />
        <div className="cs-numwrap" aria-hidden="true">
          <span className="cs-num">{num}</span>
        </div>
        <h3 id={`${id}-h`} className="cs-h">
          <span className="cs-ln">
            <span>{line1}</span>
          </span>
          <span className="cs-ln" style={{ ["--l" as string]: 1 } as CSSProperties}>
            <span>{line2}</span>
          </span>
        </h3>
        <p className="cs-lead">{lead}</p>
        <p className="cs-meta">
          {bi("Source", "Source")} : <b>{metaValue}</b>
        </p>
        <ul
          className="cs-steps"
          aria-label={"Flow"}
          onMouseLeave={() => setHold(false)}
          onBlur={() => setHold(false)}
        >
          <li className="cs-lab" aria-hidden="true">
            {bi("Flow", "Flux")} :
          </li>
          {steps.map((s, i) => (
            <li
              key={i}
              className="cs-step"
              data-i={i}
              style={{ ["--s" as string]: i } as CSSProperties}
              onMouseEnter={() => {
                setHold(true)
                setStep(i)
              }}
            >
              <Ico d={s.icon} />
              {s.label}
            </li>
          ))}
        </ul>
      </div>
      <div className="cs-art" onPointerMove={onMove} onPointerLeave={onLeave}>
        <div className="cs-art-in">{children}</div>
        <span className="cs-sheen" aria-hidden="true" />
      </div>
    </section>
  )
}

/* ----------------------------------------------------------- ERP screen */

type Tab = "overview" | "inventory" | "orders" | "suppliers"
type Chip = "hi" | "md" | "lo"
const CHIP: Record<Chip, [string, string]> = { hi: ["High", "Élevé"], md: ["Medium", "Moyen"], lo: ["Low", "Faible"] }

type Table = { title: [string, string]; cols: [string, string][]; rows: (string | Chip)[][] }
const TABLES: Record<Tab, Table> = {
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
const TAB_LABEL: Record<Tab, [string, string]> = {
  overview: ["Overview", "Vue d’ensemble"],
  inventory: ["Inventory", "Stocks"],
  orders: ["Orders", "Commandes"],
  suppliers: ["Suppliers", "Fournisseurs"],
}
const QUEUE: { id: string; title: [string, string]; sub: [string, string] }[] = [
  { id: "q1", title: ["Reorder 4411", "Réapprovisionner 4411"], sub: ["Supplier lead 9 d", "Délai fournisseur 9 j"] },
  { id: "q2", title: ["Expedite 9312", "Accélérer 9312"], sub: ["Order PO-2291", "Commande PO-2291"] },
  { id: "q3", title: ["Review 2078", "Revoir 2078"], sub: ["Demand +12 %", "Demande +12 %"] },
]

function ErpScreen({ active }: { active: boolean }) {
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
