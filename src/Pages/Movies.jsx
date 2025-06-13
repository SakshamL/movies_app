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
        <div className="relative flex flex-col justify-center w-[80%]">
          <div className="w-full ">
            <SearchBar />
          </div>
          <div className="w-full h-[60dvh] flex justify-center mt-10 ">
            <img
              src={IMGPATH + movieDetails.backdrop_path}
              alt=""
              className=" flex justify-center rounded-2xl h-full w-full brightness-[0.7] "
            />
          </div>

          <div className="flex w-full pl-10 pr-10  mt-[-58dvh] brightness-[1]">
            <img
              src={IMGPATH + movieDetails.poster_path}
              alt={movieDetails.title}
              className="w-70 rounded-2xl shadow-[6px_9px_19px_1px_rgba(0,_0,_0,_0.5)]"
            />
            <div className="text-white ml-[30px]">
              <h2 className="text-5xl font-semibold mb-10">
                {movieDetails.title}
              </h2>
              <Link
                to={`/movie/${movieDetails.id}/watch`}
                className="rounded-md cursor-pointer px-6 py-2 opacity-100 shadow-lg text-lg uppercase font-semibold bg-violet-700 text-slate-50 shadow-purple-400/50"
              >
                WATCH NOW
              </Link>
              <h2 className="text-[20px] mb-5 mt-5 font-semibold">
                Release Year:{" "}
                <span className="font-light">{movieDetails.release_date}</span>
              </h2>

              <h2 className="text-[20px] font-semibold w-200">
                Overview:
                <span className="font-bold drop-shadow-[0_2px_2px_rgba(0,0,0,1)]">
                  "{movieDetails.overview}"
                </span>
              </h2>

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
