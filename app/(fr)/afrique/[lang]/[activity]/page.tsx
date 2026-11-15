import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { AfricaHero } from "@/components/africa-hero"
import { AfricaCapabilities } from "@/components/africa-capabilities"
import { AfricaAlertPanel } from "@/components/africa-alert-panel"
import { share, headline } from "@/content/share"
import { ACTIVITY_COPY, AFRICA_ACTIVITIES, SECTOR_ALERTS } from "@/content/africa-activities"
import { SECTOR_PAGE } from "@/content/sector-pages"
import { SectorActivityPage } from "@/components/sector-activity-page"

type Params = Promise<{ lang: string; activity: string }>

export function generateStaticParams() {
  return [...AFRICA_ACTIVITIES, ...Object.keys(SECTOR_PAGE)].map((activity) => ({ lang: "fr", activity }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang, activity } = await params
  const sp = SECTOR_PAGE[activity]
  if (lang === "fr" && sp) return { title: `${sp.name.fr} | SentrIA`, description: sp.desc.fr }
  const copy = ACTIVITY_COPY[activity]
  if (lang !== "fr" || !copy) return {}
  return { ...share(`${headline(copy.fr.h1)} | SentrIA`, copy.fr.lead), robots: { index: false, follow: false } }
}

export default async function Page({ params }: { params: Params }) {
  const { lang, activity } = await params
  if (lang === "fr" && SECTOR_PAGE[activity]) return <SectorActivityPage id={activity} lang="fr" />
  const copy = ACTIVITY_COPY[activity]
  if (lang !== "fr" || !copy) notFound()
  return <AfricaHero copy={copy.fr} id={activity} panel={activity === "pharmacie" || SECTOR_ALERTS[activity] ? <AfricaAlertPanel lang="fr" alerts={SECTOR_ALERTS[activity]?.fr} /> : undefined} extra={<AfricaCapabilities slug={activity} lang="fr" />} />
}
