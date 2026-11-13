"use client"

import { useEffect, useRef, type CSSProperties } from "react"
import "./africa-opening.css"

/* The hub's loading screen, in the homepage's manner: the word flickers through the site's typefaces and
   settles letter by letter, lime blocks flash over it, a loading counter runs to 100%, then a black panel
   dissolves tile by tile to show the page. About 3.9 s. Skipped with reduced motion. */

const COLS = 12
const ROWS = 8
const BLOCKS = 4
const STEP = 0.07 // how often a flickering letter changes face, s
const END = 3.0 // nothing moves after this, s
const LABEL = { en: "Loading", fr: "Chargement" } as const
const FACES = ["var(--f-display)", "var(--f-body)", "var(--f-brand)", "var(--f-open)"]
const TILES = Array.from({ length: COLS * ROWS }, (_, n) => {
  const c = n % COLS
  const r = Math.floor(n / COLS)
  return { n, d: `${((c + (ROWS - 1 - r)) * 0.05).toFixed(2)}s` }
})

const clamp = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x))
const easeInOut = (t: number) => {
  const x = clamp(t)
  return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2
}
/** A repeatable pseudo-random number in [0, 1) for an integer. */
const rnd = (n: number) => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453
  return x - Math.floor(x)
}
const startOf = (i: number) => 0.2 + i * 0.07 // when letter i appears, s
const settleOf = (i: number) => 0.6 + i * 0.16 // when letter i lands on the site face, s

export function AfricaOpening({ lang, word }: { lang: "en" | "fr"; word: string }) {
  const root = useRef<HTMLDivElement>(null)
  const wordEl = useRef<HTMLDivElement>(null)
  const letters = useRef<(HTMLSpanElement | null)[]>([])
  const blocks = useRef<(HTMLElement | null)[]>([])
  const bar = useRef<HTMLElement>(null)
  const cnt = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.display = "none"
      return
    }
    const t0 = performance.now()
    let raf = 0
    let lastTick = -1

    const frame = () => {
      const t = (performance.now() - t0) / 1000

      // counter and bar, to 100%
      const pct = Math.round(easeInOut((t - 0.1) / 2.2) * 100)
      if (bar.current) bar.current.style.transform = `scaleX(${pct / 100})`
      if (cnt.current) {
        cnt.current.textContent = `${LABEL[lang]} ${pct}%`
        cnt.current.style.left = `${clamp(pct, 4, 96)}%`
      }

      // letters: flicker through the faces, then settle
      const tick = Math.floor(t / STEP)
      if (tick !== lastTick) {
        lastTick = tick
        letters.current.forEach((node, i) => {
          if (!node) return
          if (t < startOf(i)) {
            node.style.opacity = "0"
            return
          }
          node.style.opacity = "1"
          if (t >= settleOf(i)) {
            node.style.fontFamily = ""
            node.style.transform = ""
            return
          }
          node.style.fontFamily = FACES[Math.floor(rnd(tick * 7 + i) * FACES.length)]
          node.style.transform = `translateY(${Math.round((rnd(tick + i * 3) - 0.5) * 14)}px)`
        })
      }

      // lime blocks flash over the word, fewer as it loads
      const wr = wordEl.current?.getBoundingClientRect()
      if (wr) {
        const size = Math.max(22, wr.height * 0.3)
        const n = Math.round(BLOCKS * (1 - easeInOut((t - 0.1) / 2.1)))
        const k = Math.floor(t / 0.14)
        blocks.current.forEach((b, i) => {
          if (!b) return
          if (i >= n || t > 2.2 || t < 0.15) {
            b.style.display = "none"
            return
          }
          b.style.display = "block"
          b.style.width = b.style.height = `${size}px`
          b.style.left = `${wr.left + rnd(k * 5 + i) * (wr.width - size)}px`
          b.style.top = `${wr.top - size * 0.4 + rnd(k * 11 + i * 2) * (wr.height - size * 0.2)}px`
        })
      }

      if (t < END) raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(raf)
  }, [lang])

  return (
    <div className="aop" ref={root} aria-hidden="true">
      <div className="aop-tiles">
        {TILES.map((t) => (
          <i key={t.n} className="aop-tile" style={{ "--d": t.d } as CSSProperties} />
        ))}
      </div>
      <div className="aop-word" ref={wordEl}>
        {[...word].map((c, i) => (
          <span
            key={i}
            className="aop-l"
            ref={(n) => {
              letters.current[i] = n
            }}
          >
            {c}
          </span>
        ))}
      </div>
      {Array.from({ length: BLOCKS }, (_, i) => (
        <i
          key={i}
          className="aop-blk"
          ref={(n) => {
            blocks.current[i] = n
          }}
        />
      ))}
      <div className="aop-hud">
        <div className="aop-rail">
          <i className="aop-bar" ref={bar} />
        </div>
        <span className="aop-cnt" ref={cnt} />
      </div>
    </div>
  )
}
