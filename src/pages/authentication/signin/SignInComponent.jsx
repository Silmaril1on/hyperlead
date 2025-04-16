import Title from "@/components/Title";
import SignInForm from "./SignInForm";
import Paragraph from "@/components/Paragraph";
import FormContainer from "@/components/containers/FormContainer";
import MotionContainer from "@/components/containers/MotionContainer";
import FlexBox from "@/components/containers/FlexBox";
import Link from "next/link";

const SignInComponent = () => {
  return (
    <>
      <div className="h-screen center w-full ">
        <FormContainer className="w-[90%] max-w-[400px] space-y-1">
          <MotionContainer animation="zoom-out">
            <Title>SIGN IN</Title>
          </MotionContainer>
          <SignInForm />
          <FlexBox type="row">
            <Paragraph>Don't have an account? </Paragraph>
            <Link className="text-blue-500 hover:underline" href="/signup">
              Sign Up
            </Link>
          </FlexBox>
        </FormContainer>
      </div>
    </>
  );
};

export default SignInComponent;
