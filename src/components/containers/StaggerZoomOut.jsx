"use client";
import { zoomOut } from "@/animationvalues/motionVariants";
import { motion } from "framer-motion";

const StaggerZoomOut = ({ children, className, onClick }) => {
  return (
    <motion.div
      variants={zoomOut}
      onClick={onClick}
      className={className}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
};

export default StaggerZoomOut;
