import type { Metadata } from "next"
import ArticlesPage from "@/app/(en)/articles/page"

export const metadata: Metadata = {
  title: "Articles sur la gestion de stock en pharmacie | SentrIA",
  description: "Comment compter et gérer le stock d'une pharmacie : jours de stock, ruptures, péremption et chaîne du froid.",
  alternates: { canonical: "/fr/articles", languages: { en: "/articles", fr: "/fr/articles" } },
}

export default function Page() {
  return <ArticlesPage />
}
