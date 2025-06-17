import React from "react";
import { NavLink } from "react-router-dom";

function MovieCard(props) {
  return (
    <NavLink to={`/movie/${props.id}`}>
      <div className="w-full h-full relative">
        <div className="movie-card-gradient w-full h-full absolute opacity-[0.5px] top-0 left-0 "></div>
        <img
          src={props.poster_path}
          alt={props.title}
          className="w-full h-full rounded-[12px] shadow-[0px_4px_5px_0px_rgba(0,_0,_0,_0.25)] "
        />
        <p className="text-white absolute left-[10px] bottom-[25px] text-[90%] font-bold font-inter">
          {props.title}
        </p>
        <p className="text-white absolute left-[10px] bottom-[5px] text-[90%] font-inria-sans">
          {props.release_date}
        </p>
        <p className="text-white absolute right-[10px] bottom-[5px] text-[90%] font-inria-sans flex items-center">
          {props.vote.toFixed(2)}{" "}
          <img src="/star.png" alt="star" className="w-[15px] h-full" />
        </p>
      </div>
    </NavLink>
  );

  // return (
  //   <div className=" text-white flex flex-col w-full h-full  brightness-[1.25] rounded-[10px] border-[#80808000] border-[5px]  focus:scale-[1.3]  hover:scale-[1.1] hover:border-[5px] hover:border-[#bdbdbde9] hover:z-10 focus:z-10 transition duration-200  max-sm:w-[45%] max-sm:hover:scale-[1.1] max-md:w-[30%] max-md:hover:scale-[1.1] max-lg:w-[22%] max-lg:hover:scale-[1.1]">
  //     <Link
  //       to={`/movie/${props.id}`}
  //       className=" rounded-[10px] focus:outline-[5px] focus:outline-[#bdbdbde9] focus:rounded focus:scale-[1.1] transition duration-200"
  //     >
  //       <img
  //         src={props.poster_path}
  //         alt={props.title}
  //         className="rounded-tr-[5px] rounded-tl-[5px]"
  //       />
  //       <p className="p-2 bg-blue-600 rounded-bl-[10px] rounded-br-[10px] flex justify-start title-bg-gradient overflow-hidden truncate">
  //         {props.title}
  //       </p>
  //     </Link>
  //   </div>
  // )
}

export default MovieCard;
