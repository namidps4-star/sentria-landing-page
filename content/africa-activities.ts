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
      h1: ["One of your pharmacies", "is reordering", "what another one can't sell."],
      lead: "Upload your pharmacy network data. SentrIA compares what each pharmacy received with what it sold. When one holds unsold stock that another is reordering, it proposes the transfer — by product, by quantity, ranked by the value at stake.",
      start: "For pharmaceutical wholesalers who supply a network of pharmacies.",
      cta: "Book a demo →",
      cta2: "Read how to avoid stock-outs",
      cta2Href: "/articles/pharmacy-stock-outs",
      photoAlt: PHARMACY_PHOTO_EN,
      stats: [
        ["Clinique du Nord reordered 30 units:", "Metformin 500mg. Pharmacy Centrale holds 34 unsold. Suggested transfer: 30 units."],
        ["Transfer value: 180,000 FCFA:", "Largest opportunity ranked first. Handle the one that matters most."],
        ["Nothing moves without you:", "SentrIA proposes. You approve. No stock is moved or invoiced automatically."],
      ],
    },
    fr: {
      h1: ["Une de vos pharmacies", "recommande", "ce qu'une autre ne vend pas."],
      lead: "Importez les données de votre réseau. SentrIA compare ce que chaque pharmacie a reçu avec ce qu'elle a vendu. Quand l'une garde un stock invendu qu'une autre recommande, il propose le transfert — par produit, par quantité, classé selon la valeur en jeu.",
      start: "Pour les grossistes en produits pharmaceutiques qui fournissent un réseau de pharmacies.",
      cta: "Demander une démo →",
      cta2: "Lire comment éviter les ruptures",
      cta2Href: "/articles/ruptures-de-stock-en-pharmacie",
      photoAlt: PHARMACY_PHOTO_FR,
      stats: [
        ["Clinique du Nord a recommandé 30 unités :", "Metformine 500mg. Pharmacie Centrale en a 34 invendues. Transfert proposé : 30 unités."],
        ["Valeur du transfert : 180 000 FCFA :", "La plus grande opportunité classée en premier. Traitez d'abord ce qui compte le plus."],
        ["Rien ne bouge sans vous :", "SentrIA propose. Vous approuvez. Aucun stock ne se déplace ni n'est facturé automatiquement."],
      ],
    },
  },
  "exploitation-agricole": {
    en: {
      h1: ["Every extra hour", "in storage you don't need", "is money spoiling."],
      lead: "Record each lot when it enters storage. SentrIA tracks days stored and temperature, estimates hours left before spoilage starts, and warns you before the loss — not after.",
      start: "For farms that store harvests or inputs before they sell or use them.",
      cta: "Book a demo →",
      cta2: "See the storage features",
      cta2Href: "/en#demo",
      photoAlt: PHARMACY_PHOTO_EN,
      stats: [
        ["Tomatoes Lot 7:", "4 days at 32°C. Loss starts in 12 hours. Arrange delivery now."],
        ["Maize Lot 3:", "9 days in storage. Critical risk. Deliver urgently before full loss."],
        ["Cold room reached 31°C:", "Risk of spoilage. Check temperature and ventilation now."],
      ],
    },
    fr: {
      h1: ["Chaque heure de trop", "en stockage inutile", "c'est de l'argent qui se perd."],
      lead: "Enregistrez chaque lot à son entrée en stockage. SentrIA suit les jours passés et la température, estime les heures restantes avant la détérioration, et vous prévient avant la perte — pas après.",
      start: "Pour les exploitations agricoles qui stockent des récoltes ou des intrants avant de les vendre ou de les utiliser.",
      cta: "Demander une démo →",
      cta2: "Voir les fonctions de stockage",
      cta2Href: "/fr#demo",
      photoAlt: PHARMACY_PHOTO_FR,
      stats: [
        ["Tomates Lot 7 :", "4 jours à 32°C. Perte dans 12 heures. Organisez la livraison maintenant."],
        ["Maïs Lot 3 :", "9 jours en stockage. Risque critique. Livrez d'urgence avant la perte totale."],
        ["Chambre froide à 31°C :", "Risque de détérioration. Vérifiez la température et la ventilation maintenant."],
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
      heading: "What SentrIA shows you across your pharmacy network",
      items: [
        {
          title: "Which pharmacy is reordering what another one has sitting unsold",
          does: "SentrIA compares each pharmacy's deliveries with its sales. When one is reordering a product that another holds unsold, it names both pharmacies, the product and the exact quantity to transfer — before you send another order.",
          example: "Clinique du Nord: reordered 30 units of Metformin 500mg this month. Pharmacy Centrale: 34 units unsold. Suggested transfer: 30 units.",
          imports: "Pharmacy name, product, quantity delivered in the period, quantity reordered, quantity sold",
        },
        {
          title: "The transfer worth the most money, first",
          does: "Transfers are ranked by the value at stake, so you handle the one that costs the network most if left unresolved. If you have a unit cost, SentrIA uses it. If not, it ranks by quantity.",
          example: "Metformin 500mg: 30 units, 180,000 FCFA. Amoxicillin 500mg: 12 units, 72,000 FCFA. Paracetamol 1g: 8 units, 24,000 FCFA.",
          imports: "Unit cost per product (optional — SentrIA ranks by quantity if not provided)",
        },
      ],
      notDo: "SentrIA does not move stock, place orders or issue invoices. It proposes transfers, and you decide what happens. It only sees the pharmacies whose data you import.",
    },
    fr: {
      heading: "Ce que SentrIA vous montre sur l'ensemble de votre réseau",
      items: [
        {
          title: "Quelle pharmacie recommande ce qu'une autre garde invendu",
          does: "SentrIA compare les livraisons de chaque pharmacie avec ses ventes. Quand l'une recommande un produit qu'une autre garde invendu, il nomme les deux pharmacies, le produit et la quantité exacte à transférer — avant que vous envoyiez une nouvelle commande.",
          example: "Clinique du Nord : a recommandé 30 unités de Metformine 500mg ce mois-ci. Pharmacie Centrale : 34 unités invendues. Transfert proposé : 30 unités.",
          imports: "Nom de la pharmacie, produit, quantité livrée sur la période, quantité recommandée, quantité vendue",
        },
        {
          title: "Le transfert qui vaut le plus d'argent, en premier",
          does: "Les transferts sont classés par valeur en jeu, pour traiter d'abord celui qui coûte le plus au réseau s'il reste sans suite. Si vous avez un coût unitaire, SentrIA l'utilise. Sinon, il classe par quantité.",
          example: "Metformine 500mg : 30 unités, 180 000 FCFA. Amoxicilline 500mg : 12 unités, 72 000 FCFA. Paracétamol 1g : 8 unités, 24 000 FCFA.",
          imports: "Coût unitaire par produit (optionnel — SentrIA classe par quantité si absent)",
        },
      ],
      notDo: "SentrIA ne déplace pas de stock, ne passe pas de commande et n'émet pas de facture. Il propose des transferts, et c'est vous qui décidez. Il ne voit que les pharmacies dont vous importez les données.",
    },
  },
  "exploitation-agricole": {
    en: {
      heading: "What SentrIA tells you before the loss starts",
      items: [
        {
          title: "How many hours before each lot starts to lose value",
          does: "From storage temperature and days stored, SentrIA estimates how much time you have before spoilage begins. It tells you which lot to move first and how urgent it is — in hours, not in vague warnings.",
          example: "Tomatoes Lot 7: 4 days in storage at 32°C. Estimated loss in 12 hours. Arrange delivery now.",
          imports: "Product, days in storage, storage temperature",
        },
        {
          title: "When the storage gets too hot for what is inside",
          does: "Every product has a temperature threshold. When storage rises above it, you get a warning straight away — not when you check the logs the next morning.",
          example: "Cold room 3: reached 31°C. Tomatoes at risk of spoilage. Check temperature and ventilation now.",
          imports: "Storage temperature per lot or per room",
        },
        {
          title: "Lots past their safe window — by name, by days",
          does: "A lot that has stayed in storage longer than it safely can is flagged as critical: the product name, the number of days, and the instruction to deliver it first.",
          example: "Maize Lot 3: 9 days in storage. Critical. Deliver urgently before full loss.",
          imports: "Product and days in storage",
        },
      ],
      notDo: "SentrIA does not measure temperature itself. You enter it, or import it from your storage logs. The hours left are an estimate, not a guarantee — act sooner if in doubt.",
    },
    fr: {
      heading: "Ce que SentrIA vous dit avant que la perte commence",
      items: [
        {
          title: "Combien d'heures avant que chaque lot commence à se déprécier",
          does: "À partir de la température de stockage et des jours passés en stock, SentrIA estime le temps qu'il vous reste avant que la détérioration commence. Il vous dit quel lot déplacer en premier et l'urgence — en heures, pas en avertissements vagues.",
          example: "Tomates Lot 7 : 4 jours en stockage à 32°C. Perte estimée dans 12 heures. Organisez la livraison maintenant.",
          imports: "Produit, jours en stockage, température de stockage",
        },
        {
          title: "Quand le stockage est trop chaud pour ce qu'il contient",
          does: "Chaque produit a un seuil de température. Quand le stockage le dépasse, vous êtes prévenu immédiatement — pas le lendemain matin en consultant les relevés.",
          example: "Chambre froide 3 : a atteint 31°C. Tomates à risque de détérioration. Vérifiez la température et la ventilation maintenant.",
          imports: "Température de stockage par lot ou par chambre",
        },
        {
          title: "Les lots dépassé leur durée sûre — par nom, par nombre de jours",
          does: "Un lot resté en stockage plus longtemps qu'il ne peut le tolérer est signalé comme critique : le nom du produit, le nombre de jours, et l'instruction de le livrer en premier.",
          example: "Maïs Lot 3 : 9 jours en stockage. Critique. Livrez d'urgence avant la perte totale.",
          imports: "Produit et jours en stockage",
        },
      ],
      notDo: "SentrIA ne mesure pas la température lui-même. Vous la saisissez, ou vous l'importez depuis vos relevés. Les heures restantes sont une estimation, pas une garantie — agissez plus tôt en cas de doute.",
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
