import LeadCard from "./LeadCard";
import Headline from "@/components/Headline";
import FlexBox from "@/components/containers/FlexBox";
import MotionContainer from "@/components/containers/MotionContainer";

const Leads = ({ data }) => {
  if (!data) {
    return <div>you have to subscribe to get leads</div>;
  }

  return (
    <FlexBox type="column-start" className="p-3 space-y-5">
      <MotionContainer animation="zoom-out">
        <Headline>Leads</Headline>
      </MotionContainer>
      <LeadCard leads={data} />
    </FlexBox>
  );
};

export default Leads;
