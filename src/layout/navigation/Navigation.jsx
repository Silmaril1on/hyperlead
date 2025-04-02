import Logo from "@/components/Logo";
import NavLinks from "./NavLinks";
import SideButton from "./side/SideButton";
import RegistrationButtons from "@/components/RegistrationButtons";

const Navigation = () => {
  return (
    <nav className="fixed w-full z-10 top-0 backdrop-blur-md px-3 lg:px-20 py-5 flex justify-between items-center">
      <div className="center space-x-10">
        <Logo />
        <div className="hidden md:flex">
          <NavLinks />
        </div>
      </div>
      <div className="hidden md:flex">
        <RegistrationButtons />
      </div>
      <SideButton />
    </nav>
  );
};

export default Navigation;
