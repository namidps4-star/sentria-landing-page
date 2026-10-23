// The product tour: scroll steps, mouse hover, numbered buttons, French, 390 px and reduced motion.
const { playwright, LAUNCH, APP_URL, pass, results, IGNORED_ERRORS, SHOTS } = require('./env')

;(async () => {
  const pw = playwright()
  const b = await pw.chromium.launch(LAUNCH)
  for (const [w, h, tag] of [[1440, 900, 'desktop'], [390, 844, 'phone']]) {
    console.log(`== ${tag}`)
    const ctx = await b.newContext({ viewport: { width: w, height: h }, hasTouch: w < 500 })
    const p = await ctx.newPage()
    const errs = []
    p.on('pageerror', (e) => errs.push(e.message))
    p.on('console', (m) => {
      if (m.type() === 'error' && !IGNORED_ERRORS.test(m.text())) errs.push(m.text().slice(0, 160))
    })
    await p.goto(APP_URL)
    await p.waitForTimeout(9000)
    const top = await p.evaluate(() => document.querySelector('#product').offsetTop)
    const span = await p.evaluate(() => document.querySelector('#product').offsetHeight - innerHeight)
    const at = (f) => p.evaluate(([t, s, f]) => scrollTo(0, t + s * f), [top, span, f])
    const state = () =>
      p.evaluate(() => ({
        spot: !!document.querySelector('.pt-spot'),
        tip: document.querySelector('.pt-tip')?.textContent || '',
        on: [...document.querySelectorAll('.pt-dot')].findIndex((d) => d.getAttribute('aria-pressed') === 'true'),
        tr: document.querySelector('.pt-win').style.transform,
      }))
    await at(0)
    await p.waitForTimeout(600)
    let s = await state()
    pass(!s.spot && s.on === 0, `${tag}: starts on the whole dashboard`)
    pass(/rotateX\(1[0-9]/.test(s.tr), `${tag}: window starts tilted`)
    await at(0.07)
    await p.waitForTimeout(500)
    await p.screenshot({ path: `${SHOTS}/product-${tag}-rise.png` })
    await at(0.2)
    await p.waitForTimeout(900)
    s = await state()
    pass(s.spot && s.on === 1, `${tag}: scroll step 1 lights the banner`)
    await p.screenshot({ path: `${SHOTS}/product-${tag}-step1.png` })
    await at(0.4)
    await p.waitForTimeout(900)
    s = await state()
    pass(s.on === 2, `${tag}: scroll step 2`)
    await at(0.95)
    await p.waitForTimeout(900)
    s = await state()
    pass(s.on === 4 && /risk comes from/i.test(s.tip), `${tag}: scroll step 4 (${s.tip})`)
    await p.screenshot({ path: `${SHOTS}/product-${tag}-step4.png` })
    // numbered buttons (keyboard and touch)
    await p.locator('.pt-dot').nth(3).focus()
    await p.keyboard.press('Enter')
    await p.waitForTimeout(500)
    s = await state()
    pass(s.on === 3, `${tag}: button 3 picks the trend`)
    if (w > 900) {
      // mouse: hover jumps, tilt follows
      await at(0.3)
      await p.waitForTimeout(700)
      const box = await p.locator('.pt-shot').boundingBox()
      await p.mouse.move(box.x + box.width * 0.2, box.y + box.height * 0.5)
      await p.mouse.move(box.x + box.width * 0.33, box.y + box.height * 0.54, { steps: 12 })
      await p.waitForTimeout(700)
      s = await state()
      pass(s.on === 2, `desktop: hovering the stockouts card lights it (${s.tip})`)
      pass(/rotateY\(-?[0-9.]+deg\)/.test(s.tr) && !/rotateY\(0deg\)/.test(s.tr), 'desktop: the window tilts with the mouse')
      await p.screenshot({ path: `${SHOTS}/product-desktop-hover.png` })
      await p.mouse.move(5, 5, { steps: 6 })
      await p.waitForTimeout(500)
      s = await state()
      pass(/rotateY\(0deg\)/.test(s.tr), 'desktop: the tilt resets when the mouse leaves')
    }
    await p.evaluate(() => (document.documentElement.lang = 'fr'))
    await p.waitForTimeout(300)
    const fr = await p.evaluate(() => getComputedStyle(document.querySelector('.pt-h .fr')).display)
    pass(fr !== 'none', `${tag}: French headline shows`)
    pass(await p.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${tag}: no sideways scroll`)
    pass(errs.length === 0, `${tag}: no page errors${errs.length ? ': ' + errs.join(' | ') : ''}`)
    await ctx.close()
  }
  // reduced motion: flat, not pinned
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' })
  const p = await ctx.newPage()
  await p.goto(APP_URL)
  await p.waitForTimeout(1500)
  const r = await p.evaluate(() => ({
    h: document.querySelector('#product').offsetHeight,
    pos: getComputedStyle(document.querySelector('.pt-stage')).position,
    tr: document.querySelector('.pt-win').style.transform,
  }))
  pass(r.pos === 'static' && r.h < 1400, `reduced motion: not pinned (${r.h}px)`)
  pass(/rotateX\(0deg\)/.test(r.tr), 'reduced motion: window flat')
  await p.evaluate(() => document.querySelector('#product').scrollIntoView())
  await p.waitForTimeout(500)
  await p.screenshot({ path: `${SHOTS}/product-reduced.png` })
  await ctx.close()
  await b.close()
  console.log(results.fails ? `\n${results.fails} FAILED` : '\nALL PASSED')
  process.exit(results.fails ? 1 : 0)
})()
