"use client"

import Image from "next/image"
import { useRef, useState } from "react"
import type { KeyboardEvent, PointerEvent as ReactPointerEvent } from "react"
import type { ActivityCard } from "@/content/africa-activity-cards"
import "./activity-carousel.css"

export type CarouselText = { label: string; prev: string; next: string; more: string; photo: string }

type Props = { lang: "en" | "fr"; base: string; cards: ActivityCard[]; text: CarouselText }

const SWIPE = 50

/* A 3D photo carousel: the centred card faces flat, the others turn away. Positions come from CSS (data-d). */
export function ActivityCarousel({ lang, base, cards, text }: Props) {
  const n = cards.length
  const [active, setActive] = useState(0)
  const stage = useRef<HTMLDivElement>(null)
  const start = useRef<number | null>(null)
  const swiped = useRef(false)

  const go = (i: number) => setActive(((i % n) + n) % n)
  // Offset from the centre, wrapped so the cards loop: -3 .. n-4
  const offset = (i: number) => ((i - active + n + 3) % n) - 3

  // Real pointer events can land on the 3D container instead of the card under the cursor; look the card up by position.
  const cardAt = (x: number, y: number) => {
    const el = document.elementsFromPoint(x, y).find((e) => e instanceof HTMLElement && e.dataset.card !== undefined && e.dataset.d !== "-3")
    return el instanceof HTMLElement ? Number(el.dataset.card) : -1
  }

  const onPointerDown = (e: ReactPointerEvent) => {
    start.current = e.clientX
    swiped.current = false
  }
  const onPointerUp = (e: ReactPointerEvent) => {
    if (start.current === null) return
    const dx = e.clientX - start.current
    start.current = null
    if (Math.abs(dx) > SWIPE) {
      swiped.current = true
      go(active + (dx < 0 ? 1 : -1))
    }
  }
  const onPointerMove = (e: ReactPointerEvent) => {
    const s = stage.current
    if (!s) return
    const r = s.getBoundingClientRect()
    s.style.perspectiveOrigin = `${44 + ((e.clientX - r.left) / r.width) * 12}% 45%`
    s.style.cursor = cardAt(e.clientX, e.clientY) >= 0 ? "pointer" : "default"
  }
  const onClickCapture = (e: React.MouseEvent) => {
    if (swiped.current) {
      e.preventDefault()
      e.stopPropagation()
      swiped.current = false
      return
    }
    if ((e.target as HTMLElement).closest("[data-card]")) return
    const i = cardAt(e.clientX, e.clientY)
    if (i < 0) return
    if (i !== active) go(i)
    else stage.current?.querySelector<HTMLElement>(`[data-card="${i}"]`)?.click()
  }
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowLeft") go(active - 1)
    if (e.key === "ArrowRight") go(active + 1)
  }

  const cur = cards[active]
  return (
    <div className="afr-car" role="group" aria-roledescription="carousel" aria-label={text.label} onKeyDown={onKeyDown}>
      <div
        className="afr-car-stage"
        ref={stage}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerMove={onPointerMove}
        onPointerLeave={() => stage.current && (stage.current.style.perspectiveOrigin = "")}
        onClickCapture={onClickCapture}
      >
        <div className="afr-car-rig">
          {cards.map((c, i) => {
            const d = offset(i)
            const live = Boolean(c.slug)
            const props = {
              className: "afr-car-card",
              "data-card": i,
              "data-d": d,
              "data-active": d === 0 ? "1" : "0",
              "aria-hidden": Math.abs(d) > 2 || undefined,
              tabIndex: Math.abs(d) > 2 ? -1 : 0,
              "aria-label": `${c.name[lang]}, ${i + 1} / ${n}`,
            }
            const inner = (
              <>
                <Image src={c.photo} alt={c.alt[lang]} fill sizes="(max-width: 760px) 230px, 320px" className="afr-car-img" draggable={false} />
                <span className="afr-car-cap">
                  <span className="afr-car-name">{c.name[lang]}</span>
                  <span className="afr-car-line">{c.line[lang]}</span>
                  {live && <span className="afr-car-go">{text.more}</span>}
                </span>
              </>
            )
            return live ? (
              <a
                key={c.id}
                {...props}
                href={`${base}/${c.slug}`}
                draggable={false}
                onClick={(e) => {
                  if (i !== active) {
                    e.preventDefault()
                    go(i)
                  }
                }}
              >
                {inner}
              </a>
            ) : (
              <button key={c.id} type="button" {...props} onClick={() => go(i)}>
                {inner}
              </button>
            )
          })}
        </div>
      </div>
      <div className="afr-car-ctl">
        <button type="button" className="afr-car-arrow" aria-label={text.prev} onClick={() => go(active - 1)}>
          ←
        </button>
        <span className="afr-car-count" aria-live="polite">
          {active + 1} / {n}
        </span>
        <button type="button" className="afr-car-arrow" aria-label={text.next} onClick={() => go(active + 1)}>
          →
        </button>
      </div>
      <p className="afr-car-credit">
        {text.photo}{" "}
        <a href={`https://unsplash.com/@${cur.user}?utm_source=sentria&utm_medium=referral`} target="_blank" rel="noopener noreferrer">
          {cur.by}
        </a>{" "}
        /{" "}
        <a href="https://unsplash.com/?utm_source=sentria&utm_medium=referral" target="_blank" rel="noopener noreferrer">
          Unsplash
        </a>
      </p>
    </div>
  )
}
