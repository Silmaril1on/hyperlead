import FlexBox from "@/components/containers/FlexBox";
import IconContainer from "@/components/containers/IconContainer";
import SpanContainer from "@/components/containers/SpanContainer";
import Paragraph from "@/components/Paragraph";
import Title from "@/components/Title";
import React from "react";
import { FaBuilding } from "react-icons/fa";

const LeadHeader = ({ data }) => {
  return (
    <FlexBox type="row-3" className="lead-container-style">
      <div>
        <IconContainer>
          <FaBuilding size={24} />
        </IconContainer>
      </div>
      <div className="space-y-1">
        <Title>{data.company_title}</Title>
        <SpanContainer className="w-fit pointer-events-none">
          {data.industry}
        </SpanContainer>
        <Paragraph>{data.seo_description}</Paragraph>
      </div>
    </FlexBox>
  );
};

export default LeadHeader;
