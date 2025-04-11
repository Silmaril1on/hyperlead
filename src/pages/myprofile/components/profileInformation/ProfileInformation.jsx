import FlexBox from "@/components/containers/FlexBox";
import Button from "@/components/buttons/Button";
import { useToggleLocal } from "@/hooks/useToggleLocal";
import ProfileDetails from "./ProfileDetails";
import ProfileHeader from "./ProfileHeader";

const ProfileInformation = ({ profile }) => {
  const { isOpen, toggleState } = useToggleLocal(false);

  const openDetails = () => {
    toggleState(!isOpen);
  };

  return (
    <FlexBox type="column" className="mt-20 space-y-3 w-full mb-3">
      <ProfileHeader profile={profile} />
      <Button type="blue" onClick={openDetails}>
        {isOpen ? "Hide profile details" : "Show profile details"}
      </Button>
      <ProfileDetails profile={profile} isOpen={isOpen} />
    </FlexBox>
  );
};

export default ProfileInformation;
