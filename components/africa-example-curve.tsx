import "./africa-example-curve.css"

type Props = {
  kicker?: string
  title: string
  result: string
  lang: "en" | "fr"
}

const DATA = {
  en: {
    nodes: [
      { x: 152, y: 262, label: "Paracetamol", sub: "24k FCFA", active: false },
      { x: 330, y: 175, label: "Amoxicillin", sub: "72k FCFA", active: false },
      { x: 508, y: 88,  label: "Metformin",   sub: "180k FCFA", active: true  },
    ],
    axis: ["Initial stock", "Low priority", "Highest value"],
  },
  fr: {
    nodes: [
      { x: 152, y: 262, label: "Paracétamol",  sub: "24k FCFA",  active: false },
      { x: 330, y: 175, label: "Amoxicilline", sub: "72k FCFA",  active: false },
      { x: 508, y: 88,  label: "Metformine",   sub: "180k FCFA", active: true  },
    ],
    axis: ["Stock initial", "Faible priorité", "Valeur maximale"],
  },
}

const PILL_W = [150, 150, 174] // px, centered on node x

export function AfricaExampleCurve({ kicker, title, result, lang }: Props) {
  const { nodes, axis } = DATA[lang]
  return (
    <div className="afr-ex-band afr-ec" data-rv="rise">
      {kicker && <p className="eyebrow">{kicker}</p>}
      <h3 className="afr-ex-h">{title}</h3>
      <div className="afr-ec-card">
        <svg
          viewBox="0 0 640 340"
          xmlns="http://www.w3.org/2000/svg"
          className="afr-ec-svg"
          aria-hidden="true"
        >
          <defs>
            {/* Curve gradient: blue → neon yellow */}
            <linearGradient id="afr-cg" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="#5A60FF" />
              <stop offset="100%" stopColor="#E8FF50" />
            </linearGradient>

            {/* Glow filter for the curve */}
            <filter id="afr-glow" x="-40%" y="-200%" width="180%" height="500%">
              <feGaussianBlur stdDeviation="6" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Dot-grid pattern */}
            <pattern id="afr-dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="12" cy="12" r="1.2" fill="rgba(255,255,255,0.07)" />
            </pattern>
          </defs>

          {/* Background */}
          <rect width="640" height="340" fill="#050505" />
          <rect width="640" height="340" fill="url(#afr-dots)" />

          {/* Ghost value behind active node */}
          <text
            x="430" y="210"
            fontSize="128" fontWeight="700"
            fill="rgba(232,255,80,0.045)"
            textAnchor="middle"
            fontFamily="var(--f-display, sans-serif)"
          >
            180K
          </text>

          {/* Curve glow pass */}
          <path
            d="M 60 280 C 220 280 440 70 600 70"
            stroke="url(#afr-cg)"
            strokeWidth="10"
            fill="none"
            filter="url(#afr-glow)"
            opacity="0.5"
          />

          {/* Curve sharp pass */}
          <path
            d="M 60 280 C 220 280 440 70 600 70"
            stroke="url(#afr-cg)"
            strokeWidth="2"
            fill="none"
          />

          {/* Nodes */}
          {nodes.map((n, i) => {
            const pw = PILL_W[i]
            const px = n.x - pw / 2
            const py = n.y - 42
            if (n.active) {
              return (
                <g key={i}>
                  {/* Purple-green halo */}
                  <circle cx={n.x} cy={n.y} r="34" fill="rgba(130,0,210,0.12)" />
                  <circle cx={n.x} cy={n.y} r="22" fill="rgba(232,255,80,0.08)" />
                  {/* Dot */}
                  <circle cx={n.x} cy={n.y} r="10" fill="#E8FF50" />
                  <circle cx={n.x} cy={n.y} r="17" fill="none" stroke="#E8FF50" strokeWidth="1.2" opacity="0.45" />
                  {/* Pill */}
                  <rect x={px} y={py} width={pw} height={24} rx="12" fill="rgba(232,255,80,0.14)" stroke="#E8FF50" strokeWidth="1" />
                  <text x={n.x} y={py + 15.5} textAnchor="middle" fontSize="10.5" fill="#E8FF50" fontWeight="600" fontFamily="var(--f-body, sans-serif)">
                    {n.label} · {n.sub}
                  </text>
                </g>
              )
            }
            return (
              <g key={i}>
                <circle cx={n.x} cy={n.y} r="8" fill="#5A60FF" opacity="0.65" />
                <circle cx={n.x} cy={n.y} r="14" fill="none" stroke="#5A60FF" strokeWidth="1" opacity="0.28" />
                {/* Pill */}
                <rect x={px} y={py} width={pw} height={22} rx="11" fill="rgba(90,96,255,0.18)" stroke="#5A60FF" strokeWidth="0.7" />
                <text x={n.x} y={py + 14} textAnchor="middle" fontSize="10" fill="#8891FF" fontFamily="var(--f-body, sans-serif)">
                  {n.label} · {n.sub}
                </text>
              </g>
            )
          })}

          {/* Axis labels */}
          {nodes.map((n, i) => (
            <text key={i} x={n.x} y={318} textAnchor="middle" fontSize="10" fill="rgba(255,255,255,0.35)" fontFamily="var(--f-body, sans-serif)">
              {axis[i]}
            </text>
          ))}
        </svg>
      </div>
      <p className="afr-ex-res">{result}</p>
    </div>
  )
}
