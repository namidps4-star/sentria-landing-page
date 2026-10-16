import { T } from "./t"

const WORD = "SentrIA"

function Letters() {
  return (
    <div className="op-word">
      {[...WORD].map((c, i) => (
        <span key={i} className="op-l" style={{ animationDelay: `${0.25 + i * 0.12}s` }}>
          {c}
        </span>
      ))}
    </div>
  )
}

/**
 * The opening: SentrIA in the brand face, split at the seam, then the two
 * halves part like a cinema curtain and the screen is gone. Pure CSS, so it
 * cannot get stuck: it ends itself (visibility: hidden) even if no script runs.
 * Only shown when <html> has .op-run (set before paint by the head script).
 */
export function Opening() {
  return (
    <div className="op" aria-hidden="true">
      <div className="op-half op-left">
        <Letters />
      </div>
      <div className="op-half op-right">
        <Letters />
      </div>
      <div className="op-seam" />
      <div className="op-sub">
        <T s="Operational decision layer" />
      </div>
    </div>
  )
}
