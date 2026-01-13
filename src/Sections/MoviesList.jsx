import React, { useState, useEffect } from "react";
import { movieAPI } from "../Services/api";
// import { movies_api } from "../Services/api";
// import { movies_api_2 } from "../Services/api";
import MovieCard from "../Components/MovieCard";
// import { url } from "../Services/api";
// import { url3 } from "../Services/api";

const IMGPATH = "https://image.tmdb.org/t/p/w1280";

function MoviesList() {
  // const [prevpage, setprevpage] = useState(1);
  // const [newPage, setNewPage] = useState(prevpage);

  const newPage = 1;

  const [movies, setMovies] = useState([]);
  const [moviesEn, setMoviesEn] = useState([]);

  useEffect(
    () => {
      getMovies();
    },
    [movies],
    [moviesEn]
  );

  const getMovies = async () => {
    const response = await movieAPI.getHindiMovies(1); // 1 means Page number here..

    // const response = await fetch(movies_api + newPage + movies_api_2);
    // const responseJSON = await response.json();
    setMovies(response.results);
    // console.log(response.results);

    const responseEn = await movieAPI.getEnglishMovies(1);
    // const response = await fetch(movies_api + newPage + movies_api_2);
    setMoviesEn(responseEn.results);
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
      <h2 className="text-white font-bold text-2xl">Latest Hindi Movies</h2>
      {/* <div className="flex flex-wrap gap-4 mt-10 mb-10  "> */}
      <div className="grid grid-cols-2 gap-6 mt-10 mb-10 md:grid-cols-4 lg:grid-cols-7 ">
        {movies.slice(0, 7).map((movie) => (
          <div
            key={movie.id}
            className="w-full h-full hover:scale-[1.1] transition duration-150"
          >
            {/* <div
            key={movie.id}
            className="w-[15%] h-[15%]  hover:scale-[1.1] transition duration-100"
          > */}
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              poster_path={
                movie.poster_path === null
                  ? `/no-poster.jpg`
                  : IMGPATH + movie.poster_path
              }
              release_date={movie.release_date.slice(0, 4)}
              vote={movie.vote_average}
            />
          </div>
        ))}
      </div>

      {/* ---------------------------------------------------------------------------------- */}
      <h2 className="text-white font-bold text-2xl">Latest English Movies</h2>
      {/* <div className="flex flex-wrap gap-4 mt-10 mb-10  "> */}
      <div className="grid grid-cols-2 gap-6 mt-10 mb-10 md:grid-cols-4 lg:grid-cols-7 ">
        {moviesEn.slice(0, 7).map((movie) => (
          <div
            key={movie.id}
            className="w-full h-full hover:scale-[1.1] transition duration-150"
          >
            {/* <div
            key={movie.id}
            className="w-[15%] h-[15%]  hover:scale-[1.1] transition duration-100"
          > */}
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              poster_path={
                movie.poster_path === null
                  ? `/no-poster.jpg`
                  : IMGPATH + movie.poster_path
              }
              release_date={movie.release_date.slice(0, 4)}
              vote={movie.vote_average}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default MoviesList;
