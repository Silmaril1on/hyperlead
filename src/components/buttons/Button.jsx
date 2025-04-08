import Spinner from "../Spinner";

const Button = ({
  children,
  onClick,
  className,
  icon,
  type,
  loading,
  text,
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
      }  duration-300 cursor-pointer flex items-center space-x-2 rounded-3xl capitalize px-4 py-2`}
    >
      {loading ? (
        <div className="space-x-2 flex items-center">
          <span>{text}</span>
          <Spinner />
        </div>
      ) : (
        <>
          {icon && icon}
          {children}
        </>
      )}
    </button>
  );
};

export default Button;
