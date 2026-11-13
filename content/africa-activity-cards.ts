import { ACTIVITY_LIST } from "./africa-activities"
import { EN_PRODUCT } from "./en-product"
import { FR } from "./fr"

type L = Record<"en" | "fr", string>

export type ActivityCard = {
  id: string
  slug?: string
  sector?: L
  href?: L
  name: L
  line: L
  photo: string
  alt: L
  by: string
  user: string
}

const LIVE_PHOTOS: Record<string, Pick<ActivityCard, "photo" | "alt" | "by" | "user">> = {
  pharmacie: {
    photo: "/africa/activities/pharmacy.jpg",
    alt: { en: "Shelves of medicine bottles in an old pharmacy", fr: "Rayons de flacons de médicaments dans une ancienne pharmacie" },
    by: "Martina Jorden",
    user: "martinaj",
  },
  "grossiste-pharma": {
    photo: "/africa/activities/wholesaler.jpg",
    alt: { en: "Boxes stacked high in a warehouse", fr: "Cartons empilés dans un entrepôt" },
    by: "Árpád Czapp",
    user: "czapp_arpad",
  },
  "exploitation-agricole": {
    photo: "/africa/activities/farm.jpg",
    alt: { en: "Two people working in a crop field", fr: "Deux personnes travaillent dans un champ" },
    by: "proudlyswazi",
    user: "proudlyswazi",
  },
}

const SECTOR: Record<string, L> = {
  pharmacie: { en: "Health", fr: "Santé" },
  "grossiste-pharma": { en: "Health", fr: "Santé" },
  "exploitation-agricole": { en: "Agriculture", fr: "Agriculture" },
}

/* The sector copy already on the home page ("Where do you fit in?"), reused in both languages. */
const fit = (name: string): L => {
  const en = EN_PRODUCT.fit.cards.find((c) => c.h === name)?.p ?? ""
  return { en, fr: FR[en] ?? en }
}

const SECTOR_CARDS: ActivityCard[] = [
  {
    id: "retail",
    href: { en: "/activities/retail", fr: "/fr/activites/commerce" },
    name: { en: "Retail & Distribution", fr: "Commerce et distribution" },
    line: fit("Retail"),
    photo: "/africa/activities/retail.jpg",
    alt: { en: "Woman at a fruit market stall", fr: "Femme devant un étal de fruits au marché" },
    by: "K Studios",
    user: "kstudios",
  },
  {
    id: "logistics",
    href: { en: "/activities/logistics", fr: "/fr/activites/logistique" },
    name: { en: "Logistics", fr: "Logistique" },
    line: fit("Logistics"),
    photo: "/africa/activities/logistics.jpg",
    alt: { en: "Stacked orange shipping containers against a deep blue sky", fr: "Conteneurs orange empilés sous un ciel bleu profond" },
    by: "Aron Yigin",
    user: "aronyigin",
  },
  {
    id: "energy",
    href: { en: "/activities/energy", fr: "/fr/activites/energie" },
    name: { en: "Energy", fr: "Énergie" },
    line: fit("Energy"),
    photo: "/africa/activities/energy.jpg",
    alt: { en: "Close-up of a solar panel", fr: "Gros plan sur un panneau solaire" },
    by: "Benjamin Jopen",
    user: "benjopen",
  },
  {
    id: "transportation",
    href: { en: "/activities/transportation", fr: "/fr/activites/transport" },
    name: { en: "Transportation", fr: "Transport" },
    line: fit("Transportation"),
    photo: "/africa/activities/transport.jpg",
    alt: { en: "Cars driving on a highway at sunset", fr: "Voitures sur une autoroute au coucher du soleil" },
    by: "Markus McKay",
    user: "markusmckay",
  },
  {
    id: "clinique-hopital",
    href: { en: "/activities/clinic", fr: "/fr/activites/clinique" },
    name: { en: "Clinic / Hospital", fr: "Clinique / Hôpital" },
    line: { en: "Critical supplies, cold chain and expiring stock.", fr: "Fournitures critiques, chaîne du froid et stock qui expire." },
    photo: "/hub-photos/health-hero.jpg",
    alt: { en: "Health care setting", fr: "Cadre de soins" },
    by: "Unsplash",
    user: "unsplash",
  },
  {
    id: "laboratoire",
    href: { en: "/activities/laboratory", fr: "/fr/activites/laboratoire" },
    name: { en: "Laboratory", fr: "Laboratoire" },
    line: { en: "The reagent that stops a panel, and expiring stock.", fr: "Le réactif qui bloque un panel, et le stock qui expire." },
    photo: "/hub-photos/health-hero.jpg",
    alt: { en: "Health care setting", fr: "Cadre de soins" },
    by: "Unsplash",
    user: "unsplash",
  },
  {
    id: "veterinaire",
    href: { en: "/activities/veterinary", fr: "/fr/activites/veterinaire" },
    name: { en: "Veterinary clinic", fr: "Clinique vétérinaire" },
    line: { en: "Vaccine cold chain, expiring stock and disposal log.", fr: "Chaîne du froid des vaccins, stock qui expire et registre d'élimination." },
    photo: "/hub-photos/health-hero.jpg",
    alt: { en: "Health care setting", fr: "Cadre de soins" },
    by: "Unsplash",
    user: "unsplash",
  },
  {
    id: "industry",
    href: { en: "/activities/industry", fr: "/fr/activites/industrie" },
    name: { en: "Industry", fr: "Industrie" },
    line: { en: "Production deviations and downtime, before they reach the flow.", fr: "Écarts de production et arrêts, avant qu'ils n'atteignent le flux." },
    photo: "/africa/activities/industry.jpg",
    alt: { en: "Cooling towers and smoke stacks at an industrial plant", fr: "Tours de refroidissement et cheminées d'une usine" },
    by: "Unsplash",
    user: "unsplash",
  },
]

export const ACTIVITY_CARDS: ActivityCard[] = [
  ...ACTIVITY_LIST.map((a) => ({ id: a.slug, slug: a.slug, sector: SECTOR[a.slug], name: a.name, line: a.teaser, ...LIVE_PHOTOS[a.slug] })),
  ...SECTOR_CARDS,
]
