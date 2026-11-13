// Pricing section: four plans, prices from content/prices.ts, the visitor's country sets the currency,
// both languages, no horizontal overflow on a phone, and the list matches the app's when the app is next to this repo.
const fs = require('fs')
const path = require('path')
const { playwright, LAUNCH, APP_URL, pass, results, IGNORED_ERRORS } = require('./env')

const digits = (t) => Number(String(t).replace(/[^\d]/g, ''))

;(async () => {
  console.log('== price list matches the app')
  const appPlans = path.join(__dirname, '..', '..', '..', 'namidps4-star', 'sentria-frontend', 'lib', 'plans.ts')
  const site = fs.readFileSync(path.join(__dirname, '..', '..', 'content', 'prices.ts'), 'utf8')
  if (fs.existsSync(appPlans)) {
    const app = fs.readFileSync(appPlans, 'utf8')
    const read = (src, cur) => {
      const m = src.match(new RegExp(`${cur}:\\s*\\[\\s*([\\d_]+)\\s*,\\s*([\\d_]+)\\s*\\]`))
      return m && [Number(m[1].replace(/_/g, '')), Number(m[2].replace(/_/g, ''))].join('/')
    }
    for (const cur of ['EUR', 'USD', 'XOF', 'KES', 'NGN', 'GHS']) {
      pass(read(site, cur) === read(app, cur), `${cur}: site ${read(site, cur)} and app ${read(app, cur)}`)
    }
  } else {
    console.log('   (app not found next to this repo: comparison skipped)')
  }

  const b = await playwright().chromium.launch(LAUNCH)
  // [language, path, width, country cookie, [Pro, Business] expected]. No cookie means USD.
  const runs = [
    ['en', '/en', 1440, null, [39, 99]],
    ['fr', '/fr', 1440, 'BJ', [25000, 65000]],
    ['en', '/en', 390, 'KE', [4200, 11000]],
  ]
  for (const [lang, url, width, country, [pro, business]] of runs) {
    console.log(`== ${lang} at ${width}px${country ? `, country ${country}` : ', no country'}`)
    const ctx = await b.newContext({ viewport: { width, height: 900 } })
    if (country) await ctx.addCookies([{ name: 'sentria_country', value: country, url: APP_URL }])
    const p = await ctx.newPage()
    const errs = []
    p.on('pageerror', (e) => errs.push(e.message))
    p.on('console', (m) => { if (m.type() === 'error' && !IGNORED_ERRORS.test(m.text())) errs.push(m.text().slice(0, 160)) })
    await p.goto(`${APP_URL}${url}`, { waitUntil: 'networkidle' })
    await p.locator('#tarifs').scrollIntoViewIfNeeded()
    await p.waitForTimeout(1200)
    pass((await p.locator('#tarifs .plan').count()) === 4, 'four plans')
    const amount = (id) => p.locator(`#tarifs [data-plan="${id}"] .price-amount`).first().innerText()
    pass(digits(await amount('pro')) === pro && digits(await amount('business')) === business, `${country || 'no country'}: ${(await amount('pro')).trim()} / ${(await amount('business')).trim()}`)
    pass((await p.locator('#tarifs .price-cur').count()) === 0, 'no currency picker')
    const text = await p.locator('#tarifs').innerText()
    if (lang === 'fr') {
      pass(/Offres et tarifs/.test(text) && /par mois/.test(text) && /Nous contacter/.test(text) && !/per month|Contact us/.test(text), 'French only')
    } else {
      pass(/Plans and prices/.test(text) && /per month/.test(text) && !/par mois|Nous contacter/.test(text), 'English only')
    }
    pass(!/Most chosen|customers|saved/i.test(text), 'no unproven claim')
    const over = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth)
    pass(over <= 0, `no horizontal overflow (${over})`)
    pass(errs.length === 0, 'no page errors' + (errs.length ? ': ' + errs[0] : ''))
    await ctx.close()
  }
  await b.close()
  console.log(results.fails ? `\n${results.fails} FAILED` : '\nALL PASSED')
  process.exit(results.fails ? 1 : 0)
})().catch((e) => { console.error(e); process.exit(1) })
