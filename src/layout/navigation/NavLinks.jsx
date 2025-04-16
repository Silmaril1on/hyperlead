"use client";
import Button from "@/components/buttons/Button";
import MotionChildren from "@/components/containers/MotionChildren";
import MotionContainer from "@/components/containers/MotionContainer";
import { setToggle } from "@/features/modalSlice";
import Link from "next/link";
import { useDispatch } from "react-redux";

const navLinks = [
  {
    id: 0,
    name: "features",
    link: "/",
  },
  {
    id: 1,
    name: "pricing",
    link: "/pricing",
  },
  {
    id: 2,
    name: "blog",
    link: "/blog",
  },
  {
    id: 3,
    name: "changelog",
    link: "/",
  },
];

const NavLinks = () => {
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setToggle(false));
  };
  return (
    <MotionContainer
      animation="zoom-out"
      className="flex flex-col items-center md:space-x-4 md:flex-row "
    >
      {navLinks.map((item) => {
        return (
          <MotionChildren
            animation="zoom-out"
            onClick={handleClose}
            key={item.id}
          >
            <Link className="text-3xl md:text-sm" href={item.link}>
              {item.name}
            </Link>
          </MotionChildren>
        );
      })}
    </MotionContainer>
  );
};

export default NavLinks;
