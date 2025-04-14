"use client";
import Button from "@/components/buttons/Button";
import LinkComponent from "@/components/buttons/LinkComponent";
import { setError } from "@/features/modalSlice";
import { signIn } from "@/lib/authActions/authActions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { IoMdLogIn } from "react-icons/io";

const SignInForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { error } = await signIn({ email, password });
      if (error) {
        console.error("Login Error:", error);
        dispatch(setError(error));
        setLoading(false);
        return;
      }
      router.push("/");
    } catch (error) {
      console.error("Unexpected Error:", error);
      dispatch(setError("Something went wrong. Please try again later."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4 w-full">
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="userEmail"
          type="email"
          name="email"
          className="mt-1"
          placeholder="Your Email"
          autoComplete="false"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          placeholder="Enter Your Password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mt-1"
        />
        <LinkComponent
          className="text-[12px]"
          type="blue"
          href="/resetpassword"
        >
          Forgot Password?
        </LinkComponent>
      </div>
      <Button
        className="mx-auto"
        type="submit"
        text="Logging In"
        loading={loading}
        disable={loading}
      >
        <IoMdLogIn size={20} />
        <span>Login</span>
      </Button>
    </form>
  );
};

export default SignInForm;
