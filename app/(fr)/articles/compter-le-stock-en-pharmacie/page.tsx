import ArticleView, { generateMetadata as articleMetadata } from "@/app/(en)/articles/[slug]/page"

const slug = "compter-le-stock-en-pharmacie"

export const revalidate = 3600

export function generateMetadata() {
  return articleMetadata({ params: Promise.resolve({ slug }) })
}

export default function Page() {
  return <ArticleView params={Promise.resolve({ slug })} />
}
