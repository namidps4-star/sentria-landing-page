import type { SiteCurrency } from "@/content/prices"

/* Money in the visitor's currency, with the site's locale rules. Count-up uses the same format. */
export function money(n: number, currency: SiteCurrency, lang: "en" | "fr"): string {
  return new Intl.NumberFormat(lang === "fr" ? "fr-FR" : "en-US", { style: "currency", currency, maximumFractionDigits: 0 }).format(n)
}

export function num(n: number, lang: "en" | "fr"): string {
  return new Intl.NumberFormat(lang === "fr" ? "fr-FR" : "en-US", { maximumFractionDigits: 0 }).format(n)
}
