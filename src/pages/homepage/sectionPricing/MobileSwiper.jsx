import pricingData from "@/localDB/pricingData";
import PricingTitle from "./components/PricingTitles";
import Benefits from "./components/Benefits";
import PricingButton from "./components/PricingButton";
import Swiper from "@/components/containers/Swiper";

const MobileSwiper = () => {
  const pricing = pricingData;

  return (
    <Swiper items={pricing} className="h-[500px]">
      {pricing.map((item, index) => (
        <div
          key={index}
          className={`primary-border flex flex-col max-w-[330px] mx-auto justify-between items-center space-y-5 ${
            item.color ? "bg-violet-300/30" : "bg-[#f8fafc]"
          }`}
        >
          <div>
            <PricingTitle item={item} />
            <Benefits item={item} />
          </div>
          <PricingButton item={item} />
        </div>
      ))}
    </Swiper>
  );
};

export default MobileSwiper;
