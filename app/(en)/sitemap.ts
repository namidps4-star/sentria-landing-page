import type { MetadataRoute } from "next"

import { ARTICLE_PAGES, isLive } from "@/content/articles"
import { GENERAL_ACTIVITIES } from "@/content/general-activities"

const LANGS = { en: "https://sentriahq.dev/en", fr: "https://sentriahq.dev/fr" }

/* Rebuilt at most once an hour, so a new article joins the sitemap on its date. */
export const revalidate = 3600

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://sentriahq.dev/", changeFrequency: "monthly", priority: 1, alternates: { languages: LANGS } },
    { url: LANGS.en, changeFrequency: "monthly", priority: 1, alternates: { languages: LANGS } },
    { url: LANGS.fr, changeFrequency: "monthly", priority: 1, alternates: { languages: LANGS } },
    { url: "https://sentriahq.dev/africa", changeFrequency: "monthly", priority: 0.8, alternates: { languages: { en: "https://sentriahq.dev/africa", fr: "https://sentriahq.dev/afrique" } } },
    { url: "https://sentriahq.dev/afrique", changeFrequency: "monthly", priority: 0.8, alternates: { languages: { en: "https://sentriahq.dev/africa", fr: "https://sentriahq.dev/afrique" } } },
    { url: "https://sentriahq.dev/articles", changeFrequency: "weekly", priority: 0.6 },
    { url: "https://sentriahq.dev/fr/articles", changeFrequency: "weekly", priority: 0.6 },
    { url: "https://sentriahq.dev/fr/privacy", changeFrequency: "yearly", priority: 0.3 },
    { url: "https://sentriahq.dev/fr/terms", changeFrequency: "yearly", priority: 0.3 },
    { url: "https://sentriahq.dev/sectors/healthcare", changeFrequency: "monthly", priority: 0.7, alternates: { languages: { en: "https://sentriahq.dev/sectors/healthcare", fr: "https://sentriahq.dev/fr/secteurs/sante" } } },
    { url: "https://sentriahq.dev/fr/secteurs/sante", changeFrequency: "monthly", priority: 0.7, alternates: { languages: { en: "https://sentriahq.dev/sectors/healthcare", fr: "https://sentriahq.dev/fr/secteurs/sante" } } },
    ...GENERAL_ACTIVITIES.flatMap((a) => {
      const alternates = { languages: { en: `https://sentriahq.dev/activities/${a.en}`, fr: `https://sentriahq.dev/fr/activites/${a.fr}` } }
      return [
        { url: `https://sentriahq.dev/activities/${a.en}`, changeFrequency: "monthly" as const, priority: 0.7, alternates },
        { url: `https://sentriahq.dev/fr/activites/${a.fr}`, changeFrequency: "monthly" as const, priority: 0.7, alternates },
      ]
    }),
    ...ARTICLE_PAGES.filter(isLive).map((a) => ({
      url: `https://sentriahq.dev/articles/${a.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
      lastModified: a.date,
      alternates: {
        languages: Object.fromEntries(
          ARTICLE_PAGES.filter((x) => x.pairId === a.pairId).map((x) => [x.lang, `https://sentriahq.dev/articles/${x.slug}`])
        ),
      },
    })),
    { url: "https://sentriahq.dev/privacy", changeFrequency: "yearly", priority: 0.3 },
    { url: "https://sentriahq.dev/terms", changeFrequency: "yearly", priority: 0.3 },
  ]
}
