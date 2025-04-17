"use client";
import { useState } from "react";
import MotionContainer from "@/components/containers/MotionContainer";
import { useRouter } from "next/navigation";
import { updateProfile } from "@/lib/actions/profileActions";
import { useSelector } from "react-redux";
import { selectUser, updateUserProfile } from "@/features/userSlice";
import { setError } from "@/features/modalSlice";
import { useDispatch } from "react-redux";
import Header from "./Header";
import Logo from "@/components/Logo";
import ButtonSection from "./ButtonSection";
import PrefList from "./PrefList";

const preferencesData = [
  "marketing & advertising",
  "real estate",
  "coach & consulting",
  "hospitality",
  "e-commerce",
  "wellness & fitness",
  "information technology & services",
];

const PreferencesForm = ({ initialPreferences = [] }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [loading, setLoading] = useState(false);
  const [pref, setPref] = useState(initialPreferences);

  const updatePref = async () => {
    if (pref.length === 0) {
      dispatch(setError("Please select at least one preference"));
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await updateProfile(user.id, {
        preferences: pref,
      });
      if (error) {
        console.error("Update preferences error:", error);
        dispatch(setError(error || "Failed to update preferences"));
        return;
      }
      if (!data) {
        dispatch(setError("No data returned from update"));
        return;
      }
      dispatch(
        setError({
          message: "Preferences updated successfully",
          type: "success",
        })
      );
      dispatch(updateUserProfile({ preferences: pref }));
      router.push("/");
    } catch (error) {
      console.error("Unexpected error in updatePref:", error);
      dispatch(setError("An unexpected error occurred"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <MotionContainer
      animation="fade-in"
      className="h-screen w-full center flex-col space-y-8"
    >
      <Logo />
      <Header />
      <PrefList data={preferencesData} pref={pref} setPref={setPref} />
      <ButtonSection pref={pref} loading={loading} updatePref={updatePref} />
    </MotionContainer>
  );
};

export default PreferencesForm;
