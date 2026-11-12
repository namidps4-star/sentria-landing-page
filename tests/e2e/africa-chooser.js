// Africa hub activity chooser: the 3D photo carousel (EN /africa, FR /afrique). Real mouse input, not synthetic clicks.
const { chromium } = require('playwright')
const base = process.env.APP_URL || 'http://localhost:3300'
let bad = 0
const ok = (c, m) => { console.log((c ? 'PASS ' : 'FAIL ') + m); if (!c) bad++ }

;(async () => {
  const b = await chromium.launch({ executablePath: process.env.CHROMIUM || '/opt/pw-browsers/chromium', args: ['--no-sandbox'] })
  for (const [name, path, vp, hrefRe] of [
    ['en', '/africa', { width: 1440, height: 900 }, /\/africa\/en\/pharmacie$/],
    ['fr', '/afrique', { width: 1440, height: 900 }, /\/afrique\/fr\/pharmacie$/],
    ['phone', '/africa', { width: 390, height: 844 }, /\/africa\/en\/pharmacie$/],
  ]) {
    const ctx = await b.newContext({ viewport: vp })
    await ctx.addInitScript(() => localStorage.setItem('sentria-skip-intro', '1'))
    const p = await ctx.newPage()
    const errs = []
    p.on('pageerror', (e) => errs.push(e.message))
    p.on('console', (m) => { if (m.type() === 'error') errs.push(m.text()) })
    await p.goto(base + path, { waitUntil: 'networkidle', timeout: 60000 })
    await p.evaluate(() => document.querySelector('.afr-acts').scrollIntoView({ block: 'center' }))
    await p.waitForTimeout(1500)
    const geo = () => p.evaluate(() => [...document.querySelectorAll('.afr-car-card')].map((c) => {
      const r = c.getBoundingClientRect()
      return { d: c.dataset.d, x: Math.round(r.left + r.width / 2), y: Math.round(r.top + r.height / 2), vis: r.right > 0 && r.left < innerWidth && getComputedStyle(c).opacity !== '0', href: c.getAttribute('href') }
    }))
    const count = () => p.evaluate(() => document.querySelector('.afr-car-count').textContent.replace(/\s+/g, ' ').trim())
    const click = async (c) => { await p.mouse.move(c.x, c.y, { steps: 8 }); await p.waitForTimeout(500); await p.mouse.down(); await p.mouse.up(); await p.waitForTimeout(1300) }

    const g = await geo()
    ok(g.filter((c) => c.vis).length >= (vp.width > 500 ? 5 : 3), `${name}: cards on screen (${g.filter((c) => c.vis).length})`)
    ok(await p.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth), `${name}: no horizontal overflow`)
    ok((await count()) === '1 / 6', `${name}: starts at 1 / 6`)
    ok(hrefRe.test(g.find((c) => c.d === '0').href || ''), `${name}: centre card links to its activity page`)
    await click(g.find((c) => c.d === '1'))
    ok((await count()) === '2 / 6', `${name}: real click on the right neighbour centres it`)
    await click((await geo()).find((c) => c.d === '-1'))
    ok((await count()) === '1 / 6', `${name}: real click on the left neighbour centres it`)
    await p.locator('.afr-car-arrow').nth(0).click()
    await p.waitForTimeout(300)
    ok((await count()) === '6 / 6', `${name}: previous wraps from 1 to 6`)
    await p.locator('.afr-car-arrow').nth(1).click()
    await p.waitForTimeout(1300)
    ok(await p.evaluate(() => [...document.querySelectorAll('.afr-car-card')].filter((c) => c.getAttribute('href')).length === 3), `${name}: three real activity links, the rest are coming soon`)
    const c0 = (await geo()).find((c) => c.d === '0')
    await p.mouse.move(c0.x, c0.y, { steps: 8 })
    await p.waitForTimeout(400)
    const nav = p.waitForURL(/pharmacie/, { timeout: 30000 }).then(() => true).catch(() => false)
    await p.mouse.down()
    await p.mouse.up()
    ok(await nav, `${name}: clicking the centre card opens its page`)
    ok(errs.length === 0, `${name}: no console or page errors${errs.length ? ' ' + errs[0] : ''}`)
    await ctx.close()
  }
  await b.close()
  console.log(bad ? `FAILED ${bad}` : 'ALL OK')
  process.exit(bad ? 1 : 0)
})().catch((e) => { console.error(e); process.exit(1) })
