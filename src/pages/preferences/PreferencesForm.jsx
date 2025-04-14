"use client";
import { useState } from "react";
import MotionContainer from "@/components/containers/MotionContainer";
import { useRouter } from "next/navigation";
import { updateProfile } from "@/lib/profileActions/profileActions";
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
  "retail",
  "design",
  "hr",
  "finance",
  "legal",
  "customer success",
  "product",
  "other",
];

const PreferencesForm = ({ initialPreferences = [] }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [loading, setLoading] = useState(false);
  const [pref, setPref] = useState(initialPreferences);

  const updatePref = async () => {
    if (pref.length !== 3) {
      dispatch(setError("Please select exactly 3 preferences"));
      return;
    }
    setLoading(true);
    try {
      const { error } = await updateProfile(user.id, {
        preferences: pref,
      });
      if (error) {
        dispatch(
          setError({ message: "You choose your preferences", type: "success" })
        );
        return;
      }
      dispatch(updateUserProfile({ preferences: pref }));
      router.push("/");
    } catch (error) {
      dispatch(setError("Failed to update preferences"));
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
