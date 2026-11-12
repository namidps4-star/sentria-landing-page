// The opening (about 3.7 s, on every fresh load): the letters of SentrIA flicker through the site's faces while
// lime blocks flash over them, a LOADING counter runs to 100% along the bottom edge, the name settles, the
// tagline steps in, and the black panel dissolves tile by tile. It plays on every fresh load.
const { playwright, LAUNCH, APP_URL, pass, results, SHOTS } = require('./env')
const { chromium } = playwright()
const path = require('path')

;(async () => {
  const browser = await chromium.launch(LAUNCH)
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 860 } })
  const page = await ctx.newPage()
  const errs = []
  page.on('pageerror', (e) => errs.push(e.message))
  const t0 = Date.now()
  await page.goto(APP_URL, { waitUntil: 'commit' })

  console.log('== first visit')
  const seen = { faces: new Set(), counters: [], blocks: 0, locked: null, tag: 0, tiles: 0 }
  for (const ms of [900, 1500, 1900, 2300, 2700, 3100, 3500, 4000]) {
    await page.waitForTimeout(Math.max(0, ms - (Date.now() - t0)))
    const s = await page.evaluate(() => {
      const q = (sel) => document.querySelector(sel)
      return {
        faces: [...document.querySelectorAll('.op .sw-l')].map((e) => [...e.classList].filter((c) => /^op-f/.test(c)).join('') || 'brand'),
        cnt: q('.op-cnt') ? q('.op-cnt').textContent : '',
        blocks: [...document.querySelectorAll('.op-blk')].filter((e) => getComputedStyle(e).display !== 'none').length,
        overflow: document.body ? getComputedStyle(document.body).overflow : '',
        tag: q('.op-tag') ? +getComputedStyle(q('.op-tag')).opacity : 0,
        tiles: [...document.querySelectorAll('.op-tile')].filter((e) => +getComputedStyle(e).opacity < 1).length,
      }
    })
    s.faces.forEach((f) => seen.faces.add(f))
    seen.counters.push(s.cnt)
    seen.blocks = Math.max(seen.blocks, s.blocks)
    seen.tag = Math.max(seen.tag, s.tag)
    seen.tiles = Math.max(seen.tiles, s.tiles)
    if (s.overflow === 'hidden') seen.locked = 'hidden'
    await page.screenshot({ path: path.join(SHOTS, `opening-${ms}.png`) })
  }
  pass(seen.faces.size >= 4, 'the letters flicker through several faces: ' + [...seen.faces].join(', '))
  pass(seen.counters.some((c) => /100%/.test(c)), 'the LOADING counter reaches 100%')
  pass(seen.blocks > 0, 'lime blocks flash over the name')
  pass(seen.locked === 'hidden', 'scrolling is locked while it plays')
  pass(seen.tag > 0.6, 'the tagline steps in')
  pass(seen.tiles > 0, 'the panel dissolves in tiles')
  await page.waitForFunction(() => getComputedStyle(document.querySelector('.op')).visibility === 'hidden', null, { timeout: 6000 }).catch(() => {})
  const took = (Date.now() - t0) / 1000
  pass(took >= 3.2 && took <= 5.5, `it ends between 3.2 and 5.5 s from the request (${took.toFixed(1)} s)`)
  pass((await page.evaluate(() => getComputedStyle(document.body).overflow)) !== 'hidden', 'scrolling is unlocked afterwards')
  pass(await page.evaluate(() => { const el = document.elementFromPoint(720, 500); return !!el && !el.closest('.op') }), 'the page underneath receives clicks')
  const h1 = await page.locator('#hero-h').boundingBox()
  pass(!!h1 && h1.width > 300, 'the headline is on screen')

  console.log('== reload: it plays again')
  await page.reload({ waitUntil: 'commit' })
  await page.waitForTimeout(1500)
  pass(await page.evaluate(() => getComputedStyle(document.querySelector('.op')).visibility === 'visible' && /op-run/.test(document.documentElement.className)), 'a fresh load plays it again')
  await page.waitForFunction(() => getComputedStyle(document.querySelector('.op')).visibility === 'hidden', null, { timeout: 7000 }).catch(() => {})

  console.log('== the off switch (used by the other suites)')
  {
    const c0 = await browser.newContext({ viewport: { width: 1440, height: 860 } })
    await c0.addInitScript(() => localStorage.setItem('sentria-intro-v2', '1'))
    const p0 = await c0.newPage()
    await p0.goto(APP_URL, { waitUntil: 'commit' })
    await p0.waitForTimeout(500)
    pass(!/op-run/.test(await p0.evaluate(() => document.documentElement.className)), 'the switch skips it')
    await c0.close()
  }

  console.log('== French, new visitor')
  {
    const c = await browser.newContext({ viewport: { width: 1440, height: 860 } })
    const p = await c.newPage()
    await p.goto(APP_URL.replace(/\/en\/?$/, '') + '/fr', { waitUntil: 'commit' })
    await p.waitForTimeout(2200)
    pass(/Chargement \d+%/.test(await p.evaluate(() => (document.querySelector('.op-cnt') || {}).textContent || '')), 'the counter reads "Chargement"')
    await c.close()
  }

  console.log('== reduced motion')
  {
    const c2 = await browser.newContext({ viewport: { width: 1440, height: 860 }, reducedMotion: 'reduce' })
    const p2 = await c2.newPage()
    await p2.goto(APP_URL, { waitUntil: 'commit' })
    await p2.waitForTimeout(500)
    pass((await p2.evaluate(() => getComputedStyle(document.querySelector('.op')).visibility)) === 'hidden', 'no opening with reduced motion')
    pass(!/op-run/.test(await p2.evaluate(() => document.documentElement.className)), 'and the page is not marked as running one')
    await c2.close()
  }

  console.log('== no JavaScript')
  {
    const c3 = await browser.newContext({ viewport: { width: 1440, height: 860 }, javaScriptEnabled: false })
    const p3 = await c3.newPage()
    await p3.goto(APP_URL, { waitUntil: 'load' })
    pass((await p3.evaluate(() => getComputedStyle(document.querySelector('.op')).visibility)) === 'hidden', 'without JavaScript there is no opening')
    const hidden = await p3.evaluate(() => [...document.querySelectorAll('[data-rv]')].filter((e) => getComputedStyle(e).opacity === '0').length)
    pass(hidden === 0, 'and nothing is hidden waiting for a script that never runs')
    await c3.close()
  }
  pass(errs.length === 0, 'no page errors' + (errs.length ? ': ' + errs.join(' | ') : ''))
  await browser.close()
  console.log(results.fails ? `\n${results.fails} FAILED` : '\nAll passed')
  process.exit(results.fails ? 1 : 0)
})()
