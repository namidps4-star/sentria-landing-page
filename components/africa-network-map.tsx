import "./africa-network-map.css"

/* The worked example of the wholesaler page as a map and nothing else: a title, the city map and one result
   line. The map is the picture supplied for this page (public/africa-city-map.jpg), shown as it is. Three
   pharmacies are marked on it from the example: the blue dot in the picture is Pharmacie Centrale, Clinique du
   Nord is an orange dot, and Pharmacie du Port is another. Coordinates are in the picture's own 1080 x 1920. */
const W = 1080
const H = 1920
const FROM = [905, 1132]
const TO = [835, 403]
const PORT = [85, 1360]
const LINE = `M${FROM[0]} ${FROM[1]} C${FROM[0] + 40} ${FROM[1] - 260},${TO[0] + 90} ${TO[1] + 330},${TO[0]} ${TO[1]}`

export function MapHero({ kicker, title, result, lang }: { kicker?: string; title: string; result: string; lang: "en" | "fr" }) {
  const t =
    lang === "en"
      ? { from: ["Pharmacie Centrale", "34 unsold"], to: ["Clinique du Nord", "reordering 30"], port: ["Pharmacie du Port", "2 days left"], alt: "Map of a pharmacy network with three pharmacies marked" }
      : { from: ["Pharmacie Centrale", "34 invendues"], to: ["Clinique du Nord", "recommande 30"], port: ["Pharmacie du Port", "2 jours restants"], alt: "Carte d'un réseau de pharmacies avec trois pharmacies repérées" }
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
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/africa-city-map.jpg" alt={t.alt} width={W} height={H} />
        <svg viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
          <path className="flow" pathLength={1} d={LINE} fill="none" />
          <circle className="runner" r="9" style={{ offsetPath: `path("${LINE}")` }} />
          <g className="pt port">
            <circle className="ring" cx={PORT[0]} cy={PORT[1]} r="14" />
            <circle cx={PORT[0]} cy={PORT[1]} r="14" />
            <text x={PORT[0] + 28} y={PORT[1] - 6}>{t.port[0]}</text>
            <text x={PORT[0] + 28} y={PORT[1] + 28} className="v">{t.port[1]}</text>
          </g>
          <g className="pt from">
            <circle cx={FROM[0]} cy={FROM[1]} r="14" />
            <text x={FROM[0] - 28} y={FROM[1] + 56} textAnchor="end">{t.from[0]}</text>
            <text x={FROM[0] - 28} y={FROM[1] + 90} textAnchor="end" className="v">{t.from[1]}</text>
          </g>
          <g className="pt to">
            <circle className="ring" cx={TO[0]} cy={TO[1]} r="14" />
            <circle cx={TO[0]} cy={TO[1]} r="14" />
            <text x={TO[0] - 28} y={TO[1] - 40} textAnchor="end">{t.to[0]}</text>
            <text x={TO[0] - 28} y={TO[1] - 6} textAnchor="end" className="v">{t.to[1]}</text>
          </g>
        </svg>
      </figure>
    </div>
  )
}
