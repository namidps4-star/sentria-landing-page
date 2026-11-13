import type { HeroPhoto } from "@/components/africa-hero"

/* Activity pages for every pharmacy, wholesaler and farm, wherever they are. The copy is shared with the Africa pages;
   only the photo and its alt text differ. The key is the activity id in content/africa-activities.ts. */
export const GENERAL_ACTIVITIES = [
  {
    key: "pharmacie",
    en: "pharmacy",
    fr: "pharmacie",
    photo: { src: "/africa/activities/pharmacy.jpg", credit: "Photo: Martina Jorden, Unsplash" } satisfies HeroPhoto,
    alt: { en: "Shelves of medicine bottles in a pharmacy", fr: "Rayons de flacons de médicaments dans une pharmacie" },
  },
  {
    key: "grossiste-pharma",
    en: "wholesaler",
    fr: "grossiste",
    photo: { src: "/africa/activities/wholesaler.jpg", credit: "Photo: Árpád Czapp, Unsplash" } satisfies HeroPhoto,
    alt: { en: "Boxes stacked high in a warehouse", fr: "Cartons empilés dans un entrepôt" },
  },
  {
    key: "exploitation-agricole",
    en: "farm",
    fr: "exploitation-agricole",
    photo: { src: "/africa/activities/farm.jpg", credit: "Photo: proudlyswazi, Unsplash" } satisfies HeroPhoto,
    alt: { en: "Two people working in a crop field", fr: "Deux personnes travaillent dans un champ" },
  },
] as const

export const generalBySlug = (lang: "en" | "fr", slug: string) => GENERAL_ACTIVITIES.find((a) => a[lang] === slug)
