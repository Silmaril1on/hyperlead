"use client";
import Paragraph from "@/components/Paragraph";
import Title from "@/components/Title";
import Link from "next/link";
import SignUpForm from "./SignUpForm";
import ZoomOut from "@/components/containers/ZoomOut";
import ErrorMsg from "@/components/ErrorMsg";
import { useSelector } from "react-redux";

const SignUpComponent = () => {
  const { error } = useSelector((store) => store.modal);
  return (
    <section className="flex-col z-20 relative h-screen center bg-[#f8fafc]">
      <div className="absolute top-5 right-5">
        <ErrorMsg error={error}>{error}</ErrorMsg>
      </div>
      <div className="absolute inset-0 -z-1 bg-radial-[at_5%_25%] from-amber-100/60 from-5% via-sky-100/30 to-95% to-violet-100" />
      <div className="primary-border center flex-col space-y-5 bg-white px-10  primary-outline">
        <ZoomOut>
          <Title>SIGN UP</Title>
        </ZoomOut>
        <SignUpForm />
        <div className="flex space-x-2">
          <Paragraph>Already have an account?</Paragraph>
          <Link className="text-blue-600 hover:underline" href="/signin">
            Login
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SignUpComponent;
