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
 * The opening: SentrIA in the brand face rises letter by letter, then the word
 * grows through the screen and the dark layer melts away. No lines, no seam.
 * Pure CSS, so it ends itself (visibility: hidden) even if no script runs.
 * Only shown when <html> has .op-run (set before paint by the head script).
 */
export function Opening() {
  return (
    <div className="op" aria-hidden="true">
      <div className="op-bg">
        <Letters />
      </div>
      <div className="op-sub">
        <T s="Operational decision layer" />
      </div>
    </div>
  )
}
