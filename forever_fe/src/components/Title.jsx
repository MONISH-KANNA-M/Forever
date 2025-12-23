import React from "react";

const Title = ({ title1, title2 }) => {
  return (
    <div className="text-center mb-8">
      <h2 className="text-2xl font-bold mb-2">
        <span className="text-gray-600">{title1}</span>{" "}
        <span className="text-black">{title2}</span>
      </h2>
    </div>
  );
};

export default Title; 