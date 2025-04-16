import GradientContainer from "@/components/containers/GradientContainer";
import Title from "@/components/Title";
import SideComponent from "./SideComponent";
import FlexBox from "@/components/containers/FlexBox";

const DashboardSide = () => {
  return (
    <div className="w-full md:w-[30%] lg:w-[20%] relative flex flex-col md:space-y-6 p-6">
      <GradientContainer />
      <FlexBox type="column-start">
        <Title>HyperLead</Title>
        <SideComponent />
      </FlexBox>
    </div>
  );
};

export default DashboardSide;
