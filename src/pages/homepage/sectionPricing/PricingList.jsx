import pricingData from "@/localDB/pricingData";
import Benefits from "./components/Benefits";
import PricingTitle from "./components/PricingTitles";
import PricingButton from "./components/PricingButton";
import MotionContainer from "@/components/containers/MotionContainer";
import MotionChildren from "@/components/containers/MotionChildren";

const PricingList = () => {
  if (!pricingData || !pricingData.length) {
    return null;
  }

  return (
    <MotionContainer
      animation="zoom-out"
      type="in-view"
      className="hidden md:grid md:grid-cols-3 lg:px-[10%] space-x-5"
    >
      {pricingData.map((item) => {
        return (
          <MotionChildren
            animation="zoom-out"
            key={item.id}
            className={`primary-border flex flex-col justify-between items-center space-y-5 ${
              item.color ? "bg-violet-300/30" : "bg-[#f8fafc]"
            }`}
          >
            <div>
              <PricingTitle item={item} />
              <Benefits item={item} />
            </div>
            <PricingButton item={item} />
          </MotionChildren>
        );
      })}
    </MotionContainer>
  );
};

export default PricingList;
