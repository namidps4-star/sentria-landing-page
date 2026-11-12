import type { Metadata } from "next"
import { LegalPage } from "@/components/legal-page"

export const metadata: Metadata = {
  title: "Confidentialité | SentrIA",
  description: "Comment SentrIA traite vos données.",
  alternates: { canonical: "/fr/privacy", languages: { en: "/privacy", fr: "/fr/privacy" } },
  robots: { index: true, follow: true },
}

export default function Page() {
  return <LegalPage doc="privacy" />
}
