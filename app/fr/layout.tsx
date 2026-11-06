import type { ReactNode }  from "react"
import { LangProvider } from "@/components/lang-provider"

export default function Layout({ children }: { children: ReactNode }) {
  return <LangProvider lang="fr">{children}</LangProvider>
}
