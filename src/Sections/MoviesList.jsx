import React, { useState, useEffect } from "react";
import { movies_api_1 } from "../Services/api";
import { movies_api_2 } from "../Services/api";
import MovieCard from "../Components/MovieCard";

const IMGPATH = "https://image.tmdb.org/t/p/w1280";

function MoviesList() {
  // const [prevpage, setprevpage] = useState(1);
  // const [newPage, setNewPage] = useState(prevpage);

  const newPage = 1;

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getMovies();
  }, []);

  const getMovies = async () => {
    const response = await fetch(movies_api_1 + newPage + movies_api_2);
    const responseJSON = await response.json();
    setMovies(responseJSON.results);
  };

  return (
    <>
      {/* <div className="text-[black]  flex justify-center">
        //{" "}
        <button
          className="bg-white cursor-pointer mt-10 p-2"
          onClick={(e) => {
            if (movies.length > 0) {
              setNewPage(newPage + 1);
              setprevpage(newPage);
            }
          }}
        >
          Page {newPage}
        </button>
      </div> */}
      {/* ---------------------------------------------------------------------------------- */}
      <h2 className="text-white font-bold text-2xl ml-20 mt-10">
        Trending Movies
      </h2>
      <div className="flex flex-wrap gap-5 mt-10 mb-10 justify-center">
        {movies.slice(0, 20).map((movie) => (
          <div className="w-[174px] h-[250px] ">
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              poster_path={
                movie.poster_path === null
                  ? `no-poster.jpg`
                  : IMGPATH + movie.poster_path
              }
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default MoviesList;
