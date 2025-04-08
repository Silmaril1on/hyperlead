import Button from "@/components/buttons/Button";
import SectionHeadline from "@/components/SectionHeadline";

const PricingHero = () => {
  return (
    <div className="h-screen px-3 lg:px-[15%] center relative">
      <div className="absolute inset-0 -z-1 bg-radial-[at_5%_25%] from-amber-100/60 from-5% via-sky-100/30 to-95% to-transparent" />
      <div className="center flex-col relative z-[2]">
        <Button type="blue">Pricing plans</Button>
        <SectionHeadline
          title="Discover unlimited creative possibilities"
          desc="Every feature you need now and as you scale."
        />
      </div>
    </div>
  );
};

export default PricingHero;
