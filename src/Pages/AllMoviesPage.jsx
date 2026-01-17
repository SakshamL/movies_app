import React, { useState, useEffect } from "react";
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
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [pageNo, setpageNo] = useState(1);
  const [currPage, setcurrPage] = useState(1);
  const [yearsList, setyearsList] = useState([]);
  const [selectedYear, setselectedYear] = useState(
    new Date().getFullYear().toString()
  );

  useEffect(() => {
    getMovies();
    getGenres();
    yearsDropdown();
  }, []);

  useEffect(() => {
    getMovies();
    getGenres();
  }, [newPage]);

  useEffect(() => {
    // setSortedMovies(movies_api + newPage + movies_api_2 + "&with_genres=" + selectedGenres.join().replace(/,/g,"|") )

    getMovies();
    // setcurrPage(pageNo > 0 ? 1 : 0);
  }, [selectedGenres]);

  useEffect(() => {
    getMovies();
  }, [currPage]);

  useEffect(() => {
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

  // console.log(yearsList);

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
    const response = await movieAPI.getAllMovies(
      currPage,
      selectedGenres,
      selectedYear
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
        {/* <div className="flex-2 border-r-2 border-[#ffffff20] pr-5 mr-5 ">
          <h2 className="text-[#ffffffcf] font-semibold text-xl mb-5">
            Genre Filters
          </h2>
          <div className="flex flex-wrap gap-x-2 gap-y-7 text-[#ffffff6d]"></div>
        </div> */}

        {/* <div className="flex flex-wrap gap-4 mt-10 mb-10  "> */}
        <div className="flex-8">
          <SearchBar />
          <div className="flex mt-5 justify-center items-center">
            <p>Year :</p>
            <select
              name="year"
              id="year"
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
                // <div
                //   key={gen.id}
                //   className="flex flex-1 relative items-center justify-center"
                // >
                //   <input
                //     type="checkbox"
                //     id={gen.id}
                //     name={gen.name}
                //     value={gen.name}
                //     onChange={checkSelectedGenres}
                //     className={`peer cursor-pointer absolute rounded-lg appearance-none w-full h-10 border-3 checked:border-[#311670] checked:brightness-[1.5] border-[#ffffff65] `}
                //   />
                //   <label
                //     htmlFor={gen.id}
                //     className={`px-3 py-1 cursor-pointer text-nowrap text-[14px] font-semibold peer-checked:text-[#632ae9] `}
                //   >
                //     {gen.name}
                //   </label>
                // </div>
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
                currPage > 1 ? setcurrPage(Number(currPage) - 1) : null;
              }}
            >
              Prev
            </button>
            <button
              className={`px-5 border-1 rounded border-amber-50 mx-2 ${
                currPage >= pageNo ? "cursor-not-allowed" : "cursor-pointer"
              }`}
              onClick={() => {
                currPage < pageNo ? setcurrPage(Number(currPage) + 1) : null;
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
        </div>
      </div>
    </>
  );
}

export default AllMoviesPage;
