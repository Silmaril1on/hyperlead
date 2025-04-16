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

  // First check if user has an active subscription
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("subscription, subscription_timestamp")
    .eq("id", session.user.id)
    .single();

  if (
    profileError ||
    !profile?.subscription ||
    !profile?.subscription_timestamp
  ) {
    return <Leads data={null} message="Please subscribe to get leads" />;
  }

  // Check if subscription is expired
  const subscriptionDate = new Date(profile.subscription_timestamp);
  const now = new Date();
  const oneMonthLater = new Date(subscriptionDate);
  oneMonthLater.setMonth(oneMonthLater.getMonth() + 1);

  if (now > oneMonthLater) {
    return (
      <Leads
        data={null}
        message="Your subscription has expired. Please renew to view leads"
      />
    );
  }

  // If subscription is active, fetch leads
  const { data: userLeads, error: userLeadsError } = await supabase
    .from("user_leads")
    .select("lead_id")
    .eq("user_id", session.user.id);

  if (userLeadsError || !userLeads?.length) {
    return <Leads data={null} message="No leads available" />;
  }

  const leadIds = userLeads.map((ul) => ul.lead_id);
  const { data: leadsData, error: leadsError } = await supabase
    .from("leads")
    .select("*")
    .in("id", leadIds);

  if (leadsError) {
    return <Leads data={null} message="Error loading leads" />;
  }

  return <Leads data={leadsData} />;
};

export default LeadsPage;
