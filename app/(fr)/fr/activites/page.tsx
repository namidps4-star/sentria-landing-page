import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/sections"
import { ActivityRing } from "@/components/activity-ring"
import "@/components/health-sector.css"
import { GLOBAL_HUB_CARDS } from "@/content/global-hub-cards"

export const metadata: Metadata = {
  title: "Trouvez votre activité | SentrIA",
  description: "Choisissez l'activité qui correspond à votre entreprise et découvrez comment SentrIA la suit.",
  alternates: { languages: { en: "https://sentriahq.dev/activities", fr: "https://sentriahq.dev/fr/activites" } },
}

export default function Page() {
  return (
    <>
      <Header />
      <main id="main" className="hs">
        <h1 className="hs-h">Trouvez votre activité</h1>
        <p className="hs-lead">Choisissez l'activité qui correspond à votre entreprise et découvrez comment SentrIA la suit.</p>
        <ActivityRing
          lang="fr"
          base=""
          cards={GLOBAL_HUB_CARDS}
          text={{ carousel: "carrousel", label: "Activités", prev: "Activité précédente", next: "Activité suivante", more: "Lire la suite →", view: "Voir", open: "Ouvrir", hint: "Faites défiler ou glissez" }}
        />
      </main>
      <Footer />
    </>
  )
}
