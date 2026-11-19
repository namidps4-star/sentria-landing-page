import { ProductTour } from "@/components/product-tour"
import { Opening } from "@/components/opening"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Motion } from "@/components/motion"
import { T } from "@/components/t"
import { QuickFit, FitSection } from "@/components/fit"
import { Faq } from "@/components/faq"
import { Demo } from "@/components/demo"
import {
  Proof,
  Situations,
  Shift,
  Method,
  Why,
  Cockpit,
  Pricing,
  Flow,
  DataSec,
  Reasoning,
  Promise_,
  Trust,
  Final,
  Footer,
} from "@/components/sections"

export default function Page() {
  return (
    <>
      <Opening />
      <a className="skip" href="#main">
        <T s="Skip to content" />
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Proof />
        <ProductTour />
        <QuickFit />
        <Situations />
        <Shift />
        <Method />
        <Why />
        <Cockpit />
        <Pricing />
        <Flow />
        <FitSection />
        <DataSec />
        <Reasoning />
        <Promise_ />
        <Trust />
        <Faq />
        <Demo />
        <Final />
      </main>
      <Footer />
      <Motion />
    </>
  )
}
