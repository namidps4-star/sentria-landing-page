/* Numbers for the five planned wholesale cards. Example figures, made up.
   Money is set per market, not converted: each currency has its own example amounts.
   Amounts follow content/prices.ts (SiteCurrency). USD is the fallback. */
import type { SiteCurrency } from "./prices"

export const CARD_MONEY: Record<SiteCurrency, { stock: number[]; credits: number[]; lost: number }> = {
  USD: { stock: [182000, 141500, 23900, 2100], credits: [8400, 3960, 1320, 160], lost: 18400 },
  EUR: { stock: [167000, 130000, 22000, 1900], credits: [7800, 3700, 1200, 150], lost: 17000 },
  XOF: { stock: [109200000, 84900000, 14340000, 1260000], credits: [5040000, 2376000, 792000, 96000], lost: 11040000 },
  KES: { stock: [23660000, 18395000, 3107000, 273000], credits: [1092000, 514800, 171600, 20800], lost: 2392000 },
  NGN: { stock: [273000000, 212250000, 35850000, 3150000], credits: [12600000, 5940000, 1980000, 240000], lost: 27600000 },
  GHS: { stock: [2730000, 2122500, 358500, 31500], credits: [126000, 59400, 19800, 2400], lost: 276000 },
}

/* Forecast: twelve weeks of sales, then four forecast weeks with a likely range. Boxes per week. */
export const FORECAST = {
  sales: [72, 68, 79, 75, 88, 92, 96, 94, 101, 106, 105, 112],
  forecast: [116, 119, 122, 125],
  low: [106, 109, 111, 113],
  high: [126, 129, 133, 138],
  onHand: 210,
  safety: 60,
  weeks4: 437,
  order: 287,
}

/* Cold chain: one 24-hour trace, 30-minute steps (48 points). The band is 2 to 8 °C. */
export const COLD = {
  trace: Array.from({ length: 48 }, (_, i) => {
    const base = 4.6 + Math.sin(i / 5) * 0.5
    const breach = i >= 29 && i <= 31 ? 6 + (i - 28) * 1.6 : 0
    return Number((base + breach * (i <= 30 ? 1 : 0.4)).toFixed(1))
  }),
  peak: 11.4,
  peakIndex: 30,
  pallets: 48,
  inRange: 47,
  minutesOut: 45,
}

/* Hubs: days out of stock by distance band, 90 days. */
export const HUBS = {
  bands: [
    { km: "0–20", pct: 4 },
    { km: "20–50", pct: 9 },
    { km: "50–100", pct: 17 },
    { km: "100+", pct: 26 },
  ],
  farPharmacies: 9,
  totalPharmacies: 48,
}

/* Expiry credits: days left to the claim deadline, and the row status. */
export const CREDITS = { daysLeft: 3, rows: ["amox", "insulin", "para", "vitc"] as const }
