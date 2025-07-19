import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { movie_details_1, movie_details_2 } from "../Services/api";
import { cast_api_1, cast_api_2 } from "../Services/api";
import SearchBar from "../Components/SearchBar";
import { Link } from "react-router-dom";
import CastCard from "../Components/CastCard";

const IMGPATH = "https://image.tmdb.org/t/p/w1280";

function Movies() {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState([]);
  const [cast, setCast] = useState([]);

  useEffect(() => {
    getMovie_details();
    getcast_details();
  }, []);

  useEffect(() => {
    getMovie_details();
    getcast_details();
  }, [id]);

  const getMovie_details = async () => {
    const response = await fetch(movie_details_1 + id + movie_details_2);
    const responseJSON = await response.json();
    setMovieDetails(responseJSON);
  };

  const getcast_details = async () => {
    const response = await fetch(cast_api_1 + id + cast_api_2);
    const responseJSON = await response.json();
    setCast(responseJSON.cast);
    // console.log(responseJSON.cast);
  };

  function Movie_details() {
    return (
      <>
        <div className="text-white flex flex-col w-full ml-[4%] mr-[4%]">
          <SearchBar />
          <div className="relative mt-10">
            <img
              src={IMGPATH + movieDetails.backdrop_path}
              alt=""
              className="md:h-[80vh] md:w-[100vw] backdrop-mask-gradient "
            />
            <div className="absolute top-[15%] left-20 brightness-[1] md:flex md:items-start">
              <img
                src={IMGPATH + movieDetails.poster_path}
                alt={movieDetails.title}
                className="w-50 md:w-60 rounded-2xl shadow-[6px_9px_19px_1px_rgba(0,_0,_0,_0.5)]"
              />
              <div className="text-white ml-[30px] mt-10">
                <h2 className="md:text-3xl md:font-semibold md:mb-4 [text-shadow:_0px_0px_5px_#000000]">
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
                <div className="flex gap-3 krub-regular text-[16px] mt-5">
                  {movieDetails.genres
                    ? movieDetails.genres.map((genre) => {
                        return (
                          <Link key={genre.id}>
                            <p className="bg-[#1B2028] border-[2px] border-[#4f75c157] md:pt-1 md:pb-1 md:pr-5 md:pl-5 md:rounded-[10px]">
                              {genre.name}
                            </p>
                          </Link>
                        );
                      })
                    : ""}
                </div>

                <div className="flex gap-4">
                  <Link to={`/movie/${movieDetails.id}/watch`}>
                    {/* <h2 className="rounded-[14px] cursor-pointer px-6 py-2 shadow-lg uppercase font-semibold bg-[#7C02FF] shadow-purple-400/50"></h2> */}

                    <h2 className="bg-[#7C02FF] w-fit rounded-[14px] cursor-pointer px-4 py-2 shadow-[0px_0px_11px_0px_rgba(124,_2,_255,_1)] uppercase font-semibold mt-5">
                      PLAY NOW
                    </h2>
                  </Link>

                  <Link to={`/movie/${movieDetails.id}/watch`}>
                    {/* <h2 className="rounded-[14px] cursor-pointer px-6 py-2 shadow-lg uppercase font-semibold bg-[#7C02FF] shadow-purple-400/50"></h2> */}

                    <h2 className="bg-[#CD0003] w-fit rounded-[14px] cursor-pointer px-4 py-2 shadow-[0px_0px_5px_0px_rgba(205,_0,_3,_1)]  font-normal mt-5">
                      Trailer
                    </h2>
                  </Link>
                </div>

                <h2 className="md:text-2xl md:font-semibold md:mb-4 md:mt-10">
                  Story Line
                </h2>

                <h2 className="text-[18px] md:font-normal md:mb-4 md:mt-5">
                  {movieDetails.overview}
                </h2>

                <h2 className="md:text-2xl md:font-semibold md:mb-10 md:mt-20">
                  Cast
                </h2>

                <div className="grid grid-cols-3 md:grid-cols-6 gap-4 md:mb-50">
                  {cast.map((casting) =>
                    casting.profile_path !== null ? (
                      <div className=" hover:scale-[1.1] duration-100">
                        <CastCard
                          key={casting.id}
                          image={IMGPATH + casting.profile_path}
                          name={casting.name}
                          char={casting.character}
                        />
                      </div>
                    ) : null
                  )}
                </div>
              </div>
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
