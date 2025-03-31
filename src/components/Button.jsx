const Button = ({ children, onClick, className, icon, type }) => {
  return (
    <button
      onClick={onClick}
      className={`${className} ${
        type === "secondary"
          ? "bg-neutral-100 hover:bg-neutral-200/60 text-black border border-neutral-300 font-semibold"
          : type === "tetriary"
          ? "text-indigo-500 font-normal bg-indigo-300/30 border-indigo-200 text-sm border"
          : "bg-black hover:bg-black/80 text-white font-semibold"
      }  duration-300  cursor-pointer flex items-center space-x-2  rounded-3xl capitalize px-4 py-2`}
    >
      {icon && { icon }}
      {children}
    </button>
  );
};

export default Button;
