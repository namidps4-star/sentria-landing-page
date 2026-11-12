import Link from "next/link"
import { ACTIVITY_LIST } from "@/content/africa-activities"

export function AfricaActivities({ lang }: { lang: "en" | "fr" }) {
  const heading = lang === "en" ? "What SentrIA covers" : "Ce que SentrIA couvre"
  const base = lang === "en" ? "/africa/en" : "/afrique/fr"
  const more = lang === "en" ? "See how it works →" : "Voir comment ça marche →"
  return (
    <section className="afr-acts" aria-label={heading}>
      <h2>{heading}</h2>
      <ul>
        {ACTIVITY_LIST.map((act) => (
          <li key={act.slug}>
            <Link href={`${base}/${act.slug}`}>
              <b>{act.name[lang]}</b>
              <span>{act.teaser[lang]}</span>
              <em>{more}</em>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
