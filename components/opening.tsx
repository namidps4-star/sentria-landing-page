"use client"

import { useEffect, useRef, type CSSProperties } from "react"
import { SentriaWordmark } from "@/components/sentria-wordmark"
import { startOpeningFx } from "@/components/opening-fx"
import { useLang } from "@/components/lang"
import { TAGLINES } from "@/content/taglines"

const COLS = 12
const ROWS = 8
const BLOCKS = 6
const LABEL = { en: "Loading", fr: "Chargement" } as const

/** The black panel is a grid of tiles that dissolves in a diagonal sweep (pure CSS, see 03-opening.css). */
const TILES = Array.from({ length: COLS * ROWS }, (_, n) => {
  const c = n % COLS
  const r = Math.floor(n / COLS)
  return { n, d: `${((c + (ROWS - 1 - r)) * 0.05).toFixed(2)}s` }
})

function MarkPieces() {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className="op-mark">
      <g className="op-m-top">
        <path d="M14 42.5a23 23 0 0 1 46 0z" fill="var(--lime)" stroke="var(--lime)" strokeWidth="10" strokeLinejoin="round" />
        <rect x="9" y="40" width="10" height="17.5" rx="5" fill="var(--lime)" />
      </g>
      <g className="op-m-bot">
        <path d="M40 57.5a23 23 0 0 0 46 0z" fill="#fff" stroke="#fff" strokeWidth="10" strokeLinejoin="round" />
        <rect x="81" y="42.5" width="10" height="17.5" rx="5" fill="#fff" />
      </g>
    </svg>
  )
}

/**
 * The opening, about 3.7 s, on every fresh load of the home page. The dome mark settles, the letters of SentrIA flicker
 * through the site's typefaces while lime blocks flash over them, and a LOADING counter runs to 100% along
 * the bottom edge. The name settles, the lime shards grow, the tagline steps in, then the black panel
 * dissolves tile by tile to show the page.
 *
 * The letters, blocks and counter are driven by opening-fx.ts; the dissolve is pure CSS, so the panel
 * ends itself (visibility: hidden) even if no script runs. Only shown when <html> has .op-run, which the
 * head script sets before paint (never with reduced motion).
 * The timings are shared with the hero entrance (--t0) and the scroll unlock (components/motion.tsx).
 */
export function Opening() {
  const lang = useLang()
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const html = document.documentElement
    if (!html.classList.contains("op-run")) return
    let cancelled = false
    let stop = () => {}
    if (html.classList.contains("op-wait") && document.fonts) {
      const fonts = document.fonts
      Promise.resolve(fonts.load("600 100px Chillax").then(() => fonts.ready, () => fonts.ready)).then(() => {
        requestAnimationFrame(() =>
          requestAnimationFrame(() => {
            if (!cancelled) html.classList.remove("op-wait")
          })
        )
      })
    }
    if (root.current) stop = startOpeningFx(root.current, LABEL[lang])
    return () => {
      cancelled = true
      stop()
    }
  }, [lang])

  return (
    <div className="op" aria-hidden="true" ref={root}>
      <div className="op-tiles">
        {TILES.map((t) => (
          <i key={t.n} className="op-tile" style={{ "--d": t.d } as CSSProperties} />
        ))}
      </div>
      <div className="op-lock">
        <MarkPieces />
        <SentriaWordmark />
      </div>
      <div className="op-hud">
        <p className="op-tag">{TAGLINES.healthcare[lang]}</p>
        <div className="op-blocks">
          {Array.from({ length: BLOCKS }, (_, i) => (
            <i key={i} className="op-blk" />
          ))}
        </div>
        <div className="op-rail" />
        <div className="op-bar" />
        <span className="op-cnt" />
      </div>
      {/* Asks the browser to load every face the letters flicker through before the clock starts. */}
      <div className="op-warm">
        {[0, 1, 2, 3, 4, 5].map((f) => (
          <span key={f} className={`op-f${f}`}>
            SentrIA
          </span>
        ))}
      </div>
    </div>
  )
}
