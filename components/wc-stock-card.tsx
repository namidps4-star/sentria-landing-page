import { CARD_MONEY } from "@/content/wholesale-cards"
import type { SiteCurrency } from "@/content/prices"
import { money, num } from "./wc-format"

/* Stock ranking: products by value in classes A, B and C, the share of value and the class counts. */
export function WcStockCard({ lang, currency = "USD" }: { lang: "en" | "fr"; currency?: SiteCurrency }) {
  const fr = lang === "fr"
  const v = CARD_MONEY[currency].stock
  const rows = [
    { name: fr ? "Amoxicilline 500 mg" : "Amoxicillin 500 mg", value: v[0], cls: "A", days: 12 },
    { name: fr ? "Stylo insuline 3 ml" : "Insulin pen 3 ml", value: v[1], cls: "A", days: 6 },
    { name: fr ? "Paracétamol 500 mg" : "Paracetamol 500 mg", value: v[2], cls: "B", days: 31 },
    { name: fr ? "Vitamine C 1 g" : "Vitamin C 1 g", value: v[3], cls: "C", days: 74 },
  ]
  return (
    <div className="wc-card">
      <div className="wc-kicker">{fr ? "Classement du stock" : "Stock ranking"}</div>
      <div className="wc-title">{fr ? "Classez les produits par valeur" : "Rank products by value"}</div>
      <div className="wc-big-row">
        <div>
          <div className="wc-big">48</div>
          <div className="wc-sub">{fr ? "produits en classe A, comptés chaque semaine" : "products in class A, counted every week"}</div>
        </div>
      </div>
      <div className="wc-share">
        <i className="wc-share-a" style={{ width: "80%" }} />
        <i className="wc-share-b" style={{ width: "15%" }} />
        <i className="wc-share-c" style={{ width: "5%" }} />
      </div>
      <div className="wc-share-lab">
        <span>{fr ? "A 80 % de la valeur" : "A 80% of value"}</span>
        <span>B 15%</span>
        <span>C 5%</span>
      </div>
      <table className="wc-table">
        <thead>
          <tr>
            <th>{fr ? "Produit" : "Product"}</th>
            <th className="r">{fr ? "Valeur annuelle" : "Yearly value"}</th>
            <th className="r">{fr ? "Classe" : "Class"}</th>
            <th className="r">{fr ? "Jours" : "Days"}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, k) => (
            <tr key={r.name} style={{ animationDelay: `${0.4 + k * 0.12}s` }}>
              <td>{r.name}</td>
              <td className="r">{money(r.value, currency, lang)}</td>
              <td className="r">
                <span className={`wc-pill wc-cls-${r.cls.toLowerCase()}`}>{r.cls}</span>
              </td>
              <td className="r">{num(r.days, lang)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="wc-foot">
        {fr
          ? "Seuils : A = premiers 80 % de la valeur, B = 15 % suivants, C = 5 % restants. Le propriétaire les règle."
          : "Cut-offs: A = first 80% of value, B = next 15%, C = last 5%. The owner sets them."}
      </p>
    </div>
  )
}
