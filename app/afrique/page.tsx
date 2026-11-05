import type { Metadata } from "next"
import { AFRIQUE_FR, AfricaHero } from "@/components/africa-hero"

const TITLE = "Stock de pharmacie et jours de stock pour les pharmacies d'Afrique de l'Ouest | SentrIA"
const DESC = "SentrIA calcule les jours de stock restants de votre pharmacie à partir de vos comptages et de vos ventes, et vous prévient avant qu'une livraison soit en retard."

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: "/afrique", languages: { en: "/africa", fr: "/afrique" } },
  openGraph: {
    type: "website",
    url: "https://sentriahq.dev/afrique",
    siteName: "SentrIA",
    locale: "fr_FR",
    alternateLocale: ["en_US"],
    title: TITLE,
    description: DESC,
  },
}

export default function Page() {
  return <AfricaHero copy={AFRIQUE_FR} id="afq" />
}
