import { ACTIVITY_CARDS, type ActivityCard } from "./africa-activity-cards"

type L = Record<"en" | "fr", string>

export type HubSector = "health" | "agriculture" | "distribution" | "logistics" | "industry" | "transportation" | "energy"

/* What SentrIA offers, by sector: the activities of the app's catalog (lib/activities.ts in the app repo),
   in the app's order. Names and lines are the app's own. An activity with a page of its own links there.
   The others link to the built page of their sector until their own page is written. */
export const SECTOR_ACTIVITIES: Record<HubSector, string[]> = {
  health: ["pharmacie", "grossiste-pharma", "clinique-hopital", "laboratoire", "veterinaire"],
  agriculture: ["exploitation-agricole", "cooperative-agricole", "silo-stockage"],
  distribution: ["grossiste-distributeur", "supermarche-hypermarche", "chaine-magasins", "epicerie-proximite"],
  logistics: ["port-conteneurs", "entrepot-manutention", "transport-distribution", "preparation-expedition", "chaine-froid", "plusieurs-activites"],
  industry: ["usine-production", "atelier-soustraitance", "usine-agroalimentaire"],
  transportation: ["transporteur-routier", "flotte-entreprise", "location-vehicules"],
  energy: ["centrale-production", "generateurs-secours", "distribution-energetique"],
}

/* The built page a sector's activities fall back to, until an activity has a page of its own. */
const SECTOR: Record<HubSector, { page: L }> = {
  health: { page: { en: "/activities/clinic", fr: "/fr/activites/clinique" } },
  agriculture: { page: { en: "/activities/farm", fr: "/fr/activites/exploitation-agricole" } },
  distribution: { page: { en: "/activities/retail", fr: "/fr/activites/commerce" } },
  logistics: { page: { en: "/activities/logistics", fr: "/fr/activites/logistique" } },
  industry: { page: { en: "/activities/industry", fr: "/fr/activites/industrie" } },
  transportation: { page: { en: "/activities/transportation", fr: "/fr/activites/transport" } },
  energy: { page: { en: "/activities/energy", fr: "/fr/activites/energie" } },
}

/* One picture per activity, and no picture used twice on the site. Photos from Unsplash (credit in `by`). */
const PHOTO: Record<string, { photo: string; alt: L; by: string; user: string }> = {
  "clinique-hopital": { photo: "/africa/hq/card-clinique.jpg", alt: { en: "Hospital corridor", fr: "Couloir d'hôpital" }, by: "Gonzalo Kenny", user: "gonzakenny" },
  laboratoire: { photo: "/africa/hq/card-laboratoire.jpg", alt: { en: "Microscope in a laboratory", fr: "Microscope en laboratoire" }, by: "Logan Gutierrez", user: "photosoflogan" },
  veterinaire: { photo: "/africa/hq/card-veterinaire.jpg", alt: { en: "Vet giving an injection to a dog", fr: "Vétérinaire qui pique un chien" }, by: "Alexander Mass", user: "alexandermassph" },
  "cooperative-agricole": { photo: "/africa/hq/card-cooperative.jpg", alt: { en: "Metal grain silos under a clear sky", fr: "Silos à grain métalliques sous un ciel clair" }, by: "Alex Quezada", user: "alex_quezada" },
  "silo-stockage": { photo: "/africa/hq/card-silo.jpg", alt: { en: "Tall metal silos with ladders", fr: "Grands silos métalliques avec échelles" }, by: "Grant Ritchie", user: "grantritchie" },
  "grossiste-distributeur": { photo: "/africa/hq/card-grossiste-distributeur.jpg", alt: { en: "Cardboard boxes stacked in a warehouse", fr: "Cartons empilés dans un entrepôt" }, by: "Wonderlane", user: "wonderlane" },
  "supermarche-hypermarche": { photo: "/africa/hq/card-supermarche.jpg", alt: { en: "Shopping cart in a grocery aisle", fr: "Chariot dans un rayon de supermarché" }, by: "Eduardo Soares", user: "eduschadesoares" },
  "chaine-magasins": { photo: "/africa/hq/card-chaine-magasins.jpg", alt: { en: "Refrigerated display in a grocery store", fr: "Vitrine réfrigérée dans un magasin" }, by: "Eduardo Soares", user: "eduschadesoares" },
  "epicerie-proximite": { photo: "/africa/hq/card-epicerie.jpg", alt: { en: "Products on shelves in a small store", fr: "Produits sur des étagères" }, by: "Eduardo Soares", user: "eduschadesoares" },
  "port-conteneurs": { photo: "/africa/hq/card-port.jpg", alt: { en: "Crane loading containers onto a ship", fr: "Grue chargeant des conteneurs sur un navire" }, by: "Sorin Basangeac", user: "sorinbasangeac" },
  "entrepot-manutention": { photo: "/africa/hq/card-entrepot.jpg", alt: { en: "Tall racks of boxes in a warehouse", fr: "Grands rayonnages de cartons dans un entrepôt" }, by: "Jacques Dillies", user: "jacques_dillies" },
  "transport-distribution": { photo: "/africa/hq/card-transport-distribution.jpg", alt: { en: "Van driving down a street at night", fr: "Camionnette dans une rue la nuit" }, by: "Michal Lauko", user: "jingspiral" },
  "preparation-expedition": { photo: "/africa/hq/card-preparation.jpg", alt: { en: "Pallets of boxes in a warehouse", fr: "Palettes de cartons dans un entrepôt" }, by: "Ali Mkumbwa", user: "mkumbwajr" },
  "chaine-froid": { photo: "/africa/hq/card-chaine-froid.jpg", alt: { en: "Frozen fish stacked in cold storage", fr: "Poisson congelé en chambre froide" }, by: "Bastian Ragas", user: "baslightyearrr" },
  "plusieurs-activites": { photo: "/africa/hq/card-plusieurs.jpg", alt: { en: "Aerial view of a warehouse with solar panels and trucks", fr: "Vue aérienne d'un entrepôt avec panneaux solaires et camions" }, by: "Bernd Dittrich", user: "hdbernd" },
  "usine-production": { photo: "/africa/hq/card-usine-production.jpg", alt: { en: "Machines on a factory production line", fr: "Machines sur une chaîne de production" }, by: "Homa Appliances", user: "homaappliances" },
  "atelier-soustraitance": { photo: "/africa/hq/card-atelier.jpg", alt: { en: "Machine cutting metal with sparks", fr: "Machine qui découpe du métal, étincelles" }, by: "Cemrecan Yurtman", user: "cmrcn_" },
  "usine-agroalimentaire": { photo: "/africa/hq/card-usine-agroalimentaire.jpg", alt: { en: "Factory floor with production machines", fr: "Atelier de production avec machines" }, by: "Arno Senoner", user: "arnosenoner" },
  "transporteur-routier": { photo: "/africa/hq/card-transporteur.jpg", alt: { en: "Freight truck on a bridge at dawn", fr: "Camion de fret sur un pont à l'aube" }, by: "Taylor", user: "xoutcastx" },
  "flotte-entreprise": { photo: "/africa/hq/card-flotte.jpg", alt: { en: "Parking lot full of cars", fr: "Parking plein de voitures" }, by: "Laryssa Ares", user: "laryssaares" },
  "location-vehicules": { photo: "/africa/hq/card-location.jpg", alt: { en: "Aerial view of a parking lot", fr: "Vue aérienne d'un parking" }, by: "Ryan Searle", user: "ryansearle" },
  "centrale-production": { photo: "/africa/hq/card-centrale.jpg", alt: { en: "Cooling towers behind grass", fr: "Tours de refroidissement derrière des herbes" }, by: "Kris Tian", user: "kris_tian" },
  "generateurs-secours": { photo: "/africa/hq/card-generateurs.jpg", alt: { en: "Factory with machinery", fr: "Usine avec machines" }, by: "Abhijeet Gaikwad", user: "abhijeetgaikwad10" },
  "distribution-energetique": { photo: "/africa/hq/card-distribution-energetique.jpg", alt: { en: "Electrical transformer station", fr: "Poste de transformation électrique" }, by: "Gez Xavier Mansfield", user: "gezxaviermansfield" },
}

/* Activities that have a page of their own. */
const OWN_PAGE: Record<string, L> = {
  "clinique-hopital": { en: "/activities/clinic", fr: "/fr/activites/clinique" },
  laboratoire: { en: "/activities/laboratory", fr: "/fr/activites/laboratoire" },
  veterinaire: { en: "/activities/veterinary", fr: "/fr/activites/veterinaire" },
}

/* Name and line of each activity, from the app's catalog. Pharmacy, wholesaler and farm are in ACTIVITY_CARDS already. */
const APP: Record<string, { name: L; line: L }> = {
  "usine-production": { name: { en: "Production plant", fr: "Usine de production" }, line: { en: "Production lines and critical machines", fr: "Lignes de fabrication et machines critiques" } },
  "atelier-soustraitance": { name: { en: "Workshop / subcontracting", fr: "Atelier / sous-traitance" }, line: { en: "Production on behalf of others", fr: "Production pour le compte de tiers" } },
  "usine-agroalimentaire": { name: { en: "Food processing plant", fr: "Usine agroalimentaire" }, line: { en: "Production under hygiene constraints", fr: "Production avec contraintes sanitaires" } },
  "clinique-hopital": { name: { en: "Clinic / Hospital", fr: "Clinique / Hôpital" }, line: { en: "Care facility and clinical stock", fr: "Établissement de soins et stocks cliniques" } },
  laboratoire: { name: { en: "Laboratory", fr: "Laboratoire" }, line: { en: "Tests, reagents and samples", fr: "Analyses, réactifs et échantillons" } },
  veterinaire: { name: { en: "Veterinary", fr: "Vétérinaire" }, line: { en: "Veterinary drugs, expiry and stock", fr: "Médicaments vétérinaires, péremption et stock" } },
  "cooperative-agricole": { name: { en: "Agricultural cooperative", fr: "Coopérative agricole" }, line: { en: "Shared operations between several growers", fr: "Mutualisation entre plusieurs producteurs" } },
  "silo-stockage": { name: { en: "Silo / harvest storage", fr: "Silo / stockage de récolte" }, line: { en: "Keeping the crop before processing or sale", fr: "Conservation avant transformation ou vente" } },
  "grossiste-distributeur": { name: { en: "Wholesaler / distributor", fr: "Grossiste / distributeur" }, line: { en: "Spots customers drifting away or not paying", fr: "Clients qui décrochent ou ne paient pas" } },
  "supermarche-hypermarche": { name: { en: "Supermarket / hypermarket", fr: "Supermarché / hypermarché" }, line: { en: "A large store with many aisles", fr: "Grande surface avec rayons multiples" } },
  "chaine-magasins": { name: { en: "Retail chain", fr: "Chaîne de magasins" }, line: { en: "Moves stock between stores before reordering", fr: "Transferts entre magasins avant de racheter" } },
  "epicerie-proximite": { name: { en: "Grocery / convenience store", fr: "Épicerie / commerce de proximité" }, line: { en: "A small local shop", fr: "Commerce local à taille humaine" } },
  "port-conteneurs": { name: { en: "Port & containers", fr: "Port & conteneurs" }, line: { en: "Port operations and container handling", fr: "Opérations portuaires et manutention de conteneurs" } },
  "entrepot-manutention": { name: { en: "Warehouse & handling", fr: "Entrepôt & manutention" }, line: { en: "Storage and movement of goods", fr: "Stockage et mouvements de marchandises" } },
  "transport-distribution": { name: { en: "Transport & distribution", fr: "Transport & distribution" }, line: { en: "Delivery to several drop points", fr: "Acheminement vers plusieurs points de livraison" } },
  "preparation-expedition": { name: { en: "Picking & dispatch", fr: "Préparation & expédition" }, line: { en: "Processing and sending orders", fr: "Traitement et envoi des commandes" } },
  "chaine-froid": { name: { en: "Cold chain", fr: "Chaîne du froid" }, line: { en: "Temperature-controlled logistics", fr: "Logistique sous température dirigée" } },
  "plusieurs-activites": { name: { en: "Several activities", fr: "Plusieurs activités" }, line: { en: "A combination of these operations", fr: "Une combinaison de ces opérations" } },
  "centrale-production": { name: { en: "Power plant", fr: "Centrale de production" }, line: { en: "Large-scale power generation", fr: "Production d'énergie à grande échelle" } },
  "generateurs-secours": { name: { en: "Backup generators", fr: "Générateurs de secours" }, line: { en: "Standby power and continuity", fr: "Alimentation de secours et continuité" } },
  "distribution-energetique": { name: { en: "Power distribution", fr: "Distribution énergétique" }, line: { en: "The grid and how power gets there", fr: "Réseau et acheminement de l'énergie" } },
  "transporteur-routier": { name: { en: "Road haulier", fr: "Transporteur routier" }, line: { en: "Haulage for third parties", fr: "Transport pour compte d'autrui" } },
  "flotte-entreprise": { name: { en: "Company fleet", fr: "Flotte d'entreprise" }, line: { en: "Vehicles used for your own operation", fr: "Véhicules utilisés pour votre propre activité" } },
  "location-vehicules": { name: { en: "Vehicle rental", fr: "Location de véhicules" }, line: { en: "A fleet made available to customers", fr: "Parc mis à disposition de clients" } },
}

function build(sector: HubSector, id: string): ActivityCard {
  const existing = ACTIVITY_CARDS.find((c) => c.id === id)
  if (existing) return existing
  const s = SECTOR[sector]
  const a = APP[id]
  const p = PHOTO[id]
  return { id, href: OWN_PAGE[id] ?? s.page, name: a.name, line: a.line, photo: p.photo, alt: p.alt, by: p.by, user: p.user }
}

export function cardsFor(sector: HubSector): ActivityCard[] {
  return SECTOR_ACTIVITIES[sector].map((id) => build(sector, id))
}
