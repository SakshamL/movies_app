import React from "react";
import SearchBar from "../Components/SearchBar";
import MoviesList from "../Sections/MoviesList";
import TvList from "../Sections/TvList";
import MovieCard from "../Components/MovieCard";

function HomePage() {
  return (
    <>
      <div className=" text-white flex flex-col items-center mt-10 ml-20 mr-20">
        <SearchBar />
      </div>

      <div className="">
        <MoviesList />
        <TvList />
      </div>
      {/* TV Shows */}
    </>
  );
}

export default HomePage;
