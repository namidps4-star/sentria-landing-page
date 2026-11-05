import Image from "next/image"
import { Header } from "./header"
import { Footer } from "./sections"
import "./africa.css"

/* The /africa page: pharmacy first, for West African pharmacies. English for now. */
export function AfricaHero() {
  return (
    <>
      <Header />
      <main id="main" className="afr">
        <section className="afr-hero" aria-labelledby="afr-h">
          <Image src="/articles/pharm.jpg" alt="" fill priority sizes="100vw" className="afr-photo" />
          <div className="afr-copy">
            <h1 id="afr-h">
              Pharmacy stock,
              <br />
              <span className="afr-lime">days left</span> and
              <br />
              order in time.
            </h1>
            <p className="afr-lead">
              Count your shelves. SentrIA works out how many days of stock you have left and warns you before a delivery is late.
            </p>
            <p className="afr-start">Starting in Benin, with more West African markets to follow.</p>
            <div className="afr-actions">
              <a className="afr-btn afr-btn-p" href="#demo">
                Book a demo →
              </a>
              <a className="afr-btn afr-btn-s" href="/articles/how-to-count-pharmacy-stock">
                Read how a count works
              </a>
            </div>
          </div>
          <ul className="afr-stats" aria-label="What SentrIA does">
            <li>
              <b>Days of stock</b>From the last 30 days of sales, per product.
            </li>
            <li>
              <b>Real delivery times</b>Each supplier's actual lead time, not the promised one.
            </li>
            <li>
              <b>Warnings in time</b>A message before a product runs out, not after.
            </li>
          </ul>
        </section>
      </main>
      <Footer />
    </>
  )
}
