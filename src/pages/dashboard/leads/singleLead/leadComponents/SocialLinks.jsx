import FlexBox from "@/components/containers/FlexBox";
import IconContainer from "@/components/containers/IconContainer";
import SubTitle from "@/components/SubTitle";
import React from "react";
import { FaLinkedin, FaTwitter } from "react-icons/fa";

const SocialLinks = ({ data }) => {
  return (
    <FlexBox type="column-start">
      <SubTitle>Social Links</SubTitle>
      <FlexBox type="row-3" className="w-fit">
        {data.company_linkedin_url && (
          <a
            href={data.company_linkedin_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconContainer size="sm">
              <FaLinkedin size={20} />
            </IconContainer>
          </a>
        )}
        {data.twitter_url && (
          <a href={data.twitter_url} target="_blank" rel="noopener noreferrer">
            <IconContainer size="sm">
              <FaTwitter size={20} />
            </IconContainer>
          </a>
        )}
      </FlexBox>
    </FlexBox>
  );
};

export default SocialLinks;
