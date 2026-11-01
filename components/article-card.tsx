import Image from "next/image"
import Link from "next/link"

import { B } from "@/components/t"

/* One article card, in the outlined style: photo inset in a thin rounded card,
   a lime tag with a dot, the minutes and date, a bold title and a short summary. */
export function ArticleCard(props: {
  href: string
  image: string
  tag: { en: string; fr: string }
  minutes: number
  date: { en: string; fr: string }
  title: { en: string; fr: string }
  description: { en: string; fr: string }
}) {
  const { href, image, tag, minutes, date, title, description } = props
  return (
    <Link href={href} className="art-card">
      <div className="art-card-img">
        <Image src={image} alt="" fill sizes="(max-width: 900px) 100vw, 330px" />
      </div>
      <div className="art-card-meta">
        <span className="art-card-tag">
          <i />
          <B en={tag.en} fr={tag.fr} />
        </span>
        <span>
          <B en={`${minutes} min read · ${date.en}`} fr={`${minutes} min · ${date.fr}`} />
        </span>
      </div>
      <h2 className="art-card-title">
        <B en={title.en} fr={title.fr} />
      </h2>
      <p className="art-card-desc">
        <B en={description.en} fr={description.fr} />
      </p>
    </Link>
  )
}
