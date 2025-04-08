import Paragraph from "@/components/Paragraph";
import Title from "@/components/Title";
import SignUpForm from "./SignUpForm";
import LinkComponent from "@/components/buttons/LinkComponent";
import FormContainer from "@/components/containers/FormContainer";
import MotionContainer from "@/components/containers/MotionContainer";

const SignUpComponent = () => {
  return (
    <>
      <FormContainer className="w-[90%] max-w-[400px]">
        <MotionContainer animation="zoom-out">
          <Title>SIGN UP</Title>
        </MotionContainer>
        <SignUpForm />
        <div className="flex space-x-2">
          <Paragraph>Already have an account?</Paragraph>
          <LinkComponent type="blue" href="/signin">
            Login
          </LinkComponent>
        </div>
      </FormContainer>
    </>
  );
};

export default SignUpComponent;
