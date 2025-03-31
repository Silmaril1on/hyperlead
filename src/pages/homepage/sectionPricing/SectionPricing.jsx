import SectionHeadline from "@/components/SectionHeadline";
import PricingList from "./PricingList";
import MobileSwiper from "./MobileSwiper";

const SectionPricing = () => {
  return (
    <section className="w-full center flex-col">
      <SectionHeadline
        title="Simple pricing plans"
        desc="Enjoy the power of the best AI modelson a single platform"
      />
      <PricingList />
      <MobileSwiper />
    </section>
  );
};

export default SectionPricing;
