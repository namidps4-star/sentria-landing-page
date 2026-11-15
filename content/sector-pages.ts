// Pages for the Africa activities that have no page of their own yet. Names and lines are the app's own (lib/activities.ts).
// Each sector has three heroes: one feature, one example, one picture. Generated from the marketing sheet; EN and FR.

export type SectorKey = "health" | "agriculture" | "distribution" | "logistics" | "industry" | "transportation" | "energy"
export type L = { en: string; fr: string }
export type SectorHero = { title: L; ex: L; cap: L | null; svg: L }
export type SectorData = { name: L; head: L; heroes: SectorHero[] }

export const SECTOR_DATA: Record<SectorKey, SectorData> = {
  "health": {
    "name": {
      "en": "Health",
      "fr": "Santé"
    },
    "head": {
      "en": "See your stock in days, not units.",
      "fr": "Voyez vos stocks en jours, pas en unités."
    },
    "heroes": [
      {
        "title": {
          "en": "Days left",
          "fr": "Jours restants"
        },
        "ex": {
          "en": "Amoxicillin: 4 days of stock. Delivery in 7 days. Order today.",
          "fr": "Amoxicilline : 4 jours de stock. Livraison dans 7 jours. Commandez aujourd'hui."
        },
        "cap": null,
        "svg": {
          "en": "<svg viewBox=\"0 0 380 160\" aria-hidden=\"true\"><rect x=\"0\" y=\"34\" width=\"138.1818181818182\" height=\"26\" rx=\"13\" fill=\"#0b0c08\"/><text x=\"0\" y=\"26\" >Stock left</text><text x=\"146.1818181818182\" y=\"54\" style=\"font-weight:600;font-size:18px\">4 days</text><rect x=\"0\" y=\"100\" width=\"241.8181818181818\" height=\"26\" rx=\"13\" fill=\"#0f2e1f\"/><text x=\"0\" y=\"92\" >Delivery</text><text x=\"249.8181818181818\" y=\"120\" style=\"font-weight:600;font-size:18px\">7 days</text></svg>",
          "fr": "<svg viewBox=\"0 0 380 160\" aria-hidden=\"true\"><rect x=\"0\" y=\"34\" width=\"138.1818181818182\" height=\"26\" rx=\"13\" fill=\"#0b0c08\"/><text x=\"0\" y=\"26\" >Stock restant</text><text x=\"146.1818181818182\" y=\"54\" style=\"font-weight:600;font-size:18px\">4 jours</text><rect x=\"0\" y=\"100\" width=\"241.8181818181818\" height=\"26\" rx=\"13\" fill=\"#0f2e1f\"/><text x=\"0\" y=\"92\" >Livraison</text><text x=\"249.8181818181818\" y=\"120\" style=\"font-weight:600;font-size:18px\">7 jours</text></svg>"
        }
      },
      {
        "title": {
          "en": "Expiring first",
          "fr": "Péremption d'abord"
        },
        "ex": {
          "en": "Paracetamol lot A47 expires in 18 days. 24 boxes at risk. Sell first.",
          "fr": "Paracétamol lot A47 expire dans 18 jours. 24 boîtes à risque. Écoulez-les en premier."
        },
        "cap": null,
        "svg": {
          "en": "<svg viewBox=\"0 0 380 160\" aria-hidden=\"true\"><line x1=\"0\" y1=\"80\" x2=\"380\" y2=\"80\" stroke=\"#0b0c08\" stroke-width=\"2\" opacity=\".3\"/><rect x=\"228\" y=\"74\" width=\"152\" height=\"12\" rx=\"6\" fill=\"#0f2e1f\"/><circle cx=\"228\" cy=\"80\" r=\"9\" fill=\"#0b0c08\"/><text x=\"228\" y=\"50\" text-anchor=\"middle\" style=\"font-weight:600;font-size:18px\">18 days</text><text x=\"0\" y=\"124\" >today</text><text x=\"380\" y=\"124\" text-anchor=\"end\">30 days</text></svg>",
          "fr": "<svg viewBox=\"0 0 380 160\" aria-hidden=\"true\"><line x1=\"0\" y1=\"80\" x2=\"380\" y2=\"80\" stroke=\"#0b0c08\" stroke-width=\"2\" opacity=\".3\"/><rect x=\"228\" y=\"74\" width=\"152\" height=\"12\" rx=\"6\" fill=\"#0f2e1f\"/><circle cx=\"228\" cy=\"80\" r=\"9\" fill=\"#0b0c08\"/><text x=\"228\" y=\"50\" text-anchor=\"middle\" style=\"font-weight:600;font-size:18px\">18 jours</text><text x=\"0\" y=\"124\" >aujourd'hui</text><text x=\"380\" y=\"124\" text-anchor=\"end\">30 jours</text></svg>"
        }
      },
      {
        "title": {
          "en": "Real delivery time",
          "fr": "Délai réel de livraison"
        },
        "ex": {
          "en": "COPHAC promises 5 days. Real average 9. Worst 14.",
          "fr": "COPHAC promet 5 jours. Moyenne réelle 9. Pire cas 14."
        },
        "cap": null,
        "svg": {
          "en": "<svg viewBox=\"0 0 380 160\" aria-hidden=\"true\"><text x=\"0\" y=\"16\" >promised 5</text><rect x=\"0\" y=\"22\" width=\"135.71428571428572\" height=\"16\" rx=\"8\" fill=\"rgba(11,12,8,.3)\"/><text x=\"0\" y=\"70\" >real average 9</text><rect x=\"0\" y=\"76\" width=\"244.28571428571428\" height=\"16\" rx=\"8\" fill=\"#0f2e1f\"/><text x=\"0\" y=\"124\" >worst 14</text><rect x=\"0\" y=\"130\" width=\"380\" height=\"16\" rx=\"8\" fill=\"none\" stroke=\"#0b0c08\" stroke-dasharray=\"4 4\"/></svg>",
          "fr": "<svg viewBox=\"0 0 380 160\" aria-hidden=\"true\"><text x=\"0\" y=\"16\" >promis 5</text><rect x=\"0\" y=\"22\" width=\"135.71428571428572\" height=\"16\" rx=\"8\" fill=\"rgba(11,12,8,.3)\"/><text x=\"0\" y=\"70\" >réel moyen 9</text><rect x=\"0\" y=\"76\" width=\"244.28571428571428\" height=\"16\" rx=\"8\" fill=\"#0f2e1f\"/><text x=\"0\" y=\"124\" >pire 14</text><rect x=\"0\" y=\"130\" width=\"380\" height=\"16\" rx=\"8\" fill=\"none\" stroke=\"#0b0c08\" stroke-dasharray=\"4 4\"/></svg>"
        }
      }
    ]
  },
  "agriculture": {
    "name": {
      "en": "Agriculture",
      "fr": "Agriculture"
    },
    "head": {
      "en": "Keep stored produce saleable.",
      "fr": "Gardez les produits stockés vendables."
    },
    "heroes": [
      {
        "title": {
          "en": "Hours before loss",
          "fr": "Heures avant la perte"
        },
        "ex": {
          "en": "Tomatoes lot 7: 4 days at 32 °C. Loss in 12 hours.",
          "fr": "Tomates lot 7 : 4 jours à 32 °C. Perte dans 12 heures."
        },
        "cap": null,
        "svg": {
          "en": "<svg viewBox=\"0 0 380 160\" aria-hidden=\"true\"><rect x=\"0\" y=\"60\" width=\"380\" height=\"22\" rx=\"11\" fill=\"rgba(245,243,234,.14)\"/><rect x=\"0\" y=\"60\" width=\"190\" height=\"22\" rx=\"11\" fill=\"#d6ff3f\"/><circle cx=\"190\" cy=\"71\" r=\"14\" fill=\"#d6ff3f\"/><text x=\"190\" y=\"110\" text-anchor=\"middle\" style=\"font-weight:600;font-size:18px\">12 h</text><text x=\"0\" y=\"150\" >now</text><text x=\"380\" y=\"150\" text-anchor=\"end\">24 h</text></svg>",
          "fr": "<svg viewBox=\"0 0 380 160\" aria-hidden=\"true\"><rect x=\"0\" y=\"60\" width=\"380\" height=\"22\" rx=\"11\" fill=\"rgba(245,243,234,.14)\"/><rect x=\"0\" y=\"60\" width=\"190\" height=\"22\" rx=\"11\" fill=\"#d6ff3f\"/><circle cx=\"190\" cy=\"71\" r=\"14\" fill=\"#d6ff3f\"/><text x=\"190\" y=\"110\" text-anchor=\"middle\" style=\"font-weight:600;font-size:18px\">12 h</text><text x=\"0\" y=\"150\" >maintenant</text><text x=\"380\" y=\"150\" text-anchor=\"end\">24 h</text></svg>"
        }
      },
      {
        "title": {
          "en": "Days in storage",
          "fr": "Jours en stockage"
        },
        "ex": {
          "en": "Maize lot 3: 9 days in storage. Critical. Deliver urgently.",
          "fr": "Maïs lot 3 : 9 jours en stockage. Critique. Livrez d'urgence."
        },
        "cap": null,
        "svg": {
          "en": "<svg viewBox=\"0 0 380 160\" aria-hidden=\"true\"><rect x=\"0\" y=\"60\" width=\"26\" height=\"30\" rx=\"5\" fill=\"rgba(245,243,234,.25)\"/><rect x=\"34.5\" y=\"60\" width=\"26\" height=\"30\" rx=\"5\" fill=\"rgba(245,243,234,.25)\"/><rect x=\"69\" y=\"60\" width=\"26\" height=\"30\" rx=\"5\" fill=\"rgba(245,243,234,.25)\"/><rect x=\"103.5\" y=\"60\" width=\"26\" height=\"30\" rx=\"5\" fill=\"rgba(245,243,234,.25)\"/><rect x=\"138\" y=\"60\" width=\"26\" height=\"30\" rx=\"5\" fill=\"rgba(245,243,234,.25)\"/><rect x=\"172.5\" y=\"60\" width=\"26\" height=\"30\" rx=\"5\" fill=\"rgba(245,243,234,.25)\"/><rect x=\"207\" y=\"60\" width=\"26\" height=\"30\" rx=\"5\" fill=\"rgba(245,243,234,.25)\"/><rect x=\"241.5\" y=\"60\" width=\"26\" height=\"30\" rx=\"5\" fill=\"rgba(245,243,234,.25)\"/><rect x=\"276\" y=\"60\" width=\"26\" height=\"30\" rx=\"5\" fill=\"rgba(245,243,234,.25)\"/><rect x=\"310.5\" y=\"60\" width=\"26\" height=\"30\" rx=\"5\" fill=\"#d6ff3f\"/><rect x=\"345\" y=\"60\" width=\"26\" height=\"30\" rx=\"5\" fill=\"#d6ff3f\"/><text x=\"0\" y=\"118\" >day 0</text><text x=\"380\" y=\"118\" text-anchor=\"end\">day 10</text><text x=\"323.5\" y=\"52\" text-anchor=\"middle\" style=\"font-weight:600;font-size:18px\">9</text></svg>",
          "fr": "<svg viewBox=\"0 0 380 160\" aria-hidden=\"true\"><rect x=\"0\" y=\"60\" width=\"26\" height=\"30\" rx=\"5\" fill=\"rgba(245,243,234,.25)\"/><rect x=\"34.5\" y=\"60\" width=\"26\" height=\"30\" rx=\"5\" fill=\"rgba(245,243,234,.25)\"/><rect x=\"69\" y=\"60\" width=\"26\" height=\"30\" rx=\"5\" fill=\"rgba(245,243,234,.25)\"/><rect x=\"103.5\" y=\"60\" width=\"26\" height=\"30\" rx=\"5\" fill=\"rgba(245,243,234,.25)\"/><rect x=\"138\" y=\"60\" width=\"26\" height=\"30\" rx=\"5\" fill=\"rgba(245,243,234,.25)\"/><rect x=\"172.5\" y=\"60\" width=\"26\" height=\"30\" rx=\"5\" fill=\"rgba(245,243,234,.25)\"/><rect x=\"207\" y=\"60\" width=\"26\" height=\"30\" rx=\"5\" fill=\"rgba(245,243,234,.25)\"/><rect x=\"241.5\" y=\"60\" width=\"26\" height=\"30\" rx=\"5\" fill=\"rgba(245,243,234,.25)\"/><rect x=\"276\" y=\"60\" width=\"26\" height=\"30\" rx=\"5\" fill=\"rgba(245,243,234,.25)\"/><rect x=\"310.5\" y=\"60\" width=\"26\" height=\"30\" rx=\"5\" fill=\"#d6ff3f\"/><rect x=\"345\" y=\"60\" width=\"26\" height=\"30\" rx=\"5\" fill=\"#d6ff3f\"/><text x=\"0\" y=\"118\" >jour 0</text><text x=\"380\" y=\"118\" text-anchor=\"end\">jour 10</text><text x=\"323.5\" y=\"52\" text-anchor=\"middle\" style=\"font-weight:600;font-size:18px\">9</text></svg>"
        }
      },
      {
        "title": {
          "en": "Hot storage warning",
          "fr": "Alerte chaleur"
        },
        "ex": {
          "en": "Tomatoes at 32 °C. Warned before the loss starts.",
          "fr": "Tomates à 32 °C. Alerte avant que la perte commence."
        },
        "cap": null,
        "svg": {
          "en": "<svg viewBox=\"0 0 380 160\" aria-hidden=\"true\"><rect x=\"0\" y=\"70\" width=\"380\" height=\"18\" rx=\"9\" fill=\"rgba(245,243,234,.14)\"/><rect x=\"0\" y=\"70\" width=\"304\" height=\"18\" rx=\"9\" fill=\"#d6ff3f\"/><circle cx=\"304\" cy=\"79\" r=\"12\" fill=\"#d6ff3f\" stroke=\"#0f2e1f\" stroke-width=\"3\"/><text x=\"304\" y=\"52\" text-anchor=\"middle\" style=\"font-weight:600;font-size:18px\">32 °C</text><text x=\"0\" y=\"120\" >0 °C</text><text x=\"380\" y=\"120\" text-anchor=\"end\">40 °C</text></svg>",
          "fr": "<svg viewBox=\"0 0 380 160\" aria-hidden=\"true\"><rect x=\"0\" y=\"70\" width=\"380\" height=\"18\" rx=\"9\" fill=\"rgba(245,243,234,.14)\"/><rect x=\"0\" y=\"70\" width=\"304\" height=\"18\" rx=\"9\" fill=\"#d6ff3f\"/><circle cx=\"304\" cy=\"79\" r=\"12\" fill=\"#d6ff3f\" stroke=\"#0f2e1f\" stroke-width=\"3\"/><text x=\"304\" y=\"52\" text-anchor=\"middle\" style=\"font-weight:600;font-size:18px\">32 °C</text><text x=\"0\" y=\"120\" >0 °C</text><text x=\"380\" y=\"120\" text-anchor=\"end\">40 °C</text></svg>"
        }
      }
    ]
  },
  "distribution": {
    "name": {
      "en": "Distribution",
      "fr": "Distribution"
    },
    "head": {
      "en": "Move unsold stock to where it sells.",
      "fr": "Déplacez le stock invendu là où il se vend."
    },
    "heroes": [
      {
        "title": {
          "en": "Transfers between shops",
          "fr": "Transferts entre magasins"
        },
        "ex": {
          "en": "Shop A: 40 unsold. Shop B is reordering. Transfer 40.",
          "fr": "Magasin A : 40 invendus. Magasin B recommande. Transférez 40."
        },
        "cap": {
          "en": "Example numbers",
          "fr": "Chiffres d'exemple"
        },
        "svg": {
          "en": "<svg viewBox=\"0 0 380 160\" aria-hidden=\"true\"><rect x=\"0\" y=\"30\" width=\"150\" height=\"90\" rx=\"14\" fill=\"#0b0c08\"/><text x=\"75\" y=\"66\" text-anchor=\"middle\" fill=\"#f5f3ea\">Shop A</text><text x=\"75\" y=\"94\" text-anchor=\"middle\" fill=\"#f5f3ea\" style=\"font-weight:600;font-size:18px\">40 unsold</text><rect x=\"230\" y=\"30\" width=\"150\" height=\"90\" rx=\"14\" fill=\"none\" stroke=\"#0b0c08\" stroke-width=\"2.5\"/><text x=\"305\" y=\"66\" text-anchor=\"middle\">Shop B</text><text x=\"305\" y=\"94\" text-anchor=\"middle\" style=\"font-weight:600;font-size:18px\">needs 40</text><path d=\"M158 75 L222 75\" stroke=\"#0f2e1f\" stroke-width=\"4\"/><path d=\"M212 65 L226 75 L212 85\" stroke=\"#0f2e1f\" stroke-width=\"4\" fill=\"none\"/></svg>",
          "fr": "<svg viewBox=\"0 0 380 160\" aria-hidden=\"true\"><rect x=\"0\" y=\"30\" width=\"150\" height=\"90\" rx=\"14\" fill=\"#0b0c08\"/><text x=\"75\" y=\"66\" text-anchor=\"middle\" fill=\"#f5f3ea\">Magasin A</text><text x=\"75\" y=\"94\" text-anchor=\"middle\" fill=\"#f5f3ea\" style=\"font-weight:600;font-size:18px\">40 invendus</text><rect x=\"230\" y=\"30\" width=\"150\" height=\"90\" rx=\"14\" fill=\"none\" stroke=\"#0b0c08\" stroke-width=\"2.5\"/><text x=\"305\" y=\"66\" text-anchor=\"middle\">Magasin B</text><text x=\"305\" y=\"94\" text-anchor=\"middle\" style=\"font-weight:600;font-size:18px\">besoin de 40</text><path d=\"M158 75 L222 75\" stroke=\"#0f2e1f\" stroke-width=\"4\"/><path d=\"M212 65 L226 75 L212 85\" stroke=\"#0f2e1f\" stroke-width=\"4\" fill=\"none\"/></svg>"
        }
      },
      {
        "title": {
          "en": "Ranked by value",
          "fr": "Classés par valeur"
        },
        "ex": {
          "en": "Three transfers, biggest first: 40, 25 and 10 units.",
          "fr": "Trois transferts, le plus gros d'abord : 40, 25 et 10 unités."
        },
        "cap": {
          "en": "Example numbers",
          "fr": "Chiffres d'exemple"
        },
        "svg": {
          "en": "<svg viewBox=\"0 0 380 160\" aria-hidden=\"true\"><text x=\"0\" y=\"22\" >Transfer 1</text><rect x=\"0\" y=\"30\" width=\"380\" height=\"18\" rx=\"9\" fill=\"#0f2e1f\"/><text x=\"388\" y=\"45\" style=\"font-weight:600;font-size:18px\">40 units</text><text x=\"0\" y=\"74\" >Transfer 2</text><rect x=\"0\" y=\"82\" width=\"237.5\" height=\"18\" rx=\"9\" fill=\"rgba(11,12,8,.3)\"/><text x=\"245.5\" y=\"97\" style=\"font-weight:600;font-size:18px\">25 units</text><text x=\"0\" y=\"126\" >Transfer 3</text><rect x=\"0\" y=\"134\" width=\"95\" height=\"18\" rx=\"9\" fill=\"rgba(11,12,8,.3)\"/><text x=\"103\" y=\"149\" style=\"font-weight:600;font-size:18px\">10 units</text></svg>",
          "fr": "<svg viewBox=\"0 0 380 160\" aria-hidden=\"true\"><text x=\"0\" y=\"22\" >Transfert 1</text><rect x=\"0\" y=\"30\" width=\"380\" height=\"18\" rx=\"9\" fill=\"#0f2e1f\"/><text x=\"388\" y=\"45\" style=\"font-weight:600;font-size:18px\">40 unités</text><text x=\"0\" y=\"74\" >Transfert 2</text><rect x=\"0\" y=\"82\" width=\"237.5\" height=\"18\" rx=\"9\" fill=\"rgba(11,12,8,.3)\"/><text x=\"245.5\" y=\"97\" style=\"font-weight:600;font-size:18px\">25 unités</text><text x=\"0\" y=\"126\" >Transfert 3</text><rect x=\"0\" y=\"134\" width=\"95\" height=\"18\" rx=\"9\" fill=\"rgba(11,12,8,.3)\"/><text x=\"103\" y=\"149\" style=\"font-weight:600;font-size:18px\">10 unités</text></svg>"
        }
      },
      {
        "title": {
          "en": "Gaps and slow stock",
          "fr": "Ruptures et stock lent"
        },
        "ex": {
          "en": "Shop A: 0 left. Shop B: 80 unsold. Move the stock.",
          "fr": "Magasin A : 0 restant. Magasin B : 80 invendus. Déplacez le stock."
        },
        "cap": {
          "en": "Example numbers",
          "fr": "Chiffres d'exemple"
        },
        "svg": {
          "en": "<svg viewBox=\"0 0 380 160\" aria-hidden=\"true\"><text x=\"0\" y=\"22\" >Shop A: 0 left</text><rect x=\"0\" y=\"30\" width=\"380\" height=\"18\" rx=\"9\" fill=\"none\" stroke=\"#0b0c08\" stroke-dasharray=\"4 4\"/><text x=\"0\" y=\"86\" >Shop B: 80 unsold</text><rect x=\"0\" y=\"94\" width=\"380\" height=\"18\" rx=\"9\" fill=\"#0b0c08\"/><text x=\"0\" y=\"146\" >Unsold stock moves to the empty shop.</text></svg>",
          "fr": "<svg viewBox=\"0 0 380 160\" aria-hidden=\"true\"><text x=\"0\" y=\"22\" >Magasin A : 0 restant</text><rect x=\"0\" y=\"30\" width=\"380\" height=\"18\" rx=\"9\" fill=\"none\" stroke=\"#0b0c08\" stroke-dasharray=\"4 4\"/><text x=\"0\" y=\"86\" >Magasin B : 80 invendus</text><rect x=\"0\" y=\"94\" width=\"380\" height=\"18\" rx=\"9\" fill=\"#0b0c08\"/><text x=\"0\" y=\"146\" >Le stock invendu part vers le magasin vide.</text></svg>"
        }
      }
    ]
  },
  "logistics": {
    "name": {
      "en": "Logistics",
      "fr": "Logistique"
    },
    "head": {
      "en": "See the bottleneck before it delays a shipment.",
      "fr": "Repérez le goulot avant qu'il retarde un envoi."
    },
    "heroes": [
      {
        "title": {
          "en": "Bottleneck shown",
          "fr": "Goulot visible"
        },
        "ex": {
          "en": "Customs waits 9 hours. Every shipment behind it is late.",
          "fr": "La douane attend 9 heures. Chaque envoi derrière est en retard."
        },
        "cap": {
          "en": "Example numbers",
          "fr": "Chiffres d'exemple"
        },
        "svg": {
          "en": "<svg viewBox=\"0 0 380 180\" aria-hidden=\"true\"><g transform=\"translate(0 0)\"><rect x=\"6\" y=\"128\" width=\"70\" height=\"22\" rx=\"8\" fill=\"rgba(245,243,234,.25)\"/><text x=\"41\" y=\"120\" text-anchor=\"middle\" style=\"font-weight:600;font-size:18px\">2 h</text><text x=\"41\" y=\"170\" text-anchor=\"middle\" style=\"font-size:12px\">Port</text></g><g transform=\"translate(96 0)\"><rect x=\"6\" y=\"51\" width=\"70\" height=\"99\" rx=\"8\" fill=\"#d6ff3f\"/><text x=\"41\" y=\"43\" text-anchor=\"middle\" style=\"font-weight:600;font-size:18px\">9 h</text><text x=\"41\" y=\"170\" text-anchor=\"middle\" style=\"font-size:12px\">Customs</text></g><g transform=\"translate(192 0)\"><rect x=\"6\" y=\"139\" width=\"70\" height=\"11\" rx=\"8\" fill=\"rgba(245,243,234,.25)\"/><text x=\"41\" y=\"131\" text-anchor=\"middle\" style=\"font-weight:600;font-size:18px\">1 h</text><text x=\"41\" y=\"170\" text-anchor=\"middle\" style=\"font-size:12px\">Warehouse</text></g><g transform=\"translate(288 0)\"><rect x=\"6\" y=\"117\" width=\"70\" height=\"33\" rx=\"8\" fill=\"rgba(245,243,234,.25)\"/><text x=\"41\" y=\"109\" text-anchor=\"middle\" style=\"font-weight:600;font-size:18px\">3 h</text><text x=\"41\" y=\"170\" text-anchor=\"middle\" style=\"font-size:12px\">Delivery</text></g></svg>",
          "fr": "<svg viewBox=\"0 0 380 180\" aria-hidden=\"true\"><g transform=\"translate(0 0)\"><rect x=\"6\" y=\"128\" width=\"70\" height=\"22\" rx=\"8\" fill=\"rgba(245,243,234,.25)\"/><text x=\"41\" y=\"120\" text-anchor=\"middle\" style=\"font-weight:600;font-size:18px\">2 h</text><text x=\"41\" y=\"170\" text-anchor=\"middle\" style=\"font-size:12px\">Port</text></g><g transform=\"translate(96 0)\"><rect x=\"6\" y=\"51\" width=\"70\" height=\"99\" rx=\"8\" fill=\"#d6ff3f\"/><text x=\"41\" y=\"43\" text-anchor=\"middle\" style=\"font-weight:600;font-size:18px\">9 h</text><text x=\"41\" y=\"170\" text-anchor=\"middle\" style=\"font-size:12px\">Douane</text></g><g transform=\"translate(192 0)\"><rect x=\"6\" y=\"139\" width=\"70\" height=\"11\" rx=\"8\" fill=\"rgba(245,243,234,.25)\"/><text x=\"41\" y=\"131\" text-anchor=\"middle\" style=\"font-weight:600;font-size:18px\">1 h</text><text x=\"41\" y=\"170\" text-anchor=\"middle\" style=\"font-size:12px\">Entrepôt</text></g><g transform=\"translate(288 0)\"><rect x=\"6\" y=\"117\" width=\"70\" height=\"33\" rx=\"8\" fill=\"rgba(245,243,234,.25)\"/><text x=\"41\" y=\"109\" text-anchor=\"middle\" style=\"font-weight:600;font-size:18px\">3 h</text><text x=\"41\" y=\"170\" text-anchor=\"middle\" style=\"font-size:12px\">Livraison</text></g></svg>"
        }
      },
      {
        "title": {
          "en": "Late shipments",
          "fr": "Envois en retard"
        },
        "ex": {
          "en": "3 shipments wait behind customs. Tell the client now.",
          "fr": "3 envois attendent derrière la douane. Prévenez le client maintenant."
        },
        "cap": {
          "en": "Example numbers",
          "fr": "Chiffres d'exemple"
        },
        "svg": {
          "en": "<svg viewBox=\"0 0 380 160\" aria-hidden=\"true\"><circle cx=\"40\" cy=\"80\" r=\"16\" fill=\"#d6ff3f\"/><circle cx=\"100\" cy=\"80\" r=\"16\" fill=\"#d6ff3f\"/><circle cx=\"160\" cy=\"80\" r=\"16\" fill=\"#d6ff3f\"/><circle cx=\"220\" cy=\"80\" r=\"16\" fill=\"none\" stroke=\"#f5f3ea\" stroke-width=\"2\"/><text x=\"0\" y=\"130\" >behind customs</text></svg>",
          "fr": "<svg viewBox=\"0 0 380 160\" aria-hidden=\"true\"><circle cx=\"40\" cy=\"80\" r=\"16\" fill=\"#d6ff3f\"/><circle cx=\"100\" cy=\"80\" r=\"16\" fill=\"#d6ff3f\"/><circle cx=\"160\" cy=\"80\" r=\"16\" fill=\"#d6ff3f\"/><circle cx=\"220\" cy=\"80\" r=\"16\" fill=\"none\" stroke=\"#f5f3ea\" stroke-width=\"2\"/><text x=\"0\" y=\"130\" >derrière la douane</text></svg>"
        }
      },
      {
        "title": {
          "en": "Cold chain break",
          "fr": "Rupture du froid"
        },
        "ex": {
          "en": "Cold room above its limit for 6 hours. Stock at risk.",
          "fr": "Chambre froide au-dessus de sa limite pendant 6 heures. Stock à risque."
        },
        "cap": {
          "en": "Example numbers",
          "fr": "Chiffres d'exemple"
        },
        "svg": {
          "en": "<svg viewBox=\"0 0 380 160\" aria-hidden=\"true\"><rect x=\"0\" y=\"60\" width=\"380\" height=\"30\" rx=\"15\" fill=\"rgba(245,243,234,.2)\"/><rect x=\"0\" y=\"60\" width=\"95\" height=\"30\" rx=\"15\" fill=\"#d6ff3f\"/><text x=\"0\" y=\"118\" >0 h</text><text x=\"380\" y=\"118\" text-anchor=\"end\">24 h</text><text x=\"105\" y=\"52\" style=\"font-weight:600;font-size:18px\">6 h above limit</text></svg>",
          "fr": "<svg viewBox=\"0 0 380 160\" aria-hidden=\"true\"><rect x=\"0\" y=\"60\" width=\"380\" height=\"30\" rx=\"15\" fill=\"rgba(245,243,234,.2)\"/><rect x=\"0\" y=\"60\" width=\"95\" height=\"30\" rx=\"15\" fill=\"#d6ff3f\"/><text x=\"0\" y=\"118\" >0 h</text><text x=\"380\" y=\"118\" text-anchor=\"end\">24 h</text><text x=\"105\" y=\"52\" style=\"font-weight:600;font-size:18px\">6 h au-dessus de la limite</text></svg>"
        }
      }
    ]
  },
  "industry": {
    "name": {
      "en": "Industry",
      "fr": "Industrie"
    },
    "head": {
      "en": "Catch deviations before the line stops.",
      "fr": "Repérez les écarts avant l'arrêt de la ligne."
    },
    "heroes": [
      {
        "title": {
          "en": "Early deviation",
          "fr": "Écart repéré tôt"
        },
        "ex": {
          "en": "Output under target for 3 shifts. Alert before the stop.",
          "fr": "Production sous l'objectif pendant 3 postes. Alerte avant l'arrêt."
        },
        "cap": {
          "en": "Example numbers",
          "fr": "Chiffres d'exemple"
        },
        "svg": {
          "en": "<svg viewBox=\"0 0 380 160\" aria-hidden=\"true\"><line x1=\"0\" y1=\"60\" x2=\"380\" y2=\"60\" stroke=\"#0b0c08\" stroke-dasharray=\"6 6\" opacity=\".5\"/><text x=\"380\" y=\"52\" text-anchor=\"end\">target</text><polyline points=\"0,40 95,46 190,82 285,96 375,104\" fill=\"none\" stroke=\"#0f2e1f\" stroke-width=\"4\"/><circle cx=\"190\" cy=\"82\" r=\"7\" fill=\"#d6ff3f\" stroke=\"#0b0c08\" stroke-width=\"2\"/><circle cx=\"285\" cy=\"96\" r=\"7\" fill=\"#d6ff3f\" stroke=\"#0b0c08\" stroke-width=\"2\"/><circle cx=\"375\" cy=\"104\" r=\"7\" fill=\"#d6ff3f\" stroke=\"#0b0c08\" stroke-width=\"2\"/><text x=\"0\" y=\"150\" >Shift 1 → Shift 5 (example)</text></svg>",
          "fr": "<svg viewBox=\"0 0 380 160\" aria-hidden=\"true\"><line x1=\"0\" y1=\"60\" x2=\"380\" y2=\"60\" stroke=\"#0b0c08\" stroke-dasharray=\"6 6\" opacity=\".5\"/><text x=\"380\" y=\"52\" text-anchor=\"end\">objectif</text><polyline points=\"0,40 95,46 190,82 285,96 375,104\" fill=\"none\" stroke=\"#0f2e1f\" stroke-width=\"4\"/><circle cx=\"190\" cy=\"82\" r=\"7\" fill=\"#d6ff3f\" stroke=\"#0b0c08\" stroke-width=\"2\"/><circle cx=\"285\" cy=\"96\" r=\"7\" fill=\"#d6ff3f\" stroke=\"#0b0c08\" stroke-width=\"2\"/><circle cx=\"375\" cy=\"104\" r=\"7\" fill=\"#d6ff3f\" stroke=\"#0b0c08\" stroke-width=\"2\"/><text x=\"0\" y=\"150\" >Poste 1 → Poste 5 (exemple)</text></svg>"
        }
      },
      {
        "title": {
          "en": "Downtime risk",
          "fr": "Risque d'arrêt"
        },
        "ex": {
          "en": "Vibration rising for 3 days before the machine stops.",
          "fr": "Vibrations en hausse depuis 3 jours avant l'arrêt de la machine."
        },
        "cap": {
          "en": "Example numbers",
          "fr": "Chiffres d'exemple"
        },
        "svg": {
          "en": "<svg viewBox=\"0 0 380 160\" aria-hidden=\"true\"><polyline points=\"0,130 90,118 180,96 270,70 360,30\" fill=\"none\" stroke=\"#0f2e1f\" stroke-width=\"4\"/><circle cx=\"360\" cy=\"30\" r=\"9\" fill=\"#d6ff3f\" stroke=\"#0b0c08\" stroke-width=\"2\"/><text x=\"0\" y=\"150\" >day 1</text><text x=\"380\" y=\"150\" text-anchor=\"end\">day 3, stop risk</text></svg>",
          "fr": "<svg viewBox=\"0 0 380 160\" aria-hidden=\"true\"><polyline points=\"0,130 90,118 180,96 270,70 360,30\" fill=\"none\" stroke=\"#0f2e1f\" stroke-width=\"4\"/><circle cx=\"360\" cy=\"30\" r=\"9\" fill=\"#d6ff3f\" stroke=\"#0b0c08\" stroke-width=\"2\"/><text x=\"0\" y=\"150\" >jour 1</text><text x=\"380\" y=\"150\" text-anchor=\"end\">jour 3, risque d'arrêt</text></svg>"
        }
      },
      {
        "title": {
          "en": "Capacity ahead",
          "fr": "Capacité à venir"
        },
        "ex": {
          "en": "Next week needs 120% of capacity. Plan a second shift.",
          "fr": "La semaine prochaine demande 120 % de la capacité. Prévoyez un second poste."
        },
        "cap": {
          "en": "Example numbers",
          "fr": "Chiffres d'exemple"
        },
        "svg": {
          "en": "<svg viewBox=\"0 0 380 160\" aria-hidden=\"true\"><rect x=\"0\" y=\"50\" width=\"380\" height=\"36\" rx=\"18\" fill=\"rgba(11,12,8,.1)\"/><rect x=\"0\" y=\"50\" width=\"316.6666666666667\" height=\"36\" rx=\"18\" fill=\"#0f2e1f\"/><line x1=\"316.6666666666667\" y1=\"36\" x2=\"316.6666666666667\" y2=\"100\" stroke=\"#d6ff3f\" stroke-width=\"3\"/><text x=\"0\" y=\"36\" >capacity 100%</text><text x=\"380\" y=\"124\" text-anchor=\"end\" style=\"font-weight:600;font-size:18px\">120% needed</text></svg>",
          "fr": "<svg viewBox=\"0 0 380 160\" aria-hidden=\"true\"><rect x=\"0\" y=\"50\" width=\"380\" height=\"36\" rx=\"18\" fill=\"rgba(11,12,8,.1)\"/><rect x=\"0\" y=\"50\" width=\"316.6666666666667\" height=\"36\" rx=\"18\" fill=\"#0f2e1f\"/><line x1=\"316.6666666666667\" y1=\"36\" x2=\"316.6666666666667\" y2=\"100\" stroke=\"#d6ff3f\" stroke-width=\"3\"/><text x=\"0\" y=\"36\" >capacité 100 %</text><text x=\"380\" y=\"124\" text-anchor=\"end\" style=\"font-weight:600;font-size:18px\">120 % nécessaires</text></svg>"
        }
      }
    ]
  },
  "transportation": {
    "name": {
      "en": "Transportation",
      "fr": "Transport"
    },
    "head": {
      "en": "Spot delays before they spread across the fleet.",
      "fr": "Repérez les retards avant qu'ils se propagent à toute la flotte."
    },
    "heroes": [
      {
        "title": {
          "en": "Delay spotted",
          "fr": "Retard repéré"
        },
        "ex": {
          "en": "One truck 2 hours late. Three deliveries after it will slip.",
          "fr": "Un camion 2 heures en retard. Trois livraisons suivantes risquent de glisser."
        },
        "cap": {
          "en": "Example numbers",
          "fr": "Chiffres d'exemple"
        },
        "svg": {
          "en": "<svg viewBox=\"0 0 380 160\" aria-hidden=\"true\"><line x1=\"20\" y1=\"90\" x2=\"360\" y2=\"90\" stroke=\"rgba(245,243,234,.3)\" stroke-width=\"2\"/><circle cx=\"60\" cy=\"90\" r=\"16\" fill=\"#d6ff3f\"/><circle cx=\"130\" cy=\"90\" r=\"11\" fill=\"rgba(245,243,234,.6)\"/><circle cx=\"200\" cy=\"90\" r=\"11\" fill=\"rgba(245,243,234,.6)\"/><circle cx=\"270\" cy=\"90\" r=\"11\" fill=\"rgba(245,243,234,.6)\"/><circle cx=\"340\" cy=\"90\" r=\"11\" fill=\"rgba(245,243,234,.6)\"/><text x=\"60\" y=\"58\" text-anchor=\"middle\" style=\"font-weight:600;font-size:18px\">2 h late</text><text x=\"0\" y=\"150\" >3 deliveries at risk</text></svg>",
          "fr": "<svg viewBox=\"0 0 380 160\" aria-hidden=\"true\"><line x1=\"20\" y1=\"90\" x2=\"360\" y2=\"90\" stroke=\"rgba(245,243,234,.3)\" stroke-width=\"2\"/><circle cx=\"60\" cy=\"90\" r=\"16\" fill=\"#d6ff3f\"/><circle cx=\"130\" cy=\"90\" r=\"11\" fill=\"rgba(245,243,234,.6)\"/><circle cx=\"200\" cy=\"90\" r=\"11\" fill=\"rgba(245,243,234,.6)\"/><circle cx=\"270\" cy=\"90\" r=\"11\" fill=\"rgba(245,243,234,.6)\"/><circle cx=\"340\" cy=\"90\" r=\"11\" fill=\"rgba(245,243,234,.6)\"/><text x=\"60\" y=\"58\" text-anchor=\"middle\" style=\"font-weight:600;font-size:18px\">2 h de retard</text><text x=\"0\" y=\"150\" >3 livraisons à risque</text></svg>"
        }
      },
      {
        "title": {
          "en": "Spread stopped",
          "fr": "Propagation arrêtée"
        },
        "ex": {
          "en": "Reroute the late truck. The other deliveries stay on time.",
          "fr": "Réacheminez le camion en retard. Les autres livraisons restent à l'heure."
        },
        "cap": {
          "en": "Example numbers",
          "fr": "Chiffres d'exemple"
        },
        "svg": {
          "en": "<svg viewBox=\"0 0 380 160\" aria-hidden=\"true\"><circle cx=\"60\" cy=\"90\" r=\"16\" fill=\"#d6ff3f\"/><path d=\"M84 90 L160 90\" stroke=\"#f5f3ea\" stroke-width=\"2\" stroke-dasharray=\"4 4\"/><path d=\"M160 90 L210 60 L260 90\" stroke=\"#d6ff3f\" stroke-width=\"3\" fill=\"none\"/><circle cx=\"210\" cy=\"60\" r=\"11\" fill=\"none\" stroke=\"#d6ff3f\" stroke-width=\"2\"/><text x=\"210\" y=\"40\" text-anchor=\"middle\">new route</text><circle cx=\"320\" cy=\"90\" r=\"11\" fill=\"rgba(245,243,234,.6)\"/><text x=\"60\" y=\"130\" >late</text><text x=\"320\" y=\"130\" text-anchor=\"middle\">on time</text></svg>",
          "fr": "<svg viewBox=\"0 0 380 160\" aria-hidden=\"true\"><circle cx=\"60\" cy=\"90\" r=\"16\" fill=\"#d6ff3f\"/><path d=\"M84 90 L160 90\" stroke=\"#f5f3ea\" stroke-width=\"2\" stroke-dasharray=\"4 4\"/><path d=\"M160 90 L210 60 L260 90\" stroke=\"#d6ff3f\" stroke-width=\"3\" fill=\"none\"/><circle cx=\"210\" cy=\"60\" r=\"11\" fill=\"none\" stroke=\"#d6ff3f\" stroke-width=\"2\"/><text x=\"210\" y=\"40\" text-anchor=\"middle\">nouvel itinéraire</text><circle cx=\"320\" cy=\"90\" r=\"11\" fill=\"rgba(245,243,234,.6)\"/><text x=\"60\" y=\"130\" >en retard</text><text x=\"320\" y=\"130\" text-anchor=\"middle\">à l'heure</text></svg>"
        }
      },
      {
        "title": {
          "en": "Maintenance due",
          "fr": "Entretien prévu"
        },
        "ex": {
          "en": "Brake pads due in 500 km. Book the workshop today.",
          "fr": "Plaquettes de frein à changer dans 500 km. Réservez l'atelier aujourd'hui."
        },
        "cap": {
          "en": "Example numbers",
          "fr": "Chiffres d'exemple"
        },
        "svg": {
          "en": "<svg viewBox=\"0 0 380 160\" aria-hidden=\"true\"><rect x=\"0\" y=\"60\" width=\"380\" height=\"24\" rx=\"12\" fill=\"rgba(245,243,234,.2)\"/><rect x=\"0\" y=\"60\" width=\"190\" height=\"24\" rx=\"12\" fill=\"#d6ff3f\"/><text x=\"190\" y=\"54\" text-anchor=\"middle\" style=\"font-weight:600;font-size:18px\">due in 500 km</text><text x=\"0\" y=\"120\" >0 km</text><text x=\"380\" y=\"120\" text-anchor=\"end\">1,000 km</text></svg>",
          "fr": "<svg viewBox=\"0 0 380 160\" aria-hidden=\"true\"><rect x=\"0\" y=\"60\" width=\"380\" height=\"24\" rx=\"12\" fill=\"rgba(245,243,234,.2)\"/><rect x=\"0\" y=\"60\" width=\"190\" height=\"24\" rx=\"12\" fill=\"#d6ff3f\"/><text x=\"190\" y=\"54\" text-anchor=\"middle\" style=\"font-weight:600;font-size:18px\">à faire dans 500 km</text><text x=\"0\" y=\"120\" >0 km</text><text x=\"380\" y=\"120\" text-anchor=\"end\">1 000 km</text></svg>"
        }
      }
    ]
  },
  "energy": {
    "name": {
      "en": "Energy",
      "fr": "Énergie"
    },
    "head": {
      "en": "Anticipate pressure before an outage.",
      "fr": "Anticipez la pression avant la panne."
    },
    "heroes": [
      {
        "title": {
          "en": "Demand spikes",
          "fr": "Pics de demande"
        },
        "ex": {
          "en": "Demand 30% above the usual curve at 18:00. Check the generators.",
          "fr": "Demande 30 % au-dessus de la courbe habituelle à 18 h. Vérifiez les générateurs."
        },
        "cap": {
          "en": "Example numbers",
          "fr": "Chiffres d'exemple"
        },
        "svg": {
          "en": "<svg viewBox=\"0 0 380 160\" aria-hidden=\"true\"><rect x=\"0\" y=\"50\" width=\"380\" height=\"50\" fill=\"rgba(11,12,8,.08)\"/><polyline points=\"0,110 60,104 120,112 180,100 240,108 300,40 380,96\" fill=\"none\" stroke=\"#0f2e1f\" stroke-width=\"4\"/><circle cx=\"300\" cy=\"40\" r=\"9\" fill=\"#d6ff3f\" stroke=\"#0b0c08\" stroke-width=\"2\"/><text x=\"300\" y=\"24\" text-anchor=\"middle\" style=\"font-weight:600;font-size:18px\">18:00</text></svg>",
          "fr": "<svg viewBox=\"0 0 380 160\" aria-hidden=\"true\"><rect x=\"0\" y=\"50\" width=\"380\" height=\"50\" fill=\"rgba(11,12,8,.08)\"/><polyline points=\"0,110 60,104 120,112 180,100 240,108 300,40 380,96\" fill=\"none\" stroke=\"#0f2e1f\" stroke-width=\"4\"/><circle cx=\"300\" cy=\"40\" r=\"9\" fill=\"#d6ff3f\" stroke=\"#0b0c08\" stroke-width=\"2\"/><text x=\"300\" y=\"24\" text-anchor=\"middle\" style=\"font-weight:600;font-size:18px\">18 h</text></svg>"
        }
      },
      {
        "title": {
          "en": "Network pressure",
          "fr": "Pression réseau"
        },
        "ex": {
          "en": "Pressure on the network rises at 18:00 on weekdays.",
          "fr": "La pression sur le réseau monte à 18 h les jours ouvrés."
        },
        "cap": {
          "en": "Example numbers",
          "fr": "Chiffres d'exemple"
        },
        "svg": {
          "en": "<svg viewBox=\"0 0 380 160\" aria-hidden=\"true\"><polyline points=\"0,120 95,116 190,112 285,80 380,60\" fill=\"none\" stroke=\"#0f2e1f\" stroke-width=\"4\"/><line x1=\"0\" y1=\"70\" x2=\"380\" y2=\"70\" stroke=\"#0b0c08\" stroke-dasharray=\"6 6\" opacity=\".4\"/><text x=\"0\" y=\"62\" >limit</text><text x=\"380\" y=\"150\" text-anchor=\"end\">pressure rising</text></svg>",
          "fr": "<svg viewBox=\"0 0 380 160\" aria-hidden=\"true\"><polyline points=\"0,120 95,116 190,112 285,80 380,60\" fill=\"none\" stroke=\"#0f2e1f\" stroke-width=\"4\"/><line x1=\"0\" y1=\"70\" x2=\"380\" y2=\"70\" stroke=\"#0b0c08\" stroke-dasharray=\"6 6\" opacity=\".4\"/><text x=\"0\" y=\"62\" >limite</text><text x=\"380\" y=\"150\" text-anchor=\"end\">pression en hausse</text></svg>"
        }
      },
      {
        "title": {
          "en": "Generator fuel",
          "fr": "Carburant du générateur"
        },
        "ex": {
          "en": "Generator fuel: 2 days left. Order today.",
          "fr": "Carburant du générateur : 2 jours restants. Commandez aujourd'hui."
        },
        "cap": {
          "en": "Example numbers",
          "fr": "Chiffres d'exemple"
        },
        "svg": {
          "en": "<svg viewBox=\"0 0 380 160\" aria-hidden=\"true\"><rect x=\"0\" y=\"60\" width=\"380\" height=\"30\" rx=\"15\" fill=\"rgba(11,12,8,.1)\"/><rect x=\"0\" y=\"60\" width=\"108.57142857142857\" height=\"30\" rx=\"15\" fill=\"#0f2e1f\"/><text x=\"118.57142857142857\" y=\"52\" style=\"font-weight:600;font-size:18px\">2 days</text><text x=\"0\" y=\"118\" >0</text><text x=\"380\" y=\"118\" text-anchor=\"end\">7 days</text></svg>",
          "fr": "<svg viewBox=\"0 0 380 160\" aria-hidden=\"true\"><rect x=\"0\" y=\"60\" width=\"380\" height=\"30\" rx=\"15\" fill=\"rgba(11,12,8,.1)\"/><rect x=\"0\" y=\"60\" width=\"108.57142857142857\" height=\"30\" rx=\"15\" fill=\"#0f2e1f\"/><text x=\"118.57142857142857\" y=\"52\" style=\"font-weight:600;font-size:18px\">2 jours</text><text x=\"0\" y=\"118\" >0</text><text x=\"380\" y=\"118\" text-anchor=\"end\">7 jours</text></svg>"
        }
      }
    ]
  }
}

export const SECTOR_PAGE: Record<string, { sector: SectorKey; name: L; desc: L }> = {
  "cooperative-agricole": {
    "sector": "agriculture",
    "name": {
      "en": "Agricultural cooperative",
      "fr": "Coopérative agricole"
    },
    "desc": {
      "en": "Shared operations between several growers",
      "fr": "Mutualisation entre plusieurs producteurs"
    }
  },
  "silo-stockage": {
    "sector": "agriculture",
    "name": {
      "en": "Silo / harvest storage",
      "fr": "Silo / stockage de récolte"
    },
    "desc": {
      "en": "Keeping the crop before processing or sale",
      "fr": "Conservation avant transformation ou vente"
    }
  },
  "grossiste-distributeur": {
    "sector": "distribution",
    "name": {
      "en": "Wholesaler / distributor",
      "fr": "Grossiste / distributeur"
    },
    "desc": {
      "en": "Spots customers drifting away or not paying",
      "fr": "Clients qui décrochent ou ne paient pas"
    }
  },
  "supermarche-hypermarche": {
    "sector": "distribution",
    "name": {
      "en": "Supermarket / hypermarket",
      "fr": "Supermarché / hypermarché"
    },
    "desc": {
      "en": "A large store with many aisles",
      "fr": "Grande surface avec rayons multiples"
    }
  },
  "chaine-magasins": {
    "sector": "distribution",
    "name": {
      "en": "Retail chain",
      "fr": "Chaîne de magasins"
    },
    "desc": {
      "en": "Moves stock between stores before reordering",
      "fr": "Transferts entre magasins avant de racheter"
    }
  },
  "epicerie-proximite": {
    "sector": "distribution",
    "name": {
      "en": "Grocery / convenience store",
      "fr": "Épicerie / commerce de proximité"
    },
    "desc": {
      "en": "A small local shop",
      "fr": "Commerce local à taille humaine"
    }
  },
  "port-conteneurs": {
    "sector": "logistics",
    "name": {
      "en": "Port & containers",
      "fr": "Port & conteneurs"
    },
    "desc": {
      "en": "Port operations and container handling",
      "fr": "Opérations portuaires et manutention de conteneurs"
    }
  },
  "entrepot-manutention": {
    "sector": "logistics",
    "name": {
      "en": "Warehouse & handling",
      "fr": "Entrepôt & manutention"
    },
    "desc": {
      "en": "Storage and movement of goods",
      "fr": "Stockage et mouvements de marchandises"
    }
  },
  "transport-distribution": {
    "sector": "logistics",
    "name": {
      "en": "Transport & distribution",
      "fr": "Transport & distribution"
    },
    "desc": {
      "en": "Delivery to several drop points",
      "fr": "Acheminement vers plusieurs points de livraison"
    }
  },
  "preparation-expedition": {
    "sector": "logistics",
    "name": {
      "en": "Picking & dispatch",
      "fr": "Préparation & expédition"
    },
    "desc": {
      "en": "Processing and sending orders",
      "fr": "Traitement et envoi des commandes"
    }
  },
  "chaine-froid": {
    "sector": "logistics",
    "name": {
      "en": "Cold chain",
      "fr": "Chaîne du froid"
    },
    "desc": {
      "en": "Temperature-controlled logistics",
      "fr": "Logistique sous température dirigée"
    }
  },
  "plusieurs-activites": {
    "sector": "logistics",
    "name": {
      "en": "Several activities",
      "fr": "Plusieurs activités"
    },
    "desc": {
      "en": "A combination of these operations",
      "fr": "Une combinaison de ces opérations"
    }
  },
  "usine-production": {
    "sector": "industry",
    "name": {
      "en": "Production plant",
      "fr": "Usine de production"
    },
    "desc": {
      "en": "Production lines and critical machines",
      "fr": "Lignes de fabrication et machines critiques"
    }
  },
  "atelier-soustraitance": {
    "sector": "industry",
    "name": {
      "en": "Workshop / subcontracting",
      "fr": "Atelier / sous-traitance"
    },
    "desc": {
      "en": "Production on behalf of others",
      "fr": "Production pour le compte de tiers"
    }
  },
  "usine-agroalimentaire": {
    "sector": "industry",
    "name": {
      "en": "Food processing plant",
      "fr": "Usine agroalimentaire"
    },
    "desc": {
      "en": "Production under hygiene constraints",
      "fr": "Production avec contraintes sanitaires"
    }
  },
  "transporteur-routier": {
    "sector": "transportation",
    "name": {
      "en": "Road haulier",
      "fr": "Transporteur routier"
    },
    "desc": {
      "en": "Haulage for third parties",
      "fr": "Transport pour compte d'autrui"
    }
  },
  "flotte-entreprise": {
    "sector": "transportation",
    "name": {
      "en": "Company fleet",
      "fr": "Flotte d'entreprise"
    },
    "desc": {
      "en": "Vehicles used for your own operation",
      "fr": "Véhicules utilisés pour votre propre activité"
    }
  },
  "location-vehicules": {
    "sector": "transportation",
    "name": {
      "en": "Vehicle rental",
      "fr": "Location de véhicules"
    },
    "desc": {
      "en": "A fleet made available to customers",
      "fr": "Parc mis à disposition de clients"
    }
  },
  "centrale-production": {
    "sector": "energy",
    "name": {
      "en": "Power plant",
      "fr": "Centrale de production"
    },
    "desc": {
      "en": "Large-scale power generation",
      "fr": "Production d'énergie à grande échelle"
    }
  },
  "generateurs-secours": {
    "sector": "energy",
    "name": {
      "en": "Backup generators",
      "fr": "Générateurs de secours"
    },
    "desc": {
      "en": "Standby power and continuity",
      "fr": "Alimentation de secours et continuité"
    }
  },
  "distribution-energetique": {
    "sector": "energy",
    "name": {
      "en": "Power distribution",
      "fr": "Distribution énergétique"
    },
    "desc": {
      "en": "The grid and how power gets there",
      "fr": "Réseau et acheminement de l'énergie"
    }
  }
}
