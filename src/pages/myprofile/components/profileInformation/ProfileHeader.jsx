import MotionContainer from "@/components/containers/MotionContainer";
import Paragraph from "@/components/Paragraph";
import Title from "@/components/Title";

const ProfileHeader = ({ profile }) => {
  return (
    <>
      <Paragraph>Profile Information</Paragraph>
      <MotionContainer animation="zoom-out">
        <Title className="capitalize">
          {profile?.firstName || profile?.lastName
            ? `${profile?.firstName || ""} ${profile?.lastName || ""}`.trim()
            : "Update your information below"}
        </Title>
      </MotionContainer>
    </>
  );
};

export default ProfileHeader;
