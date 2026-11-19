/** Speed lines trailing behind one orbiting bubble. Drawn once on a circle; the circle is rotated, then squashed into the ellipse. */
const ARCS = [
  { r: 94, op: 0.55, len: 52, w: 1.2, c: "#111" },
  { r: 97, op: 0.75, len: 78, w: 1.3, c: "#111" },
  { r: 100, op: 1, len: 100, w: 2.2, c: "#8fb81f" },
  { r: 103, op: 0.75, len: 70, w: 1.3, c: "#111" },
  { r: 106, op: 0.5, len: 46, w: 1.2, c: "#111" },
]
const SEGMENTS = 12

const at = (r: number, deg: number) => {
  const a = (deg * Math.PI) / 180
  return `${(r * Math.cos(a)).toFixed(2)} ${(r * Math.sin(a)).toFixed(2)}`
}

const LINES = ARCS.flatMap((arc) =>
  Array.from({ length: SEGMENTS }, (_, i) => {
    const f = 1 - i / SEGMENTS
    return {
      key: `${arc.r}-${i}`,
      d: `M${at(arc.r, -(i / SEGMENTS) * arc.len)} L${at(arc.r, -((i + 1) / SEGMENTS) * arc.len)}`,
      stroke: arc.c,
      opacity: +(arc.op * f * f * 0.55).toFixed(3),
      width: arc.w,
    }
  }),
)

export function CapabilityTrail() {
  return (
    <svg viewBox="-110 -110 220 220" width="100%" height="100%" aria-hidden="true" overflow="visible">
      {LINES.map((l) => (
        <path
          key={l.key}
          d={l.d}
          stroke={l.stroke}
          strokeOpacity={l.opacity}
          strokeWidth={l.width}
          strokeLinecap="round"
          fill="none"
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  )
}
