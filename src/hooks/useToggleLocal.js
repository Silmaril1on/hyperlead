"use client";
import { useState } from "react";

export const useToggleLocal = () => {
  const [isOpen, setIsOpen] = useState(null);

  const toggleState = (index) => {
    setIsOpen((prevIndex) => (prevIndex === index ? null : index));
  };

  return {
    isOpen,
    setIsOpen,
    toggleState,
  };
};
