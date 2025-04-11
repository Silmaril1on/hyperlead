"use client";
import Title from "@/components/Title";
import { motion } from "framer-motion";
import { slideTop } from "@/animationValues/motionVariants";
import sectionThreedata from "@/localDB/sectionThreeData";

const ContentList = () => {
  return (
    <div className="overflow-hidden">
      <motion.div
        variants={slideTop}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="flex flex-col px-5 md:flex-row space-y-10 md:space-y-0 md:px-[12%] md:space-x-10 mt-10"
      >
        {sectionThreedata.map((item) => {
          return (
            <div className="center flex-col space-y-5" key={item.id}>
              <span className="bg-gray-300/30 p-3 text-2xl rounded-md">
                {item.icon}
              </span>
              <div className="center flex-col">
                <Title className="text-center">{item.title}</Title>
                <p className="text-center text-neutral-700">{item.desc}</p>
              </div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default ContentList;
