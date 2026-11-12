import Link from "next/link"
import { SECTOR_LIST } from "@/content/africa-activities"

export function AfricaActivities({ lang }: { lang: "en" | "fr" }) {
  const heading = lang === "en" ? "Who is this for?" : "Pour qui ?"
  const base = lang === "en" ? "/africa/en" : "/afrique/fr"
  const soonLabel = lang === "en" ? "Coming soon" : "Bientôt disponible"
  const seeLabel = lang === "en" ? "See how it works →" : "Voir comment ça marche →"

  return (
    <section className="afr-hub" aria-label={heading}>
      <h2>{heading}</h2>
      <ul className="afr-hub-grid">
        {SECTOR_LIST.map((sector) => {
          const firstLive = sector.activities.find((a) => a.live)
          const href = firstLive ? `${base}/${firstLive.slug}` : undefined
          return (
            <li key={sector.key} className={`afr-hub-card${href ? "" : " afr-hub-soon"}`}>
              {href ? (
                <Link href={href} className="afr-hub-inner">
                  <HubCardContent sector={sector} lang={lang} seeLabel={seeLabel} hasLink />
                </Link>
              ) : (
                <div className="afr-hub-inner">
                  <HubCardContent sector={sector} lang={lang} seeLabel={soonLabel} hasLink={false} />
                </div>
              )}
            </li>
          )
        })}
      </ul>
    </section>
  )
}

function HubCardContent({
  sector,
  lang,
  seeLabel,
  hasLink,
}: {
  sector: (typeof SECTOR_LIST)[0]
  lang: "en" | "fr"
  seeLabel: string
  hasLink: boolean
}) {
  return (
    <>
      <b className="afr-hub-name">{sector.name[lang]}</b>
      <p className="afr-hub-direct">{sector.direct[lang]}</p>
      <ul className="afr-hub-tags">
        {sector.activities.map((act) => (
          <li key={act.slug} className={act.live ? "afr-hub-tag-live" : "afr-hub-tag-soon"}>
            {act.name[lang]}
          </li>
        ))}
      </ul>
      <em className="afr-hub-cta">{seeLabel}</em>
    </>
  )
}
