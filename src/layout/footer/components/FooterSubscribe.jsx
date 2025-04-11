import Logo from "@/components/Logo";
import SubscribeForm from "./SubscribeForm";
import Paragraph from "@/components/Paragraph";

const FooterSubscribe = () => {
  return (
    <div className="space-y-4">
      <Logo />
      <div>
        <SubscribeForm />
        <Paragraph>Stay updated with the latest news.</Paragraph>
      </div>
    </div>
  );
};

export default FooterSubscribe;
