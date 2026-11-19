import type { Metadata } from "next"
import { AfricaHero } from "@/components/africa-hero"
import { AFRIQUE_FR } from "@/components/africa-hero"

export const metadata: Metadata = {
  title: "SentrIA — Afrique",
  robots: { index: false, follow: false },
}

export default function Page() {
  return <AfricaHero copy={AFRIQUE_FR} activities="fr" />
}
