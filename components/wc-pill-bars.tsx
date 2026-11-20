import type { CSSProperties } from "react"

/* Pill-shaped bars on grey tracks. The last bar is the highlighted one. Heights are percentages. */
export function WcPillBars({ items }: { items: { label: string; value: number; text: string }[] }) {
  const max = Math.max(...items.map((i) => i.value))
  return (
    <div className="wc-pills">
      {items.map((it, k) => {
        const h = (it.value / max) * 100
        const hi = it.value === max
        return (
          <div key={it.label} className={`wc-pill-col${hi ? " hi" : ""}`} style={{ "--k": k } as CSSProperties}>
            <div className="wc-pill-track">
              <i style={{ "--h": `${h}%` } as CSSProperties} />
              <b style={{ bottom: `calc(${h}% + 10px)` }}>{it.text}</b>
            </div>
            <span>{it.label}</span>
          </div>
        )
      })}
    </div>
  )
}
