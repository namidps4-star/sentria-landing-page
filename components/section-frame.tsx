import type { ReactNode } from "react"

export type Tone = "cream" | "sand" | "dark" | "olive" | "lime" | "deep"

export function Sec({ id, tone, className = "", children }: { id?: string; tone: Tone; className?: string; children: ReactNode }) {
  return (
    <section id={id} className={`sc sc-${tone} ${className}`}>
      <div className="wrap">{children}</div>
    </section>
  )
}

export function H2({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <h2 className={`h2 ${className}`} data-rv="rise">
      {children}
    </h2>
  )
}
