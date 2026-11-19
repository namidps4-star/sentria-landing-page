// The revamped sections: the problem, the method, where do you fit in, the closing block.
const { playwright, LAUNCH, APP_URL, pass, results, IGNORED_ERRORS, SHOTS } = require('./env')
const { chromium } = playwright()
const path = require('path')

;(async () => {
  const browser = await chromium.launch(LAUNCH)
  for (const [lang, w] of [['en', 1280], ['fr', 1280], ['en', 390], ['fr', 390]]) {
    console.log(`== ${lang.toUpperCase()} ${w}px`)
    const ctx = await browser.newContext({ viewport: { width: w, height: 900 } })
    await ctx.addInitScript((l) => {
      localStorage.setItem('sentria-skip-intro', '1')
      localStorage.setItem('sentria-language', l)
    }, lang)
    const page = await ctx.newPage()
    const errs = []
    page.on('pageerror', (e) => errs.push(e.message))
    page.on('console', (m) => { if (m.type() === 'error' && !IGNORED_ERRORS.test(m.text())) errs.push(m.text().slice(0, 160)) })
    await page.goto(APP_URL, { waitUntil: 'load' })
    await page.waitForTimeout(600)
    const H = await page.evaluate(() => document.documentElement.scrollHeight)
    for (let y = 0; y < H; y += 600) { await page.evaluate((y) => window.scrollTo(0, y), y); await page.waitForTimeout(50) }
    await page.waitForTimeout(900)

    // the problem
    const prob = page.locator('#situations')
    const words = prob.locator('.rv-word:visible')
    pass((await words.count()) === 3, 'the problem: three words')
    pass(await words.nth(0).getAttribute('aria-pressed') === 'true', 'the first word is chosen at the start')
    await words.nth(1).click()
    pass(await words.nth(1).getAttribute('aria-pressed') === 'true' && await words.nth(0).getAttribute('aria-pressed') === 'false', 'a click chooses another word')
    pass(await prob.locator('.rv-col:visible').count() === 3, 'and the three texts stay on screen')
    const ink = await words.nth(1).evaluate((e) => getComputedStyle(e).color)
    const grey = await words.nth(0).evaluate((e) => getComputedStyle(e).color)
    pass(ink !== grey, 'the chosen word has its own colour')

    // the method
    const met = page.locator('#methode')
    pass((await met.locator('.rv-word:visible').count()) === 4, 'the method: four words')
    pass(/Observe|Observer/.test(await met.locator('.rv-word:visible').first().innerText()), 'the first is Observe')
    pass(await met.locator('.rv-loop:visible').count() === 1, 'the loop note shows')

    // the shift
    const sh = page.locator('.rv-shift')
    pass((await sh.locator('.rv-h em:visible').count()) === 1, 'shift: the lime word')
    pass((await sh.locator('.rv-side').count()) === 2 && (await sh.locator('.rv-pill:visible').count()) === 1, 'shift: two sides, one pill')
    // the decision queue
    const qu = page.locator('#cockpit')
    pass((await qu.locator('.rv-row').count()) === 4, 'queue: four ranked rows')
    const pcts = await qu.locator('.rv-r-n').allInnerTexts()
    pass(pcts.join(',') === '94% confidence,81% confidence,88% confidence,72% confidence', 'queue: the percentages ' + pcts.join(','))
    pass((await qu.locator('.rv-feats li').count()) === 3, 'queue: three short texts')
    pass((await qu.locator('.live, .queue, img').count()) === 0, 'queue: no LIVE badge, no old card, no picture')
    pass((await qu.locator('.rv-ex:visible').count()) === 1, 'queue: marked as an example')

    // where do you fit in: the same sector row and activity menu as the Africa hub, with global links
    const fit = page.locator('#fit')
    const sectors = fit.locator('.sp-card')
    pass((await sectors.count()) === 7, 'fit: seven sectors')
    await sectors.nth(1).evaluate((el) => el.click())
    await page.waitForTimeout(800)
    pass(await sectors.nth(1).getAttribute('aria-pressed') === 'true', 'fit: a click opens a sector')
    const acts = fit.locator('.afr-ring-card')
    pass((await acts.count()) > 0, 'fit: the sector shows its activities')
    const hrefs = await acts.evaluateAll((els) => els.map((e) => e.getAttribute('href')))
    pass(hrefs.every((h) => h && h.startsWith('/') && !h.includes('/africa')), 'fit: the activity links are global: ' + hrefs.join(' '))
    const fitLead = await fit.locator('.rv-lead:visible').innerText()
    pass(/sector|secteur/i.test(fitLead) && fitLead.length > 40, 'fit: the old Sectors lead sits under the title: ' + fitLead.slice(0, 50))
    // the closing block
    const fin = page.locator('.rv-final')
    pass((await fin.locator('.rv-grey:visible').count()) === 1, 'closing: the grey words')
    pass(await fin.locator('a[href="#demo"]:visible').count() === 1, 'closing: the demo button')
    const lead = await fin.locator('.rv-final-lead').innerText()
    pass(lead.length > 40 && !/operational|opérationnel/i.test(lead), 'closing: the lead has no "operational" ' + lead.slice(0, 40))
    pass(await fin.locator('img').count() === 0, 'closing: type only, no picture')

    // layout
    await page.evaluate(() => window.scrollTo(400, window.scrollY))
    pass(await page.evaluate(() => window.scrollX) === 0, 'the page cannot be scrolled sideways')
    for (const [id, name] of [['#situations', 'problem'], ['.rv-shift', 'shift'], ['#cockpit', 'queue'], ['#methode', 'method'], ['#fit', 'fit'], ['.rv-final', 'final']]) {
      const el = page.locator(id).first()
      await el.scrollIntoViewIfNeeded()
      await page.waitForTimeout(500)
      await el.screenshot({ path: path.join(SHOTS, `revamp-${name}-${lang}-${w}.png`) })
    }
    pass(errs.length === 0, 'no page errors ' + errs.join(' | '))
    await ctx.close()
  }
  await browser.close()
  console.log(results.fails ? `\n${results.fails} FAILED` : '\nALL OK')
  process.exit(results.fails ? 1 : 0)
})()
