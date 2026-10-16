"use client"

import { useEffect, useState } from "react"
import { C } from "@/content/en"
import { T } from "./t"
import { Beacon } from "./ui"
import { setLang, useLang, useText } from "./lang"

const HREFS = ["#situations", "#methode", "#cockpit", "#tarifs", "#secteurs", "#faq"]

function LangSwitch() {
  const lang = useLang()
  return (
    <div className="lang-switch" role="group" aria-label="Language">
      <button type="button" aria-pressed={lang === "en"} onClick={() => setLang("en")}>
        EN
      </button>
      <span aria-hidden="true">/</span>
      <button type="button" aria-pressed={lang === "fr"} onClick={() => setLang("fr")}>
        FR
      </button>
    </div>
  )
}

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const txt = useText()

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 30)
    on()
    window.addEventListener("scroll", on, { passive: true })
    return () => window.removeEventListener("scroll", on)
  }, [])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener("keydown", onKey)
    }
  }, [open])

  return (
    <header className="hd" data-scrolled={scrolled ? "1" : undefined}>
      <nav className="bar" aria-label={txt("Main", "Principal")}>
        <a className="logo" href="#top" aria-label={txt("SentrIA, back to top", "SentrIA, retour en haut")} onClick={() => setOpen(false)}>
          <span className="logo-mark">
            <Beacon />
          </span>
          <span className="logo-word">SentrIA</span>
        </a>

        <div className="nav-links">
          {C.nav.map((n, i) => (
            <a key={n} href={HREFS[i]}>
              <T s={n} />
            </a>
          ))}
        </div>

        <div className="nav-actions">
          <LangSwitch />
          <a className="btn btn-lime nav-cta" href="#demo" data-mag="">
            <T s="Book a demo →" />
          </a>
          <button
            type="button"
            className="burger"
            aria-label={open ? txt("Close menu", "Fermer le menu") : txt("Open menu", "Ouvrir le menu")}
            aria-expanded={open}
            aria-controls="menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </nav>

      <div id="menu" className="menu" data-open={open ? "1" : undefined} hidden={!open}>
        <ul>
          {C.nav.map((n, i) => (
            <li key={n} style={{ ["--i" as string]: i } as React.CSSProperties}>
              <a href={HREFS[i]} onClick={() => setOpen(false)}>
                <T s={n} />
              </a>
            </li>
          ))}
        </ul>
        <div className="menu-foot">
          <LangSwitch />
          <a className="btn btn-lime" href="#demo" onClick={() => setOpen(false)}>
            <T s="Book a demo →" />
          </a>
        </div>
      </div>
    </header>
  )
}
