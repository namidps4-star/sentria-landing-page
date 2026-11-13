"use client"

import { useRef, useState } from "react"
import type { CSSProperties, PointerEvent } from "react"
import "./africa-hub-title.css"

/* The hub headline. Each letter waves on its own, and a bubble follows the mouse over the title and
   magnifies the words under it. A lighter version of the homepage lens: one copy of the text, no refraction.
   The bubble only shows for a mouse on wide screens; the letters wave everywhere. */

const R = 96 // bubble radius, px
const S = 1.6 // magnification
const STEP = 0.11 // seconds between letters

function Letters({ lines, delay }: { lines: string[]; delay?: (k: number) => string }) {
  let n = 0
  return (
    <>
      {lines.map((line, row) => (
        <span key={row} className="ahl-line">
          {[...line].map((c) => {
            const k = n++
            return (
              <span
                key={k}
                className="ahl-letter"
                style={{ ["--i" as string]: k, ...(delay ? { animationDelay: delay(k) } : {}) } as CSSProperties}
              >
                {c === " " ? " " : c}
              </span>
            )
          })}
        </span>
      ))}
    </>
  )
}

export function AfricaHubTitle({ id, lines }: { id: string; lines: string[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const [ptr, setPtr] = useState<{ x: number; y: number; w: number } | null>(null)
  // Clock at the moment the bubble appears. The bubble's letters are timed from it, so they wave in step with the title.
  const clock = useRef(0)

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    if (!ptr) clock.current = performance.now() / 1000
    setPtr({ x: e.clientX - r.left, y: e.clientY - r.top, w: r.width })
  }

  const offset = (k: number) => `calc(${k} * -${STEP}s - ${clock.current}s)`

  return (
    <div className="ahl" ref={ref} data-rv="rise" onPointerMove={onMove} onPointerLeave={() => setPtr(null)}>
      <h1 id={id}>
        <Letters lines={lines} />
      </h1>
      {ptr && (
        <div
          className="ahl-lens"
          aria-hidden="true"
          style={{ width: 2 * R, height: 2 * R, transform: `translate3d(${ptr.x - R}px, ${ptr.y - R}px, 0)` }}
        >
          <div
            className="ahl-world"
            style={{ width: ptr.w, transform: `translate3d(${R - ptr.x * S}px, ${R - ptr.y * S}px, 0) scale(${S})` }}
          >
            <Letters lines={lines} delay={offset} />
          </div>
        </div>
      )}
    </div>
  )
}
