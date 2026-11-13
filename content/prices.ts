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

/* The currency is set by the visitor's country, read from the cookie that proxy.ts writes
   (from Vercel's x-vercel-ip-country). A country not listed here, or no cookie, shows USD. */
export const COUNTRY_COOKIE = "sentria_country"
export const FALLBACK_CURRENCY: SiteCurrency = "USD"

const COUNTRY_CURRENCY: Record<string, SiteCurrency> = {
  BJ: "XOF", BF: "XOF", CI: "XOF", GW: "XOF", ML: "XOF", NE: "XOF", SN: "XOF", TG: "XOF",
  KE: "KES",
  NG: "NGN",
  GH: "GHS",
  FR: "EUR", AT: "EUR", BE: "EUR", CY: "EUR", DE: "EUR", EE: "EUR", ES: "EUR", FI: "EUR",
  GR: "EUR", HR: "EUR", IE: "EUR", IT: "EUR", LT: "EUR", LU: "EUR", LV: "EUR", MT: "EUR",
  NL: "EUR", PT: "EUR", SI: "EUR", SK: "EUR",
}

export function currencyForCountry(country: string | null | undefined): SiteCurrency {
  return COUNTRY_CURRENCY[(country ?? "").toUpperCase()] ?? FALLBACK_CURRENCY
}

export function formatPrice(amount: number, currency: SiteCurrency, lang: "en" | "fr") {
  return new Intl.NumberFormat(lang === "fr" ? "fr-FR" : "en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount)
}
