"use client";
import Button from "@/components/Button";
import { useState } from "react";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  return (
    <form className="space-y-4">
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="userEmail"
          type="email"
          name="email"
          value={email}
          placeholder="Your Email"
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1"
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          value={password}
          placeholder="Enter Your Password"
          autoComplete="new-password"
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mt-1"
        />
      </div>
      <Button
        type="submit"
        text="Logging In"
        loading={loading}
        disable={loading}
      >
        Login
      </Button>
    </form>
  );
};

export default SignInForm;
