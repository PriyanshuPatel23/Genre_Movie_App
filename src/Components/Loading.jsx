import React from "react";
import Loader from "../assets/loader.svg";

const Loading = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-[#1F1E24]">
      <img className="w-[50%] h-[50%]" src={Loader} alt="Loading...." />
    </div>
  );
};

export default Loading;
