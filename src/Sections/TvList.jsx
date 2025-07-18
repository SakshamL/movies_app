import React, { useState, useEffect } from "react";
import { tv_shows } from "../Services/api";
import TVCard from "../Components/TVCard";

const IMGPATH = "https://image.tmdb.org/t/p/w1280";

function TvList() {
  // const [prevpage, setprevpage] = useState(1);
  // const [newPage, setNewPage] = useState(prevpage);

  const newPage = 1;

  const [tv, setTv] = useState([]);

  useEffect(() => {
    getTvShows();
  }, []);

  const getTvShows = async () => {
    const response = await fetch(tv_shows);
    const responseJSON = await response.json();
    setTv(responseJSON.results);
  };

  return (
    <>
      <h2 className="text-white font-bold text-2xl mt-30">Trending TV Shows</h2>
      <div className="grid grid-cols-2 gap-6 mt-10 mb-10 md:grid-cols-4 lg:grid-cols-6 ">
        {tv.slice(0, 14).map((tv) => (
          <div
            key={tv.id}
            className="w-full h-[full  hover:scale-[1.1] transition duration-150"
          >
            <TVCard
              key={tv.id}
              id={tv.id}
              name={tv.name}
              poster_path={
                tv.poster_path === null
                  ? `no-poster.jpg`
                  : IMGPATH + tv.poster_path
              }
              first_air_date={tv.first_air_date}
              vote={tv.vote_average}
            />
          </div>
        ))}
      </div>
      ,
    </>
  );
}

export default TvList;
