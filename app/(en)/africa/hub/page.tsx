import type { Metadata } from "next"
import { AfricaHero } from "@/components/africa-hero"

export const metadata: Metadata = {
  title: "SentrIA — Africa",
  robots: { index: false, follow: false },
}

export default function Page() {
  return <AfricaHero activities="en" />
}
