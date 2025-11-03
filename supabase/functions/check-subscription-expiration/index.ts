import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req) => {
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL"),
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")
  );

  const { data: profiles, error } = await supabase
    .from("profiles")
    .select(
      "subscription_timestamp, subscription, id, userName, subscription_id, subscription_status"
    )
    .not("subscription", "is", null);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }

  const now = new Date();
  const fiveDays = 5 * 24 * 60 * 60 * 1000;

  for (const profile of profiles || []) {
    if (!profile.subscription_timestamp) {
      continue;
    }

    if (profile.subscription_id) {
      continue;
    }

    if (profile.subscription_status === "active") {
      continue;
    }

    const subscriptionEnd = new Date(profile.subscription_timestamp);
    const daysLeft = subscriptionEnd.getTime() - now.getTime();

    let actualDaysLeft = daysLeft;
    let actualExpirationDate = subscriptionEnd;

    // If daysLeft is negative (already expired), try treating subscription_timestamp as start date
    if (daysLeft < 0) {
      const subscriptionStart = new Date(profile.subscription_timestamp);
      const calculatedEnd = new Date(
        subscriptionStart.getTime() + 30 * 24 * 60 * 60 * 1000
      ); // 30 days from start
      const calculatedDaysLeft = calculatedEnd.getTime() - now.getTime();

      // Use the calculated end date if it makes more sense (positive days left)
      if (calculatedDaysLeft > 0) {
        actualDaysLeft = calculatedDaysLeft;
        actualExpirationDate = calculatedEnd;
      }
    }

    // Only notify users whose subscription will expire within 5 days (not already expired)
    if (actualDaysLeft <= fiveDays && actualDaysLeft > 0) {
      // Check if notification already exists to avoid duplicates
      const { data: existing, error: existingError } = await supabase
        .from("notifications")
        .select("id")
        .eq("user_id", profile.id)
        .eq("type", "SUBSCRIPTION_EXPIRATION_NOTIFY")
        .eq(
          "metadata->>subscription_timestamp",
          profile.subscription_timestamp
        );

      if (existingError) {
        continue;
      }

      if (!existing || existing.length === 0) {
        const { error: insertError } = await supabase
          .from("notifications")
          .insert({
            user_id: profile.id,
            type: "SUBSCRIPTION_EXPIRATION_NOTIFY",
            message: `${profile.userName}, you have 5 days left on your subscription.`,
            read: false,
            importance: "medium",
            metadata: {
              subscription_timestamp: profile.subscription_timestamp,
            },
            action_url: "/dashboard/subscription",
          });

        if (insertError) {
          console.log("5-day notification insert error:", insertError);
        }
      }
    }
  }

  return new Response(
    JSON.stringify({ message: "Checked subscription expiration warnings." }),
    {
      status: 200,
    }
  );
});
