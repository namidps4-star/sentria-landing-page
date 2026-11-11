import type { Copy } from "@/components/africa-hero"

// Copy per activity and language. Placeholders stay until the founder writes the
// text; the routes are noindex until the founder ticks Founder verified.
const placeholder = (activity: string, lang: "en" | "fr"): Copy => {
  const tag = lang === "en" ? "Founder copy needed" : "Texte du fondateur à fournir"
  return {
    h1: [`[${tag}: headline]`, `[${activity}]`, "[...]"],
    lead: `[${tag}: pain and example, for ${activity}]`,
    start: `[${tag}: where we start]`,
    cta: lang === "en" ? "Book a demo →" : "Demander une démo →",
    cta2: `[${tag}: second button]`,
    cta2Href: "/articles",
    photoAlt: "Two customers reading a medicine box at a pharmacy shelf in Lagos",
    stats: [
      ["[stat]", "[text]"],
      ["[stat]", "[text]"],
      ["[stat]", "[text]"],
    ],
  }
}

export const AFRICA_ACTIVITIES = ["pharmacie", "grossiste-pharma", "exploitation-agricole"] as const

export const ACTIVITY_COPY: Record<string, Record<"en" | "fr", Copy>> = Object.fromEntries(
  AFRICA_ACTIVITIES.map((a) => [a, { en: placeholder(a, "en"), fr: placeholder(a, "fr") }]),
)
