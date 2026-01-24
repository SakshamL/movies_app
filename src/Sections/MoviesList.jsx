import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { movieAPI } from "../Services/api";
import MovieCard from "../Components/MovieCard";
import { FaArrowRight } from "react-icons/fa";

const IMGPATH = "https://image.tmdb.org/t/p/w1280";

function MoviesList() {
  // const [prevpage, setprevpage] = useState(1);
  // const [newPage, setNewPage] = useState(prevpage);

  const newPage = 1;

  const [movies, setMovies] = useState([]);
  const [moviesPa, setMoviesPa] = useState([]);
  const [moviesEn, setMoviesEn] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);

  useEffect(() => {
    getMovies();
  }, []);

  const getMovies = async () => {
    const [hindiRes, englishRes, nowRes, punjabiRes] = await Promise.all([
      movieAPI.getHindiMovies(1), // 1 means Page number here..
      movieAPI.getEnglishMovies(1),
      movieAPI.getNowPlaying(1),
      movieAPI.getPunjabiMovies(1),
    ]);

    setMovies(hindiRes.results);
    setMoviesPa(punjabiRes.results);
    setMoviesEn(englishRes.results);
    setNowPlaying(nowRes.results);
  };

  const MediaRow = ({ heading, moreLink, mediaList }) => {
    return (
      <>
        <div className="flex gap-5 justify-between items-center mt-10">
          <h2 className="text-white font-bold text-xl">{heading}</h2>
          <div className="flex-1 border-b-2 border-dotted opacity-50 border-gray-600 mb-1"></div>
          <Link to={`${moreLink}`}>
            <h2 className="text-[grey] font-bold text-[10pt] flex items-center gap-3">
              More <FaArrowRight />
            </h2>
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-6 mt-10 mb-10 md:grid-cols-4 lg:grid-cols-7 ">
          {mediaList.slice(0, 7).map((movie) => (
            <div
              key={movie.id}
              className="w-full h-full hover:scale-[1.1] transition duration-150"
            >
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
  };

  return (
    <>
      <MediaRow heading="Now Playing" moreLink="/" mediaList={nowPlaying} />

      <MediaRow
        heading="Blockbuster Hindi Movies"
        moreLink="/movies/hindi"
        mediaList={movies}
      />

      <MediaRow
        heading="English Movies to watch"
        moreLink="/movies/english"
        mediaList={moviesEn}
      />

      <MediaRow
        heading="Latest Punjabi Movies"
        moreLink="/movies/punabi"
        mediaList={moviesPa}
      />
    </>
  );
}

export default MoviesList;
