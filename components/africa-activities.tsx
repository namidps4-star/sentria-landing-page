import { ACTIVITY_LIST } from "@/content/africa-activities"

const COPY = {
  en: { heading: "Pick your activity", more: "Read more →", base: "/africa/en" },
  fr: { heading: "Choisissez votre activité", more: "Lire la suite →", base: "/afrique/fr" },
} as const

export function AfricaActivities({ lang }: { lang: "en" | "fr" }) {
  const t = COPY[lang]
  return (
    <section className="afr-acts" aria-labelledby={`afr-acts-${lang}`}>
      <h2 id={`afr-acts-${lang}`}>{t.heading}</h2>
      <ul>
        {ACTIVITY_LIST.map((a) => (
          <li key={a.slug}>
            <a href={`${t.base}/${a.slug}`}>
              <b>{a.name[lang]}</b>
              <span>{a.teaser[lang]}</span>
              <em>{t.more}</em>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
