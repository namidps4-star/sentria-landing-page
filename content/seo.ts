/* The title and description search engines show, in both languages.
   The server HTML carries English (app/layout.tsx); components/document-language.tsx
   swaps in French when the visitor's language is French.

   Target phrases, one page and one main phrase each:
     en: "operational decision software"
     fr: "décision opérationnelle"
   Markets: West Africa (Benin, Côte d'Ivoire, Senegal) and East Africa (Kenya, Uganda).
   One address serves both languages, so there are no hreflang links yet. */
export const SEO = {
  en: {
    title: "SentrIA | Operational decision software with evidence",
    description:
      "SentrIA shows the evidence, confidence, impact, and recommended action for every operational risk. So your team decides faster and the outcome feeds back.",
  },
  fr: {
    title: "SentrIA | Logiciel de décision opérationnelle",
    description:
      "SentrIA montre la preuve, la confiance, l'impact et l'action recommandée pour chaque risque opérationnel. Votre équipe décide plus vite, et le résultat revient.",
  },
} as const

/* The English, French and default home pages point at each other. */
export const HREFLANG = { en: "/en", fr: "/fr", "x-default": "/" }

export const TITLE_LIMIT = 60
export const DESCRIPTION_LIMIT = 160
