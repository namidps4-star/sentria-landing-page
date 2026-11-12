import type { Metadata } from "next"
import { LegalPage } from "@/components/legal-page"
import { LEGAL_TITLES } from "@/content/legal"

export const metadata: Metadata = {
  title: `${LEGAL_TITLES.privacy[1]} | SentrIA`,
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
}

export default function Page() {
  return <LegalPage doc="privacy" />
}
