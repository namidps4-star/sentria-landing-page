/* The five wholesale features shown on the wholesaler page. */
export type WholesaleFeature = {
  key: string
  alt: { en: string; fr: string }
  kicker: { en: string; fr: string }
  h2: { en: [string, string]; fr: [string, string] }
  lead: { en: string; fr: string }
  note: { en: string; fr: string }
}

export const WHOLESALE_FEATURES: WholesaleFeature[] = [
  {
    key: "abc",
    alt: {
      en: "Mockup of a stock ranking screen: products grouped into classes A, B and C by value",
      fr: "Maquette d’un écran de classement du stock : produits regroupés en classes A, B et C selon la valeur",
    },
    kicker: { en: "Stock ranking", fr: "Classement du stock" },
    h2: { en: ["Count first the products", "that carry the value."], fr: ["Comptez d'abord les produits", "qui portent la valeur."] },
    lead: {
      en: "SentrIA ranks your products by value and puts each one in class A, B or C. Class A is counted every week, and class C is ordered on demand.",
      fr: "SentrIA classe vos produits par valeur, en classe A, B ou C. La classe A est comptée chaque semaine, la classe C est commandée à la demande.",
    },
    note: {
      en: "Example screen. The numbers are made up.",
      fr: "Écran d’exemple. Les chiffres sont fictifs.",
    },
  },
  {
    key: "forecast",
    alt: {
      en: "Mockup of a demand forecast: twelve weeks of sales, a four-week forecast and a suggested order",
      fr: "Maquette d’une prévision de la demande : douze semaines de ventes, une prévision sur quatre semaines et une commande proposée",
    },
    kicker: { en: "Demand forecast", fr: "Prévision de la demande" },
    h2: { en: ["Order what will sell,", "not what sold last month."], fr: ["Commandez ce qui va se vendre,", "pas ce qui s'est vendu le mois dernier."] },
    lead: {
      en: "SentrIA projects each product's sales forward, adds the supplier's real delivery time and a safety stock, and suggests the order.",
      fr: "SentrIA projette les ventes de chaque produit, ajoute le délai de livraison réel du fournisseur et un stock de sécurité, puis propose la commande.",
    },
    note: {
      en: "Example screen. The numbers are made up.",
      fr: "Écran d’exemple. Les chiffres sont fictifs.",
    },
  },
  {
    key: "credits",
    alt: {
      en: "Mockup of expiry credits: returned batches, their credit value and the claim deadline",
      fr: "Maquette des avoirs sur péremption : lots retournés, leur valeur d’avoir et la date limite de réclamation",
    },
    kicker: { en: "Expiry credits", fr: "Avoirs sur péremption" },
    h2: { en: ["Claim the credit", "before the deadline passes."], fr: ["Réclamez l'avoir", "avant que la date limite ne passe."] },
    lead: {
      en: "Each expired batch is matched to the distributor's return report. SentrIA flags the deadline in time, so the credit is claimed instead of written off.",
      fr: "Chaque lot périmé est rapproché du relevé de retour du distributeur. SentrIA signale la date limite à temps : l’avoir est réclamé au lieu d’être passé en perte.",
    },
    note: {
      en: "Example screen. The numbers are made up.",
      fr: "Écran d’exemple. Les chiffres sont fictifs.",
    },
  },
  {
    key: "sensors",
    alt: {
      en: "Mockup of pallet temperatures: one pallet above its range, with the time and place of the breach",
      fr: "Maquette des températures par palette : une palette hors plage, avec l’heure et le lieu de la rupture",
    },
    kicker: { en: "Cold chain", fr: "Chaîne du froid" },
    h2: { en: ["See which pallet broke", "the cold chain, and where."], fr: ["Voyez quelle palette a rompu", "la chaîne du froid, et où."] },
    lead: {
      en: "A logger on each pallet records its temperature. SentrIA shows when a pallet left its range, for how long and where, so you check the right stock.",
      fr: "Un enregistreur sur chaque palette mesure sa température. SentrIA indique quand une palette est sortie de sa plage, pendant combien de temps et où, pour contrôler le bon stock.",
    },
    note: {
      en: "The loggers come from a hardware partner. SentrIA reads their data. Example screen, numbers made up.",
      fr: "Les enregistreurs viennent d’un partenaire matériel. SentrIA lit leurs données. Écran d’exemple, chiffres fictifs.",
    },
  },
  {
    key: "hubs",
    alt: {
      en: "Mockup of stock-outs by distance: a regional hub with facilities at increasing distances",
      fr: "Maquette des ruptures selon la distance : un dépôt régional avec des établissements à distances croissantes",
    },
    kicker: { en: "Regional hubs", fr: "Dépôts régionaux" },
    h2: { en: ["Supply your far pharmacies", "from a closer hub."], fr: ["Approvisionnez vos pharmacies éloignées", "depuis un dépôt plus proche."] },
    lead: {
      en: "SentrIA shows stock-outs by distance from supply. The further a pharmacy is, the more often it runs out, which is the evidence for a closer hub.",
      fr: "SentrIA montre les ruptures selon la distance au point d’approvisionnement. Plus une pharmacie est loin, plus elle manque de stock : c’est la preuve pour un dépôt plus proche.",
    },
    note: {
      en: "The hub is a logistics decision. SentrIA shows the evidence. Example screen, numbers made up.",
      fr: "Le dépôt est une décision logistique. SentrIA montre les preuves. Écran d’exemple, chiffres fictifs.",
    },
  },
]
