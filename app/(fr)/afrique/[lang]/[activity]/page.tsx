import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { AfricaHero } from "@/components/africa-hero"
import { ACTIVITY_COPY, AFRICA_ACTIVITIES } from "@/content/africa-activities"

type Params = Promise<{ lang: string; activity: string }>

export function generateStaticParams() {
  return AFRICA_ACTIVITIES.map((activity) => ({ lang: "fr", activity }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang, activity } = await params
  if (lang !== "fr" || !ACTIVITY_COPY[activity]) return {}
  return { robots: { index: false, follow: false } }
}

export default async function Page({ params }: { params: Params }) {
  const { lang, activity } = await params
  const copy = ACTIVITY_COPY[activity]
  if (lang !== "fr" || !copy) notFound()
  return <AfricaHero copy={copy.fr} id={activity} />
}
