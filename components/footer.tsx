import { C } from "@/content/en"
import { T, B } from "./t"
import { LocalLink } from "./local-link"
import { FootReveal } from "./foot-reveal"
import { iv } from "./ui"

/* ----------------------------------------------------------------- footer */

export function Footer() {
  const f = C.footer
  const link = (href: string, s: string) => (
    <li>
      {href.startsWith("/") ? (
        <LocalLink href={href}>
          <T s={s} />
        </LocalLink>
      ) : (
        <a href={href}>
          <T s={s} />
        </a>
      )}
    </li>
  )
  return (
    <footer className="foot">
      <div className="wrap foot-top">
        <div className="foot-l">
          <p className="foot-hook">
            <B en="Drop us a line, and we'll get in touch!" fr="Écrivez-nous, nous vous répondons vite !" />
          </p>
          <a className="foot-sched" href="#demo">
            <B en="Schedule a call" fr="Planifier un appel" />
          </a>
          <a className="foot-brand" href="#top">
            {f.brand}
          </a>
          <p className="foot-tag">
            <T s={f.tag} />
          </p>
        </div>
        <div className="foot-r">
          <a className="foot-mail" href="mailto:hello@sentriahq.dev" data-mag="">
            <span>hello@sentriahq.dev</span>
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M7 17L17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <div className="foot-cols">
            <div>
              <h4>
                <T s={f.product} />
              </h4>
              <ul>
                {link("#cockpit", "Decision queue")}
                {link("#methode", "Method")}
                {link("#tarifs", "Pricing")}
                {link("#fit", "Sectors")}
                {link("/africa", "Africa")}
              </ul>
            </div>
            <div>
              <h4>
                <T s={f.resources} />
              </h4>
              <ul>
                {link("#faq", "FAQ")}
                {link("#demo", "Demo")}
                {link("#demo", "Contact")}
                {link("/privacy", "Privacy")}
                {link("/terms", "Terms")}
              </ul>
            </div>
            <div>
              <h4>{f.brand}</h4>
              <ul>
                {link("#demo", "Talk to the team")}
                {link("#tarifs", "Pricing")}
                {link("#demo", "Book a call")}
              </ul>
            </div>
          </div>
          <div className="foot-copy">
            <span>
              <T s={f.copy} />
            </span>
            <span>
              <T s={f.line} />
            </span>
          </div>
        </div>
      </div>
      <div className="foot-band" aria-hidden="true">
        <div className="mega" data-rv="rise">
          {[..."SentrIA"].map((c, i) => (
            <span key={i} style={iv(i)}>
              {c}
            </span>
          ))}
        </div>
      </div>
      <FootReveal />
    </footer>
  )
}
