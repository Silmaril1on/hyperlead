import FlexBox from "@/components/containers/FlexBox";
import MotionContainer from "@/components/containers/MotionContainer";
import SubTitle from "@/components/SubTitle";
import { AnimatePresence } from "framer-motion";

const ProfileDetails = ({ profile, isOpen }) => {
  const renderProfileField = (label, value) => {
    if (!value) return null;
    return (
      <FlexBox type="row-start">
        <span>{label}:</span>
        <SubTitle>{value}</SubTitle>
      </FlexBox>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <MotionContainer
          type="bottom"
          className="*:pb-2 [&_span]:text-neutral-400 [&_span]:italic [&_span]:capitalize [&_span]:w-18 [&_span]:text-start [&_span]:mr-4 *:border-b *:border-neutral-200  my-6 w-full grid grid-cols-3 gap-6"
        >
          {renderProfileField("Country", profile?.country)}
          {renderProfileField("City", profile?.city)}
          {renderProfileField("Phone", profile?.phone)}
          {renderProfileField("Date", profile?.userBirthDate)}
          {renderProfileField("Sex", profile?.sex)}
          {renderProfileField("Company", profile?.company)}
          {renderProfileField("Address", profile?.address)}
        </MotionContainer>
      )}
    </AnimatePresence>
  );
};

export default ProfileDetails;
