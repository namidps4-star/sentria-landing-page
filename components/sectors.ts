import type { StaticImageData } from "next/image"
import { C } from "@/content/en"
import industry from "@/assets/sectors/hq-industry.jpg"
import healthcare from "@/assets/sectors/hq-healthcare.jpg"
import agriculture from "@/assets/sectors/hq-agriculture.jpg"
import transportation from "@/assets/sectors/hq-transportation.jpg"
import logistics from "@/assets/sectors/hq-logistics.jpg"
import energy from "@/assets/sectors/hq-energy.jpg"
import retail from "@/assets/sectors/hq-retail.jpg"

export type SectorKey = "industry" | "healthcare" | "agriculture" | "transportation" | "logistics" | "energy" | "retail"

/** The seven sectors in the order of the hero film and of the sector list. `data` is the key in SECTOR_DATA (retail has none). */
export const SECTORS: { key: SectorKey; title: string; data: "industry" | "health" | "agriculture" | "transportation" | "logistics" | "energy" | null; photo: StaticImageData }[] = [
  { key: "industry", title: C.sectors.tabs[0], data: "industry", photo: industry },
  { key: "healthcare", title: C.sectors.tabs[1], data: "health", photo: healthcare },
  { key: "agriculture", title: C.sectors.tabs[2], data: "agriculture", photo: agriculture },
  { key: "transportation", title: C.sectors.tabs[3], data: "transportation", photo: transportation },
  { key: "logistics", title: C.sectors.tabs[4], data: "logistics", photo: logistics },
  { key: "energy", title: C.sectors.tabs[5], data: "energy", photo: energy },
  { key: "retail", title: C.quickfit.tabs[6], data: null, photo: retail },
]
