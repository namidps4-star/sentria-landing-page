// Layout: no sideways scroll at any width, photos never drawn bigger than their own pixels, screenshots.
const { playwright, LAUNCH, APP_URL, pass, results, IGNORED_ERRORS, SHOTS } = require('./env')
const { chromium } = playwright()
const path = require('path')

const WIDTHS = [1920, 1440, 1280, 1024, 768, 480, 375]

;(async () => {
  const browser = await chromium.launch(LAUNCH)
  for (const lang of ['en', 'fr']) {
    console.log(`== ${lang.toUpperCase()}`)
    for (const w of WIDTHS) {
      const ctx = await browser.newContext({ viewport: { width: w, height: w < 600 ? 800 : 900 } })
      await ctx.addInitScript((l) => {
        sessionStorage.setItem('sentria-opened', '1')
        localStorage.setItem('sentria-language', l)
      }, lang)
      const page = await ctx.newPage()
      const errs = []
      page.on('pageerror', (e) => errs.push(e.message))
      page.on('console', (m) => {
        if (m.type() === 'error' && !IGNORED_ERRORS.test(m.text())) errs.push(m.text().slice(0, 160))
      })
      await page.goto(APP_URL, { waitUntil: 'load' })
      await page.waitForTimeout(700)
      const H = await page.evaluate(() => document.documentElement.scrollHeight)
      for (let y = 0; y < H; y += 700) {
        await page.evaluate((y) => window.scrollTo(0, y), y)
        await page.waitForTimeout(60)
      }
      await page.waitForTimeout(500)
      // let every entrance finish, so a block that is still sliding in is not measured
      await page.waitForFunction(() => document.getAnimations().every((a) => a.effect && a.effect.getTiming().iterations === Infinity || a.playState !== 'running'), null, { timeout: 8000 }).catch(() => {})
      await page.waitForTimeout(1500)
      // the page clips sideways overflow (body overflow-x: clip), so the real test is whether it can be scrolled sideways
      const side = await page.evaluate(() => {
        window.scrollTo(400, window.scrollY)
        return window.scrollX
      })
      pass(side === 0, `${w}px: page cannot be scrolled sideways`)
      const bad = await page.evaluate(() => {
        const vw = document.documentElement.clientWidth
        const out = []
        document.querySelectorAll('body *').forEach((e) => {
          const cs = getComputedStyle(e)
          if (cs.display === 'none' || cs.position === 'fixed' || e.closest('.sr-only')) return
          for (let a = e.parentElement; a && a !== document.body; a = a.parentElement) if (getComputedStyle(a).overflowX !== 'visible') return
          const r = e.getBoundingClientRect()
          if (r.width > 0 && r.right > vw + 2) out.push(e.tagName + '.' + (e.className || '') + '<' + e.parentElement.className + '<' + e.parentElement.parentElement.className)
        })
        return [...new Set(out)].slice(0, 6)
      })
      pass(bad.length === 0, `${w}px: nothing visible is cut off by the screen edge${bad.length ? ' ' + bad.join(',') : ''}`)
      pass(errs.length === 0, `${w}px: no page errors${errs.length ? ': ' + errs.join(' | ') : ''}`)
      if (w === 1440 || w === 375) {
        await page.evaluate(() => window.scrollTo(0, 0))
        await page.waitForTimeout(300)
        await page.screenshot({ path: path.join(SHOTS, `layout-${lang}-${w}.png`), fullPage: false })
      }
      await ctx.close()
    }
  }

  console.log('== photos are never drawn bigger than their own pixels')
  {
    const ctx = await browser.newContext({ viewport: { width: 1920, height: 1000 }, deviceScaleFactor: 1 })
    await ctx.addInitScript(() => sessionStorage.setItem('sentria-opened', '1'))
    const page = await ctx.newPage()
    await page.goto(APP_URL, { waitUntil: 'load' })
    await page.locator('.film').scrollIntoViewIfNeeded()
    await page.waitForTimeout(800)
    const n = await page.locator('.ftab').count()
    let worst = 0
    let checked = 0
    for (let i = 0; i < n; i++) {
      await page.locator('.ftab').nth(i).click()
      await page.waitForTimeout(500)
      const r = await page.evaluate(() => {
        const beat = document.querySelector('.beat[data-active="1"]')
        const out = []
        const sources = [beat.querySelector('.fg-box'), ...beat.querySelectorAll('.beat-in')]
        sources.forEach((box) => {
          const img = box.querySelector('img')
          const nw = parseFloat(getComputedStyle(box).getPropertyValue('--nw'))
          const nh = nw * (img.naturalHeight / img.naturalWidth)
          const b = { width: box.offsetWidth, height: box.offsetHeight }
          const fit = box.classList.contains('fg-box') ? Math.min(b.width / nw, b.height / nh) : b.width / nw
          out.push({ scale: fit, nw })
        })
        return out
      })
      r.forEach((x) => {
        checked++
        worst = Math.max(worst, x.scale)
      })
    }
    pass(checked >= 10, `checked ${checked} photos across the seven sectors`)
    pass(worst <= 1.0001, `largest enlargement is x${worst.toFixed(2)} (never above x1.00)`)
    await ctx.close()
  }

  await browser.close()
  console.log(results.fails ? `\n${results.fails} FAILED` : '\nAll passed')
  process.exit(results.fails ? 1 : 0)
})()
