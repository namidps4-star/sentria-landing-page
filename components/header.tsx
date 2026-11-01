"use client"

import { useEffect, useState } from "react"
import { C } from "@/content/en"
import { T } from "./t"
import { Mark } from "./ui"
import { setLang, useLang, useText } from "./lang"

const APP_URL = "https://app.sentriahq.dev"
const HREFS = ["/#situations", "/#methode", "/#cockpit", "/#tarifs", "/#fit", "/#faq", "/articles"]

export function LangSwitch() {
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
        <a className="logo" href="/#top" aria-label={txt("SentrIA, back to top", "SentrIA, retour en haut")} onClick={() => setOpen(false)}>
          <span className="logo-mark">
            <Mark />
          </span>
          <svg className="logo-word" viewBox="40 -705 4405 855" role="img" aria-label="SentrIA">
            <path d="M131 -145C166 -115 207 -90 255 -72C302 -53 351 -44 401 -45C434 -45 458 -50 474 -60C489 -69 497 -83 497 -102C497 -124 488 -141 471 -155C453 -168 423 -180 382 -192C346 -202 310 -213 273 -225C235 -236 201 -251 171 -271C140 -290 115 -315 96 -345C76 -375 66 -413 66 -461C66 -503 74 -539 91 -570C107 -600 129 -625 158 -645C186 -664 219 -678 257 -688C294 -697 334 -702 376 -702C405 -702 433 -700 460 -696C486 -692 512 -686 538 -678C563 -669 588 -658 614 -646C638 -633 664 -618 691 -600L609 -440C577 -464 541 -484 503 -498C464 -512 423 -519 381 -521C367 -521 354 -521 342 -520C329 -518 318 -515 309 -511C299 -506 292 -500 287 -494C281 -487 278 -479 278 -469C278 -459 279 -450 283 -443C285 -435 291 -427 300 -421C308 -414 321 -407 338 -401C354 -394 375 -387 403 -380C445 -368 486 -355 524 -343C561 -329 594 -313 622 -294C650 -274 672 -249 688 -220C704 -190 712 -153 712 -109C712 -67 704 -31 688 -1C672 29 649 55 621 75C592 95 558 110 519 120C479 130 436 135 390 135C323 135 261 125 204 105C146 85 92 57 43 22Z M1012.0 -74C1042.0 -36 1085.0 -17 1143.0 -17C1183.0 -17 1217.0 -23 1246.0 -36C1274.0 -48 1301.0 -67 1327.0 -95L1462.0 5C1424.0 49 1380.0 83 1332.0 108C1282.0 132 1225.0 145 1159.0 145C1105.0 145 1055.0 137 1011.0 123C966.0 107 927.0 86 895.0 58C862.0 30 837.0 -4 819.0 -45C801.0 -85 792.0 -130 792.0 -181C792.0 -230 801.0 -275 820.0 -316C838.0 -356 863.0 -390 895.0 -419C927.0 -447 964.0 -469 1007.0 -485C1049.0 -500 1095.0 -508 1144.0 -508C1194.0 -508 1240.0 -500 1282.0 -486C1324.0 -470 1360.0 -449 1390.0 -421C1420.0 -393 1443.0 -358 1461.0 -318C1477.0 -277 1486.0 -231 1486.0 -180ZM1151.0 -348C1105.0 -348 1068.0 -337 1039.0 -315C1009.0 -293 991.0 -262 983.0 -223L1275.0 -288C1261.0 -305 1244.0 -319 1224.0 -331C1203.0 -342 1179.0 -348 1151.0 -348Z M1778.0 -436C1790.0 -445 1803.0 -454 1817.0 -462C1831.0 -469 1845.0 -475 1861.0 -481C1875.0 -486 1890.0 -490 1906.0 -494C1920.0 -496 1934.0 -498 1948.0 -498C1988.0 -498 2025.0 -492 2059.0 -481C2093.0 -469 2122.0 -452 2148.0 -431C2172.0 -409 2192.0 -384 2206.0 -355C2220.0 -325 2227.0 -293 2227.0 -258V115H2019.0V-194C2019.0 -218 2016.0 -239 2010.0 -257C2004.0 -273 1996.0 -287 1986.0 -298C1976.0 -308 1964.0 -315 1952.0 -320C1938.0 -324 1925.0 -326 1912.0 -326C1882.0 -326 1856.0 -317 1835.0 -299C1813.0 -280 1798.0 -256 1792.0 -226V115H1584.0V-478H1762.0Z M2613.0 -478H2749.0V-306H2613.0V-110C2613.0 -94 2617.0 -81 2627.0 -72C2636.0 -62 2649.0 -57 2666.0 -57H2759.0V115H2589.0C2563.0 115 2540.0 111 2518.0 103C2496.0 94 2476.0 82 2460.0 67C2442.0 51 2429.0 33 2420.0 12C2410.0 -10 2405.0 -34 2405.0 -62V-306H2297.0V-478H2405.0V-682H2613.0Z M3020.0 -426C3035.0 -443 3054.0 -456 3078.0 -465C3101.0 -473 3125.0 -478 3151.0 -478H3281.0L3245.0 -306H3125.0C3113.0 -306 3101.0 -303 3091.0 -298C3080.0 -292 3071.0 -285 3063.0 -276C3055.0 -266 3048.0 -255 3044.0 -243C3039.0 -230 3037.0 -216 3037.0 -202V115H2829.0V-478H3007.0Z M3567.0 -682V115H3359.0V-682Z M3637.0 115 3907.0 -682H4169.0L4439.0 115H4231.0L4155.0 -108L3897.0 -37L3845.0 115ZM3961.0 -226 4101.0 -265 4038.0 -452Z" fill="currentColor" />
          </svg>
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
          <a className="nav-signin" href={APP_URL}>
            {txt("Sign in", "Connexion")}
          </a>
          <a className="btn btn-lime nav-cta" href="/#demo" data-mag="">
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
          <a className="btn btn-line" href={APP_URL}>
            {txt("Sign in", "Connexion")}
          </a>
          <a className="btn btn-lime" href="/#demo" onClick={() => setOpen(false)}>
            <T s="Book a demo →" />
          </a>
        </div>
      </div>
    </header>
  )
}
