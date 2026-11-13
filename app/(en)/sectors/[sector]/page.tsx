import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/sections"
import "@/components/health-sector.css"
import { HEALTH_SECTOR, HEALTH_ACTIVITIES, healthActivityHref } from "@/content/health-sector"

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
        <ul className="hs-list">
          {HEALTH_ACTIVITIES.map((a) => (
            <li key={a.key}>
              <a href={healthActivityHref("en", a)}>
                <b>{a.name.en}</b>
                <em>{a.live ? "Read more →" : "Page in preparation →"}</em>
              </a>
            </li>
          ))}
        </ul>
        <a className="hs-btn" href="/en#demo">{t.demo}</a>
      </main>
      <Footer />
    </>
  )
}
