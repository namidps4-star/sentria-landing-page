import "../globals.css"
import "../revamp.css"
import "../../styles/globals/01-section.css"
import "../../styles/globals/02-header.css"
import "../../styles/globals/03-opening.css"
import "../../styles/globals/03a-opening-intro.css"
import "../../styles/globals/04-typing-each-letter-appears-in-turn-with.css"
import "../../styles/globals/04a-hero-lens.css"
import "../../styles/globals/05-sections.css"
import "../../styles/globals/06-product.css"
import "../../styles/globals/07-shift.css"
import "../../styles/globals/08-not-a-dashboard-a-decision-layer-the-sen.css"
import "../../styles/globals/09-pricing.css"
import "../../styles/globals/10-seven-cards-a-row-of-four-then-a-row-of.css"
import "../../styles/globals/11-demo.css"
import "../../styles/globals/12-responsive.css"
import "../../styles/revamp/01-landing-revamp-apple-linear-pinterest-di.css"
import "../../styles/revamp/02-each-signal-slides-in-when-its-sector-is.css"
import "../../styles/revamp/03-dark-variant-shift-queue.css"
import "../../styles/revamp/04-the-product-tour-dashboard.css"
import "../../styles/revamp/05-legal-pages-privacy-terms.css"
import "../../styles/revamp/06-implementation-overlapping-circles.css"
import "../../styles/revamp/07-trust-circle-cluster.css"
import "../../styles/revamp/08-reasoning-three-plates.css"
import "../../styles/revamp/09-reasoning-premium-motion-all-of-it-off-u.css"
import "../../styles/revamp/10-demo-dial.css"
import "../../styles/revamp/11-quick-fit-segmented-track.css"
import "../../styles/connect/01-connect-stack-components-connect-stack-t.css"
import "../../styles/connect/02-csv-a-scan-line-reading-across-the-sheet.css"
import "../../styles/connect/03-erp-monitor.css"
import "../../styles/connect/04-entrance-motion.css"
import "../../styles/connect/05-phone.css"
import type { ReactNode } from "react"
import { SiteShell, metadataFr, viewport as sharedViewport } from "../_shell/shell"

export const metadata = metadataFr
export const viewport = sharedViewport

/** French section: every page under this layout is in French, with <html lang="fr">. */
export default function FrLayout({ children }: { children: ReactNode }) {
  return <SiteShell lang="fr">{children}</SiteShell>
}
