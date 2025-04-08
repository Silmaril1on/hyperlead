"use client";
import Title from "@/components/Title";
import sectionTwoData from "@/localDB/sectionTwoData";
import Image from "next/image";
import { motion } from "framer-motion";
import { zoomOut } from "@/animationvalues/motionVariants";

const ContentList = () => {
  return (
    <motion.section
      variants={zoomOut}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="px-3 md:px-[12%]"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <motion.div
          variants={zoomOut}
          className="md:col-span-2 primary-border bg-[#f8fafc] space-y-5"
        >
          <div className="w-full">
            <Image
              className="w-full h-full"
              src={sectionTwoData[0].image}
              alt={sectionTwoData[0].title}
              width={400}
              height={400}
              quality={85}
            />
          </div>
          <article className="space-y-1">
            <Title>{sectionTwoData[0].title}</Title>
            <p>{sectionTwoData[0].desc}</p>
          </article>
        </motion.div>
        <motion.div
          variants={zoomOut}
          className="primary-border bg-[#f8fafc] space-y-5"
        >
          <div className="w-full">
            <Image
              src={sectionTwoData[1].image}
              alt={sectionTwoData[1].title}
              width={400}
              height={400}
              quality={85}
            />
          </div>
          <article className="space-y-1">
            <Title>{sectionTwoData[1].title}</Title>
            <p>{sectionTwoData[1].desc}</p>
          </article>
        </motion.div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {sectionTwoData.slice(2, 5).map((item) => (
          <motion.div
            variants={zoomOut}
            className="primary-border bg-[#f8fafc] space-y-5"
            key={item.id}
          >
            <div className="w-full">
              <Image
                src={item.image}
                alt={item.title}
                width={400}
                height={400}
                quality={85}
              />
            </div>
            <article className="space-y-1">
              <Title>{item.title}</Title>
              <p>{item.desc}</p>
            </article>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default ContentList;
