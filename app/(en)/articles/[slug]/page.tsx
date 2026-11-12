import Link from "next/link"
import { Fragment } from "react"
import type { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"

import { Header } from "@/components/header"
import { Footer } from "@/components/sections"
import { ARTICLE_PAGES, ARTICLE_UPDATES, ARTICLES, isLive, type ArticlePage } from "@/content/articles"
import { ArticleCard } from "@/components/article-card"
import { ARTICLE_MARKS } from "@/content/article-marks"
import { ArticleFx } from "@/components/article-fx"

import "@/components/articles.css"

const BASE = "https://sentriahq.dev"

/* Pages are rebuilt at most once an hour, so a dated text change shows up on its day. */
export const revalidate = 3600

export function generateStaticParams() {
  return ARTICLE_PAGES.filter(isLive).filter((a) => a.lang === "en").map((a) => ({ slug: a.slug }))
}

/** The opening paragraph, with its marked phrases wrapped in hand-drawn highlights (lime brush, black pen circle, blush brush in turn). */
function Lead({ text, marks }: { text: string; marks: string[] }) {
  const found = marks.filter((m) => text.includes(m)).sort((a, b) => text.indexOf(a) - text.indexOf(b))
  if (found.length === 0) return <>{text}</>
  const parts: React.ReactNode[] = []
  let rest = text
  found.forEach((m, i) => {
    const at = rest.indexOf(m)
    if (at < 0) return
    parts.push(rest.slice(0, at))
    parts.push(
      <mark key={m} className={`bmk bmk${(i % 3) + 1}`}>
        {m}
      </mark>,
    )
    rest = rest.slice(at + m.length)
  })
  parts.push(rest)
  return <>{parts.map((p, i) => (typeof p === "string" ? <Fragment key={i}>{p}</Fragment> : p))}</>
}

function findPage(slug: string): ArticlePage | undefined {
  return ARTICLE_PAGES.find((a) => a.slug === slug && isLive(a))
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
    openGraph: {
      title: page.title,
      description: page.description,
      type: "article",
      url: `https://sentriahq.dev/articles/${page.slug}`,
      siteName: "SentrIA",
      locale: page.lang === "fr" ? "fr_FR" : "en_US",
      images: [{ url: page.image, alt: page.title }],
    },
    twitter: { card: "summary_large_image", title: page.title, description: page.description, images: [page.image] },
    robots: { index: true, follow: true },
  }
}

function updatedLabel(iso: string, lang: "en" | "fr") {
  const d = new Date(iso)
  return lang === "fr"
    ? `Mis à jour le ${d.toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" })}`
    : `Updated ${d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" })}`
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const page = findPage(slug)
  if (!page) notFound()

  const update = ARTICLE_UPDATES.find((u) => u.slug === page.slug && Date.now() >= Date.parse(u.from))
  const intro = update?.intro ?? page.intro
  const sources = update?.sources ?? page.sources ?? []

  // The other articles in this language, for the "next article" row.
  const nextCards = ARTICLE_PAGES.filter((a) => a.lang === page.lang && a.slug !== page.slug && isLive(a)).map((a) => {
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
    dateModified: update ? update.from : page.date,
    image: `${BASE}${page.image}`,
    author: { "@type": "Organization", name: "SentrIA", url: BASE },
    publisher: { "@type": "Organization", name: "SentrIA", url: BASE },
    mainEntityOfPage: `${BASE}/articles/${page.slug}`,
  }

  return (
    <>
      <Header />
      <ArticleFx />
      <main id="main" className="blog" lang={page.lang}>
        <div className="blog-top">
        <header className="blog-head">
          <span className="blog-tag">{ARTICLES.find((x) => x.id === page.pairId)?.tag[page.lang]}</span>
          <h1>{page.title}</h1>
          <div className="blog-meta">
            <span>
              {page.lang === "fr" ? "Par " : "By "}
              <a href="https://www.linkedin.com/in/benwetcheme/" rel="noopener" target="_blank">
                Ben Wetcheme
              </a>
              {page.lang === "fr" ? ", fondateur de SentrIA" : ", Founder of SentrIA"}
            </span>
            <span>{page.dateLabel}</span>
            {update && <span>{updatedLabel(update.from, page.lang)}</span>}
            <span>{page.lang === "fr" ? `${page.minutes} min de lecture` : `${page.minutes} min read`}</span>
          </div>
          <p className="blog-lede">{page.description}</p>
        </header>
        <p className="blog-lead">
          <Lead text={intro} marks={ARTICLE_MARKS[page.slug] ?? []} />
        </p>
        </div>

        <div className="blog-hero">
          <Image src={page.image} alt={page.title} fill priority sizes="(max-width: 1100px) 100vw, 1100px" />
        </div>

        <div className="blog-layout">
          <article className="blog-body">
            {page.sections.map((s, si) => (
              <Fragment key={s.heading}>
                <section>
                  <h2>{s.heading}</h2>
                  {s.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                  {s.links && (
                    <p className="blog-links">
                      {s.links.intro}{" "}
                      {s.links.items.map((l, i) => (
                        <Fragment key={l.url}>
                          {i > 0 && " · "}
                          <a href={l.url} rel="noopener nofollow" target="_blank">
                            {l.label}
                          </a>
                        </Fragment>
                      ))}
                    </p>
                  )}
                </section>
                {si === 1 && page.figures && page.figures.length > 0 && (
                  <figure className="blog-figures">
                    {page.figures.map((f) => (
                      <div key={f.src} className="blog-figure">
                        <Image src={f.src} alt={f.alt} width={1600} height={1067} sizes="(max-width: 960px) 100vw, 330px" />
                        <figcaption>{f.caption}</figcaption>
                      </div>
                    ))}
                  </figure>
                )}
              </Fragment>
            ))}
            <section>
              <h2>{page.lang === "fr" ? "Questions fréquentes" : "Questions people ask"}</h2>
              {page.faq.map((f) => (
                <div key={f.q} className="blog-faq">
                  <h3>{f.q}</h3>
                  <p>{f.a}</p>
                </div>
              ))}
            </section>
            <p className="blog-closing">{page.closing}</p>
            <p className="blog-links">
              <Link href="/articles#health">
                {page.lang === "fr" ? "Plus d'articles santé : pharmacie et chaîne du froid" : "More health articles: pharmacy and cold chain"}
              </Link>
              {page.regional && <a href={page.regional.href}>{page.regional.label}</a>}
            </p>
            {sources.length > 0 && (
              <section className="blog-sources">
                <h2>Sources</h2>
                <ol>
                  {sources.map((src) => (
                    <li key={src.url}>
                      <a href={src.url} rel="noopener" target="_blank">
                        {src.label}
                      </a>
                    </li>
                  ))}
                </ol>
              </section>
            )}
          </article>

          <aside className="blog-aside" aria-label={page.lang === "fr" ? "Actions sur l'article" : "Article actions"}>
            <div className="blog-cta">
              <p className="blog-cta-title">
                {page.lang === "fr" ? "Voyez le calcul sur vos propres chiffres" : "See the calculation on your own figures"}
              </p>
              <a className="blog-cta-btn" href={`/${page.lang}#demo`}>
                {page.lang === "fr" ? "Réserver une démo" : "Book a demo"} <span aria-hidden="true">→</span>
              </a>
              <a className="blog-cta-link" href={`/${page.lang}#situations`}>
                {page.lang === "fr" ? "Voir les situations santé" : "See the health situations"}
              </a>
              <a className="blog-cta-link" href="/#tarifs">
                {page.lang === "fr" ? "Tarifs" : "Pricing"}
              </a>
            </div>
            <div className="blog-share">
              <p className="blog-share-title">{page.lang === "fr" ? "Partager cet article" : "Share this article"}</p>
              <div className="blog-share-links">
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`${BASE}/articles/${page.slug}`)}&text=${encodeURIComponent(page.title)}`}
                  rel="noopener"
                  target="_blank"
                >
                  X
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${BASE}/articles/${page.slug}`)}`}
                  rel="noopener"
                  target="_blank"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </aside>
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
