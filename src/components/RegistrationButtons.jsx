"use client";
import { motion } from "framer-motion";
import Button from "@/components/Button";
import Link from "next/link";

const RegistrationButtons = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 1.2 }}
      viewport={{ once: true }}
      className="flex space-x-3"
    >
      <Link href="/signin">
        <Button type="secondary">Sign In</Button>
      </Link>
      <Link href="/signup">
        <Button>Sign Up</Button>
      </Link>
    </motion.div>
  );
};

export default RegistrationButtons;
