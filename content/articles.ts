import { PHARMACY_STOCK_COUNT } from "./article-pages/pharmacy-stock-count"
import { PHARMACY_STOCK_OUTS } from "./article-pages/pharmacy-stock-outs"

// Articles page content: the listing (ARTICLES) and the article pages (ARTICLE_PAGES).

export type Bi = { en: string; fr: string }

/** A page or listing card is shown from its publishAt time (UTC). */
export function isLive(item: { publishAt?: string }): boolean {
  return !item.publishAt || Date.now() >= Date.parse(item.publishAt)
}

export type Article = {
  id: string
  publishAt?: string
  sector: "health" | "industry" | "logistics"
  dept: string
  tag: Bi
  title: Bi
  minutes: number
  image: string
}

export const SECTORS: { key: "all" | Article["sector"]; label: Bi }[] = [
  { key: "all", label: { en: "All", fr: "Tous" } },
  { key: "health", label: { en: "Health", fr: "Santé" } },
  { key: "industry", label: { en: "Industry", fr: "Industrie" } },
  { key: "logistics", label: { en: "Logistics", fr: "Logistique" } },
]

export const DEPARTMENTS: Record<Article["sector"], { key: string; label: Bi }[]> = {
  health: [
    { key: "all", label: { en: "All health", fr: "Toute la santé" } },
    { key: "pharmacy", label: { en: "Pharmacy", fr: "Pharmacie" } },
    { key: "cold", label: { en: "Cold chain", fr: "Chaîne du froid" } },
  ],
  industry: [
    { key: "all", label: { en: "All industry", fr: "Toute l'industrie" } },
    { key: "production", label: { en: "Production", fr: "Production" } },
    { key: "warehouse", label: { en: "Warehouse", fr: "Entrepôt" } },
  ],
  logistics: [
    { key: "all", label: { en: "All logistics", fr: "Toute la logistique" } },
    { key: "routing", label: { en: "Routing", fr: "Itinéraires" } },
    { key: "stock", label: { en: "Stock", fr: "Stock" } },
  ],
}

// Listing cards. Each card is one article in both languages; its link goes to the
// English page. Keep ids in step with ARTICLE_PAGES.
export const ARTICLES: Article[] = [
  {
    id: "how-to-count-pharmacy-stock",
    publishAt: "2026-11-04T06:00:00Z",
    sector: "health",
    dept: "pharmacy",
    tag: { en: "Health › Pharmacy", fr: "Santé › Pharmacie" },
    title: {
      en: "How to count pharmacy stock faster, and where RFID fits",
      fr: "Compter le stock d'une pharmacie plus vite, et la place du RFID",
    },
    minutes: 6,
    image: "/articles/rfid-device.jpg",
  },
  {
    id: "pharmacy-stock-outs",
    sector: "health",
    dept: "pharmacy",
    tag: { en: "Health › Pharmacy", fr: "Santé › Pharmacie" },
    title: {
      en: "How to avoid pharmacy stock-outs",
      fr: "Comment éviter les ruptures de stock en pharmacie",
    },
    minutes: 5,
    image: "/articles/pharm.jpg",
  },
]

// The two article pages. One URL per language, each with its own text.
export type ArticlePage = {
  slug: string
  lang: "en" | "fr"
  pairId: string
  title: string
  description: string
  date: string
  dateLabel: string
  minutes: number
  intro: string
  sections: { heading: string; paragraphs: string[]; links?: { intro: string; items: { label: string; url: string }[] } }[]
  faq: { q: string; a: string }[]
  closing: string
  /** A link to the regional page for this audience, shown after the closing line. */
  regional?: { label: string; href: string }
  image: string
  /** Show from this time (ISO, UTC). Missing: shown now. */
  publishAt?: string
  sources?: { label: string; url: string }[]
  figures?: { src: string; alt: string; caption: string }[]
}


export const ARTICLE_PAGES: ArticlePage[] = [...PHARMACY_STOCK_COUNT, ...PHARMACY_STOCK_OUTS]


/* Text changes that go live on a set date, without a new deploy. Until `from`
   (UTC) the page keeps the text above. */
export type ArticleUpdate = {
  slug: string
  from: string
  intro: string
  sources: { label: string; url: string }[]
}

export const ARTICLE_UPDATES: ArticleUpdate[] = [
  {
    slug: "pharmacy-stock-outs",
    from: "2026-11-09T00:00:00Z",
    intro:
      "A stock-out happens when a product no longer covers sales until the next delivery. The customer leaves without the medicine, and the sale is lost. In a study of 145 Zambian clinics, up to 30% ran out of a malaria medicine while the national warehouse still had stock. The ordering rules did not account for delivery delays.",
    sources: [
      { label: "Leung et al., PLOS ONE, 2016: inventory management and stock-outs in Zambian clinics", url: "https://pubmed.ncbi.nlm.nih.gov/27227412/" },
      { label: "Community Pharmacy England, Pressures Survey 2025: medicines supply (England)", url: "https://cpe.org.uk/wp-content/uploads/2025/06/MP-Briefing-2025-Medicines-Supply-Report-Summary.pdf" },
      { label: "Health Action International, SRH commodities in Marsabit County, 2022–2025 (Kenya)", url: "https://haiweb.org/publication/srh-commodities-in-marsabit-county-2022-2025/" },
    ],
  },
  {
    slug: "ruptures-de-stock-en-pharmacie",
    from: "2026-11-09T00:00:00Z",
    intro:
      "Une rupture de stock arrive quand un produit ne couvre plus les ventes jusqu'à la prochaine livraison. Le client repart sans son médicament, et la vente est perdue. Dans une étude de 145 cliniques en Zambie, jusqu'à 30 % ont manqué d'un médicament contre le paludisme alors que l'entrepôt national en avait en stock. Les règles de commande ne tenaient pas compte des retards de livraison.",
    sources: [
      { label: "Leung et al., PLOS ONE, 2016 : gestion des stocks et ruptures dans les cliniques zambiennes (en anglais)", url: "https://pubmed.ncbi.nlm.nih.gov/27227412/" },
      { label: "Community Pharmacy England, Pressures Survey 2025 : approvisionnement en médicaments (Angleterre, en anglais)", url: "https://cpe.org.uk/wp-content/uploads/2025/06/MP-Briefing-2025-Medicines-Supply-Report-Summary.pdf" },
      { label: "Health Action International, SRH commodities in Marsabit County, 2022–2025 (Kenya, en anglais)", url: "https://haiweb.org/publication/srh-commodities-in-marsabit-county-2022-2025/" },
    ],
  },
]

