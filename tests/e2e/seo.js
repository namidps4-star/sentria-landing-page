// Search metadata: the server HTML carries the English title and description, French follows the
// visitor's language on the home page, the limits hold, and the legal pages keep their own titles.
const { playwright, LAUNCH, APP_URL, pass, results } = require('./env')

const grab = (html, re) => (html.match(re) || [])[1]

;(async () => {
  console.log('== server HTML (what a crawler reads)')
  const html = await (await fetch(APP_URL)).text()
  const title = grab(html, /<title>([^<]*)<\/title>/)
  const desc = grab(html, /<meta name="description" content="([^"]*)"/)
  pass(title === 'SentrIA | Operational decision software with evidence', `title is the English one: ${title}`)
  pass(!!desc && desc.length <= 160 && title.length <= 60, `lengths hold: title ${title && title.length}, description ${desc && desc.length}`)
  pass(/<link rel="canonical" href="https:\/\/sentriahq\.dev\/?"/.test(html), 'canonical points at https://sentriahq.dev')
  pass(/<meta name="robots" content="index, follow"/.test(html) || !/noindex/.test(html), 'the home page is not noindex')

  console.log('== icons (the logo Google shows beside a result)')
  const ico = await fetch(`${APP_URL}/favicon.ico`)
  pass(ico.status === 200 && /icon/.test(ico.headers.get('content-type') || ''), '/favicon.ico is served')
  const png = await fetch(`${APP_URL}/icon.png`)
  const bytes = Buffer.from(await png.arrayBuffer())
  pass(png.status === 200 && bytes.readUInt32BE(16) === 192 && bytes.readUInt32BE(20) === 192, '/icon.png is a 192 by 192 PNG')
  pass(/<link rel="icon" href="\/icon\.png(\?v=\d+)?"[^>]*sizes="192x192"/.test(html) && /<link rel="icon" href="\/favicon\.ico/.test(html), 'the page links the .ico and the 192 px PNG')

  console.log('== browser')
  const b = await playwright().chromium.launch(LAUNCH)
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } })
  const p = await ctx.newPage()
  await p.addInitScript(() => localStorage.setItem('sentria-language', 'fr'))
  await p.goto(APP_URL)
  await p.waitForTimeout(1500)
  const frTitle = await p.title()
  const frDesc = await p.getAttribute('meta[name="description"]', 'content')
  pass(frTitle === 'SentrIA | Logiciel de décision opérationnelle', `French visitor sees the French title: ${frTitle}`)
  pass(frTitle.length <= 60 && frDesc.length <= 160 && /décision opérationnelle|risque opérationnel/.test(frDesc + frTitle), `French lengths hold (${frTitle.length}, ${frDesc.length})`)
  pass(frTitle !== title && frDesc !== desc, 'the two languages do not share a title or a description')

  console.log('== language pages')
  const fr = await (await fetch(`${APP_URL}/fr`)).text()
  const en = await (await fetch(`${APP_URL}/en`)).text()
  pass(grab(fr, /<title>([^<]*)<\/title>/) === 'SentrIA | Logiciel de décision opérationnelle', '/fr server HTML has the French title')
  pass(grab(en, /<title>([^<]*)<\/title>/) === 'SentrIA | Operational decision software with evidence', '/en server HTML has the English title')
  pass(/<link rel="canonical" href="https:\/\/sentriahq\.dev\/fr"/.test(fr) && /<link rel="canonical" href="https:\/\/sentriahq\.dev\/en"/.test(en), 'each language page is canonical to itself')
  for (const page of [html, fr, en]) {
    pass(/hrefLang="en" href="https:\/\/sentriahq\.dev\/en"/.test(page) && /hrefLang="fr" href="https:\/\/sentriahq\.dev\/fr"/.test(page), 'hreflang links /en and /fr')
  }

  await p.goto(`${APP_URL}/fr`)
  await p.waitForTimeout(1200)
  pass(await p.evaluate(() => document.documentElement.lang) === 'fr', '/fr sets <html lang> to fr in the browser')
  await p.locator('.lang-switch button', { hasText: 'EN' }).first().click()
  await p.waitForTimeout(300)
  pass(new URL(p.url()).pathname === '/en', `the switch moves /fr to /en: ${new URL(p.url()).pathname}`)
  pass(await p.title() === 'SentrIA | Operational decision software with evidence', 'after the switch the title is English')

  await p.goto(`${APP_URL}/privacy`)
  await p.waitForTimeout(1200)
  pass(!/Operational decision|Logiciel de décision/.test(await p.title()), `Privacy keeps its own title: ${await p.title()}`)
  await b.close()
  process.exit(results.fails ? 1 : 0)
})()
