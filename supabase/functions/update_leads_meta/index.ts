import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req) => {
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  // Count total leads
  const { count, error: countError } = await supabase
    .from("leads")
    .select("id", { count: "exact", head: true });

  if (countError) {
    return new Response(JSON.stringify({ error: countError.message }), {
      status: 500,
    });
  }

  // Get the first row in leads_meta
  const { data: metaRows, error: metaError } = await supabase
    .from("leads_meta")
    .select("id, total_count")
    .limit(1);

  if (metaError || !metaRows || metaRows.length === 0) {
    return new Response(JSON.stringify({ error: "No leads_meta row found" }), {
      status: 500,
    });
  }

  const metaId = metaRows[0].id;
  const prevTotal = metaRows[0].total_count || 0;
  const addedLeads = count - prevTotal;

  // Build update payload
  let updatePayload = {
    total_count: count,
    last_updated_at: new Date().toISOString(),
    added_leads: addedLeads > 0 ? addedLeads : null,
  };

  // If new leads were added, generate a fresh UUID
  if (addedLeads > 0) {
    updatePayload.last_update_id = crypto.randomUUID();
  }

  // Update leads_meta
  const { error: updateError } = await supabase
    .from("leads_meta")
    .update(updatePayload)
    .eq("id", metaId);

  if (updateError) {
    return new Response(JSON.stringify({ error: updateError.message }), {
      status: 500,
    });
  }

  return new Response(
    JSON.stringify({
      message: "leads_meta updated",
      total_count: count,
      added_leads: addedLeads,
      last_update_id: updatePayload.last_update_id || "not changed",
    }),
    { status: 200 }
  );
});
