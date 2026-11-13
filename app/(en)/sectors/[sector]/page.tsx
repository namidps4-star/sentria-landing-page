import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/sections"
import "@/components/health-sector.css"
import { HEALTH_SECTOR } from "@/content/health-sector"
import { HEALTH_HUB_CARDS } from "@/content/health-hub-cards"
import { ActivityRing } from "@/components/activity-ring"

const TEXT = { carousel: "carousel", label: "Healthcare activities", prev: "Previous activity", next: "Next activity", more: "Read more →", view: "View", open: "Open", hint: "Scroll or drag" }

type Params = Promise<{ sector: string }>

export function generateStaticParams() {
  return [{ sector: HEALTH_SECTOR.en.slug }]
}

export default async function Page({ params }: { params: Params }) {
  const { sector } = await params
  if (sector !== HEALTH_SECTOR.en.slug) notFound()
  const t = HEALTH_SECTOR.en
  return (
    <>
      <Header />
      <main id="main" className="hs">
        <h1 className="hs-h">{t.title}</h1>
        <p className="hs-lead">{t.lead}</p>
        <p className="hs-lead" style={{ marginTop: 14 }}>{t.choose}</p>
        <ActivityRing
          lang="en"
          base=""
          cards={HEALTH_HUB_CARDS}
          text={TEXT}
        />
        <a className="hs-btn" href="/en#demo">{t.demo}</a>
      </main>
      <Footer />
    </>
  )
}
