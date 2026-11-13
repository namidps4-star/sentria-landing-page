import type { ActivityCard } from "./africa-activity-cards"
import { GLOBAL_HUB_CARDS } from "./global-hub-cards"

/* The Healthcare sector's activities, for its ring: the two live ones reuse their cards; the other three
   point at placeholder pages until they are written. */
const SECTOR = { en: "Healthcare", fr: "Santé" }
const placeholder = (c: Omit<ActivityCard, "sector">): ActivityCard => ({ ...c, sector: SECTOR })

export const HEALTH_HUB_CARDS: ActivityCard[] = [
  ...GLOBAL_HUB_CARDS.filter((c) => c.sector?.en === "Healthcare"),
  placeholder({
    id: "clinic",
    name: { en: "Clinic / Hospital", fr: "Clinique / Hôpital" },
    line: { en: "Page in preparation.", fr: "Page en préparation." },
    href: { en: "/activities/clinic", fr: "/fr/activites/clinique" },
    photo: "/hub-photos/health-clinic.jpg",
    alt: { en: "Healthcare facility", fr: "Établissement de santé" },
    by: "Unsplash",
    user: "unsplash",
  }),
  placeholder({
    id: "laboratory",
    name: { en: "Laboratory", fr: "Laboratoire" },
    line: { en: "Page in preparation.", fr: "Page en préparation." },
    href: { en: "/activities/laboratory", fr: "/fr/activites/laboratoire" },
    photo: "/hub-photos/health-laboratory.webp",
    alt: { en: "Healthcare laboratory", fr: "Laboratoire de santé" },
    by: "Unsplash",
    user: "unsplash",
  }),
  placeholder({
    id: "veterinary",
    name: { en: "Veterinary clinic", fr: "Clinique vétérinaire" },
    line: { en: "Page in preparation.", fr: "Page en préparation." },
    href: { en: "/activities/veterinary", fr: "/fr/activites/veterinaire" },
    photo: "/hub-photos/health-veterinary.webp",
    alt: { en: "Cold chain storage for health products", fr: "Chaîne du froid pour produits de santé" },
    by: "Unsplash",
    user: "unsplash",
  }),
]
