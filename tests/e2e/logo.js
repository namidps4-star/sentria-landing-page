// The SentrIA mark in the header, the favicon, the touch icon and the share image.
const { playwright, LAUNCH, APP_URL, pass, results, IGNORED_ERRORS, SHOTS } = require('./env')
const { chromium } = playwright()
const path = require('path')

;(async () => {
  const browser = await chromium.launch(LAUNCH)
  for (const w of [1440, 390]) {
    console.log(`== header mark at ${w}px`)
    const ctx = await browser.newContext({ viewport: { width: w, height: 800 } })
    await ctx.addInitScript(() => sessionStorage.setItem('sentria-opened', '1'))
    const page = await ctx.newPage()
    const errs = []
    page.on('pageerror', (e) => errs.push(e.message))
    page.on('console', (m) => { if (m.type() === 'error' && !IGNORED_ERRORS.test(m.text())) errs.push(m.text().slice(0, 160)) })
    await page.goto(APP_URL, { waitUntil: 'load' })
    await page.waitForTimeout(1500)
    const mark = page.locator('header .logo svg.mark')
    pass((await mark.count()) === 1, 'the header draws the new mark')
    const fills = await mark.evaluate((s) => [...s.querySelectorAll('path, rect')].map((e) => getComputedStyle(e).fill))
    pass(fills.length === 4 && fills[0] === 'rgb(214, 255, 63)' && fills[1] === 'rgb(255, 255, 255)', 'lime dome, white bowl: ' + fills.slice(0, 2).join(' / '))
    const bb = await mark.boundingBox()
    pass(bb && Math.round(bb.width) === 34 && Math.round(bb.height) === 34, 'at 34 px')
    pass((await page.locator('header .logo-word').innerText()).trim() === 'SentrIA', 'the name sits next to it')
    pass((await page.locator('header .beacon').count()) === 0, 'the old beacon is gone')
    await page.locator('header').screenshot({ path: path.join(SHOTS, `logo-header-${w}.png`) })
    pass(errs.length === 0, 'no page errors' + (errs.length ? ': ' + errs[0] : ''))
    if (w === 1440) {
      console.log('== head: icons and share image')
      const head = await page.evaluate(() => ({
        icons: [...document.querySelectorAll('link[rel~="icon"], link[rel="apple-touch-icon"]')].map((l) => l.getAttribute('href')),
        og: document.querySelector('meta[property="og:image"]')?.getAttribute('content'),
        tw: document.querySelector('meta[name="twitter:image"]')?.getAttribute('content'),
      }))
      pass(head.icons.some((h) => /icon\.svg/.test(h)), 'favicon link: ' + head.icons.join(', '))
      pass(head.icons.some((h) => /apple-icon/.test(h)), 'apple touch icon link')
      pass(!!head.og && !!head.tw, 'og:image and twitter:image are set')
      for (const [label, url] of [['icon.svg', head.icons.find((h) => /icon\.svg/.test(h))], ['apple icon', head.icons.find((h) => /apple-icon/.test(h))], ['og image', head.og], ['twitter image', head.tw]]) {
        const u = new URL(url, APP_URL); u.host = new URL(APP_URL).host; u.protocol = new URL(APP_URL).protocol
        const r = await ctx.request.get(u.toString())
        pass(r.status() === 200 && /image\//.test(r.headers()['content-type']), `${label} is served as an image`)
        if (label === 'og image') { const b = await r.body(); pass(b.readUInt32BE(16) === 1200 && b.readUInt32BE(20) === 630, 'the share image is 1200 x 630') }
        if (label === 'icon.svg') pass(/#141414/i.test((await r.body()).toString()) && /#D6FF3F/i.test((await r.body()).toString()), 'the favicon is the new mark on an ink tile')
      }
    }
    await ctx.close()
  }
  await browser.close()
  console.log(results.fails ? `\n${results.fails} FAILED` : '\nall passed')
  process.exit(results.fails ? 1 : 0)
})()
