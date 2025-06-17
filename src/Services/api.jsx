// import { useState } from "react";

export const movies_api_1 = `https://api.themoviedb.org/3/discover/movie?api_key=04c35731a5ee918f014970082a0088b1&region=IN&sort_by=popularity.desc&page=`;

export const movies_api_2 = `&&primary_release_year=2025&with_original_language=hi`;

export const tv_shows = `https://api.themoviedb.org/3/discover/tv?include_adult=false&api_key=04c35731a5ee918f014970082a0088b1&include_null_first_air_dates=false&&page=1&sort_by=popularity.desc&region=IN&with_original_language=hi`;

export const movie_details_1 = `https://api.themoviedb.org/3/movie/`;

export const movie_details_2 = `?api_key=04c35731a5ee918f014970082a0088b1`;

export const top_rated_movies_1 = `https://api.themoviedb.org/3/discover/movie?api_key=04c35731a5ee918f014970082a0088b1&include_adult=false&include_video=false&language=en-US&page=`;

export const top_rated_movies_2 = `&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200&with_original_language=hi`;

export const search_api = [
  "https://api.themoviedb.org/3/search/movie?query=",
  "avengers",
  "&include_adult=false&language=en-US&page=1&api_key=04c35731a5ee918f014970082a0088b1",
];

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
