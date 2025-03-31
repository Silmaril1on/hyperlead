import StaggerZoomOut from "@/components/containers/StaggerZoomOut";
import ZoomOut from "@/components/containers/ZoomOut";
import Link from "next/link";

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
  return (
    <ZoomOut className="flex flex-col items-center md:space-x-4 md:flex-row">
      {navLinks.map((item) => {
        return (
          <StaggerZoomOut key={item.id}>
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
