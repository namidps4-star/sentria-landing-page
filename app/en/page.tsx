import type { Metadata } from "next"
import Home from "../page"
import { HREFLANG, SEO } from "@/content/seo"

export const metadata: Metadata = {
  title: SEO.en.title,
  description: SEO.en.description,
  alternates: { canonical: "/en", languages: HREFLANG },
}

export default function Page() {
  return <Home />
}
