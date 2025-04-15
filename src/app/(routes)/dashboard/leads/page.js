import Leads from "@/pages/dashboard/leads/Leads";
import { createServerClient } from "@/lib/config/supabaseServer";

export const metadata = {
  title: "Hyperlead | Leads",
  description: "User prefered leads provided by Hyperlead",
};

const LeadsPage = async () => {
  const supabase = await createServerClient();
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();
  if (!session?.user) {
    return <Leads data={null} />;
  }
  const { data: userLeads, error: userLeadsError } = await supabase
    .from("user_leads")
    .select("lead_id")
    .eq("user_id", session.user.id);
  if (userLeadsError || !userLeads?.length) {
    return <Leads data={null} />;
  }
  const leadIds = userLeads.map((ul) => ul.lead_id);
  const { data: leadsData, error: leadsError } = await supabase
    .from("leads")
    .select("*")
    .in("id", leadIds);

  if (leadsError) {
    return <Leads data={null} />;
  }

  return <Leads data={leadsData} />;
};

export default LeadsPage;
