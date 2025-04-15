"use client";
import MotionChildren from "@/components/containers/MotionChildren";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MdDashboard,
  MdLeaderboard,
  MdOutlineAttachMoney,
} from "react-icons/md";
import MotionContainer from "@/components/containers/MotionContainer";

const SideComponent = () => {
  const pathname = usePathname();

  const links = [
    {
      href: "/dashboard/subscription",
      label: "Subscription",
      icon: <MdOutlineAttachMoney />,
    },
    {
      href: "/dashboard/activities",
      label: "Activities",
      icon: <MdDashboard />,
    },
    {
      href: "/dashboard/leads",
      label: "My Leads",
      icon: <MdLeaderboard />,
    },
  ];

  return (
    <MotionContainer
      animation="fade-in"
      className="w-full flex flex-row md:flex-col space-x-3 md:space-x-0 md:space-y-3"
    >
      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <MotionChildren key={link.href} animation="fade-in">
            <Link
              href={link.href}
              className={`w-full center flex-row space-x-2 px-3 py-2 rounded-lg transition-all duration-300 relative ${
                isActive
                  ? "bg-neutral-800 text-white"
                  : "text-neutral-600 bg-neutral-200 hover:bg-neutral-500/20"
              }`}
            >
              <span>{link.icon}</span>
              <span className="font-medium">{link.label}</span>
            </Link>
          </MotionChildren>
        );
      })}
    </MotionContainer>
  );
};

export default SideComponent;
