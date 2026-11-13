import { NextResponse, type NextRequest } from "next/server"

const COUNTRY_COOKIE = "sentria_country"

/* Keeps the visitor's country in a cookie, so the pricing grid can show their currency.
   Vercel sends the country in x-vercel-ip-country. Set again only when it changes. */
function withCountry(request: NextRequest, response: NextResponse) {
  const country = request.headers.get("x-vercel-ip-country")?.toUpperCase()
  if (country && /^[A-Z]{2}$/.test(country) && request.cookies.get(COUNTRY_COOKIE)?.value !== country) {
    response.cookies.set(COUNTRY_COOKIE, country, { path: "/", maxAge: 60 * 60 * 24 * 30, sameSite: "lax" })
  }
  return response
}

/* The root address sends each visitor to the language their browser asks
   for first: French to /fr, anything else to /en. Temporary (307), so the
   choice is made again for each visit. */
export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname !== "/") return withCountry(request, NextResponse.next())

  const tags = (request.headers.get("accept-language") ?? "")
    .split(",")
    .map((tag) => tag.split(";")[0].trim().toLowerCase())

  const first = tags.find((tag) => tag.startsWith("fr") || tag.startsWith("en"))
  const lang = first?.startsWith("fr") ? "fr" : "en"

  const url = request.nextUrl.clone()
  url.pathname = `/${lang}`

  const response = NextResponse.redirect(url, 307)
  response.headers.set("Vary", "Accept-Language")
  return withCountry(request, response)
}

/* Every page, but not the built files, images, or the API. */
export const config = {
  matcher: "/((?!_next|api|.*\\..*).*)",
}
