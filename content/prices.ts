/* Monthly prices on the site: [Pro, Business] per currency, the same list the app bills from
   (lib/plans.ts PRICES in the app). Set per market, not converted. Annual billing is 10 months
   for 12. The list is checked against the app's by tests/e2e/pricing.js. */
export const SITE_PRICES = {
  EUR: [39, 99],
  USD: [39, 99],
  XOF: [25_000, 65_000],
  KES: [4_200, 11_000],
  NGN: [33_000, 87_000],
  GHS: [420, 1_100],
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
