// Pricing section: four plans, prices from content/prices.ts, the currency chips switch them,
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
  for (const [lang, url, width] of [['en', '/en', 1440], ['fr', '/fr', 1440], ['en', '/en', 390]]) {
    console.log(`== ${lang} at ${width}px`)
    const ctx = await b.newContext({ viewport: { width, height: 900 }, timezoneId: 'Europe/Paris' })
    const p = await ctx.newPage()
    const errs = []
    p.on('pageerror', (e) => errs.push(e.message))
    p.on('console', (m) => { if (m.type() === 'error' && !IGNORED_ERRORS.test(m.text())) errs.push(m.text().slice(0, 160)) })
    await p.goto(`${APP_URL}${url}`, { waitUntil: 'networkidle' })
    await p.locator('#tarifs').scrollIntoViewIfNeeded()
    await p.waitForTimeout(1200)
    pass((await p.locator('#tarifs .plan').count()) === 4, 'four plans')
    const amount = (id) => p.locator(`#tarifs [data-plan="${id}"] .price-amount`).first().innerText()
    pass(digits(await amount('pro')) === 49 && digits(await amount('business')) === 99, `EUR by default: ${(await amount('pro')).trim()} / ${(await amount('business')).trim()}`)
    await p.locator('#tarifs .price-cur button', { hasText: 'FCFA' }).click()
    pass(digits(await amount('pro')) === 32000 && digits(await amount('business')) === 65000, `FCFA: ${(await amount('pro')).trim()} / ${(await amount('business')).trim()}`)
    pass((await p.locator('#tarifs .price-cur button[aria-pressed="true"]').innerText()) === 'FCFA', 'the chip shows the choice')
    const text = await p.locator('#tarifs').innerText()
    if (lang === 'fr') {
      pass(/Offres et tarifs/.test(text) && /par mois/.test(text) && /Nous contacter/.test(text) && !/per month|Contact us/.test(text), 'French only')
    } else {
      pass(/Plans and prices/.test(text) && /per month/.test(text) && !/par mois|Nous contacter/.test(text), 'English only')
    }
    pass(/SentrIA Intelligence/.test(text) && /soon|bientôt/i.test(text), 'the SentrIA Intelligence banner shows, with Soon on what is not built')
    pass(await p.locator('#tarifs .intel').evaluate((e) => getComputedStyle(e).backgroundColor) === 'rgb(15, 46, 31)', 'the banner is the app green')
    pass(/never medical advice|jamais des conseils médicaux/.test(text), 'the stock-advice disclaimer is there')
    pass(!/Most chosen|our customers|trusted by|you save|saved/i.test(text), 'no unproven claim')
    const over = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth)
    pass(over <= 0, `no horizontal overflow (${over})`)
    pass(errs.length === 0, 'no page errors' + (errs.length ? ': ' + errs[0] : ''))
    await ctx.close()
  }
  console.log('== currency from the visitor region')
  for (const [zone, want] of [['Europe/Paris', 49], ['Africa/Dakar', 32000], ['Africa/Abidjan', 32000], ['Africa/Lagos', 42000], ['Africa/Accra', 540], ['Africa/Nairobi', 5400], ['America/New_York', 49]]) {
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, timezoneId: zone })
    const p = await ctx.newPage()
    await p.goto(`${APP_URL}/en`, { waitUntil: 'networkidle' })
    await p.locator('#tarifs').scrollIntoViewIfNeeded()
    await p.waitForTimeout(800)
    const pro = digits(await p.locator('#tarifs [data-plan="pro"] .price-amount').first().innerText())
    const chip = await p.locator('#tarifs .price-cur button[aria-pressed="true"]').innerText()
    pass(pro === want, `${zone}: Pro shows ${pro} (chip ${chip})`)
    await ctx.close()
  }
  console.log('== the Intelligence mark')
  {
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } })
    const p = await ctx.newPage()
    await p.goto(`${APP_URL}/en`, { waitUntil: 'networkidle' })
    pass((await p.locator('#tarifs .intel svg.intel-mark').count()) === 1, 'the banner carries the app mark')
    await ctx.close()
  }
  await b.close()
  console.log(results.fails ? `\n${results.fails} FAILED` : '\nALL PASSED')
  process.exit(results.fails ? 1 : 0)
})().catch((e) => { console.error(e); process.exit(1) })
