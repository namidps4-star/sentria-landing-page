import { notFound } from "next/navigation"
import { AfricaHero } from "@/components/africa-hero"
import { ActivityRing } from "@/components/activity-ring"
import { HEALTH_SECTOR, HEALTH_PHOTO } from "@/content/health-sector"
import { HEALTH_HUB_CARDS } from "@/content/health-hub-cards"

type Params = Promise<{ sector: string }>

const TEXT = { carousel: "carrousel", label: "Activités santé", prev: "Activité précédente", next: "Activité suivante", more: "Lire la suite →", view: "Voir", open: "Ouvrir", hint: "Faites défiler ou glissez" }

export function generateStaticParams() {
  return [{ sector: HEALTH_SECTOR.fr.slug }]
}

export default async function Page({ params }: { params: Params }) {
  const { sector } = await params
  if (sector !== HEALTH_SECTOR.fr.slug) notFound()
  const t = HEALTH_SECTOR.fr
  return (
    <AfricaHero
      copy={t.hero}
      id="health"
      photo={HEALTH_PHOTO}
      extra={
        <section className="afr-acts" id="activities" aria-labelledby="health-acts">
          <h2 id="health-acts">{t.choose}</h2>
          <ActivityRing lang="fr" base="" cards={HEALTH_HUB_CARDS} text={TEXT} />
        </section>
      }
    />
  )
}
