// Africa hub activity chooser: the photo ring (EN /africa, FR /afrique). Real mouse and wheel input, not synthetic events.
const { chromium } = require('playwright')
const base = process.env.APP_URL || 'http://localhost:3300'
let bad = 0
const ok = (c, m) => { console.log((c ? 'PASS ' : 'FAIL ') + m); if (!c) bad++ }

;(async () => {
  const b = await chromium.launch({ executablePath: process.env.CHROMIUM || '/opt/pw-browsers/chromium', args: ['--no-sandbox'] })
  for (const [name, path, vp, hrefRe, reduced] of [
    ['en', '/africa', { width: 1440, height: 900 }, /\/africa\/en\/pharmacie$/, false],
    ['fr', '/afrique', { width: 1440, height: 900 }, /\/afrique\/fr\/pharmacie$/, false],
    ['phone', '/africa', { width: 390, height: 844 }, /\/africa\/en\/pharmacie$/, false],
    ['reduced', '/africa', { width: 1440, height: 900 }, /\/africa\/en\/pharmacie$/, true],
  ]) {
    const ctx = await b.newContext({ viewport: vp, reducedMotion: reduced ? 'reduce' : 'no-preference' })
    await ctx.addInitScript(() => localStorage.setItem('sentria-skip-intro', '1'))
    const p = await ctx.newPage()
    const errs = []
    p.on('pageerror', (e) => errs.push(e.message))
    p.on('console', (m) => { if (m.type() === 'error') errs.push(m.text()) })
    await p.goto(base + path, { waitUntil: 'networkidle', timeout: 60000 })
    await p.evaluate(() => document.querySelector('.afr-ring-stage').scrollIntoView({ block: 'center' }))
    await p.waitForTimeout(3200)
    const geo = () => p.evaluate(() => [...document.querySelectorAll('.afr-ring-card')].map((c) => {
      const r = c.getBoundingClientRect()
      const img = c.querySelector('img')
      return { d: c.dataset.d, x: Math.round((Math.max(r.left, 0) + Math.min(r.right, innerWidth)) / 2), y: Math.round(r.top + r.height / 2), w: Math.round(r.width), vis: r.right > 0 && r.left < innerWidth && +getComputedStyle(c).opacity > 0.05, href: c.getAttribute('href'), filter: img.style.filter, tf: c.style.transform }
    }))
    const count = () => p.evaluate(() => document.querySelector('.afr-ring-count').textContent.replace(/\s+/g, ' ').trim())
    const settle = (ms = 1800) => p.waitForTimeout(ms)
    const click = async (c) => { await p.mouse.move(c.x, c.y, { steps: 8 }); await p.waitForTimeout(500); await p.mouse.down(); await p.mouse.up(); await settle() }

    const g = await geo()
    ok(g.filter((c) => c.vis).length >= (vp.width > 500 ? 5 : 3), `${name}: cards on screen (${g.filter((c) => c.vis).length})`)
    ok(await p.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth), `${name}: no horizontal overflow`)
    ok((await count()) === '01 / 07', `${name}: starts at 01 / 07 (${await count()})`)
    const c0 = g.find((c) => c.d === '0')
    ok(hrefRe.test(c0.href || ''), `${name}: centre card links to its activity page`)
    const side = g.find((c) => c.d === '2')
    ok(c0.w > 0 && side.w > 0 && side.filter.includes('afr-ca') === !reduced, `${name}: outer cards ${reduced ? 'stay sharp (reduced motion)' : 'are blurred with colour fringing'}`)
    ok(!c0.filter || c0.filter === 'none', `${name}: centre card is sharp`)
    const tags = await p.evaluate(() => [...document.querySelectorAll('.afr-ring-card')].map((c) => c.querySelector('.afr-ring-tag')?.textContent.replace(/\s+/g, ' ').trim()))
    ok(tags.length === 7 && tags.every(Boolean), `${name}: every card names itself (${tags.join(' | ')})`)
    ok(/(Health|Santé)\s*(Pharmacy|Pharmacie)/.test(tags[0]) && /(Health|Santé)/.test(tags[1]) && /Agriculture/.test(tags[2]), `${name}: activity cards carry their sector above the name`)
    ok(g.length === 7 && g.every((c) => c.href), `${name}: all seven cards are links`)
    ok(g.every((c) => /\/(activities|fr\/activites|africa\/en|afrique\/fr)\/[a-z-]+$/.test(c.href || '')), `${name}: every card goes to its own page`)
    ok(!(await p.evaluate(() => /coming soon|bientôt/i.test(document.querySelector('.afr-acts').textContent))), `${name}: nothing says coming soon`)
    await click(g.find((c) => c.d === '1'))
    ok((await count()) === '02 / 07', `${name}: real click on the right neighbour centres it (${await count()})`)
    await click((await geo()).find((c) => c.d === '-1'))
    ok((await count()) === '01 / 07', `${name}: real click on the left neighbour centres it (${await count()})`)
    await p.locator('.afr-ring-arrow').nth(0).click()
    await settle()
    ok((await count()) === '07 / 07', `${name}: previous wraps from 01 to 07 (${await count()})`)
    await p.locator('.afr-ring-arrow').nth(1).click()
    await settle()
    ok((await count()) === '01 / 07', `${name}: next returns to 01`)

    const mid = { x: Math.round(vp.width / 2), y: c0.y }
    await p.mouse.move(mid.x, mid.y, { steps: 4 })
    await p.mouse.wheel(500, 0)
    await settle(2400)
    ok((await count()) !== '01 / 07', `${name}: sideways scroll turns the ring (${await count()})`)
    const before = await count()
    await p.mouse.move(mid.x + 150, mid.y, { steps: 3 })
    await p.mouse.down()
    await p.mouse.move(mid.x - 250, mid.y, { steps: 14 })
    await p.mouse.up()
    await settle(2400)
    ok((await count()) !== before, `${name}: dragging turns the ring (${before} -> ${await count()})`)
    const y0 = await p.evaluate(() => scrollY)
    await p.mouse.wheel(0, 300)
    await p.waitForTimeout(600)
    ok((await p.evaluate(() => scrollY)) > y0, `${name}: vertical scroll over the ring still scrolls the page`)
    await p.evaluate(() => document.querySelector('.afr-ring-stage').scrollIntoView({ block: 'center' }))
    await settle(2400)

    if (!reduced) {
      await p.locator('.afr-ring-stage').scrollIntoViewIfNeeded()
      await p.keyboard.press('Tab')
      await settle(2200)
      const target = (await geo()).find((c) => c.d === '0')
      await p.mouse.move(target.x - 40, target.y, { steps: 4 })
      await p.mouse.move(target.x, target.y, { steps: 6 })
      await p.waitForTimeout(900)
      ok(await p.evaluate(() => +getComputedStyle(document.querySelector('.afr-ring-cursor')).opacity > 0.5), `${name}: glass cursor ring shows over a card`)
    }
    const c1 = (await geo()).find((c) => c.d === '0')
    await p.mouse.move(c1.x, c1.y, { steps: 8 })
    await p.waitForTimeout(500)
    if (c1.href) {
      const nav = p.waitForURL(/\/(africa\/en|afrique\/fr|activities|fr\/activites)\//, { timeout: 30000 }).then(() => true).catch(() => false)
      await p.mouse.down()
      await p.mouse.up()
      ok(await nav, `${name}: clicking the centre card opens its page`)
    } else ok(true, `${name}: centre card is a coming-soon card (inert)`)
    ok(errs.length === 0, `${name}: no console or page errors${errs.length ? ' ' + errs[0] : ''}`)
    await ctx.close()
  }
  await b.close()
  console.log(bad ? `FAILED ${bad}` : 'ALL OK')
  process.exit(bad ? 1 : 0)
})().catch((e) => { console.error(e); process.exit(1) })
