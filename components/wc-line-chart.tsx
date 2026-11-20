import type { CSSProperties } from "react"

/* One line chart for the wholesale cards: a smooth line drawn in, an optional likely-range band,
   an optional shaded safe range with a wave, and one marked point with its tooltip.
   Coordinates come from the data, so nothing is hand-placed. */

type Props = {
  values: number[]
  forecast?: { values: number[]; low: number[]; high: number[] }
  yTicks: number[]
  xLabels: { at: number; text: string }[]
  mark?: { at: number; label: string; sub: string }
  band?: { lo: number; hi: number; wave?: boolean }
  yMin: number
  yMax: number
  ariaLabel: string
}

const W = 960
const H = 260
const PAD = { l: 40, r: 24, t: 20, b: 36 }

/* Catmull-Rom through the points, as cubic Bézier segments. */
function smooth(pts: [number, number][]): string {
  if (pts.length < 2) return ""
  let d = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[i + 2] ?? p2
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6]
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6]
    d += ` C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`
  }
  return d
}

export function WcLineChart({ values, forecast, yTicks, xLabels, mark, band, yMin, yMax, ariaLabel }: Props) {
  const n = values.length + (forecast?.values.length ?? 0)
  const plotW = W - PAD.l - PAD.r
  const plotH = H - PAD.t - PAD.b
  const x = (i: number) => PAD.l + (i / (n - 1)) * plotW
  const y = (v: number) => PAD.t + (1 - (v - yMin) / (yMax - yMin)) * plotH
  const pt = (i: number, v: number): [number, number] => [x(i), y(v)]
  const salesPts = values.map((v, i) => pt(i, v))
  const last = values.length - 1
  const fcPts: [number, number][] = forecast ? [pt(last, values[last]), ...forecast.values.map((v, k) => pt(last + 1 + k, v))] : []
  const upper: [number, number][] = forecast ? [pt(last, values[last]), ...forecast.high.map((v, k) => pt(last + 1 + k, v))] : []
  const lower: [number, number][] = forecast ? [pt(last, values[last]), ...forecast.low.map((v, k) => pt(last + 1 + k, v))] : []
  const rev = [...lower].reverse()
  const bandPath = forecast
    ? `${smooth(upper)} ${smooth(rev).replace(/^M[^C]*/, `L${rev[0][0].toFixed(1)} ${rev[0][1].toFixed(1)}`)} Z`
    : ""
  const markX = mark ? x(mark.at) : 0
  const markY = mark ? y(values[mark.at] ?? values[last]) : 0
  const bandTop = band ? y(band.hi) : 0
  const bandBottom = band ? y(band.lo) : 0
  const style = { "--n": n } as CSSProperties
  return (
    <div className="wc-chart" style={style}>
      {mark && (
        <div className="wc-tip" style={{ left: `${(markX / W) * 100}%`, top: `${(markY / H) * 100}%` }}>
          {mark.label}
          <small>{mark.sub}</small>
        </div>
      )}
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={ariaLabel}>
        {yTicks.map((t) => (
          <g key={t}>
            <line className="wc-grid" x1={PAD.l} x2={W - PAD.r} y1={y(t)} y2={y(t)} />
            <text className="wc-ax" x={0} y={y(t) + 4}>
              {t}
            </text>
          </g>
        ))}
        {band && (
          <g clipPath="url(#wc-band-clip)">
            <rect className="wc-band-fill" x={PAD.l} y={bandTop} width={plotW} height={bandBottom - bandTop} />
            {band.wave && (
              <>
                <path className="wc-wave w1" d={waveD(bandTop + 6, 9)} />
                <path className="wc-wave w2" d={waveD(bandTop + 16, 7)} />
              </>
            )}
          </g>
        )}
        {band && (
          <clipPath id="wc-band-clip">
            <rect x={PAD.l} y={bandTop} width={plotW} height={bandBottom - bandTop} />
          </clipPath>
        )}
        {forecast && <path className="wc-range" d={bandPath} />}
        <path className="wc-sales" pathLength={1} d={smooth(salesPts)} />
        {forecast && <path className="wc-fc" d={smooth(fcPts)} />}
        {mark && <circle className="wc-dot" cx={markX} cy={markY} r={7} />}
        {xLabels.map((l) => (
          <text key={l.at} className="wc-ax" x={x(l.at)} y={H - 6} textAnchor="middle">
            {l.text}
          </text>
        ))}
      </svg>
    </div>
  )
}

/* One period of a wave, repeated across the plot; the layer scrolls by one period. */
function waveD(baseY: number, amp: number): string {
  const step = 120
  let d = `M${PAD.l - 240} ${baseY} Q${PAD.l - 180} ${baseY - amp} ${PAD.l - 120} ${baseY}`
  for (let xx = PAD.l - 120 + step; xx <= W + 240; xx += step) d += ` T${xx} ${baseY}`
  return d + ` V${H} H${PAD.l - 240} Z`
}
