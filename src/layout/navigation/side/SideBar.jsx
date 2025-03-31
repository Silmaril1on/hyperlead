"use client";
import { AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import FromLeft from "@/components/containers/FromLeft";
import NavLinks from "../NavLinks";
import RegistrationButtons from "@/auth/regbuttons/RegistrationButtons";

const SideBar = () => {
  const { isOpen } = useSelector((store) => store.modal);

  return (
    <AnimatePresence>
      {isOpen && (
        <FromLeft className="fixed top-0 inset-0 backdrop-blur-xl center flex-col space-y-10">
          <NavLinks />
          <RegistrationButtons />
        </FromLeft>
      )}
    </AnimatePresence>
  );
};

export default SideBar;
