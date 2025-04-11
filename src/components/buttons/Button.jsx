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
          ? "bg-neutral-100 hover:bg-neutral-200/60 text-black border border-neutral-300 font-semibold"
          : type === "blue"
          ? "text-indigo-500 font-medium bg-indigo-300/20 border-indigo-200 text-sm border"
          : "bg-black hover:bg-black/80 text-white font-semibold"
      }  duration-300 text-sm cursor-pointer flex items-center space-x-2 rounded-3xl capitalize px-4 py-2`}
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
