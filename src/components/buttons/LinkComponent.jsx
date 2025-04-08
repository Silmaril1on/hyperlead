import Link from "next/link";

const LinkComponent = ({ href, children, type, className, icon }) => {
  return (
    <Link
      className={`${
        type === "blue"
          ? "text-blue-500 hover:text-blue-700 hover:underline font-normal"
          : "text-zinc-700 hover:text-black font-medium"
      } duration-300 row capitalize ${className}`}
      href={href}
    >
      {icon && icon}
      {children}
    </Link>
  );
};

export default LinkComponent;
