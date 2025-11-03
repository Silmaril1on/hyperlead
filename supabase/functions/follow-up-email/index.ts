import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req) => {
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL"),
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")
  );
  // Get the Resend API key from environment
  const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
  if (!RESEND_API_KEY) {
    return new Response(
      JSON.stringify({ error: "Missing RESEND_API_KEY in environment." }),
      { status: 500 }
    );
  }
  const { data: emails, error } = await supabase
    .from("emails")
    .select("*")
    .eq("follow_up", true)
    .is("opened_at", null)
    .lt("sent_at", new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString());
  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }

  let sentCount = 0;
  for (const email of emails) {
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Hyperlead <contact@hyperlead.net>",
        to: email.leads_email,
        subject: `Follow-up of: ${email.subject}`,
        html: `This is a follow-up email to the original email: ${email.message}`,
      }),
    });
    if (!resendResponse.ok) {
      console.error(`Failed to resend email ${email.id}`);
      continue;
    }
    const { error: updateError } = await supabase
      .from("emails")
      .update({
        sent_at: new Date().toISOString(),
        follow_up: false,
        follow_up_email: true,
      })
      .eq("id", email.id);

    if (!updateError) {
      sentCount++;
    }
  }
  return new Response(
    JSON.stringify({ message: `Processed ${sentCount} follow-up emails.` }),
    { status: 200 }
  );
});
