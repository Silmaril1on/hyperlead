"use client";
import logoData from "@/localDB/companyLogos";
import Image from "next/image";
import { motion } from "framer-motion";
import { infinityScroll } from "@/animationValues/motionVariants";

const LogoSlider = () => {
  return (
    <section className="w-full overflow-hidden relative center flex-col space-y-8">
      <h1 className="font-semibold text-blue-950">
        Used by thousands of fast-growing startups.
      </h1>
      <div className="absolute top-0 left-0 w-[15%] h-full bg-gradient-to-r from-white from-30% to-transparent pointer-events-none z-10" />
      <div className="absolute top-0 right-0 w-[15%] h-full bg-gradient-to-l from-white from-10% to-transparent pointer-events-none z-10" />
      <div className="flex items-center w-max relative">
        <motion.div
          variants={infinityScroll}
          initial="hidden"
          animate="visible"
          className="flex items-center"
        >
          {logoData.map((item, index) => {
            return (
              <div key={index}>
                <Image src={item} alt="pic" className="w-28 mx-6" />
              </div>
            );
          })}
        </motion.div>
        <motion.div
          variants={infinityScroll}
          initial="hidden"
          animate="visible"
          className="flex items-center"
        >
          {logoData.map((item, index) => {
            return (
              <div key={index}>
                <Image src={item} alt="pic" className="w-28 mx-6" />
              </div>
            );
          })}
        </motion.div>
        <motion.div
          variants={infinityScroll}
          initial="hidden"
          animate="visible"
          className="flex items-center"
        >
          {logoData.map((item, index) => {
            return (
              <div key={index}>
                <Image src={item} alt="pic" className="w-28 mx-6" />
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default LogoSlider;
