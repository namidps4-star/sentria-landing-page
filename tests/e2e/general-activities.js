// General activity pages (pharmacy, wholesaler, farm) for any country: EN /activities/*, FR /fr/activites/*.
const { chromium } = require('playwright')
const base = process.env.APP_URL || 'http://localhost:3300'
let bad = 0
const ok = (c, m) => { console.log((c ? 'PASS ' : 'FAIL ') + m); if (!c) bad++ }
const PAGES = [
  ['/activities/pharmacy', 'Know your medicines'],
  ['/activities/wholesaler', 'See which pharmacies'],
  ['/activities/farm', 'Keep stored produce'],
  ['/fr/activites/pharmacie', 'Sachez combien de jours'],
  ['/fr/activites/grossiste', 'Voyez quelles pharmacies'],
  ['/fr/activites/exploitation-agricole', 'Gardez les produits stockés'],
]

;(async () => {
  const b = await chromium.launch({ executablePath: process.env.CHROMIUM || '/opt/pw-browsers/chromium', args: ['--no-sandbox'] })
  for (const [path, h1] of PAGES) {
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } })
    await ctx.addInitScript(() => localStorage.setItem('sentria-skip-intro', '1'))
    const p = await ctx.newPage()
    const errs = []
    p.on('pageerror', (e) => errs.push(e.message))
    p.on('console', (m) => { if (m.type() === 'error') errs.push(m.text()) })
    const res = await p.goto(base + path, { waitUntil: 'networkidle', timeout: 90000 })
    ok(res.status() === 200, `${path}: loads (${res.status()})`)
    const info = await p.evaluate(() => ({
      h1: document.querySelector('h1')?.textContent.replace(/\s+/g, '') ?? '',
      heroImg: [...document.images].filter((i) => i.src.includes('/africa/activities/')).every((i) => i.complete && i.naturalWidth > 0),
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      inMain: (document.querySelector('main')?.innerText ?? '').replace(/\s+/g, ' '),
    }))
    ok(info.h1.startsWith(h1.replace(/\s+/g, '')), `${path}: heading is "${h1}…"`)
    ok(info.heroImg, `${path}: photo loads`)
    ok(info.overflow <= 0, `${path}: no horizontal overflow`)
    ok(!/Lagos|Ninthgrid|Nigeria/.test(info.inMain), `${path}: no Africa-specific wording in the page`)
    ok(errs.length === 0, `${path}: no console or page errors${errs.length ? ' ' + errs[0] : ''}`)
    await ctx.close()
  }
  const ctx = await b.newContext()
  const p = await ctx.newPage()
  const r = await p.goto(base + '/activities/does-not-exist', { waitUntil: 'networkidle', timeout: 90000 })
  ok(r.status() === 404, `unknown activity returns 404 (${r.status()})`)
  await b.close()
  console.log(bad ? `FAILED ${bad}` : 'ALL OK')
  process.exit(bad ? 1 : 0)
})().catch((e) => { console.error(e); process.exit(1) })
