/* Monthly prices on the site: [Pro, Business] per currency, the same list the app bills from
   (lib/plans.ts PRICES in the app). Set per market, not converted. Annual billing is 10 months
   for 12. The list is checked against the app's by tests/e2e/pricing.js. */
export const SITE_PRICES = {
  EUR: [49, 99],
  USD: [49, 99],
  XOF: [32_000, 65_000],
  KES: [5_400, 11_000],
  NGN: [42_000, 87_000],
  GHS: [540, 1_100],
} as const

export type SiteCurrency = keyof typeof SITE_PRICES
export const SITE_CURRENCIES = Object.keys(SITE_PRICES) as SiteCurrency[]
export const DEFAULT_CURRENCY: SiteCurrency = "EUR"

export function formatPrice(amount: number, currency: SiteCurrency, lang: "en" | "fr") {
  return new Intl.NumberFormat(lang === "fr" ? "fr-FR" : "en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount)
}

/** What a Business site costs when its price is shared by three sites, rounded so it reads as a round figure. */
export function perSite(amount: number) {
  const each = amount / 3
  const step = each >= 1000 ? 100 : each >= 100 ? 10 : 1
  return Math.round(each / step) * step
}

/** The currency to show first, from the visitor's time zone (no tracking, nothing leaves the browser).
 *  West and Central Africa show FCFA, Nigeria naira, Ghana cedi, Kenya shillings, the Americas dollars,
 *  and everywhere else euros. The chips let the visitor change it. */
export function currencyForTimeZone(zone: string | undefined): SiteCurrency {
  if (!zone) return DEFAULT_CURRENCY
  if (zone === "Africa/Lagos") return "NGN"
  if (zone === "Africa/Accra") return "GHS"
  if (zone === "Africa/Nairobi") return "KES"
  if (
    ["Abidjan", "Dakar", "Bamako", "Ouagadougou", "Lome", "Niamey", "Porto-Novo", "Bissau", "Douala", "Libreville", "Brazzaville", "Bangui", "Ndjamena", "Malabo", "Kinshasa"].some(
      (city) => zone === `Africa/${city}`
    )
  )
    return "XOF"
  if (zone.startsWith("America/")) return "USD"
  return DEFAULT_CURRENCY
}
