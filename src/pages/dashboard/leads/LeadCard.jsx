import SubTitle from "@/components/SubTitle";
import Link from "next/link";
import { FaBuilding, FaUsers, FaIndustry } from "react-icons/fa";
import { CountryFlag } from "@/components/CountryFlagsComponent";
import FlexBox from "@/components/containers/FlexBox";

const InfoRow = ({ icon: Icon, children, className = "" }) => (
  <div className={`flex items-center space-x-2 text-gray-600 ${className}`}>
    <Icon />
    <span className="text-sm capitalize">{children}</span>
  </div>
);

const LeadCard = ({ leads }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {leads.map((lead) => (
        <Link
          href={`/dashboard/leads/${lead.id}`}
          key={lead.id}
          className="group bg-gradient-to-br from-neutral-50/40 from-10% to-neutral-100 rounded-xl border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all duration-300 "
        >
          <div className="p-3 space-y-2 ">
            <FlexBox
              type="row-start-2"
              className="*:group-hover:text-blue-600 *:duration-300 "
            >
              <FaBuilding className="mt-1" />
              <SubTitle className="h-12 leading-tight">
                {lead.company_title}
              </SubTitle>
            </FlexBox>
            <InfoRow icon={() => <CountryFlag countryName={lead.country} />}>
              <span>{lead.country}</span>
            </InfoRow>
            <InfoRow icon={FaUsers}>{lead.employees} employees</InfoRow>
            <InfoRow icon={FaIndustry}>{lead.industry}</InfoRow>
            <div className="flex flex-wrap gap-2 pt-2 text-xs *:rounded-full *:px-2 *:py-1">
              <span className="bg-blue-50 text-blue-600">{lead.industry}</span>
              <span className="bg-green-50 text-green-600">
                {lead.employees} employees
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default LeadCard;
