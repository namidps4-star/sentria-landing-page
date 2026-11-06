"use client"

import { useEffect, useSyncExternalStore, type ReactNode } from "react"
import { LangContext, type Lang } from "./lang"

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

/** Provides the page language. With `lang` (the /en and /fr pages) it is fixed; without it, the language comes from <html lang>. */
export function LangProvider({ lang, children }: { lang?: Lang; children: ReactNode }) {
  const fromDocument = useSyncExternalStore(subscribe, snapshot, () => "en" as Lang)
  useEffect(() => {
    if (lang) document.documentElement.lang = lang
  }, [lang])
  return <LangContext.Provider value={lang ?? fromDocument}>{children}</LangContext.Provider>
}
