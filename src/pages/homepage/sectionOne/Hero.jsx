import Button from "@/components/Button";
import SectionHeadline from "@/components/SectionHeadline";

const Hero = () => {
  return (
    <div className="center w-full relative h-screen">
      <div className="inset-0 absolute -z-1 bg-radial from-sky-100 from-30% to-transparent"></div>
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
