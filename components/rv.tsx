"use client"

import { Fragment, useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react"

type Item = { h: ReactNode; p: ReactNode }

/**
 * The big-type picker used by "The problem" and "The method": the words sit in
 * one huge line, the chosen one is dark and the others grey. A row of short
 * texts sits under it, and the chosen one gets a dark top line. Click, tap or
 * focus a word to choose it. It is a tablist: arrow keys, Home and End move
 * between the words, and each text is the tabpanel of its word.
 */
export function WordPicker({ items, label, foot }: { items: Item[]; label: string; foot?: ReactNode }) {
  const [on, setOn] = useState(0)
  const base = useId()
  const tabs = useRef<(HTMLButtonElement | null)[]>([])

  function onKey(e: KeyboardEvent<HTMLButtonElement>, i: number) {
    const last = items.length - 1
    let next: number | null = null
    if (e.key === "ArrowRight") next = i === last ? 0 : i + 1
    else if (e.key === "ArrowLeft") next = i === 0 ? last : i - 1
    else if (e.key === "Home") next = 0
    else if (e.key === "End") next = last
    if (next === null) return
    e.preventDefault()
    setOn(next)
    tabs.current[next]?.focus()
  }

  return (
    <div className="rv-picker" data-rv="rise">
      <div className="rv-words" role="tablist" aria-label={label}>
        {items.map((it, i) => (
          <Fragment key={i}>
            <button
              ref={(el) => {
                tabs.current[i] = el
              }}
              type="button"
              role="tab"
              id={`${base}-t${i}`}
              aria-selected={on === i}
              aria-controls={`${base}-p${i}`}
              tabIndex={on === i ? 0 : -1}
              className="rv-word"
              onClick={() => setOn(i)}
              onMouseEnter={() => setOn(i)}
              onFocus={() => setOn(i)}
              onKeyDown={(e) => onKey(e, i)}
            >
              {it.h}
              <span aria-hidden="true">.</span>
            </button>{" "}
          </Fragment>
        ))}
      </div>
      <div className="rv-cols" style={{ ["--n" as string]: items.length }}>
        {items.map((it, i) => (
          <div
            key={i}
            role="tabpanel"
            id={`${base}-p${i}`}
            aria-labelledby={`${base}-t${i}`}
            className="rv-col"
            data-on={on === i ? "1" : undefined}
            onClick={() => setOn(i)}
          >
            <span className="rv-col-h" aria-hidden="true">{it.h}</span>
            <span className="rv-col-p">{it.p}</span>
          </div>
        ))}
      </div>
      {foot}
    </div>
  )
}
