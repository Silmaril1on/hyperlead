import FlexBox from "@/components/containers/FlexBox";
import SubTitle from "@/components/SubTitle";
import React from "react";

const LeadsNaming = () => {
  return (
    <div className="grid grid-cols-5 gap-4">
      <SubTitle>Name</SubTitle>
      <FlexBox>
        <SubTitle>Title</SubTitle>
      </FlexBox>
      <SubTitle>Company</SubTitle>
      <SubTitle className="pl-2">Location</SubTitle>
      <SubTitle>Industry</SubTitle>
    </div>
  );
};

export default LeadsNaming;
