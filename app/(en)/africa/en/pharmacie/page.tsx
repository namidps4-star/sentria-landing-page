import type { Metadata } from "next"
import { AfricaHero } from "@/components/africa-hero"

type Copy = NonNullable<Parameters<typeof AfricaHero>[0]["copy"]>

export const metadata: Metadata = {
  title: "Pharmacy stock for pharmacies in Africa | SentrIA",
  description: "Upload your stock file. SentrIA shows the days of stock left for each product and warns you before a delivery is late.",
  alternates: { canonical: "/africa/en/pharmacie", languages: { en: "/africa/en/pharmacie", fr: "/afrique/fr/pharmacie" } },
}

const PHARMACIE_EN: Copy = {
  h1: ["Pharmacy stock,", "days left", "and order in time."],
  lead: "Upload your stock file. SentrIA shows how many days of stock you have left for each product, which batches expire first, and what to order today.",
  start: "For pharmacies in Kenya and West Africa.",
  cta: "Try with my stock file →",
  cta2: "Book a demo",
  cta2Href: "/en#demo",
  photoAlt: "Pharmacist checking a medicine shelf",
  stats: [
    ["Days of stock", "From the last 30 days of sales, per product."],
    ["Expiring batches", "Batches close to their date are flagged before they expire."],
    ["What to order", "The quantity to order today, from your supplier's real lead time."],
  ],
}

export default function Page() {
  return <AfricaHero copy={PHARMACIE_EN} id="pharm" />
}
