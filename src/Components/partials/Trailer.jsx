import React from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, Link } from "react-router-dom";
import Notfound from "../Notfound";

const Trailer = () => {
  const { pathname } = useLocation();
  const category = pathname.includes("movie") ? "movie" : "tv";
  console.log(category);

  const ytvideo = useSelector(
    (state) => state[category].info.videos.results || []
  );
  const video = ytvideo.find((vid) => vid.type === "Trailer");

  const navigate = useNavigate();

  return (
    <div className="absolute w-screen h-[160vh] flex items-center justify-center top-0 left-0 z-[100] bg-[rgba(0,0,0,0.9)]">
      <Link
        onClick={() => navigate(-1)}
        className="absolute text-3xl text-white right-[5%] top-[5%] hover:text-[#6556CD] ri-close-fill"
      ></Link>

      {video ? (
        <ReactPlayer
          controls
          height={800}
          width={1500}
          url={`https://www.youtube.com/watch?v=${video.key}`}
        />
      ) : (
        <Notfound />
      )}
    </div>
  );
};

export default Trailer;
