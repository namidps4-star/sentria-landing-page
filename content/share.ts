import type { Metadata } from "next"

/* The title and description a link shows when it is shared: the same text for the page, Open Graph and Twitter. */
export function share(title: string, description: string): Metadata {
  const d = description.length > 157 ? `${description.slice(0, 156).trimEnd()}…` : description
  return {
    title,
    description: d,
    openGraph: { title, description: d, type: "website", siteName: "SentrIA", locale: "fr_FR" },
    twitter: { card: "summary_large_image", title, description: d },
  }
}

export const headline = (lines: string[]) => lines.join(" ").replace(/\.$/, "")
