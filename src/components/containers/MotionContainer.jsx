"use client";
import { motion } from "framer-motion";
import {
  fadeIn,
  slideBottom,
  slideLeft,
  slideTop,
  zoomOut,
} from "@/animationvalues/motionVariants";

const MotionContainer = ({ children, className, animation }) => {
  const getVariant = (animation) => {
    switch (animation) {
      case "left":
        return slideLeft;
      case "fade-in":
        return fadeIn;
      case "zoom-out":
        return zoomOut;
      case "bottom":
        return slideBottom;
      case "top":
        return slideTop;
      default:
        return fadeIn;
    }
  };

  return (
    <div className="overflow-hidden">
      <motion.div
        initial="hidden"
        whileInView="visible"
        exit="exit"
        className={className}
        variants={getVariant(animation)}
        viewport={{ once: true }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default MotionContainer;
