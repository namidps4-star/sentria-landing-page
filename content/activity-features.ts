/* One unique feature block per activity, in the same card style as the pharmacy and wholesaler blocks.
   Example figures, made up. Money values are USD examples; each visitor sees them in their own currency
   (see components/activity-feature-block.tsx). Each feature covers something the activity's own copy does not. */
export type FeatureRow = { cells: [string, string]; usd?: number; status: string; warn?: boolean }
export type ActivityFeature = {
  slug: string
  kind: "money" | "pct"
  copy: Record<"en" | "fr", { kicker: string; h2: [string, string]; lead: string; note: string; cta: string }>
  card: Record<"en" | "fr", {
    kicker: string
    title: string
    bigLabel: string
    big: string
    bars: { label: string; usd?: number; pct?: number; text?: string }[]
    rowHead: [string, string, string]
    rows: FeatureRow[]
    tiles: [string, string][]
    action: [string, string]
  }>
}

const NOTE = { en: "Example screen. The numbers are made up.", fr: "Écran d'exemple. Les chiffres sont fictifs." }
const CTA = { en: "Book a demo →", fr: "Demander une démo →" }

export const ACTIVITY_FEATURES: ActivityFeature[] = [
  {
    slug: "cooperative-agricole",
    kind: "money",
    copy: {
      en: { kicker: "Payments to members", h2: ["Pay each member", "for the lots you hold."], lead: "SentrIA lists what the cooperative owes each member for stored lots, when each payment falls due, and which payments are late, so no grower waits for their money.", note: NOTE.en, cta: CTA.en },
      fr: { kicker: "Paiements aux adhérents", h2: ["Payez chaque adhérent", "pour les lots que vous gardez."], lead: "SentrIA liste ce que la coopérative doit à chaque adhérent pour les lots stockés, la date d'échéance de chaque paiement et ceux qui sont en retard, pour qu'aucun producteur n'attende son argent.", note: NOTE.fr, cta: CTA.fr },
    },
    card: {
      en: { kicker: "Owed to members", title: "Payments due this month", bigLabel: "Total owed", big: "51,400", bars: [{ label: "Due this week", usd: 18400 }, { label: "Due next month", usd: 26700 }, { label: "Overdue", usd: 6300 }], rowHead: ["Member", "Lot", "Owed"], rows: [{ cells: ["Diallo", "Lot 4 · maize"], usd: 12400, status: "Pay this week" }, { cells: ["Mensah", "Lot 2 · beans"], usd: 6300, status: "Overdue 5 days", warn: true }, { cells: ["Kone", "Lot 6 · rice"], usd: 8100, status: "Due in 20 days" }], tiles: [["3", "members owed"], ["1", "overdue"]], action: ["Pay Mensah", "today"] },
      fr: { kicker: "Dû aux adhérents", title: "Paiements dus ce mois-ci", bigLabel: "Total dû", big: "51 400", bars: [{ label: "Dû cette semaine", usd: 18400 }, { label: "Dû le mois prochain", usd: 26700 }, { label: "En retard", usd: 6300 }], rowHead: ["Adhérent", "Lot", "Dû"], rows: [{ cells: ["Diallo", "Lot 4 · maïs"], usd: 12400, status: "Payer cette semaine" }, { cells: ["Mensah", "Lot 2 · haricots"], usd: 6300, status: "En retard de 5 jours", warn: true }, { cells: ["Kone", "Lot 6 · riz"], usd: 8100, status: "Échu dans 20 jours" }], tiles: [["3", "adhérents dus"], ["1", "en retard"]], action: ["Payer Mensah", "aujourd'hui"] },
    },
  },
  {
    slug: "silo-stockage",
    kind: "pct",
    copy: {
      en: { kicker: "Silo space", h2: ["Know the space left", "before the next harvest."], lead: "SentrIA compares what each silo holds with its capacity and the next harvest. It shows which silo fills first, so you can plan the trucks and the storage before the grain arrives.", note: NOTE.en, cta: CTA.en },
      fr: { kicker: "Espace des silos", h2: ["Sachez l'espace restant", "avant la prochaine récolte."], lead: "SentrIA compare ce que chaque silo contient à sa capacité et à la prochaine récolte. Il montre le silo qui se remplit en premier, pour prévoir les camions et le stockage avant l'arrivée du grain.", note: NOTE.fr, cta: CTA.fr },
    },
    card: {
      en: { kicker: "Capacity", title: "Space left, silo by silo", bigLabel: "Free space", big: "38 t", bars: [{ label: "Silo A", pct: 72, text: "72%" }, { label: "Silo B", pct: 91, text: "91%" }, { label: "Silo C", pct: 45, text: "45%" }], rowHead: ["Silo", "Stored", "Status"], rows: [{ cells: ["Silo A", "144 t of 200 t"], status: "Fits the harvest" }, { cells: ["Silo B", "182 t of 200 t"], status: "Full in 4 days", warn: true }, { cells: ["Silo C", "90 t of 200 t"], status: "Room for 110 t" }], tiles: [["6 days", "until the harvest"], ["Silo B", "full in 4 days"]], action: ["Move 20 t", "from B to C"] },
      fr: { kicker: "Capacité", title: "Espace restant, silo par silo", bigLabel: "Espace libre", big: "38 t", bars: [{ label: "Silo A", pct: 72, text: "72 %" }, { label: "Silo B", pct: 91, text: "91 %" }, { label: "Silo C", pct: 45, text: "45 %" }], rowHead: ["Silo", "Stocké", "Statut"], rows: [{ cells: ["Silo A", "144 t sur 200 t"], status: "Suffit pour la récolte" }, { cells: ["Silo B", "182 t sur 200 t"], status: "Plein dans 4 jours", warn: true }, { cells: ["Silo C", "90 t sur 200 t"], status: "Place pour 110 t" }], tiles: [["6 jours", "avant la récolte"], ["Silo B", "plein dans 4 jours"]], action: ["Transférer 20 t", "de B vers C"] },
    },
  },
  {
    slug: "grossiste-distributeur",
    kind: "money",
    copy: {
      en: { kicker: "Unpaid invoices", h2: ["Know who owes you,", "and how long."], lead: "SentrIA lists the invoices still unpaid, sorts them by age, and flags the customers who are over their credit limit, so the team calls the right account first.", note: NOTE.en, cta: CTA.en },
      fr: { kicker: "Factures impayées", h2: ["Sachez qui vous doit,", "et depuis quand."], lead: "SentrIA liste les factures encore impayées, les classe par ancienneté et signale les clients qui dépassent leur plafond de crédit, pour que l'équipe appelle le bon compte en premier.", note: NOTE.fr, cta: CTA.fr },
    },
    card: {
      en: { kicker: "Money owed", title: "Unpaid invoices, by age", bigLabel: "Owed to you", big: "58,400", bars: [{ label: "0–30 days", usd: 31000 }, { label: "31–60 days", usd: 16200 }, { label: "Over 60 days", usd: 11200 }], rowHead: ["Customer", "Invoice", "Owed"], rows: [{ cells: ["Pharmacie du Marché", "#2214 · 74 days"], usd: 7200, status: "Call today", warn: true }, { cells: ["Clinique Sud", "#2231 · 41 days"], usd: 5400, status: "Send reminder" }, { cells: ["Groupe Nord", "#2240 · 12 days"], usd: 9800, status: "On track" }], tiles: [["3", "customers owing"], ["2", "over credit limit"]], action: ["Call Marché", "today"] },
      fr: { kicker: "Argent dû", title: "Factures impayées, par ancienneté", bigLabel: "Dû par vos clients", big: "58 400", bars: [{ label: "0–30 jours", usd: 31000 }, { label: "31–60 jours", usd: 16200 }, { label: "Plus de 60 jours", usd: 11200 }], rowHead: ["Client", "Facture", "Dû"], rows: [{ cells: ["Pharmacie du Marché", "n° 2214 · 74 jours"], usd: 7200, status: "Appeler aujourd'hui", warn: true }, { cells: ["Clinique Sud", "n° 2231 · 41 jours"], usd: 5400, status: "Envoyer un rappel" }, { cells: ["Groupe Nord", "n° 2240 · 12 jours"], usd: 9800, status: "Dans les délais" }], tiles: [["3", "clients qui doivent"], ["2", "au-delà du plafond"]], action: ["Appeler Marché", "aujourd'hui"] },
    },
  },
  {
    slug: "supermarche-hypermarche",
    kind: "pct",
    copy: {
      en: { kicker: "Promotions", h2: ["Will the promotion sell", "before it ends?"], lead: "SentrIA tracks how fast each promoted product sells against its end date. It shows which promotion will run out of time, so you can move it to the front before the offer closes.", note: NOTE.en, cta: CTA.en },
      fr: { kicker: "Promotions", h2: ["La promotion se vendra-t-elle", "avant sa fin ?"], lead: "SentrIA suit la vitesse de vente de chaque produit en promotion par rapport à sa date de fin. Il montre la promotion qui manquera de temps, pour la mettre en tête de rayon avant la fin de l'offre.", note: NOTE.fr, cta: CTA.fr },
    },
    card: {
      en: { kicker: "Promotion stock", title: "Sold so far, week by week", bigLabel: "Promo stock sold", big: "62%", bars: [{ label: "Week 1", pct: 35, text: "35%" }, { label: "Week 2", pct: 55, text: "55%" }, { label: "Week 3", pct: 62, text: "62%" }], rowHead: ["Product", "Ends", "Status"], rows: [{ cells: ["Yoghurt 2-pack", "28 Nov"], status: "Sells out in time" }, { cells: ["Cooking oil 2 L", "25 Nov"], status: "Behind: 40% left", warn: true }, { cells: ["Biscuits 400 g", "30 Nov"], status: "Sells out in time" }], tiles: [["2 days", "until the oil promo ends"], ["40%", "oil stock left"]], action: ["Move oil", "to the front shelf"] },
      fr: { kicker: "Stock en promotion", title: "Vendu jusqu'ici, semaine par semaine", bigLabel: "Stock en promotion vendu", big: "62 %", bars: [{ label: "Semaine 1", pct: 35, text: "35 %" }, { label: "Semaine 2", pct: 55, text: "55 %" }, { label: "Semaine 3", pct: 62, text: "62 %" }], rowHead: ["Produit", "Fin", "Statut"], rows: [{ cells: ["Yaourt, pack de 2", "28 nov."], status: "Écoulé à temps" }, { cells: ["Huile de cuisson 2 L", "25 nov."], status: "En retard : 40 % restants", warn: true }, { cells: ["Biscuits 400 g", "30 nov."], status: "Écoulé à temps" }], tiles: [["2 jours", "avant la fin de l'huile"], ["40 %", "du stock d'huile restant"]], action: ["Déplacer l'huile", "en tête de rayon"] },
    },
  },
  {
    slug: "chaine-magasins",
    kind: "money",
    copy: {
      en: { kicker: "Missing stock", h2: ["Find the stock that is", "missing, shop by shop."], lead: "SentrIA compares each shop's count with what its sales and deliveries say should be there. It shows the shops where stock is missing, and how much, so you can recount the right one.", note: NOTE.en, cta: CTA.en },
      fr: { kicker: "Stock manquant", h2: ["Trouvez le stock manquant,", "magasin par magasin."], lead: "SentrIA compare le comptage de chaque magasin à ce que ses ventes et ses livraisons laissent attendre. Il montre les magasins où du stock manque, et combien, pour recompter le bon.", note: NOTE.fr, cta: CTA.fr },
    },
    card: {
      en: { kicker: "Missing stock", title: "Count against expected, shop by shop", bigLabel: "Missing this month", big: "4,870", bars: [{ label: "Shop A", pct: 31, text: "3.1%" }, { label: "Shop B", pct: 12, text: "1.2%" }, { label: "Shop C", pct: 4, text: "0.4%" }], rowHead: ["Shop", "Count", "Missing"], rows: [{ cells: ["Shop A", "412 counted, 436 expected"], usd: 2650, status: "Recount today", warn: true }, { cells: ["Shop B", "188 counted, 190 expected"], usd: 480, status: "Within normal" }, { cells: ["Shop C", "301 counted, 302 expected"], usd: 90, status: "Within normal" }], tiles: [["3", "shops checked"], ["3.1%", "loss at Shop A"]], action: ["Recount", "Shop A today"] },
      fr: { kicker: "Stock manquant", title: "Comptage face au prévu, magasin par magasin", bigLabel: "Manquant ce mois-ci", big: "4 870", bars: [{ label: "Magasin A", pct: 31, text: "3,1 %" }, { label: "Magasin B", pct: 12, text: "1,2 %" }, { label: "Magasin C", pct: 4, text: "0,4 %" }], rowHead: ["Magasin", "Compté", "Manquant"], rows: [{ cells: ["Magasin A", "412 comptés, 436 prévus"], usd: 2650, status: "Recompter aujourd'hui", warn: true }, { cells: ["Magasin B", "188 comptés, 190 prévus"], usd: 480, status: "Dans la norme" }, { cells: ["Magasin C", "301 comptés, 302 prévus"], usd: 90, status: "Dans la norme" }], tiles: [["3", "magasins contrôlés"], ["3,1 %", "de perte au magasin A"]], action: ["Recompter", "magasin A aujourd'hui"] },
    },
  },
]
