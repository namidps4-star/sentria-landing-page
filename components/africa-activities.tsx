import { ACTIVITY_CARDS } from "@/content/africa-activity-cards"
import { ActivityRing } from "./activity-ring"

const COPY = {
  en: {
    heading: "Pick your activity",
    base: "/africa/en",
    text: { carousel: "carousel", label: "Activities", prev: "Previous activity", next: "Next activity", more: "Read more →", photo: "Photo:", view: "View", open: "Open", soon: "Soon", hint: "Scroll or drag" },
  },
  fr: {
    heading: "Choisissez votre activité",
    base: "/afrique/fr",
    text: { carousel: "carrousel", label: "Activités", prev: "Activité précédente", next: "Activité suivante", more: "Lire la suite →", photo: "Photo :", view: "Voir", open: "Ouvrir", soon: "Bientôt", hint: "Faites défiler ou glissez" },
  },
} as const

export function AfricaActivities({ lang }: { lang: "en" | "fr" }) {
  const t = COPY[lang]
  return (
    <section className="afr-acts" aria-labelledby={`afr-acts-${lang}`}>
      <h2 id={`afr-acts-${lang}`}>{t.heading}</h2>
      <ActivityRing lang={lang} base={t.base} cards={ACTIVITY_CARDS} text={t.text} />
    </section>
  )
}
