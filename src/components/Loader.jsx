import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center">
      <l-ring
        size="40"
        stroke="5"
        bg-opacity="0"
        speed="2"
        color="orange"
      ></l-ring>
    </div>
  );
};

export default Loader;
