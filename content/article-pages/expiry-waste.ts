import type { ArticlePage } from "../articles"

export const EXPIRY_WASTE_PAGES: ArticlePage[] = [
  {
    slug: "expiry-waste-pharmacy",
    lang: "en",
    pairId: "expiry-waste-pharmacy",
    title: "Expiry waste in a pharmacy: causes and fixes",
    description: "Medicines expire before they sell when stock is over-ordered, poorly rotated or not checked regularly. Here is what causes the loss and how to reduce it.",
    date: "2026-11-25",
    dateLabel: "Nov 25, 2026",
    minutes: 5,
    intro:
      "Every pharmacy loses some stock to expiry. A product that leaves the shelf as waste has already been paid for but generates no revenue. A clinical waste audit of four community pharmacies in Dublin found that expired medicines made up 26.5% of all waste returned to the pharmacy, second only to blister pack changes. The loss is predictable, and most of it is avoidable.",
    sections: [
      {
        heading: "Why stock expires before it sells",
        paragraphs: [
          "Over-ordering is the most common cause. A wholesaler's bulk-discount offer can make a large purchase look like a saving, but the saving disappears when several units expire unsold. The same applies to seasonal products ordered too early or in too large a quantity.",
          "Fear of running out pushes staff to carry more stock than the actual sales rate supports. The NHS Wales care-home medicines toolkit lists excessive ordering quantities and stockpiling as direct causes of waste, alongside poor stock rotation and expiry dates not being checked.",
          "Slow-moving lines are a particular risk. A product that sells three units a month does not need a shelf full of boxes. When ordering habits are set during a busier period and never revised, slow movers accumulate.",
        ],
      },
      {
        heading: "How poor rotation makes it worse",
        paragraphs: [
          "When new deliveries are placed in front of existing stock, the older units move to the back. A product near its expiry date can sit there unnoticed until it has passed. FEFO (first expired, first out) prevents this by ensuring the product closest to its expiry date is always at the front.",
          "Using two rotation methods at the same time creates confusion. The USAID and PEPFAR storage poster for health facilities advises against mixing methods and recommends a single consistent approach.",
          "Receiving stock without checking expiry dates on arrival means a short-dated batch can enter the shelf at the same level as one with a year left. The difference is invisible until the monthly check.",
        ],
      },
      {
        heading: "Set a regular expiry check",
        paragraphs: [
          "A logistics guide from the Logistics Cluster recommends flagging a product when its expiry is three to six months away, and reporting anything with less than three months left so a decision can be made. Without a fixed date in the diary for this check, short-dated products are found too late to act.",
          "Monthly is a reasonable minimum. The check covers every shelf and every storage area. Products within three months of expiry go on a list; the list is reviewed the same day.",
        ],
      },
      {
        heading: "Order against actual usage",
        paragraphs: [
          "A reorder quantity based on last month's sales is more accurate than a fixed minimum set once and never changed. For slow-moving lines, a smaller and more frequent order reduces the risk of holding more than the product will sell before its expiry.",
          "Ordering systems that suggest quantities based on historical data, days of stock on hand and lead times reduce the guesswork. The NHS Wales toolkit lists inefficient re-ordering systems as a direct cause of medicines waste.",
        ],
      },
      {
        heading: "Return short-dated stock before it expires",
        paragraphs: [
          "Many wholesalers accept returns of short-dated stock within a set window, often six months before expiry. Once a product passes that window, the return is refused and the loss falls entirely on the pharmacy.",
          "A monthly expiry check that feeds directly into a return request keeps the window open. The check and the return request become one process, not two separate tasks that happen months apart.",
        ],
      },
      {
        heading: "What the numbers look like",
        paragraphs: [
          "A retrospective analysis of a large public hospital in Malawi found that 9.28% of the pharmaceutical budget was lost to expired medicines in the period studied. For a community pharmacy, the proportion will differ, but the mechanism is the same: stock paid for and not sold.",
          "The Dublin audit estimated an average waste of about €1,512 per pharmacy over four weeks. Applied across a year, that figure reaches roughly €19,662 per pharmacy. These are examples from specific audits; the number at any individual pharmacy will depend on its size, range and ordering habits. The point is that the loss is measurable and recurring.",
        ],
      },
    ],
    faq: [
      {
        q: "How often should I check expiry dates?",
        a: "Monthly is a reasonable minimum. Flag anything expiring within three to six months and report anything with less than three months left so you can act on it, whether that is a return, a promotion or a disposal.",
      },
      {
        q: "Can I return expired stock to the wholesaler?",
        a: "Most wholesalers accept short-dated returns before the product expires, often within a six-month window. Once it has expired, returns are usually refused. Check your wholesaler's terms and add a return step to your monthly expiry check.",
      },
    ],
    closing:
      "Start with a list of your slowest-moving lines this week. Check their expiry dates, adjust the reorder quantity downward, and open a return request with your wholesaler for anything expiring within three months.",
    image: "/articles/expiry-waste-boxes.jpg",
    figures: [
      {
        src: "/articles/expiry-waste-pills.jpg",
        alt: "Packets of pills in different colours laid out on a table",
        caption: "Photo: Roberto Sorin, Unsplash.",
      },
    ],
    sources: [
      {
        label: "Clinical waste audit of community pharmacies, Dublin — reported by the Irish Pharmacy Union (IPU), 2025",
        url: "https://ipu.ie/ipu-review-article/expired-medicines-waste-ireland/",
      },
      {
        label: "Retrospective analysis of financial loss on expired medicines at Kamuzu Central Hospital, Malawi — Springer, 2025",
        url: "https://link.springer.com/article/10.1007/s44250-025-00197-8",
      },
      {
        label: "NHS Wales, Care Home Medicines Optimisation Toolkit: Storage of Medicines",
        url: "https://awttc.nhs.wales/files/care-homes-toolkit/storage-of-medicines/",
      },
      {
        label: "Logistics Cluster (LogCluster), Inventory Management of Medical Items",
        url: "https://log.logcluster.org/sites/default/files/pages/273/en/inventory-management-of-medical-items.pdf",
      },
      {
        label: "USAID and PEPFAR, Effective Management of Health Commodities at Health Facilities",
        url: "https://www.ghsupplychain.org/sites/default/files/2021-05/StoragePractices.pdf",
      },
    ],
  },
  {
    slug: "pertes-peremption-pharmacie",
    lang: "fr",
    pairId: "expiry-waste-pharmacy",
    title: "Les pertes par péremption en pharmacie : causes et solutions",
    description: "Les médicaments périment avant d'être vendus quand le stock est surcommandé, mal tourné ou pas contrôlé régulièrement. Voici ce qui provoque la perte et comment la réduire.",
    date: "2026-11-25",
    dateLabel: "25 nov. 2026",
    minutes: 5,
    intro:
      "Chaque pharmacie perd une partie de son stock à la péremption. Un produit qui quitte le rayon comme déchet a déjà été payé, mais ne génère aucun revenu. Un audit de déchets cliniques réalisé dans quatre pharmacies communautaires de Dublin a révélé que les médicaments périmés représentaient 26,5 % de tous les déchets rapportés à la pharmacie, juste après les changements de plaquette. La perte est prévisible, et la majeure partie est évitable.",
    sections: [
      {
        heading: "Pourquoi le stock périme avant d'être vendu",
        paragraphs: [
          "La surcommande est la cause la plus fréquente. Une offre de remise en gros peut faire paraître un achat important comme une économie, mais l'économie disparaît lorsque plusieurs unités périment sans être vendues. Il en va de même pour les produits saisonniers commandés trop tôt ou en trop grande quantité.",
          "La peur des ruptures de stock pousse le personnel à constituer un stock supérieur à ce que le rythme de vente réel justifie. La boîte à outils NHS Wales sur la gestion des médicaments en maison de retraite cite les quantités commandées excessives et le stockage excessif comme causes directes de déchets, aux côtés d'une mauvaise rotation des stocks et de dates de péremption non vérifiées.",
          "Les références à rotation lente présentent un risque particulier. Un produit qui se vend à trois unités par mois n'a pas besoin d'une étagère pleine de boîtes. Quand les habitudes de commande sont fixées pendant une période plus chargée et ne sont jamais révisées, les références lentes s'accumulent.",
        ],
      },
      {
        heading: "Comment une mauvaise rotation aggrave les choses",
        paragraphs: [
          "Quand les nouvelles livraisons sont placées devant le stock existant, les unités plus anciennes reculent. Un produit proche de sa date de péremption peut y rester inaperçu jusqu'à ce qu'il soit passé. FEFO (premier périmé, premier sorti) évite cela en veillant à ce que le produit le plus proche de sa date de péremption soit toujours devant.",
          "Utiliser deux méthodes de rotation en même temps crée de la confusion. Le poster USAID et PEPFAR pour la gestion des médicaments dans les établissements de santé (en anglais) déconseille de mélanger les méthodes et recommande une approche unique et cohérente.",
          "Réceptionner des stocks sans vérifier les dates de péremption à l'arrivée signifie qu'un lot à date courte peut entrer dans le rayon au même niveau qu'un lot ayant encore un an devant lui. La différence est invisible jusqu'au contrôle mensuel.",
        ],
      },
      {
        heading: "Mettre en place un contrôle régulier des dates",
        paragraphs: [
          "Un guide logistique du Logistics Cluster recommande de signaler un produit lorsque sa péremption approche de trois à six mois, et de remonter tout produit dont il reste moins de trois mois de durée de vie pour qu'une décision soit prise. Sans date fixée dans l'agenda pour ce contrôle, les produits à date courte sont trouvés trop tard pour agir.",
          "Mensuel est un minimum raisonnable. Le contrôle couvre chaque rayon et chaque zone de stockage. Les produits qui expirent dans les trois mois sont mis sur une liste ; la liste est examinée le jour même.",
        ],
      },
      {
        heading: "Commander en fonction de la consommation réelle",
        paragraphs: [
          "Une quantité de réapprovisionnement basée sur les ventes du mois précédent est plus précise qu'un minimum fixe établi une fois pour toutes et jamais modifié. Pour les références à rotation lente, une commande plus petite et plus fréquente réduit le risque de détenir plus que ce que le produit vendra avant sa péremption.",
          "Les systèmes de commande qui suggèrent des quantités en fonction des données historiques, du nombre de jours de stock restants et des délais de livraison réduisent l'approximation. La boîte à outils NHS Wales cite les systèmes de réapprovisionnement inefficaces comme une cause directe de déchets médicamenteux.",
        ],
      },
      {
        heading: "Retourner le stock à date courte avant qu'il ne périme",
        paragraphs: [
          "De nombreux grossistes acceptent les retours de stock à date courte dans une fenêtre définie, souvent six mois avant la péremption. Une fois que le produit a dépassé cette fenêtre, le retour est refusé et la perte incombe entièrement à la pharmacie.",
          "Un contrôle mensuel des dates qui alimente directement une demande de retour maintient la fenêtre ouverte. Le contrôle et la demande de retour deviennent un seul processus, et non deux tâches distinctes qui se produisent à des mois d'intervalle.",
        ],
      },
      {
        heading: "Ce que représentent les chiffres",
        paragraphs: [
          "Une analyse rétrospective d'un grand hôpital public au Malawi (en anglais) a révélé que 9,28 % du budget pharmaceutique était perdu en médicaments périmés sur la période étudiée. Pour une pharmacie communautaire, la proportion sera différente, mais le mécanisme est le même : du stock payé et non vendu.",
          "L'audit de Dublin estimait une perte moyenne d'environ 1 512 € par pharmacie sur quatre semaines. Appliquée sur une année, ce chiffre atteint environ 19 662 € par pharmacie. Ce sont des exemples tirés d'audits spécifiques ; le chiffre dans une pharmacie individuelle dépendra de sa taille, de sa gamme et de ses habitudes de commande. L'essentiel est que la perte est mesurable et récurrente.",
        ],
      },
    ],
    faq: [
      {
        q: "À quelle fréquence dois-je contrôler les dates de péremption ?",
        a: "Mensuel est un minimum raisonnable. Signalez tout ce qui expire dans les trois à six mois et remontez tout ce dont il reste moins de trois mois de durée de vie pour pouvoir agir, que ce soit un retour, une promotion ou une élimination.",
      },
      {
        q: "Puis-je retourner le stock périmé au grossiste ?",
        a: "La plupart des grossistes acceptent les retours à date courte avant la péremption du produit, souvent dans une fenêtre de six mois. Une fois qu'il a périmé, les retours sont généralement refusés. Vérifiez les conditions de votre grossiste et ajoutez une étape de retour à votre contrôle mensuel des dates.",
      },
    ],
    closing:
      "Commencez cette semaine par la liste de vos références à rotation la plus lente. Vérifiez leurs dates de péremption, réduisez la quantité de réapprovisionnement, et ouvrez une demande de retour auprès de votre grossiste pour tout ce qui expire dans les trois mois.",
    image: "/articles/expiry-waste-boxes.jpg",
    figures: [
      {
        src: "/articles/expiry-waste-pills.jpg",
        alt: "Des plaquettes de médicaments de différentes couleurs disposées sur une table",
        caption: "Photo : Roberto Sorin, Unsplash.",
      },
    ],
    sources: [
      {
        label: "Audit de déchets cliniques en pharmacies communautaires, Dublin — rapporté par l'Irish Pharmacy Union (IPU), 2025 (en anglais)",
        url: "https://ipu.ie/ipu-review-article/expired-medicines-waste-ireland/",
      },
      {
        label: "Analyse rétrospective des pertes financières liées aux médicaments périmés à l'hôpital central de Kamuzu, Malawi — Springer, 2025 (en anglais)",
        url: "https://link.springer.com/article/10.1007/s44250-025-00197-8",
      },
      {
        label: "NHS Wales, Care Home Medicines Optimisation Toolkit : stockage des médicaments (en anglais)",
        url: "https://awttc.nhs.wales/files/care-homes-toolkit/storage-of-medicines/",
      },
      {
        label: "Logistics Cluster (LogCluster), Inventory Management of Medical Items (en anglais)",
        url: "https://log.logcluster.org/sites/default/files/pages/273/en/inventory-management-of-medical-items.pdf",
      },
      {
        label: "USAID et PEPFAR, Effective Management of Health Commodities at Health Facilities (en anglais)",
        url: "https://www.ghsupplychain.org/sites/default/files/2021-05/StoragePractices.pdf",
      },
    ],
  },
]
