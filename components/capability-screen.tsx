import type { CSSProperties } from "react"
import type { Capability } from "@/content/africa-activities"

type Labels = { alert: string; youImport: string; restTitle: string; restText: string }

const step = (i: number) => ({ "--i": i }) as CSSProperties

/** The white pop-up screen in the middle. Shows one capability, or a prompt when nothing is hovered. */
export function CapabilityScreen({ item, labels, id }: { item: Capability | null; labels: Labels; id: string }) {
  return (
    <div className="afr-scr" id={id} aria-live="polite">
      <div className="afr-scr-bar" aria-hidden="true">
        <i />
        <i />
        <i />
        <b>SentrIA</b>
      </div>
      {item ? (
        <div className="afr-scr-body" key={item.title}>
          <h3 style={step(0)}>{item.title}</h3>
          <p className="afr-scr-does" style={step(1)}>
            {item.does}
          </p>
          <p className="afr-scr-prob" style={step(2)}>
            <i aria-hidden="true" />
            {item.problem}
          </p>
          <div className="afr-scr-alert" style={step(3)}>
            <span>
              <i aria-hidden="true" />
              {labels.alert}
            </span>
            <p>{item.example}</p>
          </div>
          <p className="afr-scr-imp" style={step(4)}>
            <b>{labels.youImport}:</b> {item.imports}
          </p>
        </div>
      ) : (
        <div className="afr-scr-rest" key="rest">
          <h3 style={step(0)}>{labels.restTitle}</h3>
          <p style={step(1)}>{labels.restText}</p>
        </div>
      )}
    </div>
  )
}
