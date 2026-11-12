"use client"

import { useId, useRef, useState, type PointerEvent } from "react"

type Props = {
  problem: string
  example: string
  imports: string
  labels: { problem: string; solution: string; hint: string; example: string; youImport: string }
}

/**
 * One circle: white top half = the Problem, green bottom half = the Solution.
 * Hover (mouse) or tap/Enter (touch, keyboard) lifts the green to open the SentrIA
 * feature, with its real example alert and what the user imports.
 */
export function CapabilityBubble({ problem, example, imports, labels }: Props) {
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
      <span className="afr-caps-orb">
        <span className="afr-caps-green" aria-hidden="true" />

        <span className="afr-caps-zone afr-caps-top">
          <span className="afr-caps-tag">
            <i className="afr-caps-dot afr-caps-dot-prob" aria-hidden="true" />
            {labels.problem}
          </span>
          <span className="afr-caps-ptxt">{problem}</span>
        </span>

        <span className="afr-caps-zone afr-caps-idle">
          <span className="afr-caps-tag">
            <i className="afr-caps-dot afr-caps-dot-sol" aria-hidden="true" />
            {labels.solution}
          </span>
          <span className="afr-caps-hint">{labels.hint}</span>
        </span>

        <span className="afr-caps-zone afr-caps-feat" id={panelId}>
          <span className="afr-caps-tag">
            <i className="afr-caps-dot afr-caps-dot-sol" aria-hidden="true" />
            {labels.example}
          </span>
          <span className="afr-caps-v">{example}</span>
          <span className="afr-caps-f">
            <b>{labels.youImport}:</b> {imports}
          </span>
        </span>
      </span>
    </button>
  )
}
