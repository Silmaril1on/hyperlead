import FlexBox from "@/components/containers/FlexBox";
import SubTitle from "@/components/SubTitle";

const LeadPeronsName = ({ lead }) => {
  return (
    <FlexBox type="row-between">
      <FlexBox type="column-center">
        <SubTitle>
          {lead.first_name} {lead.last_name}
        </SubTitle>
        <span className="text-neutral-500 font-medium text-[12px]">
          {lead.email}
        </span>
      </FlexBox>
      {/* <FlexBox>
        <SubTitle>{lead.seniority}</SubTitle>
      </FlexBox> */}
    </FlexBox>
  );
};

export default LeadPeronsName;
