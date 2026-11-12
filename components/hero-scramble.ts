/**
 * How the hero headline draws itself, after the headline on Isle (motionin.design): every letter starts as a
 * random letter in the same face, the glyphs keep changing, and the real letters settle in one by one, left to
 * right. The three lines settle side by side, each a little after the one above.
 *
 * Time is read from the CSS entrance animation of the letters (wvl-type in 04-typing-...css), so it follows
 * the opening: it waits while the opening is paused and starts the moment the letters appear. Each letter
 * keeps its final width while it scrambles, so nothing around it moves.
 * If the script is late and the letters are already on show, the headline simply stays as it is.
 * Only runs when that CSS animation runs (never with reduced motion). The letters are aria-hidden: the
 * accessible headline is the sr-only text in hero.tsx.
 */
const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
const TICK = 0.06 // seconds between glyph changes
const FIRST = 0.45 // when the first letter settles
const LINE_LAG = 0.14 // each line starts this much after the one above
const PER_LETTER = 0.05 // gap between one letter settling and the next

type Item = { el: HTMLElement; final: string; at: number; done: boolean }

const randomGlyph = (not: string) => {
  let g = not
  while (g === not) g = GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
  return g
}

export function startScramble(h1: HTMLElement): { done: Promise<void>; stop: () => void } {
  const items: Item[] = []
  h1.querySelectorAll<HTMLElement>(".hl").forEach((line, row) => {
    const letters = Array.from(line.querySelectorAll<HTMLElement>(".wvl")).filter((e) => e.offsetParent !== null)
    letters.forEach((el, i) => {
      const final = el.textContent ?? ""
      if (/\p{L}/u.test(final)) items.push({ el, final, at: FIRST + row * LINE_LAG + i * PER_LETTER, done: false })
    })
  })
  const clock = items[0]?.el.getAnimations().find((a) => (a as CSSAnimation).animationName === "wvl-type")
  if (!items.length || !clock) return { done: Promise.resolve(), stop: () => {} }

  const delay = Number(clock.effect?.getTiming().delay ?? 0)
  // Seconds since the letters appear (negative before). The animation lasts only 1 ms, so its own currentTime
  // stops moving once it has finished: read the page timeline from its start time instead. While the opening
  // pauses it, it has no start time and its currentTime holds still, which is what we want.
  const seconds = () => {
    const started = clock.startTime
    const elapsed = started === null ? Number(clock.currentTime ?? 0) : Number(document.timeline.currentTime ?? 0) - Number(started)
    return (elapsed - delay) / 1000
  }
  const end = Math.max(...items.map((x) => x.at)) + TICK
  let raf = 0
  let stopped = false
  let lastTick = -1
  let resolve: () => void = () => {}
  const done = new Promise<void>((r) => (resolve = r))

  const finish = () => {
    items.forEach((x) => {
      x.el.textContent = x.final
      x.el.style.width = ""
      x.el.style.textAlign = ""
    })
    resolve()
  }

  // Hold each letter's width, then scramble. The letters are hidden by CSS until the clock reaches their delay.
  const begin = () => {
    if (stopped) return
    // Late (the page's script arrived after the letters were already on show): do not flip them to random glyphs.
    if (seconds() > 0.1) return finish()
    items.forEach((x) => {
      x.el.style.width = `${x.el.getBoundingClientRect().width}px`
      x.el.style.textAlign = "center"
      x.el.textContent = randomGlyph(x.final)
    })
    const frame = () => {
      if (stopped) return
      const t = seconds()
      if (t >= end) return finish()
      const tick = Math.floor(t / TICK)
      if (t > -0.1 && tick !== lastTick) {
        lastTick = tick
        items.forEach((x) => {
          if (x.done) return
          if (t >= x.at) {
            x.done = true
            x.el.textContent = x.final
          } else {
            x.el.textContent = randomGlyph(x.el.textContent ?? "")
          }
        })
      }
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)
  }
  void (document.fonts?.ready ?? Promise.resolve()).then(begin)

  return {
    done,
    stop: () => {
      stopped = true
      cancelAnimationFrame(raf)
      resolve()
    },
  }
}
