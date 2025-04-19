"use client";
import LeadActivities from "./LeadActivities";
import MotionContainer from "@/components/containers/MotionContainer";
import Headline from "@/components/Headline";
import FlexBox from "@/components/containers/FlexBox";

const Activities = ({ profile }) => {
  return (
    <FlexBox type="column" className="p-4 h-screen">
      <MotionContainer animation="fade-in">
        <Headline className="w-fit">Dashboard</Headline>
      </MotionContainer>
      <LeadActivities data={profile} />
    </FlexBox>
  );
};

export default Activities;
