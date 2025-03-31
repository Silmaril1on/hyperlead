import Paragraph from "@/components/Paragraph";
import FooterLinks from "./components/FooterLinks";
import FooterSocialLinks from "./components/FooterSocialLinks";
import FooterSubscribe from "./components/FooterSubscribe";

const Footer = () => {
  return (
    <footer className="flex flex-col md:flex-row *:w-full px-3 lg:px-20 py-20 relative">
      <FooterSubscribe />
      <div>
        <FooterLinks />
        <FooterSocialLinks />
      </div>
      <div className="absolute w-full left-0 bottom-0 pb-2 center">
        <Paragraph>HyperLead. All right reserved. © 2025</Paragraph>
      </div>
    </footer>
  );
};

export default Footer;
