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
