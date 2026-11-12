import { NextResponse, type NextRequest } from "next/server"

/* The root address sends each visitor to the language their browser asks
   for first: French to /fr, anything else to /en. Temporary (307), so the
   choice is made again for each visit. Only the root is touched. */
export function proxy(request: NextRequest) {
  const tags = (request.headers.get("accept-language") ?? "")
    .split(",")
    .map((tag) => tag.split(";")[0].trim().toLowerCase())

  const first = tags.find((tag) => tag.startsWith("fr") || tag.startsWith("en"))
  const lang = first?.startsWith("fr") ? "fr" : "en"

  const url = request.nextUrl.clone()
  url.pathname = `/${lang}`

  const response = NextResponse.redirect(url, 307)
  response.headers.set("Vary", "Accept-Language")
  return response
}

export const config = {
  matcher: "/",
}
