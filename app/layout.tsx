import type { Metadata, Viewport } from "next"
import localFont from "next/font/local"
import "./globals.css"
import "./revamp.css"

const syne = localFont({
  src: [{ path: "./fonts/syne-700.woff2", weight: "700", style: "normal" }],
  variable: "--f-display",
  display: "swap",
})

const poppins = localFont({
  src: [
    { path: "./fonts/poppins-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/poppins-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/poppins-600.woff2", weight: "600", style: "normal" },
  ],
  variable: "--f-body",
  display: "swap",
})

const michroma = localFont({
  src: [{ path: "./fonts/michroma-400.woff2", weight: "400", style: "normal" }],
  variable: "--f-brand",
  display: "swap",
})

const unbounded = localFont({
  src: [{ path: "./fonts/unbounded-600.woff2", weight: "600", style: "normal" }],
  variable: "--f-open",
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

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  alternates: { canonical: "/" },
  title: TITLE,
  description:
    "SentrIA shows the evidence, confidence, impact, and recommended action for every operational risk. So your team decides faster and the outcome feeds back.",
  openGraph: {
    type: "website",
    url: SITE,
    siteName: "SentrIA",
    title: TITLE,
    description:
      "Evidence, confidence, impact and recommended action for every operational risk. Your team decides faster and the outcome feeds back.",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: "Evidence, confidence, impact and recommended action for every operational risk.",
  },
  icons: {
    icon: [
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
 * plays. The opening plays once per browser session, only on the home page, and never with reduced
 * motion.
 */
const HEAD_SCRIPT = `(function(){var d=document.documentElement;try{var l=localStorage.getItem('sentria-language');if(l!=='fr'&&l!=='en'){l=((navigator.language||'').toLowerCase().indexOf('fr')===0)?'fr':'en'}d.lang=l;d.classList.add('js');var rm=window.matchMedia('(prefers-reduced-motion: reduce)').matches;var seen=sessionStorage.getItem('sentria-opened');if(!rm&&!seen&&location.pathname==='/'){d.classList.add('op-run','op-wait');sessionStorage.setItem('sentria-opened','1');setTimeout(function(){d.classList.remove('op-wait')},900)}}catch(e){d.classList.add('js')}})();`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${poppins.variable} ${michroma.variable} ${unbounded.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: HEAD_SCRIPT }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      </head>
      <body>{children}</body>
    </html>
  )
}
