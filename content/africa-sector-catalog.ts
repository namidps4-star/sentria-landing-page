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

/* The photo of each sector, and the built page a sector's activities fall back to. */
const SECTOR: Record<HubSector, { photo: string; alt: L; page: L }> = {
  health: { photo: "/hub-photos/health-hero.jpg", alt: { en: "Health care setting", fr: "Cadre de soins" }, page: { en: "/activities/clinic", fr: "/fr/activites/clinique" } },
  agriculture: { photo: "/africa/activities/farm.jpg", alt: { en: "Two people working in a crop field", fr: "Deux personnes travaillent dans un champ" }, page: { en: "/activities/farm", fr: "/fr/activites/exploitation-agricole" } },
  distribution: { photo: "/africa/activities/retail.jpg", alt: { en: "Woman at a fruit market stall", fr: "Femme devant un étal de fruits au marché" }, page: { en: "/activities/retail", fr: "/fr/activites/commerce" } },
  logistics: { photo: "/africa/activities/logistics.jpg", alt: { en: "Stacked orange shipping containers against a deep blue sky", fr: "Conteneurs orange empilés sous un ciel bleu profond" }, page: { en: "/activities/logistics", fr: "/fr/activites/logistique" } },
  industry: { photo: "/africa/activities/industry.jpg", alt: { en: "Cooling towers and smoke stacks at an industrial plant", fr: "Tours de refroidissement et cheminées d'une usine" }, page: { en: "/activities/industry", fr: "/fr/activites/industrie" } },
  transportation: { photo: "/africa/activities/transport.jpg", alt: { en: "Cars driving on a highway at sunset", fr: "Voitures sur une autoroute au coucher du soleil" }, page: { en: "/activities/transportation", fr: "/fr/activites/transport" } },
  energy: { photo: "/africa/activities/energy.jpg", alt: { en: "Close-up of a solar panel", fr: "Gros plan sur un panneau solaire" }, page: { en: "/activities/energy", fr: "/fr/activites/energie" } },
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
  return { id, href: OWN_PAGE[id] ?? s.page, name: a.name, line: a.line, photo: s.photo, alt: s.alt, by: "Unsplash", user: "unsplash" }
}

export function cardsFor(sector: HubSector): ActivityCard[] {
  return SECTOR_ACTIVITIES[sector].map((id) => build(sector, id))
}
