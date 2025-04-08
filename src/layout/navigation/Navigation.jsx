import Logo from "@/components/Logo";
import NavLinks from "./NavLinks";
import SideButton from "./side/SideButton";
import UserPanel from "./usernamepanel/UserPanel";

const Navigation = () => {
  return (
    <nav className="sticky w-full z-10 top-0 backdrop-blur-md px-3 lg:px-20 py-5 flex justify-between items-center">
      <div className="center space-x-10">
        <Logo />
        <div className="hidden md:flex">
          <NavLinks />
        </div>
      </div>
      <UserPanel />
      <SideButton />
    </nav>
  );
};

export default Navigation;
