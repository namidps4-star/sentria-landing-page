import type { ActivityCard } from "./africa-activity-cards"
import { GLOBAL_HUB_CARDS } from "./global-hub-cards"
import { GENERAL_ACTIVITIES } from "./general-activities"

/* The Healthcare sector's activities, for its ring. Every card links to a live activity page and quotes that
   page's own one-line description. None of these is a placeholder any more. */
const SECTOR = { en: "Health", fr: "Santé" }

const live = (key: string, c: Omit<ActivityCard, "sector" | "line">): ActivityCard => {
  const page = GENERAL_ACTIVITIES.find((a) => a.key === key)
  if (!page) throw new Error(`Healthcare card: no live activity for ${key}`)
  return { ...c, sector: SECTOR, line: { en: page.copy.en.start, fr: page.copy.fr.start } }
}

export const HEALTH_HUB_CARDS: ActivityCard[] = [
  ...GLOBAL_HUB_CARDS.filter((c) => c.sector?.en === "Health"),
  live("clinique-hopital", {
    id: "clinic",
    name: { en: "Clinic / Hospital", fr: "Clinique / Hôpital" },
    href: { en: "/activities/clinic", fr: "/fr/activites/clinique" },
    photo: "/hub-photos/health-clinic.jpg",
    alt: { en: "Healthcare facility", fr: "Établissement de santé" },
    by: "Unsplash",
    user: "unsplash",
  }),
  live("laboratoire", {
    id: "laboratory",
    name: { en: "Laboratory", fr: "Laboratoire" },
    href: { en: "/activities/laboratory", fr: "/fr/activites/laboratoire" },
    photo: "/hub-photos/health-laboratory.webp",
    alt: { en: "Healthcare laboratory", fr: "Laboratoire de santé" },
    by: "Unsplash",
    user: "unsplash",
  }),
  live("veterinaire", {
    id: "veterinary",
    name: { en: "Veterinary clinic", fr: "Clinique vétérinaire" },
    href: { en: "/activities/veterinary", fr: "/fr/activites/veterinaire" },
    photo: "/hub-photos/health-veterinary.webp",
    alt: { en: "Cold chain storage for health products", fr: "Chaîne du froid pour produits de santé" },
    by: "Unsplash",
    user: "unsplash",
  }),
]
