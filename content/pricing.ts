// Monthly plan prices per currency: [Pro, Business]. Copied from the app's
// lib/plans.ts (PRICES). Set per market, not converted. Keep the two in step.
export const PRICES: Record<string, [number, number]> = {
  XOF: [15_000, 45_000],
  XAF: [15_000, 45_000],
  NGN: [20_000, 60_000],
  GHS: [250, 750],
  KES: [2_500, 7_500],
  UGX: [75_000, 225_000],
  TZS: [50_000, 150_000],
  CDF: [50_000, 150_000],
  MAD: [250, 750],
  EUR: [29, 89],
  USD: [29, 89],
  GBP: [25, 79],
  BRL: [129, 399],
}

export const FALLBACK_CURRENCY = "USD"

// Country code (ISO 3166-1, as sent by Vercel in x-vercel-ip-country) to the
// currency the app uses for that country (COUNTRIES in the app's lib/locale.ts).
const COUNTRY_CURRENCY: Record<string, string> = {
  BJ: "XOF", CI: "XOF", SN: "XOF", TG: "XOF",
  CM: "XAF",
  GH: "GHS",
  NG: "NGN",
  CD: "CDF",
  KE: "KES",
  TZ: "TZS",
  UG: "UGX",
  MA: "MAD",
  BR: "BRL",
  GB: "GBP",
  US: "USD",
  FR: "EUR",
}

/** The currency to show for a visitor's country, or USD when the country has no price. */
export function currencyForCountry(country: string | null | undefined): string {
  const code = (country ?? "").toUpperCase()
  return COUNTRY_CURRENCY[code] ?? FALLBACK_CURRENCY
}

/** Every currency a visitor can switch to. */
export function currencyOptions(): string[] {
  return Object.keys(PRICES)
}

/** A monthly price with its currency, as shown on the page (for example "15 000 XOF"). */
export function formatPrice(amount: number, currency: string): string {
  return `${new Intl.NumberFormat("fr-FR").format(amount)} ${currency}`
}
