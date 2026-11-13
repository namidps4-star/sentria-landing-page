import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { AfricaHero } from "@/components/africa-hero"
import { AfricaCapabilities } from "@/components/africa-capabilities"
import { ACTIVITY_COPY } from "@/content/africa-activities"
import { GENERAL_ACTIVITIES, generalBySlug } from "@/content/general-activities"

type Params = Promise<{ activity: string }>

export function generateStaticParams() {
  return GENERAL_ACTIVITIES.map((a) => ({ activity: a.en }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { activity } = await params
  const a = generalBySlug("en", activity)
  if (!a) return {}
  return { alternates: { languages: { en: `https://sentriahq.dev/activities/${a.en}`, fr: `https://sentriahq.dev/fr/activites/${a.fr}` } } }
}

export default async function Page({ params }: { params: Params }) {
  const { activity } = await params
  const a = generalBySlug("en", activity)
  if (!a) notFound()
  const copy = ACTIVITY_COPY[a.key].en
  return (
    <AfricaHero copy={{ ...copy, photoAlt: a.alt.en }} id={a.key} photo={a.photo} extra={<AfricaCapabilities slug={a.key} lang="en" />} />
  )
}
