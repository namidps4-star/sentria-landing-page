import { BLUR_LEVELS } from "./activity-ring-motion"

/* One SVG filter per blur level: a sideways blur with the red and blue channels pushed apart. */
export function RingFilters() {
  return (
    <svg width="0" height="0" aria-hidden="true" className="afr-ring-defs">
      {Array.from({ length: BLUR_LEVELS - 1 }, (_, i) => {
        const n = i + 1
        const r = Math.pow(n / (BLUR_LEVELS - 1), 1.15)
        const blur = (16 * r).toFixed(3)
        const dx = (13 * r).toFixed(3)
        return (
          <filter key={n} id={`afr-ca-${n}`} x="-45%" y="-30%" width="190%" height="160%" colorInterpolationFilters="sRGB">
            <feGaussianBlur in="SourceGraphic" stdDeviation={`${blur} 0`} result="b" />
            <feOffset in="b" dx={`-${dx}`} dy="0" result="ro" />
            <feColorMatrix in="ro" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="r" />
            <feOffset in="b" dx={dx} dy="0" result="bo" />
            <feColorMatrix in="bo" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="bl" />
            <feColorMatrix in="b" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="g" />
            <feBlend in="r" in2="g" mode="screen" result="rg" />
            <feBlend in="rg" in2="bl" mode="screen" />
          </filter>
        )
      })}
    </svg>
  )
}
