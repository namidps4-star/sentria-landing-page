"use client"

import Image, { type StaticImageData } from "next/image"
import { useEffect, useRef, useState } from "react"
import { C } from "@/content/en"
import { SECTOR_DATA } from "@/content/sectors"
import { TAGLINES } from "@/content/taglines"
import { T, B } from "./t"
import { Eyebrow, iv } from "./ui"

import industry from "@/assets/sectors/industry.webp"
import health from "@/assets/sectors/health.webp"
import health2 from "@/assets/sectors/health-2.webp"
import healthCold from "@/assets/sectors/health-cold-chain.webp"
import agriculture from "@/assets/sectors/agriculture.webp"
import transportation from "@/assets/sectors/transportation.webp"
import logistics from "@/assets/sectors/logistics.webp"
import logistics2 from "@/assets/sectors/logistics-2.jpg"
import logisticsCold from "@/assets/sectors/logistics-cold-chain.jpg"
import energy from "@/assets/sectors/energy.jpg"
import retail from "@/assets/sectors/retail.webp"

type Sector = {
  key: string
  title: string
  data: keyof typeof SECTOR_DATA | null
  main: StaticImageData
  inset: StaticImageData[]
}

// A photo is never drawn larger than its own pixels (see .fg-box in the CSS),
// so the small ones sit sharp on a blurred copy of themselves instead of being stretched.
const SECTORS: Sector[] = [
  { key: "industry", title: C.sectors.tabs[0], data: "industry", main: industry, inset: [] },
  { key: "healthcare", title: C.sectors.tabs[1], data: "health", main: health2, inset: [health, healthCold] },
  { key: "agriculture", title: C.sectors.tabs[2], data: "agriculture", main: agriculture, inset: [] },
  { key: "transportation", title: C.sectors.tabs[3], data: "transportation", main: transportation, inset: [] },
  { key: "logistics", title: C.sectors.tabs[4], data: "logistics", main: logistics2, inset: [logistics, logisticsCold] },
  { key: "energy", title: C.sectors.tabs[5], data: "energy", main: energy, inset: [] },
  { key: "retail", title: C.quickfit.tabs[6], data: null, main: retail, inset: [] },
]

const pad = (n: number) => String(n).padStart(2, "0")

export function SectorFilm() {
  const [active, setActive] = useState(0)
  const [inView, setInView] = useState(false)
  const [reduced, setReduced] = useState(false)
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    const el = root.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const next = () => setActive((a) => (a + 1) % SECTORS.length)
  const s = C.sectors

  return (
    <section id="secteurs" className="sc sc-cream sectors">
      <div className="wrap">
        <Eyebrow>
          <T s={s.eyebrow} />
        </Eyebrow>
        <h2 className="h2" data-rv="rise">
          <T s={s.title} />
        </h2>
        <p className="lead" data-rv="rise" style={iv(1)}>
          <T s={s.lead} />
        </p>

        <div className="film" ref={root} data-view={inView ? "1" : undefined} data-still={reduced ? "1" : undefined} data-rv="rise" style={iv(2)}>
          <div className="film-stage squircle">
            {SECTORS.map((sec, i) => {
              const tag = TAGLINES[sec.key]
              return (
                <div key={sec.key} className="beat" data-ins={sec.inset.length ? "1" : undefined} data-portrait={sec.main.height > sec.main.width ? "1" : undefined} data-active={i === active ? "1" : undefined} aria-hidden={i === active ? undefined : true}>
                  <div className="fg-wrap">
                    <div
                      className="fg-box"
                      style={{ ["--nw" as string]: `${sec.main.width}px`, ["--ar" as string]: `${sec.main.width / sec.main.height}` } as React.CSSProperties}
                    >
                      <Image src={sec.main} alt="" fill sizes="(min-width: 1000px) 760px, 100vw" quality={82} />
                    </div>
                  </div>
                  {sec.inset.length ? (
                    <div className="beat-ins">
                      {sec.inset.map((im, k) => (
                        <div
                          key={k}
                          className="beat-in"
                          style={{ ["--nw" as string]: `${im.width}px`, aspectRatio: `${im.width} / ${im.height}`, ["--k" as string]: k } as React.CSSProperties}
                        >
                          <Image src={im} alt="" fill sizes="220px" quality={82} />
                        </div>
                      ))}
                    </div>
                  ) : null}
                  <div className="beat-cap">
                    <span className="beat-n">
                      {pad(i + 1)} / {pad(SECTORS.length)} <T s={sec.title} />
                    </span>
                    <p className="beat-line">
                      <B en={tag.en} fr={tag.fr} />
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="film-side">
            <div className="film-tabs" role="group" aria-label={s.title}>
              {SECTORS.map((sec, i) => (
                <button key={sec.key} type="button" className="ftab squircle" aria-pressed={i === active} onClick={() => setActive(i)}>
                  <span className="ftab-n">{pad(i + 1)}</span>
                  <span className="ftab-t">
                    <T s={sec.title} />
                  </span>
                  <span className="ftab-bar" aria-hidden="true">
                    {i === active ? <i key={active} onAnimationEnd={reduced ? undefined : next} /> : <i style={{ transform: i < active ? "scaleX(1)" : "scaleX(0)" }} />}
                  </span>
                </button>
              ))}
            </div>

            <div className="film-info squircle" aria-live="polite">
              {SECTORS.map((sec, i) => {
                const d = sec.data ? SECTOR_DATA[sec.data] : null
                return (
                  <div key={sec.key} className="info" data-active={i === active ? "1" : undefined}>
                    <h3>
                      <T s={sec.title} />
                    </h3>
                    <p>{d ? <B en={d.en.description} fr={d.fr.description} /> : <T s={C.fit.cards[6].p} />}</p>
                    {d ? (
                      <ul className="signals">
                        {d.en.signals.map((sg, k) => (
                          <li key={sg[0]}>
                            <strong>
                              <B en={sg[0]} fr={d.fr.signals[k][0]} />
                            </strong>
                            <span>
                              <B en={sg[1]} fr={d.fr.signals[k][1]} />
                            </span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
