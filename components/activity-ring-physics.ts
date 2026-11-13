export type Phys = {
  x: number // position on the ring, in cards
  v: number // velocity, cards per frame
  target: number | null // a stepped move (arrows, buttons, clicking a card)
  lastInput: number
  drag: boolean
  reduced: boolean
}

export const newPhys = (reduced: boolean): Phys => ({ x: 0, v: 0, target: null, lastInput: 0, drag: false, reduced })

export const kick = (p: Phys, dv: number, now: number) => {
  p.target = null
  p.lastInput = now
  p.v = Math.max(-1.3, Math.min(1.3, p.v + dv))
}

/* One frame: glide to a stepped target, otherwise coast with friction and then snap to the nearest card. */
export function step(p: Phys, now: number) {
  if (p.reduced) {
    p.v = 0
    p.x = p.target ?? Math.round(p.x)
    p.target = null
    return
  }
  if (p.target !== null) {
    const d = p.target - p.x
    if (Math.abs(d) < 0.002) {
      p.x = p.target
      p.target = null
    } else p.x += d * 0.14
    p.v = 0
    return
  }
  if (p.drag) return
  if (Math.abs(p.v) < 0.14 && now - p.lastInput > 150) {
    p.v = 0
    const d = Math.round(p.x) - p.x
    p.x = Math.abs(d) < 0.0015 ? Math.round(p.x) : p.x + 0.12 * d
  } else {
    p.x += p.v
    p.v *= 0.93
  }
}
