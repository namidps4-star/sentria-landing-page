import type { Copy } from "@/components/africa-hero"

export const AFRICA_ACTIVITIES = ["pharmacie", "grossiste-pharma", "exploitation-agricole"] as const

const PHARMACY_PHOTO_EN = "Two customers reading a medicine box at a pharmacy shelf in Lagos"
const PHARMACY_PHOTO_FR = "Deux clients lisent une boîte de médicament devant un rayon de pharmacie à Lagos"

export const ACTIVITY_COPY: Record<string, Record<"en" | "fr", Copy>> = {
  pharmacie: {
    en: {
      h1: ["Know your medicines", "days left", "before they run out."],
      lead: "Upload your stock file. SentrIA works out how many days each medicine will last at your current sales, shows which batches expire first, and tells you what to order today, using the real delivery time of each wholesaler.",
      start: "For independent pharmacies and pharmacy branches.",
      cta: "Book a demo →",
      cta2: "Read the FEFO guide",
      cta2Href: "/articles/fefo-first-expired-first-out",
      photoAlt: PHARMACY_PHOTO_EN,
      stats: [
        ["Days of stock", "Worked out for each product, from the last 30 days of sales."],
        ["Batches that expire first", "The batches closest to their date are flagged, so they leave first."],
        ["What to order today", "The quantity you need, based on each supplier's real delivery time."],
      ],
    },
    fr: {
      h1: ["Sachez combien de jours", "de stock il vous reste", "avant la rupture."],
      lead: "Importez votre fichier de stock. SentrIA calcule combien de jours chaque médicament tiendra au rythme actuel des ventes, signale les lots qui expirent en premier, et indique la quantité à commander aujourd'hui, selon le délai réel de livraison de chaque grossiste.",
      start: "Pour les pharmacies indépendantes et les officines à plusieurs succursales.",
      cta: "Demander une démo →",
      cta2: "Lire le guide FEFO",
      cta2Href: "/articles/fefo-premier-expire-premier-sorti",
      photoAlt: PHARMACY_PHOTO_FR,
      stats: [
        ["Jours de stock", "Calculés produit par produit, à partir des ventes des 30 derniers jours."],
        ["Lots qui expirent en premier", "Les lots les plus proches de leur date sont signalés, pour sortir en premier."],
        ["Quoi commander aujourd'hui", "La quantité nécessaire, selon le délai réel de livraison de chaque fournisseur."],
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
export type Capabilities = { heading: string; items: Capability[]; notDo: string }

// What an expert in each activity gets. Examples are the product's own alert
// wording with sample numbers. "Imports" is the file the product reads.
export const CAPABILITIES: Record<string, Record<"en" | "fr", Capabilities>> = {
  pharmacie: {
    en: {
      heading: "What SentrIA does in your pharmacy",
      items: [
        {
          title: "Days of stock, product by product",
          does: "SentrIA divides what is on the shelf by what you sold over the last 30 days. It warns you when a product will run out before the next delivery arrives.",
          example: "Stock-out imminent: 38 units left (minimum: 40): order now",
          imports: "Medicine name, stock quantity, minimum stock, sales over the last 30 days",
        },
        {
          title: "Batches that expire first",
          does: "Each batch is checked against its expiry date. A product close to its date is flagged, so you sell it or return it before it expires.",
          example: "Product expires in 30 days: sell or return to supplier",
          imports: "Expiry date, and the batch number if you have it",
        },
        {
          title: "Checks when goods arrive",
          does: "When a delivery comes in, SentrIA checks each line for a missing date or an expired lot, before the box goes on the shelf.",
          example: "Paracetamol (lot A12): already expired at receipt (2026-10-01): do not shelve it, set it aside",
          imports: "The delivery file: product, lot and expiry date",
        },
        {
          title: "Real delivery times per supplier",
          does: "SentrIA compares each supplier's promised delivery time with the time it really takes, from your past orders, and tells you when to order earlier.",
          example: "7 days promised, 11 days in reality (up to 14) across 9 deliveries: adjust your ordering or renegotiate",
          imports: "For each delivery: the order date, the promised date and the date it arrived",
        },
      ],
      notDo: "SentrIA does not know what your wholesaler has in stock today, and it does not forecast demand beyond your last 30 days of sales.",
    },
    fr: {
      heading: "Ce que SentrIA fait dans votre pharmacie",
      items: [
        {
          title: "Jours de stock, produit par produit",
          does: "SentrIA divise ce qui est en rayon par ce que vous avez vendu sur les 30 derniers jours. Il vous prévient quand un produit va manquer avant l'arrivée de la livraison suivante.",
          example: "Rupture imminente : il reste 38 unités (minimum requis : 40) : commandez maintenant",
          imports: "Nom du médicament, quantité en stock, stock minimum, ventes des 30 derniers jours",
        },
        {
          title: "Lots qui expirent en premier",
          does: "Chaque lot est comparé à sa date de péremption. Un produit proche de sa date est signalé, pour être vendu ou retourné avant d'expirer.",
          example: "Produit expire dans 30 jours : écoulez ou retournez au fournisseur",
          imports: "Date de péremption, et le numéro de lot si vous l'avez",
        },
        {
          title: "Contrôles à la réception",
          does: "À l'arrivée d'une livraison, SentrIA contrôle chaque ligne : date manquante ou lot périmé, avant que la boîte ne soit rangée.",
          example: "Paracétamol (lot A12) : déjà périmé à la réception (01/10/2026) : ne le rangez pas, mettez-le de côté",
          imports: "Le fichier de livraison : produit, lot et date de péremption",
        },
        {
          title: "Délais réels de chaque fournisseur",
          does: "SentrIA compare le délai annoncé par chaque fournisseur au délai réellement observé dans vos commandes passées, et vous dit quand commander plus tôt.",
          example: "7 jours promis, 11 jours en réalité (jusqu'à 14) sur 9 livraisons : ajustez vos commandes ou renégociez",
          imports: "Pour chaque livraison : la date de commande, la date promise et la date d'arrivée",
        },
      ],
      notDo: "SentrIA ne connaît pas le stock de votre grossiste aujourd'hui, et ne prévoit pas la demande au-delà de vos ventes des 30 derniers jours.",
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
