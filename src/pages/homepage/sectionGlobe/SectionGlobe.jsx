import { BsChevronBarRight } from "react-icons/bs";
import Button from "@/components/Button";
import Globe from "./Globe";
import Title from "@/components/Title";
import Paragraph from "@/components/Paragraph";

const SectionGlobe = () => {
  return (
    <section className="bg-[#f8fafc] center w-full px-3 lg:px-[10%] py-20">
      <div className="primary-border bg-white w-full flex flex-col md:flex-row">
        <div className="w-full lg:w-[40%] space-y-5 lg:pr-[10%]">
          <Title>Start Building with HyperLead</Title>
          <Paragraph>
            HyperLead empowers you to unleash your creativity and build anything
            you can imagine.
          </Paragraph>
          <Button type="secondary">
            <BsChevronBarRight />
            <span>Contact Sales</span>
          </Button>
        </div>
        <Globe />
      </div>
    </section>
  );
};

export default SectionGlobe;
