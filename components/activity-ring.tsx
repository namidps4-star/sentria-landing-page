"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import type { KeyboardEvent } from "react"
import type { ActivityCard } from "@/content/africa-activity-cards"
import { RingFilters } from "./activity-ring-filters"
import { startRing } from "./activity-ring-engine"
import { newPhys, type Phys } from "./activity-ring-physics"
import "./activity-ring.css"

export type RingText = { carousel: string; label: string; prev: string; next: string; more: string; view: string; open: string; hint: string }
type Props = { lang: "en" | "fr"; base: string; cards: ActivityCard[]; text: RingText }

const pad = (n: number) => String(n).padStart(2, "0")

/* A ring of photos seen from inside, after the Frieze motion: spin it by dragging, scrolling or the arrows. */
export function ActivityRing({ lang, base, cards, text }: Props) {
  const n = cards.length
  const [active, setActive] = useState(0)
  const stage = useRef<HTMLDivElement>(null)
  const cardEls = useRef<(HTMLElement | null)[]>([])
  const veilEls = useRef<(HTMLElement | null)[]>([])
  const cursor = useRef<HTMLDivElement>(null)
  const cursorLabel = useRef<HTMLSpanElement>(null)
  const bar = useRef<HTMLElement>(null)
  const phys = useRef<Phys>(newPhys(false))
  const activeRef = useRef(0)
  const hover = useRef(-1)
  const didDrag = useRef(false)
  const goTo = useRef<(i: number) => void>(() => {})
  const stepBy = useRef<(d: number) => void>(() => {})

  useEffect(() => {
    return startRing({ stage, cardEls, veilEls, cursor, cursorLabel, bar, phys, activeRef, hover, didDrag, goTo, stepBy }, cards, text, setActive)
  }, [cards, text])

  // Real clicks can land on the 3D container, not the card under the pointer: look the card up by position.
  const onClickCapture = (e: React.MouseEvent) => {
    if (didDrag.current) {
      e.preventDefault()
      e.stopPropagation()
      didDrag.current = false
      return
    }
    const own = (e.target as HTMLElement).closest<HTMLElement>("[data-card]")
    const hit = own ?? document.elementsFromPoint(e.clientX, e.clientY).find((x): x is HTMLElement => x instanceof HTMLElement && x.dataset.card !== undefined && x.dataset.far !== "1")
    if (!hit) return
    const i = Number(hit.dataset.card)
    if (i !== activeRef.current) {
      e.preventDefault()
      goTo.current(i)
    } else if (!own) hit.click()
  }
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowLeft") stepBy.current(-1)
    if (e.key === "ArrowRight") stepBy.current(1)
  }

  const hrefOf = (c: ActivityCard) => (c.slug ? `${base}/${c.slug}` : (c.href?.[lang] ?? "#"))
  const cur = cards[active]
  return (
    <div className="afr-ring" role="group" aria-roledescription={text.carousel} aria-label={text.label} onKeyDown={onKeyDown}>
      <RingFilters />
      <div className="afr-ring-stage" ref={stage} onClickCapture={onClickCapture}>
        {cards.map((c, i) => {
          let d = (((i - active) % n) + n) % n
          if (d > n / 2) d -= n
          const far = Math.abs(d) > 2
          const common = {
            ref: (el: HTMLElement | null) => {
              cardEls.current[i] = el
            },
            className: "afr-ring-card",
            style: { opacity: 0 },
            "data-card": i,
            "data-d": d,
            "aria-label": `${c.name[lang]}${c.sector ? ` (${c.sector[lang]})` : ""}, ${i + 1} / ${n}`,
            "aria-hidden": far || undefined,
            tabIndex: far ? -1 : 0,
            onFocus: () => i !== activeRef.current && goTo.current(i),
          }
          const inner = (
            <>
              <Image src={c.photo} alt={c.alt[lang]} fill sizes="(max-width: 760px) 220px, 300px" className="afr-ring-img" draggable={false} />
              <span className="afr-ring-tag">
                {c.sector && <span className="afr-ring-kick">{c.sector[lang]}</span>}
                <span className="afr-ring-nm">{c.name[lang]}</span>
              </span>
              <span className="afr-ring-go" aria-hidden="true">→</span>
              <span className="afr-ring-veil" ref={(el) => void (veilEls.current[i] = el)} />
            </>
          )
          return (
            <a key={c.id} {...common} href={hrefOf(c)} draggable={false}>
              {inner}
            </a>
          )
        })}
        <div className="afr-ring-cursor" ref={cursor} aria-hidden="true">
          <span ref={cursorLabel}>{text.view}</span>
        </div>
        <i className="afr-ring-bar" aria-hidden="true">
          <b ref={bar} />
        </i>
      </div>

      <div className="afr-ring-info">
        <div className="afr-ring-ctl">
          <button type="button" className="afr-ring-arrow" aria-label={text.prev} onClick={() => stepBy.current(-1)}>
            ←
          </button>
          <span className="afr-ring-count" aria-live="polite">
            {pad(active + 1)} / {pad(n)}
          </span>
          <button type="button" className="afr-ring-arrow" aria-label={text.next} onClick={() => stepBy.current(1)}>
            →
          </button>
        </div>
        <div className="afr-ring-text" key={cur.id}>
          {cur.sector && <p className="afr-ring-kicker">{cur.sector[lang]}</p>}
          <h3>{cur.name[lang]}</h3>
          <p>{cur.line[lang]}</p>
          <a className="afr-ring-cta" href={hrefOf(cur)}>
            {text.more}
          </a>
        </div>
        <p className="afr-ring-hint">{text.hint}</p>
      </div>
    </div>
  )
}
