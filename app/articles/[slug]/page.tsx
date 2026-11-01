import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { Header } from "@/components/header"
import { Footer } from "@/components/sections"
import { ARTICLE_PAGES, type ArticlePage } from "@/content/articles"

import "@/components/articles.css"

const BASE = "https://sentriahq.dev"

export function generateStaticParams() {
  return ARTICLE_PAGES.map((a) => ({ slug: a.slug }))
}

function findPage(slug: string): ArticlePage | undefined {
  return ARTICLE_PAGES.find((a) => a.slug === slug)
}

function pairOf(page: ArticlePage): Partial<Record<"en" | "fr", string>> {
  const out: Partial<Record<"en" | "fr", string>> = {}
  for (const a of ARTICLE_PAGES) if (a.pairId === page.pairId) out[a.lang] = `${BASE}/articles/${a.slug}`
  return out
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const page = findPage(slug)
  if (!page) return {}
  return {
    title: `${page.title} | SentrIA`,
    description: page.description,
    alternates: { canonical: `/articles/${page.slug}`, languages: pairOf(page) },
    openGraph: { title: page.title, description: page.description, type: "article", locale: page.lang === "fr" ? "fr_FR" : "en_US" },
    robots: { index: true, follow: true },
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const page = findPage(slug)
  if (!page) notFound()

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: page.title,
    description: page.description,
    inLanguage: page.lang,
    datePublished: page.date,
    dateModified: page.date,
    image: `${BASE}${page.image}`,
    author: { "@type": "Organization", name: "SentrIA", url: BASE },
    publisher: { "@type": "Organization", name: "SentrIA", url: BASE },
    mainEntityOfPage: `${BASE}/articles/${page.slug}`,
  }

  return (
    <>
      <Header />
      <main id="main" className="art-page" lang={page.lang}>
        <article>
          <p className="art-page-meta">
            {page.lang === "fr" ? `${page.minutes} min de lecture` : `${page.minutes} min read`} · {page.date}
          </p>
          <h1>{page.title}</h1>
          <p className="art-page-intro">{page.intro}</p>
          {page.sections.map((s) => (
            <section key={s.heading}>
              <h2>{s.heading}</h2>
              {s.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </section>
          ))}
          <section>
            <h2>{page.lang === "fr" ? "Questions fréquentes" : "Questions people ask"}</h2>
            {page.faq.map((f) => (
              <div key={f.q} className="art-faq">
                <h3>{f.q}</h3>
                <p>{f.a}</p>
              </div>
            ))}
          </section>
          <p className="art-page-closing">
            {page.closing}{" "}
            <a href={page.lang === "fr" ? "/#tarifs" : "/#tarifs"}>{page.lang === "fr" ? "Tarifs" : "Pricing"}</a>
          </p>
        </article>
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  )
}
