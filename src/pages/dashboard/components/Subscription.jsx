"use client";
import { useState } from "react";
import { updateProfile } from "@/lib/profileActions/profileActions";
import { useDispatch } from "react-redux";
import { setUser } from "@/features/userSlice";
import Button from "@/components/buttons/Button";
import { selectUser } from "@/features/userSlice";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const Subscription = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const handleSubscription = async (plan) => {
    setLoading(true);
    try {
      const updates = {
        subscription: plan,
        subscription_timestamp: new Date().toISOString(),
        monthly_leads: plan === "basic" ? 10 : 20,
        leads_received_this_month: 0,
        last_lead_reset_date: new Date().toISOString(),
      };

      const { data, error } = await updateProfile(user.id, updates);

      if (error) throw error;

      // Update the user in Redux store
      dispatch(
        setUser({
          ...user,
          profile: {
            ...user.profile,
            ...updates,
          },
        })
      );
    } catch (error) {
      console.error("Error updating subscription:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderSubscriptionInfo = () => {
    if (!user?.profile?.subscription) {
      return (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Choose Your Plan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="border rounded-lg p-4 space-y-4"
            >
              <h3 className="text-lg font-medium">Basic Plan</h3>
              <p className="text-neutral-600">10 leads per month</p>
              <Button
                onClick={() => handleSubscription("basic")}
                loading={loading}
                disabled={loading}
              >
                Subscribe to Basic
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="border rounded-lg p-4 space-y-4"
            >
              <h3 className="text-lg font-medium">Pro Plan</h3>
              <p className="text-neutral-600">20 leads per month</p>
              <Button
                onClick={() => handleSubscription("pro")}
                loading={loading}
                disabled={loading}
              >
                Subscribe to Pro
              </Button>
            </motion.div>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Your Subscription</h2>
        <div className="border rounded-lg p-4 space-y-2">
          <p>
            <span className="font-medium">Plan:</span>{" "}
            {user.profile.subscription}
          </p>
          <p>
            <span className="font-medium">Monthly Leads:</span>{" "}
            {user.profile.monthly_leads}
          </p>
          <p>
            <span className="font-medium">Leads Received This Month:</span>{" "}
            {user.profile.leads_received_this_month}
          </p>
          <p>
            <span className="font-medium">Total Leads Received:</span>{" "}
            {user.profile.total_leads_received}
          </p>
          <p>
            <span className="font-medium">Subscription Started:</span>{" "}
            {new Date(user.profile.subscription_timestamp).toLocaleDateString()}
          </p>
        </div>
      </div>
    );
  };

  return <div className="p-4">{renderSubscriptionInfo()}</div>;
};

export default Subscription;
