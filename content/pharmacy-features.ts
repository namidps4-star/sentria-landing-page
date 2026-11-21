/* The pharmacy feature block: slow stock, the money in products that have not sold in 60 days.
   Example figures, made up. Money is set per market, not converted (USD fallback). */
import type { SiteCurrency } from "./prices"

export const SLOW_STOCK_MONEY: Record<SiteCurrency, { buckets: number[]; products: number[] }> = {
  USD: { buckets: [2200, 3700, 5400], products: [2100, 1900, 1400] },
  EUR: { buckets: [2000, 3400, 4950], products: [1930, 1750, 1290] },
  XOF: { buckets: [1320000, 2220000, 3240000], products: [1260000, 1140000, 840000] },
  KES: { buckets: [286000, 481000, 702000], products: [273000, 247000, 182000] },
  NGN: { buckets: [3300000, 5550000, 8100000], products: [3150000, 2850000, 2100000] },
  GHS: { buckets: [33000, 55500, 81000], products: [31500, 28500, 21000] },
}

export const SLOW_STOCK_COPY = {
  en: {
    kicker: "Slow stock",
    h2: ["Find the stock that stopped", "selling before it expires."],
    lead: "SentrIA finds the products that have not sold for 60 days, shows the money they tie up, and lists them so you can return, exchange or discount them in time.",
    note: "Example screen. The numbers are made up.",
    cta: "Book a demo →",
    title: "Stock that has not sold in 60 days",
    tiedUp: "Money tied up",
    products: "Products",
    buckets: ["0–30 days", "31–60 days", "60+ days"],
    table: ["Product", "Days since sale", "Value"],
    rows: [
      ["Vitamin C 1 g", "74"],
      ["Syrup cough 100 ml", "81"],
      ["Eye drops 10 ml", "63"],
    ],
    tiles: [["3", "products"], ["81 days", "oldest sale"]],
    action: ["Return or discount", "before expiry"],
    foot: "Example screen. The numbers are made up.",
  },
  fr: {
    kicker: "Stock qui ne se vend plus",
    h2: ["Repérez le stock qui a cessé", "de se vendre avant expiration."],
    lead: "SentrIA repère les produits qui ne se sont pas vendus depuis 60 jours, montre l'argent immobilisé, et les liste pour les retourner, les échanger ou les remiser à temps.",
    note: "Écran d'exemple. Les chiffres sont fictifs.",
    cta: "Demander une démo →",
    title: "Stock sans vente depuis 60 jours",
    tiedUp: "Argent immobilisé",
    products: "Produits",
    buckets: ["0–30 jours", "31–60 jours", "60+ jours"],
    table: ["Produit", "Jours sans vente", "Valeur"],
    rows: [
      ["Vitamine C 1 g", "74"],
      ["Sirop toux 100 ml", "81"],
      ["Collyre 10 ml", "63"],
    ],
    tiles: [["3", "produits"], ["81 jours", "vente la plus ancienne"]],
    action: ["Retourner ou remiser", "avant expiration"],
    foot: "Écran d'exemple. Les chiffres sont fictifs.",
  },
} as const
