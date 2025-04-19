import FlexBox from "@/components/containers/FlexBox";
import { CountryFlag } from "@/components/CountryFlagsComponent";
import SubTitle from "@/components/SubTitle";

const LeadLocation = ({ lead }) => {
  const { country, city, state } = lead;
  return (
    <FlexBox type="column-center" className="pl-4">
      <FlexBox type="row" className="gap-1">
        <CountryFlag countryName={country} />
        <SubTitle>{country}</SubTitle>
      </FlexBox>
      <FlexBox type="column-center">
        <h1 className="text-[13px] font-medium">{city}</h1>
        {lead.state && (
          <h1 className="text-[13px] font-medium text-blue-800">{state}</h1>
        )}
      </FlexBox>
    </FlexBox>
  );
};

export default LeadLocation;
