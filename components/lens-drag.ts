/**
 * How the hero lens moves, after Isle on motionin.design: it rests on the headline and bobs very slowly,
 * you grab it (it swells a little), fling it, and it glides a short, weighty distance and stops. It keeps
 * the speed you gave it, bounces softly off the edges of the hero, and stays where you leave it.
 */

/** Seconds for the glide to lose about two thirds of its speed. */
const TAU = 0.6
/** Share of its speed the lens keeps when it meets an edge. */
const BOUNCE = 0.5
/** Below this speed (px/s) the lens counts as stopped. */
const REST = 20
/** The fling is read from this many ms of the drag, scaled down so even a hard fling travels only about 270 px. */
const SAMPLE_MS = 140
const FLING_GAIN = 0.22
const MAX_SPEED = 450
/** Resting bob: height in px and period in seconds. */
const BOB_PX = 4
const BOB_S = 6

export type Body = { x: number; y: number; vx: number; vy: number; dragging: boolean; moved: boolean }
export type Bounds = { minX: number; maxX: number; minY: number; maxY: number }
export type Trail = { t: number; x: number; y: number }[]

export const newBody = (): Body => ({ x: 0, y: 0, vx: 0, vy: 0, dragging: false, moved: false })

export function clampTo(b: Body, r: Bounds) {
  b.x = Math.min(r.maxX, Math.max(r.minX, b.x))
  b.y = Math.min(r.maxY, Math.max(r.minY, b.y))
}

/** Moves the lens along for `dt` seconds. Returns true while it is still moving. */
export function glide(b: Body, dt: number, r: Bounds): boolean {
  if (b.dragging) return true
  const k = Math.exp(-dt / TAU)
  b.vx *= k
  b.vy *= k
  b.x += b.vx * dt
  b.y += b.vy * dt
  if (b.x < r.minX) {
    b.x = r.minX
    b.vx = Math.abs(b.vx) * BOUNCE
  } else if (b.x > r.maxX) {
    b.x = r.maxX
    b.vx = -Math.abs(b.vx) * BOUNCE
  }
  if (b.y < r.minY) {
    b.y = r.minY
    b.vy = Math.abs(b.vy) * BOUNCE
  } else if (b.y > r.maxY) {
    b.y = r.maxY
    b.vy = -Math.abs(b.vy) * BOUNCE
  }
  if (Math.hypot(b.vx, b.vy) < REST) {
    b.vx = b.vy = 0
    return false
  }
  return true
}

/** The release velocity (px/s) from the last stretch of the drag. */
export function flingFrom(trail: Trail, now: number): { vx: number; vy: number } {
  const recent = trail.filter((p) => now - p.t <= SAMPLE_MS)
  if (recent.length < 2) return { vx: 0, vy: 0 }
  const a = recent[0]
  const z = recent[recent.length - 1]
  const dt = (z.t - a.t) / 1000
  if (dt <= 0) return { vx: 0, vy: 0 }
  let vx = ((z.x - a.x) / dt) * FLING_GAIN
  let vy = ((z.y - a.y) / dt) * FLING_GAIN
  const s = Math.hypot(vx, vy)
  if (s > MAX_SPEED) {
    vx = (vx / s) * MAX_SPEED
    vy = (vy / s) * MAX_SPEED
  }
  return { vx, vy }
}

/** The slow vertical drift while the lens rests. */
export const bob = (seconds: number) => Math.sin((seconds / BOB_S) * Math.PI * 2) * BOB_PX
