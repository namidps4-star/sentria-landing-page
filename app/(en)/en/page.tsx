import type { Metadata } from "next"
import HomePage from "@/components/home-page"
import { HREFLANG, SEO } from "@/content/seo"

export const metadata: Metadata = {
  title: SEO.en.title,
  description: SEO.en.description,
  alternates: { canonical: "/en", languages: HREFLANG },
  openGraph: {
    type: "website",
    url: "https://sentriahq.dev/en",
    siteName: "SentrIA",
    locale: "en_US",
    alternateLocale: ["fr_FR"],
    title: SEO.en.title,
    description: SEO.en.description,
  },
  twitter: { card: "summary_large_image", title: SEO.en.title, description: SEO.en.description },
}

export default function Page() {
  return <HomePage />
}
