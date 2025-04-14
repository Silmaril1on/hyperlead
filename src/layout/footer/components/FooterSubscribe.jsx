import SubscribeForm from "./SubscribeForm";
import Paragraph from "@/components/Paragraph";
import Logo from "@/components/Logo";
import FlexBox from "@/components/containers/FlexBox";

const FooterSubscribe = () => {
  return (
    <FlexBox type="column-start">
      <Logo />
      <div>
        <SubscribeForm />
        <Paragraph>Stay updated with the latest news.</Paragraph>
      </div>
    </FlexBox>
  );
};

export default FooterSubscribe;
