import MotionChildren from "@/components/containers/MotionChildren";
import MotionContainer from "@/components/containers/MotionContainer";
import LinkComponent from "@/components/buttons/LinkComponent";
import Button from "@/components/buttons/Button";
import { signOut } from "@/lib/authActions/authActions";
import { AnimatePresence } from "framer-motion";
import { FaUser } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { MdDashboard } from "react-icons/md";

const ProfileSettings = ({ isOpen, handleActive }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <MotionContainer
          animation="bottom"
          className="absolute z-10 top-12 right-0 w-44 primary-border space-y-1 bg-white border shadow *:flex *:justify-end"
        >
          <MotionChildren animation="zoom-out" onClick={handleActive}>
            <LinkComponent href="/myprofile">
              <span>My profile</span>
              <FaUser />
            </LinkComponent>
          </MotionChildren>
          <MotionChildren animation="zoom-out">
            <LinkComponent href="/myprofile">
              <span>dashboard</span>
              <MdDashboard />
            </LinkComponent>
          </MotionChildren>
          <MotionChildren onClick={signOut} animation="zoom-out">
            <Button type="light">
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
