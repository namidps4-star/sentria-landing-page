import { useId, type ButtonHTMLAttributes } from "react"
import type { CapabilityIcon } from "@/content/africa-capabilities"
import { IconPath } from "@/components/capability-icons"

type Props = {
  title: string
  icon: CapabilityIcon
  active: boolean
  panelId: string
  handlers: ButtonHTMLAttributes<HTMLButtonElement>
}

/**
 * A flat bubble: grey above, lime below with a wavy waterline. When active the lime rises and fills it
 * (the Problem becomes the Solution). It is the button that selects one capability.
 */
export function CapabilityBubble({ title, icon, active, panelId, handlers }: Props) {
  const clip = useId()
  return (
    <button
      type="button"
      className={`afr-bub${active ? " is-active" : ""}`}
      aria-label={title}
      aria-pressed={active}
      aria-controls={panelId}
      {...handlers}
    >
      <span className="afr-bub-disc" aria-hidden="true">
        <svg viewBox="0 0 200 200" width="100%" height="100%">
          <defs>
            <clipPath id={clip}>
              <circle cx="100" cy="100" r="98" />
            </clipPath>
          </defs>
          <g clipPath={`url(#${clip})`}>
            <rect width="200" height="200" fill="#f1f1ef" />
            <path
              className="afr-bub-lime"
              d="M0 108 C25 98,50 118,75 108S125 98,150 108S190 114,200 108V300H0Z"
              fill="#c6ff4a"
            />
          </g>
          <circle cx="100" cy="100" r="98.5" fill="none" stroke="#dcdcd6" strokeWidth="2" />
          <g
            className="afr-bub-icon"
            fill="none"
            stroke="#111"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <IconPath name={icon} />
          </g>
        </svg>
      </span>
      <span className="afr-bub-pill" aria-hidden="true">
        {title}
      </span>
    </button>
  )
}
