import "./africa-network-map.css"

/* An abstract road map of a pharmacy network on a dark ground: a few main roads, a mesh of small streets and
   a dot for each pharmacy. The two pharmacies in the transfer are marked and joined by a lime line. The roads
   are drawn from a fixed seed, so the picture is the same on every build. It is not a real city. */
function rng(seed: number) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const W = 1440
const H = 640
const r = rng(7)

/* a smooth path through points (Catmull-Rom turned into cubic curves) */
function smooth(pts: number[][]) {
  let d = `M${pts[0][0].toFixed(0)} ${pts[0][1].toFixed(0)}`
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[i + 2] ?? p2
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6]
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6]
    d += `C${c1[0].toFixed(0)} ${c1[1].toFixed(0)},${c2[0].toFixed(0)} ${c2[1].toFixed(0)},${p2[0].toFixed(0)} ${p2[1].toFixed(0)}`
  }
  return d
}

/* main roads: left to right and top to bottom, each with a few bends */
const MAIN: number[][][] = []
for (let i = 0; i < 6; i++) {
  const y0 = 40 + i * 110 + r() * 40
  MAIN.push(Array.from({ length: 6 }, (_, k) => [-40 + k * (W / 4.6), y0 + (r() - 0.5) * 160]))
}
for (let i = 0; i < 5; i++) {
  const x0 = 120 + i * 300 + r() * 80
  MAIN.push(Array.from({ length: 5 }, (_, k) => [x0 + (r() - 0.5) * 200, -40 + k * (H / 3.6)]))
}

/* small streets: short bent lines scattered across the map */
const STREETS: string[] = []
const SPOTS: number[][] = []
for (let i = 0; i < 420; i++) {
  const x = r() * W
  const y = r() * H
  const a = r() * Math.PI * 2
  const len = 40 + r() * 120
  const pts = [[x, y]]
  let cx = x
  let cy = y
  let ang = a
  for (let k = 0; k < 3; k++) {
    ang += (r() - 0.5) * 1.1
    cx += Math.cos(ang) * (len / 3)
    cy += Math.sin(ang) * (len / 3)
    pts.push([cx, cy])
  }
  STREETS.push(smooth(pts))
  if (i % 4 === 0) SPOTS.push([cx, cy])
}

const FROM = [900, 330]
const TO = [1190, 150]
const PORT = [520, 430]
const LINE = `M${FROM[0]} ${FROM[1]} C${FROM[0] + 110} ${FROM[1] - 30},${TO[0] - 140} ${TO[1] + 110},${TO[0]} ${TO[1]}`

export function NetworkMap({ lang }: { lang: "en" | "fr" }) {
  const from = lang === "en" ? ["Pharmacie Centrale", "34 unsold"] : ["Pharmacie Centrale", "34 invendues"]
  const to = lang === "en" ? ["Clinique du Nord", "reordering 30"] : ["Clinique du Nord", "recommande 30"]
  const port = lang === "en" ? ["Pharmacie du Port", "2 days left"] : ["Pharmacie du Port", "2 jours restants"]
  return (
    <div className="afr-nm" aria-hidden="true">
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice">
        <g className="streets">
          {STREETS.map((d, i) => (
            <path key={i} d={d} />
          ))}
        </g>
        <g className="main">
          {MAIN.map((p, i) => (
            <path key={i} d={smooth(p)} />
          ))}
        </g>
        <g className="shops">
          {SPOTS.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="4.5" style={{ "--d": `${(i % 12) * 140}ms` } as React.CSSProperties} />
          ))}
        </g>
        <path className="flow" pathLength={1} d={LINE} fill="none" />
        <circle className="runner" r="6" style={{ offsetPath: `path("${LINE}")` }} />
        <g className="end port">
          <circle cx={PORT[0]} cy={PORT[1]} r="9" />
          <text x={PORT[0] - 18} y={PORT[1] + 34} textAnchor="start">{port[0]}</text>
          <text x={PORT[0] - 18} y={PORT[1] + 56} textAnchor="start" className="v">{port[1]}</text>
        </g>
        <g className="end from">
          <circle cx={FROM[0]} cy={FROM[1]} r="9" />
          <text x={FROM[0] - 18} y={FROM[1] + 34} textAnchor="start">{from[0]}</text>
          <text x={FROM[0] - 18} y={FROM[1] + 56} textAnchor="start" className="v">{from[1]}</text>
        </g>
        <g className="end to">
          <circle className="ring" cx={TO[0]} cy={TO[1]} r="10" />
          <circle cx={TO[0]} cy={TO[1]} r="10" />
          <text x={TO[0] + 20} y={TO[1] - 8} textAnchor="start">{to[0]}</text>
          <text x={TO[0] + 20} y={TO[1] + 14} textAnchor="start" className="v">{to[1]}</text>
        </g>
      </svg>
    </div>
  )
}

/* The worked example of the wholesaler page as a map and nothing else: a title, the map, one result line. */
export function MapHero({ kicker, title, result, lang }: { kicker?: string; title: string; result: string; lang: "en" | "fr" }) {
  return (
    <div className="afr-mh" data-rv="rise">
      {kicker && <p className="eyebrow">{kicker}</p>}
      <h3>{title}</h3>
      <NetworkMap lang={lang} />
      <p className="afr-mh-res">{result}</p>
    </div>
  )
}
