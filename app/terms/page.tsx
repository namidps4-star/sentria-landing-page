import type { Metadata } from "next"
import { B } from "@/components/t"
import { LegalPage, Section } from "@/components/legal/legal"

export const metadata: Metadata = {
  title: "Terms | SentrIA",
  description: "Terms of use for SentrIA.",
  alternates: { canonical: "/terms" },
}

export default function Terms() {
  return (
    <LegalPage title={{ en: "Terms", fr: "Conditions" }} updated="23 October 2026">
      <Section en="The service" fr="Le service">
        <p>
          <B
            en="SentrIA is subscription software that shows operational risks with their evidence and a recommended action. Plans are listed on the pricing page."
            fr="SentrIA est un logiciel par abonnement qui signale les risques opérationnels avec leurs preuves et une action recommandée. Les formules sont indiquées sur la page tarifs."
          />
        </p>
      </Section>
      <Section en="Your account" fr="Votre compte">
        <p>
          <B
            en="Keep your password private. You are responsible for activity on your account and for the data you upload."
            fr="Gardez votre mot de passe confidentiel. Vous êtes responsable de l'activité de votre compte et des données que vous importez."
          />
        </p>
      </Section>
      <Section en="Acceptable use" fr="Utilisation acceptable">
        <p>
          <B
            en="Do not use SentrIA for anything illegal, do not try to break into the service or other accounts, and do not upload data you have no right to use."
            fr="N'utilisez pas SentrIA à des fins illégales, n'essayez pas de pénétrer le service ou d'autres comptes, et n'importez pas de données que vous n'avez pas le droit d'utiliser."
          />
        </p>
      </Section>
      <Section en="Your data" fr="Vos données">
        <p>
          <B
            en="Your data stays yours. You let us process it only to provide SentrIA to you."
            fr="Vos données restent les vôtres. Vous nous autorisez à les traiter uniquement pour vous fournir SentrIA."
          />
        </p>
      </Section>
      <Section en="Decisions and results" fr="Décisions et résultats">
        <p>
          <B
            en="SentrIA suggests actions. Your team makes the decisions and carries them out. We do not guarantee any business result."
            fr="SentrIA propose des actions. Votre équipe décide et les met en œuvre. Nous ne garantissons aucun résultat commercial."
          />
        </p>
      </Section>
      <Section en="Liability" fr="Responsabilité">
        <p>
          <B
            en="To the extent the law allows, our total liability is limited to the fees you paid in the 12 months before the claim."
            fr="Dans la mesure permise par la loi, notre responsabilité totale est limitée aux sommes payées au cours des 12 mois précédant la réclamation."
          />
        </p>
      </Section>
      <Section en="Governing law" fr="Droit applicable">
        <p>
          <B
            en="To be confirmed before launch."
            fr="À confirmer avant le lancement."
          />
        </p>
      </Section>
    </LegalPage>
  )
}
