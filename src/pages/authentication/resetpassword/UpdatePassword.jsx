"use client";
import ZoomOut from "@/components/containers/ZoomOut";
import Title from "@/components/Title";
import Button from "@/components/Button";
import ErrorMsg from "@/components/ErrorMsg";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setError } from "@/features/modalSlice";
import { updatePassword } from "@/lib/authActions/authActions";
import { useRouter } from "next/navigation";
import PwdStrengthCheck from "../signup/PwdStrengthCheck";
import { validatePassword } from "@/helpers/validatePwd";
import FormContainer from "@/components/containers/FormContainer";
import ResetError from "./ResetError";
import UpdatePasswordForm from "./UpdatePasswordForm";

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { error } = useSelector((store) => store.modal);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!validatePassword({ password, confirmPassword, dispatch, setError })) {
      setLoading(false);
      return;
    }
    try {
      const { error, message } = await updatePassword(password);
      if (error) {
        dispatch(setError(error));
      } else {
        dispatch(setError(message));
        setSuccess(true);
        router.push("/signin");
      }
    } catch (error) {
      dispatch(setError("An unexpected error occurred."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ResetError error={error} success={success} />
      <UpdatePasswordForm
        loading={loading}
        password={password}
        confirmPassword={confirmPassword}
        handleSubmit={handleSubmit}
        setConfirmPassword={setConfirmPassword}
        setPassword={setPassword}
      />
    </>
  );
};

export default UpdatePassword;
