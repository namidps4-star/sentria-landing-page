// Behaviour: links, language switch, quick-fit, sector film, FAQ, menu.
const { playwright, LAUNCH, APP_URL, pass, results, IGNORED_ERRORS, SHOTS } = require('./env')
const { chromium } = playwright()

;(async () => {
  const browser = await chromium.launch(LAUNCH)
  const open = async (opts = {}) => {
    const ctx = await browser.newContext({ viewport: { width: opts.w || 1440, height: opts.h || 900 }, ...(opts.ctx || {}) })
    await ctx.addInitScript((l) => {
      sessionStorage.setItem('sentria-opened', '1')
      if (l && !localStorage.getItem('sentria-language')) localStorage.setItem('sentria-language', l)
    }, opts.lang === undefined ? 'en' : opts.lang)
    const page = await ctx.newPage()
    page._errors = []
    page.on('pageerror', (e) => page._errors.push('pageerror: ' + e.message))
    page.on('console', (m) => {
      if (m.type() === 'error' && !IGNORED_ERRORS.test(m.text())) page._errors.push(m.text().slice(0, 200))
    })
    await page.goto(APP_URL, { waitUntil: 'load' })
    await page.waitForTimeout(900)
    return { page, ctx }
  }

  console.log('== structure and links')
  {
    const { page, ctx } = await open()
    pass((await page.locator('h1').count()) === 1, 'one h1')
    pass((await page.locator('html').getAttribute('lang')) === 'en', '<html lang> is en')
    const bad = await page.evaluate(() => [...document.querySelectorAll('a[href^="#"]')].map((a) => a.getAttribute('href')).filter((h) => h.length > 1 && !document.querySelector(h)))
    pass(bad.length === 0, `every in-page link has a target${bad.length ? ' (missing ' + [...new Set(bad)].join(', ') + ')' : ''}`)
    const mails = await page.evaluate(() => [...new Set([...document.querySelectorAll('a[href^="mailto:"]')].map((a) => a.getAttribute('href')))])
    pass(mails.includes('mailto:hello@sentria.dev') && mails.length === 1, 'the only mail link is hello@sentria.dev (Privacy and Terms are pages now)')
    const demoLinks = await page.locator('a[href="#demo"]').count()
    pass(demoLinks >= 8, `the demo links are kept (${demoLinks})`)
    pass((await page.locator('.calendly-inline-widget[data-url="https://calendly.com/hello-sentria/30min"]').count()) === 1, 'the Calendly widget points at the same calendar')
    const noName = await page.evaluate(() => [...document.querySelectorAll('button')].filter((b) => !(b.textContent || '').trim() && !b.getAttribute('aria-label')).length)
    pass(noName === 0, 'every button has a name')
    const noAlt = await page.evaluate(() => [...document.querySelectorAll('img')].filter((i) => !i.hasAttribute('alt')).length)
    pass(noAlt === 0, 'every image has an alt attribute')
    pass(page._errors.length === 0, 'no page errors' + (page._errors.length ? ': ' + page._errors.join(' | ') : ''))
    await ctx.close()
  }

  console.log('== language switch')
  {
    const { page, ctx } = await open()
    const heroEn = await page.locator('#hero-h .sr-only').innerText()
    await page.getByRole('button', { name: 'FR', exact: true }).first().click()
    await page.waitForTimeout(250)
    pass((await page.locator('html').getAttribute('lang')) === 'fr', 'FR sets <html lang="fr">')
    const heroFr = await page.locator('#hero-h .sr-only').innerText()
    pass(/Voyez le risque/.test(heroFr) && heroFr !== heroEn, 'the headline switches to French')
    pass((await page.evaluate(() => localStorage.getItem('sentria-language'))) === 'fr', 'the choice is remembered')
    await page.reload({ waitUntil: 'load' })
    await page.waitForTimeout(500)
    pass((await page.locator('html').getAttribute('lang')) === 'fr', 'French stays after a reload')
    const visibleEn = await page.evaluate(() => [...document.querySelectorAll('.en')].filter((e) => getComputedStyle(e).display !== 'none').length)
    pass(visibleEn === 0, 'no English span is visible in the French view')
    await page.getByRole('button', { name: 'EN', exact: true }).first().click()
    await page.waitForTimeout(250)
    pass((await page.locator('html').getAttribute('lang')) === 'en', 'EN switches back')
    pass(page._errors.length === 0, 'no page errors' + (page._errors.length ? ': ' + page._errors.join(' | ') : ''))
    await ctx.close()
  }
  {
    const { page, ctx } = await open({ lang: '', ctx: { locale: 'fr-FR' } })
    await page.evaluate(() => localStorage.removeItem('sentria-language'))
    await page.reload({ waitUntil: 'load' })
    pass((await page.locator('html').getAttribute('lang')) === 'fr', 'a French browser gets French by default')
    await ctx.close()
  }

  console.log('== quick fit and fit list')
  {
    const { page, ctx } = await open()
    const pills = page.locator('.pill')
    pass((await pills.count()) === 7, 'seven sector pills (Retail included)')
    await pills.nth(6).click()
    await page.waitForTimeout(900)
    pass((await pills.nth(6).getAttribute('aria-pressed')) === 'true', 'pressing Retail marks it')
    pass((await page.locator('.rv-fit-item[data-fit-card="retail"][aria-pressed="true"]').count()) === 1, 'the Retail sector is the chosen one')
    pass((await page.locator('.rv-fit-item[aria-pressed="true"]').count()) === 1, 'exactly one sector is chosen')
    await page.locator('.rv-fit-item').nth(1).click()
    pass((await page.locator('.rv-fit-item[data-fit-card="healthcare"][aria-pressed="true"]').count()) === 1, 'the list switches the sector too')
    pass((await page.locator('.rv-fit-item').count()) === 7, 'all seven sectors stay in the page')
    await ctx.close()
  }

  console.log('== hero film (where SentrIA applies next)')
  {
    const { page, ctx } = await open()
    await page.waitForTimeout(800)
    pass((await page.locator('.hf-slide').count()) === 7 && (await page.locator('.hf-slide[data-active="1"]').count()) === 1, 'seven sectors, one showing')
    pass((await page.locator('.hf-k').count()) === 0, 'the old "Where SentrIA applies next." title is gone from the hero')
    pass(/industry/i.test(await page.locator('.hf-s').innerText()), 'it starts on Industry')
    await page.locator('.hf-dot').nth(4).click()
    await page.waitForTimeout(400)
    pass(/logistics/i.test(await page.locator('.hf-s').innerText()), 'a dot chooses a sector')
    pass(/bottleneck/i.test(await page.locator('.hf-line').innerText()), 'its line is shown: ' + (await page.locator('.hf-line').innerText()))
    // the film moves on by itself after one beat (5.6 s) while the pointer is away from the caption
    await page.mouse.move(900, 500)
    await page.waitForTimeout(6400)
    pass(/energy/i.test(await page.locator('.hf-s').innerText()), 'the film moves on by itself after one beat')
    // pointer on the caption pauses it
    await page.locator('.hf-cap').hover()
    const before = await page.locator('.hf-s').innerText()
    await page.waitForTimeout(6400)
    pass((await page.locator('.hf-s').innerText()) === before, 'the pointer on the caption pauses it')
    pass((await page.locator('.hf-slide[data-active="1"]').count()) === 1, 'one photo is showing at a time')
    pass((await page.locator('#secteurs').count()) === 0, 'the old Sectors block is gone')
    pass(page._errors.length === 0, 'no page errors' + (page._errors.length ? ': ' + page._errors.join(' | ') : ''))
    await ctx.close()
  }

  console.log('== FAQ')
  {
    const { page, ctx } = await open()
    const q = page.locator('.faq-item h3 button')
    pass((await q.count()) === 5, 'five questions')
    pass((await q.first().getAttribute('aria-expanded')) === 'false', 'closed at first')
    await q.nth(0).click()
    await page.waitForTimeout(700)
    pass((await q.nth(0).getAttribute('aria-expanded')) === 'true', 'opens')
    const h = await page.locator('#faq-a-0').evaluate((e) => e.getBoundingClientRect().height)
    pass(h > 40, 'its answer has height when open')
    await q.nth(2).click()
    await page.waitForTimeout(700)
    pass((await q.nth(0).getAttribute('aria-expanded')) === 'false' && (await q.nth(2).getAttribute('aria-expanded')) === 'true', 'opening another closes the first (as before)')
    await q.nth(2).click()
    pass((await q.nth(2).getAttribute('aria-expanded')) === 'false', 'a second click closes it')
    await ctx.close()
  }

  console.log('== mobile menu')
  {
    const { page, ctx } = await open({ w: 390, h: 844 })
    pass(!(await page.locator('.nav-links').isVisible()), 'links are folded away on a phone')
    await page.locator('.burger').click()
    await page.waitForTimeout(500)
    pass(await page.locator('#menu').isVisible(), 'the burger opens the menu')
    pass((await page.locator('#menu a').count()) >= 6, 'the menu has the six links and the demo button')
    await page.keyboard.press('Escape')
    await page.waitForTimeout(300)
    pass(!(await page.locator('#menu').isVisible()), 'Escape closes it')
    await page.locator('.burger').click()
    await page.locator('#menu a').nth(2).click()
    await page.waitForTimeout(900)
    pass(!(await page.locator('#menu').isVisible()), 'choosing a link closes it')
    pass(page._errors.length === 0, 'no page errors' + (page._errors.length ? ': ' + page._errors.join(' | ') : ''))
    await ctx.close()
  }

  await browser.close()
  console.log(results.fails ? `\n${results.fails} FAILED` : '\nAll passed')
  process.exit(results.fails ? 1 : 0)
})()
