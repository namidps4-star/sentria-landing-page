import { FR } from "./fr"
import type { Copy } from "@/components/africa-hero"

/* The Healthcare sector: one page listing its five activities. Live activities link to their own page,
   the rest to a placeholder. The keys are the activity ids in content/africa-activities.ts. */
const LEAD_EN = "Pharmacies, hospital pharmacies, medical wholesalers and cold chain facilities. Helps you track stock levels, expiry dates and temperature before something runs out or spoils."

const HERO_EN: Copy = {
  h1: ["Track your stock", "before it expires", "or spoils."],
  lead: LEAD_EN,
  start: "For pharmacies, wholesalers, clinics, laboratories and veterinary clinics.",
  cta: "Book a demo →",
  cta2: "Choose your activity",
  cta2Href: "#activities",
  photoAlt: "Shelves of medicine bottles in a pharmacy",
  stats: [
    ["30d", "Days of stock", "Worked out per product from the last 30 days of sales."],
    ["FEFO", "Batches that expire first", "Flagged so they leave first."],
    ["Today", "What to reorder", "Based on each supplier's real delivery time."],
  ],
}

const HERO_FR: Copy = {
  h1: ["Suivez vos stocks", "avant péremption", "ou dégradation."],
  lead: FR[LEAD_EN],
  start: "Pour les pharmacies, grossistes, cliniques, laboratoires et cliniques vétérinaires.",
  cta: "Demander une démo →",
  cta2: "Choisissez votre activité",
  cta2Href: "#activities",
  photoAlt: "Rayons de flacons de médicaments dans une pharmacie",
  stats: [
    ["30j", "Jours de stock", "Calculés par produit, à partir des ventes des 30 derniers jours."],
    ["FEFO", "Lots qui expirent en premier", "Signalés pour sortir en premier."],
    ["Aujourd'hui", "Quoi recommander", "Selon le délai réel de livraison de chaque fournisseur."],
  ],
}

export const HEALTH_SECTOR = {
  en: { title: "Healthcare", lead: LEAD_EN, slug: "healthcare", home: "/en", choose: "Choose your activity", demo: "Book a demo →", placeholderTitle: "Page in preparation.", hero: HERO_EN },
  fr: { title: "Santé", lead: FR[LEAD_EN], slug: "sante", home: "/fr", choose: "Choisissez votre activité", demo: "Demander une démo →", placeholderTitle: "Page en préparation.", hero: HERO_FR },
}

export const HEALTH_PHOTO = { src: "/hub-photos/health-hero.jpg", credit: "Photo: Unsplash" }

export const HEALTH_ACTIVITIES = [
  { key: "pharmacie", en: "pharmacy", fr: "pharmacie", name: { en: "Pharmacy", fr: "Pharmacie" }, live: true },
  { key: "grossiste-pharma", en: "wholesaler", fr: "grossiste", name: { en: "Pharmaceutical wholesaler", fr: "Grossiste pharma" }, live: true },
  { key: "clinique-hopital", en: "clinic", fr: "clinique", name: { en: "Clinic / Hospital", fr: "Clinique / Hôpital" }, live: true },
  { key: "laboratoire", en: "laboratory", fr: "laboratoire", name: { en: "Laboratory", fr: "Laboratoire" }, live: true },
  { key: "veterinaire", en: "veterinary", fr: "veterinaire", name: { en: "Veterinary clinic", fr: "Clinique vétérinaire" }, live: true },
] as const

export const healthActivityHref = (lang: "en" | "fr", a: (typeof HEALTH_ACTIVITIES)[number]) =>
  lang === "en" ? `/activities/${a.en}` : `/fr/activites/${a.fr}`

export const PLACEHOLDER_ACTIVITIES = HEALTH_ACTIVITIES.filter((a) => !a.live)
