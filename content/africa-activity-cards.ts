import { ACTIVITY_LIST } from "./africa-activities"

type L = Record<"en" | "fr", string>

export type ActivityCard = {
  id: string
  slug?: string
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

const SOON: L = { en: "Coming soon", fr: "Bientôt disponible" }

const COMING_SOON: ActivityCard[] = [
  {
    id: "retail",
    name: { en: "Retail & Distribution", fr: "Commerce et distribution" },
    line: SOON,
    photo: "/africa/activities/retail.jpg",
    alt: { en: "Woman at a fruit market stall", fr: "Femme devant un étal de fruits au marché" },
    by: "K Studios",
    user: "kstudios",
  },
  {
    id: "logistics",
    name: { en: "Logistics", fr: "Logistique" },
    line: SOON,
    photo: "/africa/activities/logistics.jpg",
    alt: { en: "Stacked orange shipping containers against a deep blue sky", fr: "Conteneurs orange empilés sous un ciel bleu profond" },
    by: "Aron Yigin",
    user: "aronyigin",
  },
  {
    id: "energy",
    name: { en: "Energy", fr: "Énergie" },
    line: SOON,
    photo: "/africa/activities/energy.jpg",
    alt: { en: "Close-up of a solar panel", fr: "Gros plan sur un panneau solaire" },
    by: "Benjamin Jopen",
    user: "benjopen",
  },
  {
    id: "transportation",
    name: { en: "Transportation", fr: "Transport" },
    line: SOON,
    photo: "/africa/activities/transport.jpg",
    alt: { en: "Cars driving on a highway at sunset", fr: "Voitures sur une autoroute au coucher du soleil" },
    by: "Markus McKay",
    user: "markusmckay",
  },
]

export const ACTIVITY_CARDS: ActivityCard[] = [
  ...ACTIVITY_LIST.map((a) => ({ id: a.slug, slug: a.slug, name: a.name, line: a.teaser, ...LIVE_PHOTOS[a.slug] })),
  ...COMING_SOON,
]
