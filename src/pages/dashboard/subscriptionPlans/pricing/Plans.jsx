import FlexBox from "@/components/containers/FlexBox";
import MotionContainer from "@/components/containers/MotionContainer";
import Headline from "@/components/Headline";
import Card from "./Card";

const Plans = () => {
  return (
    <FlexBox type="column-start" className="p-3 space-y-5">
      <MotionContainer animation="zoom-out">
        <Headline>Choose Your Plan</Headline>
      </MotionContainer>
      <Card />
    </FlexBox>
  );
};

export default Plans;
