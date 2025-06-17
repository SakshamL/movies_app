import React from "react";
import { Link } from "react-router-dom";

const FeaturedMoviesCards = (props) => {
  const page_no = 1;

  return (
    <Link to={`/movie/${props.id}`}>
      <div className="w-full h-full ">
        <img
          src={props.backdrop}
          alt={props.title}
          className="w-full h-full rounded-[12px] brightness-[0.5]"
        />
        <img
          src={props.poster}
          alt={props.title}
          className="absolute top-0 w-[30%] h-[70%] m-5 rounded-2xl shadow-[2px_7px_14px_3px_rgba(0,_0,_0,_0.1)]"
        />
      </div>
    </Link>
  );
};

export default FeaturedMoviesCards;
