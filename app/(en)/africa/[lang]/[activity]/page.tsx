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

/* One picture per activity page, none shared with another page. */
const AFRICA_PHOTOS: Record<string, { src: string; credit: string }> = {
  pharmacie: { src: "/africa/hq/africa-pharmacie.jpg", credit: "Photo: Yikai Sun, Unsplash" },
  "grossiste-pharma": { src: "/africa/hq/africa-grossiste.jpg", credit: "Photo: Salah Ait Mokhtar, Unsplash" },
  "exploitation-agricole": { src: "/africa/hq/africa-farm.jpg", credit: "Photo: Yulian Alexeyev, Unsplash" },
}

export default async function Page({ params }: { params: Params }) {
  const { lang, activity } = await params
  const copy = ACTIVITY_COPY[activity]
  if (lang !== "en" || !copy) notFound()
  return <AfricaHero copy={copy.en} id={activity} panel={activity === "pharmacie" || SECTOR_ALERTS[activity] ? <AfricaAlertPanel lang="en" alerts={SECTOR_ALERTS[activity]?.en} /> : undefined} extra={<AfricaCapabilities slug={activity} lang="en" />} photo={AFRICA_PHOTOS[activity]} />
}
