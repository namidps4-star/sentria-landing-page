import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { AfricaHero } from "@/components/africa-hero"
import { AfricaCapabilities } from "@/components/africa-capabilities"
import { GENERAL_ACTIVITIES, generalBySlug } from "@/content/general-activities"

type Params = Promise<{ activity: string }>

export function generateStaticParams() {
  return GENERAL_ACTIVITIES.map((a) => ({ activity: a.fr }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { activity } = await params
  const a = generalBySlug("fr", activity)
  if (!a) return {}
  return { alternates: { languages: { en: `https://sentriahq.dev/activities/${a.en}`, fr: `https://sentriahq.dev/fr/activites/${a.fr}` } } }
}

export default async function Page({ params }: { params: Params }) {
  const { activity } = await params
  const a = generalBySlug("fr", activity)
  if (!a) notFound()
  return (
    <AfricaHero copy={a.copy.fr} id={a.key} photo={a.photo} extra={<AfricaCapabilities slug={a.key} lang="fr" />} />
  )
}
