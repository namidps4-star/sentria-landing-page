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
      photoAlt: "Two people working in a crop field",
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
      photoAlt: "Deux personnes travaillent dans un champ",
      stats: [
        ["Jours en stockage", "Comptés pour chaque lot à partir de son entrée en stock."],
        ["Heures restantes", "Une estimation du temps qui reste avant que le produit ne se détériore, selon sa température."],
        ["Alertes à temps", "Un message quand un lot approche de sa limite, et non après la perte."],
      ],
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
