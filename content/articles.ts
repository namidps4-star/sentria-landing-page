// Articles page content: the listing (ARTICLES) and the article pages (ARTICLE_PAGES).

export type Bi = { en: string; fr: string }

export type Article = {
  id: string
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
    id: "pharmacy-stock-outs",
    sector: "health",
    dept: "pharmacy",
    tag: { en: "Pharmacy", fr: "Pharmacie" },
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
  sections: { heading: string; paragraphs: string[] }[]
  faq: { q: string; a: string }[]
  closing: string
  image: string
}

export const ARTICLE_PAGES: ArticlePage[] = [
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
          "SentrIA works out the days of stock left from the stock and the last 30 days of sales. When a delivery would arrive after the stock runs out, it says so and proposes the next wholesaler, with the gap in days.",
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
          "SentrIA calcule les jours de stock restants à partir du stock et des ventes des 30 derniers jours. Quand une livraison arriverait après la rupture, il le signale et propose le grossiste suivant, avec l'écart en jours.",
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
