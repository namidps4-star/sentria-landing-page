/**
 * The glass of the hero lens: how the displacement map is made and how the lens moves.
 *
 * The lens shows a magnified copy of the hero through an SVG filter. The filter bends the copy with a
 * displacement map and bends red, green and blue by slightly different amounts, which gives the colour
 * fringe at the rim. The map is radial: nothing happens in the middle, and the light bends inward more and
 * more toward the edge (about the square of the distance). It is generated here, not loaded.
 */

/** The filter region is this much larger than the lens, so the bending has room at the edge. */
const REGION = 388 / 234
/** How strongly the lens bends light, as a fraction of its size, and how far apart the three colours sit. */
const STRENGTH = 0.3428
const DISPERSION = [1, 0.93, 0.86]

/** The wobbling rounded outline, as the eight border-radius values (horizontal four, then vertical four). */
const OUTLINE = [50.57, 54.1, 39.02, 39.33, 60.45, 54.13, 52.19, 59.79]
/** Where each of the three soft colour tints starts and how far it drifts, in px. */
const DRIFT = [
  [-65.5, -52],
  [80, -4.4],
  [38.2, -49.3],
]

export function lensMapUrl(size: number): string {
  const side = Math.round(size * REGION)
  const canvas = document.createElement("canvas")
  canvas.width = canvas.height = side
  const ctx = canvas.getContext("2d")
  if (!ctx) return ""
  const img = ctx.createImageData(side, side)
  const c = side / 2
  const radius = size / 2
  for (let y = 0; y < side; y++) {
    for (let x = 0; x < side; x++) {
      const dx = x + 0.5 - c
      const dy = y + 0.5 - c
      const r = Math.hypot(dx, dy)
      const f = r / radius
      const cover = Math.min(1, Math.max(0, radius - r + 0.5)) // soft one-pixel edge
      const m = Math.min(1.23, Math.pow(Math.max(0, (f - 0.5) / 0.45), 2)) * 0.976 * cover
      const nx = r ? dx / r : 0
      const ny = r ? dy / r : 0
      const o = (y * side + x) * 4
      img.data[o] = Math.round(128 - m * 127 * nx)
      img.data[o + 1] = Math.round(128 - m * 127 * ny)
      img.data[o + 2] = Math.round(Math.min(255, m * 254))
      img.data[o + 3] = 255
    }
  }
  ctx.putImageData(img, 0, 0)
  return canvas.toDataURL()
}

/** Sizes the filter for a lens of `size` px: its region, its map and the three bending strengths. */
export function sizeLensFilter(svg: SVGSVGElement, size: number) {
  const side = Math.round(size * REGION)
  const off = -(side - size) / 2
  const filter = svg.querySelector("filter")
  const map = svg.querySelector("feImage")
  if (!filter || !map) return
  for (const el of [filter, map]) {
    el.setAttribute("x", String(off))
    el.setAttribute("y", String(off))
    el.setAttribute("width", String(side))
    el.setAttribute("height", String(side))
  }
  map.setAttribute("href", lensMapUrl(size))
  svg.querySelectorAll("feDisplacementMap").forEach((d, i) => d.setAttribute("scale", String(size * STRENGTH * DISPERSION[i])))
}

export type GlassParts = { blob: HTMLElement; tints: HTMLElement[]; rim: HTMLElement }

export function glassParts(lens: HTMLElement): GlassParts | null {
  const blob = lens.querySelector<HTMLElement>(".lg-blob")
  const rim = lens.querySelector<HTMLElement>(".lg-rim2")
  const tints = Array.from(lens.querySelectorAll<HTMLElement>(".lg-tint"))
  return blob && rim && tints.length ? { blob, tints, rim } : null
}

/** One frame of the glass: the outline wobbles, it squashes along its direction of travel, the tints drift. */
export function moveGlass(p: GlassParts, seconds: number, vx: number, vy: number) {
  const w = OUTLINE.map((v, k) => (v + 3.2 * Math.sin(seconds * 1.7 + k * 1.3)).toFixed(2))
  p.blob.style.borderRadius = `${w[0]}% ${w[1]}% ${w[2]}% ${w[3]}% / ${w[4]}% ${w[5]}% ${w[6]}% ${w[7]}%`
  const speed = Math.hypot(vx, vy)
  const amount = Math.min(0.1, speed * 0.006)
  const angle = (Math.atan2(vy, vx) * 180) / Math.PI
  p.blob.style.transform = `rotate(${angle.toFixed(1)}deg) scale(${(1 + amount).toFixed(4)},${(1 - amount * 0.35).toFixed(4)}) rotate(${(-angle).toFixed(1)}deg)`
  p.tints.forEach((el, k) => {
    const ph = seconds * 1.3 + k * 2.1
    el.style.transform = `translate3d(${(DRIFT[k][0] * Math.cos(ph)).toFixed(1)}px,${(DRIFT[k][1] * Math.sin(ph * 0.9)).toFixed(1)}px,0)`
  })
  p.rim.style.setProperty("--lg-rim", String(Math.round(-34 + seconds * 30)))
}
