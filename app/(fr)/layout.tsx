import "../globals.css"
import "../revamp.css"
import "../connect.css"
import type { ReactNode } from "react"
import { SiteShell, metadataFr, viewport as sharedViewport } from "../_shell/shell"

export const metadata = metadataFr
export const viewport = sharedViewport

/** French section: every page under this layout is in French, with <html lang="fr">. */
export default function FrLayout({ children }: { children: ReactNode }) {
  return <SiteShell lang="fr">{children}</SiteShell>
}
