import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../utils/axios";
import noimage from "../../assets/noimage.jpg";

const Topnav = () => {
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState([]);

  const getSearches = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      setSearch(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSearches();
  }, [query]);
  return (
    <>
      <div className="h-[10vh] relative flex justify-start ml-[15%] items-center">
        <i className="text-zinc-400 text-3xl ri-search-line"></i>
        <input
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          className="min-w-[50%] text-zinc-200 p-5 text-xl outline-none border-none bg-transparent"
          type="text"
          placeholder="Search here "
        />
        {query.length > 0 && (
          <i
            onClick={() => setQuery("")}
            className="text-zinc-400 text-3xl ri-close-fill"
          ></i>
        )}

        <div className="z-[100] absolute min-w-[50%] max-h-[50vh] bg-zinc-200 top-[99%] overflow-auto">
          {search.map((s, i) => (
            <Link
              to={`/${s.media_type || title}/details/${s.id}`}
              key={i}
              className="hover:text-black hover:bg-zinc-300 font-semibold text-zinc-600 duration-300 w-[100%] p-10 flex justify-start items-center border-b-2 border-zinc-100"
            >
              <img
                className="w-[10vh] h-[10vh] object-cover rounded mr-5 shadow"
                src={
                  s.backdrop_path || s.profile_path
                    ? `https://image.tmdb.org/t/p/original/${
                        s.backdrop_path || s.profile_path
                      }`
                    : noimage
                }
                alt=""
              />
              <span>
                {s.original_title || s.name || s.title || s.original_name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Topnav;
