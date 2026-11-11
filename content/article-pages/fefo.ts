import type { ArticlePage } from "../articles"

export const FEFO_PAGES: ArticlePage[] = [
  {
    slug: "fefo-first-expired-first-out",
    lang: "en",
    pairId: "fefo-first-expired-first-out",
    title: "FEFO: how a pharmacy sells the stock that expires first",
    description: "FEFO means the product closest to expiry leaves first. Here is how to set it up on the shelf, at the counter and in the stock list.",
    date: "2026-11-18",
    dateLabel: "Nov 18, 2026",
    minutes: 4,
    intro:
      "FEFO stands for first expired, first out. The product with the earliest expiry date is the first to leave, whatever day it arrived. The rule is simple. In a pharmacy with several batches of the same medicine, it is easy to break without noticing.",
    sections: [
      {
        heading: "What FEFO means",
        paragraphs: [
          "Health guidance says FEFO matters because it \"emphasises expiration dates of products, irrespective of when those items may have entered general storage.\" Products leave the shelf based on how close they are to expiry, not on the order they arrived.",
          "The aim is to reduce loss. In the words of one logistics guide, FEFO \"helps reduce product loss by ensuring that wherever possible, the shortest shelf-life items are used first.\"",
        ],
      },
      {
        heading: "Set up the shelf",
        paragraphs: [
          "Put the products that expire first in front, or on top of the products that expire later. A USAID and PEPFAR poster for health facilities gives the same rule in one line.",
          "Keep batches of the same medicine apart when their expiry dates differ. The logistics guide asks for the items with the closest expiry dates to go to the front of the racks or shelves.",
        ],
      },
      {
        heading: "Write the dates where you can read them",
        paragraphs: [
          "Enter expiry dates clearly on boxes and stock cards, and make sure they stay visible. If the date cannot be read on the carton, the same guide suggests a sticker or a note on the outside of the box.",
          "A date that is hidden inside a box does not help the person picking the next pack.",
        ],
      },
      {
        heading: "Dispense in the same order",
        paragraphs: [
          "Dispensing has to follow the same rule as shelving. The poster says to always dispatch and dispense following the FEFO system.",
          "The guide also tells staff to issue the short shelf-life items first wherever possible. Put that instruction in the team's routine, so a new member of staff does not have to guess.",
        ],
      },
      {
        heading: "Flag products before they run out of time",
        paragraphs: [
          "One logistics guide suggests flagging a product when its expiry is three to six months away. Anything with less than three months left should be reported at once, so that someone can decide what to do with it.",
          "The threshold is a starting point. A medicine that sells slowly may need a longer warning, and a fast seller may need less.",
        ],
      },
      {
        heading: "Use one method",
        paragraphs: [
          "The poster advises against using two or more stock-rotation methods at the same time, because it causes confusion. Choose FEFO for dated medicines and say so in the shop's procedure.",
        ],
      },
    ],
    faq: [
      {
        q: "Is FEFO the same as FIFO?",
        a: "No. FIFO follows the order in which products arrived. FEFO follows the expiry date, so a pack that arrived last can leave first if it expires first.",
      },
      {
        q: "When should I flag a product?",
        a: "A logistics guide suggests flagging a product three to six months before expiry, and reporting anything with less than three months left so action can be taken.",
      },
    ],
    closing:
      "Start with one shelf this week. Put the nearest expiry at the front, write the dates where you can read them, and check which products have three months or less left.",
    image: "/articles/fefo-pharmacist.jpg",
    figures: [
      {
        src: "/articles/fefo-shelves.jpg",
        alt: "A storage room with shelves of boxes",
        caption: "Photo: Árpád Czapp, Unsplash.",
      },
    ],
    sources: [
      {
        label: "Logistics Cluster (LogCluster), Inventory Management of Medical Items",
        url: "https://log.logcluster.org/sites/default/files/pages/273/en/inventory-management-of-medical-items.pdf",
      },
      {
        label: "USAID and PEPFAR, Effective Management of Health Commodities at Health Facilities",
        url: "https://www.ghsupplychain.org/sites/default/files/2021-05/StoragePractices.pdf",
      },
    ],
  },
]
