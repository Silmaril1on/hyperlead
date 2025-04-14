import Leads from "@/pages/dashboard/leads/Leads";
import { createServerClient } from "@/lib/config/supabaseServer";

export const metadata = {
  title: "Hyperlead | Leads",
  description: "User Leads",
};

const LeadsPage = async () => {
  const supabase = await createServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) {
    return null;
  }
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", session.user.id)
    .single();

  if (profileError || !profile) {
    console.log("Profile error or no profile found:", profileError);
    return null;
  }

  if (!profile.subscription) {
    return (
      <Leads
        leads={[]}
        message="Please subscribe to a plan to receive leads."
      />
    );
  }

  // First, try to get user's existing leads
  const { data: existingLeads } = await supabase
    .from("user_leads")
    .select("*, leads(*)")
    .eq("user_id", session.user.id)
    .order("received_at", { ascending: false });

  // If user has leads, check if they need to be refreshed
  if (existingLeads && existingLeads.length > 0) {
    const oldestLeadDate = new Date(
      existingLeads[existingLeads.length - 1].received_at
    );
    const daysSinceOldestLead = Math.floor(
      (new Date() - oldestLeadDate) / (1000 * 60 * 60 * 24)
    );
    // If it's been less than 30 days, return existing leads
    if (daysSinceOldestLead < 30) {
      return <Leads leads={existingLeads.map((ul) => ul.leads)} />;
    }
  }

  const userPreferences = profile?.preferences || [];

  // Fetch new leads that match user's preferences
  let leads = [];
  if (userPreferences.length > 0) {
    try {
      // Get leads that match preferences and haven't been received in the last 30 days
      const { data: leadsData, error: leadsError } = await supabase
        .from("leads")
        .select("*")
        .or(userPreferences.map((pref) => `industry.ilike.%${pref}%`).join(","))
        .not(
          "id",
          "in",
          supabase
            .from("user_leads")
            .select("lead_id")
            .eq("user_id", session.user.id)
            .gte(
              "received_at",
              new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
            )
        )
        .limit(profile.monthly_leads);

      if (!leadsError && leadsData && leadsData.length > 0) {
        leads = leadsData;

        // Insert new leads into user_leads
        const { error: insertError } = await supabase.rpc("insert_user_leads", {
          lead_ids: leads.map((lead) => lead.id),
        });

        if (insertError) {
          return (
            <Leads
              leads={[]}
              message="Error processing leads. Please try again."
            />
          );
        }

        // Reset monthly count and update total
        const { error: updateError } = await supabase
          .from("profiles")
          .update({
            leads_received_this_month: leads.length,
            total_leads_received:
              (profile.total_leads_received || 0) + leads.length,
            updated_at: new Date().toISOString(),
          })
          .eq("id", session.user.id);

        if (updateError) {
          console.error("Failed to update profile:", updateError);
          return (
            <Leads
              leads={[]}
              message="Error updating your profile. Please try again."
            />
          );
        }
      }
    } catch (error) {
      console.error("Error in leads distribution process:", error);
      return (
        <Leads
          leads={[]}
          message="An unexpected error occurred. Please try again."
        />
      );
    }
  }

  // If we have new leads, return them, otherwise return existing leads
  return (
    <Leads
      leads={
        leads.length > 0 ? leads : existingLeads?.map((ul) => ul.leads) || []
      }
    />
  );
};

export default LeadsPage;
