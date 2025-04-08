"use client";
import RegistrationButtons from "@/components/RegistrationButtons";
import { selectUser, selectLoading } from "@/features/userSlice";
import { useSelector } from "react-redux";
import DisplayUserName from "./DisplayUserName";
import Spinner from "@/components/Spinner";

const UserPanel = () => {
  const user = useSelector(selectUser);
  const isLoading = useSelector(selectLoading);

  if (isLoading) {
    return <Spinner />;
  }

  return <div>{user ? <DisplayUserName /> : <RegistrationButtons />}</div>;
};

export default UserPanel;
