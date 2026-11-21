import type { KeyboardEvent } from "react"

/** Arrow, Home and End keys for a row of tabs. Calls `go` with the index to move to. */
export function tabNav(e: KeyboardEvent, i: number, n: number, go: (k: number) => void) {
  let next: number | null = null
  if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (i + 1) % n
  else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (i - 1 + n) % n
  else if (e.key === "Home") next = 0
  else if (e.key === "End") next = n - 1
  if (next === null) return
  e.preventDefault()
  go(next)
}
