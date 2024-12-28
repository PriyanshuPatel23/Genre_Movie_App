import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useParams,
  useNavigate,
  Link,
  useLocation,
  Outlet,
} from "react-router-dom";
import { asyncloadperson, removeperson } from "../store/action/personActions";
import Loading from "./Loading";
import HorizontalCards from "./partials/HorizontalCards";
import Dropdown from "./partials/Dropdown";

const PersonDetails = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { info } = useSelector((state) => state.person);
  const [category, setCategory] = useState("movie");

  useEffect(() => {
    dispatch(asyncloadperson(id));
    return () => {
      dispatch(removeperson());
    };
  }, [id]);
  return info ? (
    <div className="px-[15%] h-[200vh] w-screen bg-[#1F1E24]">
      {/* part 1 */}
      <nav className="h-[10vh] w-full text-zinc-100 flex gap-10 text-2xl">
        <Link
          onClick={() => navigate(-1)}
          className="hover:text-[#6556CD] ri-arrow-left-line"
        ></Link>
      </nav>

      <div className="w-full flex">
        {/* part 2 */}
        <div className="w-[20%]">
          <img
            className="shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)] h-[50vh] object-cover"
            src={`https://image.tmdb.org/t/p/original/${info.detail.profile_path}`}
            alt=""
          />
          <hr className="mt-10 mb-5 border-none h-[2px] bg-zinc-500" />
          {/* part 3 */}
          <div className="text-2xl text-white flex gap-x-5">
            <a
              target="_blank"
              href={`https://www.wikidata.org/wiki/${info.externalids.wikidata_id}`}
            >
              <i className="ri-earth-fill"></i>
            </a>

            <a
              target="_blank"
              href={`https://www.facebook.com/${info.externalids.facebook_id}`}
            >
              <i className="ri-facebook-circle-fill"></i>
            </a>

            <a
              target="_blank"
              href={`https://www.instagram.com/${info.externalids.instagram_id}`}
            >
              <i className="ri-instagram-fill"></i>
            </a>

            <a
              target="_blank"
              href={`https://www.twitter.com/${info.externalids.twitter_id}`}
            >
              <i className="ri-twitter-x-fill"></i>
            </a>
          </div>

          {/* personal info */}
          <h1 className="text-2xl text-zinc-400 font-semibold my-5">
            Person Info
          </h1>
          <h1 className="text-lg text-zinc-400 font-semibold mt-3">
            Known For
          </h1>
          <h1 className="text-zinc-400">{info.detail.known_for_department}</h1>

          <h1 className="text-lg text-zinc-400 font-semibold mt-3">Gender</h1>
          <h1 className="text-zinc-400">
            {info.detail.gender === 2 ? "Male" : "Female"}
          </h1>

          <h1 className="text-lg text-zinc-400 font-semibold mt-3">Birthday</h1>
          <h1 className="text-zinc-400">{info.detail.birthday}</h1>

          <h1 className="text-lg text-zinc-400 font-semibold mt-3">
            Death Day
          </h1>
          <h1 className="text-zinc-400">
            {info.detail.deathday ? info.detail.deathday : "Still Alive"}
          </h1>

          <h1 className="text-lg text-zinc-400 font-semibold mt-3">
            Place of Birth
          </h1>
          <h1 className="text-zinc-400">{info.detail.place_of_birth}</h1>

          <h1 className="text-lg text-zinc-400 font-semibold mt-3">
            Also Known As
          </h1>
          <h1 className="text-zinc-400">
            {info.detail.also_known_as.join(",")}
          </h1>
        </div>

        {/* part 3 */}
        <div className="w-[80%] ml-[5%]">
          <h1 className="text-6xl text-zinc-400 font-black my-5">
            {info.detail.name}
          </h1>
          <h1 className="text-lg text-zinc-400 font-semibold mt-3">
            Biography
          </h1>
          <p className="text-zinc-400 mt-3">{info.detail.biography}</p>

          <h1 className="mt-5 text-lg text-zinc-400 font-semibold">
            Known For
          </h1>
          <HorizontalCards data={info.combinedcredits.cast} />

          <div className="w-full flex justify-between">
            <h1 className="mt-5 text-xl text-zinc-400 font-semibold">Acting</h1>

            <Dropdown
              title={category}
              options={["tv", "movie"]}
              func={(e) => setCategory(e.target.value)}
            />
          </div>

          <div className="list-disc text-zinc-400 w-full h-[50vh] mt-5 overflow-x-hidden overflow-y-auto shadow-2xl shadow-[rgba(255,255,255,0.3)] border-2 border-zinc-700 p-5">
            {info[category + "credits"].cast.map((c, i) => (
              <li
                key={i}
                className="hover:text-white duration-300 cursor-pointer"
              >
                <Link to={`/${category}/details/${c.id}`}>
                  <span>
                    {" "}
                    {c.name || c.title || c.original_name || c.original_title}
                  </span>
                  <span className="block ml-5 mt-3">
                    {c.character && `Character Name : ${c.character}`}
                  </span>
                </Link>
              </li>
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default PersonDetails;