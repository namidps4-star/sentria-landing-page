import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { AfricaHero } from "@/components/africa-hero"
import { AfricaCapabilities } from "@/components/africa-capabilities"
import { GENERAL_ACTIVITIES, generalBySlug } from "@/content/general-activities"
import { PLACEHOLDER_ACTIVITIES } from "@/content/health-sector"
import { ActivityPlaceholder } from "@/components/activity-placeholder"
import { share, headline } from "@/content/share"

type Params = Promise<{ activity: string }>

export function generateStaticParams() {
  return [...GENERAL_ACTIVITIES.map((a) => ({ activity: a.fr })), ...PLACEHOLDER_ACTIVITIES.map((a) => ({ activity: a.fr }))]
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { activity } = await params
  const ph = PLACEHOLDER_ACTIVITIES.find((x) => x.fr === activity)
  if (ph) return share(`${ph.name.fr} | SentrIA`, "Page en préparation. Réservez une démo et nous vous présenterons cette activité.")
  const a = generalBySlug("fr", activity)
  if (!a) return {}
  const alternates = { languages: { en: `https://sentriahq.dev/activities/${a.en}`, fr: `https://sentriahq.dev/fr/activites/${a.fr}` } }
  return { ...share(`${headline(a.copy.fr.h1)} | SentrIA`, a.copy.fr.lead), alternates }
}

export default async function Page({ params }: { params: Params }) {
  const { activity } = await params
  const ph = PLACEHOLDER_ACTIVITIES.find((x) => x.fr === activity)
  if (ph) return <ActivityPlaceholder name={ph.name.fr} lang="fr" />
  const a = generalBySlug("fr", activity)
  if (!a) notFound()
  return (
    <AfricaHero copy={a.copy.fr} id={a.key} photo={a.photo} extra={<AfricaCapabilities slug={a.key} lang="fr" />} />
  )
}
