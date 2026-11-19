import "./africa-steps-panels.css"

/* The three steps of the wholesaler page as three tall, thin panels: grey, white, lime. Each has a giant step
   number that bleeds off an edge (bottom-left, top-right, bottom-left) and a small label with the step's text.
   The heading and a short line sit on the left. The numbers slide in when the section comes into view. */
type Step = { title: string; text: string }

const LEAD = {
  en: "Three steps, from your export to your first decision.",
  fr: "Trois étapes, de votre export à votre première décision.",
}

export function AfricaStepsPanels({ heading, steps, kicker, lang }: { heading: string; steps: Step[]; kicker?: string; lang: "en" | "fr" }) {
  const tone = ["grey", "white", "lime"]
  return (
    <div className="afr-sp3" data-rv="rise">
      <div className="afr-sp3-head">
        {kicker && <p className="eyebrow">{kicker}</p>}
        <h3>{heading}</h3>
        <p className="afr-sp3-lead">{LEAD[lang]}</p>
      </div>
      <ol className="afr-sp3-row">
        {steps.slice(0, 3).map((s, i) => (
          <li key={s.title} className={`afr-sp3-p ${tone[i]}`} data-n={i + 1}>
            <span className="afr-sp3-num" aria-hidden="true">{`0${i + 1}`}</span>
            <div className="afr-sp3-txt">
              <h4>{s.title}</h4>
              <p>{s.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
