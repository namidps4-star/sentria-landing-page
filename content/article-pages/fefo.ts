import type { ArticlePage } from "../articles"

export const FEFO_PAGES: ArticlePage[] = [
  {
    slug: "fefo-first-expired-first-out",
    lang: "en",
    pairId: "fefo-first-expired-first-out",
    title: "FEFO: how a pharmacy sells the stock that expires first",
    description: "FEFO means the product closest to expiry leaves first. Here is how to set it up on the shelf, at the counter and in the stock list.",
    date: "2026-11-18",
    dateLabel: "Nov 18, 2026",
    minutes: 4,
    intro:
      "FEFO stands for first expired, first out. The product with the earliest expiry date is the first to leave, whatever day it arrived. The rule is simple. In a pharmacy with several batches of the same medicine, it is easy to break without noticing.",
    sections: [
      {
        heading: "What FEFO means",
        paragraphs: [
          "Health guidance says FEFO matters because it \"emphasises expiration dates of products, irrespective of when those items may have entered general storage.\" Products leave the shelf based on how close they are to expiry, not on the order they arrived.",
          "The WHO good distribution practices (2010) define FEFO as \"a distribution procedure that ensures that the stock with the earliest expiry date is distributed and/or used before an identical stock item with a later expiry date is distributed and/or used.\"",
          "The aim is to reduce loss. In the words of one logistics guide, FEFO \"helps reduce product loss by ensuring that wherever possible, the shortest shelf-life items are used first.\"",
        ],
      },
      {
        heading: "Set up the shelf",
        paragraphs: [
          "Put the products that expire first in front, or on top of the products that expire later. A USAID and PEPFAR poster for health facilities gives the same rule in one line.",
          "Keep batches of the same medicine apart when their expiry dates differ. The logistics guide asks for the items with the closest expiry dates to go to the front of the racks or shelves.",
        ],
      },
      {
        heading: "Write the dates where you can read them",
        paragraphs: [
          "Enter expiry dates clearly on boxes and stock cards, and make sure they stay visible. If the date cannot be read on the carton, the same guide suggests a sticker or a note on the outside of the box.",
          "A date that is hidden inside a box does not help the person picking the next pack.",
        ],
      },
      {
        heading: "Dispense in the same order",
        paragraphs: [
          "Dispensing has to follow the same rule as shelving. The poster says to always dispatch and dispense following the FEFO system.",
          "The guide also tells staff to issue the short shelf-life items first wherever possible. Put that instruction in the team's routine, so a new member of staff does not have to guess.",
        ],
      },
      {
        heading: "Flag products before they run out of time",
        paragraphs: [
          "One logistics guide suggests flagging a product when its expiry is three to six months away. Anything with less than three months left should be reported at once, so that someone can decide what to do with it.",
          "The threshold is a starting point. A medicine that sells slowly may need a longer warning, and a fast seller may need less.",
        ],
      },
      {
        heading: "Use one method",
        paragraphs: [
          "The poster advises against using two or more stock-rotation methods at the same time, because it causes confusion. Choose FEFO for dated medicines and say so in the shop's procedure.",
        ],
      },
    ],
    faq: [
      {
        q: "Is FEFO the same as FIFO?",
        a: "No. FIFO follows the order in which products arrived. FEFO follows the expiry date, so a pack that arrived last can leave first if it expires first.",
      },
      {
        q: "When should I flag a product?",
        a: "A logistics guide suggests flagging a product three to six months before expiry, and reporting anything with less than three months left so action can be taken.",
      },
    ],
    closing:
      "Start with one shelf this week. Put the nearest expiry at the front, write the dates where you can read them, and check which products have three months or less left.",
    image: "/articles/fefo-pick-medicine.jpg",
    figures: [
      {
        src: "/articles/fefo-shelf-medicine.jpg",
        alt: "A shelf holding many different types of medicine boxes",
        caption: "Photo: David Trinks, Unsplash.",
      },
    ],
    sources: [
      {
        label: "Logistics Cluster (LogCluster), Inventory Management of Medical Items",
        url: "https://log.logcluster.org/sites/default/files/pages/273/en/inventory-management-of-medical-items.pdf",
      },
      {
        label: "USAID and PEPFAR, Effective Management of Health Commodities at Health Facilities",
        url: "https://www.ghsupplychain.org/sites/default/files/2021-05/StoragePractices.pdf",
      },
      {
        label: "World Health Organization, WHO good distribution practices for pharmaceutical products, WHO Technical Report Series No. 957, Annex 5 (2010)",
        url: "https://cdn.who.int/media/docs/default-source/medicines/norms-and-standards/guidelines/distribution/trs957-annex5-who-good-distribution-practices-for-pharmaceutical-products.pdf",
      },
    ],
  },
  {
    slug: "fefo-premier-expire-premier-sorti",
    lang: "fr",
    pairId: "fefo-first-expired-first-out",
    title: "FEFO : la pharmacie vend d'abord le stock qui expire en premier",
    description: "FEFO veut dire que le produit le plus proche de sa date de péremption sort en premier. Voici comment l'organiser en rayon, au comptoir et dans le registre de stock.",
    date: "2026-11-18",
    dateLabel: "18 nov. 2026",
    minutes: 4,
    intro:
      "FEFO signifie « premier périmé, premier sorti ». Le produit dont la date de péremption est la plus proche sort en premier, quel que soit le jour où il est arrivé. La règle est simple. Dans une pharmacie qui a plusieurs lots du même médicament, elle est facile à oublier sans s'en rendre compte.",
    sections: [
      {
        heading: "Ce que signifie FEFO",
        paragraphs: [
          "Selon un guide de logistique sanitaire (en anglais), FEFO « met l'accent sur les dates de péremption des produits, quel que soit le moment où ils sont entrés dans le stock » (traduction).",
          "Les bonnes pratiques de distribution de l'OMS (2010, en anglais) définissent FEFO comme « une procédure de distribution qui garantit que le stock dont la date de péremption est la plus proche est distribué et/ou utilisé avant un article identique dont la date de péremption est plus tardive » (traduction).",
          "L'objectif est de réduire les pertes. Le même guide dit que FEFO « permet de réduire les pertes de produits en veillant, dans la mesure du possible, à ce que les produits à la durée de vie la plus courte soient utilisés en premier » (traduction).",
        ],
      },
      {
        heading: "Organiser le rayon",
        paragraphs: [
          "Placez les produits qui expirent en premier devant, ou au-dessus, des produits qui expirent plus tard. Un poster de l'USAID et du PEPFAR pour les établissements de santé (en anglais) donne la même règle en une ligne.",
          "Séparez les lots du même médicament quand leurs dates de péremption diffèrent. Le guide logistique demande que les produits aux dates les plus proches soient placés à l'avant des rayonnages.",
        ],
      },
      {
        heading: "Écrire les dates là où on peut les lire",
        paragraphs: [
          "Inscrivez clairement les dates de péremption sur les boîtes et sur les fiches de stock, et veillez à ce qu'elles restent visibles. Si la date ne se lit pas sur le carton, le même guide suggère une étiquette ou une note collée à l'extérieur.",
          "Une date cachée à l'intérieur d'une boîte ne sert à personne au moment de prendre le produit suivant.",
        ],
      },
      {
        heading: "Délivrer dans le même ordre",
        paragraphs: [
          "La délivrance doit suivre la même règle que le rangement. Le poster indique de toujours expédier et délivrer selon le système FEFO.",
          "Le guide demande aussi de délivrer en premier les produits à courte durée de vie dès que possible. Intégrez cette consigne dans la routine de l'équipe, pour qu'un nouveau collaborateur n'ait pas à deviner.",
        ],
      },
      {
        heading: "Signaler avant que le temps ne manque",
        paragraphs: [
          "Un guide logistique suggère de signaler un produit lorsque sa péremption approche de trois à six mois. Tout produit dont il reste moins de trois mois de durée de vie doit être signalé immédiatement, pour qu'on décide quoi en faire.",
          "Ce seuil n'est qu'un point de départ. Un médicament qui se vend lentement peut demander un délai d'alerte plus long, un produit qui part vite peut en demander un plus court.",
        ],
      },
      {
        heading: "Utiliser une seule méthode",
        paragraphs: [
          "Le poster déconseille d'utiliser deux méthodes de rotation du stock ou plus en même temps, car cela crée de la confusion. Choisissez FEFO pour les médicaments datés et indiquez-le dans la procédure de la pharmacie.",
        ],
      },
    ],
    faq: [
      {
        q: "FEFO est-il la même chose que FIFO ?",
        a: "Non. FIFO suit l'ordre d'arrivée des produits. FEFO suit la date de péremption : un lot arrivé en dernier peut donc sortir en premier s'il expire avant les autres.",
      },
      {
        q: "Quand faut-il signaler un produit ?",
        a: "Un guide logistique suggère de le signaler trois à six mois avant la péremption, et de remonter tout produit dont il reste moins de trois mois de durée de vie, pour qu'une action soit prise.",
      },
    ],
    closing:
      "Commencez par une étagère cette semaine. Placez la date la plus proche à l'avant, inscrivez les dates là où on peut les lire, et listez les produits qui ont trois mois ou moins devant eux.",
    image: "/articles/fefo-pick-medicine.jpg",
    figures: [
      {
        src: "/articles/fefo-shelf-medicine.jpg",
        alt: "Une étagère garnie de nombreux types de boîtes de médicaments",
        caption: "Photo : David Trinks, Unsplash.",
      },
    ],
    sources: [
      {
        label: "Logistics Cluster (LogCluster), Inventory Management of Medical Items (en anglais)",
        url: "https://log.logcluster.org/sites/default/files/pages/273/en/inventory-management-of-medical-items.pdf",
      },
      {
        label: "USAID et PEPFAR, Effective Management of Health Commodities at Health Facilities (en anglais)",
        url: "https://www.ghsupplychain.org/sites/default/files/2021-05/StoragePractices.pdf",
      },
      {
        label: "Organisation mondiale de la santé, WHO good distribution practices for pharmaceutical products, Série de rapports techniques no 957, annexe 5 (2010, en anglais)",
        url: "https://cdn.who.int/media/docs/default-source/medicines/norms-and-standards/guidelines/distribution/trs957-annex5-who-good-distribution-practices-for-pharmaceutical-products.pdf",
      },
    ],
  },
]
