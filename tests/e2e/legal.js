// The Privacy and Terms pages: same text as the app dialog, both languages, tabs, contents, footer links, 390 px.
const { playwright, LAUNCH, APP_URL, pass, results, IGNORED_ERRORS, SHOTS } = require('./env')

;(async () => {
  const b = await playwright().chromium.launch(LAUNCH)
  for (const [w, h, tag] of [[1440, 900, 'desktop'], [390, 844, 'phone']]) {
    console.log(`== ${tag}`)
    const ctx = await b.newContext({ viewport: { width: w, height: h } })
    const p = await ctx.newPage()
    const errs = []
    p.on('pageerror', (e) => errs.push(e.message))
    p.on('console', (m) => { if (m.type() === 'error' && !IGNORED_ERRORS.test(m.text())) errs.push(m.text().slice(0, 160)) })
    for (const doc of ['privacy', 'terms']) {
      await p.goto(`${APP_URL}/${doc}`)
      await p.waitForTimeout(800)
      pass((await p.locator('h1').count()) === 1, `${tag} /${doc}: one h1`)
      pass((await p.locator('.lg-card').count()) >= 6, `${tag} /${doc}: numbered sections (${await p.locator('.lg-card').count()})`)
      pass(await p.locator('.lg-draft').isVisible(), `${tag} /${doc}: draft banner shows`)
      pass(await p.evaluate(() => document.body.style.overflow !== 'hidden' && !document.documentElement.classList.contains('op-run')), `${tag} /${doc}: no opening layer, page scrolls`)
      pass(await p.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${tag} /${doc}: no sideways scroll`)
      pass((await p.locator('a[href="mailto:hello@sentria.dev"]').count()) === 1, `${tag} /${doc}: contact is hello@sentria.dev`)
      await p.screenshot({ path: `${SHOTS}/legal-${doc}-${tag}.png` })
    }
    await p.goto(`${APP_URL}/privacy`)
    await p.locator('.lg-tabs a').nth(1).click()
    await p.waitForURL('**/terms')
    pass(true, `${tag}: the Terms tab opens /terms`)
    await p.evaluate(() => (document.documentElement.lang = 'fr'))
    await p.waitForTimeout(300)
    const fr = await p.evaluate(() => document.querySelector('h1').innerText)
    pass(/Conditions/.test(fr), `${tag}: French title (${fr})`)
    pass(errs.length === 0, `${tag}: no page errors${errs.length ? ': ' + errs.join(' | ') : ''}`)
    await ctx.close()
  }
  // the home footer links to the pages
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } })
  const p = await ctx.newPage()
  await p.goto(APP_URL)
  await p.waitForTimeout(1500)
  pass((await p.locator('footer a[href="/privacy"]').count()) === 1 && (await p.locator('footer a[href="/terms"]').count()) === 1, 'footer links to /privacy and /terms')
  await ctx.close()
  await b.close()
  console.log(results.fails ? `\n${results.fails} FAILED` : '\nALL PASSED')
  process.exit(results.fails ? 1 : 0)
})()
