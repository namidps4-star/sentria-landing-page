import "./africa-morning.css"

/* "One morning" as a time-blocking board: an hour axis down the left and one block per line of the example, each
   block starting at its own hour. The last block is the proposed action, in lime. The result sits under the board.
   The hours are examples, like the rest of the numbers. */
const SLOTS = [
  { at: 8, len: 1.5 },
  { at: 9.75, len: 1.25 },
  { at: 11.25, len: 1.5 },
  { at: 13, len: 1.5 },
]
const HOURS = [8, 9, 10, 11, 12, 13, 14, 15]
const T = {
  en: { hour: (h: number) => `${h > 12 ? h - 12 : h} ${h >= 12 ? "PM" : "AM"}`, note: "The numbers are examples." },
  fr: { hour: (h: number) => `${h} h`, note: "Les chiffres sont des exemples." },
}
const clock = (h: number, lang: "en" | "fr") => {
  const hh = Math.floor(h)
  const mm = Math.round((h - hh) * 60)
  return lang === "en" ? `${hh > 12 ? hh - 12 : hh}:${String(mm).padStart(2, "0")}` : `${hh} h ${String(mm).padStart(2, "0")}`
}

export function AfricaMorning({ kicker, title, lines, result, lang }: { kicker?: string; title: string; lines: string[]; result: string; lang: "en" | "fr" }) {
  const t = T[lang]
  const rows = lines.slice(0, 4)
  const ROW = 64
  return (
    <div className="afr-mo" data-rv="rise">
      <div className="afr-mo-in">
        <div className="afr-mo-head">
          {kicker && <p className="eyebrow">{kicker}</p>}
          <h3>{title}</h3>
          <p className="afr-mo-res">{result}</p>
          <p className="afr-mo-note">{t.note}</p>
        </div>
        <ol className="afr-mo-board" style={{ "--row": `${ROW}px`, height: `${HOURS.length * ROW}px` } as React.CSSProperties}>
          {HOURS.map((h, i) => (
            <li key={h} className="tick" style={{ top: `${i * ROW}px` }} aria-hidden="true">
              <span>{t.hour(h)}</span>
            </li>
          ))}
          {rows.map((line, i) => {
            const s = SLOTS[i]
            const last = i === rows.length - 1
            return (
              <li
                key={line}
                className={`blk b${i}${last ? " act" : ""}`}
                style={{ top: `${(s.at - 8) * ROW + 3}px`, height: `${s.len * ROW - 6}px`, "--i": i } as React.CSSProperties}
              >
                <small>{`${clock(s.at, lang)} to ${clock(s.at + s.len, lang)}`.replace(" to ", lang === "en" ? " to " : " à ")}</small>
                <span>{line}</span>
              </li>
            )
          })}
        </ol>
      </div>
    </div>
  )
}
