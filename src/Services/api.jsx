// import { useState } from "react";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

// Helper function to handle the actual fetch logic
const fetchFromTMDB = async (endpoint, params = "") => {
  try {
    const response = await fetch(
      `${BASE_URL}${endpoint}?api_key=${API_KEY}${params}`
    );
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  } catch (error) {
    console.error("API Fetch Error:", error);
    return null;
  }
};

// 1. Calculate the date window (45 days)
const today = new Date();
const startDate = new Date();
startDate.setDate(today.getDate() - 45);
const formatDate = (date) => date.toISOString().split("T")[0];

// hi: Hindi, en: English, pa: Punjabi, te: Telugu, ta: Tamil, ml: Malayalam, kn: Kannada
const languages = ["hi", "en", "pa", "te", "ta", "ml", "kn"].join("|");
const langHindi = "hi";
const langEng = "en";
const releaseTypes = "2|3|4";

export const movieAPI = {
  getHindiMovies: (page = 1) =>
    fetchFromTMDB(
      "/discover/movie",
      `&page=${page}&region=IN&with_release_type=${releaseTypes}&with_original_language=${langHindi}&release_date.gte=${formatDate(
        startDate
      )}&release_date.lte=${formatDate(today)}&sort_by=popularity.desc`
    ),

  getEnglishMovies: (page = 1) =>
    fetchFromTMDB(
      "/discover/movie",
      `&page=${page}&region=IN&with_release_type=${releaseTypes}&with_original_language=${langEng}&release_date.gte=${formatDate(
        startDate
      )}&release_date.lte=${formatDate(today)}&sort_by=popularity.desc`
    ),

  getFeaturedMovies: () =>
    fetchFromTMDB(
      "/discover/movie",
      `&region=IN&with_release_type=${releaseTypes}&with_original_language=${languages}&release_date.gte=${formatDate(
        startDate
      )}&release_date.lte=${formatDate(today)}&sort_by=popularity.desc`
    ),
};

// export const movies_api_1 = `https://api.themoviedb.org/3/movie/now_playing?api_key=04c35731a5ee918f014970082a0088b1&language=en-US&with_original_language=hi&page=`;

// export const movies_api_2 = ``;

export const movies_api = `https://api.themoviedb.org/3/discover/movie?api_key=04c35731a5ee918f014970082a0088b1&region=IN&sort_by=popularity.desc&with_original_language=hi&primary_release_year=&page=`;

// export const movies_api_2 = `&&primary_release_year=2025&with_original_language=hi`;

export const tv_shows = `https://api.themoviedb.org/3/discover/tv?include_adult=false&api_key=04c35731a5ee918f014970082a0088b1&include_null_first_air_dates=false&&page=1&sort_by=popularity.desc&region=IN&with_original_language=hi`;

export const movie_details_1 = `https://api.themoviedb.org/3/movie/`;

export const movie_details_2 = `?api_key=04c35731a5ee918f014970082a0088b1`;

export const tv_details_1 = `https://api.themoviedb.org/3/tv/`;

export const tv_details_2 = `?api_key=04c35731a5ee918f014970082a0088b1`;

export const top_rated_movies_1 = `https://api.themoviedb.org/3/discover/movie?api_key=04c35731a5ee918f014970082a0088b1&include_adult=false&include_video=false&language=en-US&page=`;

export const top_rated_movies_2 = `&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200&with_original_language=hi`;

export const search_api = [
  "https://api.themoviedb.org/3/search/movie?query=",
  "avengers",
  "&include_adult=false&language=en-US&page=1&api_key=04c35731a5ee918f014970082a0088b1",
];

export const cast_api_1 = `https://api.themoviedb.org/3/movie/`;
export const cast_api_2 = `/credits?api_key=04c35731a5ee918f014970082a0088b1`;

export const castTv_api_1 = `https://api.themoviedb.org/3/tv/`;
export const castTv_api_2 = `/credits?api_key=04c35731a5ee918f014970082a0088b1&language=en-US`;

export const movie_cert_1 = `https://api.themoviedb.org/3/movie/`;
export const movie_cert_2 = `/release_dates?api_key=04c35731a5ee918f014970082a0088b1`;

export const movie_trailer_1 = `https://api.themoviedb.org/3/movie/`;
export const movie_trailer_2 = `/videos?language=en-US&api_key=04c35731a5ee918f014970082a0088b1`;

export const movie_genres = `https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=04c35731a5ee918f014970082a0088b1`;

// https://api.themoviedb.org/3/movie/37822/videos?language=en-US&api_key=04c35731a5ee918f014970082a0088b1

// const Next_btn = () => {
//   const [prevpage, setprevpage] = useState(1);
//   const [newPage, setNewPage] = useState(prevpage);
//   return (
//     <div className="text-[black]  flex justify-center">
//       <button
//         className="bg-white cursor-pointer mt-10 p-2"
//         onClick={(e) => {
//           setNewPage(newPage + 1);
//           setprevpage(newPage);
//         }}
//       >
//         Page {newPage}
//       </button>
//     </div>
//   );
// };

// export { Next_btn };
