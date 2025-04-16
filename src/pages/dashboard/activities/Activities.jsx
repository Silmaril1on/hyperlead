"use client";
import LeadActivities from "./LeadActivities";
import MotionContainer from "@/components/containers/MotionContainer";
import Headline from "@/components/Headline";
import FlexBox from "@/components/containers/FlexBox";

const Activities = ({ profile }) => {
  return (
    <FlexBox type="column-start" className="p-4 h-screen">
      <MotionContainer animation="zoom-out">
        <Headline>Dashboard</Headline>
      </MotionContainer>
      <LeadActivities data={profile} />
    </FlexBox>
  );
};

export default Activities;
