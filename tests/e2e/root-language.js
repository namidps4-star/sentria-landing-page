// The root address picks a language from Accept-Language (proxy.ts) and the sitemap pairs /africa with /afrique.
const { APP_URL, pass, results } = require('./env')

const landing = async (acceptLanguage) => {
  const res = await fetch(`${APP_URL}/`, { redirect: 'manual', headers: acceptLanguage ? { 'Accept-Language': acceptLanguage } : {} })
  const location = res.headers.get('location') || ''
  // The Location header is relative to the app, so resolve it before comparing paths.
  return { status: res.status, to: location ? new URL(location, APP_URL).pathname : '' }
}

;(async () => {
  console.log('== root redirect by browser language')
  {
    const r = await landing('en-US,en;q=0.9')
    pass(r.status === 307 && r.to === "/en", `English-first browser goes to /en (${r.status} ${r.to})`)
  }
  {
    const r = await landing('en-GB')
    pass(r.status === 307 && r.to === "/en", `English-only browser goes to /en (${r.status} ${r.to})`)
  }
  {
    // Founder decision (F-AFRICA-LANG): a French-first browser goes to /fr. No saved-choice rule.
    const r = await landing('fr-FR,fr;q=0.9,en;q=0.8')
    pass(r.status === 307 && r.to === "/fr", `French-first browser goes to /fr (${r.status} ${r.to})`)
  }
  {
    const r = await landing('de-DE,de;q=0.9,en;q=0.5')
    pass(r.status === 307 && r.to === "/en", `no French, English fallback goes to /en (${r.status} ${r.to})`)
  }
  console.log('== sitemap pairs /africa and /afrique')
  const xml = await (await fetch(`${APP_URL}/sitemap.xml`)).text()
  const entry = (loc) => (xml.split('<url>').find((u) => u.includes(`<loc>${loc}</loc>`)) || '')
  const africa = entry('https://sentriahq.dev/africa')
  const afrique = entry('https://sentriahq.dev/afrique')
  pass(/hreflang="en" href="https:\/\/sentriahq\.dev\/africa"/.test(africa) && /hreflang="fr" href="https:\/\/sentriahq\.dev\/afrique"/.test(africa), '/africa lists both alternates')
  pass(/hreflang="en" href="https:\/\/sentriahq\.dev\/africa"/.test(afrique) && /hreflang="fr" href="https:\/\/sentriahq\.dev\/afrique"/.test(afrique), '/afrique lists both alternates')

  process.exit(results.fails ? 1 : 0)
})()
