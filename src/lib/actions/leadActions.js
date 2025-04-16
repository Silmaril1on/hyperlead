import supabase from "../config/supabaseClient";

export const checkSubscriptionExpiration = async (userId) => {
  try {
    const { data: profile, error } = await supabase
      .from("profiles")
      .select("subscription_timestamp, subscription")
      .eq("id", userId)
      .single();
    if (error) throw error;
    if (!profile.subscription || !profile.subscription_timestamp) {
      return { expired: true };
    }
    const subscriptionDate = new Date(profile.subscription_timestamp);
    const now = new Date();
    const oneMonthLater = new Date(subscriptionDate);
    oneMonthLater.setMonth(oneMonthLater.getMonth() + 1);
    const expired = now > oneMonthLater;
    if (expired) {
      // Reset subscription
      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          subscription: null,
          subscription_timestamp: null,
          leads_received_this_month: 0,
        })
        .eq("id", userId);

      if (updateError) throw updateError;
    }
    return { expired };
  } catch (error) {
    console.error("Error checking subscription expiration:", error);
    return { expired: false, error: error.message };
  }
};

export const assignLeadsToUser = async (
  userId,
  userEmail,
  preferences,
  leadCount,
  isNewSubscription = false
) => {
  try {
    console.log("Starting assignLeadsToUser with:", {
      userId,
      userEmail,
      preferences,
      leadCount,
      isNewSubscription,
    });

    // Verify current session
    const {
      data: { session },
      error: authError,
    } = await supabase.auth.getSession();
    if (authError) {
      throw new Error(`Authentication error: ${authError.message}`);
    }
    if (!session) {
      throw new Error("No active session found");
    }
    if (session.user.id !== userId) {
      throw new Error("Session user ID does not match provided user ID");
    }

    if (!preferences || preferences.length === 0) {
      throw new Error(
        "No preferences set. Please set your industry preferences first."
      );
    }

    // If it's a new subscription or renewal, first delete all existing user_leads
    if (isNewSubscription) {
      const { error: deleteError } = await supabase
        .from("user_leads")
        .delete()
        .eq("user_id", userId);

      if (deleteError) {
        console.error("Error deleting existing leads:", deleteError);
        throw new Error(
          `Failed to delete existing leads: ${deleteError.message}`
        );
      }
    }

    // Get all leads that this user has ever received (to avoid duplicates)
    const { data: allUserLeads, error: historyError } = await supabase
      .from("user_leads_history")
      .select("lead_id")
      .eq("user_id", userId);

    const previouslyReceivedLeadIds =
      allUserLeads?.map((lead) => lead.lead_id) || [];

    // Calculate how many leads we need from each industry
    const leadsPerIndustry = Math.floor(leadCount / preferences.length);
    const extraLeads = leadCount % preferences.length;

    let allAvailableLeads = [];

    // Fetch leads for each industry separately to ensure balanced distribution
    for (let i = 0; i < preferences.length; i++) {
      const industry = preferences[i];
      // For the last industry, add any remaining leads from the division remainder
      const industryLeadCount =
        i === preferences.length - 1
          ? leadsPerIndustry + extraLeads
          : leadsPerIndustry;

      let query = supabase
        .from("leads")
        .select("id, industry")
        .eq("industry", industry);

      // Exclude previously received leads if any exist
      if (previouslyReceivedLeadIds.length > 0) {
        query = query.not(
          "id",
          "in",
          `(${previouslyReceivedLeadIds.join(",")})`
        );
      }

      query = query.limit(industryLeadCount);

      const { data: industryLeads, error: leadsError } = await query;

      if (leadsError) {
        console.error(
          `Error fetching leads for industry ${industry}:`,
          leadsError
        );
        throw new Error(`Failed to fetch leads: ${leadsError.message}`);
      }

      if (!industryLeads || industryLeads.length < industryLeadCount) {
        throw new Error(
          `Not enough leads available for industry: ${industry}. Only ${
            industryLeads?.length || 0
          } leads found, needed ${industryLeadCount}`
        );
      }

      allAvailableLeads = [...allAvailableLeads, ...industryLeads];
    }

    // Create user_leads entries for the new leads
    const userLeadsToInsert = allAvailableLeads.map((lead) => ({
      user_id: userId,
      lead_id: lead.id,
      user_email: userEmail,
      received_at: new Date().toISOString(),
    }));

    // Also record these leads in history to avoid future duplicates
    const historyEntries = allAvailableLeads.map((lead) => ({
      user_id: userId,
      lead_id: lead.id,
      received_at: new Date().toISOString(),
    }));

    // Insert all leads at once
    const { error: insertError } = await supabase
      .from("user_leads")
      .insert(userLeadsToInsert);

    if (insertError) {
      console.error("Error inserting leads:", insertError);
      throw new Error(`Failed to insert leads: ${insertError.message}`);
    }

    // Record in history
    const { error: historyInsertError } = await supabase
      .from("user_leads_history")
      .insert(historyEntries);

    if (historyInsertError) {
      console.error("Error recording lead history:", historyInsertError);
      // Don't throw here as it's not critical
    }

    return {
      success: true,
      assignedLeadsCount: allAvailableLeads.length,
    };
  } catch (error) {
    console.error("Error in assignLeadsToUser:", error);
    return {
      success: false,
      error: error.message,
    };
  }
};

export const simulateSubscriptionExpiration = async (userId) => {
  try {
    // Set subscription_timestamp to 2 months ago to force expiration
    const twoMonthsAgo = new Date();
    twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);

    const { error } = await supabase
      .from("profiles")
      .update({
        subscription_timestamp: twoMonthsAgo.toISOString(),
      })
      .eq("id", userId);

    if (error) throw error;

    // Now check expiration which will reset the subscription
    return await checkSubscriptionExpiration(userId);
  } catch (error) {
    console.error("Error simulating subscription expiration:", error);
    return { error: error.message };
  }
};
