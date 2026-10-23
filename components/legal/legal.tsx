import type { ReactNode } from "react"
import Link from "next/link"
import { B } from "@/components/t"
import { Header } from "@/components/header"

/* Shared shell for the Privacy and Terms pages. Both languages are rendered
   and CSS picks one from <html lang>, the same way the landing does it. */
export function LegalPage({
  title,
  updated,
  children,
}: {
  title: { en: string; fr: string }
  updated: string
  children: ReactNode
}) {
  return (
    <>
      <Header />
      <main className="legal wrap">
        <p className="legal-draft">
          <B
            en="Draft. This text is pending legal review and may change."
            fr="Brouillon. Ce texte est en cours de relecture juridique et peut changer."
          />
        </p>
        <h1>
          <B en={title.en} fr={title.fr} />
        </h1>
        <p className="legal-date">
          <B en={`Last updated: ${updated}`} fr={`Dernière mise à jour : ${updated}`} />
        </p>
        {children}
        <p className="legal-back">
          <Link href="/">
            <B en="Back to SentrIA" fr="Retour à SentrIA" />
          </Link>
        </p>
      </main>
    </>
  )
}

export function Section({ en, fr, children }: { en: string; fr: string; children: ReactNode }) {
  return (
    <section className="legal-sec">
      <h2>
        <B en={en} fr={fr} />
      </h2>
      {children}
    </section>
  )
}
