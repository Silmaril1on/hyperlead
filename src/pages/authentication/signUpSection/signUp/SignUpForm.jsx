"use client";
import Inputs from "./Inputs";
import FormButtons from "./FormButtons";
import { signUp } from "@/lib/actions/authActions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setError } from "@/features/modalSlice";
import { setUser, setLoading } from "@/features/userSlice";
import { validateForm } from "@/helpers/validateForm";

const SignUpForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLocalLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setError(""));
    if (
      !validateForm({ email, password, confirmPassword, dispatch, setError })
    ) {
      return;
    }
    try {
      setLocalLoading(true);
      dispatch(setLoading(true));
      const { error, data } = await signUp({ email, password, userName });
      if (error) {
        dispatch(setError(error));
        return;
      }
      dispatch(setUser(data.user));
      router.push("/preferences");
    } catch (err) {
      dispatch(setError("An unexpected error occurred. Please try again."));
    } finally {
      setLocalLoading(false);
      dispatch(setLoading(false));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <Inputs
        email={email}
        userName={userName}
        password={password}
        confirmPassword={confirmPassword}
        setEmail={setEmail}
        setUserName={setUserName}
        setPassword={setPassword}
        setConfirmPassword={setConfirmPassword}
      />
      <FormButtons loading={loading} />
    </form>
  );
};

export default SignUpForm;
