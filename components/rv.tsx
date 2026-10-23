"use client"

import { Fragment, useState, type ReactNode } from "react"

type Item = { h: ReactNode; p: ReactNode }

/**
 * The big-type picker used by "The problem" and "The method": the words sit in
 * one huge line, the chosen one is dark and the others grey. A row of short
 * texts sits under it, and the chosen one gets a dark top line. Click, tap or
 * focus a word (or a text) to choose it.
 */
export function WordPicker({ items, label, foot }: { items: Item[]; label: string; foot?: ReactNode }) {
  const [on, setOn] = useState(0)
  return (
    <div className="rv-picker" data-rv="rise">
      <div className="rv-words" role="group" aria-label={label}>
        {items.map((it, i) => (
          <Fragment key={i}>
          <button
            type="button"
            className="rv-word"
            aria-pressed={on === i}
            onClick={() => setOn(i)}
            onMouseEnter={() => setOn(i)}
            onFocus={() => setOn(i)}
          >
            {it.h}
            <span aria-hidden="true">.</span>
          </button>{" "}
          </Fragment>
        ))}
      </div>
      <div className="rv-cols" style={{ ["--n" as string]: items.length }}>
        {items.map((it, i) => (
          <button key={i} type="button" className="rv-col" aria-pressed={on === i} onClick={() => setOn(i)}>
            <span className="rv-col-h">{it.h}</span>
            <span className="rv-col-p">{it.p}</span>
          </button>
        ))}
      </div>
      {foot}
    </div>
  )
}
