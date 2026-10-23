"use client"

import { useEffect, useState } from "react"

const pad = (n: number) => String(n).padStart(2, "0")

/** The contents list. The entry of the section at the top of the page follows the reader. */
export function LegalToc({ entries }: { entries: { en: string; fr: string }[] }) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-legal-section]"))
    const on = () => {
      const line = window.scrollY + 140
      let at = 0
      nodes.forEach((n, i) => {
        if (n.offsetTop <= line) at = i
      })
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) at = nodes.length - 1
      setCurrent(at)
    }
    on()
    window.addEventListener("scroll", on, { passive: true })
    return () => window.removeEventListener("scroll", on)
  }, [])

  return (
    <nav className="lg-toc" aria-label="Contents">
      {entries.map((e, i) => (
        <a key={e.en} href={`#s${i}`} aria-current={current === i ? "true" : undefined}>
          <span className="lg-n" aria-hidden="true">
            {pad(i + 1)}
          </span>
          <span className="en">{e.en}</span>
          <span className="fr" lang="fr">
            {e.fr}
          </span>
        </a>
      ))}
    </nav>
  )
}
