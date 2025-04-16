"use client";
import MotionChildren from "@/components/containers/MotionChildren";
import MotionContainer from "@/components/containers/MotionContainer";
import Button from "@/components/buttons/Button";
import { signOut } from "@/lib/actions/authActions";
import { AnimatePresence } from "framer-motion";
import { FaUser } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { MdDashboard, MdBusinessCenter } from "react-icons/md";
import { useDispatch } from "react-redux";
import { clearUser } from "@/features/userSlice";
import { useRouter } from "next/navigation";
import { setError } from "@/features/modalSlice";

const ProfileSettings = ({ isOpen, handleActive }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      const { error } = await signOut();
      if (error) {
        dispatch(setError(error));
        return;
      }
      dispatch(clearUser());
      router.push("/");
      if (handleActive) {
        handleActive();
      }
    } catch (error) {
      console.error("Error signing out:", error);
      dispatch(setError("Failed to sign out. Please try again."));
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <MotionContainer
          animation="bottom"
          className="absolute z-10 top-12 right-0 w-44 primary-border space-y-1 bg-white border shadow *:flex *:justify-end"
        >
          <MotionChildren animation="fade-in" onClick={handleActive}>
            <Button href="/myprofile">
              <span>My profile</span>
              <FaUser />
            </Button>
          </MotionChildren>
          <MotionChildren animation="fade-in" onClick={handleActive}>
            <Button href="/dashboard/activities">
              <span>dashboard</span>
              <MdDashboard />
            </Button>
          </MotionChildren>
          <MotionChildren animation="fade-in" onClick={handleActive}>
            <Button href="/preferences">
              <span>Preferences</span>
              <MdBusinessCenter />
            </Button>
          </MotionChildren>
          <MotionChildren animation="fade-in">
            <Button onClick={handleSignOut} type="light">
              <IoIosLogOut />
              <span>logout</span>
            </Button>
          </MotionChildren>
        </MotionContainer>
      )}
    </AnimatePresence>
  );
};

export default ProfileSettings;
