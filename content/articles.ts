// Articles page content. Titles, summaries and tags are PLACEHOLDERS until the
// founder sends the real articles. French is a first draft to check.

export type Bi = { en: string; fr: string }

export type Article = {
  id: string
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

// Newest first. The first three are the "latest" strip on the first screen.
export const ARTICLES: Article[] = [
  {
    id: "stock-alert",
    sector: "logistics",
    dept: "stock",
    tag: { en: "Stock", fr: "Stock" },
    title: { en: "How a stock alert is worked out", fr: "Comment un signal de stock est calculé" },
    minutes: 6,
    image: "/articles/shelf.jpg",
  },
  {
    id: "cold-report",
    sector: "health",
    dept: "cold",
    tag: { en: "Cold chain", fr: "Chaîne du froid" },
    title: { en: "Reading a cold-chain report", fr: "Lire un rapport de chaîne du froid" },
    minutes: 5,
    image: "/articles/fridge.jpg",
  },
  {
    id: "delayed-truck",
    sector: "logistics",
    dept: "routing",
    tag: { en: "Logistics", fr: "Logistique" },
    title: { en: "Routing a delayed truck", fr: "Un camion en retard : attendre ou dérouter" },
    minutes: 3,
    image: "/articles/truck.jpg",
  },
  {
    id: "warehouse-count",
    sector: "industry",
    dept: "warehouse",
    tag: { en: "Warehouse", fr: "Entrepôt" },
    title: { en: "Reading a warehouse count", fr: "Lire un inventaire d'entrepôt" },
    minutes: 4,
    image: "/articles/ware.jpg",
  },
  {
    id: "late-supplier",
    sector: "health",
    dept: "pharmacy",
    tag: { en: "Pharmacy", fr: "Pharmacie" },
    title: { en: "When a supplier is late", fr: "Quand un fournisseur est en retard" },
    minutes: 5,
    image: "/articles/pharm.jpg",
  },
  {
    id: "machine-drift",
    sector: "industry",
    dept: "production",
    tag: { en: "Industry", fr: "Industrie" },
    title: { en: "Watching a machine that drifts", fr: "Repérer une machine qui dérive" },
    minutes: 6,
    image: "/articles/factory.jpg",
  },
]
