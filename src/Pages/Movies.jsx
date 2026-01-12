import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import { movie_details_1, movie_details_2 } from "../Services/api";
import { movieAPI } from "../Services/api";
// import { cast_api_1, cast_api_2 } from "../Services/api";
// import { movie_cert_1, movie_cert_2 } from "../Services/api";
import { movie_trailer_1, movie_trailer_2 } from "../Services/api";
import SearchBar from "../Components/SearchBar";
import { Link } from "react-router-dom";
import CastCard from "../Components/CastCard";
import AllMoviesPage from "./AllMoviesPage";

const IMGPATH = "https://image.tmdb.org/t/p/w1280";

function Movies() {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState([]);
  const [cast, setCast] = useState([]);
  const [movieCert, setMovieCert] = useState("");
  const [trailer, setTrailer] = useState([]);

  useEffect(() => {
    getMovie_details();
    getcast_details();
    get_cert();
    get_trailer();
  }, []);

  useEffect(() => {
    getMovie_details();
    getcast_details();
    get_cert();
    get_trailer();
  }, [id]);

  const getMovie_details = async () => {
    if (id) {
      const response = await movieAPI.getMovieDetails(id);
      // const response = await fetch(movie_details_1 + id + movie_details_2);
      // const responseJSON = await response.json();
      setMovieDetails(response);
    }
  };

  const getcast_details = async () => {
    if (id) {
      const response = await movieAPI.getCast(id);
      // const response = await fetch(cast_api_1 + id + cast_api_2);
      // const responseJSON = await response.json();
      setCast(response.cast);
      // console.log(responseJSON.cast);
    }
  };

  const get_cert = async () => {
    if (id) {
      const response = await movieAPI.getCert(id);
      // const response = await fetch(movie_cert_1 + id + movie_cert_2);
      // const responseJSON = await response.json();
      response.results.forEach((element) => {
        if (element.iso_3166_1 == "IN") {
          setMovieCert(element.release_dates[0].certification);
          // console.log(element.release_dates[0].certification);
        }
      });
    }
  };

  const get_trailer = async () => {
    if (id) {
      const response = await fetch(movie_trailer_1 + id + movie_trailer_2);
      const responseJSON = await response.json();
      setTrailer(responseJSON.results[0].key);
      // console.log(responseJSON.results[0].key);
      // console.log(movie_trailer_1 + id + movie_trailer_2);
    }
  };

  function Movie_details() {
    return (
      <>
        <div className="text-white flex flex-col w-full ml-[4%] mr-[4%]">
          {/* <SearchBar /> */}
          <div className="relative mt-10">
            <img
              src={IMGPATH + movieDetails.backdrop_path}
              alt=""
              className="-mt-[100px] md:h-[80vh] md:w-[100vw] backdrop-mask-gradient "
            />
            <div className="absolute top-[15%] left-20 brightness-[1] md:flex md:items-start">
              {/* <img
                src={IMGPATH + movieDetails.poster_path}
                alt={movieDetails.title}
                className="w-50 md:w-60 rounded-2xl shadow-[6px_9px_19px_1px_rgba(0,_0,_0,_0.5)]"
              /> */}
              <div className="text-white ml-[30px] mt-50">
                <h2 className="md:text-6xl md:font-bold md:mb-4 [text-shadow:_0px_0px_5px_#000000]">
                  {movieDetails.title}
                </h2>
                <div className="krub-regular text-[18px] flex gap-3 items-center">
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
                  <h2 className="krub-regular ">
                    {movieDetails.release_date
                      ? movieDetails.release_date.substring(0, 4)
                      : null}
                  </h2>
                  <div className="border py-[0.5px] px-2 rounded font-bold text-[10pt]">
                    {movieCert}
                  </div>
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
                </div>

                <div className="flex gap-4 mb-8">
                  <Link to={`/movie/${movieDetails.id}/watch`}>
                    {/* <h2 className="rounded-[14px] cursor-pointer px-6 py-2 shadow-lg uppercase font-semibold bg-[#7C02FF] shadow-purple-400/50"></h2> */}

                    <h2 className="bg-[#2046a6] w-fit rounded-[10px] cursor-pointer px-7 py-3 shadow-[0px_0px_5px_0px_rgba(40,_90,_216,_1)] uppercase font-bold mt-5 hover:scale-[1.1] duration-100">
                      PLAY NOW
                    </h2>
                  </Link>

                  <Link to={`https://www.youtube.com/watch?v=${trailer}`}>
                    {/* <h2 className="rounded-[14px] cursor-pointer px-6 py-2 shadow-lg uppercase font-semibold bg-[#7C02FF] shadow-purple-400/50"></h2> */}

                    <h2
                      className="bg-[#cd0003bc] w-fit rounded-[10px] cursor-pointer px-5 py-3 shadow-[0px_0px_5px_0px_rgba(205,_0,_3,_1)] font-normal  mt-5 uppercase"
                      onClick={() => {}}
                    >
                      Trailer
                    </h2>
                  </Link>
                </div>
                <div className="flex gap-3 krub-regular text-[14px] mt-5 ">
                  {movieDetails.genres
                    ? movieDetails.genres.map((genre) => {
                        return (
                          <Link key={genre.id}>
                            <p className="bg-[#1b202800] border-[2px] border-[#4f75c157] md:pt-1 md:pb-1 md:pr-5 md:pl-5 md:rounded-[10px]">
                              {genre.name}
                            </p>
                          </Link>
                        );
                      })
                    : ""}
                </div>
                <div className="flex gap-10">
                  <div className="flex-6">
                    <h2 className="md:text-2xl md:font-semibold md:mb-4 md:mt-10">
                      Synopsis
                    </h2>
                    <h2 className="text-[#ffffff7c] text-[18px] md:font-normal md:mb-4 md:mt-5">
                      {movieDetails.overview}
                    </h2>
                    <div className="flex items-center justify-between md:mb-5 md:mt-20 ">
                      <h2 className="md:text-2xl md:font-semibold ">Cast</h2>
                      <Link>
                        <h3 className="text-[#3668e8] text-[18px] md:font-bold">
                          See All
                        </h3>
                      </Link>
                    </div>

                    <div className="mb-20 scrollhide">
                      <div className="grid md:grid-cols-6  gap-4">
                        {cast.slice(0, 12).map((casting) => (
                          <div
                            key={casting.id}
                            className=" hover:scale-[1.1] duration-100"
                          >
                            <CastCard
                              key={casting.id}
                              image={
                                casting.profile_path === null
                                  ? `/no-poster.jpg`
                                  : IMGPATH + casting.profile_path
                              }
                              name={casting.name}
                              char={casting.character}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex-2 -mt-30">
                    <img
                      src={IMGPATH + movieDetails.poster_path}
                      alt={movieDetails.title}
                      className="w-50 md:w-60 rounded-2xl shadow-[6px_9px_19px_1px_rgba(0,_0,_0,_0.5)]"
                    />
                  </div>
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
        {/* <h2>Here, You will the list of All Movies..!!</h2> */}

        <AllMoviesPage />
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
