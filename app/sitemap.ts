import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://sentriahq.dev/", changeFrequency: "monthly", priority: 1 },
    { url: "https://sentriahq.dev/privacy", changeFrequency: "yearly", priority: 0.3 },
    { url: "https://sentriahq.dev/terms", changeFrequency: "yearly", priority: 0.3 },
  ]
}
