import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { movie_details_1, movie_details_2 } from "../Services/api";
import SearchBar from "../Components/SearchBar";
import { Link } from "react-router-dom";

const IMGPATH = "https://image.tmdb.org/t/p/w1280";

function Movies() {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState([]);

  useEffect(() => {
    getMovie_details();
  }, []);

  useEffect(() => {
    getMovie_details();
  }, [id]);

  const getMovie_details = async () => {
    const response = await fetch(movie_details_1 + id + movie_details_2);
    const responseJSON = await response.json();
    setMovieDetails(responseJSON);
  };

  function Movie_details() {
    return (
      <>
        <div className="relative text-white flex flex-col  w-full ml-[4%] mr-[4%]">
          <SearchBar />
          <div className="mt-10">
            <img
              src={IMGPATH + movieDetails.backdrop_path}
              alt=""
              className="md:h-[80vh] md:w-[100vw] backdrop-mask-gradient "
            />
          </div>

          <div className="absolute top-[20%] left-20 brightness-[1] flex md:items-center">
            <img
              src={IMGPATH + movieDetails.poster_path}
              alt={movieDetails.title}
              className="w-50 md:w-60 rounded-2xl shadow-[6px_9px_19px_1px_rgba(0,_0,_0,_0.5)]"
            />
            <div className="text-white ml-[30px]">
              <h2 className="md:text-3xl md:font-semibold md:mb-4">
                {movieDetails.title}
              </h2>
              <div className="krub-regular text-[18px] flex gap-3 items-center">
                <h2>
                  {Math.trunc(movieDetails.runtime / 60).toString() +
                    "h " +
                    ((movieDetails.runtime / 60) % 1)
                      .toString()
                      .substring(2, 3) *
                      6 +
                    "m" +
                    " "}
                </h2>
                |
                <h2 className="krub-regular">
                  {movieDetails.release_date
                    ? movieDetails.release_date.substring(0, 4)
                    : null}
                </h2>{" "}
                |
                <div className="flex items-center gap-1 text-[#ffca28] font-bold">
                  {movieDetails.vote_average
                    ? movieDetails.vote_average.toFixed(2)
                    : null}
                  <img
                    src="/star.png"
                    alt="star"
                    className="w-[20px] h-full mt-[-3px]"
                  />
                </div>
              </div>
              <div className="flex gap-3 krub-regular text-[16px] mt-8">
                {movieDetails.genres
                  ? movieDetails.genres.map((genre) => {
                      return (
                        <Link>
                          <p className="bg-[#1B2028] border-[2px] border-[#4f75c157] md:pt-1 md:pb-1 md:pr-5 md:pl-5 md:rounded-[10px]">
                            {genre.name}
                          </p>
                        </Link>
                      );
                    })
                  : ""}
              </div>
              {/* .toFixed(2)}
              <img src="/star.png" alt="star" className="w-[15px] h-full" /> */}
              {/* <Link
                to={`/movie/${movieDetails.id}/watch`}
                className="rounded-md cursor-pointer px-6 py-2 opacity-100 shadow-lg text-lg uppercase font-semibold bg-violet-700 text-slate-50 shadow-purple-400/50"
              >
                WATCH NOW
              </Link> */}
              {/* <h2 className="text-[20px] mb-5 mt-5 font-semibold">
                Release Year:{" "}
                <span className="font-light">{movieDetails.release_date}</span>
              </h2> */}
              {/* <h2 className="text-[20px] font-semibold w-200">
                Overview:
                <span className="font-bold drop-shadow-[0_2px_2px_rgba(0,0,0,1)]">
                  "{movieDetails.overview}"
                </span>
              </h2> */}
              {/* <h2>{movieDetails.genres[0]}</h2> */}
            </div>
          </div>
        </div>
      </>
    );
  }

  function All_Movies_list() {
    return (
      <>
        <h2>Here, You will the list of All Movies..!!</h2>
      </>
    );
  }

  return (
    <div className="text-white flex justify-center mt-10 ">
      {id ? <Movie_details /> : <All_Movies_list />}
    </div>
  );
}

export default Movies;
