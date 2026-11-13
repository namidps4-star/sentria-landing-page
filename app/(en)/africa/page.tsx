import type { Metadata } from "next"
import { AfricaHero } from "@/components/africa-hero"
import { AfricaAlertPanel } from "@/components/africa-alert-panel"

export const metadata: Metadata = {
  title: "Pharmacy stock and days of stock for African pharmacies | SentrIA",
  description: "SentrIA works out the days of stock left in your pharmacy from your counts and sales, and warns you before a delivery is late.",
  alternates: { canonical: "/africa", languages: { en: "/africa", fr: "/afrique" } },
  openGraph: {
    type: "website",
    url: "https://sentriahq.dev/africa",
    siteName: "SentrIA",
    locale: "en_US",
    title: "Pharmacy stock and days of stock for African pharmacies | SentrIA",
    description: "SentrIA works out the days of stock left in your pharmacy from your counts and sales, and warns you before a delivery is late.",
  },
}

export default function Page() {
  return <AfricaHero activities="en" panel={<AfricaAlertPanel lang="en" auto={false} />} />
}
