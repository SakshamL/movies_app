import React, { useState, useEffect } from "react";
import { movies_api } from "../Services/api";
// import { movies_api_2 } from "../Services/api";
import MovieCard from "../Components/MovieCard";
import SearchBar from "../Components/SearchBar";
import { movie_genres } from "../Services/api";
import RangeSlider from "../Components/rangeSlider";

const IMGPATH = "https://image.tmdb.org/t/p/w1280";

function AllMoviesPage() {
  const newPage = 1;

  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [sortedMovies, setSortedMovies] = useState(
    movies_api + newPage + "&with_genres="
  );

  // const [range, setRange] = useState({ min: 2015, max: 2026 });

  useEffect(() => {
    getMovies();
    getGenres();
  }, []);

  useEffect(() => {
    getMovies();
    getGenres();
    setSortedMovies(
      movies_api +
        newPage +
        "&with_genres=" +
        selectedGenres.join().replace(/,/g, "|")
    );
  }, [newPage]);

  useEffect(() => {
    getMovies();
    getGenres();
    setSortedMovies(
      movies_api +
        newPage +
        "&with_genres=" +
        selectedGenres.join().replace(/,/g, "|")
    );
  }, [sortedMovies]);

  useEffect(() => {
    // console.log(selectedGenres)
    setSortedMovies(
      movies_api +
        newPage +
        "&with_genres=" +
        selectedGenres.join().replace(/,/g, "|")
    );

    // setSortedMovies(movies_api + newPage + movies_api_2 + "&with_genres=" + selectedGenres.join().replace(/,/g,"|") )

    // console.log(selectedGenres.join().replace(/,/g,"|"))
    // console.log(movies_api + newPage + movies_api_2 + "&with_genres=" + selectedGenres.join())
    getMovies();
  }, [selectedGenres]);

  // useEffect(() => {
  //   // Debounce: Wait 500ms after the user stops moving the slider
  //   const delayDebounceFn = setTimeout(() => {
  //     console.log(`Fetching TMDb movies from ${range.min} to ${range.max}...`);

  //     const startDate = `${range.min}-01-01`;
  //     const endDate = `${range.max}-12-31`;

  //     // Call your API fetch function here
  //     // fetchMovies(startDate, endDate);
  //   }, 500);

  //   return () => clearTimeout(delayDebounceFn);
  // }, [range]);

  const getMovies = async () => {
    // const response = await fetch(movies_api + newPage + movies_api_2);
    const response = await fetch(sortedMovies);
    const responseJSON = await response.json();
    setMovies(responseJSON.results);
  };

  const getGenres = async () => {
    const response = await fetch(movie_genres);
    const responseJSON = await response.json();
    setGenres(responseJSON.genres);
    // console.log(responseJSON.genres)
  };

  const checkSelectedGenres = async (e) => {
    const id = e.target.id;

    if (e.target.checked) {
      setSelectedGenres([...selectedGenres, id]);
    } else {
      setSelectedGenres(selectedGenres.filter((item) => item !== id));
    }
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
      <div className="flex gap-3">
        <div className="flex-2 border-r-2 border-[#ffffff20] pr-5 mr-5 ">
          {/* <RangeSlider
            min={1990}
            max={2026}
            onChange={(newVal) => setRange(newVal)}
          /> */}
          <h2 className="text-[#ffffffcf] font-semibold text-xl mb-5">
            Genre Filters
          </h2>
          <div className="flex flex-wrap gap-x-2 gap-y-7 text-[#ffffff6d]">
            {genres.map((gen) => (
              // <p key={gen.id}>{gen.name}</p>
              <div
                key={gen.id}
                className="flex flex-1 relative items-center justify-center"
              >
                <input
                  type="checkbox"
                  id={gen.id}
                  name={gen.name}
                  value={gen.name}
                  onChange={checkSelectedGenres}
                  className={`peer cursor-pointer absolute rounded-lg appearance-none w-full h-10 border-3 checked:border-[#311670] checked:brightness-[1.5] border-[#ffffff65] `}
                />
                <label
                  htmlFor={gen.id}
                  className={`px-3 py-1 cursor-pointer text-nowrap text-[14px] font-semibold peer-checked:text-[#632ae9] `}
                >
                  {gen.name}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* <div className="flex flex-wrap gap-4 mt-10 mb-10  "> */}
        <div className="flex-8">
          <SearchBar />
          <div className=" grid grid-cols-2 gap-6 mt-10 mb-10 md:grid-cols-4 lg:grid-cols-5 ">
            {movies.map((movie) => (
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
                  release_date={movie.release_date}
                  vote={movie.vote_average}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default AllMoviesPage;
