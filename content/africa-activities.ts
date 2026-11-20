import type { Copy } from "@/components/africa-hero"
import type { DecisionCardData } from "@/components/africa-decision-card"
export type { DecisionCardData }
import { MORE_ACTIVITY_COPY, MORE_CAPABILITIES, MORE_SECTOR_ALERTS } from "./africa-activity-pages"

export const AFRICA_ACTIVITIES = ["pharmacie", "grossiste-pharma", "exploitation-agricole", "grossiste-distributeur"] as const

const PHARMACY_PHOTO_EN = "Two customers reading a medicine box at a pharmacy shelf in Lagos"
const PHARMACY_PHOTO_FR = "Deux clients lisent une boîte de médicament devant un rayon de pharmacie à Lagos"

const CORE_ACTIVITY_COPY: Record<string, Record<"en" | "fr", Copy>> = {
  pharmacie: {
    en: {
      h1: ["Catch the stock‑out", "before the patient", "is at the counter."],
      lead: "Upload your stock file. SentrIA tells you which medicines will run out before the next delivery arrives, which batches expire first, and what to order today, based on what your suppliers actually deliver, not what they promise. Same engine on every page: compare to normal, flag the one thing about to go wrong, tell you what to do today.",
      start: "For pharmacies that manage clinical stock.",
      cta: "Book a demo →",
      cta2: "Read the FEFO guide (first expired, first out)",
      cta2Href: "/articles/fefo-first-expired-first-out",
      photoAlt: PHARMACY_PHOTO_EN,
      stats: [
        ["4d", "Days of stock", "Amoxicillin 500mg: promised delivery in 7 days, real average 11. Order today or the shelf goes empty."],
        ["18d", "Batch expiry risk", "Paracetamol 500mg lot A47, 24 boxes expire in 18 days. Sell first or return."],
        ["+4d", "Order earlier", "COPHAC Pharma delivers in 9 days on average, not the 5 they promise."],
      ],
    },
    fr: {
      h1: ["Anticipez la rupture", "avant que le patient", "soit au comptoir."],
      lead: "Importez votre fichier de stock. SentrIA vous dit quels médicaments vont manquer avant la prochaine livraison, quels lots expirent en premier, et quoi commander aujourd'hui, selon ce que vos fournisseurs livrent vraiment, pas ce qu'ils promettent. Le même moteur sur chaque page : comparer à la normale, signaler la seule chose sur le point de mal tourner, vous dire quoi faire aujourd'hui.",
      start: "Pour les pharmacies qui gèrent un stock clinique.",
      cta: "Demander une démo →",
      cta2: "Lire le guide FEFO (premier expiré, premier sorti)",
      cta2Href: "/articles/fefo-premier-expire-premier-sorti",
      photoAlt: PHARMACY_PHOTO_FR,
      stats: [
        ["4j", "Jours de stock", "Amoxicilline 500mg : livraison promise dans 7 jours, délai réel moyen de 11. Commandez aujourd'hui ou le rayon sera vide."],
        ["18j", "Risque lot", "Paracétamol 500mg lot A47, 24 boîtes expirent dans 18 jours. Écoulez ou retournez."],
        ["+4j", "Commandez plus tôt", "COPHAC Pharma livre en 9 jours en moyenne, pas les 5 jours promis."],
      ],
    },
  },
  "grossiste-pharma": {
    en: {
      h1: ["One of your pharmacies", "is reordering", "what another one can't sell."],
      lead: "Upload your pharmacy network data. SentrIA compares what each pharmacy received with what it sold. When one holds unsold stock that another is reordering, it proposes the transfer, by product, by quantity, ranked by the value at stake. Same question as a single pharmacy — who runs out, who sits on dead stock — across your whole network. Same engine on every page: compare to normal, flag the one thing about to go wrong, tell you what to do today.",
      start: "For pharmaceutical wholesalers who supply a network of pharmacies.",
      cta: "Book a demo →",
      cta2: "Read how to avoid stock-outs",
      cta2Href: "/articles/pharmacy-stock-outs",
      photoAlt: PHARMACY_PHOTO_EN,
      stats: [
        ["30", "Units to transfer / days of stock", "North Clinic reordered Metformin 500mg. Central Pharmacy holds 34 unsold."],
        ["180k", "FCFA at stake", "Largest transfer opportunity ranked first. Handle the one that matters most."],
        ["0", "Auto moves", "SentrIA proposes. You approve. Nothing is moved or invoiced automatically."],
      ],
    },
    fr: {
      h1: ["Une de vos pharmacies", "recommande", "ce qu'une autre ne vend pas."],
      lead: "Importez les données de votre réseau. SentrIA compare ce que chaque pharmacie a reçu avec ce qu'elle a vendu. Quand l'une garde un stock invendu qu'une autre recommande, il propose le transfert, par produit, par quantité, classé selon la valeur en jeu. Même question qu'une pharmacie seule — qui manque, qui garde du stock mort — sur tout votre réseau. Le même moteur sur chaque page : comparer à la normale, signaler la seule chose sur le point de mal tourner, vous dire quoi faire aujourd'hui.",
      start: "Pour les grossistes en produits pharmaceutiques qui fournissent un réseau de pharmacies.",
      cta: "Demander une démo →",
      cta2: "Lire comment éviter les ruptures",
      cta2Href: "/articles/ruptures-de-stock-en-pharmacie",
      photoAlt: PHARMACY_PHOTO_FR,
      stats: [
        ["30", "Unités à transférer / jours de stock", "Clinique du Nord a recommandé la Metformine 500mg. Pharmacie Centrale en a 34 invendues."],
        ["180k", "FCFA en jeu", "La plus grande opportunité classée en premier. Traitez d'abord ce qui compte le plus."],
        ["0", "Mouvements auto", "SentrIA propose. Vous approuvez. Aucun stock ne se déplace automatiquement."],
      ],
    },
  },
  "exploitation-agricole": {
    en: {
      h1: ["Every extra hour", "in storage you don't need", "is money spoiling."],
      lead: "Record each lot when it enters storage. SentrIA tracks days stored and temperature, estimates hours left before spoilage starts, and warns you before the loss, not after. Days of stock, turned around: how long before the loss, not after. Same engine on every page: compare to normal, flag the one thing about to go wrong, tell you what to do today.",
      start: "For farms that store harvests or inputs before they sell or use them.",
      cta: "Book a demo →",
      cta2: "See the storage features",
      cta2Href: "/en#demo",
      photoAlt: "Two people working in a crop field",
      stats: [
        ["12h", "Hours left before loss", "Tomatoes Lot 7, 4 days at 32°C. Loss starts in 12 hours. Arrange delivery now."],
        ["9d", "Days in storage", "Maize Lot 3, critical risk. Deliver urgently before full loss."],
        ["31°", "Cold room alert", "Temperature reached danger level. Check ventilation now."],
      ],
    },
    fr: {
      h1: ["Chaque heure de trop", "en stockage inutile", "c'est de l'argent qui se perd."],
      lead: "Enregistrez chaque lot à son entrée en stockage. SentrIA suit les jours passés et la température, estime les heures restantes avant la détérioration, et vous prévient avant la perte, pas après. Jours de stock, retournés : combien de temps avant la perte, pas après. Le même moteur sur chaque page : comparer à la normale, signaler la seule chose sur le point de mal tourner, vous dire quoi faire aujourd'hui.",
      start: "Pour les exploitations agricoles qui stockent des récoltes ou des intrants avant de les vendre ou de les utiliser.",
      cta: "Demander une démo →",
      cta2: "Voir les fonctions de stockage",
      cta2Href: "/fr#demo",
      photoAlt: "Deux personnes travaillent dans un champ",
      stats: [
        ["12h", "Heures restantes avant la perte", "Tomates Lot 7, 4 jours à 32°C. Perte dans 12 heures. Livraison maintenant."],
        ["9j", "Jours en stockage", "Maïs Lot 3, risque critique. Livrez d'urgence avant la perte totale."],
        ["31°", "Alerte chambre froide", "Température atteinte. Vérifiez la température et la ventilation."],
      ],
    },
  },
}

/* One picture per activity page, none shared with another page. Both languages use the same picture. */
export const AFRICA_PHOTOS: Record<string, { src: string; credit: string }> = {
  pharmacie: { src: "/africa/hq/africa-pharmacie.jpg", credit: "Photo: Yikai Sun, Unsplash" },
  "grossiste-pharma": { src: "/africa/hq/africa-grossiste.jpg", credit: "Photo: Salah Ait Mokhtar, Unsplash" },
  "exploitation-agricole": { src: "/africa/hq/africa-farm.jpg", credit: "Photo: Yulian Alexeyev, Unsplash" },
  "grossiste-distributeur": { src: "/africa/hq/hero-wholesaler.jpg", credit: "Photo: Unsplash" },
}

export type Drawing = { kind: "bars" | "timeline" | "pair" | "compare" | "transfer" | "ranked"; labels: string[] }
export type Capability = { title: string; does: string; example: string; imports: string; figure: string; drawing: Drawing }
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
  decisionCard?: DecisionCardData
}

// What an expert in each activity gets. Examples are the product's own alert
// wording with sample numbers. "Imports" is the file the product reads.
const CORE_CAPABILITIES: Record<string, Record<"en" | "fr", Capabilities>> = {
  pharmacie: {
    en: {
      heading: "What SentrIA tells you every morning",
      items: [
        {
          title: "Which medicine runs out before the delivery arrives",
          does: "SentrIA divides shelf stock by daily sales. It flags the products that will hit zero before the next order arrives, by name, by days left, so you can order before the patient asks for something you no longer have.",
          example: "Amoxicillin 500mg: 4 days of stock. Delivery in 7 days. Order today.",
          imports: "Medicine name, quantity on hand, minimum stock, daily sales average",
          figure: "4",
          drawing: { kind: "bars", labels: ["stock · 4 days","delivery · 7 days"] },
        },
        {
          title: "Which batches expire first, and what that costs you",
          does: "Every batch is checked against its expiry date. SentrIA shows you the ones to sell first, the ones to return, and the value at risk if you do nothing today.",
          example: "Paracetamol 500mg (Lot A47): expires in 18 days, 24 boxes, 96,000 FCFA at risk. Sell first or return.",
          imports: "Expiry date and lot number per product line",
          figure: "18",
          drawing: { kind: "timeline", labels: ["18 days","today","30 days"] },
        },
        {
          title: "Expired and undated products caught at reception, not on the shelf",
          does: "Before a box goes on the shelf, SentrIA checks the delivery file for lots already expired or missing a date. You set it aside before it creates a legal problem or a loss.",
          example: "Doxycycline 100mg (Lot B23): received 1 Nov, expired 15 Oct. Do not shelve. Return to supplier.",
          imports: "Delivery file: product name, lot number, expiry date per line",
          figure: "15 Oct",
          drawing: { kind: "pair", labels: ["expired 15 Oct","received 1 Nov"] },
        },
        {
          title: "What your supplier actually delivers vs. what they promise",
          does: "SentrIA tracks your past orders: order date, promised date, arrival date. It shows which suppliers run late and by how much, so you order earlier instead of running out while you wait.",
          example: "COPHAC Pharma: promises 5 days, delivers in 9 on average (worst: 14 days across 9 orders). Order 4 days earlier.",
          imports: "Per past order: supplier, order date, promised date, arrival date",
          figure: "9",
          drawing: { kind: "compare", labels: ["promised 5","real average 9","worst 14"] },
        },
      ],
      notDo: "SentrIA does not know your wholesaler's live stock today, and it does not forecast demand beyond your past 30 days of sales. It reads what you give it.",
      stepsHeading: "Start in three steps",
      steps: [
        { title: "Send your stock file", text: "Export from your software or use a spreadsheet. You match the columns once, SentrIA remembers the mapping." },
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
        { q: "What file do I need?", a: "A stock list: product name, quantity on hand, minimum stock, sales over 30 days, expiry date. Column names can differ from ours, you map them once." },
        { q: "Does it connect to my software?", a: "Sources: a CSV upload works today. ERP, API and IoT connections are planned. Until then, export a spreadsheet and upload it." },
        { q: "Who sees my figures?", a: "Only your pharmacy. Each account's data is kept completely separate." },
        { q: "Do I have to change how I work?", a: "No. Keep your current routine. Check the alert list each morning before the first patient walks in." },
      ],
      decisionCard: {
        evidence: "Amoxicillin 500 mg: 4 days of stock. Reorder lead: 7 days (from 18 months of supplier records). Lot L-224 expires in 3 days.",
        confidence: "87% — based on 24 months of sales data for this molecule.",
        impact: "3 days of stockout = 180,000 XOF lost revenue.",
        outcome: "Order 200 units today. Decision logged.",
      },
    },
    fr: {
      heading: "Ce que SentrIA vous dit chaque matin",
      items: [
        {
          title: "Quel médicament manquera avant la prochaine livraison",
          does: "SentrIA divise le stock en rayon par les ventes quotidiennes. Il signale les produits qui atteindront zéro avant l'arrivée de la prochaine commande, par nom, par jours restants, pour commander avant que le patient demande quelque chose que vous n'avez plus.",
          example: "Amoxicilline 500mg : 4 jours de stock. Livraison dans 7 jours. Commandez aujourd'hui.",
          imports: "Nom du médicament, quantité en stock, stock minimum, moyenne des ventes journalières",
          figure: "4",
          drawing: { kind: "bars", labels: ["stock · 4 jours","livraison · 7 jours"] },
        },
        {
          title: "Quels lots expirent en premier, et ce que ça vous coûte",
          does: "Chaque lot est comparé à sa date de péremption. SentrIA vous montre ceux à écouler en premier, ceux à retourner, et la valeur à risque si vous ne faites rien aujourd'hui.",
          example: "Paracétamol 500mg (Lot A47) : expire dans 18 jours, 24 boîtes, 96 000 FCFA à risque. Écoulez ou retournez.",
          imports: "Date de péremption et numéro de lot par ligne produit",
          figure: "18",
          drawing: { kind: "timeline", labels: ["18 jours","aujourd'hui","30 jours"] },
        },
        {
          title: "Produits périmés ou sans date, détectés à la réception, pas sur le rayon",
          does: "Avant qu'une boîte soit rangée, SentrIA contrôle le fichier de livraison : lot déjà périmé ou date manquante. Vous le mettez de côté avant qu'il ne crée un problème légal ou une perte.",
          example: "Doxycycline 100mg (Lot B23) : reçue le 1er nov, périmée le 15 oct. Ne pas ranger. Retourner au fournisseur.",
          imports: "Fichier de livraison : nom du produit, numéro de lot, date de péremption par ligne",
          figure: "15 oct",
          drawing: { kind: "pair", labels: ["périmé le 15 oct","reçu le 1er nov"] },
        },
        {
          title: "Ce que votre fournisseur livre vraiment, pas ce qu'il promet",
          does: "SentrIA suit vos commandes passées : date de commande, date promise, date réelle. Il montre quels fournisseurs livrent en retard et de combien, pour que vous commandiez plus tôt au lieu de manquer de stock en attendant.",
          example: "COPHAC Pharma : promet 5 jours, livre en 9 en moyenne (pire cas : 14 jours sur 9 commandes). Commandez 4 jours plus tôt.",
          imports: "Par commande passée : fournisseur, date de commande, date promise, date d'arrivée",
          figure: "9",
          drawing: { kind: "compare", labels: ["promis 5","réel moyen 9","pire 14"] },
        },
      ],
      notDo: "SentrIA ne connaît pas le stock de votre grossiste aujourd'hui, et ne prévoit pas la demande au-delà de vos 30 derniers jours de ventes. Il lit ce que vous lui donnez.",
      stepsHeading: "Démarrer en trois étapes",
      steps: [
        { title: "Envoyez votre fichier de stock", text: "Exportez depuis votre logiciel ou utilisez un tableur. Vous associez les colonnes une seule fois, SentrIA mémorise la correspondance." },
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
        { q: "Quel fichier faut-il ?", a: "Une liste de stock : nom du produit, quantité en stock, stock minimum, ventes sur 30 jours, date de péremption. Les noms de colonnes peuvent différer, vous les associez une seule fois." },
        { q: "Est-ce relié à mon logiciel ?", a: "Sources : l'import CSV fonctionne aujourd'hui. Les connexions ERP, API et IoT sont prévues. D'ici là, exportez un tableur et importez-le." },
        { q: "Qui voit mes chiffres ?", a: "Uniquement votre pharmacie. Les données de chaque compte sont strictement séparées." },
        { q: "Dois-je changer ma façon de travailler ?", a: "Non. Gardez votre routine habituelle. Consultez la liste d'alertes chaque matin avant le premier patient." },
      ],
      decisionCard: {
        evidence: "Amoxicilline 500 mg : 4 jours de stock. Délai réapprovisionnement : 7 jours (sur 18 mois d'historique fournisseur). Lot L-224 expire dans 3 jours.",
        confidence: "87 % — basé sur 24 mois de données de vente pour cette molécule.",
        impact: "3 jours de rupture = 180 000 XOF de revenus perdus.",
        outcome: "Commander 200 unités aujourd'hui. Décision enregistrée.",
      },
    },
  },
  "grossiste-pharma": {
    en: {
      heading: "What SentrIA shows you across your pharmacy network",
      items: [
        {
          title: "Which pharmacy is reordering what another one has sitting unsold",
          does: "SentrIA compares each pharmacy's deliveries with its sales. When one is reordering a product that another holds unsold, it names both pharmacies, the product and the exact quantity to transfer, before you send another order.",
          example: "North Clinic: reordered 30 units of Metformin 500mg this month. Central Pharmacy: 34 units unsold. Suggested transfer: 30 units.",
          imports: "Pharmacy name, product, quantity delivered in the period, quantity reordered, quantity sold",
          figure: "30",
          drawing: { kind: "transfer", labels: ["Central","units unsold","30 units","North","units reordered"] },
        },
        {
          title: "The transfer worth the most money, first",
          does: "Transfers are ranked by the value at stake, so you handle the one that costs the network most if left unresolved. If you have a unit cost, SentrIA uses it. If not, it ranks by quantity.",
          example: "Metformin 500mg: 30 units, 180,000 FCFA. Amoxicillin 500mg: 12 units, 72,000 FCFA. Paracetamol 1g: 8 units, 24,000 FCFA.",
          imports: "Unit cost per product (optional, SentrIA ranks by quantity if not provided)",
          figure: "180k",
          drawing: { kind: "ranked", labels: ["Paracetamol","24k","Amoxicillin","72k","Metformin","180k"] },
        },
        {
          title: "Which pharmacy runs out before your next delivery",
          does: "SentrIA estimates each pharmacy's stock from your deliveries minus its sales. It flags the products that reach zero before your next delivery to that pharmacy, so you can send them stock first.",
          example: "Port Pharmacy: Paracetamol 1g, 2 days left. Your next delivery is in 5 days.",
          imports: "Deliveries and sales per pharmacy and product, date of your next delivery",
          figure: "2",
          drawing: { kind: "bars", labels: ["Port Pharmacy: 2 days","next delivery in 5 days"] },
        },
        {
          title: "Which pharmacy has gone quiet",
          does: "SentrIA measures the gap between each pharmacy's orders. When one goes quiet for longer than its usual gap, it names the pharmacy, so you can call it this week.",
          example: "North Pharmacy: no order for 21 days. Its usual gap is 7 days.",
          imports: "Pharmacy name and the date of each order or delivery",
          figure: "21",
          drawing: { kind: "timeline", labels: ["21 days, no order","last order","usual gap 7 days"] },
        },
      ],
      notDo: "SentrIA does not move stock, place orders or issue invoices. It proposes transfers, and you decide what happens. It only sees the pharmacies whose data you import.",
      stepsHeading: "Start in three steps",
      steps: [
        { title: "Export your network data", text: "One file per pharmacy: deliveries and sales by product and by day. A spreadsheet export is enough." },
        { title: "Import it once", text: "SentrIA matches the pharmacy and product names, then estimates what each pharmacy holds and what it reorders." },
        { title: "Approve the morning list", text: "Transfers and reorder warnings come ranked by value. You approve or dismiss each one. SentrIA moves nothing." },
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
      faqHeading: "Questions wholesalers ask",
      faq: [
        { q: "Does SentrIA move stock or send orders?", a: "No. It proposes transfers and reorder warnings. You decide, and you place every order yourself." },
        { q: "What do I need to import?", a: "Per pharmacy: deliveries and sales by product and by day, and your next delivery dates. A spreadsheet export is enough." },
        { q: "What if only some pharmacies share their data?", a: "SentrIA works with the pharmacies you import, and it does not see the others." },
        { q: "Do I need unit costs?", a: "No. Without them SentrIA ranks by quantity. With them it ranks by the value at stake." },
      ],
      decisionCard: {
        evidence: "Client Market Pharmacy: fill rate 83% over 7 days vs 97% target. 4 SKUs below minimum.",
        confidence: "90% — based on order history and delivery scan log.",
        impact: "17% fill gap on key client = potential contract review + 420,000 XOF exposure.",
        outcome: "Prioritise 4 SKUs for today's dispatch. Investigate cold-chain on delivery 1142. Decision logged.",
      },
    },
    fr: {
      heading: "Ce que SentrIA vous montre sur l'ensemble de votre réseau",
      items: [
        {
          title: "Quelle pharmacie recommande ce qu'une autre garde invendu",
          does: "SentrIA compare les livraisons de chaque pharmacie avec ses ventes. Quand l'une recommande un produit qu'une autre garde invendu, il nomme les deux pharmacies, le produit et la quantité exacte à transférer, avant que vous envoyiez une nouvelle commande.",
          example: "Clinique du Nord : a recommandé 30 unités de Metformine 500mg ce mois-ci. Pharmacie Centrale : 34 unités invendues. Transfert proposé : 30 unités.",
          imports: "Nom de la pharmacie, produit, quantité livrée sur la période, quantité recommandée, quantité vendue",
          figure: "30",
          drawing: { kind: "transfer", labels: ["Centrale","unités invendues","30 unités","Nord","unités recommandées"] },
        },
        {
          title: "Le transfert qui vaut le plus d'argent, en premier",
          does: "Les transferts sont classés par valeur en jeu, pour traiter d'abord celui qui coûte le plus au réseau s'il reste sans suite. Si vous avez un coût unitaire, SentrIA l'utilise. Sinon, il classe par quantité.",
          example: "Metformine 500mg : 30 unités, 180 000 FCFA. Amoxicilline 500mg : 12 unités, 72 000 FCFA. Paracétamol 1g : 8 unités, 24 000 FCFA.",
          imports: "Coût unitaire par produit (optionnel, SentrIA classe par quantité si absent)",
          figure: "180k",
          drawing: { kind: "ranked", labels: ["Paracétamol","24k","Amoxicilline","72k","Metformine","180k"] },
        },
        {
          title: "Quelle pharmacie sera à zéro avant votre prochaine livraison",
          does: "SentrIA estime le stock de chaque pharmacie à partir de vos livraisons moins ses ventes. Il signale les produits qui tombent à zéro avant votre prochaine livraison à cette pharmacie, pour que vous les envoyiez en premier.",
          example: "Pharmacie du Port : Paracétamol 1g, 2 jours restants. Votre prochaine livraison est dans 5 jours.",
          imports: "Livraisons et ventes par pharmacie et par produit, date de votre prochaine livraison",
          figure: "2",
          drawing: { kind: "bars", labels: ["Pharmacie du Port : 2 jours","livraison dans 5 jours"] },
        },
        {
          title: "Quelle pharmacie ne recommande plus",
          does: "SentrIA mesure l'écart entre les commandes de chaque pharmacie. Quand l'une reste silencieuse plus longtemps que son écart habituel, il la nomme, pour que vous l'appeliez cette semaine.",
          example: "Pharmacie Nord : aucune commande depuis 21 jours. Son écart habituel est de 7 jours.",
          imports: "Nom de la pharmacie et date de chaque commande ou livraison",
          figure: "21",
          drawing: { kind: "timeline", labels: ["21 jours sans commande","dernière commande","écart habituel 7 jours"] },
        },
      ],
      notDo: "SentrIA ne déplace pas de stock, ne passe pas de commande et n'émet pas de facture. Il propose des transferts, et c'est vous qui décidez. Il ne voit que les pharmacies dont vous importez les données.",
      stepsHeading: "Commencez en trois étapes",
      steps: [
        { title: "Exportez les données de votre réseau", text: "Un fichier par pharmacie : livraisons et ventes par produit et par jour. Un export de tableur suffit." },
        { title: "Importez-les une fois", text: "SentrIA associe les noms de pharmacies et de produits, puis estime ce que chaque pharmacie détient et ce qu'elle recommande." },
        { title: "Validez la liste du matin", text: "Les transferts et les alertes de réapprovisionnement sont classés par valeur. Vous validez ou écartez chacun. SentrIA ne déplace rien." },
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
      faqHeading: "Les questions des grossistes",
      faq: [
        { q: "SentrIA déplace-t-il du stock ou envoie-t-il des commandes ?", a: "Non. Il propose des transferts et des alertes de réapprovisionnement. Vous décidez, et vous passez chaque commande vous-même." },
        { q: "Que dois-je importer ?", a: "Par pharmacie : les livraisons et les ventes par produit et par jour, et vos dates de prochaine livraison. Un export de tableur suffit." },
        { q: "Et si seules certaines pharmacies partagent leurs données ?", a: "SentrIA travaille avec les pharmacies que vous importez, et ne voit pas les autres." },
        { q: "Faut-il des coûts unitaires ?", a: "Non. Sans eux, SentrIA classe par quantité. Avec eux, il classe par valeur en jeu." },
      ],
      decisionCard: {
        evidence: "Client Pharmacie du Marché : taux de service 83 % sur 7 jours vs cible 97 %. 4 SKU sous le minimum.",
        confidence: "90 % — basé sur l'historique des commandes et le journal de livraison.",
        impact: "Déficit de 17 % sur un client clé = révision contrat potentielle + 420 000 XOF d'exposition.",
        outcome: "Prioriser 4 SKU pour l'expédition d'aujourd'hui. Enquêter sur la chaîne du froid livraison 1142. Décision enregistrée.",
      },
    },
  },
  "exploitation-agricole": {
    en: {
      heading: "What SentrIA tells you before the loss starts",
      items: [
        {
          title: "How many hours before each lot starts to lose value",
          does: "From storage temperature and days stored, SentrIA estimates how much time you have before spoilage begins. It tells you which lot to move first and how urgent it is, in hours, not in vague warnings.",
          example: "Tomatoes Lot 7: 4 days in storage at 32°C. Estimated loss in 12 hours. Arrange delivery now.",
          imports: "Product, days in storage, storage temperature",
          figure: "12h",
          drawing: { kind: "timeline", labels: ["12 hours left","now","24 h"] },
        },
        {
          title: "When the storage gets too hot for what is inside",
          does: "Every product has a temperature threshold. When storage rises above it, you get a warning straight away, not when you check the logs the next morning.",
          example: "Cold room 3: reached 31°C. Tomatoes at risk of spoilage. Check temperature and ventilation now.",
          imports: "Storage temperature per lot or per room",
          figure: "31°",
          drawing: { kind: "timeline", labels: ["31 °C: alert","now","40 °C"] },
        },
        {
          title: "Lots past their safe window, by name, by days",
          does: "A lot that has stayed in storage longer than it safely can is flagged as critical: the product name, the number of days, and the instruction to deliver it first.",
          example: "Maize Lot 3: 9 days in storage. Critical. Deliver urgently before full loss.",
          imports: "Product and days in storage",
          figure: "9d",
          drawing: { kind: "bars", labels: ["Maize lot 3: 9 days","deliver before loss"] },
        },
      ],
      notDo: "SentrIA does not measure temperature itself. You enter it, or import it from your storage logs. The hours left are an estimate, not a guarantee, act sooner if in doubt.",
      decisionCard: {
        evidence: "Fertiliser NPK 20-10-10: 8 days of stock. Application rate: 20 kg/ha/day. Planting window opens in 5 days. Supplier lead: 7 days.",
        confidence: "86% — based on consumption log and planting calendar.",
        impact: "2-day gap during planting window = potential 15% yield reduction on 4 ha.",
        outcome: "Place fertiliser order today and confirm delivery date. Decision logged.",
      },
    },
    fr: {
      heading: "Ce que SentrIA vous dit avant que la perte commence",
      items: [
        {
          title: "Combien d'heures avant que chaque lot commence à se déprécier",
          does: "À partir de la température de stockage et des jours passés en stock, SentrIA estime le temps qu'il vous reste avant que la détérioration commence. Il vous dit quel lot déplacer en premier et l'urgence, en heures, pas en avertissements vagues.",
          example: "Tomates Lot 7 : 4 jours en stockage à 32°C. Perte estimée dans 12 heures. Organisez la livraison maintenant.",
          imports: "Produit, jours en stockage, température de stockage",
          figure: "12h",
          drawing: { kind: "timeline", labels: ["12 heures restantes","maintenant","24 h"] },
        },
        {
          title: "Quand le stockage est trop chaud pour ce qu'il contient",
          does: "Chaque produit a un seuil de température. Quand le stockage le dépasse, vous êtes prévenu immédiatement, pas le lendemain matin en consultant les relevés.",
          example: "Chambre froide 3 : a atteint 31°C. Tomates à risque de détérioration. Vérifiez la température et la ventilation maintenant.",
          imports: "Température de stockage par lot ou par chambre",
          figure: "31 °C",
          drawing: { kind: "timeline", labels: ["31 °C : alerte","maintenant","40 °C"] },
        },
        {
          title: "Les lots dépassé leur durée sûre, par nom, par nombre de jours",
          does: "Un lot resté en stockage plus longtemps qu'il ne peut le tolérer est signalé comme critique : le nom du produit, le nombre de jours, et l'instruction de le livrer en premier.",
          example: "Maïs Lot 3 : 9 jours en stockage. Critique. Livrez d'urgence avant la perte totale.",
          imports: "Produit et jours en stockage",
          figure: "9j",
          drawing: { kind: "bars", labels: ["Maïs lot 3 : 9 jours","livrer avant la perte"] },
        },
      ],
      notDo: "SentrIA ne mesure pas la température lui-même. Vous la saisissez, ou vous l'importez depuis vos relevés. Les heures restantes sont une estimation, pas une garantie, agissez plus tôt en cas de doute.",
      decisionCard: {
        evidence: "Engrais NPK 20-10-10 : 8 jours de stock. Cadence : 20 kg/ha/jour. Fenêtre de plantation dans 5 jours. Délai fournisseur : 7 jours.",
        confidence: "86 % — basé sur le registre de consommation et le calendrier de plantation.",
        impact: "Écart de 2 jours pendant la fenêtre de plantation = réduction potentielle de 15 % du rendement sur 4 ha.",
        outcome: "Passer la commande d'engrais aujourd'hui et confirmer la date de livraison. Décision enregistrée.",
      },
    },
  },
}

export const ACTIVITY_LIST: { slug: string; name: Record<"en" | "fr", string>; kicker?: Record<"en" | "fr", string>; teaser: Record<"en" | "fr", string> }[] = [
  {
    slug: "pharmacie",
    name: { en: "Pharmacy", fr: "Pharmacie" },
    kicker: { en: "Pharmacy", fr: "Pharmacie" },
    teaser: { en: "Days of stock and expiring batches.", fr: "Jours de stock et lots qui expirent." },
  },
  {
    slug: "grossiste-pharma",
    name: { en: "Pharmaceutical wholesaler", fr: "Grossiste pharma" },
    kicker: { en: "Wholesaler", fr: "Grossiste" },
    teaser: { en: "Transfers of unsold stock between your pharmacies.", fr: "Transferts de stock invendu entre vos pharmacies." },
  },
  {
    slug: "exploitation-agricole",
    name: { en: "Farm", fr: "Exploitation agricole" },
    kicker: { en: "Farm", fr: "Exploitation" },
    teaser: { en: "Days in storage and hours left before spoilage.", fr: "Jours en stockage et heures restantes avant la détérioration." },
  },
  {
    slug: "grossiste-distributeur",
    name: { en: "Wholesaler / Distributor", fr: "Grossiste / Distributeur" },
    kicker: { en: "Distributor", fr: "Distributeur" },
    teaser: { en: "Customers who stop reordering, spotted before you lose them.", fr: "Clients qui arrêtent de commander, détectés avant de les perdre." },
  },
]

export type SectorActivity = {
  slug: string
  name: Record<"en" | "fr", string>
  live: boolean
}

export type Sector = {
  key: string
  name: Record<"en" | "fr", string>
  direct: Record<"en" | "fr", string>
  activities: SectorActivity[]
}

// Hub page: one card per sector, speaks directly to the expert.
// "direct" is a single sentence addressed to the person who runs that business.
export const SECTOR_LIST: Sector[] = [
  {
    key: "health",
    name: { en: "Health", fr: "Santé" },
    direct: {
      en: "You run a pharmacy, clinic or lab. Your stock expires. Your deliveries run late. SentrIA tells you before it costs you.",
      fr: "Vous gérez une pharmacie, une clinique ou un laboratoire. Vos stocks périment. Vos livraisons arrivent en retard. SentrIA vous prévient avant que ça vous coûte.",
    },
    activities: [
      { slug: "pharmacie", name: { en: "Pharmacy", fr: "Pharmacie" }, live: true },
      { slug: "grossiste-pharma", name: { en: "Pharmaceutical wholesaler", fr: "Grossiste pharma" }, live: true },
      { slug: "clinique-hopital", name: { en: "Clinic / Hospital", fr: "Clinique / Hôpital" }, live: true },
      { slug: "laboratoire", name: { en: "Laboratory", fr: "Laboratoire" }, live: true },
      { slug: "veterinaire", name: { en: "Veterinary clinic", fr: "Clinique vétérinaire" }, live: true },
    ],
  },
  {
    key: "agriculture",
    name: { en: "Agriculture", fr: "Agriculture" },
    direct: {
      en: "You grow or store produce. Every extra day in storage risks a loss. SentrIA tracks each lot and warns you before it spoils.",
      fr: "Vous produisez ou stockez des récoltes. Chaque jour de trop en stockage risque une perte. SentrIA suit chaque lot et vous prévient avant la détérioration.",
    },
    activities: [
      { slug: "exploitation-agricole", name: { en: "Farm", fr: "Exploitation agricole" }, live: true },
      { slug: "cooperative-agricole", name: { en: "Agricultural cooperative", fr: "Coopérative agricole" }, live: false },
      { slug: "silo-stockage", name: { en: "Storage silo", fr: "Silo de stockage" }, live: false },
    ],
  },
  {
    key: "retail",
    name: { en: "Retail & Distribution", fr: "Commerce & Distribution" },
    direct: {
      en: "You supply dozens of points of sale. Some are running dry while others hold unsold stock. SentrIA finds the mismatch before you lose the sale.",
      fr: "Vous approvisionnez des dizaines de points de vente. Certains manquent de stock pendant que d'autres en ont trop. SentrIA trouve l'écart avant que vous perdiez la vente.",
    },
    activities: [
      { slug: "grossiste-distributeur", name: { en: "Wholesaler / Distributor", fr: "Grossiste / Distributeur" }, live: true },
      { slug: "chaine-magasins", name: { en: "Chain of stores", fr: "Chaîne de magasins" }, live: false },
      { slug: "supermarche-hypermarche", name: { en: "Supermarket / Hypermarket", fr: "Supermarché / Hypermarché" }, live: false },
    ],
  },
  {
    key: "logistics",
    name: { en: "Logistics", fr: "Logistique" },
    direct: {
      en: "You move, store and ship goods. A late container or a cold chain break costs more than the product. SentrIA tracks every lot and every deadline.",
      fr: "Vous déplacez, stockez et expédiez des marchandises. Un conteneur en retard ou une rupture de chaîne du froid coûte plus que le produit. SentrIA suit chaque lot et chaque échéance.",
    },
    activities: [
      { slug: "entrepot-manutention", name: { en: "Warehouse", fr: "Entrepôt / Manutention" }, live: false },
      { slug: "transport-distribution", name: { en: "Transport & Distribution", fr: "Transport & Distribution" }, live: false },
      { slug: "chaine-froid", name: { en: "Cold chain", fr: "Chaîne du froid" }, live: false },
      { slug: "port-conteneurs", name: { en: "Container port", fr: "Port à conteneurs" }, live: false },
    ],
  },
  {
    key: "energy",
    name: { en: "Energy", fr: "Énergie" },
    direct: {
      en: "You produce or distribute energy. Equipment downtime and stock gaps stop output. SentrIA monitors what you have and what you need.",
      fr: "Vous produisez ou distribuez de l'énergie. Les pannes et les ruptures de stock arrêtent la production. SentrIA surveille ce que vous avez et ce qu'il vous faut.",
    },
    activities: [
      { slug: "centrale-production", name: { en: "Production plant", fr: "Centrale de production" }, live: false },
      { slug: "distribution-energetique", name: { en: "Energy distribution", fr: "Distribution énergétique" }, live: false },
    ],
  },
  {
    key: "transportation",
    name: { en: "Transportation", fr: "Transport" },
    direct: {
      en: "You run a fleet of vehicles. A truck off the road costs you every hour. SentrIA tracks parts, maintenance windows and what needs ordering today.",
      fr: "Vous gérez une flotte de véhicules. Un camion immobilisé vous coûte chaque heure. SentrIA suit les pièces, les fenêtres de maintenance et ce qu'il faut commander aujourd'hui.",
    },
    activities: [
      { slug: "transporteur-routier", name: { en: "Road freight", fr: "Transporteur routier" }, live: false },
      { slug: "location-vehicules", name: { en: "Vehicle rental", fr: "Location de véhicules" }, live: false },
    ],
  },
]

// Example alerts shown in the hero of the pharmacy page. Sample numbers, real wording.
export const ALERT_PREVIEW: Record<"en" | "fr", { level: "critical" | "warning"; text: string }[]> = {
  en: [
    { level: "critical", text: "Amoxicillin 500mg: 4 days of stock. Promised delivery in 7 days, real average 11. Order today." },
    { level: "warning", text: "Paracetamol 500mg (Lot A47): expires in 18 days, 24 boxes at risk. Sell first or return." },
    { level: "warning", text: "COPHAC Pharma: promises 5 days, delivers in 9 on average. Order 4 days earlier." },
  ],
  fr: [
    { level: "critical", text: "Amoxicilline 500mg : 4 jours de stock. Livraison promise dans 7 jours, délai réel moyen de 11. Commandez aujourd'hui." },
    { level: "warning", text: "Paracétamol 500mg (Lot A47) : expire dans 18 jours, 24 boîtes à risque. Écoulez ou retournez." },
    { level: "warning", text: "COPHAC Pharma : promet 5 jours, livre en 9 en moyenne. Commandez 4 jours plus tôt." },
  ],
}

/* Live alerts shown on the sector heroes that have them. Pharmacy uses ALERT_PREVIEW. */
const CORE_SECTOR_ALERTS: Record<string, Record<"en" | "fr", { level: "critical" | "warning"; text: string }[]>> = {
  "grossiste-pharma": {
    en: [
      { level: "warning", text: "North Clinic: reordering 30 units of Metformin 500mg. Central Pharmacy: 34 units unsold. Suggested transfer: 30 units." },
      { level: "warning", text: "Metformin 500mg: 30 units, 180,000 FCFA. Amoxicillin 500mg: 12 units, 72,000 FCFA." },
      { level: "critical", text: "Amoxicillin 500mg: 12 units, 72,000 FCFA at risk. Transfer before it expires." },
    ],
    fr: [
      { level: "warning", text: "Clinique du Nord : a recommandé 30 unités de Metformine 500mg ce mois-ci. Pharmacie Centrale : 34 unités invendues. Transfert proposé : 30 unités." },
      { level: "warning", text: "Metformine 500mg : 30 unités, 180 000 FCFA. Amoxicilline 500mg : 12 unités, 72 000 FCFA." },
      { level: "critical", text: "Amoxicilline 500mg : 12 unités, 72 000 FCFA à risque. Transférez avant péremption." },
    ],
  },
  "exploitation-agricole": {
    en: [
      { level: "critical", text: "Tomatoes Lot 7: 4 days in storage at 32°C. Estimated loss in 12 hours. Arrange delivery now." },
      { level: "warning", text: "Cold room 3: reached 31°C. Tomatoes at risk of spoilage. Check temperature and ventilation now." },
      { level: "critical", text: "Maize Lot 3: 9 days in storage. Deliver urgently before full loss." },
    ],
    fr: [
      { level: "critical", text: "Tomates Lot 7 : 4 jours en stockage à 32°C. Perte estimée dans 12 heures. Organisez la livraison maintenant." },
      { level: "warning", text: "Chambre froide 3 : a atteint 31°C. Tomates à risque de détérioration. Vérifiez la température et la ventilation maintenant." },
      { level: "critical", text: "Maïs Lot 3 : 9 jours en stockage. Livrez d'urgence avant la perte totale." },
    ],
  },
}

/* The full set: the three live pages, and the activity pages that share their template. */
export const ACTIVITY_COPY: Record<string, Record<"en" | "fr", Copy>> = { ...CORE_ACTIVITY_COPY, ...MORE_ACTIVITY_COPY }
export const CAPABILITIES: Record<string, Record<"en" | "fr", Capabilities>> = { ...CORE_CAPABILITIES, ...MORE_CAPABILITIES }
export const SECTOR_ALERTS: Record<string, Record<"en" | "fr", { level: "critical" | "warning"; text: string }[]>> = { ...CORE_SECTOR_ALERTS, ...MORE_SECTOR_ALERTS }
