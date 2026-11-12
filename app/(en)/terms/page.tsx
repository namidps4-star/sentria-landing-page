import type { Metadata } from "next"
import { LegalPage } from "@/components/legal-page"
import { LEGAL_TITLES } from "@/content/legal"

export const metadata: Metadata = {
  title: `${LEGAL_TITLES.terms[1]} | SentrIA`,
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: true },
}

export default function Page() {
  return <LegalPage doc="terms" />
}
