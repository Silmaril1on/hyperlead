import { createServerClient } from "@/lib/config/supabaseServer";
import Activities from "@/pages/dashboard/activities/Activities";

export const metadata = {
  title: "Hyperlead | Dashboard",
  description: "User Dashboard",
};

const getProfile = async () => {
  const supabase = await createServerClient();

  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();
  if (sessionError) {
    return null;
  }
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select(
      "subscription, monthly_leads, leads_received_this_month, total_leads_received"
    )
    .eq("id", session.user.id)
    .single();

  if (profileError) {
    return null;
  }

  return profile;
};

const ActivitiesPage = async () => {
  const profile = await getProfile();
  return <Activities profile={profile} />;
};

export default ActivitiesPage;
