import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { AfricaHero } from "@/components/africa-hero"
import { AfricaCapabilities } from "@/components/africa-capabilities"
import { AfricaAlertPanel } from "@/components/africa-alert-panel"
import { ACTIVITY_COPY, AFRICA_ACTIVITIES, AFRICA_PHOTOS, SECTOR_ALERTS } from "@/content/africa-activities"
import { SECTOR_PAGE } from "@/content/sector-pages"
import { SectorActivityPage } from "@/components/sector-activity-page"

type Params = Promise<{ lang: string; activity: string }>

export function generateStaticParams() {
  return [...AFRICA_ACTIVITIES, ...Object.keys(SECTOR_PAGE)].map((activity) => ({ lang: "en", activity }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang, activity } = await params
  const sp = SECTOR_PAGE[activity]
  if (lang === "en" && sp) return { title: `${sp.name.en} | SentrIA`, description: sp.desc.en }
  if (lang !== "en" || !ACTIVITY_COPY[activity]) return {}
  return { robots: { index: false, follow: false } }
}

export default async function Page({ params }: { params: Params }) {
  const { lang, activity } = await params
  if (lang === "en" && SECTOR_PAGE[activity]) return <SectorActivityPage id={activity} lang="en" />
  const copy = ACTIVITY_COPY[activity]
  if (lang !== "en" || !copy) notFound()
  return <AfricaHero copy={copy.en} id={activity} panel={activity === "pharmacie" || SECTOR_ALERTS[activity] ? <AfricaAlertPanel lang="en" alerts={SECTOR_ALERTS[activity]?.en} /> : undefined} extra={<AfricaCapabilities slug={activity} lang="en" />} photo={AFRICA_PHOTOS[activity]} compact={activity === "grossiste-pharma"} />
}
