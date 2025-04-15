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

    // First, get the leads this specific user already has
    const { data: userExistingLeads, error: userLeadsError } = await supabase
      .from("user_leads")
      .select("lead_id")
      .eq("user_id", userId);

    if (userLeadsError) {
      console.error("Error fetching user's existing leads:", userLeadsError);
      throw new Error(
        `Failed to fetch user's existing leads: ${userLeadsError.message}`
      );
    }

    // Get the IDs of leads this user already has
    const userExistingLeadIds = userExistingLeads.map((lead) => lead.lead_id);

    // Get available leads that match preferences, excluding ones the user already has
    let query = supabase
      .from("leads")
      .select("id, industry")
      .in("industry", preferences)
      .limit(leadCount);

    // Only add the not-in condition if the user has existing leads
    if (userExistingLeadIds.length > 0) {
      query = query.not("id", "in", userExistingLeadIds);
    }

    const { data: availableLeads, error: leadsError } = await query;

    if (leadsError) {
      console.error("Error fetching leads:", leadsError);
      throw new Error(`Failed to fetch leads: ${leadsError.message}`);
    }

    if (!availableLeads || availableLeads.length === 0) {
      throw new Error("No new leads available for your industry preferences");
    }

    // Create user_leads entries for the new leads
    const userLeadsToInsert = availableLeads.map((lead) => ({
      user_id: userId,
      lead_id: lead.id,
      user_email: userEmail,
      received_at: new Date().toISOString(),
    }));

    console.log("Attempting to insert leads:", userLeadsToInsert);

    // Insert all leads at once
    const { error: insertError } = await supabase
      .from("user_leads")
      .insert(userLeadsToInsert);

    if (insertError) {
      console.error("Error inserting leads:", insertError);
      throw new Error(`Failed to insert leads: ${insertError.message}`);
    }

    return {
      success: true,
      assignedLeadsCount: availableLeads.length,
    };
  } catch (error) {
    console.error("Error in assignLeadsToUser:", error);
    return {
      success: false,
      error: error.message,
    };
  }
};
