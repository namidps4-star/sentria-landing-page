import "./africa-network-map.css"

/* The worked example of the wholesaler page as a map and nothing else: a title, the city map and one result
   line. The map is the picture supplied for this page (public/africa-city-map.jpg), shown as it is. Three
   pharmacies are marked on it from the example: the blue dot in the picture is Pharmacie Centrale, Clinique du
   Nord is an orange dot, and Pharmacie du Port is another. Coordinates are in the picture's own 1080 x 1920. */
const W = 1080
const H = 1920
const CROP = [300, 1200] /* the part of the picture that is shown: top and height */
const FROM = [905, 1132]
const TO = [835, 403]
const PORT = [85, 1360]
const MID = [919, 794]
const LINE = `M${FROM[0]} ${FROM[1]} C${FROM[0] + 40} ${FROM[1] - 260},${TO[0] + 90} ${TO[1] + 330},${TO[0]} ${TO[1]}`

/* a label with a dark fill so it reads on top of the streets */
function Pill({ x, y, anchor, a, b, kind }: { x: number; y: number; anchor: "start" | "end"; a: string; b: string; kind: string }) {
  const w = Math.max(a.length * 19, b.length * 17) + 44
  const h = 92
  const left = anchor === "start" ? x : x - w
  return (
    <g className={`pill ${kind}`}>
      <rect x={left} y={y - h / 2} width={w} height={h} rx="26" />
      <text x={left + 22} y={y - 6}>{a}</text>
      <text x={left + 22} y={y + 28} className="v">{b}</text>
    </g>
  )
}

export function MapHero({ kicker, title, result, lang }: { kicker?: string; title: string; result: string; lang: "en" | "fr" }) {
  const t =
    lang === "en"
      ? { from: ["Pharmacie Centrale", "34 unsold"], to: ["Clinique du Nord", "reordering 30"], port: ["Pharmacie du Port", "2 days left"], move: ["Move 30 units", "instead of a new order"], alt: "Map of a pharmacy network with three pharmacies marked" }
      : { from: ["Pharmacie Centrale", "34 invendues"], to: ["Clinique du Nord", "recommande 30"], port: ["Pharmacie du Port", "2 jours restants"], move: ["Déplacer 30 unités", "au lieu d'une commande"], alt: "Carte d'un réseau de pharmacies avec trois pharmacies repérées" }
  return (
    <div className="afr-mh" data-rv="rise">
      <div className="afr-mh-copy">
        {kicker && <p className="eyebrow">{kicker}</p>}
        <h3>{title}</h3>
        <p className="afr-mh-res">{result}</p>
        <ul className="afr-mh-key">
          <li className="p"><i />{t.port[0]}, {t.port[1]}</li>
          <li className="f"><i />{t.from[0]}, {t.from[1]}</li>
          <li className="t"><i />{t.to[0]}, {t.to[1]}</li>
        </ul>
      </div>
      <figure className="afr-mh-map">
        <svg viewBox={`0 ${CROP[0]} ${W} ${CROP[1]}`} role="img" aria-label={t.alt}>
          <defs>
            <radialGradient id="afr-mh-fade">
              <stop offset=".62" stopColor="#fff" />
              <stop offset="1" stopColor="#000" />
            </radialGradient>
            <mask id="afr-mh-mask" maskUnits="userSpaceOnUse" x="0" y={CROP[0]} width={W} height={CROP[1]}>
              <rect x="0" y={CROP[0]} width={W} height={CROP[1]} fill="url(#afr-mh-fade)" />
            </mask>
          </defs>
          <image href="/africa-city-map.jpg" x="0" y="0" width={W} height={H} mask="url(#afr-mh-mask)" className="pic" />
          <path className="flow" pathLength={1} d={LINE} fill="none" />
          <circle className="runner" r="11" style={{ offsetPath: `path("${LINE}")` }} />
          <Pill x={MID[0] - 34} y={MID[1]} anchor="end" a={t.move[0]} b={t.move[1]} kind="move" />
          <g className="pt port">
            <circle className="ring" cx={PORT[0]} cy={PORT[1]} r="20" />
            <circle cx={PORT[0]} cy={PORT[1]} r="20" />
          </g>
          <Pill x={PORT[0] + 38} y={PORT[1]} anchor="start" a={t.port[0]} b={t.port[1]} kind="port" />
          <g className="pt from">
            <circle cx={FROM[0]} cy={FROM[1]} r="20" />
          </g>
          <Pill x={FROM[0] - 38} y={FROM[1] + 70} anchor="end" a={t.from[0]} b={t.from[1]} kind="from" />
          <g className="pt to">
            <circle className="ring" cx={TO[0]} cy={TO[1]} r="20" />
            <circle cx={TO[0]} cy={TO[1]} r="20" />
          </g>
          <Pill x={TO[0] - 38} y={TO[1] - 30} anchor="end" a={t.to[0]} b={t.to[1]} kind="to" />
        </svg>
      </figure>
    </div>
  )
}
