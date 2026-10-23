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
      sessionStorage.setItem('sentria-opened', '1')
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

    // where do you fit in
    const fit = page.locator('#fit')
    const items = fit.locator('.rv-fit-item')
    pass((await items.count()) === 7, 'fit: seven sectors')
    await items.nth(1).click()
    await page.waitForTimeout(800)
    pass(await items.nth(1).getAttribute('aria-pressed') === 'true', 'fit: a click chooses a sector')
    const onImgs = await fit.locator('.rv-fit-img[data-on="1"]').count()
    pass(onImgs === 1, 'fit: one photo is on')
    const p1 = await fit.locator('.rv-fit-p[data-on="1"]').innerText()
    await items.nth(5).click()
    await page.waitForTimeout(400)
    pass((await fit.locator('.rv-fit-p[data-on="1"]').innerText()) !== p1, 'fit: the text follows the sector')
    pass((await fit.locator('.rv-fit-p').count()) === 7 && (await fit.locator('.rv-fit-p[aria-hidden="true"]').count()) === 6, 'fit: all seven texts stay in the page, six hidden from screen readers')
    pass(await fit.locator('.rv-fit-cta:visible').count() === 1, 'fit: the demo button shows')

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
    for (const [id, name] of [['#situations', 'problem'], ['#methode', 'method'], ['#fit', 'fit'], ['.rv-final', 'final']]) {
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
