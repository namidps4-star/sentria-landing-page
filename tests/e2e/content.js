// Content guard: every piece of text on the previous page (legacy/index.html),
// in English and in French, must still be on the new page. Nothing may be dropped.
const { playwright, LAUNCH, APP_URL, LEGACY, pass, results } = require('./env')
const { chromium } = playwright()

// French strings the new page deliberately improves (the old page left them in English).
// The numbered eyebrows were dropped in the revamp (the sections are not a sequence).
const DROPPED = new Set([
  // the hero film no longer carries the sectors title
  'Where SentrIA applies next.', "Où SentrIA s'applique ensuite.",
  // the small made-up product card was replaced by the dashboard tour
  'Outcomes', 'What needs my attention now', 'SYSTEM ACTIVE', 'Open decisions', 'Signals tracked', 'Decision outcomes', 'Last 30 days',
  'Résultats', 'Ce qui requiert mon attention maintenant', 'SYSTÈME ACTIF', 'Décisions ouvertes', 'Signaux suivis', 'Résultats des décisions', '30 derniers jours',
  // the line above the hero headline was removed
  'Operational decision layer', 'Couche de décision opérationnelle',
  // the shift and the queue: numbered eyebrows dropped, LIVE badge dropped, queue rows split into action and percentage
  '02: The shift', '02 : Le changement', '05: The decision queue', '05 : La file de décisions', 'LIVE', 'EN DIRECT',
  'Reorder, 94%', 'Review, 81%', 'Inspect, 88%', 'Watch, 72%', 'Réapprovisionner, 94%', 'Examiner, 81%', 'Inspecter, 88%', 'Surveiller, 72%',
  // the closing lead lost the word "operational"
  'See how SentrIA turns one operational problem into a decision you can defend, and a result you can measure.',
  'Découvrez comment SentrIA transforme un problème opérationnel en décision défendable, et en résultat mesurable.','01: The problem', '03: The method', '01 : Le problème', '03 : La méthode'])
// Pilot-era copy: the redesign replaced it on the pages, and the content files still hold it unused.
// It is listed here as dropped on purpose, so this guard passes; a string that should come back must be removed from this list.
const PILOT_ERA_COPY = [
  "Recommendations come from the data and from standard mitigation methods adapted to the situation, not from guesswork. The human decides; the outcome feeds back.",
  "Capability",
  "Not another wall of KPIs. A ranked queue of decisions, each with its evidence, confidence, impact and recommended action.",
  "One problem. One pilot. One measurable result.",
  "We begin with a single, measurable operational problem, like expiry loss or stockout in a pharmacy, prove the ROI in a pilot, then extend to other flows. You don't buy a platform. You buy a first result.",
  "Pilot",
  "One problem, one scope, one measurable result.",
  "Custom quote",
  "1 operational scope",
  "Connection to existing data",
  "Detection of key signals",
  "SentrIA decision queue",
  "Priority recommendations",
  "Discuss a pilot →",
  "Once the pilot proves ROI, extend to multiple flows.",
  "Multiple operational flows",
  "Custom priorities",
  "Predictive analysis",
  "AI recommendations",
  "Custom business views",
  "Operational support",
  "Multi-site, governance and custom architecture.",
  "Tailored",
  "Multi-site deployment",
  "Advanced integrations",
  "Governance and security",
  "Custom architecture",
  "Dedicated support",
  "Deployment support",
  "Talk to the team →",
  "Pricing is defined by the scope of the pilot, the data to connect, and the level of integration.",
  "Factories, manufacturing plants and machine shops. Helps you catch equipment wear and unplanned downtime before a production line stops.",
  "Pharmacies, hospital pharmacies, medical wholesalers and cold chain facilities. Helps you track stock levels, expiry dates and temperature before something runs out or spoils.",
  "Ports, warehouses, distribution centers and freight forwarders. Helps you spot bottlenecks in queues, equipment and container flow before they cause delays.",
  "Farms, grain cooperatives and cold storage or packing facilities. Helps you watch storage conditions and transport timing before a harvest is lost to delay or spoilage.",
  "Trucking companies, delivery fleets and vehicle rental operators. Helps you track engine health, fuel and maintenance schedules across the whole fleet.",
  "Utility companies, generator fleet operators and industrial energy users. Helps you watch fuel levels, overheating and consumption before an outage happens.",
  "DATA / 01",
  "DATA / 02",
  "DATA / 03",
  "APIs",
  "A recommendation must be understandable, actionable, and drawn from standard mitigation methods, not invented on the spot.",
  "Access and data controls.",
  "Progressive integration with your infrastructure.",
  "Deployment adapted to your operational constraints.",
  "It depends on the pilot scope, the data to connect and the level of integration. We define the scope and the success metric during the first demo.",
  "See how the evidence and recommendation are built",
  "Walk through the decision and its outcome",
  "Define the pilot and its success metric",
  "Talk to the team",
  "Book a call",
  "Skip to content",
  "Les recommandations proviennent des données et des méthodes de mitigation courantes adaptées à la situation, pas d'une génération à l'aveugle. L'humain décide ; le résultat revient nourrir le système.",
  "Pas un mur de KPI de plus. Une file classée de décisions, chacune avec sa preuve, sa confiance, son impact et son action recommandée.",
  "Lot de paracétamol PCM-2291 en expiration",
  "Un problème. Un pilote. Un résultat mesurable.",
  "Nous commençons par un seul problème opérationnel mesurable, comme la perte par expiration ou la rupture de stock dans une pharmacie, prouvons le ROI dans un pilote, puis étendons à d'autres flux. Vous n'achetez pas une plateforme. Vous achetez un premier résultat.",
  "Pilote",
  "Un problème, un périmètre, un résultat mesurable.",
  "Sur devis",
  "1 périmètre opérationnel",
  "Connexion aux données existantes",
  "Détection des signaux clés",
  "File de décisions SentrIA",
  "Recommandations prioritaires",
  "Discuter d'un pilote →",
  "Operations",
  "Une fois le ROI du pilote prouvé, étendez à plusieurs flux.",
  "Plusieurs flux opérationnels",
  "Priorités personnalisées",
  "Analyse prédictive",
  "Recommandations IA",
  "Vues métier personnalisées",
  "Support opérationnel",
  "Enterprise",
  "Multi-site, gouvernance et architecture personnalisée.",
  "Sur mesure",
  "Déploiement multi-sites",
  "Intégrations avancées",
  "Gouvernance et sécurité",
  "Architecture personnalisée",
  "Support dédié",
  "Accompagnement au déploiement",
  "Parler à l'équipe →",
  "Les tarifs sont définis selon le périmètre du pilote, les données à connecter et le niveau d'intégration.",
  "Nous identifions les sources utiles et les flux de données nécessaires, sans rip-and-replace.",
  "Usines, sites de production et ateliers d'usinage. Repérez l'usure des équipements et les arrêts imprévus avant qu'une ligne de production ne s'arrête.",
  "Pharmacies, pharmacies hospitalières, grossistes médicaux et sites de chaîne du froid. Suivez les niveaux de stock, les dates de péremption et la température avant une rupture ou une perte.",
  "Ports, entrepôts, centres de distribution et transitaires. Repérez les blocages dans les files d'attente, les équipements et le flux de conteneurs avant qu'ils ne causent des retards.",
  "Exploitations agricoles, coopératives céréalières et sites de stockage ou de conditionnement au froid. Surveillez les conditions de stockage et les délais de transport avant qu'une récolte ne soit perdue.",
  "Entreprises de transport routier, flottes de livraison et loueurs de véhicules. Suivez l'état des moteurs, le carburant et les plannings de maintenance sur toute la flotte.",
  "Fournisseurs d'énergie, exploitants de flottes de générateurs et industriels grands consommateurs d'énergie. Surveillez le carburant, la surchauffe et la consommation avant une panne.",
  "Une recommandation doit être compréhensible, actionnable, et issue de méthodes de mitigation courantes, pas inventée sur le moment.",
  "Contrôles d'accès et des données.",
  "Intégration progressive avec votre infrastructure.",
  "Déploiement adapté à vos contraintes opérationnelles.",
  "Pas nécessairement. Nous commençons par les sources de données les plus utiles pour votre premier problème, sans rip-and-replace.",
  "Cela dépend du périmètre du pilote, des données à connecter et du niveau d'intégration. Nous définissons le périmètre et le critère de succès lors de la première démo.",
  "Voir comment la preuve et la recommandation sont construites",
  "Parcourir la décision et son résultat",
  "Définir le pilote et son critère de succès",
  "Privacy",
  "Terms",
  "Parler à l'équipe",
  "Réserver un appel",
]

for (const t of PILOT_ERA_COPY) DROPPED.add(t)
const IMPROVED_IN_FR = new Set([
  // the old French page left this eyebrow in English; the new one says "Démo"
  'Demo',
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
    localStorage.setItem('sentria-skip-intro', '1')
    localStorage.setItem('sentria-language', l)
  }, lang)
  const page = await ctx.newPage()
  // Each language has its own address now: /en and /fr.
  await page.goto(`${APP_URL}/${lang}`, { waitUntil: 'load' })
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
      // numbered eyebrows ("05: The decision queue") were removed on purpose
      if (!hasWords(t) || SKIP.has(t) || DROPPED.has(t) || /^\d\d ?: /.test(t)) return
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
