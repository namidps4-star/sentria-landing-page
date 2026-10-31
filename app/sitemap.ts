import type { MetadataRoute } from "next"

const LANGS = { en: "https://sentriahq.dev/en", fr: "https://sentriahq.dev/fr" }

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://sentriahq.dev/", changeFrequency: "monthly", priority: 1, alternates: { languages: LANGS } },
    { url: LANGS.en, changeFrequency: "monthly", priority: 1, alternates: { languages: LANGS } },
    { url: LANGS.fr, changeFrequency: "monthly", priority: 1, alternates: { languages: LANGS } },
    { url: "https://sentriahq.dev/privacy", changeFrequency: "yearly", priority: 0.3 },
    { url: "https://sentriahq.dev/terms", changeFrequency: "yearly", priority: 0.3 },
  ]
}
