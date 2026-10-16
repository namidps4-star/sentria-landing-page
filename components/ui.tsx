import type { CSSProperties, ReactNode } from "react"

/** Stagger index for reveal animations. */
export function iv(i: number): CSSProperties {
  return { ["--i" as string]: i } as CSSProperties
}

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg className={`ar ${className}`} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function Check({ className = "" }: { className?: string }) {
  return (
    <svg className={`ck ${className}`} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12.5l4.2 4.2L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function Beacon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" className="beacon">
      <g stroke="currentColor" strokeWidth="4.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M24 4.2V11" />
        <path d="M9.6 9.6l4.9 4.9" />
        <path d="M38.4 9.6l-4.9 4.9" />
        <path d="M9 31a15 15 0 0 1 30 0" />
        <path d="M17 31a7 7 0 0 1 14 0" />
        <path d="M24 12.6V33" />
      </g>
      <rect x="5" y="35" width="38" height="8.4" rx="4.2" fill="currentColor" />
    </svg>
  )
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="eyebrow" data-rv="fade">
      {children}
    </div>
  )
}
