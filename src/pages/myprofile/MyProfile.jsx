"use client";
import ProfileAvatar from "./components/profileImages/ProfileAvatar";
import ProfileInformation from "./components/profileInformation/ProfileInformation";
import FormContainer from "@/components/containers/FormContainer";
import { useToggleLocal } from "@/hooks/useToggleLocal";
import BackgroundWallpaper from "./components/profileImages/BackgroundWallpaper";
import GoldGradient from "@/components/containers/GradientContainer";
import Button from "@/components/buttons/Button";
import FlexBox from "@/components/containers/FlexBox";
import UpdateProfile from "./components/updateProfile/UpdateProfile";
import { AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { memo, useCallback } from "react";
import { selectUser } from "@/features/userSlice";

const MyProfile = memo(({ data }) => {
  const { isOpen, toggleState } = useToggleLocal(false);
  const user = useSelector(selectUser);
  const profile = user?.profile || data;

  const openForm = useCallback(() => {
    toggleState(true);
  }, [toggleState]);

  return (
    <FlexBox type="column-10" className="relative py-10">
      <GoldGradient />
      <FormContainer className="w-[90%]">
        <BackgroundWallpaper profile={data} />
        <FlexBox type="column" className="w-full relative">
          <ProfileAvatar profile={data} userId={data?.id} />
          <ProfileInformation profile={profile} />
          <Button type="blue" className="px-6" onClick={openForm}>
            Update my profile
          </Button>
        </FlexBox>
      </FormContainer>
      <AnimatePresence>{isOpen && <UpdateProfile />}</AnimatePresence>
    </FlexBox>
  );
});

MyProfile.displayName = "MyProfile";

export default MyProfile;
