import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Helper: get plan lead count
const PLAN_LEADS: Record<string, number> = {
  PLUS: 150,
  PRO: 400,
  HYPER: 800,
};

// --- Deno-compatible assignLeadsToUser with archiving logic ---
async function assignLeadsToUser(
  supabaseClient,
  userId,
  userEmail,
  preferences,
  leadCount,
  planLeads,
  subscriptionType
) {
  try {
    if (!preferences || preferences.length === 0) {
      throw new Error(
        "No preferences set. Please set your industry preferences first."
      );
    }
    const now = new Date().toISOString();

    // --- ARCHIVE EXISTING LEADS (move to user_leads_history) ---
    const { data: currentUserLeads } = await supabaseClient
      .from("user_leads")
      .select("lead_id, user_id, user_email, received_at, is_demo")
      .eq("user_id", userId);
    if (currentUserLeads && currentUserLeads.length > 0) {
      const { data: alreadyInHistory } = await supabaseClient
        .from("user_leads_history")
        .select("lead_id")
        .eq("user_id", userId);
      const alreadyInHistoryIds = new Set(
        alreadyInHistory?.map((l) => l.lead_id)
      );
      const historyEntries = currentUserLeads
        .filter((l) => !alreadyInHistoryIds.has(l.lead_id))
        .map((l) => ({
          user_id: l.user_id,
          lead_id: l.lead_id,
          user_email: userEmail,
          received_at: l.received_at,
          is_demo: l.is_demo,
        }));
      if (historyEntries.length > 0) {
        const { error: insertHistoryError } = await supabaseClient
          .from("user_leads_history")
          .insert(historyEntries);
        if (insertHistoryError) {
          throw new Error(
            `Failed to insert into user_leads_history: ${insertHistoryError.message}`
          );
        }
      }
      await supabaseClient.from("user_leads").delete().eq("user_id", userId);
    }

    // --- LEAD ASSIGNMENT LOGIC ---
    // Fetch user region
    const { data: userProfile, error: profileError } = await supabaseClient
      .from("profiles")
      .select("region")
      .eq("id", userId)
      .single();
    if (profileError) {
      throw new Error(`Failed to fetch profile: ${profileError.message}`);
    }
    const hasRegionPreferences =
      userProfile.region && userProfile.region.length > 0;
    // 1. Get all leads that this user has ever received (to avoid duplicates)
    const { data: allUserLeads } = await supabaseClient
      .from("user_leads_history")
      .select("lead_id, is_demo")
      .eq("user_id", userId);
    // 2. Get all leads currently assigned to the user (should be empty after archiving, but keep for safety)
    const { data: currentUserLeads2 } = await supabaseClient
      .from("user_leads")
      .select("lead_id, is_demo")
      .eq("user_id", userId);
    const previouslyReceivedLeadIds =
      allUserLeads?.filter((l) => !l.is_demo).map((lead) => lead.lead_id) || [];
    const currentlyAssignedLeadIds =
      currentUserLeads2
        ?.filter((l) => !l.is_demo)
        .map((lead) => lead.lead_id) || [];
    const allExcludedLeadIds = [
      ...new Set([...previouslyReceivedLeadIds, ...currentlyAssignedLeadIds]),
    ];
    // 4. Fetch available leads for preferences
    let allAvailableLeads = [];
    const numPrefs = preferences.length;
    const baseLeadsPerPref = Math.floor(leadCount / numPrefs);
    let remainder = leadCount % numPrefs;
    const shuffledPrefs = [...preferences].sort(() => Math.random() - 0.5);
    const leadsPerPref = shuffledPrefs.map((pref, idx) =>
      idx < remainder ? baseLeadsPerPref + 1 : baseLeadsPerPref
    );
    for (let i = 0; i < shuffledPrefs.length; i++) {
      const industry = shuffledPrefs[i];
      const limit = leadsPerPref[i];
      let query = supabaseClient
        .from("leads")
        .select("id, industry, country")
        .contains("industry", [industry]);
      if (hasRegionPreferences && userProfile.region.length > 0) {
        query = query.in("country", userProfile.region);
      }
      const { data: industryLeads, error: leadsError } = await query.limit(
        2000
      );
      if (leadsError) {
        throw new Error(
          `Failed to fetch leads for ${industry}: ${leadsError.message}`
        );
      }
      const filteredLeads = industryLeads
        .filter((lead) => !allExcludedLeadIds.includes(lead.id))
        .slice(0, limit);
      allAvailableLeads = [...allAvailableLeads, ...filteredLeads];
    }
    // Deduplicate
    const uniqueLeadsMap = new Map();
    allAvailableLeads.forEach((lead) => {
      uniqueLeadsMap.set(lead.id, lead);
    });
    allAvailableLeads = Array.from(uniqueLeadsMap.values()).slice(0, leadCount);
    // 5. Prepare insert
    const userLeadsToInsert = allAvailableLeads.map((lead) => ({
      user_id: userId,
      lead_id: lead.id,
      user_email: userEmail,
      received_at: new Date().toISOString(),
      is_demo: false,
    }));
    // 6. Insert
    if (userLeadsToInsert.length > 0) {
      const { error: insertError } = await supabaseClient
        .from("user_leads")
        .insert(userLeadsToInsert);
      if (insertError) {
        throw new Error(`Failed to insert leads: ${insertError.message}`);
      }
    } else {
      throw new Error(
        "No available leads to assign. Please update your preferences or contact support."
      );
    }
    // 4. Update total_leads_received (increment, not overwrite) and other fields
    const { data: profile, error: profileFetchError } = await supabaseClient
      .from("profiles")
      .select("total_leads_received, monthly_leads, leads_received_this_month")
      .eq("id", userId)
      .single();
    if (profileFetchError) {
      throw new Error(
        `Failed to fetch user profile: ${profileFetchError.message}`
      );
    }
    const currentTotal = profile.total_leads_received || 0;
    const updatedTotal = currentTotal + allAvailableLeads.length;
    const currentLeadsReceivedThisMonth =
      profile.leads_received_this_month || 0;
    const updatedProfileFields = {
      total_leads_received: updatedTotal,
      monthly_leads: planLeads,
      leads_received_this_month:
        currentLeadsReceivedThisMonth + allAvailableLeads.length,
      last_leads_finished_notification: null,
      last_notification_timestamp: null,
      subscription_status: "active",
      subscription_timestamp: now,
      subscription_type: subscriptionType,
    };
    const { error: updateError } = await supabaseClient
      .from("profiles")
      .update(updatedProfileFields)
      .eq("id", userId);
    if (updateError) {
      throw new Error(`Failed to update user profile: ${updateError.message}`);
    }
    // After successfully assigning new leads, update historical demo leads to be part of history
    const { error: updateHistoryError } = await supabaseClient
      .from("user_leads_history")
      .update({ is_demo: false })
      .eq("user_id", userId)
      .eq("is_demo", true);
    if (updateHistoryError) {
      // Log the error but don't fail the entire process, as leads have been assigned.
    }
    return {
      success: true,
      assignedLeadsCount: allAvailableLeads.length,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}

serve(async (req) => {
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL"),
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")
  );

  // 1. Get all users with active annual subscriptions
  const { data: profiles, error } = await supabase
    .from("profiles")
    .select(
      "id, email, preferences, subscription, subscription_status, userName, subscription_type"
    )
    .eq("subscription_status", "active")
    .eq("subscription_type", "ANNUAL");

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }

  let results: any[] = [];

  for (const user of profiles) {
    const plan = user.subscription?.toUpperCase();
    const leadCount = PLAN_LEADS[plan] || 0;
    if (!leadCount || !user.preferences || user.preferences.length === 0) {
      results.push({
        user: user.id,
        status: "skipped",
        reason: "No plan or preferences",
      });
      continue;
    }

    // Assign leads using the adapted function
    const assignResult = await assignLeadsToUser(
      supabase,
      user.id,
      user.email,
      user.preferences,
      leadCount,
      leadCount,
      "ANNUAL"
    );

    // Notify user
    const { error: notifyError } = await supabase.from("notifications").insert({
      user_id: user.id,
      type: "MONTHLY_LEADS_ASSIGNED",
      message:
        "You have received a new set of leads for this month. Check your leads dashboard.",
      read: false,
      importance: "low",
      metadata: { plan, leadCount },
      action_url: "/dashboard/activities/leads",
    });

    results.push({
      user: user.id,
      status: assignResult.success ? "assigned" : "error",
      assignResult,
      notifyError: notifyError ? notifyError.message : null,
    });
  }

  return new Response(
    JSON.stringify({
      message: "Monthly leads assigned for annual subscribers.",
      results,
    }),
    { status: 200 }
  );
});
