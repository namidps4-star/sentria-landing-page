import type { Metadata } from "next"
import { LegalPage } from "@/components/legal-page"

export const metadata: Metadata = {
  title: "Conditions d'utilisation | SentrIA",
  description: "Les conditions d'utilisation de SentrIA.",
  alternates: { canonical: "/fr/terms", languages: { en: "/terms", fr: "/fr/terms" } },
  robots: { index: true, follow: true },
  openGraph: { title: "Conditions d'utilisation | SentrIA", description: "Les conditions d'utilisation de SentrIA.", type: "website" },
  twitter: { card: "summary_large_image", title: "Conditions d'utilisation | SentrIA", description: "Les conditions d'utilisation de SentrIA." },
}

export default function Page() {
  return <LegalPage doc="terms" />
}
