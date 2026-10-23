import type { Metadata } from "next"
import { B } from "@/components/t"
import { LegalPage, Section } from "@/components/legal/legal"

export const metadata: Metadata = {
  title: "Privacy | SentrIA",
  description: "How SentrIA handles personal data.",
  alternates: { canonical: "/privacy" },
}

export default function Privacy() {
  return (
    <LegalPage
      title={{ en: "Privacy", fr: "Confidentialité" }}
      updated="23 October 2026"
    >
      <Section en="Who we are" fr="Qui nous sommes">
        <p>
          <B
            en="SentrIA is an operations software service. Contact us at hello@sentriahq.dev, or about personal data at privacy@sentriahq.dev."
            fr="SentrIA est un service logiciel pour les opérations. Écrivez à hello@sentriahq.dev, ou pour vos données personnelles à privacy@sentriahq.dev."
          />
        </p>
      </Section>
      <Section en="This website" fr="Ce site">
        <p>
          <B
            en="This landing page does not use analytics or advertising cookies. If you book a call, the booking tool (Calendly) handles the details you enter."
            fr="Cette page n'utilise ni cookies d'analyse ni cookies publicitaires. Si vous réservez un appel, l'outil de réservation (Calendly) traite les informations que vous saisissez."
          />
        </p>
      </Section>
      <Section en="The SentrIA app" fr="L'application SentrIA">
        <p>
          <B
            en="For customers, we store the account email, the company name, the data you upload, and your support messages. Data is kept in Supabase (database and sign-in), processed by our API on Render, and emails are sent through Resend."
            fr="Pour nos clients, nous conservons l'adresse e-mail du compte, le nom de l'entreprise, les données que vous importez et vos messages au support. Les données sont stockées chez Supabase (base de données et connexion), traitées par notre API chez Render, et les e-mails sont envoyés via Resend."
          />
        </p>
      </Section>
      <Section en="Who we share with" fr="Avec qui nous partageons">
        <p>
          <B
            en="Only the service providers above, and only to run SentrIA. We do not sell personal data."
            fr="Uniquement les prestataires cités ci-dessus, et uniquement pour faire fonctionner SentrIA. Nous ne vendons pas de données personnelles."
          />
        </p>
      </Section>
      <Section en="How long we keep it" fr="Durée de conservation">
        <p>
          <B
            en="We keep account data while the account is active. On request to privacy@sentriahq.dev, we delete the account data."
            fr="Nous conservons les données du compte tant que le compte est actif. Sur demande à privacy@sentriahq.dev, nous supprimons les données du compte."
          />
        </p>
      </Section>
      <Section en="Your rights" fr="Vos droits">
        <p>
          <B
            en="You can ask to see, correct, export or delete your data, or to object to its use. Write to privacy@sentriahq.dev."
            fr="Vous pouvez demander à voir, corriger, exporter ou supprimer vos données, ou vous opposer à leur usage. Écrivez à privacy@sentriahq.dev."
          />
        </p>
      </Section>
    </LegalPage>
  )
}
