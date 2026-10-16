// Content guard: every piece of text on the previous page (legacy/index.html),
// in English and in French, must still be on the new page. Nothing may be dropped.
const { playwright, LAUNCH, APP_URL, LEGACY, pass, results } = require('./env')
const { chromium } = playwright()

// French strings the new page deliberately improves (the old page left them in English).
const IMPROVED_IN_FR = new Set([
  'Bottlenecks', 'Priorities', 'Recommendations', 'LIVE', 'DATA / 01', 'DATA / 02', 'DATA / 03',
  'The next decision may already be', 'in your data.', 'APIs',
])

const norm = (s) => s.replace(/[ \s]+/g, ' ').trim()
const hasWords = (s) => /[A-Za-zÀ-ÿ]{2}/.test(s)

async function legacyTexts(browser) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } })
  const page = await ctx.newPage()
  await page.route('**/*', (r) => (r.request().url().startsWith('file:') ? r.continue() : r.abort()))
  await page.addInitScript(() => localStorage.setItem('sentria-language', 'en'))
  await page.goto('file://' + LEGACY, { waitUntil: 'load' })
  await page.waitForTimeout(600)
  const collect = () =>
    page.evaluate(() => {
      const out = []
      const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
      while (w.nextNode()) {
        const n = w.currentNode
        const tag = n.parentElement && n.parentElement.tagName
        if (['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(tag)) continue
        const t = n.nodeValue.replace(/[ \s]+/g, ' ').trim()
        if (t) out.push(t)
      }
      return out
    })
  const en = await collect()
  await page.evaluate(() => { currentLanguage = 'fr'; translatePage('fr') })
  await page.waitForTimeout(300)
  const fr = await collect()
  await ctx.close()
  return { en, fr }
}

async function newText(browser, lang) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } })
  await ctx.addInitScript((l) => {
    sessionStorage.setItem('sentria-opened', '1')
    localStorage.setItem('sentria-language', l)
  }, lang)
  const page = await ctx.newPage()
  await page.goto(APP_URL, { waitUntil: 'load' })
  await page.waitForTimeout(1200)
  const blob = await page.evaluate(() => {
    const vis = (el) => {
      const cs = getComputedStyle(el)
      if (cs.display === 'none' || cs.visibility === 'hidden') return ''
      let t = ''
      for (const n of el.childNodes) {
        if (n.nodeType === 3) t += n.nodeValue
        else if (n.nodeType === 1) {
          if (['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(n.tagName)) continue
          const d = getComputedStyle(n).display
          const sep = d.startsWith('inline') ? '' : ' '
          t += sep + vis(n) + sep
        }
      }
      return t
    }
    return vis(document.body)
  })
  await ctx.close()
  return norm(blob)
}

;(async () => {
  const browser = await chromium.launch(LAUNCH)
  const legacy = await legacyTexts(browser)
  console.log(`legacy text nodes: ${legacy.en.length} (EN), ${legacy.fr.length} (FR)`)
  pass(legacy.en.length === legacy.fr.length && legacy.en.length > 250, 'the old page was read in both languages with the same number of nodes')

  // 'AI' was the text icon of the Recommendations item; the founder replaced it with the recommendations artwork
  const SKIP = new Set(['SentrIA', 'AI']) // the brand name sits in many places; it is checked separately below
  for (const lang of ['en', 'fr']) {
    console.log(`== ${lang.toUpperCase()}`)
    const blob = await newText(browser, lang)
    const missing = []
    const list = lang === 'en' ? legacy.en : legacy.fr
    list.forEach((t, i) => {
      if (!hasWords(t) || SKIP.has(t)) return
      if (lang === 'fr' && IMPROVED_IN_FR.has(legacy.en[i])) return
      if (!blob.includes(t)) missing.push(t)
    })
    pass(missing.length === 0, `every old text is on the new page (${new Set(list.filter(hasWords)).size} distinct strings)`)
    if (missing.length) missing.slice(0, 30).forEach((m) => console.log('      missing:', JSON.stringify(m.slice(0, 120))))
    pass(blob.includes('SentrIA'), 'the brand name is on the page')
    if (lang === 'en') {
      pass(!/Voir comment ça marche|Réserver une démo/.test(blob), 'no French leaks into the English view')
    } else {
      pass(!/\bSee how it works\b|\bBook a demo →/.test(blob), 'no English leaks into the French view')
    }
  }
  await browser.close()
  console.log(results.fails ? `\n${results.fails} FAILED` : '\nAll passed')
  process.exit(results.fails ? 1 : 0)
})()
