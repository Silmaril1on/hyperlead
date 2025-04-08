import Button from "@/components/buttons/Button";
import GradientContainer from "@/components/containers/GradientContainer";
import SectionHeadline from "@/components/SectionHeadline";

const Hero = () => {
  return (
    <div className="center w-full relative h-screen">
      <GradientContainer type="sky" />
      <SectionHeadline
        className="lg:px-[25%]"
        title="Get Warm Business Leads Every Month 100% AI-Powered"
        desc="Start Now – Fully Automated"
      >
        <Button>Start for free</Button>
      </SectionHeadline>
    </div>
  );
};

export default Hero;
