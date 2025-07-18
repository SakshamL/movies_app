import React from "react";
import { useState, useEffect } from "react";
import FeaturedMoviesCards from "../Components/FeaturedMoviesCards";
import { top_rated_movies_1, top_rated_movies_2 } from "./api";

const IMGPATH = "https://image.tmdb.org/t/p/w1280";

const GetFeaturedMovies = () => {
  const page_no = 1;
  const [topMovies, setTopMovies] = useState([]);

  useEffect(() => {
    getTopMovies();
  }, []);

  const getTopMovies = async () => {
    const reponse = await fetch(
      top_rated_movies_1 + page_no + top_rated_movies_2
    );
    const responseJSON = await reponse.json();
    setTopMovies(responseJSON.results);
  };

  return (
    <div className="grid grid-cols-2 gap-4 gap-y-0 md:grid-cols-3 duration-200 ease-in-out">
      {topMovies.slice(0, 3).map((movie) => {
        return (
          <div key={movie.id} className="w-full h-[80%] relative">
            <FeaturedMoviesCards
              key={movie.id}
              id={movie.id}
              title={movie.title}
              backdrop={IMGPATH + movie.backdrop_path}
              poster={IMGPATH + movie.poster_path}
              vote={movie.vote_average}
            />
            ;
          </div>
        );
      })}
    </div>
  );
};

export default GetFeaturedMovies;
