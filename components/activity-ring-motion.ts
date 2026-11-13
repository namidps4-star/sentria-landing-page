export type Geo = { w: number; h: number; cardW: number; cardH: number; mobile: boolean }
export type Pose = { transform: string; opacity: number; veil: number; z: number }

const clamp = (v: number, lo: number, hi: number) => (v < lo ? lo : v > hi ? hi : v)
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)

export const BLUR_LEVELS = 18

export function makeGeo(w: number, h: number): Geo {
  const mobile = w < 760
  const cardW = mobile ? w * 0.56 : Math.min(w * 0.19, 300)
  return { w, h, mobile, cardW, cardH: cardW * (mobile ? 1.4 : 0.95) }
}

/* Signed distance of card i from the centre of the ring, wrapped to (-n/2, n/2]. */
export function wrapOffset(i: number, x: number, n: number) {
  let f = (((i - x) % n) + n) % n
  if (f > n / 2) f -= n
  return f
}

/* Entrance: cards fan out from the middle, the nearest first. */
export const entrance = (seconds: number, k: number) => easeOut(clamp((seconds - 0.12 * k) / 0.8, 0, 1))

/* The ring is seen from inside: cards further from the centre are larger, nearer to you and turned toward you. */
export function cardPose(v: number, geo: Geo, spread: number): Pose {
  const k = Math.abs(v)
  const kk = Math.min(k, 3.2)
  const spacing = geo.mobile ? geo.w * 0.64 : geo.cardW * 1.22
  const x = geo.w / 2 + spacing * v * (0.45 + 0.55 * spread) - geo.cardW / 2
  const y = geo.h / 2 - geo.cardH / 2
  const z = 22 * kk * spread
  const rot = -24 * v * spread
  const scale = (1 + 0.1 * kk) * (0.6 + 0.4 * spread)
  return {
    transform: `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, ${z.toFixed(1)}px) rotateY(${rot.toFixed(2)}deg) scale(${scale.toFixed(4)})`,
    opacity: spread * clamp((3.7 - k) / 1.3, 0, 1),
    veil: clamp((k - 2.4) * 0.28, 0, 0.4),
    z: Math.round(100 + 2 * k),
  }
}

/* Blur and colour fringing grow with distance from the centre and with how fast the ring is turning. */
export function blurLevel(k: number, speed: number, spread: number) {
  const amount = Math.max(speed * (0.82 + 0.12 * Math.min(k, 3)), clamp((k - 1.4) * 0.42, 0, 0.62), (1 - spread) * 0.85)
  return clamp(Math.round(amount * (BLUR_LEVELS - 1)), 0, BLUR_LEVELS - 1)
}
