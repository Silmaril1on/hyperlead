"use client";
import StaggerZoomOut from "@/components/containers/StaggerZoomOut";
import ZoomOut from "@/components/containers/ZoomOut";
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
    <ZoomOut className="flex flex-col items-center md:space-x-4 md:flex-row">
      {navLinks.map((item) => {
        return (
          <StaggerZoomOut onClick={handleClose} key={item.id}>
            <Link href={item.link} className="link text-4xl md:text-base">
              {item.name}
            </Link>
          </StaggerZoomOut>
        );
      })}
    </ZoomOut>
  );
};

export default NavLinks;
