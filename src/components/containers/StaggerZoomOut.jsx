"use client";
import { zoomOut } from "@/animationvalues/motionVariants";
import { motion } from "framer-motion";

const StaggerZoomOut = ({ children, className }) => {
  return (
    <motion.div
      variants={zoomOut}
      className={className}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
};

export default StaggerZoomOut;
