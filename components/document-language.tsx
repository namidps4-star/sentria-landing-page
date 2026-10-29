"use client"

import { usePathname } from "next/navigation"
import { useEffect } from "react"

import { SEO } from "@/content/seo"
import { useLang } from "./lang"

/** On the home page, the tab title and the meta description follow the visitor's language.
 *  Other pages (Privacy, Terms) keep their own titles. The
 *  server HTML says English, which is what a crawler reads. Next writes <head>
 *  after hydration, so the change is re-applied whenever the head changes. */
export function DocumentLanguage() {
  const lang = useLang()
  const home = usePathname() === "/"

  useEffect(() => {
    if (!home) return
    const { title, description } = SEO[lang]

    function apply() {
      if (document.title !== title) document.title = title
      const meta = document.querySelector('meta[name="description"]')
      if (meta && meta.getAttribute("content") !== description) meta.setAttribute("content", description)
    }

    apply()
    const observer = new MutationObserver(apply)
    observer.observe(document.head, { childList: true, subtree: true, characterData: true })
    return () => observer.disconnect()
  }, [lang, home])

  return null
}
