import type { Metadata } from "next"
import HomePage from "@/components/home-page"
import { HREFLANG, SEO } from "@/content/seo"

export const metadata: Metadata = {
  title: SEO.fr.title,
  description: SEO.fr.description,
  alternates: { canonical: "/fr", languages: HREFLANG },
  openGraph: {
    type: "website",
    url: "https://sentriahq.dev/fr",
    siteName: "SentrIA",
    locale: "fr_FR",
    alternateLocale: ["en_US"],
    title: SEO.fr.title,
    description: SEO.fr.description,
  },
  twitter: { card: "summary_large_image", title: SEO.fr.title, description: SEO.fr.description },
}

export default function Page() {
  return <HomePage />
}
