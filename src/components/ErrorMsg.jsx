"use client";
import { AnimatePresence, motion } from "framer-motion";
import { zoomOut } from "@/animationvalues/motionVariants";
import { useEffect } from "react";
import { setError } from "@/features/modalSlice";
import { useDispatch } from "react-redux";

const ErrorMsg = ({ children, error }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => dispatch(setError("")), 4000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <AnimatePresence>
      {error && (
        <motion.div
          initial="hidden"
          whileInView="visible"
          exit="exit"
          variants={zoomOut}
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl font-semibold"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ErrorMsg;
