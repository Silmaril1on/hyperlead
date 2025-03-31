import StaggerZoomOut from "@/components/containers/StaggerZoomOut";
import ZoomOut from "@/components/containers/ZoomOut";
import Link from "next/link";
import { FaFacebookSquare, FaTwitter, FaInstagram } from "react-icons/fa";

const socLinks = [
  {
    icon: <FaFacebookSquare />,
    link: "/",
  },
  {
    icon: <FaTwitter />,
    link: "/",
  },
  {
    icon: <FaInstagram />,
    link: "/",
  },
];

const FooterSocialLinks = () => {
  return (
    <div className="flex justify-center lg:justify-end mt-5">
      <ZoomOut className="flex space-x-5 ">
        {socLinks.map((item, index) => {
          return (
            <StaggerZoomOut key={index}>
              <Link href={item.link}>
                <span className="text-neutral-500 text-2xl hover:text-black duration-300">
                  {item.icon}
                </span>
              </Link>
            </StaggerZoomOut>
          );
        })}
      </ZoomOut>
    </div>
  );
};

export default FooterSocialLinks;
