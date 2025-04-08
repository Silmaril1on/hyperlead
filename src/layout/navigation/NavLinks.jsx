"use client";
import MotionChildren from "@/components/containers/MotionChildren";
import MotionContainer from "@/components/containers/MotionContainer";
import LinkComponent from "@/components/buttons/LinkComponent";
import { setToggle } from "@/features/modalSlice";
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
      className="flex flex-col items-center md:space-x-4 md:flex-row"
    >
      {navLinks.map((item) => {
        return (
          <MotionChildren
            animation="zoom-out"
            onClick={handleClose}
            key={item.id}
          >
            <LinkComponent href={item.link} className="text-4xl md:text-base">
              {item.name}
            </LinkComponent>
          </MotionChildren>
        );
      })}
    </MotionContainer>
  );
};

export default NavLinks;
