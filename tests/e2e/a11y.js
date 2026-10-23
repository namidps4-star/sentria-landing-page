// Accessibility basics: reduced motion, keyboard, focus, contrast of the main text pairs.
const { playwright, LAUNCH, APP_URL, pass, results, IGNORED_ERRORS } = require('./env')
const { chromium } = playwright()

const lum = ([r, g, b]) => {
  const f = (v) => {
    v /= 255
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
  }
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b)
}
const ratio = (a, b) => {
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p)
  return (x + 0.05) / (y + 0.05)
}

;(async () => {
  const browser = await chromium.launch(LAUNCH)

  console.log('== reduced motion')
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' })
    const page = await ctx.newPage()
    await page.goto(APP_URL, { waitUntil: 'load' })
    await page.waitForTimeout(800)
    const H = await page.evaluate(() => document.documentElement.scrollHeight)
    for (let y = 0; y < H; y += 800) {
      await page.evaluate((y) => window.scrollTo(0, y), y)
      await page.waitForTimeout(40)
    }
    const hidden = await page.evaluate(() => [...document.querySelectorAll('[data-rv]')].filter((e) => getComputedStyle(e).opacity === '0').length)
    pass(hidden === 0, 'every block is visible without any scrolling effects')
    const running = await page.evaluate(() => document.getAnimations().filter((a) => a.playState === 'running').length)
    pass(running === 0, `no animation is running (${running})`)
    const lens = await page.evaluate(() => document.querySelector('.lens').dataset.on || '')
    pass(lens === '', 'the lens does not run')
    const letterTf = await page.evaluate(() => document.querySelector('.wvl').style.transform)
    pass(letterTf === '', 'the headline does not wave')
    pass((await page.locator('.hero-film[data-still="1"]').count()) === 1, 'the hero film stays still')
    const idx = () => page.evaluate(() => [...document.querySelectorAll('.hf-slide')].findIndex((s) => s.dataset.active === '1'))
    const before = await idx()
    await page.waitForTimeout(6500)
    pass((await idx()) === before, 'the hero film does not advance on its own')
    await ctx.close()
  }

  console.log('== keyboard')
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } })
    await ctx.addInitScript(() => sessionStorage.setItem('sentria-opened', '1'))
    const page = await ctx.newPage()
    await page.goto(APP_URL, { waitUntil: 'load' })
    await page.waitForTimeout(800)
    await page.keyboard.press('Tab')
    const first = await page.evaluate(() => document.activeElement.className + '|' + document.activeElement.textContent.trim().slice(0, 24))
    pass(/skip/.test(first), 'the first Tab stop is the skip link: ' + first)
    const box = await page.evaluate(() => {
      const r = document.activeElement.getBoundingClientRect()
      return { w: r.width, h: r.height, top: r.top }
    })
    pass(box.w > 40 && box.h > 20 && box.top >= 0, 'and it becomes visible when focused')
    await page.keyboard.press('Enter')
    await page.waitForTimeout(600)
    pass(/main/.test(await page.evaluate(() => location.hash)), 'it jumps to the main content')
    let reached = new Set()
    for (let i = 0; i < 60; i++) {
      await page.keyboard.press('Tab')
      const id = await page.evaluate(() => {
        const e = document.activeElement
        return e ? e.tagName + ':' + (e.getAttribute('href') || e.getAttribute('aria-label') || (e.textContent || '').trim().slice(0, 20)) : ''
      })
      reached.add(id)
    }
    pass(reached.size > 30, `Tab reaches ${reached.size} different controls`)
    const outline = await page.evaluate(() => {
      const e = document.activeElement
      const cs = getComputedStyle(e)
      return cs.outlineStyle + ' ' + cs.outlineWidth
    })
    pass(!/none/.test(outline), 'the focused control has a visible outline: ' + outline)
    await ctx.close()
  }

  console.log('== contrast of the main text pairs')
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } })
    await ctx.addInitScript(() => sessionStorage.setItem('sentria-opened', '1'))
    const page = await ctx.newPage()
    await page.goto(APP_URL, { waitUntil: 'load' })
    await page.waitForTimeout(800)
    const sels = ['.hero-lead', '.hero-checks li', '.rv-sec .rv-lead', '.sc-cream .card p', '.sc-dark .lead', '.rv-col-p', '.sc-lime .promise-list li > span', '.sc-deep .flow-step p', '.plan li', '.faq-a p', '.foot li a', '.quickfit-label', '.trow:not(.thead) .c-name']
    // bring each sample into view and let its entrance finish, so a half-faded element is not measured
    for (const s of sels) {
      const el = page.locator(s).filter({ visible: true }).first()
      if (await el.count()) {
        await el.scrollIntoViewIfNeeded()
        await page.waitForTimeout(1500)
      }
    }
    const pairs = await page.evaluate(() => {
      const rgb = (s) => (s.match(/[\d.]+/g) || []).slice(0, 3).map(Number)
      const bgOf = (el) => {
        let e = el
        while (e) {
          const c = getComputedStyle(e).backgroundColor
          const m = c.match(/[\d.]+/g) || []
          if (m.length >= 3 && (m.length < 4 || parseFloat(m[3]) > 0.9)) return rgb(c)
          e = e.parentElement
        }
        return [11, 12, 8]
      }
      const sel = ['.hero-lead', '.hero-checks li', '.rv-sec .rv-lead', '.sc-cream .card p', '.sc-dark .lead', '.rv-col-p', '.sc-lime .promise-list li > span', '.sc-deep .flow-step p', '.plan li', '.faq-a p', '.foot li a', '.quickfit-label', '.trow:not(.thead) .c-name']
      return sel.map((s) => {
        const el = [...document.querySelectorAll(s)].find((e) => e.offsetParent !== null)
        if (!el) return { s, missing: true }
        const cs = getComputedStyle(el)
        const op = parseFloat(cs.opacity)
        return { s, fg: rgb(cs.color), bg: bgOf(el), op }
      })
    })
    for (const p of pairs) {
      if (p.missing) {
        pass(false, `${p.s}: element not found`)
        continue
      }
      // text that is slightly faded (opacity < 1) is mixed with its background before measuring
      const fg = p.fg.map((c, i) => Math.round(c * p.op + p.bg[i] * (1 - p.op)))
      const r = ratio(fg, p.bg)
      pass(r >= 4.5, `${p.s}: contrast ${r.toFixed(1)}:1`)
    }
    await ctx.close()
  }
  await browser.close()
  console.log(results.fails ? `\n${results.fails} FAILED` : '\nAll passed')
  process.exit(results.fails ? 1 : 0)
})()
