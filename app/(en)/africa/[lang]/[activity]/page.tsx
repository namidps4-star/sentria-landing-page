import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { AfricaHero } from "@/components/africa-hero"
import { AfricaCapabilities } from "@/components/africa-capabilities"
import { AfricaAlertPanel } from "@/components/africa-alert-panel"
import { ACTIVITY_COPY, AFRICA_PHOTOS, SECTOR_ALERTS } from "@/content/africa-activities"
import { activityPhoto } from "@/content/africa-sector-catalog"
import { designFor } from "@/content/africa-designs"
import { SECTOR_PAGE } from "@/content/sector-pages"

type Params = Promise<{ lang: string; activity: string }>

export function generateStaticParams() {
  return Object.keys(ACTIVITY_COPY).map((activity) => ({ lang: "en", activity }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang, activity } = await params
  const sp = SECTOR_PAGE[activity]
  if (lang === "en" && sp) return { title: `${sp.name.en} | SentrIA`, description: sp.desc.en }
  if (lang !== "en" || !ACTIVITY_COPY[activity]) return {}
  return { robots: { index: false, follow: false } }
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
  if (lang !== "en" || !copy) notFound()
  const pic = picture(activity, "en")
  return (
    <AfricaHero
      copy={{ ...copy.en, photoAlt: pic?.alt ?? copy.en.photoAlt }}
      id={activity}
      panel={SECTOR_ALERTS[activity] ? <AfricaAlertPanel lang="en" alerts={SECTOR_ALERTS[activity].en} /> : undefined}
      extra={<AfricaCapabilities slug={activity} lang="en" />}
      photo={pic ? { src: pic.src, credit: pic.credit } : undefined}
      compact
      tone={designFor(activity).tone}
    />
  )
}
