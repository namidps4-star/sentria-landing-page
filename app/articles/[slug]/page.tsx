import type { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"

import { Header } from "@/components/header"
import { Footer } from "@/components/sections"
import { ARTICLE_PAGES, ARTICLES, type ArticlePage } from "@/content/articles"
import { ArticleCard } from "@/components/article-card"

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

  // The other articles in this language, for the "next article" row.
  const nextCards = ARTICLE_PAGES.filter((a) => a.lang === page.lang && a.slug !== page.slug).map((a) => {
    const listing = ARTICLES.find((x) => x.id === a.pairId)
    const frPage = ARTICLE_PAGES.find((x) => x.pairId === a.pairId && x.lang === "fr")
    return {
      slug: a.slug,
      props: {
        href: `/articles/${a.slug}`,
        image: a.image,
        tag: listing?.tag ?? { en: "", fr: "" },
        minutes: a.minutes,
        date: { en: a.dateLabel, fr: frPage?.dateLabel ?? a.dateLabel },
        title: { en: a.title, fr: frPage?.title ?? a.title },
        description: { en: a.description, fr: frPage?.description ?? a.description },
      },
    }
  })

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
        <div className="art-page-panel">
        <article>
          <p className="art-page-meta">
            {page.lang === "fr" ? `${page.minutes} min de lecture` : `${page.minutes} min read`} · {page.dateLabel}
          </p>
          <h1>{page.title}</h1>
          <div className="art-page-image">
            <Image src={page.image} alt={page.title} fill priority sizes="(max-width: 900px) 100vw, 680px" />
          </div>
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
        </div>
        {nextCards.length > 0 && (
          <section className="art-next">
            <div className="art-next-head">
              <h2>{page.lang === "fr" ? "Lire l'article suivant" : "Read our next article"}</h2>
            </div>
            <div className="art-next-row">
              {nextCards.map((c) => (
                <ArticleCard key={c.slug} {...c.props} />
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  )
}
