/**
 * Phrases in an article's opening paragraph that get a hand-drawn marker highlight, by slug. A phrase
 * only counts if it appears word for word in the paragraph, so a reworded intro just loses its marks.
 */
export const ARTICLE_MARKS: Record<string, string[]> = {
  "how-to-count-pharmacy-stock": ["what it really holds", "wholesaler deliveries can take one to two weeks", "where RFID tags fit"],
  "compter-le-stock-en-pharmacie": [
    "ce qu'elle a réellement en stock",
    "les livraisons des grossistes peuvent prendre une à deux semaines",
    "où les étiquettes RFID trouvent leur place",
  ],
  "pharmacy-stock-outs": ["no longer covers sales until the next delivery", "the sale is lost", "the stock was falling for days"],
  "ruptures-de-stock-en-pharmacie": [
    "ne couvre plus les ventes jusqu'à la prochaine livraison",
    "la vente est perdue",
    "le stock baissait depuis plusieurs jours",
  ],
}
