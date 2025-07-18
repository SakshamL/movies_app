import React from "react";
import { Link } from "react-router-dom";

function TVCard(props) {
  return (
    <Link
      to={`/tv/${props.id}`}
      className="rounded-[10px] focus:outline-[5px] focus:outline-[#bdbdbde9] focus:rounded focus:scale-[1.1] transition duration-200"
    >
      <div className="w-full h-full relative">
        <div className="movie-card-gradient w-full h-full absolute opacity-[0.5px] top-0 left-0 "></div>
        <img
          src={props.poster_path}
          alt={props.title}
          className="w-full h-full rounded-[12px] shadow-[0px_4px_5px_0px_rgba(0,_0,_0,_0.25)] "
        />
        <p className="text-white absolute left-[10px] bottom-[25px] text-[90%] font-bold font-inter">
          {props.name}
        </p>
        <p className="text-white absolute left-[10px] bottom-[5px] text-[90%] font-inria-sans">
          {props.first_air_date}
        </p>
        <p className="text-white absolute right-[10px] bottom-[5px] text-[90%] font-inria-sans flex items-center">
          {props.vote ? (
            <>
              {props.vote.toFixed(2)}
              <img src="/star.png" alt="star" className="w-[15px] h-full" />
            </>
          ) : null}
        </p>
      </div>
    </Link>
  );
}

export default TVCard;
