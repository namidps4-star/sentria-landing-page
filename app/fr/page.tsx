import type { Metadata } from "next"
import Home from "../page"
import { HREFLANG, SEO } from "@/content/seo"

export const metadata: Metadata = {
  title: SEO.fr.title,
  description: SEO.fr.description,
  alternates: { canonical: "/fr", languages: HREFLANG },
}

export default function Page() {
  return <Home />
}
