"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { B, LangPick } from "./t"
import dashEn from "@/assets/dash/dash-crop-en.webp"
import dashFr from "@/assets/dash/dash-crop-fr.webp"

/** Parts of the dashboard picture, in % of the picture. Step 0 has no part: the whole screen. */
const STEPS: ({ l: number; t: number; w: number; h: number; en: string; fr: string } | null)[] = [
  null,
  { l: 25.0, t: 14.0, w: 70.9, h: 19.4, en: "Ranked by value at risk", fr: "Classées par valeur à risque" },
  { l: 25.0, t: 44.0, w: 17.1, h: 15.1, en: "Critical stockouts first", fr: "Les ruptures critiques d'abord" },
  { l: 25.0, t: 61.0, w: 46.5, h: 30.2, en: "Seven days, so you see it coming", fr: "Sept jours, pour voir venir" },
  { l: 72.8, t: 61.0, w: 23.3, h: 30.2, en: "Where the risk comes from", fr: "D'où vient le risque" },
]
const CAPS = [
  { en: "Scroll to open the dashboard.", fr: "Faites défiler pour ouvrir le tableau de bord." },
  { en: "What needs you right now, with its evidence.", fr: "Ce qui vous attend maintenant, avec ses preuves." },
  { en: "The money at risk is the first thing you see.", fr: "L'argent en jeu est la première chose que vous voyez." },
  { en: "The trend of the last seven days.", fr: "La tendance des sept derniers jours." },
  { en: "The alerts by type.", fr: "Les alertes par type." },
]
const clamp = (n: number) => Math.min(1, Math.max(0, n))

/**
 * The dashboard, scroll driven. The window rises from a tilt as the section scrolls, then a lime spotlight
 * walks through four parts. A mouse tilts the window, lights it under the cursor and jumps the spotlight to
 * the part under the pointer; touch and keyboard use the numbered buttons. Reduced motion: flat, no pinning.
 */
export function ProductTour() {
  const root = useRef<HTMLElement>(null)
  const win = useRef<HTMLDivElement>(null)
  const shot = useRef<HTMLDivElement>(null)
  const [scrollStep, setScrollStep] = useState(0)
  const [hover, setHover] = useState(0)
  const [pick, setPick] = useState<{ n: number } | null>(null)
  const [ready, setReady] = useState(false)
  const tilt = useRef({ x: 0, y: 0 })
  const rise = useRef(1)
  const lit = useRef(0)

  const paint = () => {
    const el = win.current
    if (!el) return
    const e = rise.current
    el.style.transform = `perspective(1600px) rotateX(${(1 - e) * 16 + tilt.current.y}deg) rotateY(${tilt.current.x}deg) scale(${0.72 + 0.28 * e}) translateY(${(1 - e) * 30}px)`
  }

  useEffect(() => {
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let raf = 0
    const tick = () => {
      raf = 0
      const el = root.current
      if (!el) return
      if (still) {
        rise.current = 1
        lit.current = 1
        paint()
        return
      }
      const r = el.getBoundingClientRect()
      const p = clamp(-r.top / Math.max(1, r.height - window.innerHeight))
      const g = clamp(p / 0.22)
      rise.current = 1 - Math.pow(1 - g, 3)
      paint()
      lit.current = g
      if (g > 0.97) setReady(true)
      // progress through the current part (0 to 1), so the rail's bar fills as you scroll
      const edges = [0.12, 0.3, 0.5, 0.72, 1]
      const k = p < 0.3 ? 0 : p < 0.5 ? 1 : p < 0.72 ? 2 : 3
      el.style.setProperty("--sp", clamp((p - edges[k]) / (edges[k + 1] - edges[k])).toFixed(3))
      setScrollStep(p < 0.12 ? 0 : p < 0.3 ? 1 : p < 0.5 ? 2 : p < 0.72 ? 3 : 4)
    }
    const on = () => {
      if (!raf) raf = requestAnimationFrame(tick)
    }
    tick()
    window.addEventListener("scroll", on, { passive: true })
    window.addEventListener("resize", on)
    return () => {
      window.removeEventListener("scroll", on)
      window.removeEventListener("resize", on)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  // a tapped step holds until the scroll moves to another one
  const [seen, setSeen] = useState(scrollStep)
  if (seen !== scrollStep) {
    setSeen(scrollStep)
    if (pick) setPick(null)
  }
  const step = hover > 0 ? hover : pick ? pick.n : scrollStep
  const part = STEPS[step]

  const move = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return
    const w = win.current
    const s = shot.current
    if (!w || !s) return
    const b = w.getBoundingClientRect()
    const x = (e.clientX - b.left) / b.width
    const y = (e.clientY - b.top) / b.height
    tilt.current = { x: (x - 0.5) * 9, y: -(y - 0.5) * 7 }
    w.style.setProperty("--mx", `${x * 100}%`)
    w.style.setProperty("--my", `${y * 100}%`)
    w.dataset.glow = "1"
    paint()
    if (lit.current < 0.2) return
    const q = s.getBoundingClientRect()
    const px = ((e.clientX - q.left) / q.width) * 100
    const py = ((e.clientY - q.top) / q.height) * 100
    let h = 0
    STEPS.forEach((r, i) => {
      if (r && px >= r.l && px <= r.l + r.w && py >= r.t && py <= r.t + r.h) h = i
    })
    if (h !== hover) setHover(h)
  }
  const leave = () => {
    tilt.current = { x: 0, y: 0 }
    if (win.current) delete win.current.dataset.glow
    paint()
    setHover(0)
  }

  return (
    <section id="product" ref={root} className="rv-sec pt">
      <div className="pt-stage">
        <p className="rv-kicker" data-rv="fade">
          <B en="The product" fr="Le produit" />
        </p>
        <h2 className="rv-h pt-h" data-rv="rise">
          <LangPick en="Every risk, ranked. One screen." fr="Chaque risque, classé. Un seul écran." />
        </h2>
        <div className="pt-cap" aria-live="polite">
          {CAPS.map((c, i) => (
            <span key={i} data-on={i === step ? "1" : undefined} aria-hidden={i === step ? undefined : true}>
              <B en={c.en} fr={c.fr} />
            </span>
          ))}
        </div>
        <div className="pt-body">
        <div className="pt-wrap">
          <div className="pt-win" ref={win} onPointerMove={move} onPointerLeave={leave}>
            <div className="pt-bar" aria-hidden="true">
              <i />
              <i />
              <i />
            </div>
            <div className="pt-shot" ref={shot}>
              <LangPick
                en={<Image src={dashEn} alt="" sizes="(min-width: 960px) 880px, 94vw" quality={90} />}
                fr={<Image src={dashFr} alt="" sizes="(min-width: 960px) 880px, 94vw" quality={90} />}
              />
              <div className="pt-light" aria-hidden="true" />
              {part && (
                <div
                  className="pt-spot"
                  aria-hidden="true"
                  style={{ left: `${part.l}%`, top: `${part.t}%`, width: `${part.w}%`, height: `${part.h}%` }}
                >
                  <span key={step} className="pt-scan" />
                </div>
              )}
            </div>
          </div>
        </div>
        <ol className="pt-rail" aria-label="Dashboard parts" data-ready={ready ? "1" : undefined} data-manual={hover > 0 || pick ? "1" : undefined}>
          {STEPS.slice(1).map((p, i) => (
            <li key={i} style={{ ["--k" as string]: i } as React.CSSProperties}>
              <button
                type="button"
                data-on={step === i + 1 ? "1" : undefined}
                aria-pressed={step === i + 1}
                onClick={() => setPick({ n: i + 1 })}
                onPointerEnter={(e) => e.pointerType === "mouse" && setHover(i + 1)}
                onPointerLeave={(e) => e.pointerType === "mouse" && setHover(0)}
              >
                <b>{String(i + 1).padStart(2, "0")}</b>
                <span>
                  <strong>
                    <B en={p!.en} fr={p!.fr} />
                  </strong>
                  <small>
                    <B en={CAPS[i + 1].en} fr={CAPS[i + 1].fr} />
                  </small>
                </span>
              </button>
            </li>
          ))}
        </ol>
        </div>
        <p className="sr-only">
          <B
            en="The SentrIA dashboard: alert counts by status and type, the seven day trend and the ranked list of alerts."
            fr="Le tableau de bord SentrIA : nombre d'alertes par statut et par type, tendance sur sept jours et liste classée des alertes."
          />
        </p>
      </div>
    </section>
  )
}
