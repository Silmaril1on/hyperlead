import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import LeadLocation from "./LeadLocation";
import LeadPeronsName from "./LeadPeronsName";
import SubTitle from "@/components/SubTitle";
import LeadIndustry from "./LeadIndustry";
import FlexBox from "@/components/containers/FlexBox";

const LeadCard = ({ leads }) => {
  return (
    <>
      <div className="grid grid-cols-1 space-y-4 w-full">
        <AnimatePresence>
          {leads.map((lead) => {
            return (
              <motion.div
                key={lead.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Link
                  href={`/dashboard/leads/${lead.id}`}
                  className="grid grid-cols-5 gap-3 p-3 primary-border hover:border-neutral-400 rounded-xl duration-300 light-gradient"
                >
                  <LeadPeronsName lead={lead} />
                  <FlexBox>
                    <SubTitle>{lead.seniority}</SubTitle>
                  </FlexBox>
                  <FlexBox type="column-center">
                    <SubTitle>{lead.company_title}</SubTitle>
                  </FlexBox>
                  <LeadLocation lead={lead} />
                  <LeadIndustry lead={lead} />
                </Link>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </>
  );
};

export default LeadCard;
