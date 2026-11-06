import type { Metadata } from "next"
import { SentriaWordmark } from "@/components/sentria-wordmark"

export const metadata: Metadata = {
  title: "SentrIA motion",
  robots: { index: false, follow: false },
}

export default function MotionPage() {
  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", background: "var(--ink)" }}>
      <SentriaWordmark />
    </main>
  )
}
