import FormContainer from "@/components/containers/FormContainer";
import Title from "@/components/Title";
import React from "react";
import PwdStrengthCheck from "../signUpSection/signUp/PwdStrengthCheck";
import Button from "@/components/Button";
import MotionContainer from "@/components/containers/MotionContainer";

const UpdatePasswordForm = ({
  password,
  confirmPassword,
  handleSubmit,
  loading,
}) => {
  return (
    <FormContainer className="w-[90%] max-w-[400px]">
      <MotionContainer animation="zoom-out">
        <Title>Update Password</Title>
      </MotionContainer>
      <form onSubmit={handleSubmit} className="space-y-4 w-full">
        <div>
          <label htmlFor="password">New Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className="mt-1"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <PwdStrengthCheck password={password} />
        </div>

        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            className="mt-1"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <Button
          type="submit"
          text="Updating password"
          loading={loading}
          disabled={loading}
        >
          Update Password
        </Button>
      </form>
    </FormContainer>
  );
};

export default UpdatePasswordForm;
