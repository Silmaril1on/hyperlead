"use client";
import { useToggle } from "@/hooks/useToggle";

const SideButton = () => {
  const { isOpen, toggle } = useToggle();

  return (
    <div
      className="cursor-pointer space-y-[10px] block md:hidden"
      onClick={toggle}
    >
      <div
        className={`h-[2px] w-6 bg-neutral-400/70 transition-transform duration-300 ${
          isOpen ? "rotate-45 translate-y-1.5" : ""
        }`}
      ></div>
      <div
        className={`h-[2px] w-6 bg-neutral-400/70 transition-transform duration-300 ${
          isOpen ? "-rotate-45 -translate-y-1.5" : ""
        }`}
      ></div>
    </div>
  );
};

export default SideButton;
