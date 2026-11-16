import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { AfricaHero } from "@/components/africa-hero"
import { AfricaCapabilities } from "@/components/africa-capabilities"
import { AfricaAlertPanel } from "@/components/africa-alert-panel"
import { share, headline } from "@/content/share"
import { ACTIVITY_COPY, AFRICA_PHOTOS, SECTOR_ALERTS } from "@/content/africa-activities"
import { activityPhoto } from "@/content/africa-sector-catalog"
import { SECTOR_PAGE } from "@/content/sector-pages"

type Params = Promise<{ lang: string; activity: string }>

export function generateStaticParams() {
  return Object.keys(ACTIVITY_COPY).map((activity) => ({ lang: "fr", activity }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang, activity } = await params
  const sp = SECTOR_PAGE[activity]
  if (lang === "fr" && sp) return { title: `${sp.name.fr} | SentrIA`, description: sp.desc.fr }
  const copy = ACTIVITY_COPY[activity]
  if (lang !== "fr" || !copy) return {}
  return { ...share(`${headline(copy.fr.h1)} | SentrIA`, copy.fr.lead), robots: { index: false, follow: false } }
}

/* The picture of an activity page: the live pages have their own; the others use their catalogue card. */
function picture(activity: string, lang: "en" | "fr") {
  const own = AFRICA_PHOTOS[activity]
  if (own) return { src: own.src, credit: own.credit, alt: undefined }
  return activityPhoto(activity, lang)
}

/* Every activity page opens with the same hero and carries the same template below it. */
export default async function Page({ params }: { params: Params }) {
  const { lang, activity } = await params
  const copy = ACTIVITY_COPY[activity]
  if (lang !== "fr" || !copy) notFound()
  const pic = picture(activity, "fr")
  return (
    <AfricaHero
      copy={{ ...copy.fr, photoAlt: pic?.alt ?? copy.fr.photoAlt }}
      id={activity}
      panel={SECTOR_ALERTS[activity] ? <AfricaAlertPanel lang="fr" alerts={SECTOR_ALERTS[activity].fr} /> : undefined}
      extra={<AfricaCapabilities slug={activity} lang="fr" />}
      photo={pic ? { src: pic.src, credit: pic.credit } : undefined}
      compact
    />
  )
}
