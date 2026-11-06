"use client"

import type { ReactNode } from "react"
import { FR } from "@/content/fr"
import { useLang } from "./lang"

/**
 * Renders a string in the page's language. Each page has one language, so the
 * server HTML of /en and /fr holds only that language. A string without a French
 * entry (or identical in French) shows as written.
 */
export function T({ s, fr }: { s: string; fr?: string }) {
  const lang = useLang()
  const f = fr ?? FR[s]
  if (lang !== "fr" || !f) return <>{s}</>
  return <>{f}</>
}

/** A string that exists only as {en, fr}. */
export function B({ en, fr }: { en: string; fr: string }) {
  const lang = useLang()
  return <>{lang === "fr" ? fr : en}</>
}

/** Picks one of two pieces of markup (for example a block of text with its own spans, or an image per language). */
export function LangPick({ en, fr }: { en: ReactNode; fr: ReactNode }) {
  const lang = useLang()
  return <>{lang === "fr" ? fr : en}</>
}
