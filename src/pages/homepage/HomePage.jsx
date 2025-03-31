"use client";
import { useEffect, useState } from "react";
import LogoSlider from "./LogoSlider";
import SectionFaq from "./sectionFAQ/SectionFaq";
import SectionGlobe from "./sectionGlobe/SectionGlobe";
import SectionOne from "./sectionOne/SectionOne";
import SectionPricing from "./sectionPricing/SectionPricing";
import SectionThree from "./sectionThree/SectionThree";
import SectionTwo from "./sectionTwo/SectionTwo";
import supabase from "@/config/supabaseClient";

const HomePage = () => {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    const fetchLeads = async () => {
      const { data, error } = await supabase.from("leads").select();
      if (error) {
        console.error("Error fetching leads:", error);
      } else {
        setLeads(data);
      }
    };

    fetchLeads();
  }, []);

  console.log(leads);

  return (
    <main className="center flex-col space-y-20">
      <SectionOne />
      <LogoSlider />
      <SectionTwo />
      <SectionThree />
      <SectionPricing />
      <SectionFaq />
      <SectionGlobe />
      <div className="h-screen center w-full">
        {leads.length > 0 ? (
          <ul>
            {leads.map((lead, index) => (
              <li key={index}>{lead.name}</li>
            ))}
          </ul>
        ) : (
          "Loading..."
        )}
      </div>
    </main>
  );
};

export default HomePage;
