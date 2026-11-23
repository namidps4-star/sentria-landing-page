import type { Metadata } from "next"
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

/* Shown for any address that does not exist. The same look as the home page; both languages on the page. */
export default function NotFound() {
  return (
    <html lang="en" className={`${syne.variable} ${poppins.variable}`}>
      <body className="nf-body">
        <header className="nf-top">
          <a className="nf-brand" href="/en" aria-label="SentrIA, home">
            <Mark />
            <SentriaWordmark />
          </a>
          <nav className="nf-lang" aria-label="Language">
            <a href="/en">EN</a>
            <span aria-hidden="true">/</span>
            <a href="/fr">FR</a>
          </nav>
        </header>

        <main className="nf-main wrap">
          <p className="nf-code" aria-hidden="true">404</p>
          <p className="nf-kicker">Page not found</p>
          <h1 className="nf-h">This page does not exist.</h1>
          <p className="nf-fr">Cette page n’existe pas.</p>
          <p className="nf-lead">
            The address may be old or mistyped. Start again from the home page, or go to one of these.
          </p>
          <p className="nf-lead nf-lead-fr">
            L’adresse est peut-être ancienne ou mal saisie. Repartez de l’accueil, ou allez à l’une de ces pages.
          </p>

          <div className="nf-actions">
            <a className="btn btn-lime" href="/en">Home (English)</a>
            <a className="btn btn-line" href="/fr">Accueil (français)</a>
          </div>

          <ul className="nf-links">
            {LINKS.map((l) => (
              <li key={l.en}>
                <a href={l.href}>
                  {l.en} <span className="nf-fr-label">/ {l.fr}</span>
                </a>
              </li>
            ))}
          </ul>
        </main>

        <footer className="nf-foot wrap">
          <span>© 2026 SentrIA</span>
          <span>The operational decision layer.</span>
        </footer>
      </body>
    </html>
  )
}
