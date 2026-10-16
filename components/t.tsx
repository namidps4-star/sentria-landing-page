import { FR } from "@/content/fr"

/**
 * Renders a string in both languages. The visible one is picked by CSS from
 * <html lang>, so the page never flashes the wrong language and the server
 * HTML carries both. Strings without a French entry (or identical in French)
 * render once.
 */
export function T({ s, fr }: { s: string; fr?: string }) {
  const f = fr ?? FR[s]
  if (!f || f === s) return <>{s}</>
  return (
    <>
      <span className="en">{s}</span>
      <span className="fr" lang="fr">
        {f}
      </span>
    </>
  )
}

/** A string that exists only as {en, fr}, for text that was not in the old page. */
export function B({ en, fr }: { en: string; fr: string }) {
  return (
    <>
      <span className="en">{en}</span>
      <span className="fr" lang="fr">
        {fr}
      </span>
    </>
  )
}
