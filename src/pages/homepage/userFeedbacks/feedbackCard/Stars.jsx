import React from "react";
import { FaStar } from "react-icons/fa";

const Stars = ({ item }) => {
  const renderStars = (rating) => {
    const totalStars = 5;
    return Array.from({ length: totalStars }, (_, index) => (
      <FaStar
        key={index}
        className={`text-lg ${
          index < rating ? "text-yellow-400" : "text-neutral-400"
        }`}
      />
    ));
  };

  return (
    <div className="flex gap-1 items-center mb-2 border-b pb-2 border-neutral-200">
      {renderStars(item.rating)}
    </div>
  );
};

export default Stars;
