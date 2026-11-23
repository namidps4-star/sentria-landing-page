import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Page not found | SentrIA",
  robots: { index: false, follow: true },
}

/* Shown for any address that does not exist. It names the problem in both languages and links to each home page. */
export default function NotFound() {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
          background: "#0b0c08",
          color: "#f5f3ea",
          fontFamily: "system-ui, -apple-system, Segoe UI, sans-serif",
        }}
      >
        <main style={{ maxWidth: "520px" }}>
          <p style={{ margin: 0, fontSize: "14px", letterSpacing: "0.08em", color: "#d6ff3f" }}>404</p>
          <h1 style={{ margin: "12px 0 16px", fontSize: "clamp(28px, 4vw, 40px)", lineHeight: 1.1, fontWeight: 700 }}>
            This page does not exist.
          </h1>
          <p style={{ margin: "0 0 28px", fontSize: "17px", lineHeight: 1.6, color: "#d9dbcc" }}>
            The address may be out of date. Start again from the home page.
          </p>
          <p style={{ margin: 0, display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <a
              href="/en"
              style={{ display: "inline-block", padding: "12px 22px", borderRadius: "999px", background: "#d6ff3f", color: "#0b0c08", fontWeight: 600, textDecoration: "none" }}
            >
              Home (English)
            </a>
            <a
              href="/fr"
              style={{ display: "inline-block", padding: "12px 22px", borderRadius: "999px", border: "1px solid #f5f3ea", color: "#f5f3ea", fontWeight: 600, textDecoration: "none" }}
            >
              Accueil (français)
            </a>
          </p>
          <p style={{ margin: "28px 0 0", fontSize: "14px", color: "#b9bab2" }}>
            Cette page n’existe pas. Repartez de l’accueil.
          </p>
        </main>
      </body>
    </html>
  )
}
