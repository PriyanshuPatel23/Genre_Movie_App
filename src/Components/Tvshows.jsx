import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "./partials/Topnav";
import Dropdown from "./partials/Dropdown";
import { useState } from "react";
import axios from "../utils/axios";
import Cards from "./partials/Cards";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";

const tvShowss = () => {
    
  const [duration, setDuration] = useState("day");
  const [tvShows, settvShowss] = useState([]);
  const [category, setCategory] = useState("airing_today");
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  document.title = "GENRE || tvShows " + category.toUpperCase();

  const getTvShows = async () => {
    try {
      const { data } = await axios.get(`/tv/${category}?page=${page}`);
      if (data.results.length > 0) {
        settvShowss((prevState) => [...prevState, ...data.results]);
        setPage(page + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const refreshHandler = () => {
    if (tvShows.length === 0) {
      getTvShows();
    } else {
      setPage(1);
      settvShowss([]);
      getTvShows();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category, duration]);

  return tvShows ? (
    <div className="w-screen h-screen">
      <div className="px-[5%] w-full flex items-center justify-between">
        <h1 className="text-2xl text-zinc-400 font-semibold">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] ri-arrow-left-line"
          ></i>{" "}
          tvShows{" "}
          <small className="ml-2 text-sm text-zinc-600">({category})</small>
        </h1>
        <div className="flex items-center w-[80%] gap-2">
          <Topnav />
          <Dropdown
            title="Category"
            options={["on_the_air", "popular", "top_rated", "airing_today"]}
            func={(e) => setCategory(e.target.value)}
          />
          <div className="w-[2%]"></div>
          <Dropdown
            title="Duration"
            options={["week", "day"]}
            func={(e) => setDuration(e.target.value)}
          />
        </div>
      </div>

      <InfiniteScroll
        dataLength={tvShows.length}
        next={getTvShows}
        hasMore={true}
        loader={<Loading />}
      >
        <Cards data={tvShows} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default tvShowss;
