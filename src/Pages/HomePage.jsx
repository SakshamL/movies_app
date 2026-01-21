import React from "react";
import { useEffect, useState } from "react";
import SearchBar from "../Components/SearchBar";
import MoviesList from "../Sections/MoviesList";
import TvList from "../Sections/TvList";
import GetFeaturedMovies from "../Services/getFeaturedMovies";
// import MovieStreamer from "./testplyaer";

function HomePage() {
  useEffect(() => {
    // Clear movie-specific session data whenever Home is visited
    sessionStorage.removeItem("genre");
    sessionStorage.removeItem("year");
    sessionStorage.removeItem("page");
    sessionStorage.removeItem("genre-hi");
    console.log("Movie filters cleared for fresh navigation");
  }, []);
  return (
    <>
      <title>{"WatchAll Media"}</title>
      <div className=" text-white flex flex-col items-center mt-10">
        <SearchBar />
      </div>

      <div className="mt-10 ">
        {/* <h2 className="text-white text-2xl font-bold mb-5">Featured Movies</h2> */}
        <GetFeaturedMovies />

        <MoviesList />
        <TvList />
      </div>
      {/* TV Shows */}
    </>
  );
}

export default HomePage;
