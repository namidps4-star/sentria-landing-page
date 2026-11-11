import { CAPABILITIES } from "@/content/africa-activities"

export function AfricaCapabilities({ slug, lang }: { slug: string; lang: "en" | "fr" }) {
  const c = CAPABILITIES[slug]?.[lang]
  if (!c) return null
  const youImport = lang === "en" ? "You import" : "Vous importez"
  return (
    <section className="afr-caps" aria-labelledby={`afr-caps-${slug}-${lang}`}>
      <h2 id={`afr-caps-${slug}-${lang}`}>{c.heading}</h2>
      <ul>
        {c.items.map((item) => (
          <li key={item.title}>
            <div className="afr-caps-ed">
              <h3>{item.title}</h3>
              <p>{item.does}</p>
              <p className="afr-caps-imp">
                <b>{youImport}:</b> {item.imports}
              </p>
            </div>
            <div className="afr-caps-circ">
              <div className="afr-caps-semi">{item.example}</div>
            </div>
          </li>
        ))}
      </ul>
      <p className="afr-caps-not">{c.notDo}</p>
    </section>
  )
}
