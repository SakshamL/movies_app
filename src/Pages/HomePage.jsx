import React from "react";
import { useEffect, useState } from "react";
import SearchBar from "../Components/SearchBar";
import MoviesList from "../Sections/MoviesList";
import TvList from "../Sections/TvList";
import GetFeaturedMovies from "../Services/getFeaturedMovies";

function HomePage() {
  return (
    <>
      <div className=" text-white flex flex-col items-center mt-10 ml-20 mr-20">
        <SearchBar />
      </div>

      <div className="mt-10 ml-[5%] mr-[5%]">
        <h2 className="text-white text-2xl font-bold mb-5">Featured Movies</h2>
        <GetFeaturedMovies />

        <MoviesList />
        <TvList />
      </div>
      {/* TV Shows */}
    </>
  );
}

export default HomePage;
