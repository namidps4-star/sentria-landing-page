import { FR } from "./fr"

/* The Healthcare sector: one page listing its five activities. Live activities link to their own page,
   the rest to a placeholder. The keys are the activity ids in content/africa-activities.ts. */
const LEAD_EN = "Pharmacies, hospital pharmacies, medical wholesalers and cold chain facilities. Helps you track stock levels, expiry dates and temperature before something runs out or spoils."

export const HEALTH_SECTOR = {
  en: { title: "Healthcare", lead: LEAD_EN, slug: "healthcare", home: "/en", choose: "Choose your activity", demo: "Book a demo →", placeholderTitle: "Page in preparation." },
  fr: { title: "Santé", lead: FR[LEAD_EN], slug: "sante", home: "/fr", choose: "Choisissez votre activité", demo: "Demander une démo →", placeholderTitle: "Page en préparation." },
}

export const HEALTH_ACTIVITIES = [
  { key: "pharmacie", en: "pharmacy", fr: "pharmacie", name: { en: "Pharmacy", fr: "Pharmacie" }, live: true },
  { key: "grossiste-pharma", en: "wholesaler", fr: "grossiste", name: { en: "Pharmaceutical wholesaler", fr: "Grossiste pharma" }, live: true },
  { key: "clinique-hopital", en: "clinic", fr: "clinique", name: { en: "Clinic / Hospital", fr: "Clinique / Hôpital" }, live: false },
  { key: "laboratoire", en: "laboratory", fr: "laboratoire", name: { en: "Laboratory", fr: "Laboratoire" }, live: false },
  { key: "veterinaire", en: "veterinary", fr: "veterinaire", name: { en: "Veterinary clinic", fr: "Clinique vétérinaire" }, live: false },
] as const

export const healthActivityHref = (lang: "en" | "fr", a: (typeof HEALTH_ACTIVITIES)[number]) =>
  lang === "en" ? `/activities/${a.en}` : `/fr/activites/${a.fr}`

export const PLACEHOLDER_ACTIVITIES = HEALTH_ACTIVITIES.filter((a) => !a.live)
