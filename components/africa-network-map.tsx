import "./africa-network-map.css"

/* The worked example of the wholesaler page as a map and nothing else. The map is the picture supplied for
   this page (public/africa-city-map.jpg). Three pharmacies are pinned on it, each with a leader line and a small
   readout panel, like the callouts of a film HUD. When the section scrolls into view the pins drop, the leaders
   draw, the panels switch on, then the 30 units travel from Pharmacie Centrale to Clinique du Nord. All
   coordinates are in the picture's own 1080 x 1920. */
const W = 1080
const H = 1920
const CROP = [330, 1090] /* the part of the picture that is shown: top and height */
const PW = 430
const PH = 190
const FROM = [905, 1132]
const TO = [835, 403]
const PORT = [85, 1360]
const MID = [919, 794]
const LINE = `M${FROM[0]} ${FROM[1]} C${FROM[0] + 40} ${FROM[1] - 260},${TO[0] + 90} ${TO[1] + 330},${TO[0]} ${TO[1]}`

const TEXT = {
  en: {
    from: { name: "Pharmacie Centrale", sub: "Unsold stock", l1: "Units unsold", l2: "Transfer", then: "4" },
    to: { name: "Clinique du Nord", sub: "Reordering", l1: "Units reordered", l2: "Product" },
    port: { name: "Pharmacie du Port", sub: "Stock left", l1: "Days left", l2: "Next delivery" },
    move: ["Move 30 units", "instead of a new order"],
    alt: "Map of a pharmacy network with three pharmacies pinned",
  },
  fr: {
    from: { name: "Pharmacie Centrale", sub: "Stock invendu", l1: "Unités invendues", l2: "Transfert", then: "4" },
    to: { name: "Clinique du Nord", sub: "Recommande", l1: "Unités recommandées", l2: "Produit" },
    port: { name: "Pharmacie du Port", sub: "Stock restant", l1: "Jours restants", l2: "Prochaine livraison" },
    move: ["Déplacer 30 unités", "au lieu d'une commande"],
    alt: "Carte d'un réseau de pharmacies avec trois pharmacies repérées",
  },
}

type Panel = { name: string; sub: string; l1: string; v1: string; v1b?: string; l2: string; v2: string; dots: "from" | "to" | "days"; icon: "cross" | "gear" | "clock" }

const TRAFFIC = { en: "data traffic", fr: "données" }

/* One callout, built like a film HUD readout: a thin leader from the pin runs along the panel; the panel has a
   vertical label strip, a title with a sub-title and an icon box, two boxed readings and a block of unit dots. */
function Callout({ id, x, y, side, vert, delay, p, lang }: { id: string; x: number; y: number; side: "left" | "right"; vert: "above" | "below"; delay: number; p: Panel; lang: "en" | "fr" }) {
  const dir = side === "left" ? -1 : 1
  const px = dir === -1 ? -(40 + PW) : 40
  const py = vert === "above" ? -PH : 0
  const far = dir * (40 + PW)
  const cells = Array.from({ length: 36 }, (_, i) => i)
  /* the panel tilts in perspective: its far end rises, turning on the corner nearest the pin */
  const ang = dir === -1 ? 4 : -4
  const ox = dir === -1 ? px + PW : px
  const oy = vert === "above" ? py + PH : py
  const tilt = `translate(${ox} ${oy}) skewY(${ang}) translate(${-(dir === -1 ? PW : 0)} ${-(vert === "above" ? PH : 0)})`
  return (
    <g className={`co ${id}`} style={{ "--t": `${delay}s` } as React.CSSProperties}>
      <g transform={`translate(${x} ${y})`}>
        <line className="lead" x1="0" y1="0" x2={far} y2="0" pathLength={1} />
        <circle className="endcap" cx={far} cy="0" r="6" />
        <g className="panel" transform={tilt}>
          <rect className="bg" width={PW} height={PH} />
          <line className="thin" x1="38" y1="0" x2="38" y2={PH} />
          <text className="vert" transform={`translate(24 ${PH - 14}) rotate(-90)`}>{TRAFFIC[lang]}</text>
          <rect className="gauge" x="12" y="18" width="12" height="56" />
          <rect className="gaugefill" x="12" y="40" width="12" height="34" />
          <text className="nm" x="54" y="42">{p.name}</text>
          <text className="sb" x="54" y="68">{p.sub}</text>
          <rect className="icon" x={PW - 118} y="16" width="96" height="56" rx="18" />
          {p.icon === "cross" && <path className="ico" d={`M${PW - 70} 30v28M${PW - 84} 44h28`} />}
          {p.icon === "gear" && <path className="ico" d={`M${PW - 70} 32v24M${PW - 82} 44h24M${PW - 80} 34l20 20M${PW - 60} 34l-20 20`} />}
          {p.icon === "clock" && <path className="ico" d={`M${PW - 70} 32v12l10 8`} />}
          <line className="thin" x1="38" y1="84" x2={PW} y2="84" />
          <text className="lb" x="54" y="112">{p.l1}</text>
          <rect className="box" x="54" y="120" width="96" height="46" />
          <text className="val n1" x="66" y="156">{p.v1}</text>
          {p.v1b && <text className="val n2" x="66" y="156">{p.v1b}</text>}
          <text className="lb" x="54" y={PH - 7}>{p.l2} <tspan className="v2">{p.v2}</tspan></text>
          <rect className="mesh" x={PW - 190} y="98" width="170" height="80" />
          {p.dots !== "days" ? (
            <g className={`dots ${p.dots}`} transform={`translate(${PW - 182} 106)`}>
              {cells.map((i) => {
                const r = Math.floor(i / 12)
                const c = i % 12
                const lit = p.dots === "from" ? (i < 34 ? (i < 4 ? "keep" : "go") : "off") : i < 30 ? "come" : "off"
                return <circle key={i} className={lit} cx={c * 13.5 + 6} cy={r * 22 + 8} r="5.2" style={{ "--k": i } as React.CSSProperties} />
              })}
            </g>
          ) : (
            <g className="dots days" transform={`translate(${PW - 182} 124)`}>
              {Array.from({ length: 7 }, (_, i) => (
                <circle key={i} className={i < 2 ? "on" : "off"} cx={i * 22 + 10} cy="10" r="8" />
              ))}
            </g>
          )}
        </g>
      </g>
    </g>
  )
}

export function MapHero({ kicker, title, result, lang }: { kicker?: string; title: string; result: string; lang: "en" | "fr" }) {
  const t = TEXT[lang]
  return (
    <div className="afr-mh" data-rv="rise">
      <div className="afr-mh-copy">
        {kicker && <p className="eyebrow">{kicker}</p>}
        <h3>{title}</h3>
        <p className="afr-mh-res">{result}</p>
      </div>
      <figure className="afr-mh-map">
        <svg viewBox={`0 ${CROP[0]} ${W} ${CROP[1]}`} role="img" aria-label={t.alt}>
          <defs>
            <radialGradient id="afr-mh-fade">
              <stop offset=".62" stopColor="#fff" />
              <stop offset="1" stopColor="#000" />
            </radialGradient>
            <pattern id="afr-mh-hatch" width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="12" stroke="#f5f3ea" strokeOpacity=".28" strokeWidth="1.5" />
            </pattern>
            <mask id="afr-mh-mask" maskUnits="userSpaceOnUse" x="0" y={CROP[0]} width={W} height={CROP[1]}>
              <rect x="0" y={CROP[0]} width={W} height={CROP[1]} fill="url(#afr-mh-fade)" />
            </mask>
          </defs>
          <image href="/africa-city-map.jpg" x="0" y="0" width={W} height={H} mask="url(#afr-mh-mask)" className="pic" />

          <Callout id="port" x={PORT[0]} y={PORT[1]} side="right" vert="above" delay={0.4} lang={lang} p={{ name: t.port.name, sub: t.port.sub, l1: t.port.l1, v1: "2", l2: t.port.l2, v2: lang === "en" ? "5 days" : "5 jours", dots: "days", icon: "clock" }} />
          <Callout id="from" x={FROM[0]} y={FROM[1]} side="left" vert="above" delay={1.1} lang={lang} p={{ name: t.from.name, sub: t.from.sub, l1: t.from.l1, v1: "34", v1b: t.from.then, l2: t.from.l2, v2: lang === "en" ? "30 units" : "30 unités", dots: "from", icon: "cross" }} />
          <Callout id="to" x={TO[0]} y={TO[1]} side="left" vert="below" delay={1.8} lang={lang} p={{ name: t.to.name, sub: t.to.sub, l1: t.to.l1, v1: "30", l2: t.to.l2, v2: "Metformin 500mg", dots: "to", icon: "gear" }} />

          <path className="flow" pathLength={1} d={LINE} fill="none" />
          <circle className="runner" r="11" style={{ offsetPath: `path("${LINE}")` }} />
          <g className="move" transform={`translate(${MID[0] - 34 - 360} ${MID[1] - 46})`}>
            <rect width="360" height="92" rx="26" />
            <text x="22" y="40">{t.move[0]}</text>
            <text x="22" y="72" className="v">{t.move[1]}</text>
          </g>

          {[PORT, FROM, TO].map(([x, y], i) => (
            <g key={i} className={`pin ${i === 0 ? "port" : i === 1 ? "from" : "to"}`}>
              <circle className="ring" cx={x} cy={y} r="12" />
              <circle className="core" cx={x} cy={y} r="8" />
            </g>
          ))}
        </svg>
      </figure>
    </div>
  )
}
