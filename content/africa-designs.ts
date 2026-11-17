// The look of each Africa activity page. The content is the same template; the design differs per activity:
// the hero tone, the layout of the capability rows (the "mood"), the example band and the questions section.
// Each activity gets a unique pair of mood and example style, so no two pages share the same layout.
// Pharmacy is first and keeps its approved look.

export type Tone = "deep" | "ink" | "olive"
export type Mood = "ledger" | "cards" | "bands" | "orbit" | "column" | "mono"
export type ExampleStyle = "band" | "lime" | "timeline" | "outline"
export type FaqStyle = "grid" | "list" | "night"
export type Design = { tone: Tone; mood: Mood; example: ExampleStyle; faq: FaqStyle }

const ORDER = [
  "pharmacie",
  "grossiste-pharma",
  "exploitation-agricole",
  "cooperative-agricole",
  "silo-stockage",
  "grossiste-distributeur",
  "supermarche-hypermarche",
  "chaine-magasins",
  "epicerie-proximite",
  "port-conteneurs",
  "entrepot-manutention",
  "transport-distribution",
  "preparation-expedition",
  "chaine-froid",
  "plusieurs-activites",
  "usine-production",
  "atelier-soustraitance",
  "usine-agroalimentaire",
  "transporteur-routier",
  "flotte-entreprise",
  "location-vehicules",
  "centrale-production",
  "generateurs-secours",
  "distribution-energetique",
]

const MOODS: Mood[] = ["ledger", "cards", "bands", "orbit", "column", "mono"]
const EXAMPLES: ExampleStyle[] = ["band", "lime", "timeline", "outline"]
const TONES: Tone[] = ["deep", "ink", "olive"]
const FAQS: FaqStyle[] = ["grid", "list", "night"]

/* Six moods times four example styles gives 24 pairs, one per activity page. */
export function designFor(slug: string): Design {
  const i = ORDER.indexOf(slug)
  if (i < 0) return { tone: "deep", mood: "ledger", example: "band", faq: "grid" }
  return {
    mood: MOODS[i % MOODS.length],
    example: EXAMPLES[Math.floor(i / MOODS.length) % EXAMPLES.length],
    tone: TONES[i % TONES.length],
    faq: FAQS[Math.floor(i / 2) % FAQS.length],
  }
}
