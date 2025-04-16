"use client";
import { selectUser } from "@/features/userSlice";
import { useSelector } from "react-redux";
import Plans from "./pricing/Plans";
import Notice from "./plansNotice/Notice";

const Subscription = () => {
  const user = useSelector(selectUser);
  const plan = user?.profile?.subscription;

  return <div className="h-screen">{plan ? <Notice /> : <Plans />}</div>;
};

export default Subscription;
