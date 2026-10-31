"use client"

import { useSyncExternalStore } from "react"

export type Lang = "en" | "fr"

const listeners = new Set<() => void>()

function subscribe(cb: () => void) {
  listeners.add(cb)
  return () => {
    listeners.delete(cb)
  }
}

function snapshot(): Lang {
  return document.documentElement.lang === "fr" ? "fr" : "en"
}

export function setLang(l: Lang) {
  document.documentElement.lang = l
  try {
    localStorage.setItem("sentria-language", l)
  } catch {
    /* private mode: the choice just does not persist */
  }
  /* On the home page the address follows the language: /en or /fr. */
  if (["/", "/en", "/fr"].includes(location.pathname)) history.replaceState(null, "", `/${l}`)
  listeners.forEach((f) => f())
}

/** Current language. The server snapshot is "en"; the head script has already set <html lang>. */
export function useLang(): Lang {
  return useSyncExternalStore(subscribe, snapshot, () => "en")
}

/** Pick the string for the current language (for attributes such as aria-label). */
export function useText() {
  const lang = useLang()
  return (en: string, fr: string) => (lang === "fr" ? fr : en)
}
