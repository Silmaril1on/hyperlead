import FlexBox from "@/components/containers/FlexBox";
import ProfileDetails from "./ProfileDetails";
import ProfileHeader from "./ProfileHeader";

const ProfileInformation = ({ profile }) => {
  return (
    <FlexBox type="column" className="mt-20 space-y-3 w-full mb-3">
      <ProfileHeader profile={profile} />

      <ProfileDetails profile={profile} />
    </FlexBox>
  );
};

export default ProfileInformation;
