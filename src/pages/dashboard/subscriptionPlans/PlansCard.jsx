import Button from "@/components/buttons/Button";
import FlexBox from "@/components/containers/FlexBox";
import MotionContainer from "@/components/containers/MotionContainer";
import Headline from "@/components/Headline";
import Paragraph from "@/components/Paragraph";
import Title from "@/components/Title";
import { setError } from "@/features/modalSlice";
import { selectUser, setUser } from "@/features/userSlice";
import supabase from "@/lib/config/supabaseClient";
import { assignLeadsToUser } from "@/lib/leadActions/leadActions";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoCaretForwardOutline } from "react-icons/io5";
import MotionChildren from "@/components/containers/MotionChildren";
import { updateProfile } from "@/lib/profileActions/profileActions";

const PlansCard = () => {
  const user = useSelector(selectUser);
  const [loadingPlan, setLoadingPlan] = useState(null);
  const dispatch = useDispatch();

  const handleSubscription = async (plan) => {
    setLoadingPlan(plan);
    try {
      const {
        data: { session },
        error: authError,
      } = await supabase.auth.getSession();
      if (!user?.profile?.preferences?.length) {
        dispatch(
          setError({
            message: "Please set your industry preferences before subscribing",
            type: "error",
            link: "/preferences",
            title: "Go to preferences",
          })
        );
        return;
      }
      const monthlyLeads = plan === "basic" ? 10 : 20;
      const {
        success,
        error: leadError,
        assignedLeadsCount,
      } = await assignLeadsToUser(
        session.user.id,
        user.email,
        user.profile.preferences,
        monthlyLeads,
        true // This is a new subscription
      );
      if (!success) {
        throw new Error(leadError || "Failed to assign leads");
      }
      const currentTotal = user.profile.total_leads_received || 0;
      const currentMonthLeads = user.profile.leads_received_this_month || 0;
      const updates = {
        subscription: plan,
        subscription_timestamp: new Date().toISOString(),
        monthly_leads: monthlyLeads,
        leads_received_this_month: currentMonthLeads + assignedLeadsCount,
        total_leads_received: currentTotal + assignedLeadsCount,
        last_lead_reset_date: new Date().toISOString(),
      };
      const { data, error } = await updateProfile(session.user.id, updates);
      if (error) {
        console.error("Profile update error:", error);
        throw error;
      }
      dispatch(
        setUser({
          ...user,
          profile: {
            ...user.profile,
            ...updates,
          },
        })
      );
      dispatch(
        setError({
          message: `Successfully subscribed to ${plan} plan and received ${assignedLeadsCount} leads!`,
          type: "success",
        })
      );
    } catch (error) {
      console.error("Error in handleSubscription:", error);
      dispatch(
        setError({
          message: error.message || "Failed to update subscription",
        })
      );
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <FlexBox type="column-start" className="p-3 space-y-5">
      <MotionContainer animation="zoom-out">
        <Headline>Choose Your Plan</Headline>
      </MotionContainer>
      <MotionContainer
        animation="fade-in"
        className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full"
      >
        <MotionChildren
          animation="fade-in"
          className="lead-container-style space-y-3"
        >
          <Title>Basic Plan</Title>
          <Paragraph>10 leads per month</Paragraph>
          <Button
            onClick={() => handleSubscription("basic")}
            loading={loadingPlan === "basic"}
          >
            <span>Subscribe to Basic</span>
            <IoCaretForwardOutline size={23} />
          </Button>
        </MotionChildren>
        <MotionChildren
          animation="fade-in"
          className="lead-container-style space-y-3"
        >
          <Title>Pro Plan</Title>
          <Paragraph>20 leads per month</Paragraph>
          <Button
            onClick={() => handleSubscription("pro")}
            loading={loadingPlan === "pro"}
          >
            <span> Subscribe to Pro</span>
            <IoCaretForwardOutline size={23} />
          </Button>
        </MotionChildren>
      </MotionContainer>
    </FlexBox>
  );
};

export default PlansCard;
