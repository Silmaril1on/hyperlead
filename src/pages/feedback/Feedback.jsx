"use client";
import GradientContainer from "@/components/containers/GradientContainer";
import FormContainer from "@/components/containers/FormContainer";
import Title from "@/components/Title";
import MotionContainer from "@/components/containers/MotionContainer";
import FeedbackForm from "./FeedbackForm";
import { useSelector } from "react-redux";
import { selectUser } from "@/features/userSlice";
import SectionHeadline from "@/components/SectionHeadline";
import Logo from "@/components/Logo";
import FlexBox from "@/components/containers/FlexBox";
import Button from "@/components/buttons/Button";

const Feedback = () => {
  const user = useSelector(selectUser);

  return (
    <section className="h-screen relative center">
      <GradientContainer />
      {user?.email ? (
        <FormContainer className="w-[90%] max-w-[500px] space-y-4">
          <MotionContainer animation="zoom-out">
            <Title>Share Your Feedback</Title>
          </MotionContainer>
          <FeedbackForm />
        </FormContainer>
      ) : (
        <FlexBox type="column-center" className="space-y-6">
          <Logo />
          <SectionHeadline
            title="Join us to share your feedback"
            desc="You need to be signed in to share your feedback and help us improve. Sign in to get started!"
          />
          <FlexBox type="row" className="space-x-4">
            <Button href="/signin" type="blue">
              Sign In
            </Button>
            <Button href="/signup">Sign Up</Button>
          </FlexBox>
        </FlexBox>
      )}
    </section>
  );
};

export default Feedback;
