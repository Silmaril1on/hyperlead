"use client";
import { AnimatePresence, motion } from "framer-motion";
import { zoomOut } from "@/animationValues/motionVariants";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setError } from "@/features/modalSlice";

const ErrorMsg = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.modal.error);
  const type = useSelector((state) => state.modal.type);
  const toastRef = useRef(null);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => dispatch(setError("")), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <AnimatePresence>
      {error && (
        <motion.div
          ref={toastRef}
          initial="hidden"
          whileInView="visible"
          exit="exit"
          variants={zoomOut}
          className={`${
            type === "success"
              ? "bg-green-100 border border-green-400 text-green-700"
              : "bg-red-100 border-2 border-red-400 text-red-700"
          } px-8 fixed z-20 bottom-5 right-5 py-3  font-semibold`}
        >
          {error}
          <motion.div
            initial={{ width: "100%" }}
            animate={{ width: "0%" }}
            transition={{ duration: 5, ease: "linear" }}
            className={`absolute left-0 rounded-full -bottom-2 h-[2px] ${
              type === "success" ? "bg-green-500" : "bg-red-400"
            }`}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ErrorMsg;
