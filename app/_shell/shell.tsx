import type { Metadata, Viewport } from "next"
import localFont from "next/font/local"
import { DocumentLanguage } from "@/components/document-language"
import { LangProvider } from "@/components/lang-provider"
import { HREFLANG, SEO } from "@/content/seo"
import { ARTICLE_PAGES } from "@/content/articles"
import type { Lang } from "@/components/lang"

const syne = localFont({
  src: [{ path: "../fonts/syne-700.woff2", weight: "700", style: "normal" }],
  variable: "--f-display",
  display: "swap",
})

const poppins = localFont({
  src: [
    { path: "../fonts/poppins-400.woff2", weight: "400", style: "normal" },
    { path: "../fonts/poppins-500.woff2", weight: "500", style: "normal" },
    { path: "../fonts/poppins-600.woff2", weight: "600", style: "normal" },
  ],
  variable: "--f-body",
  display: "swap",
})

const michroma = localFont({
  src: [{ path: "../fonts/michroma-400.woff2", weight: "400", style: "normal" }],
  variable: "--f-brand",
  display: "swap",
})

const unbounded = localFont({
  src: [{ path: "../fonts/unbounded-600.woff2", weight: "600", style: "normal" }],
  variable: "--f-open",
  display: "swap",
})

const absans = localFont({
  src: [{ path: "../fonts/absans-400.woff2", weight: "400", style: "normal" }],
  variable: "--f-hero",
  display: "swap",
})

const TITLE = "SentrIA: The operational decision layer"

const SITE = "https://sentriahq.dev"

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE}/#org`,
      name: "SentrIA",
      url: SITE,
      logo: `${SITE}/icon.png`,
    },
    {
      "@type": "WebSite",
      "@id": `${SITE}/#site`,
      url: SITE,
      name: "SentrIA",
      publisher: { "@id": `${SITE}/#org` },
    },
  ],
}


export const metadataEn: Metadata = {
  metadataBase: new URL(SITE),
  alternates: { canonical: "/", languages: HREFLANG },
  title: SEO.en.title,
  description: SEO.en.description,
  openGraph: {
    type: "website",
    url: SITE,
    images: ["/opengraph-image.png"],
    siteName: "SentrIA",
    title: TITLE,
    description:
      "Evidence, confidence, impact and recommended action for every operational risk. Your team decides faster and the outcome feeds back.",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/twitter-image.png"],
    title: TITLE,
    description: "Evidence, confidence, impact and recommended action for every operational risk.",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png?v=3", type: "image/png", sizes: "192x192" },
      { url: "/icon.svg?v=3", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png?v=3",
  },
}


export const metadataFr: Metadata = {
  metadataBase: new URL(SITE),
  alternates: { canonical: "/fr", languages: HREFLANG },
  title: SEO.fr.title,
  description: SEO.fr.description,
  openGraph: {
    type: "website",
    url: `${SITE}/fr`,
    images: ["/opengraph-image.png"],
    locale: "fr_FR",
    siteName: "SentrIA",
    title: TITLE,
    description:
      "Evidence, confidence, impact and recommended action for every operational risk. Your team decides faster and the outcome feeds back.",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/twitter-image.png"],
    title: TITLE,
    description: "Evidence, confidence, impact and recommended action for every operational risk.",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png?v=3", type: "image/png", sizes: "192x192" },
      { url: "/icon.svg?v=3", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png?v=3",
  },
}


export const viewport: Viewport = {
  themeColor: "#0b0c08",
  width: "device-width",
  initialScale: 1,
}


/**
 * Runs before first paint: picks the language, marks that JavaScript is on
 * (so reveal animations may hide things), and decides whether the opening
 * plays. The opening plays on every fresh load of the home page, and never with reduced motion. Setting
 * localStorage 'sentria-intro-v2' to anything switches it off (used by the browser tests; nothing in the
 * site sets it). If storage is blocked the opening is skipped.
 */
const ARTICLE_LANG = JSON.stringify(
  Object.fromEntries(ARTICLE_PAGES.map((page) => [page.slug, page.lang]))
)

const HEAD_SCRIPT = `(function(){var d=document.documentElement;try{var rm=window.matchMedia('(prefers-reduced-motion: reduce)').matches;var skip=localStorage.getItem('sentria-intro-v2');var p=location.pathname;if(!rm&&!skip&&['/','/en','/fr','/en/','/fr/'].indexOf(p)>-1){d.classList.add('op-run','op-wait');setTimeout(function(){d.classList.remove('op-wait')},900)}d.classList.add('js')}catch(e){d.classList.add('js')}})();`


/** The page shell for one language section: its own <html lang>, fonts and head. */
export function SiteShell({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  return (
    <html lang={lang} className={`${syne.variable} ${poppins.variable} ${michroma.variable} ${unbounded.variable} ${absans.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: HEAD_SCRIPT }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      </head>
      <body>
        <LangProvider lang={lang}>
          <DocumentLanguage />
          {children}
        </LangProvider>
      </body>
    </html>
  )
}
