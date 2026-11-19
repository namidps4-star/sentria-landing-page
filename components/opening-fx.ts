/**
 * The moving parts of the opening that CSS cannot do: the wordmark letters flicker through the site's
 * typefaces and settle one by one, lime blocks flash over them, and a LOADING counter runs with a bar
 * along the bottom edge to 100%. The black panel's exit (tiles) is pure CSS in 03-opening.css.
 *
 * Time is read from the CSS animation clock (the lockup's exit animation), which is paused while <html>
 * has .op-wait and runs with the tile dissolve. So the letters, the counter and the dissolve can never
 * drift apart, even if the script starts late. Timings (seconds) are shared with --t0 in 01-section.css
 * and the scroll unlock in components/motion.tsx: change them together.
 */

const FACES = 6 // .op-f0 .. .op-f5 in 03-opening.css
const STEP = 0.07 // how often a flickering letter changes face
const COUNT_FROM = 0.1
const COUNT_TO = 2.3
const END = 2.8 // nothing moves after this

const clamp = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x))
const easeInOut = (t: number) => {
  const x = clamp(t)
  return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2
}
const steps = (t: number, n: number) => Math.floor(clamp(t) * n) / n
/** A repeatable pseudo-random number in [0, 1) for a given integer. */
const rnd = (n: number) => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453
  return x - Math.floor(x)
}

/** Seconds at which letter `i` starts to appear, and at which it settles on the brand face. */
const startOf = (i: number) => 0.2 + i * 0.06
const settleOf = (i: number) => 0.6 + i * 0.18

export function startOpeningFx(root: HTMLElement, label: string): () => void {
  const letters = Array.from(root.querySelectorAll<SVGTextElement>(".sw-l"))
  const blocks = Array.from(root.querySelectorAll<HTMLElement>(".op-blk"))
  const word = root.querySelector<SVGSVGElement>(".sw")
  const bar = root.querySelector<HTMLElement>(".op-bar")
  const cnt = root.querySelector<HTMLElement>(".op-cnt")
  const tag = root.querySelector<HTMLElement>(".op-tag")
  if (!letters.length || !word || !bar || !cnt || !tag) return () => {}

  const clock = root.querySelector<HTMLElement>(".op-lock")?.getAnimations()[0]
  if (!clock) return () => {}

  let raf = 0
  let lastTick = -1
  let cancelled = false

  const frame = () => {
    if (cancelled) return
    const t = Number(clock.currentTime ?? 0) / 1000
    if (t > END) return

    // counter and bar, to 100%
    const pc = Math.round(easeInOut((t - COUNT_FROM) / (COUNT_TO - COUNT_FROM)) * 100)
    const w = root.clientWidth
    bar.style.transform = `scaleX(${pc / 100})`
    cnt.textContent = `${label} ${pc}%`
    cnt.style.left = `${clamp((w * pc) / 100 - cnt.offsetWidth / 2, 24, w - cnt.offsetWidth - 24)}px`
    root.dataset.live = "1"

    // letters: flicker through the faces, then settle
    const tick = Math.floor(t / STEP)
    if (tick !== lastTick) {
      lastTick = tick
      letters.forEach((el, i) => {
        if (t < startOf(i)) return
        el.style.opacity = "1"
        for (let f = 0; f < FACES; f++) el.classList.remove(`op-f${f}`)
        if (t >= settleOf(i)) {
          el.style.transform = ""
          return
        }
        el.classList.add(`op-f${Math.floor(rnd(tick * 7 + i) * FACES)}`)
        el.style.transform = `translateY(${Math.round((rnd(tick + i * 3) - 0.5) * 14)}px)`
      })
    }

    // lime blocks flash over the wordmark, fewer as it loads
    const wr = word.getBoundingClientRect()
    const size = Math.max(22, wr.height * 0.3)
    const n = Math.round(6 * (1 - easeInOut((t - COUNT_FROM) / 2.1)))
    const k = Math.floor(t / 0.14)
    blocks.forEach((b, i) => {
      if (i >= n || t > 2.2 || t < 0.15) {
        b.style.display = "none"
        return
      }
      b.style.display = "block"
      b.style.width = b.style.height = `${size}px`
      b.style.left = `${wr.left + rnd(k * 5 + i) * (wr.width - size)}px`
      b.style.top = `${wr.top - size * 0.4 + rnd(k * 11 + i * 2) * (wr.height - size * 0.2)}px`
    })

    // the tagline steps in once the name has settled
    tag.style.opacity = String(steps((t - 2.0) / 0.25, 3))

    raf = requestAnimationFrame(frame)
  }
  raf = requestAnimationFrame(frame)

  return () => {
    cancelled = true
    cancelAnimationFrame(raf)
  }
}
