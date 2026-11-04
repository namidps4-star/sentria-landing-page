// Articles page content: the listing (ARTICLES) and the article pages (ARTICLE_PAGES).

export type Bi = { en: string; fr: string }

/** A page or listing card is shown from its publishAt time (UTC). */
export function isLive(item: { publishAt?: string }): boolean {
  return !item.publishAt || Date.now() >= Date.parse(item.publishAt)
}

export type Article = {
  id: string
  publishAt?: string
  sector: "health" | "industry" | "logistics"
  dept: string
  tag: Bi
  title: Bi
  minutes: number
  image: string
}

export const SECTORS: { key: "all" | Article["sector"]; label: Bi }[] = [
  { key: "all", label: { en: "All", fr: "Tous" } },
  { key: "health", label: { en: "Health", fr: "Santé" } },
  { key: "industry", label: { en: "Industry", fr: "Industrie" } },
  { key: "logistics", label: { en: "Logistics", fr: "Logistique" } },
]

export const DEPARTMENTS: Record<Article["sector"], { key: string; label: Bi }[]> = {
  health: [
    { key: "all", label: { en: "All health", fr: "Toute la santé" } },
    { key: "pharmacy", label: { en: "Pharmacy", fr: "Pharmacie" } },
    { key: "cold", label: { en: "Cold chain", fr: "Chaîne du froid" } },
  ],
  industry: [
    { key: "all", label: { en: "All industry", fr: "Toute l'industrie" } },
    { key: "production", label: { en: "Production", fr: "Production" } },
    { key: "warehouse", label: { en: "Warehouse", fr: "Entrepôt" } },
  ],
  logistics: [
    { key: "all", label: { en: "All logistics", fr: "Toute la logistique" } },
    { key: "routing", label: { en: "Routing", fr: "Itinéraires" } },
    { key: "stock", label: { en: "Stock", fr: "Stock" } },
  ],
}

// Listing cards. Each card is one article in both languages; its link goes to the
// English page. Keep ids in step with ARTICLE_PAGES.
export const ARTICLES: Article[] = [
  {
    id: "how-to-count-pharmacy-stock",
    publishAt: "2026-11-04T06:00:00Z",
    sector: "health",
    dept: "pharmacy",
    tag: { en: "Health · Pharmacy", fr: "Santé · Pharmacie" },
    title: {
      en: "How to count pharmacy stock faster, and where RFID fits",
      fr: "Compter le stock d'une pharmacie plus vite, et la place du RFID",
    },
    minutes: 6,
    image: "/articles/rfid-device.jpg",
  },
  {
    id: "pharmacy-stock-outs",
    sector: "health",
    dept: "pharmacy",
    tag: { en: "Health · Pharmacy", fr: "Santé · Pharmacie" },
    title: {
      en: "How to avoid pharmacy stock-outs",
      fr: "Comment éviter les ruptures de stock en pharmacie",
    },
    minutes: 5,
    image: "/articles/pharm.jpg",
  },
]

// The two article pages. One URL per language, each with its own text.
export type ArticlePage = {
  slug: string
  lang: "en" | "fr"
  pairId: string
  title: string
  description: string
  date: string
  dateLabel: string
  minutes: number
  intro: string
  sections: { heading: string; paragraphs: string[]; links?: { intro: string; items: { label: string; url: string }[] } }[]
  faq: { q: string; a: string }[]
  closing: string
  image: string
  /** Show from this time (ISO, UTC). Missing: shown now. */
  publishAt?: string
  sources?: { label: string; url: string }[]
  figures?: { src: string; alt: string; caption: string }[]
}

export const ARTICLE_PAGES: ArticlePage[] = [
  {
    slug: "how-to-count-pharmacy-stock",
    lang: "en",
    pairId: "how-to-count-pharmacy-stock",
    title: "How to count pharmacy stock faster, and where RFID fits",
    description: "How to count pharmacy stock without losing days, a weekly checklist, and what RFID tags can and cannot do for a small pharmacy.",
    date: "2026-11-04",
    dateLabel: "Nov 4, 2026",
    minutes: 6,
    intro: "A stock count tells a pharmacy what it really holds. Done by hand, it takes staff time, and it is easy to put off until the shelves are already wrong. A pharmacy that does not know its stock cannot order at the right moment, and wholesaler deliveries can take one to two weeks. This guide covers how to count faster, what to count first, and where RFID tags fit.",
    publishAt: "2026-11-04T06:00:00Z",
    sections: [
      {
        heading: "Why counts slip",
        paragraphs: [
          "Counting every product takes time that is often needed at the counter. So full counts happen less often than the stock changes. Between counts, a product can run out or reach its expiry date without anyone noticing. The fix is not a bigger count once a year. It is a smaller count more often.",
        ],
      },
      {
        heading: "Full count or cycle count?",
        paragraphs: [
          "A full count checks every product, once or twice a year. It gives a baseline and supports the accounts, but it is slow and disruptive during opening hours.",
          "A cycle count checks a small set of products every week or month, rotated so that every product is counted at least once a year. It is quicker, and it catches errors early. Most small pharmacies can run a cycle count alongside one full count a year.",
        ],
      },
      {
        heading: "How to run a weekly cycle count",
        paragraphs: [
          "1. Pick the list. Products with high value, short expiry, or long delivery times go first. Keep the list to 20 to 50 lines.",
          "2. Count before you order. The count tells you what to reorder. Do not reorder from memory.",
          "3. Count in one place. Count the shelf and the back stock together, so nothing is missed.",
          "4. Record the date. A count without a date tells you nothing later.",
          "5. Compare with the order history. A large gap between the count and what the system expects is a sign of a delivery, a return, or a theft to check.",
          "6. Fix the list. Move fast-moving or quick-expiring products onto it, and remove those that never change.",
        ],
      },
      {
        heading: "Working with your wholesaler",
        paragraphs: [
          "A wholesaler is part of the count, even if the count happens in your shop. Three things decide how much stock you need to hold: the delivery time and the cut-off hour, the delivery days, and whether the product is in stock. Write each one down for every wholesaler.",
          "A wholesaler that delivers three days a week can turn a two-day delivery into a longer wait if you order on the wrong day. A second wholesaler is a backup for key products.",
          "Questions to ask your wholesaler: What is your cut-off time, and on which days do you deliver? Which of my products are often out of stock with you? Can you send a delivery note that shows batch and expiry dates? If packs arrive tagged, who pays for the tags, and who applies them?",
          "If a wholesaler tags packs before delivery, the pharmacy skips the tagging step. That changes the RFID cost question below, so ask every wholesaler whether they plan to do it.",
        ],
      },
      {
        heading: "Where RFID fits",
        paragraphs: [
          "RFID tags let a reader pick up many packs at once, without scanning each one. That could make a count quicker and more frequent. It also has a cost. Each medicine has to be tagged, and that work falls to pharmacy staff. A hospital association describes this labour as a real consideration for adoption, and most time-saving figures published so far come from the vendors themselves.",
          "Questions to ask before you buy RFID: How many packs do I hold, and how long would tagging them take? Who tags new stock as it arrives, and at what time of day? Does the tag work on the packs I stock, since metal and liquids can interfere with some tags? Does my country's labelling rule still need a printed price on the pack? Who keeps the system running when it fails?",
        ],
        links: {
          intro: "What a handheld reader looks like (photos on iStock):",
          items: [
            { label: "a barcode scanner in use", url: "https://www.istockphoto.com/photo/workers-holding-bar-code-scanner-on-blurred-storage-warehouse-computer-work-tools-gm1386613655-444799291" },
            { label: "a 3D image of a handheld UHF RFID reader", url: "https://www.istockphoto.com/photo/3d-handheld-uhf-rfid-scanner-or-rfid-gun-scanner-gm1476513924-505635176" },
          ],
        },
      },
      {
        heading: "How a count feeds SentrIA",
        paragraphs: [
          "Counting stock is only half the job. A count tells you what is on the shelf today, but it does not tell you how long that stock will last or when to reorder. That is where SentrIA fits. Start with the count. Walk the shelves and count each product, using a handheld reader if you have one, or a paper list if you do not. Then write the counted quantity for each product into a simple file and import it into SentrIA. Once the file is in, SentrIA takes the sales of the last 30 days for each product and works out how many days of stock are left. It then compares that number with the real delivery time of each supplier, not the time the supplier promised. If a product would run out before the next delivery arrives, SentrIA warns you, so you have time to order before the shelf is empty. The reader makes the count faster and more regular, but it does not change the arithmetic. SentrIA turns the count into a decision about what to order next. Keep one check in place. When the counted quantity is far below what the system expects, look for the cause before you reorder: a delivery that was not booked, a return, or a loss. Correct the system with the date and the reason, so the next figure is right.",
        ],
      },
      {
        heading: "What we are not claiming yet",
        paragraphs: [
          "We do not know how much time RFID saves in a small pharmacy. We are testing it, and we will publish what we find when the test ends.",
        ],
      },
    ],
    faq: [
      { q: "Do I need RFID to count stock?", a: "No. A cycle count on a paper list works, and it is the first step either way." },
      { q: "How often should a small pharmacy count?", a: "Count the high-risk products every week. Do a full count at least once a year." },
      { q: "Will RFID tags replace price labels?", a: "We do not know yet. Check your country's labelling rules first." },
      { q: "What if the count does not match the system?", a: "Recount the product, check recent deliveries and returns, then correct the system with the date and reason." },
      { q: "Does a cycle count replace the full count?", a: "Not for accounts or audits. It keeps the stock accurate between full counts." },
    ],
    closing: "To see how SentrIA tracks days of stock on your own figures, book a demo.",
    image: "/articles/rfid-device.jpg",
    sources: [
      { label: "American Hospital Association, RFID Solutions Attract Attention for Medication Inventory Management, 25 February 2025", url: "https://www.aha.org/aha-center-health-innovation-market-scan/2025-02-25-rfid-solutions-attract-attention-medication-inventory-management" },
    ],
    figures: [
      { src: "/articles/rfid-pharmacist-aisle.jpg", alt: "A pharmacist in a white coat checks a medicine box in a stockroom aisle", caption: "Illustrative photo. Credit: National Cancer Institute, Unsplash." },
      { src: "/articles/rfid-warehouse.jpg", alt: "A warehouse filled with stacked boxes", caption: "Illustrative photo. Credit: Arum Visuals, Unsplash." },
    ],
  },
  {
    slug: "compter-le-stock-en-pharmacie",
    lang: "fr",
    pairId: "how-to-count-pharmacy-stock",
    title: "Compter le stock d'une pharmacie plus vite, et la place du RFID",
    description: "Comment compter le stock d'une pharmacie sans perdre des jours, une liste de contrôle hebdomadaire, et ce que les étiquettes RFID peuvent et ne peuvent pas faire pour une petite pharmacie.",
    date: "2026-11-04",
    dateLabel: "4 nov. 2026",
    minutes: 6,
    intro: "Un inventaire dit à la pharmacie ce qu'elle a réellement en stock. Fait à la main, il prend du temps au personnel, et il est facile de le repousser jusqu'à ce que les rayons soient déjà faux. Une pharmacie qui ne connaît pas son stock ne peut pas commander au bon moment, et les livraisons des grossistes peuvent prendre une à deux semaines. Ce guide explique comment compter plus vite, par quoi commencer, et où les étiquettes RFID trouvent leur place.",
    publishAt: "2026-11-04T06:00:00Z",
    sections: [
      {
        heading: "Pourquoi les inventaires se relâchent",
        paragraphs: [
          "Compter chaque produit prend du temps, souvent nécessaire au comptoir. Les inventaires complets ont donc lieu moins souvent que le stock ne change. Entre deux comptages, un produit peut tomber en rupture ou atteindre sa date de péremption sans que personne ne le remarque. La solution n'est pas un grand inventaire une fois par an, mais des comptages plus petits et plus fréquents.",
        ],
      },
      {
        heading: "Inventaire complet ou comptage tournant ?",
        paragraphs: [
          "L'inventaire complet vérifie chaque produit, une ou deux fois par an. Il sert de référence et soutient la comptabilité, mais il est long et perturbe l'ouverture de la pharmacie.",
          "Le comptage tournant vérifie un petit groupe de produits chaque semaine ou chaque mois, en rotation pour que chaque produit soit compté au moins une fois par an. Il est plus rapide et repère les erreurs tôt. La plupart des petites pharmacies peuvent faire un comptage tournant en plus d'un inventaire complet par an.",
        ],
      },
      {
        heading: "Comment faire un comptage tournant hebdomadaire",
        paragraphs: [
          "1. Choisissez la liste. Les produits de forte valeur, à péremption courte ou à livraison lente passent en premier. Gardez la liste entre 20 et 50 lignes.",
          "2. Comptez avant de commander. Le comptage indique ce qu'il faut recommander. Ne commandez pas de mémoire.",
          "3. Comptez au même endroit. Comptez le rayon et la réserve ensemble, pour ne rien oublier.",
          "4. Notez la date. Un comptage sans date ne sert à rien plus tard.",
          "5. Comparez avec l'historique des commandes. Un écart important entre le comptage et ce que le système attend doit être vérifié : livraison, retour ou vol.",
          "6. Mettez la liste à jour. Ajoutez les produits qui tournent vite ou qui périment vite, et retirez ceux qui ne bougent jamais.",
        ],
      },
      {
        heading: "Travailler avec votre grossiste",
        paragraphs: [
          "Le grossiste fait partie du comptage, même si le comptage a lieu dans votre pharmacie. Trois éléments déterminent le stock à garder : le délai de livraison et l'heure limite de commande, les jours de livraison, et la disponibilité du produit. Notez-les pour chaque grossiste.",
          "Un grossiste qui livre trois jours par semaine peut transformer une livraison de deux jours en attente plus longue si vous commandez le mauvais jour. Un second grossiste sert de solution de secours pour les produits clés.",
          "Questions à poser à votre grossiste : Quelle est votre heure limite de commande, et quels jours livrez-vous ? Quels produits sont souvent en rupture chez vous ? Pouvez-vous envoyer un bon de livraison avec les lots et les dates de péremption ? Si les boîtes arrivent déjà étiquetées, qui paie les étiquettes et qui les pose ?",
          "Si un grossiste étiquette les boîtes avant la livraison, la pharmacie saute l'étape d'étiquetage. Cela change la question du coût du RFID plus bas, donc demandez à chaque grossiste s'il compte le faire.",
        ],
      },
      {
        heading: "La place du RFID",
        paragraphs: [
          "Les étiquettes RFID permettent à un lecteur de capter plusieurs boîtes à la fois, sans scanner chacune. Cela peut rendre un comptage plus rapide et plus fréquent. Mais cela a un coût : chaque médicament doit être étiqueté, et ce travail revient au personnel de la pharmacie. Une association hospitalière américaine décrit ce travail comme un vrai frein à l'adoption, et la plupart des chiffres de gain de temps publiés viennent des fournisseurs eux-mêmes.",
          "Questions à poser avant d'acheter du RFID : Combien de boîtes ai-je en stock, et combien de temps faudrait-il pour toutes les étiqueter ? Qui étiquette les nouveaux arrivages, et à quel moment de la journée ? L'étiquette fonctionne-t-elle sur les boîtes que je vends, sachant que le métal et les liquides peuvent perturber certaines étiquettes ? La réglementation de mon pays exige-t-elle encore un prix imprimé sur la boîte ? Qui fait fonctionner le système quand il tombe en panne ?",
        ],
        links: {
          intro: "À quoi ressemble un lecteur portable (photos sur iStock) :",
          items: [
            { label: "un lecteur de codes-barres en usage", url: "https://www.istockphoto.com/photo/workers-holding-bar-code-scanner-on-blurred-storage-warehouse-computer-work-tools-gm1386613655-444799291" },
            { label: "une image 3D d'un lecteur RFID UHF portable", url: "https://www.istockphoto.com/photo/3d-handheld-uhf-rfid-scanner-or-rfid-gun-scanner-gm1476513924-505635176" },
          ],
        },
      },
      {
        heading: "Comment un comptage alimente SentrIA",
        paragraphs: [
          "Compter le stock ne suffit pas. Un comptage dit ce qu'il y a sur l'étagère aujourd'hui, mais il ne dit pas combien de temps ce stock va durer, ni quand recommander. C'est là que SentrIA intervient. Commencez par le comptage : parcourez les rayons et comptez chaque produit, avec un lecteur portable si vous en avez un, ou avec une liste papier sinon. Puis notez la quantité comptée pour chaque produit dans un fichier simple, et importez-le dans SentrIA. Une fois le fichier importé, SentrIA prend les ventes des 30 derniers jours pour chaque produit et calcule combien de jours de stock restent. Il compare ensuite ce nombre au délai de livraison réel de chaque fournisseur, et non au délai promis. Si un produit doit s'épuiser avant l'arrivée de la prochaine livraison, SentrIA vous prévient, pour que vous ayez le temps de commander avant que l'étagère soit vide. Le lecteur rend le comptage plus rapide et plus régulier, mais il ne change pas le calcul. SentrIA transforme le comptage en décision sur ce qu'il faut commander. Gardez une vérification en place. Quand la quantité comptée est très inférieure à ce que le système attend, cherchez la cause avant de commander : une livraison non enregistrée, un retour ou une perte. Corrigez ensuite le système avec la date et la raison, pour que le chiffre suivant soit juste.",
        ],
      },
      {
        heading: "Ce que nous ne prétendons pas encore",
        paragraphs: [
          "Nous ne savons pas combien de temps le RFID fait gagner dans une petite pharmacie. Nous le testons, et nous publierons ce que nous trouvons à la fin du test.",
        ],
      },
    ],
    faq: [
      { q: "Faut-il du RFID pour compter le stock ?", a: "Non. Un comptage tournant sur une liste papier fonctionne, et c'est la première étape dans tous les cas." },
      { q: "À quelle fréquence une petite pharmacie doit-elle compter ?", a: "Comptez chaque semaine les produits à risque. Faites un inventaire complet au moins une fois par an." },
      { q: "Les étiquettes RFID remplaceront-elles les étiquettes de prix ?", a: "Nous ne le savons pas encore. Vérifiez d'abord les règles d'étiquetage de votre pays." },
      { q: "Que faire si le comptage ne correspond pas au système ?", a: "Recomptez le produit, vérifiez les livraisons et les retours récents, puis corrigez le système avec la date et la raison." },
      { q: "Un comptage tournant remplace-t-il l'inventaire complet ?", a: "Non, pour la comptabilité ou un audit. Il garde le stock juste entre deux inventaires complets." },
    ],
    closing: "Pour voir comment SentrIA suit les jours de stock sur vos propres chiffres, réservez une démo.",
    image: "/articles/rfid-device.jpg",
    sources: [
      { label: "American Hospital Association, RFID Solutions Attract Attention for Medication Inventory Management, 25 février 2025 (en anglais)", url: "https://www.aha.org/aha-center-health-innovation-market-scan/2025-02-25-rfid-solutions-attract-attention-medication-inventory-management" },
    ],
    figures: [
      { src: "/articles/rfid-pharmacist-aisle.jpg", alt: "Un pharmacien en blouse blanche vérifie une boîte de médicament dans une allée de réserve", caption: "Photo d'illustration. Crédit : National Cancer Institute, Unsplash." },
      { src: "/articles/rfid-warehouse.jpg", alt: "Un entrepôt rempli de cartons empilés", caption: "Photo d'illustration. Crédit : Arum Visuals, Unsplash." },
    ],
  },
  {
    slug: "pharmacy-stock-outs",
    lang: "en",
    pairId: "pharmacy-stock-outs",
    title: "How to avoid pharmacy stock-outs",
    description: "Count the days of stock left for each product, order before the delivery time runs out, and keep a second wholesaler ready.",
    date: "2026-11-01",
    dateLabel: "Nov 1, 2026",
    minutes: 5,
    intro:
      "A stock-out happens when a product no longer covers sales until the next delivery. The customer leaves without the medicine, and the sale is lost. Most stock-outs are not surprises: the stock was falling for days. The hard part is seeing it in time.",
    sections: [
      {
        heading: "The calculation that prevents most stock-outs",
        paragraphs: [
          "For each product, divide the stock on hand by the average number of units sold per day over the last 30 days. The result is the number of days of stock left.",
          "Example, with made-up numbers: a pharmacy has 38 boxes of a product that sells 8 boxes a day. That is 4 days of stock. If the wholesaler delivers in 2 days, the order can wait until tomorrow. If delivery takes 5 days, it is already too late.",
        ],
      },
      {
        heading: "Order before the delivery time runs out",
        paragraphs: [
          "Order when the stock left no longer covers the delivery time plus a margin. Set the margin by how fast the product moves: a fast seller needs a larger margin than a slow one.",
        ],
      },
      {
        heading: "Do not rely on one wholesaler",
        paragraphs: [
          "A wholesaler may not have the product on the day you order. Keep a second wholesaler, note its delivery time and cut-off hour, and check that the details are still right once a month.",
        ],
      },
      {
        heading: "Check every morning",
        paragraphs: [
          "Each morning, look at the products with less than five days of stock. A short list checked every day is more useful than a full count done once a month.",
        ],
      },
      {
        heading: "What SentrIA does today",
        paragraphs: [
          "SentrIA works out the days of stock left from the stock and the last 30 days of sales. SentrIA compares each supplier's promised delivery time with the time it really takes, and warns you when your stock would run out before the delivery arrives.",
          "It does not predict the future, and it does not know what a wholesaler has in stock. It works from the figures you import.",
        ],
      },

      {
        heading: "What to check every week",
        paragraphs: [
          "Once a week, review the products that move most. For each one, check three things: the days of stock left, the delivery time from each wholesaler, and whether the sales average still fits. A product that sold 5 a day in winter may sell 9 a day in the flu season.",
          "Write the list down or keep it in your management software. The tool matters less than the habit: someone looks at the list every week and acts on what it shows.",
        ],
      },
      {
        heading: "Common mistakes",
        paragraphs: [
          "Using an old average. Sales change with the season, with a new prescriber in the area, or when a competitor closes. Recalculate the average at least once a month.",
          "Forgetting the delivery day. A wholesaler that delivers only three days a week can turn a two-day delivery into a four-day wait if you order on the wrong day.",
          "Counting boxes instead of units. Check that the unit you count is the unit you sell, otherwise the calculation is wrong by a factor that is easy to miss.",
        ],
      },
      {
        heading: "Where to start this week",
        paragraphs: [
          "Pick the ten products that sell most, calculate their days of stock, and check the delivery time for each. You will usually find two or three that need action today.",
        ],
      },
    ],
    faq: [
      {
        q: "How many days of stock should I keep?",
        a: "It depends on the delivery time and on how fast the product moves. A few days above the delivery time is a sensible start.",
      },
      {
        q: "Do I need a second wholesaler?",
        a: "For important products, yes. A first wholesaler without the product is common.",
      },
      {
        q: "How do I work out average daily sales?",
        a: "Add up the units sold in the last 30 days and divide by the number of days the pharmacy was open.",
      },
    ],
    closing: "To see the calculation on your own figures, look at our pricing or book a demo.",
    image: "/articles/pharm.jpg",
  },
  {
    slug: "ruptures-de-stock-en-pharmacie",
    lang: "fr",
    pairId: "pharmacy-stock-outs",
    title: "Comment éviter les ruptures de stock en pharmacie",
    description: "Calculez les jours de stock restants pour chaque produit, commandez avant que le délai de livraison ne dépasse le stock, et gardez un second grossiste.",
    date: "2026-11-01",
    dateLabel: "1 nov. 2026",
    minutes: 5,
    intro:
      "Une rupture de stock arrive quand un produit ne couvre plus les ventes jusqu'à la prochaine livraison. Le client repart sans son médicament, et la vente est perdue. La plupart des ruptures ne sont pas des surprises : le stock baissait depuis plusieurs jours. Le plus difficile est de le voir à temps.",
    sections: [
      {
        heading: "Le calcul qui évite la plupart des ruptures",
        paragraphs: [
          "Pour chaque produit, divisez le stock actuel par les ventes moyennes d'un jour, calculées sur les 30 derniers jours. Le résultat est le nombre de jours de stock restants.",
          "Exemple avec des chiffres inventés : une pharmacie a 38 boîtes d'un produit qui se vend 8 boîtes par jour. Il reste 4 jours de stock. Si le grossiste livre en 2 jours, la commande peut attendre demain. Si la livraison prend 5 jours, il est déjà trop tard.",
        ],
      },
      {
        heading: "Commander avant que le délai ne dépasse le stock",
        paragraphs: [
          "Commandez quand le stock restant ne couvre plus le délai de livraison, plus une marge. Réglez la marge selon la rotation : un produit qui part vite demande une marge plus grande qu'un produit qui part lentement.",
        ],
      },
      {
        heading: "Ne pas dépendre d'un seul grossiste",
        paragraphs: [
          "Un grossiste peut ne pas avoir le produit le jour de votre commande. Gardez un deuxième grossiste, notez son délai et son heure limite de commande, et vérifiez ces informations une fois par mois.",
        ],
      },
      {
        heading: "Contrôler chaque matin",
        paragraphs: [
          "Chaque matin, regardez les produits qui ont moins de cinq jours de stock. Une liste courte, vérifiée tous les jours, est plus utile qu'un inventaire complet fait une fois par mois.",
        ],
      },
      {
        heading: "Ce que fait SentrIA aujourd'hui",
        paragraphs: [
          "SentrIA calcule les jours de stock restants à partir du stock et des ventes des 30 derniers jours. SentrIA compare le délai promis par chaque fournisseur au délai qu'il tient vraiment, et vous prévient quand le stock s'épuiserait avant l'arrivée de la livraison.",
          "Il ne prédit pas l'avenir et ne connaît pas le stock des grossistes. Il travaille à partir des chiffres que vous importez.",
        ],
      },
      {
        heading: "Ce qu'il faut vérifier chaque semaine",
        paragraphs: [
          "Une fois par semaine, regardez les produits qui sortent le plus. Pour chacun, vérifiez trois choses : les jours de stock restants, le délai de livraison de chaque grossiste, et si la moyenne des ventes tient toujours. Un produit qui se vendait 5 par jour en hiver peut en vendre 9 pendant une période de grippe.",
          "Notez la liste sur papier ou dans votre logiciel de gestion. L'outil compte moins que l'habitude : quelqu'un regarde la liste chaque semaine et agit sur ce qu'elle montre.",
        ],
      },
      {
        heading: "Les erreurs fréquentes",
        paragraphs: [
          "Utiliser une vieille moyenne. Les ventes changent selon la saison, un nouveau prescripteur dans le quartier, ou la fermeture d'une officine voisine. Recalculez la moyenne au moins une fois par mois.",
          "Oublier le jour de livraison. Un grossiste qui livre seulement trois jours par semaine peut transformer une livraison de deux jours en attente de quatre jours si vous commandez le mauvais jour.",
          "Compter des boîtes au lieu d'unités. Vérifiez que l'unité comptée est celle que vous vendez, sinon le calcul est faux d'un facteur facile à manquer.",
        ],
      },
      {
        heading: "Par où commencer cette semaine",
        paragraphs: [
          "Prenez les dix produits qui se vendent le plus, calculez leurs jours de stock, et vérifiez le délai de livraison de chacun. Vous trouverez généralement deux ou trois produits qui demandent une action aujourd'hui.",
        ],
      },
    ],
    faq: [
      {
        q: "Combien de jours de stock garder ?",
        a: "Cela dépend du délai de livraison et de la rotation du produit. Quelques jours au-dessus du délai de livraison sont un bon point de départ.",
      },
      {
        q: "Faut-il un deuxième grossiste ?",
        a: "Pour les produits importants, oui. Un premier grossiste qui n'a pas le produit est courant.",
      },
      {
        q: "Comment calculer les ventes moyennes ?",
        a: "Additionnez les unités vendues sur les 30 derniers jours, puis divisez par le nombre de jours d'ouverture de la pharmacie.",
      },
    ],
    closing: "Pour voir le calcul sur vos propres chiffres, consultez nos tarifs ou réservez une démo.",
    image: "/articles/pharm.jpg",
  },
]

/* Text changes that go live on a set date, without a new deploy. Until `from`
   (UTC) the page keeps the text above. */
export type ArticleUpdate = {
  slug: string
  from: string
  intro: string
  sources: { label: string; url: string }[]
}

export const ARTICLE_UPDATES: ArticleUpdate[] = [
  {
    slug: "pharmacy-stock-outs",
    from: "2026-11-09T00:00:00Z",
    intro:
      "A stock-out happens when a product no longer covers sales until the next delivery. The customer leaves without the medicine, and the sale is lost. In a study of 145 Zambian clinics, up to 30% ran out of a malaria medicine while the national warehouse still had stock. The ordering rules did not account for delivery delays.",
    sources: [
      { label: "Leung et al., PLOS ONE, 2016: inventory management and stock-outs in Zambian clinics", url: "https://pubmed.ncbi.nlm.nih.gov/27227412/" },
      { label: "Community Pharmacy England, Pressures Survey 2025: medicines supply (England)", url: "https://cpe.org.uk/wp-content/uploads/2025/06/MP-Briefing-2025-Medicines-Supply-Report-Summary.pdf" },
      { label: "Health Action International, SRH commodities in Marsabit County, 2022–2025 (Kenya)", url: "https://haiweb.org/publication/srh-commodities-in-marsabit-county-2022-2025/" },
    ],
  },
  {
    slug: "ruptures-de-stock-en-pharmacie",
    from: "2026-11-09T00:00:00Z",
    intro:
      "Une rupture de stock arrive quand un produit ne couvre plus les ventes jusqu'à la prochaine livraison. Le client repart sans son médicament, et la vente est perdue. Dans une étude de 145 cliniques en Zambie, jusqu'à 30 % ont manqué d'un médicament contre le paludisme alors que l'entrepôt national en avait en stock. Les règles de commande ne tenaient pas compte des retards de livraison.",
    sources: [
      { label: "Leung et al., PLOS ONE, 2016 : gestion des stocks et ruptures dans les cliniques zambiennes (en anglais)", url: "https://pubmed.ncbi.nlm.nih.gov/27227412/" },
      { label: "Community Pharmacy England, Pressures Survey 2025 : approvisionnement en médicaments (Angleterre, en anglais)", url: "https://cpe.org.uk/wp-content/uploads/2025/06/MP-Briefing-2025-Medicines-Supply-Report-Summary.pdf" },
      { label: "Health Action International, SRH commodities in Marsabit County, 2022–2025 (Kenya, en anglais)", url: "https://haiweb.org/publication/srh-commodities-in-marsabit-county-2022-2025/" },
    ],
  },
]

