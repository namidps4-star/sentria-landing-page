import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/sections"
import { ActivityRing } from "@/components/activity-ring"
import "@/components/health-sector.css"
import { GLOBAL_HUB_CARDS } from "@/content/global-hub-cards"

export const metadata: Metadata = {
  title: "Find your activity | SentrIA",
  description: "Pick the activity that matches your business and see how SentrIA tracks it.",
  alternates: { languages: { en: "https://sentriahq.dev/activities", fr: "https://sentriahq.dev/fr/activites" } },
}

export default function Page() {
  return (
    <>
      <Header />
      <main id="main" className="hs">
        <h1 className="hs-h">Find your activity</h1>
        <p className="hs-lead">Pick the activity that matches your business and see how SentrIA tracks it.</p>
        <ActivityRing
          lang="en"
          base=""
          cards={GLOBAL_HUB_CARDS}
          text={{ carousel: "carousel", label: "Activities", prev: "Previous activity", next: "Next activity", more: "Read more →", view: "View", open: "Open", hint: "Scroll or drag" }}
        />
      </main>
      <Footer />
    </>
  )
}
