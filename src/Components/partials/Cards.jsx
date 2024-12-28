import React from "react";
import { Link } from "react-router-dom";
import noimage from "../../assets/noimage.jpg";

const Cards = ({ data, title }) => {
  console.log(data);

  return (
    <div className="flex flex-wrap w-full px-[5%] bg-[#1F1E24]">
      {data.map((c, i) => (
        <Link
          to={`/${data.media_type || title}/details/${c.id}`}
          className="relative w-[25vh] mr-[5%] mb-[5%]"
          key={i}
        >
          <img
            className="shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)] w-[40vh] h-[30vh] object-cover"
            src={
              c.backdrop_path || c.profile_path || c.poster_path
                ? `https://image.tmdb.org/t/p/original/${
                    c.backdrop_path || c.profile_path || c.poster_path
                  }`
                : noimage
            }
            alt=""
          />
          <h1 className="text-2xl text-zinc-400 mt-3 font-semibold">
            {c.name || c.title || c.original_name || c.original_title}
          </h1>

          {c.vote_average && (
            <div className="absolute rounded-full text-xl font-semibold right-[-10%] bottom-[25%] bg-yellow-600 text-white w-[5vh] h-[5vh] flex justify-center items-center">
              {(c.vote_average * 10).toFixed()} <sup>%</sup>
            </div>
          )}
        </Link>
      ))}
    </div>
  );
};

export default Cards;
