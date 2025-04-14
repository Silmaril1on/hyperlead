"use client";
import { AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import NavLinks from "../NavLinks";
import RegistrationButtons from "@/components/RegistrationButtons";
import MotionContainer from "@/components/containers/MotionContainer";

const SideBar = () => {
  const { isOpen } = useSelector((store) => store.modal);

  return (
    <AnimatePresence>
      {isOpen && (
        <MotionContainer
          animation="left"
          className="fixed z-10 top-14 inset-0 backdrop-blur-xl md:hidden flex items-center justify-center flex-col space-y-10"
        >
          <NavLinks />
          <div className="block md:hidden">
            <RegistrationButtons />
          </div>
        </MotionContainer>
      )}
    </AnimatePresence>
  );
};

export default SideBar;
