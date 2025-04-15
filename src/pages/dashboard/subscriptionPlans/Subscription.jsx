"use client";
import { selectUser } from "@/features/userSlice";
import { useSelector } from "react-redux";

import PlansCard from "./PlansCard";

const Subscription = () => {
  const user = useSelector(selectUser);
  const profile = user?.profile;

  const test = false;

  return (
    <div className="h-screen">
      {test ? <h1>hello world</h1> : <PlansCard />}
    </div>
  );
};

export default Subscription;
