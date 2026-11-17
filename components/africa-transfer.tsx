import "./africa-transfer.css"

/* The 30-unit transfer as two cards of dots. Once the row scrolls into view (data-in on the row), the 30
   dots leave the first card one after another and fill the second, and both counters follow.
   Labels: [from, from unsold, transfer, to, to requested]. */
const COLS = 8
const ROWS = 5
const TOTAL = COLS * ROWS

export function TransferCards({ labels }: { labels: string[] }) {
  const [from = "", unsold = "", transfer = "", to = "", asked = ""] = labels
  const dots = Array.from({ length: TOTAL }, (_, i) => i)
  return (
    <div className="afr-tr" role="img" aria-label={`${from}: ${unsold}. ${to}: ${asked}. ${transfer}`}>
      <div className="afr-tr-card afr-tr-from">
        <p className="afr-tr-name">{from}</p>
        <p className="afr-tr-count" aria-hidden="true" />
        <p className="afr-tr-sub">{unsold}</p>
        <div className="afr-tr-dots" aria-hidden="true">
          {dots.map((i) => (
            <i key={i} className={i < 4 ? "keep" : i < 34 ? "go" : "off"} style={{ "--k": 33 - i } as React.CSSProperties} />
          ))}
        </div>
      </div>
      <div className="afr-tr-mid" aria-hidden="true">
        <span>{transfer}</span>
        <svg viewBox="0 0 40 12">
          <path d="M0 6h36M30 1l6 5-6 5" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>
      <div className="afr-tr-card afr-tr-to">
        <p className="afr-tr-name">{to}</p>
        <p className="afr-tr-count" aria-hidden="true" />
        <p className="afr-tr-sub">{asked}</p>
        <div className="afr-tr-dots" aria-hidden="true">
          {dots.map((i) => (
            <i key={i} className={i < 30 ? "come" : "off"} style={{ "--k": i } as React.CSSProperties} />
          ))}
        </div>
      </div>
    </div>
  )
}
