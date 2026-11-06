import type { Metadata } from "next"
import ArticlesPage from "@/app/(en)/articles/page"

const TITLE = "Articles sur la gestion de stock en pharmacie | SentrIA"
const DESCRIPTION = "Comment compter et gérer le stock d'une pharmacie : jours de stock, ruptures, péremption et chaîne du froid."

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/fr/articles", languages: { en: "/articles", fr: "/fr/articles" } },
  openGraph: { type: "website", url: "/fr/articles", siteName: "SentrIA", locale: "fr_FR", title: TITLE, description: DESCRIPTION, images: ["/opengraph-image.png"] },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: ["/twitter-image.png"] },
}

export default function Page() {
  return <ArticlesPage />
}
