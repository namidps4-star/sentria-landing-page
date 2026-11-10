import { C } from "@/content/en"
import { FR } from "@/content/fr"
import { T, B } from "./t"
import { ConnectStack } from "./connect-stack"
import { FlowCircles } from "./flow-circles"
import { ReasoningPlates } from "./reasoning-plates"
import { PricingGrid } from "./pricing"
import { Eyebrow, iv } from "./ui"
import { Sec, H2 } from "./section-frame"

/* ---------------------------------------------------------------- cockpit */

export function Cockpit() {
  const s = C.cockpit
  return (
    <section id="cockpit" className="rv-sec rv-dark rv-queue">
      <div className="wrap">
        <p className="rv-kicker" data-rv="fade">
          <B en="The decision queue" fr="La file de décisions" />
        </p>
        <h2 className="rv-h" data-rv="rise">
          <T s={s.title} />
        </h2>
        <p className="rv-lead" data-rv="rise" style={iv(1)}>
          <T s={s.lead} />
        </p>
        <ol className="rv-rows" data-rv="rise" style={iv(2)}>
          {s.queue.map((q) => {
            const [en, pct] = q.a.split(", ")
            const fr = (FR[q.a] ?? q.a).split(", ")[0]
            return (
              <li key={q.t} className="rv-row">
                <span className="rv-r-t">
                  <T s={q.t} />
                </span>
                <span className="rv-r-a">
                  <B en={en} fr={fr} />
                </span>
                <span className="rv-r-n">{pct}</span>
              </li>
            )
          })}
        </ol>
        <ul className="rv-feats">
          {s.features.map((f) => (
            <li key={f.h}>
              <strong>
                <T s={f.h} />
              </strong>
              <span>
                <T s={f.p} />
              </span>
            </li>
          ))}
        </ul>
        <p className="rv-ex">
          <B en="Example queue." fr="Exemple de file." />
        </p>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- pricing */

export function Pricing() {
  return (
    <Sec id="tarifs" tone="sand" className="pricing">
      <Eyebrow>
        <B en="Pricing" fr="Tarifs" />
      </Eyebrow>
      <H2>
        <B en="Plans and prices." fr="Offres et tarifs." />
      </H2>
      <p className="lead" data-rv="rise" style={iv(1)}>
        <B
          en="Pick a plan. Prices are set per market and shown in your currency. Annual billing is 10 months for 12."
          fr="Choisissez une offre. Les prix sont fixés par marché et affichés dans votre devise. La facturation annuelle compte 10 mois pour 12."
        />
      </p>
      <PricingGrid />
      <p className="note" data-rv="fade">
        <B en="Entreprise is priced to your scope: sectors, sites, users and integration." fr="Entreprise est chiffrée selon votre périmètre : secteurs, sites, utilisateurs et intégration." />
      </p>
    </Sec>
  )
}

/* ------------------------------------------------------------------- flow */

export function Flow() {
  const s = C.flow
  return (
    <Sec tone="deep" className="flow">
      <Eyebrow>
        <T s={s.eyebrow} />
      </Eyebrow>
      <H2>
        <T s={s.title} />
      </H2>
      <FlowCircles steps={s.steps} />
    </Sec>
  )
}

/* ------------------------------------------------------------------- data */

export function DataSec() {
  const s = C.data
  return (
    <Sec tone="dark" className="datasec">
      <Eyebrow>
        <T s={s.eyebrow} />
      </Eyebrow>
      <H2>
        <T s={s.title} />
      </H2>
      <p className="lead" data-rv="rise" style={iv(1)}>
        <T s={s.lead} />
      </p>
      <ConnectStack />
    </Sec>
  )
}

/* -------------------------------------------------------------- reasoning */

export function Reasoning() {
  const s = C.reasoning
  return (
    <Sec tone="deep" className="reasoning">
      <Eyebrow>
        <T s={s.eyebrow} />
      </Eyebrow>
      <H2>
        <T s={s.title} />
      </H2>
      <ReasoningPlates items={s.items} />
    </Sec>
  )
}
