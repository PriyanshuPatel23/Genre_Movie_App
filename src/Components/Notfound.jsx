import React from "react";
import notfound from "../assets/404.jpg";

const Notfound = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-[#1F1E24]">
      <img
        className="w-screen h-screen object-cover"
        src={notfound}
        alt="Loading...."
      />
    </div>
  );
};

export default Notfound;
