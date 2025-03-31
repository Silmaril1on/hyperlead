import { IoMdCheckmark } from "react-icons/io";

const Benefits = ({ item }) => {
  return (
    <div>
      {item.benefits.map((item, index) => {
        return (
          <div
            className="flex items-center space-x-3 pl-3 my-2 md:my-4"
            key={index}
          >
            <IoMdCheckmark className="text-green-500" size={20} />
            <span className="text-sm md:text-base">{item}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Benefits;
