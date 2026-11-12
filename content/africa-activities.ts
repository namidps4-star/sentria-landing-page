import type { Copy } from "@/components/africa-hero"

export const AFRICA_ACTIVITIES = ["pharmacie", "grossiste-pharma", "exploitation-agricole"] as const

const PHARMACY_PHOTO_EN = "Two customers reading a medicine box at a pharmacy shelf in Lagos"
const PHARMACY_PHOTO_FR = "Deux clients lisent une boîte de médicament devant un rayon de pharmacie à Lagos"

export const ACTIVITY_COPY: Record<string, Record<"en" | "fr", Copy>> = {
  pharmacie: {
    en: {
      h1: ["Catch the stock-out", "before the patient", "is at the counter."],
      lead: "Upload your stock file. SentrIA tells you which medicines will run out before the next delivery arrives, which batches expire first, and what to order today — based on what your suppliers actually deliver, not what they promise.",
      start: "For independent pharmacies and pharmacy branches.",
      cta: "Book a demo →",
      cta2: "Read the FEFO guide",
      cta2Href: "/articles/fefo-first-expired-first-out",
      photoAlt: PHARMACY_PHOTO_EN,
      stats: [
        ["Amoxicillin 500mg:", "4 days of stock left. Delivery in 7 days. Order today or the shelf goes empty."],
        ["Paracetamol 500mg lot A47:", "Expires in 18 days. 24 boxes at risk. Sell first or return to supplier."],
        ["COPHAC Pharma:", "Promises 5 days. Delivers in 9 on average. Order 4 days earlier than you think."],
      ],
    },
    fr: {
      h1: ["Anticipez la rupture", "avant que le patient", "soit au comptoir."],
      lead: "Importez votre fichier de stock. SentrIA vous dit quels médicaments vont manquer avant la prochaine livraison, quels lots expirent en premier, et quoi commander aujourd'hui — selon ce que vos fournisseurs livrent vraiment, pas ce qu'ils promettent.",
      start: "Pour les pharmacies indépendantes et les officines à plusieurs succursales.",
      cta: "Demander une démo →",
      cta2: "Lire le guide FEFO",
      cta2Href: "/articles/fefo-premier-expire-premier-sorti",
      photoAlt: PHARMACY_PHOTO_FR,
      stats: [
        ["Amoxicilline 500mg :", "4 jours de stock restants. Livraison dans 7 jours. Commandez aujourd'hui ou le rayon sera vide."],
        ["Paracétamol 500mg lot A47 :", "Expire dans 18 jours. 24 boîtes à risque. Écoulez ou retournez au fournisseur."],
        ["COPHAC Pharma :", "Promet 5 jours. Livre en 9 en moyenne. Commandez 4 jours plus tôt que prévu."],
      ],
    },
  },
  "grossiste-pharma": {
    en: {
      h1: ["See which pharmacies", "are short", "while another one holds stock."],
      lead: "SentrIA compares what each pharmacy customer sold with what it received. When one pharmacy is reordering a product that another holds unsold, it proposes the transfer and the quantity, ranked by the value at stake.",
      start: "For pharmaceutical wholesalers who supply a network of pharmacies.",
      cta: "Book a demo →",
      cta2: "Read how to avoid stock-outs",
      cta2Href: "/articles/pharmacy-stock-outs",
      photoAlt: PHARMACY_PHOTO_EN,
      stats: [
        ["Transfers between pharmacies", "Proposed when one pharmacy holds unsold units that another is reordering."],
        ["Ranked by value", "The largest transfer at stake comes first."],
        ["You decide", "Nothing moves or is invoiced without your approval."],
      ],
    },
    fr: {
      h1: ["Voyez quelles pharmacies", "manquent de stock", "pendant qu'une autre en a."],
      lead: "SentrIA compare ce que chaque pharmacie cliente a vendu avec ce qu'elle a reçu. Quand une pharmacie recommande un produit qu'une autre garde invendu, il propose le transfert et la quantité, classés selon la valeur en jeu.",
      start: "Pour les grossistes en produits pharmaceutiques qui fournissent un réseau de pharmacies.",
      cta: "Demander une démo →",
      cta2: "Lire comment éviter les ruptures",
      cta2Href: "/articles/ruptures-de-stock-en-pharmacie",
      photoAlt: PHARMACY_PHOTO_FR,
      stats: [
        ["Transferts entre pharmacies", "Proposés quand une pharmacie garde des unités invendues qu'une autre recommande."],
        ["Classés par valeur", "Le transfert le plus important en jeu vient en premier."],
        ["Vous décidez", "Rien ne bouge et rien n'est facturé sans votre accord."],
      ],
    },
  },
  "exploitation-agricole": {
    en: {
      h1: ["Keep stored produce", "sellable", "for as long as you need."],
      lead: "Record each lot when it goes into storage. SentrIA tracks how many days it has been stored and at what temperature, estimates the hours left before it spoils, and warns you before the loss happens.",
      start: "For farms that store harvests or inputs before they sell or use them.",
      cta: "Book a demo →",
      cta2: "See the storage features",
      cta2Href: "/en#demo",
      photoAlt: PHARMACY_PHOTO_EN,
      stats: [
        ["Days in storage", "Counted for each lot from the day it went in."],
        ["Hours left", "An estimate of the time before the product spoils, from its storage temperature."],
        ["Warnings in time", "A message when a lot nears its limit, not after it is lost."],
      ],
    },
    fr: {
      h1: ["Gardez les produits stockés", "vendables", "le temps qu'il faut."],
      lead: "Enregistrez chaque lot à son entrée en stockage. SentrIA suit le nombre de jours passés en stock et la température, estime les heures qui restent avant la détérioration, et vous prévient avant que la perte ne se produise.",
      start: "Pour les exploitations agricoles qui stockent des récoltes ou des intrants avant de les vendre ou de les utiliser.",
      cta: "Demander une démo →",
      cta2: "Voir les fonctions de stockage",
      cta2Href: "/fr#demo",
      photoAlt: PHARMACY_PHOTO_FR,
      stats: [
        ["Jours en stockage", "Comptés pour chaque lot à partir de son entrée en stock."],
        ["Heures restantes", "Une estimation du temps qui reste avant que le produit ne se détériore, selon sa température."],
        ["Alertes à temps", "Un message quand un lot approche de sa limite, et non après la perte."],
      ],
    },
  },
}

export type Capability = { title: string; does: string; example: string; imports: string }
export type Step = { title: string; text: string }
export type Example = { title: string; lines: string[]; result: string }
export type Faq = { q: string; a: string }
export type Capabilities = {
  heading: string
  items: Capability[]
  notDo: string
  steps?: Step[]
  stepsHeading?: string
  example?: Example
  faq?: Faq[]
  faqHeading?: string
}

// What an expert in each activity gets. Examples are the product's own alert
// wording with sample numbers. "Imports" is the file the product reads.
export const CAPABILITIES: Record<string, Record<"en" | "fr", Capabilities>> = {
  pharmacie: {
    en: {
      heading: "What SentrIA tells you every morning",
      items: [
        {
          title: "Which medicine runs out before the delivery arrives",
          does: "SentrIA divides shelf stock by daily sales. It flags the products that will hit zero before the next order arrives — by name, by days left, so you can order before the patient asks for something you no longer have.",
          example: "Amoxicillin 500mg: 4 days of stock. Delivery in 7 days. Order today.",
          imports: "Medicine name, quantity on hand, minimum stock, daily sales average",
        },
        {
          title: "Which batches expire first — and what that costs you",
          does: "Every batch is checked against its expiry date. SentrIA shows you the ones to sell first, the ones to return, and the value at risk if you do nothing today.",
          example: "Paracetamol 500mg (Lot A47): expires in 18 days — 24 boxes, 96,000 FCFA at risk. Sell first or return.",
          imports: "Expiry date and lot number per product line",
        },
        {
          title: "Expired and undated products caught at reception, not on the shelf",
          does: "Before a box goes on the shelf, SentrIA checks the delivery file for lots already expired or missing a date. You set it aside before it creates a legal problem or a loss.",
          example: "Doxycycline 100mg (Lot B23): received 1 Nov — expired 15 Oct. Do not shelve. Return to supplier.",
          imports: "Delivery file: product name, lot number, expiry date per line",
        },
        {
          title: "What your supplier actually delivers vs. what they promise",
          does: "SentrIA tracks your past orders: order date, promised date, arrival date. It shows which suppliers run late and by how much, so you order earlier instead of running out while you wait.",
          example: "COPHAC Pharma: promises 5 days, delivers in 9 on average (worst: 14 days across 9 orders). Order 4 days earlier.",
          imports: "Per past order: supplier, order date, promised date, arrival date",
        },
      ],
      notDo: "SentrIA does not know your wholesaler's live stock today, and it does not forecast demand beyond your past 30 days of sales. It reads what you give it.",
      stepsHeading: "Start in three steps",
      steps: [
        { title: "Send your stock file", text: "Export from your software or use a spreadsheet. You match the columns once — SentrIA remembers the mapping." },
        { title: "Read your alert list", text: "Each alert names the product, tells you what is wrong, and says what to do. No interpretation needed." },
        { title: "Act the same morning", text: "Order, move or return the flagged products. The next morning, the list is current again." },
      ],
      example: {
        title: "One real morning: one product saves the day",
        lines: [
          "Product: Amoxicillin 500mg",
          "Stock on shelf: 32 boxes",
          "Sales: 8 boxes per day",
          "Next delivery promised: in 7 days",
          "Supplier real average: 11 days",
        ],
        result: "32 boxes last 4 days. The supplier delivers in 11 on average. SentrIA flags it today. You order now. The patient gets their antibiotic. The numbers are an example.",
      },
      faqHeading: "What pharmacists ask before they start",
      faq: [
        { q: "What file do I need?", a: "A stock list: product name, quantity on hand, minimum stock, sales over 30 days, expiry date. Column names can differ from ours — you map them once." },
        { q: "Does it connect to my software?", a: "Not today. You export a spreadsheet and upload it. If your software can export, it works." },
        { q: "Who sees my figures?", a: "Only your pharmacy. Each account's data is kept completely separate." },
        { q: "Do I have to change how I work?", a: "No. Keep your current routine. Check the alert list each morning before the first patient walks in." },
      ],
    },
    fr: {
      heading: "Ce que SentrIA vous dit chaque matin",
      items: [
        {
          title: "Quel médicament manquera avant la prochaine livraison",
          does: "SentrIA divise le stock en rayon par les ventes quotidiennes. Il signale les produits qui atteindront zéro avant l'arrivée de la prochaine commande — par nom, par jours restants, pour commander avant que le patient demande quelque chose que vous n'avez plus.",
          example: "Amoxicilline 500mg : 4 jours de stock. Livraison dans 7 jours. Commandez aujourd'hui.",
          imports: "Nom du médicament, quantité en stock, stock minimum, moyenne des ventes journalières",
        },
        {
          title: "Quels lots expirent en premier — et ce que ça vous coûte",
          does: "Chaque lot est comparé à sa date de péremption. SentrIA vous montre ceux à écouler en premier, ceux à retourner, et la valeur à risque si vous ne faites rien aujourd'hui.",
          example: "Paracétamol 500mg (Lot A47) : expire dans 18 jours — 24 boîtes, 96 000 FCFA à risque. Écoulez ou retournez.",
          imports: "Date de péremption et numéro de lot par ligne produit",
        },
        {
          title: "Produits périmés ou sans date, détectés à la réception — pas sur le rayon",
          does: "Avant qu'une boîte soit rangée, SentrIA contrôle le fichier de livraison : lot déjà périmé ou date manquante. Vous le mettez de côté avant qu'il ne crée un problème légal ou une perte.",
          example: "Doxycycline 100mg (Lot B23) : reçue le 1er nov — périmée le 15 oct. Ne pas ranger. Retourner au fournisseur.",
          imports: "Fichier de livraison : nom du produit, numéro de lot, date de péremption par ligne",
        },
        {
          title: "Ce que votre fournisseur livre vraiment — pas ce qu'il promet",
          does: "SentrIA suit vos commandes passées : date de commande, date promise, date réelle. Il montre quels fournisseurs livrent en retard et de combien, pour que vous commandiez plus tôt au lieu de manquer de stock en attendant.",
          example: "COPHAC Pharma : promet 5 jours, livre en 9 en moyenne (pire cas : 14 jours sur 9 commandes). Commandez 4 jours plus tôt.",
          imports: "Par commande passée : fournisseur, date de commande, date promise, date d'arrivée",
        },
      ],
      notDo: "SentrIA ne connaît pas le stock de votre grossiste aujourd'hui, et ne prévoit pas la demande au-delà de vos 30 derniers jours de ventes. Il lit ce que vous lui donnez.",
      stepsHeading: "Démarrer en trois étapes",
      steps: [
        { title: "Envoyez votre fichier de stock", text: "Exportez depuis votre logiciel ou utilisez un tableur. Vous associez les colonnes une seule fois — SentrIA mémorise la correspondance." },
        { title: "Lisez votre liste d'alertes", text: "Chaque alerte nomme le produit, dit ce qui ne va pas et indique quoi faire. Pas besoin d'interpréter." },
        { title: "Agissez le matin même", text: "Commandez, déplacez ou retournez les produits signalés. Le lendemain, la liste est à jour." },
      ],
      example: {
        title: "Un vrai matin : un produit sauve la situation",
        lines: [
          "Produit : Amoxicilline 500mg",
          "Stock en rayon : 32 boîtes",
          "Ventes : 8 boîtes par jour",
          "Prochaine livraison promise : dans 7 jours",
          "Délai réel moyen du fournisseur : 11 jours",
        ],
        result: "32 boîtes tiennent 4 jours. Le fournisseur livre en 11 jours en moyenne. SentrIA le signale aujourd'hui. Vous commandez maintenant. Le patient obtient son antibiotique. Les chiffres sont un exemple.",
      },
      faqHeading: "Ce que les pharmaciens demandent avant de commencer",
      faq: [
        { q: "Quel fichier faut-il ?", a: "Une liste de stock : nom du produit, quantité en stock, stock minimum, ventes sur 30 jours, date de péremption. Les noms de colonnes peuvent différer — vous les associez une seule fois." },
        { q: "Est-ce relié à mon logiciel ?", a: "Pas encore. Vous exportez un tableur et l'importez. Si votre logiciel peut exporter, ça fonctionne." },
        { q: "Qui voit mes chiffres ?", a: "Uniquement votre pharmacie. Les données de chaque compte sont strictement séparées." },
        { q: "Dois-je changer ma façon de travailler ?", a: "Non. Gardez votre routine habituelle. Consultez la liste d'alertes chaque matin avant le premier patient." },
      ],
    },
  },
  "grossiste-pharma": {
    en: {
      heading: "What SentrIA does across your pharmacy network",
      items: [
        {
          title: "Transfers between your pharmacies",
          does: "SentrIA compares what each pharmacy sold with what it received. When one pharmacy has units sitting unsold and another is reordering the same product, it proposes the transfer and the quantity.",
          example: "Pharmacy B reordered 30 units this month. Pharmacy A has 34 units sitting unsold. Suggested transfer: 30 units.",
          imports: "Pharmacy ID and name, product, quantity shipped in the period, quantity reordered, quantity sold",
        },
        {
          title: "The biggest transfer first",
          does: "Transfers are ranked by the value at stake, so the one that matters most to the network is handled first.",
          example: "Transfers listed from the largest value at stake to the smallest",
          imports: "The same file as above, with a unit cost if you have one",
        },
      ],
      notDo: "SentrIA does not move stock, invoice or place orders for you. It proposes transfers, and you decide. It only sees the pharmacies whose figures you import.",
    },
    fr: {
      heading: "Ce que SentrIA fait pour votre réseau de pharmacies",
      items: [
        {
          title: "Transferts entre vos pharmacies",
          does: "SentrIA compare ce que chaque pharmacie a vendu avec ce qu'elle a reçu. Quand une pharmacie a des unités invendues et qu'une autre recommande le même produit, il propose le transfert et la quantité.",
          example: "Pharmacie B a recommandé 30 unités ce mois-ci. La pharmacie A a 34 unités invendues. Transfert proposé : 30 unités.",
          imports: "Identifiant et nom de la pharmacie, produit, quantité expédiée sur la période, quantité recommandée, quantité vendue",
        },
        {
          title: "Le transfert le plus important d'abord",
          does: "Les transferts sont classés selon la valeur en jeu, pour traiter d'abord celui qui compte le plus pour le réseau.",
          example: "Transferts classés de la plus grande valeur en jeu à la plus petite",
          imports: "Le même fichier que ci-dessus, avec le coût unitaire si vous l'avez",
        },
      ],
      notDo: "SentrIA ne déplace pas de stock, ne facture pas et ne passe pas de commande à votre place. Il propose des transferts, et c'est vous qui décidez. Il ne voit que les pharmacies dont vous importez les chiffres.",
    },
  },
  "exploitation-agricole": {
    en: {
      heading: "What SentrIA does for your stored produce",
      items: [
        {
          title: "Hours left before spoilage",
          does: "From the storage temperature and the days a lot has been stored, SentrIA estimates how many hours are left before the loss starts, and how soon you need to act.",
          example: "Harvest waiting 4 days, estimated loss within the next 12 hours: arrange delivery now",
          imports: "Product, days in storage, storage temperature",
        },
        {
          title: "Temperature warnings",
          does: "When the storage temperature goes above what the product can take, you are warned straight away.",
          example: "Storage too hot: 31°C: risk of spoilage",
          imports: "Storage temperature for each lot",
        },
        {
          title: "Lots at critical risk",
          does: "A lot that has stayed in storage too long is flagged as critical, with the number of days, so you deliver it first.",
          example: "Harvest at risk: in storage for 9 days: deliver urgently",
          imports: "Product and days in storage",
        },
      ],
      notDo: "SentrIA does not measure the temperature itself. You enter it, or import it from your storage logs. The hours left are an estimate, not a guarantee.",
    },
    fr: {
      heading: "Ce que SentrIA fait pour vos produits stockés",
      items: [
        {
          title: "Heures restantes avant la détérioration",
          does: "À partir de la température de stockage et du nombre de jours passés en stock, SentrIA estime les heures qui restent avant que la perte ne commence, et vous indique l'urgence.",
          example: "Récolte en attente depuis 4 jours, perte estimée dans les 12 prochaines heures : organisez la livraison",
          imports: "Produit, jours en stockage, température de stockage",
        },
        {
          title: "Alertes de température",
          does: "Quand la température de stockage dépasse ce que le produit supporte, vous êtes prévenu tout de suite.",
          example: "Température de stockage trop élevée : 31°C : risque de perte",
          imports: "Température de stockage pour chaque lot",
        },
        {
          title: "Lots à risque critique",
          does: "Un lot resté trop longtemps en stockage est signalé comme critique, avec le nombre de jours, pour être livré en premier.",
          example: "Récolte en danger : en stockage depuis 9 jours : livrez d'urgence",
          imports: "Produit et jours en stockage",
        },
      ],
      notDo: "SentrIA ne mesure pas la température lui-même : vous la saisissez, ou vous l'importez depuis vos relevés. Les heures restantes sont une estimation, pas une garantie.",
    },
  },
}

export const ACTIVITY_LIST: { slug: string; name: Record<"en" | "fr", string>; teaser: Record<"en" | "fr", string> }[] = [
  {
    slug: "pharmacie",
    name: { en: "Pharmacy", fr: "Pharmacie" },
    teaser: { en: "Days of stock and expiring batches.", fr: "Jours de stock et lots qui expirent." },
  },
  {
    slug: "grossiste-pharma",
    name: { en: "Pharmaceutical wholesaler", fr: "Grossiste pharma" },
    teaser: { en: "Transfers of unsold stock between your pharmacies.", fr: "Transferts de stock invendu entre vos pharmacies." },
  },
  {
    slug: "exploitation-agricole",
    name: { en: "Farm", fr: "Exploitation agricole" },
    teaser: { en: "Days in storage and hours left before spoilage.", fr: "Jours en stockage et heures restantes avant la détérioration." },
  },
]

// Example alerts shown in the hero of the pharmacy page. Sample numbers, real wording.
export const ALERT_PREVIEW: Record<"en" | "fr", { level: "critical" | "warning"; text: string }[]> = {
  en: [
    { level: "critical", text: "Amoxicillin 500mg: 4 days of stock. Delivery in 7 days. Order today." },
    { level: "warning", text: "Paracetamol 500mg (Lot A47): expires in 18 days — 24 boxes at risk. Sell first or return." },
    { level: "warning", text: "COPHAC Pharma: promises 5 days, delivers in 9 on average. Order 4 days earlier." },
  ],
  fr: [
    { level: "critical", text: "Amoxicilline 500mg : 4 jours de stock. Livraison dans 7 jours. Commandez aujourd'hui." },
    { level: "warning", text: "Paracétamol 500mg (Lot A47) : expire dans 18 jours — 24 boîtes à risque. Écoulez ou retournez." },
    { level: "warning", text: "COPHAC Pharma : promet 5 jours, livre en 9 en moyenne. Commandez 4 jours plus tôt." },
  ],
}
