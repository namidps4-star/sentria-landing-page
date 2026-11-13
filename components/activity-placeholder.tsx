import { Header } from "./header"
import { Footer } from "./sections"
import "./health-sector.css"
import { HEALTH_SECTOR } from "@/content/health-sector"

export function ActivityPlaceholder({ name, lang }: { name: string; lang: "en" | "fr" }) {
  const t = HEALTH_SECTOR[lang]
  const en = lang === "en"
  return (
    <>
      <Header />
      <main id="main" className="hs">
        <h1 className="hs-h">{name}</h1>
        <p className="hs-lead">
          {t.placeholderTitle} {en ? "Book a demo and we will walk you through this activity." : "Réservez une démo et nous vous présenterons cette activité."}
        </p>
        <a className="hs-back" href={en ? "/sectors/healthcare" : "/fr/secteurs/sante"}>
          {en ? "← Back to Healthcare" : "← Retour à la santé"}
        </a>
        <br />
        <a className="hs-btn" href={en ? "/en#demo" : "/fr#demo"}>
          {t.demo}
        </a>
      </main>
      <Footer />
    </>
  )
}
