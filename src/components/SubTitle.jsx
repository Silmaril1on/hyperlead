const SubTitle = ({ children, className }) => {
  return (
    <h1 className={` text-base md:text-xl font-semibold ${className}`}>
      {children}
    </h1>
  );
};

export default SubTitle;
