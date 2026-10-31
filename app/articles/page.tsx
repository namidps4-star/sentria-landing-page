import type { Metadata } from "next"

import { Footer } from "@/components/sections"
import { Header } from "@/components/header"
import { ArticlesPage } from "@/components/articles-page"

export const metadata: Metadata = {
  title: "Articles | SentrIA",
  description: "Short, practical reads on stock, cold chains and fleets, from the SentrIA team.",
  alternates: { canonical: "/articles" },
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
