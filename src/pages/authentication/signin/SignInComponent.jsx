import ZoomOut from "@/components/containers/ZoomOut";
import Title from "@/components/Title";
import SignInForm from "./SignInForm";
import Paragraph from "@/components/Paragraph";
import Link from "next/link";

const SignInComponent = () => {
  return (
    <section className="flex-col z-20 relative h-screen  center bg-[#f8fafc]">
      <div className="absolute inset-0 -z-1 bg-radial-[at_5%_25%] from-amber-100/60 from-5% via-sky-100/30 to-95% to-violet-100" />
      <div className="primary-border center flex-col space-y-5 bg-white px-10 primary-outline">
        <ZoomOut>
          <Title>SIGN IN</Title>
        </ZoomOut>
        <SignInForm />
        <div className="flex space-x-2">
          <Paragraph>Dont have an account? </Paragraph>
          <Link className="text-blue-600 hover:underline" href="/signup">
            Sign Up
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SignInComponent;
