import { ACTIVITY_CARDS } from "@/content/africa-activity-cards"
import { ActivityCarousel } from "./activity-carousel"

const COPY = {
  en: {
    heading: "Pick your activity",
    base: "/africa/en",
    text: { label: "Activities", prev: "Previous activity", next: "Next activity", more: "Read more →", photo: "Photo:" },
  },
  fr: {
    heading: "Choisissez votre activité",
    base: "/afrique/fr",
    text: { label: "Activités", prev: "Activité précédente", next: "Activité suivante", more: "Lire la suite →", photo: "Photo :" },
  },
} as const

export function AfricaActivities({ lang }: { lang: "en" | "fr" }) {
  const t = COPY[lang]
  return (
    <section className="afr-acts" aria-labelledby={`afr-acts-${lang}`}>
      <h2 id={`afr-acts-${lang}`}>{t.heading}</h2>
      <ActivityCarousel lang={lang} base={t.base} cards={ACTIVITY_CARDS} text={t.text} />
    </section>
  )
}
