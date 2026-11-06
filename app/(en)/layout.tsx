import "../globals.css"
import "../revamp.css"
import "../connect.css"
import type { ReactNode } from "react"
import { SiteShell, metadataEn, viewport as sharedViewport } from "../_shell/shell"

export const metadata = metadataEn
export const viewport = sharedViewport

/** English section: every page under this layout is in English, with <html lang="en">. */
export default function EnLayout({ children }: { children: ReactNode }) {
  return <SiteShell lang="en">{children}</SiteShell>
}
