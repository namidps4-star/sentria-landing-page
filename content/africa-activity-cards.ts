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
    photo: "/africa/hq/card-pharmacie.jpg",
    alt: { en: "Pharmacist at work", fr: "Pharmacien au travail" },
    by: "nasro azaizia",
    user: "nasro18dz",
  },
  "grossiste-pharma": {
    photo: "/africa/hq/card-grossiste-pharma.jpg",
    alt: { en: "Brown boxes with labels", fr: "Cartons bruns étiquetés" },
    by: "Curology",
    user: "curology",
  },
  "exploitation-agricole": {
    photo: "/africa/hq/card-exploitation.jpg",
    alt: { en: "Farmer ploughing a field with oxen", fr: "Agriculteur qui laboure avec des bœufs" },
    by: "Saikiran Kesari",
    user: "saikirankesari",
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
    photo: "/africa/hq/row-distribution.jpg",
    alt: { en: "Woman at a fruit market stall", fr: "Femme devant un étal de fruits au marché" },
    by: "K Studios",
    user: "kstudios",
  },
  {
    id: "logistics",
    href: { en: "/activities/logistics", fr: "/fr/activites/logistique" },
    name: { en: "Logistics", fr: "Logistique" },
    line: fit("Logistics"),
    photo: "/africa/hq/row-logistics.jpg",
    alt: { en: "Stacked orange shipping containers against a deep blue sky", fr: "Conteneurs orange empilés sous un ciel bleu profond" },
    by: "Aron Yigin",
    user: "aronyigin",
  },
  {
    id: "energy",
    href: { en: "/activities/energy", fr: "/fr/activites/energie" },
    name: { en: "Energy", fr: "Énergie" },
    line: fit("Energy"),
    photo: "/africa/hq/row-energy.jpg",
    alt: { en: "Close-up of a solar panel", fr: "Gros plan sur un panneau solaire" },
    by: "Benjamin Jopen",
    user: "benjopen",
  },
  {
    id: "transportation",
    href: { en: "/activities/transportation", fr: "/fr/activites/transport" },
    name: { en: "Transportation", fr: "Transport" },
    line: fit("Transportation"),
    photo: "/africa/hq/row-transportation.jpg",
    alt: { en: "Cars driving on a highway at sunset", fr: "Voitures sur une autoroute au coucher du soleil" },
    by: "Markus McKay",
    user: "markusmckay",
  },
]

export const ACTIVITY_CARDS: ActivityCard[] = [
  ...ACTIVITY_LIST.map((a) => ({ id: a.slug, slug: a.slug, sector: SECTOR[a.slug], name: a.name, line: a.teaser, ...LIVE_PHOTOS[a.slug] })),
  ...SECTOR_CARDS,
]
