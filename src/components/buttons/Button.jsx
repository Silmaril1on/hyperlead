"use client";
import Link from "next/link";
import FlexBox from "../containers/FlexBox";
import Spinner from "../Spinner";
import { IoIosArrowBack } from "react-icons/io";

const Button = ({
  children,
  onClick,
  className,
  icon,
  type,
  loading,
  text,
  href,
}) => {
  return (
    <button
      onClick={onClick}
      className={`${className} ${
        type === "light"
          ? "light-style "
          : type === "blue"
          ? "blue-style text-sm"
          : "black-style"
      } text-sm cursor-pointer border font-semibold flex items-center space-x-2 rounded-3xl capitalize px-4 py-2`}
    >
      {loading ? (
        <FlexBox type="row-1">
          <span>{text}</span>
          <Spinner />
        </FlexBox>
      ) : (
        <>
          {href ? (
            href === "back" ? (
              <FlexBox type="row" onClick={() => window.history.back()}>
                <IoIosArrowBack size={20} />
                <span>Back</span>
              </FlexBox>
            ) : (
              <Link href={href} className="flex items-center space-x-2">
                {icon && icon}
                {children}
              </Link>
            )
          ) : (
            <>
              {icon && icon}
              {children}
            </>
          )}
        </>
      )}
    </button>
  );
};

export default Button;
