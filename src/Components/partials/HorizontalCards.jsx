import React from "react";
import { Link } from "react-router-dom";
import noimage from "../../assets/noimage.jpg";

const HorizontalCards = ({ data }) => {
  return (
    <div className="w-[100%] h-[content] flex overflow-y-hidden mb-5 p-8">
      {data.length > 0 ? (
        data.map((d, i) => (
          <Link
            Link
            to={`/${d.media_type || title}/details/${d.id}`}
            key={i}
            className="min-w-[15%] h-[45vh] bg-zinc-900 mr-5 mb-5"
          >
            <img
              className="w-full h-[55%] object-cover"
              src={
                d.backdrop_path || d.poster_path
                  ? `https://image.tmdb.org/t/p/original/${
                      d.backdrop_path || d.poster_path
                    }`
                  : noimage
              }
              alt=""
            />
            <div className="text-white p-3 h-[45%] overflow-y-auto">
              <h1 className="text-xl font-semibold">
                {d.original_title || d.name || d.title || d.original_name}
              </h1>
              <p className="mt-3 mb-3 text-white">
                {d.overview.slice(0, 40)}...
                <span className="text-zinc-400">more</span>
              </p>
            </div>
          </Link>
        ))
      ) : (
        <h1 className="text-3xl text-white font-black text-center mt-5">
          Nothing to Show
        </h1>
      )}
    </div>
  );
};

export default HorizontalCards;
