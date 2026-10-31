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

/** The SentrIA mark: a lime dome (the alert) over a white bowl (the intelligence). For dark backgrounds. */
export function Mark() {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className="mark">
      <g strokeWidth="10" strokeLinejoin="round">
        <path d="M14 42.5a23 23 0 0 1 46 0z" fill="var(--lime)" stroke="var(--lime)" />
        <path d="M40 57.5a23 23 0 0 0 46 0z" fill="#fff" stroke="#fff" />
      </g>
      <rect x="9" y="40" width="10" height="17.5" rx="5" fill="var(--lime)" />
      <rect x="81" y="42.5" width="10" height="17.5" rx="5" fill="#fff" />
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
