// DRAFT lines for the sector film. One per sector, EN and FR.
// Each one restates what the existing sector copy already says (see sectors.ts
// and the "Where do you fit in?" cards), with no numbers and no new claims.
// Change the text here and nothing else needs to move.
export const TAGLINES: Record<string, { en: string; fr: string }> = {
  industry: { en: "Catch the wear before the line stops.", fr: "Repérez l'usure avant l'arrêt de la ligne." },
  healthcare: { en: "Know before it runs out or spoils.", fr: "Sachez avant la rupture ou la perte." },
  agriculture: { en: "Save the harvest before delay spoils it.", fr: "Sauvez la récolte avant que le retard ne l'abîme." },
  transportation: { en: "Keep the whole fleet in view.", fr: "Gardez toute la flotte sous les yeux." },
  logistics: { en: "Spot the bottleneck before the queue forms.", fr: "Repérez le blocage avant que la file ne se forme." },
  energy: { en: "See the overheating before the outage.", fr: "Voyez la surchauffe avant la panne." },
  retail: { en: "Catch the shortage before it hurts sales.", fr: "Repérez la rupture avant qu'elle ne pèse sur les ventes." },
}
