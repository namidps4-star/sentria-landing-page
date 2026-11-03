/* Restcal outlines on a 1200 x 900 grid: the n and the I are cut halfway and given a lime shard. */
export function SentriaWordmark() {
  return (
    <svg viewBox="0 0 1200 900" className="sw" role="img" aria-label="SentrIA">
      <defs>
        <mask id="sw-cut-n" maskUnits="userSpaceOnUse" x="0" y="0" width="1200" height="900"><rect width="1200" height="900" fill="#fff" /><rect x="431.74" y="531.51" width="33" height="900" fill="#000" /></mask>
        <mask id="sw-cut-I" maskUnits="userSpaceOnUse" x="0" y="0" width="1200" height="900"><rect width="1200" height="900" fill="#fff" /><rect x="725.01" y="515.3" width="32" height="900" fill="#000" /></mask>
      </defs>
        <g className="sw-l" style={{ "--i": 0 } as React.CSSProperties}><path d={"M236.25 478.66C236.25 470.92 242.7 462.15 256.64 462.15C278.05 462.15 294.05 482.02 294.05 482.02V455.18C294.05 455.18 280.63 438.15 253.8 438.15C228.77 438.15 209.42 453.12 209.42 477.89C209.42 523.3 275.47 524.85 275.47 555.3C275.47 567.17 265.41 573.1 253.8 573.1C230.32 573.1 205.81 549.62 205.81 549.62V580.07C205.81 580.07 225.42 598.13 254.31 598.13C278.57 598.13 300.76 585.23 300.76 557.36C300.76 509.63 236.25 503.95 236.25 478.66Z"} fill="var(--cream)" /></g>
        <g className="sw-l" style={{ "--i": 1 } as React.CSSProperties}><path d={"M369.65 469.38C329.4 469.38 311.08 497.76 311.08 527.43C311.08 539.3 314.43 549.62 319.85 557.88L354.94 594.52H391.58L347.98 547.56C346.94 546.27 341.78 540.59 340.24 538.78H418.93C422.29 498.53 408.87 469.38 369.65 469.38ZM369.65 495.69C385.39 495.69 393.9 507.56 392.87 519.95H342.04C343.07 512.46 350.81 495.69 369.65 495.69Z"} fill="var(--cream)" /></g>
        <g className="sw-l" style={{ "--i": 2 } as React.CSSProperties}><path d={"M486.53 495.95C502.53 496.21 508.72 501.89 508.72 516.08V594H537.36V506.53C537.36 487.18 524.72 471.44 497.11 471.44L434.16 471.18V594H462.8V495.95Z"} fill="var(--cream)" mask="url(#sw-cut-n)" /></g>
        <g className="sw-l" style={{ "--i": 3 } as React.CSSProperties}><path d={"M623.29 568.2C623.29 568.2 616.84 572.07 607.81 572.07C598.77 572.07 593.1 566.39 593.1 557.36V494.66H619.16V471.18H593.1V440.22H590.26L549.75 487.69V494.66H564.2V559.94C564.2 579.81 577.36 595.81 600.32 595.81C612.45 595.81 623.29 591.42 623.29 591.42Z"} fill="var(--cream)" /></g>
        <g className="sw-l" style={{ "--i": 4 } as React.CSSProperties}><path d={"M686.24 470.67C650.64 469.89 633.35 486.66 633.35 519.43V594H662.25C662.25 594 661.99 536.72 661.99 518.66C661.99 506.79 666.38 496.98 685.99 496.98C699.14 496.98 716.43 501.37 716.43 501.37V475.05C716.43 475.05 702.5 470.92 686.24 470.67Z"} fill="var(--cream)" /></g>
        <g className="sw-l" style={{ "--i": 5 } as React.CSSProperties}><path d={"M726.5 440.22V594H755.39V440.22Z"} fill="var(--cream)" mask="url(#sw-cut-I)" /></g>
        <g className="sw-l" style={{ "--i": 6 } as React.CSSProperties}><path d={"M768.04 594H797.45L805.45 563.55H857.83L865.83 594H895.24L852.67 440.22H810.61ZM810.87 541.11 831.51 460.86 852.41 541.11Z"} fill="var(--cream)" /></g>
        <polygon className="sw-shard" style={{ "--k": 0 } as React.CSSProperties} points="433.74,594 462.74,594 486.35,538.01 457.35,538.01" fill="var(--lime)" stroke="var(--ink)" strokeWidth={6} strokeLinejoin="miter" />
        <polygon className="sw-shard" style={{ "--k": 1 } as React.CSSProperties} points="727.01,594 755.01,594 778.62,521.8 750.62,521.8" fill="var(--lime)" stroke="var(--ink)" strokeWidth={6} strokeLinejoin="miter" />
        <g className="sw-mark">
          <circle cx="945.75" cy="476.81" r="36.18" fill="none" stroke="var(--cream)" strokeWidth="8.04" />
          <text x="945.75" y="479.22" textAnchor="middle" dominantBaseline="central" fontWeight="700" fontSize="44.22" fill="var(--cream)" style={{ fontFamily: "var(--f-body), system-ui, sans-serif" }}>R</text>
        </g>
    </svg>
  )
}
