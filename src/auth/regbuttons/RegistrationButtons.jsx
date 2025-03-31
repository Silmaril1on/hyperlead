"use client";
import { motion } from "framer-motion";
import Button from "@/components/Button";

const RegistrationButtons = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 1.2 }}
      viewport={{ once: true }}
      className="flex space-x-3"
    >
      <Button type="secondary">Sign In</Button>
      <Button>Sign Up</Button>
    </motion.div>
  );
};

export default RegistrationButtons;
