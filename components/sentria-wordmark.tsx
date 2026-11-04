/* Chillax Semibold, set as live text from the self-hosted font file (no glyph outlines). The n and the I are cut halfway with a lime shard, the registered mark sits after the A. */
export function SentriaWordmark() {
  return (
    <svg viewBox="194 439.85 801.95 164.15" className="sw" role="img" aria-label="SentrIA">
      <defs>
        <mask id="sw-cut-n" maskUnits="userSpaceOnUse" x="0" y="0" width="1200" height="900"><rect width="1200" height="900" fill="#fff" /><rect x="433.36" y="546.5" width="34" height="900" fill="#000" /></mask>
        <mask id="sw-cut-I" maskUnits="userSpaceOnUse" x="0" y="0" width="1200" height="900"><rect width="1200" height="900" fill="#fff" /><rect x="717.17" y="526.5" width="34" height="900" fill="#000" /></mask>
      </defs>
      <g fill="var(--cream)" style={{ fontFamily: "Chillax, system-ui, sans-serif", fontWeight: 600 }}>
        <text className="sw-l" style={{ "--i": 0 } as React.CSSProperties} x="195.64" y="594" fontSize="208.91">S</text>
        <text className="sw-l" style={{ "--i": 1 } as React.CSSProperties} x="315.77" y="594" fontSize="208.91">e</text>
        <text className="sw-l" style={{ "--i": 2 } as React.CSSProperties} x="423.36" y="594" fontSize="208.91" mask="url(#sw-cut-n)">n</text>
        <text className="sw-l" style={{ "--i": 3 } as React.CSSProperties} x="549.75" y="594" fontSize="208.91">t</text>
        <text className="sw-l" style={{ "--i": 4 } as React.CSSProperties} x="632.27" y="594" fontSize="208.91">r</text>
        <text className="sw-l" style={{ "--i": 5 } as React.CSSProperties} x="700.17" y="594" fontSize="208.91" mask="url(#sw-cut-I)">I</text>
        <text className="sw-l" style={{ "--i": 6 } as React.CSSProperties} x="753.44" y="594" fontSize="208.91">A</text>
      </g>
        <polygon className="sw-shard" style={{ "--k": 0 } as React.CSSProperties} points="440.36,594 460.36,594 475.36,553 455.36,553" fill="var(--lime)" stroke="var(--ink)" strokeWidth={6} strokeLinejoin="miter" />
        <polygon className="sw-shard" style={{ "--k": 1 } as React.CSSProperties} points="724.17,594 744.17,594 759.17,533 739.17,533" fill="var(--lime)" stroke="var(--ink)" strokeWidth={6} strokeLinejoin="miter" />
        <g className="sw-mark">
          <circle cx="945.75" cy="490.05" r="36.18" fill="none" stroke="var(--cream)" strokeWidth="8.04" />
          <text x="945.75" y="492.46" textAnchor="middle" dominantBaseline="central" fontWeight="600" fontSize="44.22" fill="var(--cream)" style={{ fontFamily: "Chillax, system-ui, sans-serif" }}>R</text>
        </g>
    </svg>
  )
}
