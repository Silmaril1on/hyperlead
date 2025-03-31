import PricingList from "../homepage/sectionPricing/PricingList";
import PricingFaq from "./PricingFaq";
import PricingHero from "./PricingHero";

const Pricing = () => {
  return (
    <section className="space-y-10">
      <PricingHero />
      <PricingList />
      <PricingFaq />
    </section>
  );
};

export default Pricing;
