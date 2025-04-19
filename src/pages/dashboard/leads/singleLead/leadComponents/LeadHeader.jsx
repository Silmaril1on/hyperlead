import CardContainer from "@/components/containers/CardContainer";
import IconContainer from "@/components/containers/IconContainer";
import SpanContainer from "@/components/containers/SpanContainer";
import Paragraph from "@/components/Paragraph";
import Title from "@/components/Title";
import React from "react";
import { FaBuilding } from "react-icons/fa";

const LeadHeader = ({ data }) => {
  return (
    <CardContainer className="flex space-x-2">
      <div>
        <IconContainer>
          <FaBuilding size={24} />
        </IconContainer>
      </div>
      <div className="space-y-1">
        <Title>{data.company_title}</Title>
        <SpanContainer color="blue" className="w-fit pointer-events-none">
          {data.industry}
        </SpanContainer>
        <Paragraph>{data.seo_description}</Paragraph>
      </div>
    </CardContainer>
  );
};

export default LeadHeader;
