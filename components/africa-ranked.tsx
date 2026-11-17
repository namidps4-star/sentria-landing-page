import "./africa-ranked.css"

/* Three transfers on one rising line, the biggest last and in lime. The line draws itself and the points
   appear in turn once the ledger row gets data-in. Labels: [name, value] three times, smallest first. */
const POINTS = [
  { x: 22, y: 76 },
  { x: 50, y: 55 },
  { x: 76, y: 34 },
]

export function RankedLine({ labels }: { labels: string[] }) {
  const rows = POINTS.map((p, i) => ({ ...p, name: labels[i * 2] ?? "", value: labels[i * 2 + 1] ?? "" }))
  const top = rows[2]
  return (
    <div className="afr-rk" role="img" aria-label={rows.map((r) => `${r.name} ${r.value}`).join(", ")}>
      <span className="afr-rk-ghost" aria-hidden="true">{top.value}</span>
      <svg viewBox="0 0 400 200" preserveAspectRatio="none" aria-hidden="true" style={{ height: "100%" }}>
        <path
          pathLength={1}
          d="M88 152 C140 152,150 110,200 110 C255 110,250 68,304 68"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      {rows.map((r, i) => (
        <div key={r.name} className={`afr-rk-pt${i === 2 ? " top" : ""}`} style={{ left: `${r.x}%`, top: `${r.y}%`, "--p": i } as React.CSSProperties}>
          <i />
          <span>
            <em>{r.name}</em>
            <b>{r.value}</b>
          </span>
        </div>
      ))}
    </div>
  )
}
