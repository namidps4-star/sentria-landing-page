/* Addresses of the Africa activity pages. The English and French versions point at each
   other, and the English one is the default for any other language. The activity keys are
   French; the English addresses use their English slug. */
const EN_SLUG: Record<string, string> = {
  "atelier-soustraitance": "subcontract-workshop",
  "centrale-production": "power-plant",
  "chaine-froid": "cold-chain",
  "chaine-magasins": "store-chain",
  "clinique-hopital": "clinic-hospital",
  "cooperative-agricole": "agricultural-cooperative",
  "distribution-energetique": "energy-distribution",
  "entrepot-manutention": "warehouse-handling",
  "epicerie-proximite": "convenience-store",
  "exploitation-agricole": "farm",
  "flotte-entreprise": "company-fleet",
  "generateurs-secours": "backup-generators",
  "grossiste-distributeur": "distributor-wholesaler",
  "grossiste-pharma": "pharma-wholesaler",
  laboratoire: "laboratory",
  "location-vehicules": "vehicle-rental",
  "plusieurs-activites": "multi-activity",
  "port-conteneurs": "container-port",
  "preparation-expedition": "order-picking-shipping",
  "silo-stockage": "grain-silo",
  "supermarche-hypermarche": "supermarket-hypermarket",
  "transport-distribution": "distribution-transport",
  "transporteur-routier": "road-haulage",
  "usine-agroalimentaire": "food-processing-plant",
  "usine-production": "production-plant",
  pharmacie: "pharmacy",
  veterinaire: "veterinary-clinic",
}

const KEY_BY_EN_SLUG: Record<string, string> = Object.fromEntries(Object.entries(EN_SLUG).map(([key, slug]) => [slug, key]))

export function enSlug(activity: string) {
  return EN_SLUG[activity] ?? activity
}

export function activityKeyFromEnSlug(slug: string) {
  return KEY_BY_EN_SLUG[slug]
}

export function activityPath(lang: "en" | "fr", activity: string) {
  return lang === "en" ? `/africa/en/${enSlug(activity)}` : `/afrique/fr/${activity}`
}

export function activityAlternates(lang: "en" | "fr", activity: string) {
  return {
    canonical: activityPath(lang, activity),
    languages: {
      en: activityPath("en", activity),
      fr: activityPath("fr", activity),
      "x-default": activityPath("en", activity),
    },
  }
}
