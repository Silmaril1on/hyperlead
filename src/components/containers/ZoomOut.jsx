"use client";
import { zoomOut } from "@/animationvalues/motionVariants";
import { motion } from "framer-motion";

const ZoomOut = ({ children, className }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      exit="exit"
      className={className}
      variants={zoomOut}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
};

export default ZoomOut;
