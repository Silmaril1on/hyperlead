import FlexBox from "@/components/containers/FlexBox";
import MotionChildren from "@/components/containers/MotionChildren";
import Paragraph from "@/components/Paragraph";
import Title from "@/components/Title";

const Header = () => {
  return (
    <MotionChildren animation="fade-in">
      <FlexBox type="center-col">
        <Title>Select Your Preferences</Title>
        <Paragraph>
          Choose any preferences that best match your industry focus
        </Paragraph>
      </FlexBox>
    </MotionChildren>
  );
};

export default Header;
