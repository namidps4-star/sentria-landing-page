"use client"

import { useEffect, useState } from "react"
import { C } from "@/content/en"
import { T } from "./t"
import { Mark } from "./ui"
import { localHref, useLang, useText } from "./lang"

const APP_URL = "https://app.sentriahq.dev"
const HREFS = ["/#situations", "/#methode", "/#cockpit", "/#tarifs", "/#fit", "/#faq", "/articles", "/africa"]

export function LangSwitch() {
  const lang = useLang()
  return (
    <div className="lang-switch" role="group" aria-label="Language">
      <a href="/en" aria-current={lang === "en" ? "true" : undefined} hrefLang="en" lang="en">
        EN
      </a>
      <span aria-hidden="true">/</span>
      <a href="/fr" aria-current={lang === "fr" ? "true" : undefined} hrefLang="fr" lang="fr">
        FR
      </a>
    </div>
  )
}

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const txt = useText()
  const lang = useLang()

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
        <a className="logo" href={localHref("/#top", lang)} aria-label={txt("SentrIA, back to top", "SentrIA, retour en haut")} onClick={() => setOpen(false)}>
          <span className="logo-mark">
            <Mark />
          </span>
          <svg className="logo-word" viewBox="11 -737 4372 917" role="img" aria-label="SentrIA">
            <path d="M112 -99C130 -83 150 -70 172 -58C193 -46 216 -35 240 -27C264 -18 289 -12 315 -8C340 -3 366 -1 392 -2C432 -2 465 -10 491 -25C516 -39 529 -63 529 -95C529 -131 516 -158 491 -177C465 -195 428 -209 379 -221C329 -231 285 -244 247 -259C208 -273 176 -291 150 -311C124 -331 104 -354 91 -381C77 -407 71 -438 71 -474C71 -512 79 -545 95 -573C111 -600 132 -623 160 -642C187 -660 218 -674 254 -684C289 -692 326 -697 366 -697C419 -697 470 -688 518 -672C566 -654 614 -631 662 -601L603 -482C571 -505 534 -524 494 -540C453 -555 412 -563 372 -565C355 -565 338 -564 322 -562C304 -559 289 -554 276 -548C262 -541 250 -532 242 -521C233 -509 229 -495 229 -479C229 -464 231 -451 236 -441C240 -429 249 -419 261 -411C273 -401 289 -393 309 -385C329 -377 354 -369 386 -361C441 -346 488 -331 527 -315C565 -298 596 -280 620 -260C643 -239 660 -216 671 -190C681 -164 687 -133 687 -99C687 -61 679 -29 663 -1C647 27 625 51 598 71C570 90 538 105 501 115C463 125 422 130 380 130C319 130 261 119 205 99C148 78 97 52 51 20ZM957 -82C971 -50 992 -25 1021 -8C1049 9 1085 18 1128 18C1168 18 1204 11 1238 -2C1270 -15 1300 -38 1327 -70L1428 7C1393 49 1351 81 1303 105C1254 128 1201 140 1144 140C1094 140 1048 132 1006 118C963 102 926 81 895 54C863 26 838 -8 820 -48C801 -87 792 -131 792 -181C792 -229 800 -273 818 -313C835 -352 859 -386 889 -415C919 -443 954 -465 996 -481C1036 -496 1081 -504 1129 -504C1175 -504 1218 -496 1258 -481C1296 -465 1330 -444 1359 -418C1387 -390 1410 -358 1428 -321C1444 -283 1454 -241 1456 -197ZM1136 -382C1076 -382 1030 -365 996 -333C961 -299 942 -254 939 -198L1299 -284C1281 -318 1259 -343 1231 -359C1203 -374 1171 -382 1136 -382ZM1729 -412C1739 -424 1753 -436 1769 -446C1784 -456 1801 -464 1819 -472C1837 -478 1855 -484 1875 -488C1894 -491 1913 -493 1931 -493C1967 -493 2002 -487 2034 -476C2066 -464 2094 -449 2118 -429C2142 -408 2161 -383 2175 -355C2188 -325 2195 -293 2195 -258V110H2037V-204C2037 -262 2024 -305 1999 -332C1973 -358 1939 -371 1895 -371C1857 -371 1824 -358 1796 -333C1767 -307 1748 -271 1740 -226V110H1582V-473H1716ZM2566 -473H2712V-351H2566V-75C2566 -55 2571 -39 2582 -29C2592 -17 2607 -12 2629 -12H2722V110H2563C2541 110 2521 106 2503 100C2483 93 2467 83 2453 71C2439 58 2428 43 2420 25C2412 6 2408 -14 2408 -38V-351H2290V-473H2408V-677H2566ZM2969 -408C2983 -428 3002 -444 3027 -456C3051 -467 3080 -473 3114 -473H3238L3213 -351H3088C3072 -351 3058 -347 3045 -340C3031 -332 3019 -321 3009 -309C2998 -295 2990 -280 2984 -264C2978 -247 2975 -230 2975 -212V110H2817V-473H2955ZM3490 -677V110H3332V-677ZM3590 110 3880 -677H4053L4343 110H4186L4096 -143L3809 -65L3747 110ZM3857 -198 4057 -252 3966 -506Z" fill="currentColor" />
          </svg>
        </a>

        <div className="nav-links">
          {C.nav.map((n, i) => (
            <a key={n} href={localHref(HREFS[i], lang)}>
              <T s={n} />
            </a>
          ))}
        </div>

        <div className="nav-actions">
          <LangSwitch />
          <a className="nav-signin" href={APP_URL}>
            {txt("Sign in", "Connexion")}
          </a>
          <a className="btn btn-lime nav-cta" href={localHref("/#demo", lang)} data-mag="">
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
              <a href={localHref(HREFS[i], lang)} onClick={() => setOpen(false)}>
                <T s={n} />
              </a>
            </li>
          ))}
        </ul>
        <div className="menu-foot">
          <LangSwitch />
          <a className="btn btn-line" href={APP_URL}>
            {txt("Sign in", "Connexion")}
          </a>
          <a className="btn btn-lime" href={localHref("/#demo", lang)} onClick={() => setOpen(false)}>
            <T s="Book a demo →" />
          </a>
        </div>
      </div>
    </header>
  )
}
