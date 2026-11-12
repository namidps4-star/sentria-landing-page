import type { RefObject } from "react"

const TINTS = [
  { rgb: "52,224,158", a: 0.7 },
  { rgb: "255,104,190", a: 0.68 },
  { rgb: "224,168,120", a: 0.4 },
]
const FADE = [1, 0.72, 0.44, 0.22, 0.07, 0]
const tint = ({ rgb, a }: { rgb: string; a: number }) =>
  `radial-gradient(24% 24%, ${FADE.map((f, i) => `rgba(${rgb},${+(a * f).toFixed(3)}) ${i * 20}%`).join(", ")})`

/**
 * The markup of the glass: the filter, the magnified copy (filled in by hero-fx.tsx), three soft colour
 * tints near the rim, the highlights, and the rim itself. Sizes and motion come from lens-glass.ts.
 */
export function LensGlass({ worldRef, defsRef }: { worldRef: RefObject<HTMLDivElement | null>; defsRef: RefObject<SVGSVGElement | null> }) {
  return (
    <>
      <svg className="lg-defs" ref={defsRef} width="0" height="0" aria-hidden="true" focusable="false">
        <defs>
          <filter id="hero-lens-glass" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feImage preserveAspectRatio="none" result="map" />
            <feDisplacementMap in="SourceGraphic" in2="map" xChannelSelector="R" yChannelSelector="G" result="dr" />
            <feColorMatrix in="dr" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="cr" />
            <feDisplacementMap in="SourceGraphic" in2="map" xChannelSelector="R" yChannelSelector="G" result="dg" />
            <feColorMatrix in="dg" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="cg" />
            <feDisplacementMap in="SourceGraphic" in2="map" xChannelSelector="R" yChannelSelector="G" result="db" />
            <feColorMatrix in="db" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="cb" />
            <feBlend in="cr" in2="cg" mode="screen" result="crg" />
            <feBlend in="crg" in2="cb" mode="screen" />
          </filter>
        </defs>
      </svg>
      <div className="lg-blob">
        <div className="lg-refr">
          <div className="lens-world" ref={worldRef} />
        </div>
        <div className="lg-layer lg-tints">
          {TINTS.map((t) => (
            <div className="lg-mask" key={t.rgb}>
              <div className="lg-tint" style={{ background: tint(t) }} />
            </div>
          ))}
        </div>
        <div className="lg-layer lg-spec">
          <div className="lg-fill lg-spec-a" />
          <div className="lg-fill lg-spec-b" />
          <div className="lg-fill lg-spec-c" />
        </div>
        <div className="lg-rim1" />
        <div className="lg-rim2" />
      </div>
    </>
  )
}
