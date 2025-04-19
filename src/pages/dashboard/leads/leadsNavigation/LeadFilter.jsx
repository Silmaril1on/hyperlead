import FlexBox from "@/components/containers/FlexBox";
import SubTitle from "@/components/SubTitle";

const LeadFilter = ({ leads, onFilterChange }) => {
  const uniqueCountries = [
    ...new Set(leads.map((lead) => lead.country).filter(Boolean)),
  ];
  const uniqueIndustries = [
    ...new Set(leads.flatMap((lead) => lead.industry || []).filter(Boolean)),
  ];
  const uniqueCities = [
    ...new Set(leads.map((lead) => lead.city).filter(Boolean)),
  ];
  const uniqueSeniorities = [
    ...new Set(leads.map((lead) => lead.seniority).filter(Boolean)),
  ];

  const employeeRanges = [
    { label: "0-50", min: 0, max: 50 },
    { label: "50-100", min: 50, max: 100 },
    { label: "100-500", min: 100, max: 500 },
    { label: "500-1000", min: 500, max: 1000 },
    { label: "1000-3000", min: 1000, max: 3000 },
    { label: "3000 or more", min: 3000, max: Infinity },
  ];

  const filterConfig = [
    {
      type: "country",
      label: "Countries",
      options: uniqueCountries.map((value) => ({ label: value, value })),
    },
    {
      type: "employees",
      label: "Employees",
      options: employeeRanges.map((range) => ({
        label: range.label,
        value: range.label,
      })),
    },

    {
      type: "city",
      label: "Cities",
      options: uniqueCities.map((value) => ({ label: value, value })),
    },
    {
      type: "seniority",
      label: "Seniority Levels",
      options: uniqueSeniorities.map((value) => ({ label: value, value })),
    },
    {
      type: "industry",
      label: "Industries",
      options: uniqueIndustries.map((value) => ({ label: value, value })),
    },
  ];

  const selectClassName =
    "appearance-none bg-neutral-100 border border-neutral-300 rounded-md px-2 py-1 focus:outline-none focus:ring-[0.5px] focus:ring-neutral-400";

  return (
    <FlexBox type="column-center" className="gap-2">
      <SubTitle>Filter leads as your need</SubTitle>
      <div className="flex flex-wrap gap-4">
        {filterConfig.map((filter) => (
          <div key={filter.type} className="relative">
            <select
              onChange={(e) => onFilterChange(filter.type, e.target.value)}
              className={selectClassName}
            >
              <option value="">{filter.label}</option>
              {filter.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </FlexBox>
  );
};

export default LeadFilter;
