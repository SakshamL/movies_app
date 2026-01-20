import React, { useState, useEffect, useRef } from "react";
import { movieAPI } from "../Services/api";
// import { movies_api } from "../Services/api";
// import { movies_api_2 } from "../Services/api";
import MovieCard from "../Components/MovieCard";
import SearchBar from "../Components/SearchBar";
// import { movie_genres } from "../Services/api";

const IMGPATH = "https://image.tmdb.org/t/p/w1280";

function AllMoviesPage() {
  const newPage = 1;
  const startYear = 1990;

  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState(
    sessionStorage.getItem("genre") ? sessionStorage.getItem("genre") : "",
  );
  const prevGenreRef = useRef(sessionStorage.getItem("genre") || "");
  const [pageNo, setpageNo] = useState(1);
  const [currPage, setcurrPage] = useState(
    sessionStorage.getItem("page") ? sessionStorage.getItem("page") : 1,
  );
  const [yearsList, setyearsList] = useState([]);
  const [selectedYear, setselectedYear] = useState(
    sessionStorage.getItem("year")
      ? sessionStorage.getItem("year")
      : new Date().getFullYear().toString(),
  );

  useEffect(() => {
    getMovies();
    getGenres();
    yearsDropdown();
    sessionStorage.setItem("genre", selectedGenres);
  }, []);

  useEffect(() => {
    getMovies();
    getGenres();
  }, [newPage]);

  useEffect(() => {
    sessionStorage.setItem("genre", selectedGenres);
    if (prevGenreRef.current !== selectedGenres) {
      // console.log(
      //   `Value Changed! Old: ${prevGenreRef.current}, New: ${selectedGenres}`,
      // );
      prevGenreRef.current = selectedGenres;
      sessionStorage.setItem("page", 1);
    }
    getMovies();
  }, [selectedGenres]);

  useEffect(() => {
    getMovies();
  }, [currPage]);

  useEffect(() => {
    sessionStorage.setItem("year", selectedYear);
    getMovies();
  }, [selectedYear]);

  const yearsDropdown = () => {
    let todayYear = new Date().getFullYear();
    let tempYearsList = [];
    while (todayYear >= startYear) {
      tempYearsList.push(todayYear);
      todayYear = todayYear - 1;
    }
    setyearsList(tempYearsList);
  };

  // Debounce: Wait 500ms after the user stops moving the slider
  // useEffect(() => {
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
    const response = await movieAPI.getAllMovies(
      getpagefromSession(),
      getgenrefromSession(),
      getyearfromSession(),
    );
    // const response = await fetch(sortedMovies);
    // const responseJSON = await response.json();
    setMovies(response.results);
    setpageNo(response.total_pages);
  };

  const getGenres = async () => {
    const response = await movieAPI.getGenres();
    // const response = await fetch(movie_genres);
    // const responseJSON = await response.json();
    setGenres(response.genres);

    // console.log(responseJSON.genres)
  };

  const checkSelectedGenres = async (e) => {
    const id = e.target.value;
    setSelectedGenres([id]);
    setcurrPage(pageNo > 0 ? 1 : 0);
  };

  const getgenrefromSession = () => {
    const gen = sessionStorage.getItem("genre");
    return gen ? gen : "";
  };

  const getyearfromSession = () => {
    const yr = sessionStorage.getItem("year");
    return yr ? yr : "";
  };

  const getpagefromSession = () => {
    const pg = sessionStorage.getItem("page");
    return pg ? pg : 1;
  };

  const checkSelectedYear = (e) => {
    const id = e.target.value;
    setselectedYear([id]);
    setcurrPage(pageNo > 0 ? 1 : 0);
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
        <div className="flex-8">
          <SearchBar />
          <div className="flex mt-5 justify-center items-center">
            <p>Year :</p>
            <select
              name="year"
              id="year"
              value={selectedYear}
              className="border-2 rounded border-[#ffffff26] outline-0 mx-5"
              onChange={checkSelectedYear}
            >
              {yearsList.map((year) => {
                return (
                  <option key={year} value={year} className="text-black">
                    {year}
                  </option>
                );
              })}
            </select>
            <p className="mr-5">Genres : </p>
            <select
              name="genre"
              id="genre"
              value={selectedGenres}
              onChange={checkSelectedGenres}
              className="border-2 rounded border-[#ffffff26] outline-0"
            >
              <option value="" className="text-black">
                All
              </option>
              {genres.map((gen) => (
                // <p key={gen.id}>{gen.name}</p>
                <option
                  value={gen.id}
                  id={gen.id}
                  className=" text-black"
                  key={gen.id}
                >
                  {gen.name}
                </option>
              ))}
            </select>
            <p className="ml-3">
              Page: {currPage} of {pageNo}
            </p>
            <button
              className={`px-5 border-1 rounded border-amber-50 mx-2 ${
                currPage <= 1 ? "cursor-not-allowed" : "cursor-pointer"
              }`}
              onClick={() => {
                if (currPage > 1) {
                  setcurrPage(Number(currPage) - 1);
                  sessionStorage.setItem("page", Number(currPage) - 1);
                }
              }}
            >
              Prev
            </button>
            <button
              className={`px-5 border-1 rounded border-amber-50 mx-2 ${
                currPage >= pageNo ? "cursor-not-allowed" : "cursor-pointer"
              }`}
              onClick={() => {
                if (currPage < pageNo) {
                  setcurrPage(Number(currPage) + 1);
                  sessionStorage.setItem("page", Number(currPage) + 1);
                }
              }}
            >
              Next
            </button>
          </div>

          <div className=" grid grid-cols-2 gap-6 mt-10 mb-10 md:grid-cols-4 lg:grid-cols-7 ">
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
          <div className="flex justify-center mb-20">
            <p className="ml-3">
              Page: {currPage} of {pageNo}
            </p>
            <button
              className={`px-5 border-1 rounded border-amber-50 mx-2 ${
                currPage <= 1 ? "cursor-not-allowed" : "cursor-pointer"
              }`}
              onClick={() => {
                if (currPage > 1) {
                  setcurrPage(Number(currPage) - 1);
                  sessionStorage.setItem("page", Number(currPage) - 1);
                }
              }}
            >
              Prev
            </button>
            <button
              className={`px-5 border-1 rounded border-amber-50 mx-2 ${
                currPage >= pageNo ? "cursor-not-allowed" : "cursor-pointer"
              }`}
              onClick={() => {
                if (currPage < pageNo) {
                  setcurrPage(Number(currPage) + 1);
                  sessionStorage.setItem("page", Number(currPage) + 1);
                }
              }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AllMoviesPage;
