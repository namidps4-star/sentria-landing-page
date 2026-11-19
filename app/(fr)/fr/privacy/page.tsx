import type { Metadata } from "next"
import { LegalPage } from "@/components/legal-page"

export const metadata: Metadata = {
  title: "Confidentialité | SentrIA",
  description: "Comment SentrIA traite vos données.",
  alternates: { canonical: "/fr/privacy", languages: { en: "/privacy", fr: "/fr/privacy" } },
  robots: { index: true, follow: true },
  openGraph: { title: "Confidentialité | SentrIA", description: "Comment SentrIA traite vos données.", type: "website" },
  twitter: { card: "summary_large_image", title: "Confidentialité | SentrIA", description: "Comment SentrIA traite vos données." },
}

export default function Page() {
  return <LegalPage doc="privacy" />
}
