"use client";
import { usePathname } from "next/navigation";
import Navigation from "@/layout/navigation/Navigation";

export default function NavigationWrapper() {
  const pathname = usePathname();

  const isAuthRoute =
    pathname?.includes("/(routes)/(auth)") ||
    pathname === "/signup" ||
    pathname === "/signin" ||
    pathname === "/resetpassword" ||
    pathname === "/resetpassword/update" ||
    pathname === "/feedback" ||
    pathname === "/preferences";

  if (isAuthRoute) {
    return null;
  }

  return (
    <>
      <Navigation />
    </>
  );
}
