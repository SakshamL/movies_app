import React from "react";
import { Link } from "react-router-dom";

const FeaturedMoviesCards = (props) => {
  const page_no = 1;

  return (
    <Link to={`/movie/${props.id}`}>
      <div className="featuredcards relative w-full h-full hover:scale-[1.05] duration-200 ease-in-out overflow-hidden ">
        <img
          src={props.backdrop}
          alt={props.title}
          className="w-full h-full rounded-[12px] duration-200 "
        />
        <div className="w-full text-[#ffffff] text-[15px] font-semibold absolute bottom-[-100px] duration-200 ease-in-out ">
          <p className="pb-3 pl-2 ">{props.title}</p>
        </div>
      </div>
    </Link>
  );
};

export default FeaturedMoviesCards;
