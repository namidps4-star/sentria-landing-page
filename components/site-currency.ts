import { useEffect, useState } from "react"

import { COUNTRY_COOKIE, FALLBACK_CURRENCY, currencyForCountry, type SiteCurrency } from "@/content/prices"

/* The visitor's currency comes from their country (cookie set by proxy.ts). Until the page
   has read it, USD shows, so the server and the first paint agree. */
export function useSiteCurrency(): SiteCurrency {
  const [currency, setCurrency] = useState<SiteCurrency>(FALLBACK_CURRENCY)
  useEffect(() => {
    const entry = document.cookie.split("; ").find((c) => c.startsWith(`${COUNTRY_COOKIE}=`))
    setCurrency(currencyForCountry(entry?.split("=")[1]))
  }, [])
  return currency
}
