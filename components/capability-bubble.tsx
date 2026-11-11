"use client"

import { useId, useRef, useState, type PointerEvent } from "react"

type Props = {
  index: number
  example: string
  imports: string
  labels: { hint: string; example: string; youImport: string }
}

/** Floating half-disc. Hover (mouse) or tap/Enter (touch, keyboard) opens it to show a real product alert. */
export function CapabilityBubble({ index, example, imports, labels }: Props) {
  const [open, setOpen] = useState(false)
  const lastPointer = useRef("")
  const panelId = useId()

  const onPointerDown = (e: PointerEvent<HTMLButtonElement>) => {
    lastPointer.current = e.pointerType
  }
  const onPointerEnter = (e: PointerEvent<HTMLButtonElement>) => {
    if (e.pointerType === "mouse") setOpen(true)
  }
  const onPointerLeave = (e: PointerEvent<HTMLButtonElement>) => {
    if (e.pointerType === "mouse") setOpen(false)
  }
  const onClick = () => {
    const type = lastPointer.current
    lastPointer.current = ""
    // Mouse users are handled by hover; a click must not close what hover opened.
    if (type === "mouse") return
    setOpen((o) => !o)
  }

  return (
    <button
      type="button"
      className={`afr-caps-bub${open ? " is-open" : ""}`}
      aria-expanded={open}
      aria-controls={panelId}
      onPointerDown={onPointerDown}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onClick={onClick}
    >
      <span className="afr-caps-body">
        <span className="afr-caps-face afr-caps-idle">
          <span className="afr-caps-num">{String(index).padStart(2, "0")}</span>
          <span className="afr-caps-hint">
            <i aria-hidden="true">+</i>
            {labels.hint}
          </span>
        </span>
        <span className="afr-caps-face afr-caps-open" id={panelId}>
          <span className="afr-caps-k">{labels.example}</span>
          <span className="afr-caps-v">{example}</span>
          <span className="afr-caps-f">
            <b>{labels.youImport}:</b> {imports}
          </span>
        </span>
      </span>
    </button>
  )
}
