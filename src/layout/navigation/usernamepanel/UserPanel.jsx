"use client";
import RegistrationButtons from "@/components/RegistrationButtons";
import { selectUser } from "@/features/userSlice";
import { useSelector } from "react-redux";
import DisplayUserName from "./DisplayUserName";

const UserPanel = () => {
  const user = useSelector(selectUser);

  return (
    <div>
      {user ? (
        <DisplayUserName />
      ) : (
        <div className="hidden md:flex">
          <RegistrationButtons />
        </div>
      )}
    </div>
  );
};

export default UserPanel;
