import React, { useState, useEffect } from "react";
import { movies_api_1 } from "../Services/api";
import { movies_api_2 } from "../Services/api";
import MovieCard from "../Components/MovieCard";
import SearchBar from "../Components/SearchBar";
import { movie_genres } from "../Services/api";

const IMGPATH = "https://image.tmdb.org/t/p/w1280";

function AllMoviesPage() {
  const newPage = 1;
  
    const [movies, setMovies] = useState([]);
    const [genres, setGenres] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [sortedMovies, setSortedMovies] = useState(movies_api_1 + newPage + movies_api_2 + "&with_genres=")
  
    useEffect(() => {
      getMovies();
      getGenres();
    }, []);

    useEffect(() => {
      getMovies();
      getGenres();
    }, [newPage]);

    useEffect(() => {
      getMovies();
      getGenres();
    }, [sortedMovies]);

    
    useEffect(() => {
      // console.log(selectedGenres)
      setSortedMovies(movies_api_1 + newPage + movies_api_2 + "&with_genres=" + selectedGenres.join().replace(/,/g,"|") )
      // console.log(selectedGenres.join().replace(/,/g,"|"))
      // console.log(movies_api_1 + newPage + movies_api_2 + "&with_genres=" + selectedGenres.join())
      getMovies();
    }, [selectedGenres]);
    
        
    
  
    const getMovies = async () => {
      // const response = await fetch(movies_api_1 + newPage + movies_api_2);
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
      

      if (e.target.checked){
        setSelectedGenres([...selectedGenres, id])
        
        
      }else{
        setSelectedGenres(selectedGenres.filter(item => item !== id))
      }
    }
  
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
        <div className="flex  ">
          <div className="flex-2">
            <h2 className="text-[#ffffffcf] font-semibold text-xl mb-5">Filters</h2>
            <div className="flex flex-col text-[#ffffff6d]">
            {genres.map((gen) => (
            // <p key={gen.id}>{gen.name}</p>
            <div key={gen.id}>
              <input type="checkbox" id={gen.id} name={gen.name} value={gen.name} onChange={checkSelectedGenres} />
              <label>{gen.name}</label>
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
