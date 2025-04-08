"use client";
import { useSelector } from "react-redux";
import Title from "@/components/Title";
import SignInForm from "./SignInForm";
import Paragraph from "@/components/Paragraph";
import ErrorMsg from "@/components/ErrorMsg";
import LinkComponent from "@/components/buttons/LinkComponent";
import FormContainer from "@/components/containers/FormContainer";
import MotionContainer from "@/components/containers/MotionContainer";

const SignInComponent = () => {
  const { error } = useSelector((store) => store.modal);
  return (
    <>
      <ErrorMsg error={error}>{error}</ErrorMsg>
      <div className="h-screen center w-full">
        <FormContainer className="w-[90%] max-w-[400px]">
          <MotionContainer animation="zoom-out">
            <Title>SIGN IN</Title>
          </MotionContainer>
          <SignInForm />
          <div className="flex space-x-2">
            <Paragraph>Dont have an account? </Paragraph>
            <LinkComponent type="blue" href="/signup">
              Sign Up
            </LinkComponent>
          </div>
        </FormContainer>
      </div>
    </>
  );
};

export default SignInComponent;
