"use client"

import { createContext, useContext } from "react"

export type Lang = "en" | "fr"

/** The language of the page being rendered. Set by the /en and /fr layouts; other pages read it from <html lang>. */
export const LangContext = createContext<Lang>("en")

/** Current language. */
export function useLang(): Lang {
  return useContext(LangContext)
}

/** Pick the string for the current language (for attributes such as aria-label). */
export function useText() {
  const lang = useLang()
  return (en: string, fr: string) => (lang === "fr" ? fr : en)
}

/** The address of a page in the visitor's language: /fr pages for French, the plain path for English. */
export function localHref(href: string, lang: Lang): string {
  if (href === "/#top" || href.startsWith("/#")) return lang === "fr" ? `/fr${href.slice(1)}` : href
  if (href === "/articles") return lang === "fr" ? "/fr/articles" : href
  if (href === "/africa") return lang === "fr" ? "/afrique" : href
  if (href === "/privacy" || href === "/terms") return lang === "fr" ? `/fr${href}` : href
  return href
}
