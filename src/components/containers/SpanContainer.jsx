const SpanContainer = ({ children, className, color = "light" }) => {
  const colorClasses = {
    blue: "blue-style",
    green: "green-style",
    light: "light-style",
    gold: "gold-style",
    purple: "purple-style",
    red: "red-style",
  };

  const containerColor = colorClasses[color] || colorClasses.light;

  return (
    <div
      className={`${containerColor} ${className} border text-center flex items-center justify-center rounded-full px-3 py-1 text-[12px] capitalize`}
    >
      {children}
    </div>
  );
};

export default SpanContainer;
