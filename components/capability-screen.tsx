import type { CSSProperties, PointerEventHandler } from "react"
import type { Capability } from "@/content/africa-capabilities"

type Labels = {
  alert: string
  youImport: string
  hint: string
  hintOpen: string
  cta: string
  ctaHref: string
}

const step = (i: number) => ({ "--i": i }) as CSSProperties

/** Split an alert at its last colon: the lead-in, then the action to take (set in lime). */
function splitAlert(text: string): [string, string] {
  const m = /^(.*[:：]\s)(\S.*)$/.exec(text)
  return m ? [m[1], m[2]] : [text, ""]
}

const Arrow = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

/**
 * The centre card. The Problem panel is always on show. The Solution card sits behind it and slides
 * out to the right when a capability is open, widening the white frame as it goes.
 * Every capability is rendered in the same grid cell and only the current one is visible, so the card
 * is exactly as tall as the tallest capability on the page and never jumps when the text changes.
 */
export function CapabilityScreen({
  items,
  shown,
  open,
  labels,
  id,
  onPointerEnter,
  onPointerLeave,
}: {
  items: Capability[]
  shown: number
  open: boolean
  labels: Labels
  id: string
  onPointerEnter?: PointerEventHandler<HTMLDivElement>
  onPointerLeave?: PointerEventHandler<HTMLDivElement>
}) {
  return (
    <div className={`afr-card${open ? " is-open" : ""}`} onPointerEnter={onPointerEnter} onPointerLeave={onPointerLeave}>
      <div className="afr-card-inner">
        <div className="afr-lp">
          <div className="afr-layers">
            {items.map((item, i) => (
              <div className="afr-layer" data-on={i === shown ? "1" : "0"} key={item.title}>
                <h3 style={step(0)}>
                  <span className="afr-lp-a">{item.title}</span>
                  <span className="afr-lp-b">{item.problem}</span>
                </h3>
                <p className="afr-lp-does" style={step(1)}>
                  {item.does}
                </p>
                <ul className="afr-lp-chips" aria-label={labels.youImport} style={step(2)}>
                  {item.chips.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <span className="afr-pill-dark" aria-hidden="true">
            {open ? labels.hintOpen : labels.hint}
            <i>
              <Arrow />
            </i>
          </span>
        </div>

        <div className="afr-rp" id={id} aria-live="polite" aria-hidden={!open}>
          {items.map((item, i) => {
            const [lead, action] = splitAlert(item.example)
            return (
              <div className="afr-layer afr-rp-body" data-on={i === shown ? "1" : "0"} key={item.title}>
                <h3 style={step(0)}>{labels.alert}</h3>
                <p className="afr-rp-alert" style={step(1)}>
                  {lead}
                  {action && <b>{action}</b>}
                </p>
                <a className="afr-pill-lime" href={labels.ctaHref} tabIndex={open && i === shown ? 0 : -1} style={step(2)}>
                  {labels.cta}
                  <i>
                    <Arrow />
                  </i>
                </a>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
