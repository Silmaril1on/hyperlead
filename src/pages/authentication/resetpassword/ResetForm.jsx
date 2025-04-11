import Button from "@/components/buttons/Button";
import FormContainer from "@/components/containers/FormContainer";
import MotionContainer from "@/components/containers/MotionContainer";
import LinkComponent from "@/components/buttons/LinkComponent";
import Paragraph from "@/components/Paragraph";
import Title from "@/components/Title";
import React from "react";
import { MdLockReset } from "react-icons/md";

const ResetForm = ({ handleSubmit, loading, email, setEmail }) => {
  return (
    <FormContainer className="w-[90%] max-w-[400px]">
      <MotionContainer animation="zoom-out">
        <Title>Reset Password</Title>
      </MotionContainer>
      <form onSubmit={handleSubmit} className="space-y-4 w-full">
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className="mt-1"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <Button
          className="mx-auto"
          type="submit"
          text="Sending reset instructions"
          loading={loading}
          disabled={loading}
        >
          <MdLockReset size={20} />
          <span>Reset Password</span>
        </Button>
      </form>

      <div className="flex space-x-2">
        <Paragraph>Remember your password?</Paragraph>
        <LinkComponent type="blue" href="/signin">
          Sign In
        </LinkComponent>
      </div>
    </FormContainer>
  );
};

export default ResetForm;
