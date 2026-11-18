"use client"

import { useEffect, useRef } from "react"

type Alert = { level: "critical" | "warning"; text: string }

const CONF = [85, 72, 68, 64]

function parseAlert(a: Alert, confIdx: number) {
  const parts = a.text.split(/\.\s+/)
  const last = parts[parts.length - 1].replace(/\.$/, "")
  const isAction = /^(Transfer|Arrange|Review|Suggested|Order|Check|Sell|Handle|Deliver)/i.test(last)
  const signal = isAction && parts.length > 1 ? parts.slice(0, -1).join(". ") : a.text.replace(/\.$/, "")
  const action = isAction ? last : null
  return { signal, action, conf: CONF[confIdx] ?? 60 }
}

const ACTION_LABEL: Record<"en" | "fr", Record<"critical" | "warning", string>> = {
  en: { critical: "Act now →", warning: "Review →" },
  fr: { critical: "Agir →",    warning: "Vérifier →" },
}

export function AfricaQueuePreview({ alerts, lang }: { alerts: Alert[]; lang: "en" | "fr" }) {
  const wrapRef  = useRef<HTMLDivElement>(null)
  const svgRef   = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const svg  = svgRef.current
    if (!wrap || !svg) return

    const wRect = wrap.getBoundingClientRect()
    svg.setAttribute("width",  String(wRect.width))
    svg.setAttribute("height", String(wRect.height))

    // clear previous
    while (svg.firstChild) svg.removeChild(svg.firstChild)

    function dot(id: string, side: "out" | "in") {
      const el = wrap!.querySelector(`[data-node="${id}"]`) as HTMLElement | null
      if (!el) return null
      const r = el.getBoundingClientRect()
      return {
        x: side === "out" ? r.right  - wRect.left : r.left - wRect.left,
        y: r.top + r.height / 2 - wRect.top,
      }
    }

    function curve(x1: number, y1: number, x2: number, y2: number, color: string) {
      const cx = (x1 + x2) / 2
      const p = document.createElementNS("http://www.w3.org/2000/svg", "path")
      p.setAttribute("d", `M${x1},${y1} C${cx},${y1} ${cx},${y2} ${x2},${y2}`)
      p.setAttribute("fill", "none")
      p.setAttribute("stroke", color)
      p.setAttribute("stroke-width", "1.5")
      p.setAttribute("stroke-opacity", "0.65")
      p.setAttribute("stroke-linecap", "round")
      svg!.appendChild(p)
    }

    alerts.forEach((a, i) => {
      const color = a.level === "critical" ? "#ff7a5c" : "#ffd24a"
      const s = dot(`sig-${i}`, "out")
      const d = dot(`dec-${i}`, "in")
      const dOut = dot(`dec-${i}`, "out")
      const act = dot(`act-${i}`, "in")
      if (s && d)    curve(s.x,    s.y,    d.x,   d.y,   color)
      if (dOut && act) curve(dOut.x, dOut.y, act.x, act.y, color)
    })
  }, [alerts])

  // assign confidence indices sorted: criticals first
  const sorted = alerts.map((a, i) => ({ a, i }))
    .sort((x, y) => (x.a.level === "critical" ? -1 : 1) - (y.a.level === "critical" ? -1 : 1))
  const confMap: Record<number, number> = {}
  sorted.forEach(({ i }, rank) => { confMap[i] = rank })

  return (
    <div ref={wrapRef} className="afr-nc" aria-label="Decision queue">
      <svg ref={svgRef} className="afr-nc-svg" aria-hidden="true" />
      <div className="afr-nc-grid">
        {alerts.map((a, i) => {
          const { signal, action, conf } = parseAlert(a, confMap[i])
          const isCrit = a.level === "critical"
          const actionText = action ?? ACTION_LABEL[lang][a.level]
          const levelLabel = isCrit
            ? (lang === "en" ? "Critical" : "Critique")
            : (lang === "en" ? "Warning"  : "Avertissement")
          return (
            <div key={i} className="afr-nc-row">
              {/* Signal */}
              <div
                data-node={`sig-${i}`}
                className={`afr-nc-node afr-nc-node--sig afr-nc-node--${a.level}`}
              >
                <span className="afr-nc-node__label">
                  {lang === "en" ? "Signal" : "Signal"}
                </span>
                <span className="afr-nc-node__text">{signal}</span>
                <span className={`afr-nc-dot afr-nc-dot--out afr-nc-dot--${a.level}`} />
              </div>

              {/* Decision */}
              <div
                data-node={`dec-${i}`}
                className={`afr-nc-node afr-nc-node--dec afr-nc-node--${a.level}`}
              >
                <span className={`afr-nc-badge afr-nc-badge--${a.level}`}>{levelLabel}</span>
                <span className={`afr-nc-conf afr-nc-conf--${a.level}`}>{conf}%</span>
                <span className="afr-nc-node__sub">
                  {lang === "en" ? "confidence" : "confiance"}
                </span>
                <span className={`afr-nc-dot afr-nc-dot--in  afr-nc-dot--${a.level}`} />
                <span className={`afr-nc-dot afr-nc-dot--out afr-nc-dot--${a.level}`} />
              </div>

              {/* Action */}
              <div
                data-node={`act-${i}`}
                className={`afr-nc-node afr-nc-node--act afr-nc-node--${a.level}`}
              >
                <span className="afr-nc-node__label">
                  {lang === "en" ? "Action" : "Action"}
                </span>
                <span className="afr-nc-action">{actionText}</span>
                <span className={`afr-nc-dot afr-nc-dot--in afr-nc-dot--${a.level}`} />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
