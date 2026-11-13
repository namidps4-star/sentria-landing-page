import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { AfricaHero } from "@/components/africa-hero"
import { AfricaCapabilities } from "@/components/africa-capabilities"
import { AfricaAlertPanel } from "@/components/africa-alert-panel"
import { ACTIVITY_COPY, AFRICA_ACTIVITIES, SECTOR_ALERTS } from "@/content/africa-activities"

type Params = Promise<{ lang: string; activity: string }>

export function generateStaticParams() {
  return AFRICA_ACTIVITIES.map((activity) => ({ lang: "en", activity }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang, activity } = await params
  if (lang !== "en" || !ACTIVITY_COPY[activity]) return {}
  return { robots: { index: false, follow: false } }
}

export default async function Page({ params }: { params: Params }) {
  const { lang, activity } = await params
  const copy = ACTIVITY_COPY[activity]
  if (lang !== "en" || !copy) notFound()
  return <AfricaHero copy={copy.en} id={activity} panel={activity === "pharmacie" || SECTOR_ALERTS[activity] ? <AfricaAlertPanel lang="en" alerts={SECTOR_ALERTS[activity]?.en} /> : undefined} extra={<AfricaCapabilities slug={activity} lang="en" />} />
}
