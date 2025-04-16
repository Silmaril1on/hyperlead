import Paragraph from "@/components/Paragraph";
import Title from "@/components/Title";
import SignUpForm from "./signUp/SignUpForm";
import FormContainer from "@/components/containers/FormContainer";
import MotionContainer from "@/components/containers/MotionContainer";
import FlexBox from "@/components/containers/FlexBox";
import Button from "@/components/buttons/Button";
import Link from "next/link";

const SignUpComponent = () => {
  return (
    <div className="h-screen center">
      <FormContainer className="w-[90%] max-w-[500px] space-y-2">
        <MotionContainer animation="zoom-out">
          <Title>SIGN UP</Title>
        </MotionContainer>
        <SignUpForm />
        <FlexBox type="row">
          <Paragraph>Already have an account?</Paragraph>
          <Link className="text-blue-500 hover:underline" href="/signin">
            Login
          </Link>
        </FlexBox>
      </FormContainer>
    </div>
  );
};

export default SignUpComponent;
