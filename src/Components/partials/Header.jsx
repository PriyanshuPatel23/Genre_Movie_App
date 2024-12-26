import React from "react";
import { Link } from "react-router-dom";

const Header = ({ data }) => {
  return (
    <div
      className="w-full h-[50vh] flex flex-col justify-end items-start p-[5%]"
      style={{
        background: `linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.9)),url(https://image.tmdb.org/t/p/original/${
          data.backdrop_path || data.profile_path
        })`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      <h1 className="w-[70%] text-5xl font-black text-white">
        {data.original_title || data.name || data.title || data.original_name}
      </h1>
      <p className="w-[70%] mt-3 text-white">
        {data.overview.slice(0,200)}...
        <Link className="text-blue-400">more</Link>
      </p>
      <p className="text-white">
        <i className="ri-megaphone-fill text-yellow-500"></i>{" "} {data.release_date || "No Information"}
        <i className="ml-5 text-yellow-500 ri-album-fill"></i>{" "} {data.media_type.toUpperCase()}
      </p>
      <Link className="mt-5 bg-[#6556CD] p-4 rounded text-white font-semibold">
      {" "}
      Watch Trailer
      </Link>
    </div>
  );
};

export default Header;
