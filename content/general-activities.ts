import type { Copy, HeroPhoto } from "@/components/africa-hero"

/* Activity pages for pharmacies, wholesalers and farms in any country. Their copy is written for them,
   not reused from the Africa pages. The key is the activity id in content/africa-activities.ts. */
type General = { key: string; en: string; fr: string; photo: HeroPhoto; copy: { en: Copy; fr: Copy } }

export const GENERAL_ACTIVITIES: General[] = [
  {
    key: "pharmacie",
    en: "pharmacy",
    fr: "pharmacie",
    photo: { src: "/africa/activities/pharmacy.jpg", credit: "Photo: Martina Jorden, Unsplash" },
    copy: {
      en: {
        h1: ["See your stock", "in days, not units", "before anything expires."],
        lead: "Import your stock file. SentrIA shows how many days each product will last at your current sales, which batches reach their expiry date first, and what to reorder today.",
        start: "For independent pharmacies and multi-branch pharmacy groups.",
        cta: "Book a demo →",
        cta2: "Read the FEFO guide",
        cta2Href: "/articles/fefo-first-expired-first-out",
        photoAlt: "Shelves of medicine bottles in a pharmacy",
        stats: [
          ["30d", "Days of stock", "Calculated for each product from the last 30 days of sales."],
          ["FEFO", "Batches that expire first", "Batches closest to their date are flagged so they leave first."],
          ["Today", "What to reorder", "The quantity needed, based on each supplier's actual delivery time."],
        ],
      },
      fr: {
        h1: ["Voyez vos stocks", "en jours, pas en unités", "avant qu'un produit expire."],
        lead: "Importez votre fichier de stock. SentrIA indique combien de jours chaque produit tiendra au rythme actuel des ventes, quels lots arrivent en premier à leur date de péremption, et ce qu'il faut recommander aujourd'hui.",
        start: "Pour les pharmacies indépendantes et les groupes de pharmacies à plusieurs officines.",
        cta: "Demander une démo →",
        cta2: "Lire le guide FEFO",
        cta2Href: "/articles/fefo-premier-expire-premier-sorti",
        photoAlt: "Rayons de flacons de médicaments dans une pharmacie",
        stats: [
          ["30j", "Jours de stock", "Calculés produit par produit, à partir des ventes des 30 derniers jours."],
          ["FEFO", "Lots qui expirent en premier", "Les lots proches de leur date sont signalés pour sortir en premier."],
          ["Aujourd'hui", "Quoi recommander", "La quantité nécessaire, selon le délai de livraison réel de chaque fournisseur."],
        ],
      },
    },
  },
  {
    key: "grossiste-pharma",
    en: "wholesaler",
    fr: "grossiste",
    photo: { src: "/africa/activities/wholesaler.jpg", credit: "Photo: Árpád Czapp, Unsplash" },
    copy: {
      en: {
        h1: ["Find the stock sitting", "unsold at one pharmacy", "that another needs."],
        lead: "SentrIA compares what each pharmacy you supply sold with what it received. When one is reordering a product another is holding unsold, it suggests the transfer and the quantity, largest value first.",
        start: "For wholesalers and distributors who supply a network of pharmacies.",
        cta: "Book a demo →",
        cta2: "Read how to avoid stock-outs",
        cta2Href: "/articles/pharmacy-stock-outs",
        photoAlt: "Boxes stacked high in a warehouse",
        stats: [
          ["Network", "Transfers between pharmacies", "Suggested when one pharmacy holds unsold units that another is reordering."],
          ["Transfers", "Ranked by value", "The largest transfer at stake comes first."],
          ["Decide", "You decide", "Nothing moves or is invoiced without your approval."],
        ],
      },
      fr: {
        h1: ["Trouvez le stock invendu", "d'une pharmacie", "dont une autre a besoin."],
        lead: "SentrIA compare ce que chaque pharmacie cliente a vendu avec ce qu'elle a reçu. Quand une pharmacie recommande un produit qu'une autre garde invendu, il propose le transfert et la quantité, par ordre de valeur.",
        start: "Pour les grossistes en produits pharmaceutiques qui fournissent un réseau de pharmacies.",
        cta: "Demander une démo →",
        cta2: "Lire comment éviter les ruptures",
        cta2Href: "/articles/ruptures-de-stock-en-pharmacie",
        photoAlt: "Cartons empilés dans un entrepôt",
        stats: [
          ["Réseau", "Transferts entre pharmacies", "Proposés quand une pharmacie garde des unités invendues qu'une autre recommande."],
          ["Transferts", "Classés par valeur", "Le transfert le plus important en jeu vient en premier."],
          ["Vous", "Vous décidez", "Rien ne bouge et rien n'est facturé sans votre accord."],
        ],
      },
    },
  },
  {
    key: "exploitation-agricole",
    en: "farm",
    fr: "exploitation-agricole",
    photo: { src: "/africa/activities/farm.jpg", credit: "Photo: proudlyswazi, Unsplash" },
    copy: {
      en: {
        h1: ["Keep stored produce", "in saleable condition", "until you sell it."],
        lead: "Log each lot when it goes into storage. SentrIA tracks days in storage and temperature, estimates the hours left before spoilage, and warns you before a loss happens.",
        start: "For farms, cooperatives and packing sites that store produce or inputs.",
        cta: "Book a demo →",
        cta2: "See the storage features",
        cta2Href: "/en#demo",
        photoAlt: "Two people working in a crop field",
        stats: [
          ["Lots", "Days in storage", "Counted for each lot from the day it went in."],
          ["Storage", "Hours left", "An estimate of the time before spoilage, from the storage temperature."],
          ["Hours", "Warnings in time", "A message when a lot nears its limit, not after it is lost."],
        ],
      },
      fr: {
        h1: ["Gardez vos produits stockés", "en état d'être vendus", "jusqu'à la vente."],
        lead: "Enregistrez chaque lot à son entrée en stockage. SentrIA suit les jours passés en stock et la température, estime les heures restantes avant la détérioration, et vous alerte avant la perte.",
        start: "Pour les exploitations, coopératives et centres de conditionnement qui stockent des produits ou des intrants.",
        cta: "Demander une démo →",
        cta2: "Voir les fonctions de stockage",
        cta2Href: "/fr#demo",
        photoAlt: "Deux personnes travaillent dans un champ",
        stats: [
          ["Lots", "Jours en stockage", "Comptés pour chaque lot à partir de son entrée en stock."],
          ["Stockage", "Heures restantes", "Une estimation du temps avant la détérioration, selon la température de stockage."],
          ["Heures", "Alertes à temps", "Un message quand un lot approche de sa limite, et non après la perte."],
        ],
      },
    },
  },
]

export const generalBySlug = (lang: "en" | "fr", slug: string) => GENERAL_ACTIVITIES.find((a) => a[lang] === slug)
