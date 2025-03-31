"use client";
import { motion } from "framer-motion";
import { zoomOut } from "@/animationvalues/motionVariants";
import pricingData from "@/localDB/pricingData";
import Benefits from "./components/Benefits";
import PricingTitle from "./components/PricingTitles";
import PricingButton from "./components/PricingButton";

const PricingList = () => {
  return (
    <motion.div
      variants={zoomOut}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="hidden md:grid md:grid-cols-3 lg:px-[10%] space-x-5"
    >
      {pricingData.map((item) => {
        return (
          <motion.div
            variants={zoomOut}
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
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default PricingList;
