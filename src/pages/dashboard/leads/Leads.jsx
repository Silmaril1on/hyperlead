import LeadCard from "./LeadCard";
import Headline from "@/components/Headline";
import FlexBox from "@/components/containers/FlexBox";
import MotionContainer from "@/components/containers/MotionContainer";

const Leads = ({ leads }) => {
  if (!leads || leads.length === 0) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Leads</h1>
        <p>No leads found matching your preferences.</p>
      </div>
    );
  }

  return (
    <FlexBox type="column-start" className="p-3 space-y-5">
      <MotionContainer animation="zoom-out">
        <Headline>Leads</Headline>
      </MotionContainer>
      <LeadCard leads={leads} />
    </FlexBox>
  );
};

export default Leads;
