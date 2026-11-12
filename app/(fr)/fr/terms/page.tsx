import type { Metadata } from "next"
import { LegalPage } from "@/components/legal-page"

export const metadata: Metadata = {
  title: "Conditions d'utilisation | SentrIA",
  description: "Les conditions d'utilisation de SentrIA.",
  alternates: { canonical: "/fr/terms", languages: { en: "/terms", fr: "/fr/terms" } },
  robots: { index: true, follow: true },
}

export default function Page() {
  return <LegalPage doc="terms" />
}
