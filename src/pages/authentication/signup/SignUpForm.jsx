"use client";
import Button from "@/components/Button";
import Inputs from "./Inputs";
import { signUp } from "@/lib/auth/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { validateForm } from "./validateform";
import { useDispatch } from "react-redux";
import { setError } from "@/features/modalSlice";

const SignUpForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setError(""));
    if (
      !validateForm({ email, password, confirmPassword, dispatch, setError })
    ) {
      return;
    }
    try {
      setLoading(true);
      const { error, data } = await signUp({ email, password });
      if (error) {
        dispatch(setError(error));
        return;
      }
      router.push("/");
      console.log("created successfuly", data);
    } catch (err) {
      dispatch(setError("An unexpected error occurred. Please try again."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Inputs
        email={email}
        password={password}
        confirmPassword={confirmPassword}
        setEmail={setEmail}
        setPassword={setPassword}
        setConfirmPassword={setConfirmPassword}
      />
      <Button
        type="submit"
        text="creating account"
        loading={loading}
        disabled={loading}
      >
        create account
      </Button>
    </form>
  );
};

export default SignUpForm;
