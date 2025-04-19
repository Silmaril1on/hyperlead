"use client";
import LeadCard from "./leadsLayout/LeadCard";
import Headline from "@/components/Headline";
import FlexBox from "@/components/containers/FlexBox";
import MotionContainer from "@/components/containers/MotionContainer";
import LeadFilter from "./leadsNavigation/LeadFilter";
import { useState } from "react";

const Leads = ({ data, message }) => {
  const [filters, setFilters] = useState({
    country: "",
    employees: "",
    industry: "",
    city: "",
    seniority: "",
  });

  if (!data) {
    return <h1>{message}</h1>;
  }

  const handleFilterChange = (type, value) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
  };

  const filteredLeads = data.filter((lead) => {
    if (filters.country && lead.country !== filters.country) return false;
    if (filters.employees) {
      const employeeCount = parseInt(lead.employees) || 0;
      const range = filters.employees;

      if (range === "3000 or more") {
        if (employeeCount < 3000) return false;
      } else {
        const [min, max] = range.split("-").map(Number);
        if (employeeCount < min || employeeCount > max) return false;
      }
    }
    if (
      filters.industry &&
      (!lead.industry || !lead.industry.includes(filters.industry))
    )
      return false;
    if (filters.city && lead.city !== filters.city) return false;
    if (filters.seniority && lead.seniority !== filters.seniority) return false;
    return true;
  });

  return (
    <FlexBox type="column" className="p-3 space-y-5">
      <MotionContainer animation="zoom-out">
        <Headline className="w-fit">Leads</Headline>
      </MotionContainer>
      <LeadFilter leads={data} onFilterChange={handleFilterChange} />
      <LeadCard leads={filteredLeads} />{" "}
    </FlexBox>
  );
};

export default Leads;
