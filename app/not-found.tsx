import type { Metadata } from "next"
import Link from "next/link"
import localFont from "next/font/local"
import "./globals.css"
import "../styles/globals/01-section.css"
import "./not-found.css"
import { Mark } from "@/components/ui"
import { SentriaWordmark } from "@/components/sentria-wordmark"

/* The same display and body faces as the rest of the site (see app/_shell/shell.tsx). */
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
const unbounded = localFont({
  src: [{ path: "./fonts/unbounded-600.woff2", weight: "600", style: "normal" }],
  variable: "--f-open",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Page not found | SentrIA",
  robots: { index: false, follow: true },
}

const LINKS = [
  { en: "Pricing", fr: "Tarifs", href: "/en#tarifs" },
  { en: "Sectors", fr: "Secteurs", href: "/en#fit" },
  { en: "Articles", fr: "Articles", href: "/articles" },
  { en: "Africa", fr: "Afrique", href: "/africa" },
]

/* Shown for any address that does not exist: a large 404 on a dark card, with a lime oval in the middle that
   says so in English and French and offers the two home pages. */
export default function NotFound() {
  return (
    <html lang="en" className={`${syne.variable} ${poppins.variable} ${unbounded.variable}`}>
      <body className="nf-body">
        <div className="nf-page">
          <header className="nf-top">
            <nav className="nf-side" aria-label="Main">
              <a href="/en">+ Home</a>
              <a href="/en#tarifs">+ Pricing</a>
            </nav>
            <a className="nf-brand" href="/en" aria-label="SentrIA, home">
              <Mark />
              <SentriaWordmark />
            </a>
            <nav className="nf-side nf-side-right" aria-label="Language and pages">
              <Link href="/articles">+ Articles</Link>
              <span className="nf-langs">
                <a href="/en">EN</a>
                <span aria-hidden="true">/</span>
                <a href="/fr">FR</a>
              </span>
            </nav>
          </header>

          <main className="nf-card">
            <p className="nf-digits" aria-hidden="true">404</p>

            <div className="nf-oval">
              <p className="nf-sorry">Sorry,</p>
              <p className="nf-msg">This page does not exist.</p>
              <p className="nf-msg-fr">Cette page n’existe pas.</p>
              <div className="nf-pills">
                <a className="nf-pill nf-pill-ink" href="/en">Home</a>
                <a className="nf-pill nf-pill-soft" href="/fr">Accueil</a>
              </div>
            </div>

            <h1 className="nf-sr">Page not found. Cette page n’existe pas.</h1>
          </main>

          <ul className="nf-links">
            {LINKS.map((l) => (
              <li key={l.en}>
                <a href={l.href}>
                  {l.en} <span className="nf-fr-label">/ {l.fr}</span>
                </a>
              </li>
            ))}
          </ul>

          <footer className="nf-foot">
            <span>© 2026 SentrIA</span>
            <span>The operational decision layer.</span>
          </footer>
        </div>
      </body>
    </html>
  )
}
