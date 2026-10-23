import Link from "next/link"
import type { ReactNode } from "react"
import { LEGAL_COMPANY, LEGAL_CONTACT, LEGAL_DOCS, LEGAL_TITLES, LEGAL_VERSION, type LegalDocId } from "@/content/legal"
import { B } from "./t"
import { Mark } from "./ui"
import { LangSwitch } from "./header"
import { LegalToc } from "./legal-toc"

const pad = (n: number) => String(n).padStart(2, "0")

/** "Your account: name, company…" reads better with the label in bold. Only a short label before a colon counts. */
function withLead(text: string): ReactNode {
  const m = text.match(/^([^.:]{2,40}?)(\s?:)\s([\s\S]+)$/)
  if (!m) return text
  return (
    <>
      <b>
        {m[1]}
        {m[2]}
      </b>{" "}
      {m[3]}
    </>
  )
}

/** "We work with providers: Supabase (sign-in), Vercel (hosting)…" becomes the intro and one chip per provider. */
function asProviders(text: string) {
  const m = text.match(/^([^:]{3,120}?)(\s?:)\s([\s\S]+?)\.$/)
  if (!m) return null
  const rest = m[3]
  const items = Array.from(rest.matchAll(/([A-Z][A-Za-z]+) \(([^()]+)\)/g))
  if (items.length < 4) return null
  const left = items.reduce((acc, it) => acc.replace(it[0], ""), rest).replace(/,|\band\b|\bet\b|\s/g, "")
  if (left !== "") return null
  return { intro: m[1] + m[2], items: items.map((it) => ({ name: it[1], note: it[2] })) }
}

function Para({ text }: { text: string }) {
  const p = asProviders(text)
  if (!p) return <p>{withLead(text)}</p>
  return (
    <div>
      <p>{p.intro}</p>
      <ul className="lg-chips">
        {p.items.map((it) => (
          <li key={it.name}>
            {it.name} <span>· {it.note}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

/** Privacy and Terms, one page each, the same text as the dashboard dialog. */
export function LegalPage({ doc }: { doc: LegalDocId }) {
  const sections = LEGAL_DOCS[doc]
  const entries = [...sections.map((s) => ({ fr: s.title[0], en: s.title[1] })), { fr: "Contact", en: "Contact" }]
  const title = LEGAL_TITLES[doc]
  const num = (i: number) => (
    <span className="lg-num" aria-hidden="true">
      {pad(i + 1)}
    </span>
  )
  return (
    <>
      <header className="hd">
        <nav className="bar" aria-label="Main">
          <Link className="logo" href="/" aria-label="SentrIA">
            <span className="logo-mark">
              <Mark />
            </span>
            <span className="logo-word">SentrIA</span>
          </Link>
          <div className="nav-actions">
            <LangSwitch />
            <Link className="btn btn-lime nav-cta" href="/">
              <B en="Back to site" fr="Retour au site" />
            </Link>
          </div>
        </nav>
      </header>
      <main id="main" className="rv-sec lg">
        <div className="wrap">
          <p className="rv-kicker">
            <B en="Legal" fr="Légal" />
          </p>
          <h1 className="rv-h lg-h">
            <span className="en">{title[1]}</span>
            <span className="fr" lang="fr">
              {title[0]}
            </span>
          </h1>
          <p className="lg-ver">
            {LEGAL_COMPANY} · <B en="Version of" fr="Version du" /> {LEGAL_VERSION}
          </p>
          <div className="lg-tabs" role="tablist">
            {(["privacy", "terms"] as const).map((id) => (
              <a key={id} href={`/${id}`} role="tab" aria-selected={doc === id}>
                <span className="en">{LEGAL_TITLES[id][1]}</span>
                <span className="fr" lang="fr">
                  {LEGAL_TITLES[id][0]}
                </span>
              </a>
            ))}
          </div>
          <p className="lg-draft">
            <B
              en="Draft not reviewed by a lawyer. This text does not say the service follows any particular law. Points still to confirm are marked."
              fr="Brouillon non relu par un juriste. Ce texte ne dit pas que le service respecte une loi donnée. Les points à confirmer sont indiqués."
            />
          </p>
          <div className="lg-grid">
            <LegalToc entries={entries} />
            <div className="lg-body">
              {sections.map((s, i) => (
                <section key={s.title[1]} id={`s${i}`} data-legal-section={i} className="lg-card">
                  {num(i)}
                  <div>
                    <h2>
                      <B en={s.title[1]} fr={s.title[0]} />
                    </h2>
                    {s.body.map((p) => (
                      <div key={p[1]} className="lg-p">
                        <div className="en">
                          <Para text={p[1]} />
                        </div>
                        <div className="fr" lang="fr">
                          <Para text={p[0]} />
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              ))}
              <section id={`s${sections.length}`} data-legal-section={sections.length} className="lg-card">
                {num(sections.length)}
                <div>
                  <h2>Contact</h2>
                  <div className="lg-p">
                    <p>
                      <B
                        en="For any question or request about your data, write to"
                        fr="Pour toute question ou demande sur vos données, écrivez à"
                      />{" "}
                      <a href={`mailto:${LEGAL_CONTACT}`}>{LEGAL_CONTACT}</a>.
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
