import type { StaticImageData } from "next/image"
import { C } from "@/content/en"
import industry from "@/assets/sectors/industry.webp"
import health2 from "@/assets/sectors/health-2.webp"
import agriculture from "@/assets/sectors/agriculture.webp"
import transportation from "@/assets/sectors/transportation.webp"
import logistics2 from "@/assets/sectors/logistics-2.jpg"
import energy from "@/assets/sectors/energy.jpg"
import retail from "@/assets/sectors/retail.webp"

export type SectorKey = "industry" | "healthcare" | "agriculture" | "transportation" | "logistics" | "energy" | "retail"

/** The seven sectors in the order of the hero film and of the sector list. `data` is the key in SECTOR_DATA (retail has none). */
export const SECTORS: { key: SectorKey; title: string; data: "industry" | "health" | "agriculture" | "transportation" | "logistics" | "energy" | null; photo: StaticImageData }[] = [
  { key: "industry", title: C.sectors.tabs[0], data: "industry", photo: industry },
  { key: "healthcare", title: C.sectors.tabs[1], data: "health", photo: health2 },
  { key: "agriculture", title: C.sectors.tabs[2], data: "agriculture", photo: agriculture },
  { key: "transportation", title: C.sectors.tabs[3], data: "transportation", photo: transportation },
  { key: "logistics", title: C.sectors.tabs[4], data: "logistics", photo: logistics2 },
  { key: "energy", title: C.sectors.tabs[5], data: "energy", photo: energy },
  { key: "retail", title: C.quickfit.tabs[6], data: null, photo: retail },
]
