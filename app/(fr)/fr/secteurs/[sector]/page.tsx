import { notFound } from "next/navigation"
import { AfricaHero } from "@/components/africa-hero"
import { ActivityRing } from "@/components/activity-ring"
import { SectorHubPage, SectorHeroes, type HubSectorKey } from "@/components/sector-hub-page"
import { HEALTH_SECTOR, HEALTH_PHOTO } from "@/content/health-sector"
import { HEALTH_HUB_CARDS } from "@/content/health-hub-cards"
import { share } from "@/content/share"
import type { Metadata } from "next"

type Params = Promise<{ sector: string }>

const TEXT = { carousel: "carrousel", label: "Activités santé", prev: "Activité précédente", next: "Activité suivante", more: "Lire la suite →", view: "Voir", open: "Ouvrir", hint: "Faites défiler ou glissez" }

/* The other sectors, under their French addresses. */
const HUB_SLUGS: Record<string, HubSectorKey> = {
  industrie: "industry",
  agriculture: "agriculture",
  transport: "transportation",
  logistique: "logistics",
  energie: "energy",
  commerce: "retail",
}

export async function generateMetadata(): Promise<Metadata> {
  return share(`${HEALTH_SECTOR.fr.title} | SentrIA`, HEALTH_SECTOR.fr.lead)
}

export function generateStaticParams() {
  return [{ sector: HEALTH_SECTOR.fr.slug }, ...Object.keys(HUB_SLUGS).map((sector) => ({ sector }))]
}

export default async function Page({ params }: { params: Params }) {
  const { sector } = await params
  if (HUB_SLUGS[sector]) return <SectorHubPage sector={HUB_SLUGS[sector]} lang="fr" />
  if (sector !== HEALTH_SECTOR.fr.slug) notFound()
  const t = HEALTH_SECTOR.fr
  return (
    <AfricaHero
      copy={t.hero}
      id="health"
      photo={HEALTH_PHOTO}
      extra={
        <>
        <section className="afr-acts" id="activities" aria-labelledby="health-acts">
          <h2 id="health-acts">{t.choose}</h2>
          <ActivityRing lang="fr" base="" cards={HEALTH_HUB_CARDS} text={TEXT} />
        </section>
        <SectorHeroes hero="health" lang="fr" />
        </>
      }
    />
  )
}
