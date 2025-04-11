import FlexBox from "@/components/containers/FlexBox";
import MotionChildren from "@/components/containers/MotionChildren";
import Paragraph from "@/components/Paragraph";
import Title from "@/components/Title";

const Header = () => {
  return (
    <MotionChildren animation="fade-in">
      <FlexBox type="column">
        <Title>Select Your Preferences</Title>
        <Paragraph>Choose 3 areas that interest you most</Paragraph>
      </FlexBox>
    </MotionChildren>
  );
};

export default Header;
