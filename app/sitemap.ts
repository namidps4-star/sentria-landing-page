import type { MetadataRoute } from "next"

import { ARTICLE_PAGES } from "@/content/articles"

const LANGS = { en: "https://sentriahq.dev/en", fr: "https://sentriahq.dev/fr" }

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://sentriahq.dev/", changeFrequency: "monthly", priority: 1, alternates: { languages: LANGS } },
    { url: LANGS.en, changeFrequency: "monthly", priority: 1, alternates: { languages: LANGS } },
    { url: LANGS.fr, changeFrequency: "monthly", priority: 1, alternates: { languages: LANGS } },
    { url: "https://sentriahq.dev/articles", changeFrequency: "weekly", priority: 0.6 },
    ...ARTICLE_PAGES.map((a) => ({ url: `https://sentriahq.dev/articles/${a.slug}`, changeFrequency: "monthly" as const, priority: 0.6, lastModified: a.date })),
    { url: "https://sentriahq.dev/privacy", changeFrequency: "yearly", priority: 0.3 },
    { url: "https://sentriahq.dev/terms", changeFrequency: "yearly", priority: 0.3 },
  ]
}
