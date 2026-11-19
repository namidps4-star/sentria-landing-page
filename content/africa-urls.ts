/* Addresses of the Africa activity pages. The English and French versions point at each
   other, and the English one is the default for any other language. */
export function activityPath(lang: "en" | "fr", activity: string) {
  return lang === "en" ? `/africa/en/${activity}` : `/afrique/fr/${activity}`
}

export function activityAlternates(lang: "en" | "fr", activity: string) {
  return {
    canonical: activityPath(lang, activity),
    languages: {
      en: activityPath("en", activity),
      fr: activityPath("fr", activity),
      "x-default": activityPath("en", activity),
    },
  }
}
