const FlexBox = ({ children, className, type, onClick }) => {
  const getLayout = (animation) => {
    switch (animation) {
      case "row":
        return "flex space-x-1 items-center";
      case "row-2":
        return "flex space-x-2 items-center";
      case "row-3":
        return "flex space-x-3 items-center";
      case "row-5":
        return "flex space-x-5 items-center";
      case "row-end":
        return "flex space-x-1 justify-end items-center";
      case "row-start":
        return "flex space-x-1 justify-start items-center";
      case "row-start-2":
        return "flex space-x-2 justify-start items-center";
      case "row-center":
        return "flex space-x-1 justify-center items-center";
      case "row-between":
        return "flex justify-between items-center";
      case "column":
        return "flex flex-col items-center";
      case "column-1":
        return "flex flex-col space-y-1 items-center";
      case "column-2":
        return "flex flex-col space-y-2 items-center";
      case "column-3":
        return "flex flex-col space-y-3 items-center";
      case "column-5":
        return "flex flex-col space-y-5 items-center";
      case "column-10":
        return "flex flex-col space-y-10 items-center";
      case "column-center":
        return "flex flex-col space-y-2 items-center justify-center";
      case "column-start":
        return "flex flex-col items-start space-y-2";
      case "column-end":
        return "flex flex-col items-end space-y-2";
      default:
        return "flex space-x-1 items-center justify-center";
    }
  };

  return (
    <div onClick={onClick} className={`${className} ${getLayout(type)}`}>
      {children}
    </div>
  );
};

export default FlexBox;
