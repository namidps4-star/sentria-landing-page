"use client"

import type { ReactNode } from "react"
import { localHref, useLang } from "./lang"

/** A link that opens the visitor's language version of the page. */
export function LocalLink({ href, children }: { href: string; children: ReactNode }) {
  const lang = useLang()
  return <a href={localHref(href, lang)}>{children}</a>
}
