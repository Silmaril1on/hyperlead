"use client";
import { slideLeft } from "@/animationvalues/motionVariants";
import { motion } from "framer-motion";

const FromLeft = ({ children, className }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      exit="exit"
      className={className}
      variants={slideLeft}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
};

export default FromLeft;
