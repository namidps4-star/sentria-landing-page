import type { Metadata } from "next"

import { Footer } from "@/components/sections"
import { Header } from "@/components/header"
import { ArticlesPage } from "@/components/articles-page"

/* Rebuilt at most once an hour, so an article that goes live on its date shows up. */
export const revalidate = 3600

const TITLE = "Articles | SentrIA"
const DESCRIPTION = "Short, practical reads on stock, cold chains and fleets, from the SentrIA team."

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/articles", languages: { en: "/articles", fr: "/fr/articles" } },
  openGraph: { type: "website", url: "/articles", siteName: "SentrIA", locale: "en_US", title: TITLE, description: DESCRIPTION, images: ["/opengraph-image.png"] },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: ["/twitter-image.png"] },
  robots: { index: true, follow: true },
}

export default function Page() {
  return (
    <>
      <Header />
      <ArticlesPage />
      <Footer />
    </>
  )
}
