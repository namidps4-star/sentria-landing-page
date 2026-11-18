// The Africa activity pages that share the pharmacy template: hero, three rows with their own drawing,
// a worked example, three steps and four questions. One block per activity, EN and FR.
// The numbers are examples. Names and lines come from the app's own catalogue (lib/activities.ts).
import type { Copy } from "@/components/africa-hero"
import type { Capabilities, Capability, Drawing, Faq, Step } from "./africa-activities"
import { SECTOR_PAGE } from "./sector-pages"

type Lang = "en" | "fr"
type Level = "critical" | "warning"
type Row = [title: string, does: string, example: string, imports: string, figure: string, kind: Drawing["kind"], labels: string[]]
type Raw = {
  h1: [string, string, string]
  lead: string
  start: string
  stats: [string, string, string][]
  alerts: [Level, string][]
  heading: string
  items: Row[]
  notDo: string
  example: { title: string; lines: string[]; result: string }
}

/* Shared by every activity page, so the template reads the same everywhere. */
export const SHARED: Record<Lang, { stepsHeading: string; steps: Step[]; faqHeading: string; faq: Faq[] }> = {
  en: {
    stepsHeading: "Start in three steps",
    steps: [
      { title: "Send your current export", text: "A spreadsheet or a system export is enough. You match the columns once." },
      { title: "SentrIA ranks what needs you", text: "Each item comes with its reason and the figure behind it." },
      { title: "You decide", text: "Every alert waits for your decision. SentrIA does not act on its own." },
    ],
    faqHeading: "Questions people ask",
    faq: [
      { q: "Does SentrIA act on its own?", a: "No. It shows what needs attention and why. You decide each action." },
      { q: "Do I need to change my current tools?", a: "No. SentrIA reads exports from the tools you already use. It does not replace them." },
      { q: "What if only part of my operation is connected?", a: "SentrIA works with the data you import, and it says what it cannot see." },
      { q: "Can I see the reason behind an alert?", a: "Yes. Each alert shows the figures it is based on, and the date they come from." },
    ],
  },
  fr: {
    stepsHeading: "Commencez en trois étapes",
    steps: [
      { title: "Envoyez votre export actuel", text: "Un tableur ou un export de votre logiciel suffit. Vous associez les colonnes une seule fois." },
      { title: "SentrIA classe ce qui demande votre attention", text: "Chaque point vient avec sa raison et le chiffre qui la justifie." },
      { title: "Vous décidez", text: "Chaque alerte attend votre décision. SentrIA n'agit pas seul." },
    ],
    faqHeading: "Questions fréquentes",
    faq: [
      { q: "SentrIA agit-il seul ?", a: "Non. Il montre ce qui demande votre attention et pourquoi. Vous décidez de chaque action." },
      { q: "Dois-je changer mes outils actuels ?", a: "Non. SentrIA lit les exports des outils que vous utilisez déjà. Il ne les remplace pas." },
      { q: "Et si seule une partie de mon activité est connectée ?", a: "SentrIA travaille avec les données que vous importez, et il dit ce qu'il ne voit pas." },
      { q: "Puis-je voir la raison d'une alerte ?", a: "Oui. Chaque alerte montre les chiffres sur lesquels elle repose, et leur date." },
    ],
  },
}

/* The words on the dial of the FAQ drawing, for every activity but pharmacy. */
export const FAQ_WORDS: Record<Lang, [string, string, string]> = {
  en: ["routine", "alert list", "first action"],
  fr: ["routine", "liste d'alertes", "première action"],
}

const CTA: Record<Lang, string> = { en: "Book a demo →", fr: "Demander une démo →" }
const SECTOR_NAME: Record<Lang, Record<string, string>> = {
  en: { health: "health", agriculture: "agriculture", distribution: "distribution", logistics: "logistics", industry: "industry", transportation: "transportation", energy: "energy" },
  fr: { health: "santé", agriculture: "agriculture", distribution: "distribution", logistics: "logistique", industry: "industrie", transportation: "transport", energy: "énergie" },
}
const SECTOR_HREF: Record<Lang, Record<string, string>> = {
  en: { health: "/sectors/healthcare", agriculture: "/sectors/agriculture", distribution: "/sectors/retail", logistics: "/sectors/logistics", industry: "/sectors/industry", transportation: "/sectors/transportation", energy: "/sectors/energy" },
  fr: { health: "/fr/secteurs/sante", agriculture: "/fr/secteurs/agriculture", distribution: "/fr/secteurs/commerce", logistics: "/fr/secteurs/logistique", industry: "/fr/secteurs/industrie", transportation: "/fr/secteurs/transport", energy: "/fr/secteurs/energie" },
}

const RAW: Record<string, Record<Lang, Raw>> = {
  "cooperative-agricole": {
    en: {
      h1: ["Every member's lot", "should be sold", "before it loses value."],
      lead: "Record each member's lot when it enters storage. SentrIA tracks days stored and temperature, estimates the time left before loss, and names the lots to sell first. The lots to sell first, by value at stake. Same engine on every page: compare to normal, flag the one thing about to go wrong, tell you what to do today.",
      start: "For agricultural cooperatives that store and sell for several growers.",
      stats: [["9d", "Days left, per lot", "Lot 4, member Diallo: 9 days left before loss. Sell this week."], ["18h", "Before loss", "Maize lot 3 at 31 °C: loss in 18 hours. Move it today."], ["40%", "Below promise", "Group B delivered 40% less than the volume promised to the buyer."]],
      alerts: [["critical", "Lot 4 (member Diallo): 9 days in storage. Sell this week."], ["critical", "Maize lot 3 at 31 °C: loss in 18 hours. Move it today."], ["warning", "Group B: 40% below the volume promised to the buyer."]],
      heading: "What the board sees every week",
      items: [
        ["Which member's lot is ageing in storage", "SentrIA counts the days each lot has been stored. The oldest lots come first, by member, so the board can sell them in time.", "Lot 4, member Diallo: 9 days in storage. Sell this week.", "Lot, member name, entry date, storage temperature", "9d", "bars", ["Lot 4 · 9 days stored", "sell this week"]],
        ["Which lot will lose value first", "From temperature and days stored, SentrIA estimates the hours left before a lot starts to lose value. It says which lot to move first.", "Maize lot 3 at 31 °C: loss in 18 hours. Move it today.", "Product, storage temperature, days stored", "18h", "timeline", ["18 hours left", "now", "24 h"]],
        ["Which group delivers below its promise", "SentrIA compares what each group delivered with the volume promised to the buyer, so the board can close the gap before the order is late.", "Group B: 40% below the promised volume this month.", "Group name, delivered volume, promised volume", "40%", "compare", ["promised 100", "delivered 60", "gap 40"]],
      ],
      notDo: "SentrIA does not buy, sell or pay members. It shows what the cooperative holds and what is at risk. The board decides.",
      example: { title: "One week at the cooperative", lines: ["Lot 4 (Diallo): 9 days in storage, sell first", "Maize lot 3 at 31 °C: loss in 18 hours", "Group B: 40% below the promised volume", "Transfer proposed: lot 3 to the buyer on Friday"], result: "Two lots move before the loss starts." },
    },
    fr: {
      h1: ["Le lot de chaque adhérent", "doit être vendu", "avant de perdre sa valeur."],
      lead: "Enregistrez le lot de chaque adhérent à son entrée en stockage. SentrIA suit les jours passés et la température, estime le temps restant avant la perte, et désigne les lots à vendre en premier. Les lots à vendre en premier, par valeur en jeu. Le même moteur sur chaque page : comparer à la normale, signaler la seule chose sur le point de mal tourner, vous dire quoi faire aujourd'hui.",
      start: "Pour les coopératives agricoles qui stockent et vendent pour plusieurs producteurs.",
      stats: [["9j", "Jours restants, par lot", "Lot 4, adhérent Diallo : 9 jours avant la perte. Vendez cette semaine."], ["18h", "Avant la perte", "Maïs lot 3 à 31 °C : perte dans 18 heures. Déplacez-le aujourd'hui."], ["40 %", "Sous la promesse", "Groupe B a livré 40 % de moins que le volume promis à l'acheteur."]],
      alerts: [["critical", "Lot 4 (adhérent Diallo) : 9 jours en stock. Vendez cette semaine."], ["critical", "Maïs lot 3 à 31 °C : perte dans 18 heures. Déplacez-le aujourd'hui."], ["warning", "Groupe B : 40 % sous le volume promis à l'acheteur."]],
      heading: "Ce que le bureau voit chaque semaine",
      items: [
        ["Quel lot d'adhérent vieillit en stockage", "SentrIA compte les jours passés en stockage pour chaque lot. Les plus anciens passent en tête, par adhérent, pour que le bureau les vende à temps.", "Lot 4, adhérent Diallo : 9 jours en stock. Vendez cette semaine.", "Lot, nom de l'adhérent, date d'entrée, température de stockage", "9j", "bars", ["Lot 4 · 9 jours stockés", "à vendre cette semaine"]],
        ["Quel lot perdra sa valeur en premier", "À partir de la température et des jours stockés, SentrIA estime les heures avant que le lot ne perde sa valeur. Il dit quel lot déplacer en premier.", "Maïs lot 3 à 31 °C : perte dans 18 heures. Déplacez-le aujourd'hui.", "Produit, température de stockage, jours stockés", "18h", "timeline", ["18 heures restantes", "maintenant", "24 h"]],
        ["Quel groupe livre sous sa promesse", "SentrIA compare ce que chaque groupe a livré au volume promis à l'acheteur. Le bureau peut combler l'écart avant que la commande ne soit en retard.", "Groupe B : 40 % sous le volume promis ce mois-ci.", "Nom du groupe, volume livré, volume promis", "40 %", "compare", ["promis 100", "livré 60", "écart 40"]],
      ],
      notDo: "SentrIA n'achète, ne vend et ne paie aucun adhérent. Il montre ce que la coopérative détient et ce qui est menacé. Le bureau décide.",
      example: { title: "Une semaine à la coopérative", lines: ["Lot 4 (Diallo) : 9 jours en stock, à vendre en premier", "Maïs lot 3 à 31 °C : perte dans 18 heures", "Groupe B : 40 % sous le volume promis", "Transfert proposé : lot 3 vers l'acheteur vendredi"], result: "Deux lots partent avant le début de la perte." },
    },
  },
  "silo-stockage": {
    en: {
      h1: ["Sell the grain", "before the silo", "eats the margin."],
      lead: "SentrIA reads each lot's days stored and the silo's temperature. It estimates the time before the grain loses value and tells you which lot to move first. Same engine on every page: compare to normal, flag the one thing about to go wrong, tell you what to do today.",
      start: "For silos that keep a harvest before processing or sale.",
      stats: [["9d", "Days stored", "Lot 3: 9 days in the silo. Deliver first."], ["32°", "Silo temperature", "Silo B reached 32 °C. Warned before the loss starts."], ["12h", "Days before value drops", "Lot 7: loss in 12 hours at this temperature."]],
      alerts: [["critical", "Lot 3: 9 days in the silo. Deliver first."], ["warning", "Silo B: 32 °C, above the safe range. Check ventilation now."], ["critical", "Lot 7: loss in 12 hours. Arrange delivery now."]],
      heading: "What the silo manager sees every morning",
      items: [
        ["Which lot has stayed too long", "SentrIA counts the days each lot has been in the silo. The oldest lot comes first, so it leaves before it spoils.", "Lot 3: 9 days in the silo. Deliver first.", "Lot, silo, entry date", "9d", "bars", ["Lot 3 · 9 days", "deliver first"]],
        ["Which silo is getting too warm", "SentrIA follows the temperature of each silo against its safe range. It alerts you while there is still time to act.", "Silo B at 32 °C. Check ventilation before the loss starts.", "Silo, temperature reading, time of reading", "32°", "timeline", ["32 °C: alert", "now", "40 °C"]],
        ["How long before a lot loses value", "From temperature and days stored, SentrIA estimates the hours left for each lot. You get hours, not vague warnings.", "Lot 7: loss in 12 hours at this temperature.", "Product, temperature, days stored", "12h", "timeline", ["12 hours left", "now", "24 h"]],
      ],
      notDo: "SentrIA does not control the ventilation or the cooling. It reads the readings you record and says what needs attention first.",
      example: { title: "A hot week in the silo", lines: ["Lot 3: 9 days in the silo", "Silo B: 32 °C, above its safe range", "Lot 7: loss in 12 hours", "Action proposed: move lot 7 to dispatch today"], result: "The lot closest to loss leaves first." },
    },
    fr: {
      h1: ["Vendez le grain", "avant que le silo", "ne mange la marge."],
      lead: "SentrIA lit les jours passés de chaque lot et la température du silo. Il estime le temps avant que le grain ne perde sa valeur, et dit quel lot déplacer en premier. Le même moteur sur chaque page : comparer à la normale, signaler la seule chose sur le point de mal tourner, vous dire quoi faire aujourd'hui.",
      start: "Pour les silos qui gardent une récolte avant transformation ou vente.",
      stats: [["9j", "Jours stockés", "Lot 3 : 9 jours dans le silo. Livrez en premier."], ["32°", "Température du silo", "Silo B à 32 °C. Alerte avant le début de la perte."], ["12h", "Jours avant la perte de valeur", "Lot 7 : perte dans 12 heures à cette température."]],
      alerts: [["critical", "Lot 3 : 9 jours dans le silo. Livrez en premier."], ["warning", "Silo B : 32 °C, au-dessus de la plage sûre. Vérifiez la ventilation."], ["critical", "Lot 7 : perte dans 12 heures. Organisez la livraison maintenant."]],
      heading: "Ce que le responsable du silo voit chaque matin",
      items: [
        ["Quel lot est resté trop longtemps", "SentrIA compte les jours passés dans le silo pour chaque lot. Le plus ancien part en premier, avant de s'abîmer.", "Lot 3 : 9 jours dans le silo. Livrez en premier.", "Lot, silo, date d'entrée", "9j", "bars", ["Lot 3 · 9 jours", "livrer en premier"]],
        ["Quel silo chauffe trop", "SentrIA suit la température de chaque silo par rapport à sa plage sûre. Il vous alerte tant qu'il reste du temps pour agir.", "Silo B à 32 °C. Vérifiez la ventilation avant le début de la perte.", "Silo, relevé de température, heure du relevé", "32°", "timeline", ["32 °C : alerte", "maintenant", "40 °C"]],
        ["Dans combien d'heures un lot perd sa valeur", "À partir de la température et des jours stockés, SentrIA estime les heures restantes pour chaque lot. Vous obtenez des heures, pas des avertissements vagues.", "Lot 7 : perte dans 12 heures à cette température.", "Produit, température, jours stockés", "12h", "timeline", ["12 heures restantes", "maintenant", "24 h"]],
      ],
      notDo: "SentrIA ne contrôle ni la ventilation ni le refroidissement. Il lit les relevés que vous enregistrez et dit ce qui demande votre attention en premier.",
      example: { title: "Une semaine chaude au silo", lines: ["Lot 3 : 9 jours dans le silo", "Silo B : 32 °C, au-dessus de sa plage sûre", "Lot 7 : perte dans 12 heures", "Action proposée : déplacer le lot 7 vers l'expédition aujourd'hui"], result: "Le lot le plus proche de la perte part en premier." },
    },
  },
  "grossiste-distributeur": {
    en: {
      h1: ["Your customers", "stop reordering", "before you notice."],
      lead: "SentrIA compares each customer's orders with its usual pattern. When one goes quiet, or buys less than before, it names the customer so you can call first. And on your side: which SKUs run out before your own next delivery. Same engine on every page: compare to normal, flag the one thing about to go wrong, tell you what to do today.",
      start: "For wholesalers and distributors who supply shops and pharmacies.",
      stats: [["21d", "Without an order", "Customer Nord: no order for 21 days. Usual gap: 7 days."], ["-40%", "Volume change", "Customer Sud buys 40% less than last quarter."], ["2d", "Days of cover", "Customer Est: 2 days of cover before your next delivery."]],
      alerts: [["warning", "Customer Nord: no order for 21 days. Usual gap: 7 days."], ["warning", "Customer Sud: buying 40% less than last quarter."], ["critical", "Customer Est: 2 days of stock before your next delivery."]],
      heading: "What the sales team sees every Monday",
      items: [
        ["Which customer has gone quiet", "SentrIA measures the gap between each customer's orders. When a customer stays silent longer than its usual gap, it names the customer.", "Customer Nord: no order for 21 days. Usual gap: 7 days.", "Customer name, order dates", "21d", "timeline", ["21 days, no order", "last order", "usual gap 7 days"]],
        ["Which customer buys less than before", "SentrIA compares this period's volume with each customer's usual volume, so the team can act before the account drifts away.", "Customer Sud: 40% below its usual volume this quarter.", "Customer name, sales by period, usual volume", "-40%", "compare", ["usual 100", "now 60", "gap 40"]],
        ["Which customer runs out before your next delivery", "SentrIA estimates each customer's stock from your deliveries minus its sales. It flags the products that reach zero first.", "Customer Est: 2 days of stock. Your next delivery is in 5 days.", "Deliveries and sales per customer and product, next delivery date", "2d", "bars", ["Customer Est · 2 days", "next delivery in 5 days"]],
      ],
      notDo: "SentrIA does not invoice, collect or place orders. It shows which customers change their habits. Your team decides what to do.",
      example: { title: "One Monday across the customers", lines: ["Customer Nord: no order for 21 days", "Customer Sud: 40% below its usual volume", "Customer Est: 2 days of stock left", "Call proposed: Customer Nord first, then Customer Est"], result: "Two calls this week, before the customer goes elsewhere." },
    },
    fr: {
      h1: ["Vos clients", "arrêtent de commander", "avant que vous ne le voyiez."],
      lead: "SentrIA compare les commandes de chaque client à son rythme habituel. Quand l'un se tait, ou achète moins qu'avant, il le nomme pour que vous appeliez en premier. Et de votre côté : quels produits manquent avant votre prochaine livraison. Le même moteur sur chaque page : comparer à la normale, signaler la seule chose sur le point de mal tourner, vous dire quoi faire aujourd'hui.",
      start: "Pour les grossistes et distributeurs qui fournissent des commerces et des pharmacies.",
      stats: [["21j", "Sans commande", "Client Nord : aucune commande depuis 21 jours. Écart habituel : 7 jours."], ["-40 %", "Variation du volume", "Client Sud achète 40 % de moins que le trimestre dernier."], ["2j", "Jours de couverture", "Client Est : 2 jours de couverture avant votre prochaine livraison."]],
      alerts: [["warning", "Client Nord : aucune commande depuis 21 jours. Écart habituel : 7 jours."], ["warning", "Client Sud : achète 40 % de moins que le trimestre dernier."], ["critical", "Client Est : 2 jours de stock avant votre prochaine livraison."]],
      heading: "Ce que l'équipe commerciale voit chaque lundi",
      items: [
        ["Quel client s'est tu", "SentrIA mesure l'écart entre les commandes de chaque client. Quand un client reste silencieux plus longtemps que son écart habituel, il le nomme.", "Client Nord : aucune commande depuis 21 jours. Écart habituel : 7 jours.", "Nom du client, dates de commande", "21j", "timeline", ["21 jours sans commande", "dernière commande", "écart habituel 7 jours"]],
        ["Quel client achète moins qu'avant", "SentrIA compare le volume de cette période au volume habituel de chaque client. L'équipe peut agir avant que le compte ne s'éloigne.", "Client Sud : 40 % sous son volume habituel ce trimestre.", "Nom du client, ventes par période, volume habituel", "-40 %", "compare", ["habituel 100", "maintenant 60", "écart 40"]],
        ["Quel client manquera avant votre prochaine livraison", "SentrIA estime le stock de chaque client à partir de vos livraisons moins ses ventes. Il signale d'abord les produits qui tombent à zéro.", "Client Est : 2 jours de stock. Votre prochaine livraison est dans 5 jours.", "Livraisons et ventes par client et par produit, date de prochaine livraison", "2j", "bars", ["Client Est · 2 jours", "prochaine livraison dans 5 jours"]],
      ],
      notDo: "SentrIA ne facture, n'encaisse et ne passe aucune commande. Il montre quels clients changent leurs habitudes. Votre équipe décide.",
      example: { title: "Un lundi sur l'ensemble des clients", lines: ["Client Nord : aucune commande depuis 21 jours", "Client Sud : 40 % sous son volume habituel", "Client Est : 2 jours de stock restants", "Appel proposé : Client Nord d'abord, puis Client Est"], result: "Deux appels cette semaine, avant que le client ne parte ailleurs." },
    },
  },
  "supermarche-hypermarche": {
    en: {
      h1: ["Empty shelves", "come from a stock", "you could see coming."],
      lead: "SentrIA reads deliveries and sales by aisle and product. It flags the shelves that will run empty before the next delivery, and the products that barely sell. Same engine on every page: compare to normal, flag the one thing about to go wrong, tell you what to do today.",
      start: "For supermarkets and hypermarkets with many aisles and departments.",
      stats: [["3d", "Days of stock, per aisle", "Dairy shelf: 3 days of stock. Next delivery in 5 days."], ["45d", "Without a sale", "Product X: 45 days without a sale in store B."], ["+30%", "Above normal", "Saturday demand 30% above the usual curve at 18:00."]],
      alerts: [["critical", "Dairy shelf: 3 days of stock. Next delivery in 5 days."], ["warning", "Product X: 45 days without a sale in store B."], ["warning", "Saturday demand: 30% above the usual curve."]],
      heading: "What the store manager sees before each delivery",
      items: [
        ["Which shelf will run empty", "SentrIA estimates each product's stock from deliveries minus sales. It names the shelves that reach zero before the next delivery.", "Dairy shelf: 3 days of stock. Next delivery in 5 days.", "Deliveries and sales per product and aisle, next delivery date", "3d", "bars", ["Dairy · 3 days", "next delivery in 5 days"]],
        ["Which product has stopped selling", "SentrIA measures the days since each product's last sale, store by store. It names the products that have gone still, so you can move them.", "Product X: 45 days without a sale in store B.", "Product, store, date of each sale", "45d", "timeline", ["45 days, no sale", "last sale", "usual gap 7 days"]],
        ["Which demand peak is coming", "SentrIA compares each day's sales with the usual curve for that day. When demand climbs above it, you see it before the shelves empty.", "Saturday demand 30% above the usual curve at 18:00.", "Sales by hour and by day, usual curve per store", "+30%", "compare", ["usual 100", "Saturday 130", "stock 110"]],
      ],
      notDo: "SentrIA does not place orders or move stock between stores. It shows where the shelves will run out. Your buyers decide.",
      example: { title: "One Friday in the store", lines: ["Dairy shelf: 3 days of stock", "Product X: 45 days without a sale in store B", "Saturday demand: 30% above the usual curve", "Order proposed: dairy first, before Saturday"], result: "The dairy shelf is restocked before the weekend rush." },
    },
    fr: {
      h1: ["Les rayons vides", "viennent d'un stock", "que l'on pouvait prévoir."],
      lead: "SentrIA lit les livraisons et les ventes par rayon et par produit. Il signale les rayons qui se videront avant la prochaine livraison, et les produits qui ne se vendent presque plus. Le même moteur sur chaque page : comparer à la normale, signaler la seule chose sur le point de mal tourner, vous dire quoi faire aujourd'hui.",
      start: "Pour les supermarchés et hypermarchés avec de nombreux rayons et secteurs.",
      stats: [["3j", "Jours de stock, par rayon", "Rayon crèmerie : 3 jours de stock. Livraison dans 5 jours."], ["45j", "Sans vente", "Produit X : 45 jours sans vente au magasin B."], ["+30 %", "Au-dessus de la normale", "Demande du samedi 30 % au-dessus de la courbe habituelle à 18 h."]],
      alerts: [["critical", "Rayon crèmerie : 3 jours de stock. Livraison dans 5 jours."], ["warning", "Produit X : 45 jours sans vente au magasin B."], ["warning", "Demande du samedi : 30 % au-dessus de la courbe habituelle."]],
      heading: "Ce que le responsable du magasin voit avant chaque livraison",
      items: [
        ["Quel rayon va se vider", "SentrIA estime le stock de chaque produit à partir des livraisons moins les ventes. Il nomme les rayons qui atteignent zéro avant la prochaine livraison.", "Rayon crèmerie : 3 jours de stock. Livraison dans 5 jours.", "Livraisons et ventes par produit et par rayon, date de prochaine livraison", "3j", "bars", ["Crèmerie · 3 jours", "livraison dans 5 jours"]],
        ["Quel produit ne se vend plus", "SentrIA mesure les jours depuis la dernière vente de chaque produit, magasin par magasin. Il nomme les produits figés pour que vous les déplaciez.", "Produit X : 45 jours sans vente au magasin B.", "Produit, magasin, date de chaque vente", "45j", "timeline", ["45 jours sans vente", "dernière vente", "écart habituel 7 jours"]],
        ["Quel pic de demande arrive", "SentrIA compare les ventes de chaque jour à la courbe habituelle de ce jour. Quand la demande monte au-dessus, vous le voyez avant que les rayons ne se vident.", "Demande du samedi 30 % au-dessus de la courbe habituelle à 18 h.", "Ventes par heure et par jour, courbe habituelle par magasin", "+30 %", "compare", ["habituel 100", "samedi 130", "stock 110"]],
      ],
      notDo: "SentrIA ne passe aucune commande et ne déplace pas de stock entre magasins. Il montre où les rayons vont se vider. Vos acheteurs décident.",
      example: { title: "Un vendredi au magasin", lines: ["Rayon crèmerie : 3 jours de stock", "Produit X : 45 jours sans vente au magasin B", "Demande du samedi : 30 % au-dessus de la courbe", "Commande proposée : crèmerie d'abord, avant samedi"], result: "Le rayon crèmerie est réapprovisionné avant le coup de feu du week-end." },
    },
  },
  "chaine-magasins": {
    en: {
      h1: ["Move stock to the shop", "that needs it", "before you reorder."],
      lead: "SentrIA compares stock across your stores. When one shop holds unsold stock and another is reordering, it proposes the transfer, ranked by the value at stake. Which store runs out, which sits on dead stock — before you buy more. Same engine on every page: compare to normal, flag the one thing about to go wrong, tell you what to do today.",
      start: "For retail chains with several shops under one owner.",
      stats: [["40", "Days of stock, per store", "Shop A holds 40 unsold. Shop B has 0 days of stock left."], ["0", "Left in Shop A", "Shop A is out of stock on a fast seller."], ["3", "Transfers ranked", "Biggest value first, so the team starts with the one that matters."]],
      alerts: [["warning", "Shop A: 40 units unsold. Shop B is reordering 40."], ["critical", "Shop A: 0 left on a fast seller."], ["warning", "Three transfers ranked by value: 40, 25, 10 units."]],
      heading: "What the chain's buyers see every morning",
      items: [
        ["Which shop should send stock to another", "SentrIA matches unsold stock in one shop with a reorder in another. It proposes the transfer, with the product and the quantity.", "Shop A has 40 unsold. Shop B needs 40. Transfer them.", "Stock and sales per shop and product, reorders by shop", "40", "pair", ["Shop A: 40 unsold", "Shop B: needs 40"]],
        ["Which transfer is worth the most", "Transfers are ranked by the value at stake, so the team starts with the one that costs the chain most if it waits. Without unit costs, SentrIA ranks by quantity.", "Three transfers: 40, 25 and 10 units. Biggest first.", "Unit cost per product (optional)", "3", "compare", ["40 units", "25 units", "10 units"]],
        ["Which shop has a gap while another holds slow stock", "SentrIA puts empty shelves and slow stock side by side, so you see both halves of the same problem.", "Shop A: 0 left. Shop B: 80 unsold.", "Stock by shop, days since last sale", "0", "bars", ["Shop A: 0 left", "Shop B: 80 unsold"]],
      ],
      notDo: "SentrIA does not move stock or create transfer documents. It proposes transfers, and your buyers approve them.",
      example: { title: "A Tuesday across the chain", lines: ["Shop A: 40 units unsold", "Shop B: reordering 40 units", "Shop A: 0 left on a fast seller", "Transfer proposed: 40 units, ranked first"], result: "One transfer instead of a new order from the supplier." },
    },
    fr: {
      h1: ["Déplacez le stock", "vers le magasin", "qui en a besoin."],
      lead: "SentrIA compare le stock de vos magasins. Quand un magasin garde du stock invendu et qu'un autre recommande, il propose le transfert, classé par valeur en jeu. Quel magasin va manquer, lequel garde du stock mort — avant que vous ne commandiez plus. Le même moteur sur chaque page : comparer à la normale, signaler la seule chose sur le point de mal tourner, vous dire quoi faire aujourd'hui.",
      start: "Pour les chaînes de magasins qui appartiennent à un même propriétaire.",
      stats: [["40", "Jours de stock, par magasin", "Magasin A : 40 invendues. Magasin B : 0 jour de stock restant."], ["0", "Restantes au magasin A", "Magasin A en rupture sur un produit qui se vend bien."], ["3", "Transferts classés", "La plus grosse valeur d'abord, pour commencer par l'essentiel."]],
      alerts: [["warning", "Magasin A : 40 unités invendues. Magasin B recommande 40."], ["critical", "Magasin A : 0 restant sur un produit qui se vend bien."], ["warning", "Trois transferts classés par valeur : 40, 25, 10 unités."]],
      heading: "Ce que les acheteurs de la chaîne voient chaque matin",
      items: [
        ["Quel magasin doit envoyer du stock à un autre", "SentrIA associe le stock invendu d'un magasin à une recommandation dans un autre. Il propose le transfert, avec le produit et la quantité.", "Magasin A : 40 invendus. Magasin B en a besoin de 40. Transférez-les.", "Stock et ventes par magasin et par produit, recommandations par magasin", "40", "pair", ["Magasin A : 40 invendus", "Magasin B : besoin de 40"]],
        ["Quel transfert vaut le plus", "Les transferts sont classés par valeur en jeu, pour commencer par celui qui coûte le plus à la chaîne s'il attend. Sans coût unitaire, SentrIA classe par quantité.", "Trois transferts : 40, 25 et 10 unités. Le plus gros d'abord.", "Coût unitaire par produit (optionnel)", "3", "compare", ["40 unités", "25 unités", "10 unités"]],
        ["Quel magasin manque pendant qu'un autre garde du stock lent", "SentrIA met côte à côte les rayons vides et le stock lent, pour voir les deux moitiés du même problème.", "Magasin A : 0 restant. Magasin B : 80 invendues.", "Stock par magasin, jours depuis la dernière vente", "0", "bars", ["Magasin A : 0 restant", "Magasin B : 80 invendues"]],
      ],
      notDo: "SentrIA ne déplace pas de stock et n'établit pas de bons de transfert. Il propose des transferts, et vos acheteurs les valident.",
      example: { title: "Un mardi sur toute la chaîne", lines: ["Magasin A : 40 unités invendues", "Magasin B : recommande 40 unités", "Magasin A : 0 restant sur un produit qui se vend bien", "Transfert proposé : 40 unités, classé en premier"], result: "Un transfert au lieu d'une nouvelle commande au fournisseur." },
    },
  },
  "epicerie-proximite": {
    en: {
      h1: ["Catch the empty shelf", "before the customer", "does."],
      lead: "SentrIA reads your deliveries and sales. It warns you when a product will run out before the next delivery, and when a product has stopped selling. Same engine on every page: compare to normal, flag the one thing about to go wrong, tell you what to do today.",
      start: "For small local shops with one or two people on the counter.",
      stats: [["3d", "Days of stock", "Bread and milk: 3 days of stock. Next delivery in 4 days."], ["30d", "Without a sale", "Product Y: 30 days without a sale."], ["5d", "Days late", "Your supplier was late twice this month, by 5 days."]],
      alerts: [["critical", "Bread and milk: 3 days of stock. Next delivery in 4 days."], ["warning", "Product Y: 30 days without a sale."], ["warning", "Supplier Z: late twice this month, by 5 days."]],
      heading: "What the owner checks before the morning rush",
      items: [
        ["Which product runs out before the next delivery", "SentrIA works out the stock from deliveries minus sales. It flags the products that run out before your supplier comes back.", "Bread and milk: 3 days of stock. Next delivery in 4 days.", "Deliveries and sales per product, next delivery date", "3d", "bars", ["Bread and milk · 3 days", "delivery in 4 days"]],
        ["Which product has stopped selling", "SentrIA counts the days since each product last sold. It names the products that have gone still, so you can reduce the order.", "Product Y: 30 days without a sale.", "Product, date of each sale", "30d", "timeline", ["30 days, no sale", "last sale", "usual gap 7 days"]],
        ["Which supplier is late", "SentrIA compares each supplier's promised delivery with the real arrival. It shows who is late, and by how much, so you order earlier.", "Supplier Z: promises 2 days, arrives in 7 on average.", "Supplier, order date, promised date, arrival date", "5d", "compare", ["promised 2", "real 7", "worst 10"]],
      ],
      notDo: "SentrIA does not place orders with your supplier. It shows what is running low and who is late. You order.",
      example: { title: "A Monday in the shop", lines: ["Bread and milk: 3 days of stock", "Product Y: 30 days without a sale", "Supplier Z: late twice this month", "Order proposed: bread and milk today"], result: "Bread and milk is ordered before the shelves empty." },
    },
    fr: {
      h1: ["Anticipez le rayon vide", "avant que le client", "ne le voie."],
      lead: "SentrIA lit vos livraisons et vos ventes. Il vous prévient quand un produit va manquer avant la prochaine livraison, et quand un produit ne se vend plus. Le même moteur sur chaque page : comparer à la normale, signaler la seule chose sur le point de mal tourner, vous dire quoi faire aujourd'hui.",
      start: "Pour les petites épiceries de quartier, tenues par une ou deux personnes.",
      stats: [["3j", "Jours de stock", "Pain et lait : 3 jours de stock. Livraison dans 4 jours."], ["30j", "Sans vente", "Produit Y : 30 jours sans vente."], ["5j", "De retard", "Votre fournisseur est arrivé en retard deux fois ce mois-ci, de 5 jours."]],
      alerts: [["critical", "Pain et lait : 3 jours de stock. Livraison dans 4 jours."], ["warning", "Produit Y : 30 jours sans vente."], ["warning", "Fournisseur Z : en retard deux fois ce mois-ci, de 5 jours."]],
      heading: "Ce que le gérant vérifie avant le coup de feu du matin",
      items: [
        ["Quel produit manquera avant la prochaine livraison", "SentrIA calcule le stock à partir des livraisons moins les ventes. Il signale les produits qui manqueront avant le retour de votre fournisseur.", "Pain et lait : 3 jours de stock. Livraison dans 4 jours.", "Livraisons et ventes par produit, date de la prochaine livraison", "3j", "bars", ["Pain et lait · 3 jours", "livraison dans 4 jours"]],
        ["Quel produit ne se vend plus", "SentrIA compte les jours depuis la dernière vente de chaque produit. Il nomme ceux qui sont figés, pour que vous réduisiez la commande.", "Produit Y : 30 jours sans vente.", "Produit, date de chaque vente", "30j", "timeline", ["30 jours sans vente", "dernière vente", "écart habituel 7 jours"]],
        ["Quel fournisseur est en retard", "SentrIA compare la livraison promise de chaque fournisseur à son arrivée réelle. Il montre qui est en retard et de combien, pour que vous commandiez plus tôt.", "Fournisseur Z : promet 2 jours, arrive en 7 en moyenne.", "Fournisseur, date de commande, date promise, date d'arrivée", "5j", "compare", ["promis 2", "réel 7", "pire 10"]],
      ],
      notDo: "SentrIA ne passe aucune commande chez votre fournisseur. Il vous montre ce qui s'épuise et qui est en retard. C'est vous qui commandez.",
      example: { title: "Un lundi à l'épicerie", lines: ["Pain et lait : 3 jours de stock", "Produit Y : 30 jours sans vente", "Fournisseur Z : en retard deux fois ce mois-ci", "Commande proposée : pain et lait aujourd'hui"], result: "Le pain et le lait sont commandés avant que les rayons ne se vident." },
    },
  },
  "port-conteneurs": {
    en: {
      h1: ["Find the slow step", "before a container", "waits at the quay."],
      lead: "SentrIA follows containers from arrival to exit. It shows which step is slow, which containers are waiting, and which clients need to hear about a delay. Same engine on every page: compare to normal, flag the one thing about to go wrong, tell you what to do today.",
      start: "For ports and terminals that handle containers for several clients.",
      stats: [["9h", "Hours of slack before the window breaks", "Customs waits 9 hours. Every container behind it is late."], ["3", "Waiting containers", "Three containers wait behind customs. Tell the client now."], ["48h", "In the yard", "Container group A: 48 hours in the yard."]],
      alerts: [["critical", "Customs waits 9 hours. Every container behind it is late."], ["warning", "Three containers wait behind customs. Tell the client now."], ["warning", "Container group A: 48 hours in the yard."]],
      heading: "What the terminal manager sees on each shift",
      items: [
        ["Which step slows the flow", "SentrIA times each step, from arrival to exit. It shows the one that holds the others up.", "Customs waits 9 hours. Every container behind it is late.", "Arrival, step and exit times per container", "9h", "compare", ["Port 2 h", "Customs 9 h", "Yard 3 h"]],
        ["Which containers are waiting", "SentrIA lists the containers held behind the slow step, with their client, so you can tell each client what is happening.", "Three containers wait behind customs. Tell the client now.", "Container number, client, current step", "3", "pair", ["3 containers waiting", "clients to tell"]],
        ["Which containers stay too long in the yard", "SentrIA measures how long each container has been in the yard. It flags the ones close to the free-time limit.", "Container group A: 48 hours in the yard.", "Container number, yard entry time", "48h", "timeline", ["48 hours in yard", "now", "72 h limit"]],
      ],
      notDo: "SentrIA does not release containers or issue documents. It shows where the time goes. Your teams act.",
      example: { title: "One shift at the quay", lines: ["Customs: 9 hours of waiting", "Three containers held behind it", "Container group A: 48 hours in the yard", "Client message proposed: delay and new time"], result: "The clients hear about the delay before they call." },
    },
    fr: {
      h1: ["Repérez l'étape lente", "avant qu'un conteneur", "n'attende au quai."],
      lead: "SentrIA suit les conteneurs de l'arrivée à la sortie. Il montre quelle étape est lente, quels conteneurs attendent, et quels clients doivent être prévenus d'un retard. Le même moteur sur chaque page : comparer à la normale, signaler la seule chose sur le point de mal tourner, vous dire quoi faire aujourd'hui.",
      start: "Pour les ports et terminaux qui manipulent des conteneurs pour plusieurs clients.",
      stats: [["9h", "Heures de marge avant la rupture", "La douane attend 9 heures. Chaque conteneur derrière est en retard."], ["3", "Conteneurs en attente", "Trois conteneurs attendent derrière la douane. Prévenez le client."], ["48h", "Au parc", "Groupe A : 48 heures au parc à conteneurs."]],
      alerts: [["critical", "La douane attend 9 heures. Chaque conteneur derrière est en retard."], ["warning", "Trois conteneurs attendent derrière la douane. Prévenez le client."], ["warning", "Groupe A : 48 heures au parc."]],
      heading: "Ce que le responsable du terminal voit à chaque poste",
      items: [
        ["Quelle étape ralentit le flux", "SentrIA chronomètre chaque étape, de l'arrivée à la sortie. Il montre celle qui retient les autres.", "La douane attend 9 heures. Chaque conteneur derrière est en retard.", "Heures d'arrivée, d'étape et de sortie par conteneur", "9h", "compare", ["Port 2 h", "Douane 9 h", "Parc 3 h"]],
        ["Quels conteneurs attendent", "SentrIA liste les conteneurs retenus derrière l'étape lente, avec leur client, pour que vous puissiez informer chacun.", "Trois conteneurs attendent derrière la douane. Prévenez le client.", "Numéro de conteneur, client, étape en cours", "3", "pair", ["3 conteneurs en attente", "clients à prévenir"]],
        ["Quels conteneurs restent trop longtemps au parc", "SentrIA mesure le temps passé au parc par chaque conteneur. Il signale ceux qui approchent de la limite de franchise.", "Groupe A : 48 heures au parc.", "Numéro de conteneur, heure d'entrée au parc", "48h", "timeline", ["48 heures au parc", "maintenant", "limite 72 h"]],
      ],
      notDo: "SentrIA ne libère aucun conteneur et n'établit aucun document. Il montre où part le temps. Vos équipes agissent.",
      example: { title: "Un poste au quai", lines: ["Douane : 9 heures d'attente", "Trois conteneurs retenus derrière", "Groupe A : 48 heures au parc", "Message au client proposé : retard et nouvelle heure"], result: "Les clients apprennent le retard avant d'appeler." },
    },
  },
  "entrepot-manutention": {
    en: {
      h1: ["See where goods", "wait inside", "the warehouse."],
      lead: "SentrIA follows goods from receipt to dispatch. It shows the step that slows the flow, the orders that will be late for dispatch, and the stock that does not move. Same engine on every page: compare to normal, flag the one thing about to go wrong, tell you what to do today.",
      start: "For warehouses that receive, store and move goods for clients.",
      stats: [["9h", "Slowest step", "Picking takes 9 hours on the afternoon shift."], ["3h", "Hours to dispatch deadline", "Three orders have under 3 hours to make the 17:00 truck."], ["40d", "Days since last move", "Pallet group C: 40 days since last move."]],
      alerts: [["critical", "Picking takes 9 hours on the afternoon shift."], ["critical", "Three orders will miss the 17:00 truck."], ["warning", "Pallet group C: 40 days in the same location."]],
      heading: "What the warehouse lead sees before each dispatch",
      items: [
        ["Which step holds up the flow", "SentrIA times receipt, storage, picking and dispatch. It names the step that makes the others wait.", "Picking takes 9 hours on the afternoon shift.", "Times per step, per shift and per order", "9h", "compare", ["Receipt 2 h", "Picking 9 h", "Dispatch 1 h"]],
        ["Which orders will miss the truck", "SentrIA checks each open order against the next dispatch time, and lists the ones that will be late.", "Three orders will miss the 17:00 truck.", "Order number, dispatch time, current step", "3", "pair", ["3 orders late", "17:00 truck"]],
        ["Which stock does not move", "SentrIA measures how long each pallet has stayed in its location. It names the stock that has stopped moving.", "Pallet group C: 40 days in the same location.", "Pallet number, location, date of last movement", "40d", "bars", ["Group C · 40 days", "usual move: 10 days"]],
      ],
      notDo: "SentrIA does not move goods or assign tasks to staff. It shows where the time goes and what is late.",
      example: { title: "One afternoon in the warehouse", lines: ["Picking: 9 hours on the afternoon shift", "Three orders will miss the 17:00 truck", "Pallet group C: 40 days in one location", "Action proposed: split picking across two teams"], result: "The team sees the three orders before the truck leaves." },
    },
    fr: {
      h1: ["Voyez où les marchandises", "attendent", "dans l'entrepôt."],
      lead: "SentrIA suit les marchandises de la réception à l'expédition. Il montre l'étape qui ralentit le flux, les commandes qui seront en retard, et le stock qui ne bouge plus. Le même moteur sur chaque page : comparer à la normale, signaler la seule chose sur le point de mal tourner, vous dire quoi faire aujourd'hui.",
      start: "Pour les entrepôts qui reçoivent, stockent et déplacent des marchandises pour leurs clients.",
      stats: [["9h", "Étape la plus lente", "La préparation prend 9 heures sur le poste de l'après-midi."], ["3h", "Heures avant l'heure limite", "Trois commandes ont moins de 3 heures pour le camion de 17 h."], ["40j", "Jours sans mouvement", "Palettes groupe C : 40 jours sans mouvement."]],
      alerts: [["critical", "La préparation prend 9 heures sur le poste de l'après-midi."], ["critical", "Trois commandes manqueront le camion de 17 h."], ["warning", "Palettes groupe C : 40 jours au même emplacement."]],
      heading: "Ce que le responsable d'entrepôt voit avant chaque expédition",
      items: [
        ["Quelle étape retient le flux", "SentrIA chronomètre la réception, le stockage, la préparation et l'expédition. Il nomme l'étape qui fait attendre les autres.", "La préparation prend 9 heures sur le poste de l'après-midi.", "Durées par étape, par poste et par commande", "9h", "compare", ["Réception 2 h", "Préparation 9 h", "Expédition 1 h"]],
        ["Quelles commandes manqueront le camion", "SentrIA compare chaque commande ouverte à l'heure du prochain départ, et liste celles qui seront en retard.", "Trois commandes manqueront le camion de 17 h.", "Numéro de commande, heure de départ, étape en cours", "3", "pair", ["3 commandes en retard", "camion de 17 h"]],
        ["Quel stock ne bouge plus", "SentrIA mesure le temps passé par chaque palette à son emplacement. Il nomme le stock qui a cessé de bouger.", "Palettes groupe C : 40 jours au même emplacement.", "Numéro de palette, emplacement, date du dernier mouvement", "40j", "bars", ["Groupe C · 40 jours", "mouvement habituel : 10 jours"]],
      ],
      notDo: "SentrIA ne déplace aucune marchandise et n'affecte aucune tâche au personnel. Il montre où part le temps et ce qui est en retard.",
      example: { title: "Un après-midi à l'entrepôt", lines: ["Préparation : 9 heures sur le poste de l'après-midi", "Trois commandes manqueront le camion de 17 h", "Palettes groupe C : 40 jours au même emplacement", "Action proposée : répartir la préparation sur deux équipes"], result: "L'équipe voit les trois commandes avant le départ du camion." },
    },
  },
  "transport-distribution": {
    en: {
      h1: ["One late drop", "should not delay", "the whole route."],
      lead: "SentrIA follows each delivery against its time window. It shows which drop is late, which later drops it will push back, and which vehicle needs service before it fails. Same engine on every page: compare to normal, flag the one thing about to go wrong, tell you what to do today.",
      start: "For operators who deliver to several drop points each day.",
      stats: [["2h", "Hours of buffer lost", "Truck 4 is 2 hours behind its first drop."], ["3", "Drops at risk", "Three later drops will slip unless the route changes."], ["7d", "Days until service", "Truck 2 brake pads due in 7 days or 500 km."]],
      alerts: [["warning", "Truck 4: 2 hours behind its first drop."], ["critical", "Three later drops will slip. Reroute now."], ["warning", "Truck 2: brake pads due in 500 km."]],
      heading: "What the dispatcher sees during the morning run",
      items: [
        ["Which delivery is running late", "SentrIA compares each drop with its time window. It names the drop that is behind, and by how much.", "Truck 4 is 2 hours late at its first drop.", "Truck, drop, planned time, actual time", "2h", "timeline", ["2 h late", "now", "window end"]],
        ["Which later drops will slip", "SentrIA works out which drops come after the late one on the same route, and warns you before they slip.", "Three later drops will slip unless the route changes.", "Route, drop order, time windows", "3", "pair", ["3 drops at risk", "reroute"]],
        ["Which vehicle is due for service", "SentrIA counts the distance to each service point and warns you while there is still time to book the workshop.", "Truck 2: brake pads due in 500 km. Book the workshop today.", "Vehicle, odometer reading, service schedule", "500km", "bars", ["Truck 2 · brake pads", "due in 500 km"]],
      ],
      notDo: "SentrIA does not change routes or book workshops itself. It shows what is late and what is due. The dispatcher decides.",
      example: { title: "The morning run", lines: ["Truck 4: 2 hours behind its first drop", "Three later drops at risk", "Truck 2: brake pads due in 500 km", "Action proposed: move two drops to truck 5"], result: "The later drops keep their time window." },
    },
    fr: {
      h1: ["Une livraison en retard", "ne doit pas retarder", "toute la tournée."],
      lead: "SentrIA suit chaque livraison par rapport à sa plage horaire. Il montre quelle livraison est en retard, celles qu'elle va décaler, et quel véhicule doit être révisé avant la panne. Le même moteur sur chaque page : comparer à la normale, signaler la seule chose sur le point de mal tourner, vous dire quoi faire aujourd'hui.",
      start: "Pour les opérateurs qui livrent plusieurs points chaque jour.",
      stats: [["2h", "Heures de marge perdues", "Camion 4 a 2 heures de retard sur sa première livraison."], ["3", "Livraisons à risque", "Trois livraisons suivantes glisseront sans changement de tournée."], ["7j", "Jours avant entretien", "Plaquettes du camion 2 dans 7 jours ou 500 km."]],
      alerts: [["warning", "Camion 4 : 2 heures de retard sur sa première livraison."], ["critical", "Trois livraisons suivantes glisseront. Réacheminez maintenant."], ["warning", "Camion 2 : plaquettes à changer dans 500 km."]],
      heading: "Ce que le répartiteur voit pendant la tournée du matin",
      items: [
        ["Quelle livraison est en retard", "SentrIA compare chaque livraison à sa plage horaire. Il nomme celle qui est en retard, et de combien.", "Camion 4 : 2 heures de retard à sa première livraison.", "Camion, livraison, heure prévue, heure réelle", "2h", "timeline", ["2 h de retard", "maintenant", "fin de plage"]],
        ["Quelles livraisons suivantes vont glisser", "SentrIA repère les livraisons qui suivent la livraison en retard sur la même tournée, et vous prévient avant qu'elles ne glissent.", "Trois livraisons suivantes glisseront sans changement de tournée.", "Tournée, ordre des livraisons, plages horaires", "3", "pair", ["3 livraisons à risque", "réacheminer"]],
        ["Quel véhicule doit être révisé", "SentrIA calcule la distance avant chaque révision et vous prévient tant qu'il reste le temps de réserver l'atelier.", "Camion 2 : plaquettes à changer dans 500 km. Réservez l'atelier aujourd'hui.", "Véhicule, kilométrage, planning d'entretien", "500 km", "bars", ["Camion 2 · plaquettes", "à changer dans 500 km"]],
      ],
      notDo: "SentrIA ne modifie pas les tournées et ne réserve pas l'atelier lui-même. Il montre ce qui est en retard et ce qui est dû. Le répartiteur décide.",
      example: { title: "La tournée du matin", lines: ["Camion 4 : 2 heures de retard à sa première livraison", "Trois livraisons suivantes à risque", "Camion 2 : plaquettes à changer dans 500 km", "Action proposée : déplacer deux livraisons vers le camion 5"], result: "Les livraisons suivantes gardent leur plage horaire." },
    },
  },
  "preparation-expedition": {
    en: {
      h1: ["Ship the orders", "that are due", "first."],
      lead: "SentrIA follows each order from picking to dispatch. It shows which orders cannot ship today, which have waited longest, and which step holds the rest back. Same engine on every page: compare to normal, flag the one thing about to go wrong, tell you what to do today.",
      start: "For teams that pick, pack and send orders to customers.",
      stats: [["6", "Cannot ship today", "Six orders lack one item in the picking list."], ["2d", "Hours left to ship on time", "Order 1182 has waited 2 days. The carrier arrives in 4 hours."], ["7 min", "Per order", "Packing averages 7 minutes per order on the evening shift."]],
      alerts: [["critical", "Six orders lack one item. They cannot ship today."], ["warning", "Order 1182: 2 days waiting in packing."], ["warning", "Packing: 7 minutes per order on the evening shift."]],
      heading: "What the dispatch team sees before the carrier arrives",
      items: [
        ["Which orders cannot ship today", "SentrIA checks each order against the stock picked. It lists the orders that lack an item, so none is forgotten.", "Six orders lack one item in the picking list.", "Order number, items ordered, items picked", "6", "bars", ["Blocked orders · 6", "ready to ship · 38"]],
        ["Which order has waited longest", "SentrIA measures the time each order has spent in each step. It puts the oldest first.", "Order 1182 has waited 2 days in packing.", "Order number, time entering each step", "2d", "timeline", ["2 days waiting", "now", "carrier 17:00"]],
        ["Which step holds the others back", "SentrIA compares the time each step takes. It names the slow step, so you can add people where it matters.", "Packing averages 7 minutes per order on the evening shift.", "Times per step and per shift", "7 min", "compare", ["Picking 4 min", "Packing 7 min", "Dispatch 2 min"]],
      ],
      notDo: "SentrIA does not pick, pack or send orders. It shows what is blocked and what has waited. Your team acts.",
      example: { title: "One evening dispatch", lines: ["Six orders blocked by a missing item", "Order 1182: 2 days in packing", "Packing: 7 minutes per order", "Action proposed: pick the blocked orders first"], result: "The carrier leaves with the orders that can ship." },
    },
    fr: {
      h1: ["Expédiez d'abord", "les commandes", "qui sont dues."],
      lead: "SentrIA suit chaque commande de la préparation à l'expédition. Il montre les commandes qui ne partent pas aujourd'hui, celles qui ont le plus attendu, et l'étape qui retient le reste. Le même moteur sur chaque page : comparer à la normale, signaler la seule chose sur le point de mal tourner, vous dire quoi faire aujourd'hui.",
      start: "Pour les équipes qui préparent, emballent et envoient des commandes aux clients.",
      stats: [["6", "Bloquées aujourd'hui", "Six commandes manquent un article sur le bon de préparation."], ["2j", "Heures restantes pour expédier", "La commande 1182 attend 2 jours. Le transporteur arrive dans 4 heures."], ["7 min", "Par commande", "L'emballage prend en moyenne 7 minutes par commande le soir."]],
      alerts: [["critical", "Six commandes manquent un article. Elles ne partent pas aujourd'hui."], ["warning", "Commande 1182 : 2 jours d'attente à l'emballage."], ["warning", "Emballage : 7 minutes par commande le soir."]],
      heading: "Ce que l'équipe expédition voit avant l'arrivée du transporteur",
      items: [
        ["Quelles commandes ne peuvent pas partir aujourd'hui", "SentrIA vérifie chaque commande par rapport au stock préparé. Il liste celles qui manquent un article, pour qu'aucune ne soit oubliée.", "Six commandes manquent un article sur le bon de préparation.", "Numéro de commande, articles commandés, articles préparés", "6", "bars", ["Commandes bloquées · 6", "prêtes · 38"]],
        ["Quelle commande attend depuis le plus longtemps", "SentrIA mesure le temps que chaque commande passe dans chaque étape. Il classe la plus ancienne en premier.", "La commande 1182 attend depuis 2 jours à l'emballage.", "Numéro de commande, heure d'entrée dans chaque étape", "2j", "timeline", ["2 jours d'attente", "maintenant", "transporteur 17 h"]],
        ["Quelle étape retient les autres", "SentrIA compare le temps de chaque étape. Il nomme l'étape lente, pour que vous ajoutiez du monde là où c'est utile.", "L'emballage prend en moyenne 7 minutes par commande le soir.", "Durées par étape et par poste", "7 min", "compare", ["Préparation 4 min", "Emballage 7 min", "Expédition 2 min"]],
      ],
      notDo: "SentrIA ne prépare, n'emballe et n'expédie aucune commande. Il montre ce qui est bloqué et ce qui a attendu. Votre équipe agit.",
      example: { title: "Une expédition du soir", lines: ["Six commandes bloquées par un article manquant", "Commande 1182 : 2 jours à l'emballage", "Emballage : 7 minutes par commande", "Action proposée : préparer d'abord les commandes bloquées"], result: "Le transporteur part avec les commandes prêtes." },
    },
  },
  "chaine-froid": {
    en: {
      h1: ["Keep the cold chain", "unbroken", "from dock to door."],
      lead: "SentrIA follows the temperature of each cold room and each vehicle. It warns you when a load drifts out of range, and how much stock is at risk. Same engine on every page: compare to normal, flag the one thing about to go wrong, tell you what to do today.",
      start: "For operators who keep food or medicine at a set temperature.",
      stats: [["6h", "Hours before spoilage", "Cold room 2 above its limit for 6 hours."], ["120", "Stock at risk (value)", "120 units of frozen fish at risk. Move before the break spreads."], ["+3°", "Drift", "Vehicle 5 has drifted 3 degrees in the last hour."]],
      alerts: [["critical", "Cold room 2: above its limit for 6 hours. Stock at risk."], ["critical", "Vehicle 5: +3 °C in the last hour."], ["warning", "120 units of frozen fish at risk."]],
      heading: "What the cold-chain lead sees every hour",
      items: [
        ["Which cold room is above its limit", "SentrIA follows each room against its set range and counts the hours out of range. It alerts you while the stock can still be saved.", "Cold room 2 above its limit for 6 hours. Stock at risk.", "Room, temperature readings, set range", "6h", "timeline", ["6 h above limit", "now", "24 h"]],
        ["Which vehicle is drifting", "SentrIA watches the trend of each vehicle's temperature, so you see the drift before it crosses the limit.", "Vehicle 5 has drifted 3 degrees in the last hour.", "Vehicle, temperature readings, time of reading", "+3°", "timeline", ["+3 °C in 1 h", "now", "limit reached"]],
        ["How much stock is at risk", "SentrIA adds up the units in each affected room or vehicle, so you know the value at risk before you decide what to move.", "120 units of frozen fish at risk after the break.", "Stock per room or vehicle, units, product", "120", "bars", ["Frozen fish · 120 units at risk", "other stock in range"]],
      ],
      notDo: "SentrIA does not control the refrigeration or the doors. It reads the temperatures you record and tells you what is at risk.",
      example: { title: "A night on the cold chain", lines: ["Cold room 2: above its limit for 6 hours", "Vehicle 5: +3 °C in the last hour", "120 units of frozen fish at risk", "Action proposed: move 120 units to room 1 now"], result: "The stock at risk is moved before the break spreads." },
    },
    fr: {
      h1: ["Gardez la chaîne du froid", "sans rupture", "du quai à la porte."],
      lead: "SentrIA suit la température de chaque chambre froide et de chaque véhicule. Il vous prévient quand une charge sort de sa plage, et combien de stock est menacé. Le même moteur sur chaque page : comparer à la normale, signaler la seule chose sur le point de mal tourner, vous dire quoi faire aujourd'hui.",
      start: "Pour les opérateurs qui gardent des denrées ou des médicaments à température fixée.",
      stats: [["6h", "Heures avant la perte", "Chambre froide 2 au-dessus de sa limite pendant 6 heures."], ["120", "Stock menacé (valeur)", "120 unités de poisson congelé menacées. Déplacez avant que la rupture ne s'étende."], ["+3°", "Dérive", "Véhicule 5 a dérivé de 3 degrés en une heure."]],
      alerts: [["critical", "Chambre froide 2 : au-dessus de sa limite depuis 6 heures. Stock menacé."], ["critical", "Véhicule 5 : +3 °C en une heure."], ["warning", "120 unités de poisson congelé menacées."]],
      heading: "Ce que le responsable de la chaîne du froid voit chaque heure",
      items: [
        ["Quelle chambre froide dépasse sa limite", "SentrIA suit chaque chambre par rapport à sa plage fixée et compte les heures hors plage. Il vous alerte tant que le stock peut encore être sauvé.", "Chambre froide 2 au-dessus de sa limite depuis 6 heures. Stock menacé.", "Chambre, relevés de température, plage fixée", "6h", "timeline", ["6 h au-dessus de la limite", "maintenant", "24 h"]],
        ["Quel véhicule dérive", "SentrIA suit la tendance de la température de chaque véhicule. Vous voyez la dérive avant qu'elle ne franchisse la limite.", "Véhicule 5 a dérivé de 3 degrés en une heure.", "Véhicule, relevés de température, heure du relevé", "+3°", "timeline", ["+3 °C en 1 h", "maintenant", "limite atteinte"]],
        ["Combien de stock est menacé", "SentrIA additionne les unités de chaque chambre ou véhicule touché, pour que vous connaissiez la valeur en jeu avant de décider quoi déplacer.", "120 unités de poisson congelé menacées après la rupture.", "Stock par chambre ou par véhicule, unités, produit", "120", "bars", ["Poisson congelé · 120 unités menacées", "autre stock dans la plage"]],
      ],
      notDo: "SentrIA ne contrôle ni la réfrigération ni les portes. Il lit les températures que vous enregistrez et dit ce qui est menacé.",
      example: { title: "Une nuit sur la chaîne du froid", lines: ["Chambre froide 2 : au-dessus de sa limite depuis 6 heures", "Véhicule 5 : +3 °C en une heure", "120 unités de poisson congelé menacées", "Action proposée : déplacer 120 unités vers la chambre 1 maintenant"], result: "Le stock menacé est déplacé avant que la rupture ne s'étende." },
    },
  },
  "plusieurs-activites": {
    en: {
      h1: ["Every operation's", "worst problem,", "in one ranked queue."],
      lead: "When you run several operations, SentrIA puts the bottleneck, the late items and the stock at risk side by side, so a problem is seen once, not three times. Same engine on every page: compare to normal, flag the one thing about to go wrong, tell you what to do today.",
      start: "For groups that combine warehousing, transport and cold storage.",
      stats: [["9h", "One queue, ranked by cost", "Customs step on the port operation."], ["3", "Late across sites", "Late items across the warehouse and transport sites."], ["24", "Units at risk", "Stock at risk across the cold rooms."]],
      alerts: [["critical", "Port operation: customs waits 9 hours."], ["warning", "Three late items across two sites."], ["warning", "24 units at risk in cold room 1."]],
      heading: "What the group manager sees on one screen",
      items: [
        ["Which operation holds the group back", "SentrIA compares the slowest step in each operation. It names the one that costs the group most time.", "Port operation: customs waits 9 hours.", "Step times per operation and site", "9h", "compare", ["Port 9 h", "Warehouse 2 h", "Transport 1 h"]],
        ["Which late items cross sites", "SentrIA lists the late items in every site, so you can see when one problem is causing several.", "Three late items across two sites, all behind the same step.", "Item, site, operation, planned and actual times", "3", "pair", ["3 late items", "2 sites"]],
        ["How much stock is at risk", "SentrIA adds up the stock at risk in each cold room and site, so you see the total before you decide.", "24 units at risk in cold room 1.", "Stock per site and room, temperature readings", "24", "bars", ["Cold room 1 · 24 units", "other rooms in range"]],
      ],
      notDo: "SentrIA does not run your operations or set priorities for you. It puts the facts side by side. The manager decides.",
      example: { title: "One Monday across the group", lines: ["Port: customs waits 9 hours", "Three late items across two sites", "24 units at risk in cold room 1", "Action proposed: review the port step first"], result: "One problem is handled once, not three times." },
    },
    fr: {
      h1: ["Le pire problème", "de chaque activité,", "dans une file classée."],
      lead: "Quand vous gérez plusieurs activités, SentrIA met côte à côte le goulot, les retards et le stock menacé. Un problème se voit une fois, et non trois fois. Le même moteur sur chaque page : comparer à la normale, signaler la seule chose sur le point de mal tourner, vous dire quoi faire aujourd'hui.",
      start: "Pour les groupes qui combinent entrepôt, transport et stockage froid.",
      stats: [["9h", "Une file, classée par coût", "L'étape de la douane dans l'activité portuaire."], ["3", "Retards sur plusieurs sites", "Retards dans l'entrepôt et le transport."], ["24", "Unités menacées", "Stock menacé dans les chambres froides."]],
      alerts: [["critical", "Activité portuaire : la douane attend 9 heures."], ["warning", "Trois retards sur deux sites."], ["warning", "24 unités menacées dans la chambre froide 1."]],
      heading: "Ce que le responsable du groupe voit sur un seul écran",
      items: [
        ["Quelle activité retient le groupe", "SentrIA compare l'étape la plus lente de chaque activité. Il nomme celle qui coûte le plus de temps au groupe.", "Activité portuaire : la douane attend 9 heures.", "Durées par étape, par activité et par site", "9h", "compare", ["Port 9 h", "Entrepôt 2 h", "Transport 1 h"]],
        ["Quels retards traversent les sites", "SentrIA liste les retards de chaque site, pour voir quand un seul problème en cause plusieurs.", "Trois retards sur deux sites, tous derrière la même étape.", "Article, site, activité, heures prévues et réelles", "3", "pair", ["3 retards", "2 sites"]],
        ["Combien de stock est menacé", "SentrIA additionne le stock menacé dans chaque chambre froide et chaque site, pour voir le total avant de décider.", "24 unités menacées dans la chambre froide 1.", "Stock par site et par chambre, relevés de température", "24", "bars", ["Chambre 1 · 24 unités", "autres chambres dans la plage"]],
      ],
      notDo: "SentrIA ne gère pas vos activités et ne fixe pas les priorités à votre place. Il met les faits côte à côte. Le responsable décide.",
      example: { title: "Un lundi sur tout le groupe", lines: ["Port : la douane attend 9 heures", "Trois retards sur deux sites", "24 unités menacées dans la chambre froide 1", "Action proposée : revoir d'abord l'étape du port"], result: "Un problème est traité une fois, et non trois fois." },
    },
  },
  "usine-production": {
    en: {
      h1: ["Catch the drop", "before the line", "stops."],
      lead: "SentrIA watches output, machine vibration and next week's load. It warns you when a line falls under target, when a machine is heading for a stop, and when capacity runs short. Same engine on every page: compare to normal, flag the one thing about to go wrong, tell you what to do today.",
      start: "For factories with production lines and critical machines.",
      stats: [["3", "Shifts under target", "Output under target for 3 shifts. Alert before the stop."], ["3d", "Days before a predicted stop", "Vibration rising for 3 days on press 4."], ["120%", "Days of capacity left", "Next week needs 120% of capacity. Only 0 days of buffer left."]],
      alerts: [["warning", "Line 2: output under target for 3 shifts."], ["critical", "Press 4: vibration rising for 3 days."], ["warning", "Next week needs 120% of capacity."]],
      heading: "What the plant manager sees at the start of each shift",
      items: [
        ["Which line falls under target", "SentrIA compares each shift's output with the target. It alerts you when a line stays under target for several shifts, while the cause is still small.", "Line 2: output under target for 3 shifts. Alert before the stop.", "Output per line and shift, target per line", "3", "timeline", ["3 shifts under target", "now", "target"]],
        ["Which machine is heading for a stop", "SentrIA follows the vibration of each critical machine. A rising trend gives you time to plan the maintenance.", "Press 4: vibration rising for 3 days before the stop.", "Machine, vibration readings, date", "3d", "timeline", ["3 days to stop", "now", "day 7"]],
        ["Which capacity runs short next week", "SentrIA compares the order book with the capacity of each line, so you can add a shift before the orders arrive.", "Next week needs 120% of capacity. Plan a second shift.", "Order book per week, capacity per line", "120%", "bars", ["Capacity 100%", "needed 120%"]],
      ],
      notDo: "SentrIA does not stop or start machines and does not change production plans. It shows the trends. Your team decides.",
      example: { title: "One Monday on the line", lines: ["Line 2: 3 shifts under target", "Press 4: vibration rising for 3 days", "Next week: 120% of capacity", "Action proposed: service press 4 before the weekend"], result: "The stop is planned, not forced." },
    },
    fr: {
      h1: ["Repérez la baisse", "avant que la ligne", "ne s'arrête."],
      lead: "SentrIA suit la production, les vibrations des machines et la charge de la semaine prochaine. Il vous prévient quand une ligne passe sous l'objectif, quand une machine va s'arrêter, et quand la capacité manque. Le même moteur sur chaque page : comparer à la normale, signaler la seule chose sur le point de mal tourner, vous dire quoi faire aujourd'hui.",
      start: "Pour les usines avec des lignes de fabrication et des machines critiques.",
      stats: [["3", "Postes sous l'objectif", "Production sous l'objectif depuis 3 postes. Alerte avant l'arrêt."], ["3j", "Jours avant un arrêt prévu", "Vibrations en hausse depuis 3 jours sur la presse 4."], ["120 %", "Jours de capacité restants", "La semaine prochaine demande 120 % de la capacité. Zéro jour de marge."]],
      alerts: [["warning", "Ligne 2 : production sous l'objectif depuis 3 postes."], ["critical", "Presse 4 : vibrations en hausse depuis 3 jours."], ["warning", "La semaine prochaine demande 120 % de la capacité."]],
      heading: "Ce que le directeur d'usine voit au début de chaque poste",
      items: [
        ["Quelle ligne passe sous l'objectif", "SentrIA compare la production de chaque poste à l'objectif. Il vous alerte quand une ligne reste sous l'objectif pendant plusieurs postes, tant que la cause est encore petite.", "Ligne 2 : production sous l'objectif depuis 3 postes. Alerte avant l'arrêt.", "Production par ligne et par poste, objectif par ligne", "3", "timeline", ["3 postes sous l'objectif", "maintenant", "objectif"]],
        ["Quelle machine va s'arrêter", "SentrIA suit les vibrations de chaque machine critique. Une tendance à la hausse vous laisse le temps de planifier la maintenance.", "Presse 4 : vibrations en hausse depuis 3 jours avant l'arrêt.", "Machine, relevés de vibrations, date", "3j", "timeline", ["3 jours avant l'arrêt", "maintenant", "jour 7"]],
        ["Quelle capacité manquera la semaine prochaine", "SentrIA compare le carnet de commandes à la capacité de chaque ligne, pour ajouter un poste avant l'arrivée des commandes.", "La semaine prochaine demande 120 % de la capacité. Prévoyez un second poste.", "Carnet de commandes par semaine, capacité par ligne", "120 %", "bars", ["Capacité 100 %", "demande 120 %"]],
      ],
      notDo: "SentrIA n'arrête ni ne démarre aucune machine et ne modifie pas le plan de production. Il montre les tendances. Votre équipe décide.",
      example: { title: "Un lundi sur la ligne", lines: ["Ligne 2 : 3 postes sous l'objectif", "Presse 4 : vibrations en hausse depuis 3 jours", "Semaine prochaine : 120 % de la capacité", "Action proposée : entretenir la presse 4 avant le week-end"], result: "L'arrêt est planifié, il n'est pas subi." },
    },
  },
  "atelier-soustraitance": {
    en: {
      h1: ["Hit every delivery", "for every client", "in your workshop."],
      lead: "SentrIA follows each client order through your workshop. It shows which order is running behind, how much machine time is left, and whether you can take the next order. Same engine on every page: compare to normal, flag the one thing about to go wrong, tell you what to do today.",
      start: "For workshops that produce parts for other companies.",
      stats: [["2d", "Days to deadline, per order", "Order for client Alpha: 2 days past its deadline."], ["40%", "Hours of machine time left", "Machine 3 has 40% of its time free next week."], ["120%", "Of capacity", "The next client order needs 120% of your capacity."]],
      alerts: [["critical", "Client Alpha: order 2 days behind its date."], ["warning", "Machine 3: 40% of its time free next week."], ["warning", "Next client order: 120% of capacity."]],
      heading: "What the workshop manager sees before each order is released",
      items: [
        ["Which client order is behind", "SentrIA compares each order's progress with its promised date. It names the order that is behind, and by how many days.", "Client Alpha: order 2 days behind its date.", "Client, order, promised date, progress", "2d", "bars", ["Alpha · 2 days behind", "promised date"]],
        ["How much machine time is free", "SentrIA works out the load of each machine for the coming weeks, so you know where the free time is.", "Machine 3: 40% of its time free next week.", "Machine, planned hours, available hours", "40%", "timeline", ["40% free", "now", "full"]],
        ["Can you take the next order", "SentrIA compares the next client order with the capacity you have, before you accept it.", "The next client order needs 120% of your capacity.", "New order, hours needed, capacity per machine", "120%", "bars", ["Capacity 100%", "order needs 120%"]],
      ],
      notDo: "SentrIA does not accept orders or set prices for your clients. It shows the load and the delays. You decide what to accept.",
      example: { title: "A week in the workshop", lines: ["Client Alpha: 2 days behind", "Machine 3: 40% free next week", "New order: 120% of capacity", "Action proposed: move the Alpha order to machine 3"], result: "The Alpha order goes back on its date." },
    },
    fr: {
      h1: ["Tenez chaque délai", "pour chaque client", "dans votre atelier."],
      lead: "SentrIA suit chaque commande client dans votre atelier. Il montre quelle commande prend du retard, combien de temps machine reste libre, et si vous pouvez accepter la commande suivante. Le même moteur sur chaque page : comparer à la normale, signaler la seule chose sur le point de mal tourner, vous dire quoi faire aujourd'hui.",
      start: "Pour les ateliers qui produisent des pièces pour d'autres entreprises.",
      stats: [["2j", "Jours avant l'échéance, par commande", "Commande du client Alpha : 2 jours de retard sur sa date."], ["40 %", "Heures de temps machine restantes", "La machine 3 a 40 % de son temps libre la semaine prochaine."], ["120 %", "De la capacité", "La prochaine commande client demande 120 % de votre capacité."]],
      alerts: [["critical", "Client Alpha : commande 2 jours en retard sur sa date."], ["warning", "Machine 3 : 40 % de son temps libre la semaine prochaine."], ["warning", "Prochaine commande client : 120 % de la capacité."]],
      heading: "Ce que le responsable d'atelier voit avant chaque lancement",
      items: [
        ["Quelle commande client est en retard", "SentrIA compare l'avancement de chaque commande à sa date promise. Il nomme la commande en retard, et de combien de jours.", "Client Alpha : commande 2 jours en retard sur sa date.", "Client, commande, date promise, avancement", "2j", "bars", ["Alpha · 2 jours de retard", "date promise"]],
        ["Combien de temps machine est libre", "SentrIA calcule la charge de chaque machine pour les semaines à venir, pour que vous sachiez où se trouve le temps libre.", "Machine 3 : 40 % de son temps libre la semaine prochaine.", "Machine, heures planifiées, heures disponibles", "40 %", "timeline", ["40 % libre", "maintenant", "pleine"]],
        ["Pouvez-vous accepter la commande suivante", "SentrIA compare la prochaine commande client à la capacité dont vous disposez, avant que vous ne l'acceptiez.", "La prochaine commande client demande 120 % de votre capacité.", "Nouvelle commande, heures nécessaires, capacité par machine", "120 %", "bars", ["Capacité 100 %", "commande 120 %"]],
      ],
      notDo: "SentrIA n'accepte aucune commande et ne fixe aucun prix pour vos clients. Il montre la charge et les retards. Vous décidez de ce que vous acceptez.",
      example: { title: "Une semaine à l'atelier", lines: ["Client Alpha : 2 jours de retard", "Machine 3 : 40 % libre la semaine prochaine", "Nouvelle commande : 120 % de la capacité", "Action proposée : passer la commande Alpha sur la machine 3"], result: "La commande Alpha retrouve sa date." },
    },
  },
  "usine-agroalimentaire": {
    en: {
      h1: ["Catch the batch", "before it drifts", "past its limits."],
      lead: "SentrIA watches the process temperature, the batches waiting for release and the output of each line. It warns you before a batch drifts out of its limits, or a line falls behind. Same engine on every page: compare to normal, flag the one thing about to go wrong, tell you what to do today.",
      start: "For food plants that work under strict hygiene and temperature rules.",
      stats: [["32°", "Process temperature", "Mixing room at 32 °C, above its limit."], ["9d", "Days / batches before release deadline", "Batch 27 has waited 9 days for release. Act today."], ["3", "Shifts under target", "Line 1 under target for 3 shifts."]],
      alerts: [["critical", "Mixing room: 32 °C, above its limit."], ["warning", "Batch 27: 9 days waiting for release."], ["warning", "Line 1: under target for 3 shifts."]],
      heading: "What the quality and production leads see every shift",
      items: [
        ["Which process is drifting out of range", "SentrIA follows the process temperature against its set range, and alerts you while the batch can still be saved.", "Mixing room at 32 °C, above its limit.", "Process, temperature readings, set range", "32°", "timeline", ["32 °C: alert", "now", "40 °C"]],
        ["Which batch has waited too long", "SentrIA counts the days each batch has waited for release. The oldest comes first, so it is checked and released in time.", "Batch 27: 9 days waiting for release.", "Batch, production date, release status", "9d", "bars", ["Batch 27 · 9 days", "release first"]],
        ["Which line is under target", "SentrIA compares the output of each line with its target, shift by shift, so the cause is found while it is small.", "Line 1: under target for 3 shifts.", "Output per line and shift, target per line", "3", "timeline", ["3 shifts under target", "now", "target"]],
      ],
      notDo: "SentrIA does not release batches or certify hygiene. It shows the readings and the waiting times. Your quality team decides.",
      example: { title: "One shift at the plant", lines: ["Mixing room: 32 °C, above its limit", "Batch 27: 9 days waiting", "Line 1: 3 shifts under target", "Action proposed: check the mixing room and release batch 27 first"], result: "The quality team sees the drift before the batch is lost." },
    },
    fr: {
      h1: ["Repérez le lot", "avant qu'il ne sorte", "de ses limites."],
      lead: "SentrIA suit la température du procédé, les lots en attente de libération et la production de chaque ligne. Il vous prévient avant qu'un lot ne sorte de ses limites, ou qu'une ligne ne prenne du retard. Le même moteur sur chaque page : comparer à la normale, signaler la seule chose sur le point de mal tourner, vous dire quoi faire aujourd'hui.",
      start: "Pour les usines agroalimentaires soumises à des règles strictes d'hygiène et de température.",
      stats: [["32 °C", "Température du procédé", "Salle de mélange à 32 °C, au-dessus de sa limite."], ["9j", "Jours / lots avant l'échéance de libération", "Le lot 27 attend sa libération depuis 9 jours. Agissez aujourd'hui."], ["3", "Postes sous l'objectif", "Ligne 1 sous l'objectif depuis 3 postes."]],
      alerts: [["critical", "Salle de mélange : 32 °C, au-dessus de sa limite."], ["warning", "Lot 27 : 9 jours d'attente pour la libération."], ["warning", "Ligne 1 : sous l'objectif depuis 3 postes."]],
      heading: "Ce que les responsables qualité et production voient à chaque poste",
      items: [
        ["Quel procédé sort de sa plage", "SentrIA suit la température du procédé par rapport à sa plage fixée, et vous alerte tant que le lot peut encore être sauvé.", "Salle de mélange à 32 °C, au-dessus de sa limite.", "Procédé, relevés de température, plage fixée", "32 °C", "timeline", ["32 °C : alerte", "maintenant", "40 °C"]],
        ["Quel lot attend depuis trop longtemps", "SentrIA compte les jours d'attente de chaque lot avant libération. Le plus ancien passe en premier, pour être contrôlé et libéré à temps.", "Lot 27 : 9 jours d'attente pour la libération.", "Lot, date de production, statut de libération", "9j", "bars", ["Lot 27 · 9 jours", "libérer en premier"]],
        ["Quelle ligne est sous l'objectif", "SentrIA compare la production de chaque ligne à son objectif, poste par poste, pour trouver la cause pendant qu'elle est petite.", "Ligne 1 : sous l'objectif depuis 3 postes.", "Production par ligne et par poste, objectif par ligne", "3", "timeline", ["3 postes sous l'objectif", "maintenant", "objectif"]],
      ],
      notDo: "SentrIA ne libère aucun lot et ne certifie aucune hygiène. Il montre les relevés et les délais d'attente. Votre équipe qualité décide.",
      example: { title: "Un poste à l'usine", lines: ["Salle de mélange : 32 °C, au-dessus de sa limite", "Lot 27 : 9 jours d'attente", "Ligne 1 : 3 postes sous l'objectif", "Action proposée : contrôler la salle de mélange et libérer le lot 27 en premier"], result: "L'équipe qualité voit la dérive avant de perdre le lot." },
    },
  },
  "transporteur-routier": {
    en: {
      h1: ["Keep every truck", "on time", "for your clients."],
      lead: "SentrIA follows each truck against its client time window. It warns you when a load is late, when the delay will reach the next stops, and when a truck needs service. Late shows up as a drift from the usual window — before the client calls. Same engine on every page: compare to normal, flag the one thing about to go wrong, tell you what to do today.",
      start: "For hauliers who carry goods for other companies.",
      stats: [["2h", "Hours of slack (lost)", "Truck 7 is 2 hours late for its client slot."], ["3", "Stops behind it", "Three stops after it will slip."], ["7d", "Days until service", "Truck 3 brake pads due in 7 days or 500 km."]],
      alerts: [["warning", "Truck 7: 2 hours late for a client slot."], ["critical", "Three stops after it will slip. Reroute now."], ["warning", "Truck 3: brake pads due in 500 km."]],
      heading: "What the transport planner sees before the first departure",
      items: [
        ["Which truck is late for its client", "SentrIA compares each truck with its client time window. It names the truck that is late, and by how much.", "Truck 7 is 2 hours late for its client slot.", "Truck, client, planned slot, actual time", "2h", "timeline", ["2 h late", "now", "slot end"]],
        ["Which stops will slip after it", "SentrIA finds the stops that follow the late truck on its route, and warns you before they slip.", "Three stops after it will slip unless it is rerouted.", "Route, stop order, client time windows", "3", "pair", ["3 stops at risk", "reroute"]],
        ["Which truck needs service", "SentrIA counts the distance to each service point, and warns you while there is time to book the workshop.", "Truck 3: brake pads due in 500 km. Book the workshop today.", "Truck, odometer reading, service schedule", "500km", "bars", ["Truck 3 · brake pads", "due in 500 km"]],
      ],
      notDo: "SentrIA does not plan your routes or contact your clients. It shows what is late and what is due. Your planner decides.",
      example: { title: "A morning departure", lines: ["Truck 7: 2 hours late for its slot", "Three stops after it at risk", "Truck 3: brake pads due in 500 km", "Action proposed: send truck 5 to the first stops"], result: "The client slots are kept for the other trucks." },
    },
    fr: {
      h1: ["Gardez chaque camion", "à l'heure", "pour vos clients."],
      lead: "SentrIA suit chaque camion par rapport à la plage horaire de son client. Il vous prévient quand une livraison est en retard, quand le retard va atteindre les arrêts suivants, et quand un camion doit être révisé. Un retard se voit comme un écart par rapport à la plage habituelle — avant que le client n'appelle. Le même moteur sur chaque page : comparer à la normale, signaler la seule chose sur le point de mal tourner, vous dire quoi faire aujourd'hui.",
      start: "Pour les transporteurs qui acheminent des marchandises pour d'autres entreprises.",
      stats: [["2h", "Heures de marge (perdues)", "Camion 7 a 2 heures de retard sur le créneau de son client."], ["3", "Arrêts derrière", "Trois arrêts suivants vont glisser."], ["7j", "Jours avant entretien", "Plaquettes du camion 3 dans 7 jours ou 500 km."]],
      alerts: [["warning", "Camion 7 : 2 heures de retard sur le créneau client."], ["critical", "Trois arrêts suivants vont glisser. Réacheminez maintenant."], ["warning", "Camion 3 : plaquettes à changer dans 500 km."]],
      heading: "Ce que le planificateur voit avant le premier départ",
      items: [
        ["Quel camion est en retard pour son client", "SentrIA compare chaque camion à la plage horaire de son client. Il nomme le camion en retard, et de combien.", "Camion 7 a 2 heures de retard sur le créneau de son client.", "Camion, client, créneau prévu, heure réelle", "2h", "timeline", ["2 h de retard", "maintenant", "fin du créneau"]],
        ["Quels arrêts vont glisser après lui", "SentrIA repère les arrêts qui suivent le camion en retard sur sa tournée, et vous prévient avant qu'ils ne glissent.", "Trois arrêts suivants vont glisser s'il n'est pas réacheminé.", "Tournée, ordre des arrêts, créneaux clients", "3", "pair", ["3 arrêts à risque", "réacheminer"]],
        ["Quel camion doit être révisé", "SentrIA calcule la distance avant chaque point d'entretien, et vous prévient tant qu'il reste le temps de réserver l'atelier.", "Camion 3 : plaquettes à changer dans 500 km. Réservez l'atelier aujourd'hui.", "Camion, kilométrage, planning d'entretien", "500 km", "bars", ["Camion 3 · plaquettes", "à changer dans 500 km"]],
      ],
      notDo: "SentrIA ne planifie pas vos tournées et ne contacte pas vos clients. Il montre ce qui est en retard et ce qui est dû. Votre planificateur décide.",
      example: { title: "Un départ du matin", lines: ["Camion 7 : 2 heures de retard sur son créneau", "Trois arrêts suivants à risque", "Camion 3 : plaquettes à changer dans 500 km", "Action proposée : envoyer le camion 5 vers les premiers arrêts"], result: "Les créneaux des autres clients sont tenus." },
    },
  },
  "flotte-entreprise": {
    en: {
      h1: ["Your own fleet,", "on time, in service,", "before the breakdown."],
      lead: "SentrIA follows the vehicles your company uses every day. It shows which route runs late, and which vehicle is due for service before it breaks down. Same engine on every page: compare to normal, flag the one thing about to go wrong, tell you what to do today.",
      start: "For companies that run their own vehicles for their own operation.",
      stats: [["2h", "Late route", "Sales round 4 is 2 hours behind its plan."], ["7d", "Days until service due", "Van 12 is due for service in 7 days or 500 km."], ["8", "Vehicles tracked", "Eight vehicles checked against the service schedule."]],
      alerts: [["warning", "Sales round 4: 2 hours behind its plan."], ["warning", "Van 12: service due in 500 km."], ["warning", "Eight vehicles checked against the schedule."]],
      heading: "What the fleet manager sees each morning",
      items: [
        ["Which route runs late", "SentrIA compares each route with its planned times. It names the route that is behind, and by how much.", "Sales round 4 is 2 hours behind its plan.", "Vehicle, route, planned times, actual times", "2h", "timeline", ["2 h behind", "now", "plan end"]],
        ["Which vehicle is due for service", "SentrIA counts the distance to each service and warns you before it is due, so the vehicle is booked, not broken down.", "Van 12: service due in 500 km. Book the workshop.", "Vehicle, odometer reading, service schedule", "500km", "bars", ["Van 12 · service", "due in 500 km"]],
        ["Which vehicles are over their schedule", "SentrIA lists every vehicle against its service schedule, so no service is missed across the fleet.", "Eight vehicles checked against the schedule. Two are due this month.", "Vehicle list, service dates, odometer", "2", "pair", ["2 due this month", "6 in schedule"]],
      ],
      notDo: "SentrIA does not book the workshop or change the routes. It shows what is late and what is due. The fleet manager decides.",
      example: { title: "One morning for the fleet", lines: ["Sales round 4: 2 hours behind", "Van 12: service due in 500 km", "Two vehicles due this month", "Action proposed: book the workshop for van 12"], result: "Van 12 is serviced on a planned day." },
    },
    fr: {
      h1: ["Votre flotte,", "à l'heure, entretenue,", "avant la panne."],
      lead: "SentrIA suit les véhicules que votre entreprise utilise chaque jour. Il montre quelle tournée est en retard, et quel véhicule doit être révisé avant la panne. Le même moteur sur chaque page : comparer à la normale, signaler la seule chose sur le point de mal tourner, vous dire quoi faire aujourd'hui.",
      start: "Pour les entreprises qui utilisent leurs propres véhicules pour leur activité.",
      stats: [["2h", "Tournée en retard", "La tournée commerciale 4 a 2 heures de retard sur son plan."], ["7j", "Jours avant entretien", "La camionnette 12 doit être révisée dans 7 jours ou 500 km."], ["8", "Véhicules suivis", "Huit véhicules vérifiés par rapport au planning d'entretien."]],
      alerts: [["warning", "Tournée commerciale 4 : 2 heures de retard sur le plan."], ["warning", "Camionnette 12 : révision dans 500 km."], ["warning", "Huit véhicules vérifiés par rapport au planning."]],
      heading: "Ce que le responsable de flotte voit chaque matin",
      items: [
        ["Quelle tournée est en retard", "SentrIA compare chaque tournée à ses horaires prévus. Il nomme la tournée en retard, et de combien.", "Tournée commerciale 4 : 2 heures de retard sur son plan.", "Véhicule, tournée, horaires prévus, horaires réels", "2h", "timeline", ["2 h de retard", "maintenant", "fin du plan"]],
        ["Quel véhicule doit être révisé", "SentrIA calcule la distance avant chaque révision et vous prévient avant l'échéance, pour réserver le véhicule plutôt que de le subir en panne.", "Camionnette 12 : révision dans 500 km. Réservez l'atelier.", "Véhicule, kilométrage, planning d'entretien", "500 km", "bars", ["Camionnette 12 · révision", "dans 500 km"]],
        ["Quels véhicules dépassent leur planning", "SentrIA liste chaque véhicule par rapport à son planning d'entretien, pour qu'aucune révision ne soit oubliée dans la flotte.", "Huit véhicules vérifiés. Deux sont dus ce mois-ci.", "Liste des véhicules, dates d'entretien, kilométrage", "2", "pair", ["2 dus ce mois-ci", "6 dans le planning"]],
      ],
      notDo: "SentrIA ne réserve pas l'atelier et ne modifie pas les tournées. Il montre ce qui est en retard et ce qui est dû. Le responsable de flotte décide.",
      example: { title: "Un matin pour la flotte", lines: ["Tournée commerciale 4 : 2 heures de retard", "Camionnette 12 : révision dans 500 km", "Deux véhicules dus ce mois-ci", "Action proposée : réserver l'atelier pour la camionnette 12"], result: "La camionnette 12 est révisée à un jour prévu." },
    },
  },
  "location-vehicules": {
    en: {
      h1: ["Rented vehicles", "back on time", "and in service."],
      lead: "SentrIA follows each rented vehicle against its return date and service schedule. It warns you about late pickups and returns, and about vehicles due for service before the next customer. Same engine on every page: compare to normal, flag the one thing about to go wrong, tell you what to do today.",
      start: "For rental companies that make a fleet available to customers.",
      stats: [["7d", "Days until return / service", "Car 9 is due for service in 7 days, before its next rental."], ["2h", "Late return", "Car 4 is 2 hours late for its return slot."], ["3", "Rentals at risk", "Three rentals depend on cars due back today."]],
      alerts: [["warning", "Car 4: 2 hours late for its return slot."], ["critical", "Car 9: service due in 500 km, before its next rental."], ["warning", "Three rentals depend on cars due back today."]],
      heading: "What the rental desk sees before each customer",
      items: [
        ["Which vehicle is due for service", "SentrIA counts the distance left to each service. It flags the car while there is still time to book it between two rentals.", "Car 9: service due in 500 km, before its next rental.", "Vehicle, odometer reading, next rental date", "500km", "bars", ["Car 9 · service", "due in 500 km"]],
        ["Which return is running late", "SentrIA compares each expected return with the time it is due. It names the vehicle that will be late for the next customer.", "Car 4 is 2 hours late for its return slot.", "Vehicle, rental, planned return, expected return", "2h", "timeline", ["2 h late", "now", "return slot"]],
        ["Which rentals depend on a car due back", "SentrIA lists the rentals that will be affected if a car is late, so you can offer another car in time.", "Three rentals depend on cars due back today.", "Rental, vehicle, pickup time", "3", "pair", ["3 rentals at risk", "offer another car"]],
      ],
      notDo: "SentrIA does not contact your customers or book the workshop. It shows what is late and what is due. Your team acts.",
      example: { title: "A busy Saturday at the desk", lines: ["Car 4: 2 hours late for its return", "Car 9: service due before its next rental", "Three rentals depend on cars due today", "Action proposed: offer car 6 for the first pickup"], result: "The first customer gets a car on time." },
    },
    fr: {
      h1: ["Les véhicules loués", "de retour à l'heure", "et entretenus."],
      lead: "SentrIA suit chaque véhicule loué par rapport à sa date de retour et à son planning d'entretien. Il vous prévient des retours et prises en retard, et des véhicules à réviser avant le client suivant. Le même moteur sur chaque page : comparer à la normale, signaler la seule chose sur le point de mal tourner, vous dire quoi faire aujourd'hui.",
      start: "Pour les loueurs qui mettent une flotte à disposition de leurs clients.",
      stats: [["7j", "Jours avant retour / entretien", "La voiture 9 doit être révisée dans 7 jours, avant sa prochaine location."], ["2h", "Retour en retard", "La voiture 4 a 2 heures de retard sur son créneau de retour."], ["3", "Locations à risque", "Trois locations dépendent de voitures attendues aujourd'hui."]],
      alerts: [["warning", "Voiture 4 : 2 heures de retard sur son créneau de retour."], ["critical", "Voiture 9 : révision dans 500 km, avant sa prochaine location."], ["warning", "Trois locations dépendent de voitures attendues aujourd'hui."]],
      heading: "Ce que le comptoir voit avant chaque client",
      items: [
        ["Quel véhicule doit être révisé", "SentrIA calcule la distance restante avant chaque révision. Il signale la voiture tant qu'il reste le temps de la réserver entre deux locations.", "Voiture 9 : révision dans 500 km, avant sa prochaine location.", "Véhicule, kilométrage, date de la prochaine location", "500 km", "bars", ["Voiture 9 · révision", "dans 500 km"]],
        ["Quel retour est en retard", "SentrIA compare chaque retour attendu à l'heure prévue. Il nomme le véhicule qui sera en retard pour le client suivant.", "La voiture 4 a 2 heures de retard sur son créneau de retour.", "Véhicule, location, retour prévu, retour attendu", "2h", "timeline", ["2 h de retard", "maintenant", "créneau de retour"]],
        ["Quelles locations dépendent d'un retour", "SentrIA liste les locations touchées si une voiture arrive en retard, pour que vous proposiez à temps une autre voiture.", "Trois locations dépendent de voitures attendues aujourd'hui.", "Location, véhicule, heure de prise en charge", "3", "pair", ["3 locations à risque", "proposer une autre voiture"]],
      ],
      notDo: "SentrIA ne contacte pas vos clients et ne réserve pas l'atelier. Il montre ce qui est en retard et ce qui est dû. Votre équipe agit.",
      example: { title: "Un samedi chargé au comptoir", lines: ["Voiture 4 : 2 heures de retard pour son retour", "Voiture 9 : révision avant sa prochaine location", "Trois locations dépendent de voitures attendues", "Action proposée : proposer la voiture 6 pour la première prise en charge"], result: "Le premier client reçoit sa voiture à l'heure." },
    },
  },
  "centrale-production": {
    en: {
      h1: ["See the peak", "before the grid", "feels it."],
      lead: "SentrIA compares demand with the usual curve and with your available output. It warns you before a peak, and before the margin falls below what the next peak needs. Same engine on every page: compare to normal, flag the one thing about to go wrong, tell you what to do today.",
      start: "For power plants that generate for the grid at large scale.",
      stats: [["+30%", "Above the curve", "Demand 30% above the usual curve at 18:00."], ["120%", "Of the margin", "The next peak needs 120% of available output."], ["2d", "Fuel left", "Gas for 2 days at full output. Order today."]],
      alerts: [["warning", "Demand: +30% above the usual curve at 18:00."], ["critical", "The next peak needs 120% of available output."], ["warning", "Fuel: 2 days left at full output."]],
      heading: "What the control room sees before each peak",
      items: [
        ["Which peak is coming", "SentrIA compares the forecast demand with the usual curve. It names the hour when the peak will rise above it.", "Demand 30% above the usual curve at 18:00.", "Demand readings per hour, usual curve per day", "+30%", "timeline", ["+30% at 18:00", "now", "24 h"]],
        ["Is there enough output for the peak", "SentrIA compares the output you can run with the demand you expect, and warns you when the margin is too thin.", "The next peak needs 120% of available output.", "Available output per unit, expected demand", "120%", "bars", ["Output 100%", "peak needs 120%"]],
        ["How long the fuel will last", "SentrIA works out the fuel left at full output, in days, so you order before the stock runs down.", "Gas for 2 days at full output. Order today.", "Fuel stock, consumption per day", "2d", "bars", ["Gas · 2 days", "7 days"]],
      ],
      notDo: "SentrIA does not start or stop units and does not trade power. It shows the demand and the margin. Your operators decide.",
      example: { title: "One day in the control room", lines: ["Demand: 30% above the curve at 18:00", "The peak needs 120% of available output", "Gas: 2 days left at full output", "Action proposed: start the reserve unit before 17:00"], result: "The peak is covered before it arrives." },
    },
    fr: {
      h1: ["Voyez le pic", "avant que le réseau", "ne le subisse."],
      lead: "SentrIA compare la demande à la courbe habituelle et à la production disponible. Il vous prévient avant un pic, et avant que la marge ne tombe sous ce que le pic suivant demande. Le même moteur sur chaque page : comparer à la normale, signaler la seule chose sur le point de mal tourner, vous dire quoi faire aujourd'hui.",
      start: "Pour les centrales qui produisent pour le réseau à grande échelle.",
      stats: [["+30 %", "Au-dessus de la courbe", "Demande 30 % au-dessus de la courbe habituelle à 18 h."], ["120 %", "De la marge", "Le prochain pic demande 120 % de la production disponible."], ["2j", "Carburant restant", "Gaz pour 2 jours à pleine puissance. Commandez aujourd'hui."]],
      alerts: [["warning", "Demande : +30 % au-dessus de la courbe à 18 h."], ["critical", "Le prochain pic demande 120 % de la production disponible."], ["warning", "Carburant : 2 jours restants à pleine puissance."]],
      heading: "Ce que la salle de contrôle voit avant chaque pic",
      items: [
        ["Quel pic arrive", "SentrIA compare la demande prévue à la courbe habituelle. Il nomme l'heure à laquelle le pic dépassera cette courbe.", "Demande 30 % au-dessus de la courbe habituelle à 18 h.", "Relevés de demande par heure, courbe habituelle par jour", "+30 %", "timeline", ["+30 % à 18 h", "maintenant", "24 h"]],
        ["La production suffit-elle pour le pic", "SentrIA compare la production que vous pouvez faire tourner à la demande attendue, et vous prévient quand la marge est trop faible.", "Le prochain pic demande 120 % de la production disponible.", "Production disponible par groupe, demande attendue", "120 %", "bars", ["Production 100 %", "pic demande 120 %"]],
        ["Combien de temps dure le carburant", "SentrIA calcule le carburant restant à pleine puissance, en jours, pour que vous commandiez avant la rupture.", "Gaz pour 2 jours à pleine puissance. Commandez aujourd'hui.", "Stock de carburant, consommation par jour", "2j", "bars", ["Gaz · 2 jours", "7 jours"]],
      ],
      notDo: "SentrIA ne démarre ni n'arrête aucun groupe et ne fait aucun échange d'énergie. Il montre la demande et la marge. Vos opérateurs décident.",
      example: { title: "Une journée en salle de contrôle", lines: ["Demande : 30 % au-dessus de la courbe à 18 h", "Le pic demande 120 % de la production disponible", "Gaz : 2 jours restants à pleine puissance", "Action proposée : démarrer le groupe de réserve avant 17 h"], result: "Le pic est couvert avant d'arriver." },
    },
  },
  "generateurs-secours": {
    en: {
      h1: ["Keep the generators", "ready for the", "next outage."],
      lead: "SentrIA follows the fuel, the service dates and the load on each generator. It warns you before a generator runs dry, or falls due for service, in the middle of an outage. Same engine on every page: compare to normal, flag the one thing about to go wrong, tell you what to do today.",
      start: "For backup generator operators and sites that cannot stop.",
      stats: [["2d", "Days of fuel at full load", "Generator 2: 2 days of fuel at full load. Order today."], ["250h", "To service", "Generator 1 is due for service in 250 hours."], ["18:00", "Load peak", "Site load rises at 18:00 on weekdays."]],
      alerts: [["critical", "Generator 2: 2 days of fuel left. Order today."], ["warning", "Generator 1: service due in 250 hours."], ["warning", "Load rises at 18:00 on weekdays."]],
      heading: "What the site engineer checks each day",
      items: [
        ["Which generator has fuel for the least time", "SentrIA works out the days of fuel left on each generator at its usual load. It flags the one that will run dry first.", "Generator 2: 2 days of fuel left. Order today.", "Fuel level per tank, usual load per generator", "2d", "bars", ["Generator 2 · 2 days", "7 days of fuel"]],
        ["Which generator is due for service", "SentrIA counts the running hours left before each service, and warns you in time to plan it outside an outage.", "Generator 1: service due in 250 hours.", "Generator, running hours, service schedule", "250h", "bars", ["Generator 1 · service", "due in 250 h"]],
        ["When the load rises", "SentrIA shows the hours when the site load climbs, so you can test or start the generators before the peak.", "Load rises at 18:00 on weekdays.", "Site load per hour, days of the week", "18:00", "timeline", ["18:00 rise", "now", "24 h"]],
      ],
      notDo: "SentrIA does not start generators or order fuel. It shows what is low, what is due and when the load rises. Your engineers decide.",
      example: { title: "A weekday on the site", lines: ["Generator 2: 2 days of fuel left", "Generator 1: service in 250 hours", "Load rises at 18:00", "Action proposed: order fuel today and test generator 2 before 17:00"], result: "The site is ready before the load rises." },
    },
    fr: {
      h1: ["Gardez les générateurs", "prêts pour la", "prochaine coupure."],
      lead: "SentrIA suit le carburant, les dates d'entretien et la charge de chaque générateur. Il vous prévient avant qu'un générateur ne tombe à sec, ou ne doive être révisé, en pleine coupure. Le même moteur sur chaque page : comparer à la normale, signaler la seule chose sur le point de mal tourner, vous dire quoi faire aujourd'hui.",
      start: "Pour les opérateurs de générateurs de secours et les sites qui ne peuvent pas s'arrêter.",
      stats: [["2j", "Jours de carburant à pleine charge", "Générateur 2 : 2 jours de carburant à pleine charge. Commandez aujourd'hui."], ["250 h", "Avant entretien", "Le générateur 1 doit être révisé dans 250 heures."], ["18 h", "Pic de charge", "La charge du site monte à 18 h les jours ouvrés."]],
      alerts: [["critical", "Générateur 2 : 2 jours de carburant restants. Commandez aujourd'hui."], ["warning", "Générateur 1 : révision dans 250 heures."], ["warning", "La charge monte à 18 h les jours ouvrés."]],
      heading: "Ce que l'ingénieur du site vérifie chaque jour",
      items: [
        ["Quel générateur a le moins de carburant", "SentrIA calcule les jours de carburant restants sur chaque générateur à sa charge habituelle. Il signale celui qui manquera en premier.", "Générateur 2 : 2 jours de carburant restants. Commandez aujourd'hui.", "Niveau de carburant par cuve, charge habituelle par générateur", "2j", "bars", ["Générateur 2 · 2 jours", "7 jours de carburant"]],
        ["Quel générateur doit être révisé", "SentrIA compte les heures de marche restantes avant chaque révision, et vous prévient à temps pour la planifier hors coupure.", "Générateur 1 : révision dans 250 heures.", "Générateur, heures de marche, planning d'entretien", "250 h", "bars", ["Générateur 1 · révision", "dans 250 h"]],
        ["Quand la charge monte", "SentrIA montre les heures où la charge du site augmente, pour que vous testiez ou démarriez les générateurs avant le pic.", "La charge monte à 18 h les jours ouvrés.", "Charge du site par heure, jours de la semaine", "18 h", "timeline", ["18 h : hausse", "maintenant", "24 h"]],
      ],
      notDo: "SentrIA ne démarre aucun générateur et ne commande aucun carburant. Il montre ce qui est bas, ce qui est dû et quand la charge monte. Vos ingénieurs décident.",
      example: { title: "Un jour de semaine sur le site", lines: ["Générateur 2 : 2 jours de carburant restants", "Générateur 1 : révision dans 250 heures", "La charge monte à 18 h", "Action proposée : commander le carburant aujourd'hui et tester le générateur 2 avant 17 h"], result: "Le site est prêt avant la hausse de charge." },
    },
  },
  "distribution-energetique": {
    en: {
      h1: ["Watch the grid", "where the pressure", "builds."],
      lead: "SentrIA follows the load on each zone of your network. It shows when pressure rises, which zone is near its limit, and where a peak is likely to cause an outage. Each zone's load is compared to its own normal — the deviation shows before the overload lands. Same engine on every page: compare to normal, flag the one thing about to go wrong, tell you what to do today.",
      start: "For distribution operators who run the local grid.",
      stats: [["18:00", "Pressure rises", "Network pressure rises at 18:00 on weekdays."], ["2h", "Hours before overload, per zone", "Zone A at 130% of load — overload in 2 hours without action."], ["3", "Zones near limit", "Three zones close to their limit this week."]],
      alerts: [["warning", "Network pressure: rising at 18:00 on weekdays."], ["critical", "Zone A: 130% of planned load at peak."], ["warning", "Three zones close to their limit this week."]],
      heading: "What the grid operator sees before the evening peak",
      items: [
        ["When the pressure rises", "SentrIA shows the hour when the load climbs on your network, so you can prepare the zones before it does.", "Pressure rises at 18:00 on weekdays.", "Load readings per zone and hour", "18:00", "timeline", ["18:00 rise", "now", "24 h"]],
        ["Which zone is over its limit", "SentrIA compares the load of each zone with its planned limit. It names the zone that will be over at peak.", "Zone A: 130% of its planned load at peak.", "Zone, planned load, measured load", "130%", "compare", ["Zone A 130%", "Zone B 95%", "Zone C 80%"]],
        ["Which zones are near their limit", "SentrIA lists the zones close to their limit this week, so you can plan the work before the peak.", "Three zones close to their limit this week.", "Zone list, planned limits, weekly peaks", "3", "pair", ["3 zones near limit", "plan the work"]],
      ],
      notDo: "SentrIA does not switch loads or change the network. It shows where the pressure builds. Your operators decide what to do.",
      example: { title: "One weekday on the network", lines: ["Pressure rises at 18:00", "Zone A at 130% of its planned load", "Three zones near their limit", "Action proposed: prepare the zone A reserve before 17:00"], result: "Zone A is ready before the peak." },
    },
    fr: {
      h1: ["Surveillez le réseau", "là où la pression", "monte."],
      lead: "SentrIA suit la charge de chaque zone de votre réseau. Il montre quand la pression monte, quelle zone approche de sa limite, et où un pic risque de causer une coupure. La charge de chaque zone est comparée à sa propre normale — l'écart se voit avant la surcharge. Le même moteur sur chaque page : comparer à la normale, signaler la seule chose sur le point de mal tourner, vous dire quoi faire aujourd'hui.",
      start: "Pour les opérateurs de distribution qui gèrent le réseau local.",
      stats: [["18 h", "La pression monte", "La pression sur le réseau monte à 18 h les jours ouvrés."], ["2h", "Heures avant surcharge, par zone", "Zone A à 130 % de sa charge — surcharge dans 2 heures sans action."], ["3", "Zones proches de leur limite", "Trois zones proches de leur limite cette semaine."]],
      alerts: [["warning", "Pression sur le réseau : hausse à 18 h les jours ouvrés."], ["critical", "Zone A : 130 % de la charge prévue au pic."], ["warning", "Trois zones proches de leur limite cette semaine."]],
      heading: "Ce que le gestionnaire du réseau voit avant le pic du soir",
      items: [
        ["Quand la pression monte", "SentrIA montre l'heure à laquelle la charge monte sur votre réseau, pour préparer les zones avant elle.", "La pression monte à 18 h les jours ouvrés.", "Relevés de charge par zone et par heure", "18 h", "timeline", ["18 h : hausse", "maintenant", "24 h"]],
        ["Quelle zone dépasse sa limite", "SentrIA compare la charge de chaque zone à sa limite prévue. Il nomme la zone qui dépassera au pic.", "Zone A : 130 % de sa charge prévue au pic.", "Zone, charge prévue, charge mesurée", "130 %", "compare", ["Zone A 130 %", "Zone B 95 %", "Zone C 80 %"]],
        ["Quelles zones sont proches de leur limite", "SentrIA liste les zones proches de leur limite cette semaine, pour planifier les travaux avant le pic.", "Trois zones proches de leur limite cette semaine.", "Liste des zones, limites prévues, pics hebdomadaires", "3", "pair", ["3 zones proches", "planifier les travaux"]],
      ],
      notDo: "SentrIA ne coupe ni ne transfère aucune charge et ne modifie pas le réseau. Il montre où la pression monte. Vos opérateurs décident.",
      example: { title: "Un jour de semaine sur le réseau", lines: ["La pression monte à 18 h", "Zone A à 130 % de sa charge prévue", "Trois zones proches de leur limite", "Action proposée : préparer la réserve de la zone A avant 17 h"], result: "La zone A est prête avant le pic." },
    },
  },
  "clinique-hopital": {
    en: {
      h1: ["Know which supplies", "will run out", "before the ward does."],
      lead: "Upload your stock and usage file. SentrIA estimates how many days of each supply you have left, flags the batches that will expire before they are used, and shows which ward uses more than usual. Same engine on every page: compare to normal, flag the one thing about to go wrong, tell you what to do today.",
      start: "For hospitals and clinics that manage their own clinical stock.",
      stats: [["8d", "Days left, critical supply", "Gloves size M: 8 days left. Next delivery in 10 days."], ["30d", "To expiry", "Antibiotic batch B12 expires in 30 days. Use it first."], ["+40%", "Above usual", "Ward 2 used 40% more dressings than usual this week."]],
      alerts: [["critical", "Gloves size M: 8 days left, next delivery in 10 days. Order now."], ["warning", "Antibiotic batch B12: 30 days to expiry. Use it first."], ["warning", "Ward 2: dressings 40% above usual use this week."]],
      heading: "What the hospital pharmacy sees every morning",
      items: [
        ["Which supply runs out before the next delivery", "SentrIA divides each supply's stock by its average daily use and compares the result with the next delivery date. It lists the supplies that will run out first.", "Gloves size M: 8 days left. Next delivery in 10 days.", "Product, quantity on hand, daily use, next delivery date", "8d", "bars", ["Gloves size M · 8 days", "next delivery in 10 days"]],
        ["Which batch expires before it is used", "SentrIA reads each batch's expiry date and its usual use. The batches that will not be used in time come first, so you can use them first or return them.", "Antibiotic batch B12: 30 days to expiry, 45 days of stock. Use it first.", "Product, batch number, expiry date, quantity", "30d", "bars", ["Batch B12 · 30 days to expiry", "45 days of stock"]],
        ["Which ward uses more than usual", "SentrIA compares each ward's use of a supply this week with its usual use. A sharp rise shows up before the stock does.", "Ward 2: dressings 40% above usual use this week.", "Ward, product, quantity used by day", "+40%", "compare", ["stock 90", "usual 100", "this week 140"]],
      ],
      notDo: "SentrIA does not order supplies or change prescriptions. It shows what the records say and what needs attention first. You decide.",
      example: { title: "One morning at the hospital pharmacy", lines: ["Gloves size M: 8 days left, delivery in 10 days", "Antibiotic batch B12: 30 days to expiry", "Ward 2: dressings 40% above usual use", "Action proposed: order gloves today and use batch B12 first"], result: "The order goes out before the ward runs short." },
    },
    fr: {
      h1: ["Sachez quelles fournitures", "vont manquer", "avant le service."],
      lead: "Envoyez votre fichier de stock et de consommation. SentrIA estime le nombre de jours qu'il vous reste de chaque fourniture, signale les lots qui seront périmés avant d'être utilisés, et montre quel service consomme plus que d'habitude. Le même moteur sur chaque page : comparer à la normale, signaler la seule chose sur le point de mal tourner, vous dire quoi faire aujourd'hui.",
      start: "Pour les hôpitaux et cliniques qui gèrent leur propre stock clinique.",
      stats: [["8j", "Jours restants, fourniture critique", "Gants taille M : 8 jours restants. Prochaine livraison dans 10 jours."], ["30j", "Avant péremption", "Lot d'antibiotique B12 périmé dans 30 jours. Utilisez-le en premier."], ["+40 %", "Au-dessus de l'usage", "Le service 2 a utilisé 40 % de pansements en plus cette semaine."]],
      alerts: [["critical", "Gants taille M : 8 jours restants, prochaine livraison dans 10 jours. Commandez maintenant."], ["warning", "Lot d'antibiotique B12 : 30 jours avant péremption. Utilisez-le en premier."], ["warning", "Service 2 : pansements 40 % au-dessus de l'usage habituel cette semaine."]],
      heading: "Ce que la pharmacie de l'hôpital voit chaque matin",
      items: [
        ["Quelle fourniture manque avant la prochaine livraison", "SentrIA divise le stock de chaque fourniture par sa consommation moyenne par jour et compare le résultat à la date de la prochaine livraison. Il liste les fournitures qui manqueront en premier.", "Gants taille M : 8 jours restants. Prochaine livraison dans 10 jours.", "Produit, quantité en stock, consommation par jour, date de prochaine livraison", "8j", "bars", ["Gants taille M · 8 jours", "prochaine livraison dans 10 jours"]],
        ["Quel lot périme avant d'être utilisé", "SentrIA lit la date de péremption de chaque lot et son usage habituel. Les lots qui ne seront pas utilisés à temps passent en tête, pour les utiliser en premier ou les retourner.", "Lot d'antibiotique B12 : 30 jours avant péremption, 45 jours de stock. Utilisez-le en premier.", "Produit, numéro de lot, date de péremption, quantité", "30j", "bars", ["Lot B12 · 30 jours avant péremption", "45 jours de stock"]],
        ["Quel service consomme plus que d'habitude", "SentrIA compare la consommation de chaque service cette semaine à son usage habituel. Une hausse forte se voit avant que le stock ne baisse.", "Service 2 : pansements 40 % au-dessus de l'usage habituel cette semaine.", "Service, produit, quantité utilisée par jour", "+40 %", "compare", ["stock 90", "habituel 100", "cette semaine 140"]],
      ],
      notDo: "SentrIA ne commande aucune fourniture et ne modifie aucune prescription. Il montre ce que disent les relevés et ce qui demande votre attention en premier. Vous décidez.",
      example: { title: "Un matin à la pharmacie de l'hôpital", lines: ["Gants taille M : 8 jours restants, livraison dans 10 jours", "Lot d'antibiotique B12 : 30 jours avant péremption", "Service 2 : pansements 40 % au-dessus de l'usage habituel", "Action proposée : commander les gants aujourd'hui et utiliser le lot B12 en premier"], result: "La commande part avant que le service ne manque." },
    },
  },
  laboratoire: {
    en: {
      h1: ["Keep every test supplied", "and every sample", "in time."],
      lead: "Upload your reagent stock and your test volumes. SentrIA estimates how many tests each reagent still covers, flags the reagent lots that expire first, and warns when a sample has waited too long. How many tests each reagent still covers — your days of stock, counted in tests. Same engine on every page: compare to normal, flag the one thing about to go wrong, tell you what to do today.",
      start: "For laboratories that run tests and keep reagents and samples.",
      stats: [["120", "Tests left", "Reagent A: 120 tests left before reorder. 60 booked this week."], ["14d", "To expiry", "Reagent lot R7 expires in 14 days. Use it first."], ["6h", "Sample waiting", "Sample S-218 has waited 6 hours. The limit is 8 hours."]],
      alerts: [["critical", "Reagent A: 40 tests left, 60 booked this week. Order now."], ["warning", "Reagent lot R7: 14 days to expiry. Use it first."], ["critical", "Sample S-218: 6 hours waiting, limit 8 hours. Process it now."]],
      heading: "What the lab manager sees every morning",
      items: [
        ["Which reagent will not cover the booked tests", "SentrIA divides each reagent's stock by the tests it needs and compares the result with the tests booked. It lists the reagents that will run short first.", "Reagent A covers 40 tests. 60 are booked this week.", "Reagent, quantity on hand, tests per kit, tests booked", "40", "pair", ["Reagent A: 40 tests left", "Booked this week: 60"]],
        ["Which reagent lot expires first", "SentrIA reads each lot's expiry date and its usual use. The lots that will not be used in time come first.", "Lot R7: 14 days to expiry, 30 days of use. Use it first.", "Reagent, lot number, expiry date, quantity", "14d", "bars", ["Lot R7 · 14 days to expiry", "30 days of use"]],
        ["Which sample has waited too long", "SentrIA compares the time since collection with the limit for each type of test. It lists the samples that are close to the limit.", "Sample S-218: 6 hours since collection. The limit is 8 hours.", "Sample, type of test, collection time", "6h", "timeline", ["6 hours waiting", "collected", "8 h limit"]],
      ],
      notDo: "SentrIA does not run tests or release results. It reads your stock and sample records and shows what needs attention first. The laboratory decides.",
      example: { title: "One morning in the laboratory", lines: ["Reagent A: 40 tests left, 60 booked", "Lot R7: 14 days to expiry", "Sample S-218: 6 hours waiting, limit 8 hours", "Action proposed: process S-218 now and order reagent A"], result: "The sample is processed in time and the reagent order goes out." },
    },
    fr: {
      h1: ["Gardez chaque test approvisionné", "et chaque échantillon", "dans les temps."],
      lead: "Envoyez votre stock de réactifs et vos volumes d'analyses. SentrIA estime le nombre de tests que chaque réactif couvre encore, signale les lots de réactifs qui périment en premier, et vous prévient quand un échantillon attend trop longtemps. Combien de tests chaque réactif couvre encore — vos jours de stock, comptés en tests. Le même moteur sur chaque page : comparer à la normale, signaler la seule chose sur le point de mal tourner, vous dire quoi faire aujourd'hui.",
      start: "Pour les laboratoires qui réalisent des analyses et gardent réactifs et échantillons.",
      stats: [["120", "Tests restants", "Réactif A : 120 tests restants avant commande. 60 prévus cette semaine."], ["14j", "Avant péremption", "Le lot de réactif R7 périme dans 14 jours. Utilisez-le en premier."], ["6h", "Échantillon en attente", "L'échantillon S-218 attend depuis 6 heures. La limite est de 8 heures."]],
      alerts: [["critical", "Réactif A : 40 tests restants, 60 prévus cette semaine. Commandez maintenant."], ["warning", "Lot de réactif R7 : 14 jours avant péremption. Utilisez-le en premier."], ["critical", "Échantillon S-218 : 6 heures d'attente, limite 8 heures. Traitez-le maintenant."]],
      heading: "Ce que le responsable du laboratoire voit chaque matin",
      items: [
        ["Quel réactif ne couvrira pas les tests prévus", "SentrIA divise le stock de chaque réactif par les tests qu'il demande et compare le résultat aux tests prévus. Il liste les réactifs qui manqueront en premier.", "Le réactif A couvre 40 tests. 60 sont prévus cette semaine.", "Réactif, quantité en stock, tests par kit, tests prévus", "40", "pair", ["Réactif A : 40 tests restants", "Prévus cette semaine : 60"]],
        ["Quel lot de réactif périme en premier", "SentrIA lit la date de péremption de chaque lot et son usage habituel. Les lots qui ne seront pas utilisés à temps passent en tête.", "Lot R7 : 14 jours avant péremption, 30 jours d'usage. Utilisez-le en premier.", "Réactif, numéro de lot, date de péremption, quantité", "14j", "bars", ["Lot R7 · 14 jours avant péremption", "30 jours d'usage"]],
        ["Quel échantillon a attendu trop longtemps", "SentrIA compare le temps écoulé depuis le prélèvement à la limite de chaque type d'analyse. Il liste les échantillons proches de la limite.", "Échantillon S-218 : 6 heures depuis le prélèvement. La limite est de 8 heures.", "Échantillon, type d'analyse, heure de prélèvement", "6h", "timeline", ["6 heures d'attente", "prélevé", "limite 8 h"]],
      ],
      notDo: "SentrIA ne réalise aucune analyse et ne libère aucun résultat. Il lit vos relevés de stock et d'échantillons et montre ce qui demande votre attention en premier. Le laboratoire décide.",
      example: { title: "Un matin au laboratoire", lines: ["Réactif A : 40 tests restants, 60 prévus", "Lot R7 : 14 jours avant péremption", "Échantillon S-218 : 6 heures d'attente, limite 8 heures", "Action proposée : traiter S-218 maintenant et commander le réactif A"], result: "L'échantillon est traité à temps et la commande de réactif part." },
    },
  },
  veterinaire: {
    en: {
      h1: ["Keep vaccines cold", "and sell the stock", "before it expires."],
      lead: "Upload your stock file. SentrIA shows which batches to use first, flags a fridge that goes out of range, and lists the stock that has stopped moving, and which vaccines run out before the next delivery. Same engine on every page: compare to normal, flag the one thing about to go wrong, tell you what to do today.",
      start: "For veterinary clinics and animal health pharmacies.",
      stats: [["8°C", "Cold chain", "Warned above 8 °C and below 2 °C, and when no temperature is recorded."], ["30d", "Days to expiry / days of stock", "Batches 30 to 90 days from expiry are flagged to leave first."], ["60d", "No sale", "Dewormer D-40: 60 days without a sale. Usual gap: 14 days."]],
      alerts: [["critical", "Vaccine fridge 2: 9 °C since 06:00. Check the cold chain now."], ["warning", "Rabies batch V-112: 30 days to expiry. Sell it first."], ["warning", "Dewormer D-40: 60 days without a sale. Usual gap: 14 days."]],
      heading: "What the clinic sees every morning",
      items: [
        ["Which fridge has left its safe range", "SentrIA reads the temperature records of each fridge. It warns above 8 °C, below 2 °C, and when no reading was recorded.", "Vaccine fridge 2: 9 °C since 06:00. Check it now.", "Fridge, temperature reading, time of reading", "9°", "timeline", ["9 °C now", "safe range", "8 °C limit"]],
        ["Which batch should leave first", "SentrIA reads each batch's expiry date. Batches 30 to 90 days from expiry are flagged to leave first, and those that will not sell in time suggest a return to the supplier.", "Rabies batch V-112: 30 days to expiry. Sell it first.", "Product, batch number, expiry date, quantity", "30d", "bars", ["Batch V-112 · 30 days to expiry", "sell first"]],
        ["Which stock has stopped moving", "SentrIA lists the products with no sale for longer than their usual gap, with the value left on the shelf.", "Dewormer D-40: 60 days without a sale. Usual gap: 14 days.", "Product, sales by day, quantity on hand", "60d", "timeline", ["60 days, no sale", "last sale", "usual gap 14 days"]],
      ],
      notDo: "SentrIA does not control the fridges or dispose of any stock. It reads the records you enter and shows what needs attention first. The clinic decides.",
      example: { title: "One morning at the veterinary clinic", lines: ["Vaccine fridge 2: 9 °C since 06:00", "Rabies batch V-112: 30 days to expiry", "Dewormer D-40: 60 days without a sale", "Action proposed: check fridge 2 and sell batch V-112 first"], result: "The cold chain is checked before the vaccines are lost." },
    },
    fr: {
      h1: ["Gardez les vaccins au froid", "et vendez le stock", "avant sa péremption."],
      lead: "Envoyez votre fichier de stock. SentrIA montre quels lots utiliser en premier, signale un réfrigérateur qui sort de sa plage, et liste le stock qui ne tourne plus, et quels vaccins manqueront avant la prochaine livraison. Le même moteur sur chaque page : comparer à la normale, signaler la seule chose sur le point de mal tourner, vous dire quoi faire aujourd'hui.",
      start: "Pour les cliniques vétérinaires et les pharmacies de santé animale.",
      stats: [["8°C", "Chaîne du froid", "Alerte au-dessus de 8 °C, en dessous de 2 °C, et quand aucune température n'est enregistrée."], ["30j", "Jours avant péremption / jours de stock", "Les lots à 30 à 90 jours de la péremption sont signalés pour partir en premier."], ["60j", "Sans vente", "Vermifuge D-40 : 60 jours sans vente. Écart habituel : 14 jours."]],
      alerts: [["critical", "Réfrigérateur à vaccins 2 : 9 °C depuis 6 h. Vérifiez la chaîne du froid maintenant."], ["warning", "Lot de vaccin antirabique V-112 : 30 jours avant péremption. Vendez-le en premier."], ["warning", "Vermifuge D-40 : 60 jours sans vente. Écart habituel : 14 jours."]],
      heading: "Ce que la clinique voit chaque matin",
      items: [
        ["Quel réfrigérateur est sorti de sa plage sûre", "SentrIA lit les relevés de température de chaque réfrigérateur. Il alerte au-dessus de 8 °C, en dessous de 2 °C, et quand aucun relevé n'a été enregistré.", "Réfrigérateur à vaccins 2 : 9 °C depuis 6 h. Vérifiez-le maintenant.", "Réfrigérateur, relevé de température, heure du relevé", "9°", "timeline", ["9 °C maintenant", "plage sûre", "limite 8 °C"]],
        ["Quel lot doit partir en premier", "SentrIA lit la date de péremption de chaque lot. Les lots à 30 à 90 jours de la péremption sont signalés pour partir en premier, et ceux qui ne se vendront pas à temps suggèrent un retour au fournisseur.", "Lot de vaccin antirabique V-112 : 30 jours avant péremption. Vendez-le en premier.", "Produit, numéro de lot, date de péremption, quantité", "30j", "bars", ["Lot V-112 · 30 jours avant péremption", "à vendre en premier"]],
        ["Quel stock ne tourne plus", "SentrIA liste les produits sans vente depuis plus longtemps que leur écart habituel, avec la valeur restée en rayon.", "Vermifuge D-40 : 60 jours sans vente. Écart habituel : 14 jours.", "Produit, ventes par jour, quantité en stock", "60j", "timeline", ["60 jours sans vente", "dernière vente", "écart habituel 14 jours"]],
      ],
      notDo: "SentrIA ne contrôle pas les réfrigérateurs et ne détruit aucun stock. Il lit les relevés que vous saisissez et montre ce qui demande votre attention en premier. La clinique décide.",
      example: { title: "Un matin à la clinique vétérinaire", lines: ["Réfrigérateur à vaccins 2 : 9 °C depuis 6 h", "Lot de vaccin antirabique V-112 : 30 jours avant péremption", "Vermifuge D-40 : 60 jours sans vente", "Action proposée : vérifier le réfrigérateur 2 et vendre le lot V-112 en premier"], result: "La chaîne du froid est vérifiée avant que les vaccins ne soient perdus." },
    },
  },
}

const build = (slug: string, lang: Lang, r: Raw) => {
  const sector = SECTOR_PAGE[slug].sector
  const copy: Copy = {
    h1: r.h1,
    lead: r.lead,
    start: r.start,
    cta: CTA[lang],
    cta2: lang === "en" ? `See all ${SECTOR_NAME.en[sector]} activities` : `Voir toutes les activités ${SECTOR_NAME.fr[sector]}`,
    cta2Href: SECTOR_HREF[lang][sector],
    photoAlt: "",
    stats: r.stats,
  } as Copy
  const items: Capability[] = r.items.map(([title, does, example, imports, figure, kind, labels]) => ({
    title,
    does,
    example,
    imports,
    figure,
    drawing: { kind, labels },
  }))
  const caps: Capabilities = {
    heading: r.heading,
    items,
    notDo: r.notDo,
    stepsHeading: SHARED[lang].stepsHeading,
    steps: SHARED[lang].steps,
    example: r.example,
    faqHeading: SHARED[lang].faqHeading,
    faq: SHARED[lang].faq,
  }
  const alerts = r.alerts.map(([level, text]) => ({ level, text }))
  return { copy, caps, alerts }
}

export const MORE_ACTIVITY_COPY: Record<string, Record<Lang, Copy>> = {}
export const MORE_CAPABILITIES: Record<string, Record<Lang, Capabilities>> = {}
export const MORE_SECTOR_ALERTS: Record<string, Record<Lang, { level: Level; text: string }[]>> = {}

for (const [slug, byLang] of Object.entries(RAW)) {
  const en = build(slug, "en", byLang.en)
  const fr = build(slug, "fr", byLang.fr)
  MORE_ACTIVITY_COPY[slug] = { en: en.copy, fr: fr.copy }
  MORE_CAPABILITIES[slug] = { en: en.caps, fr: fr.caps }
  MORE_SECTOR_ALERTS[slug] = { en: en.alerts, fr: fr.alerts }
}
