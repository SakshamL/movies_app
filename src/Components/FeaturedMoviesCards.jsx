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
          className="w-full h-full rounded-[12px]  "
        />
        <div className="w-full text-[#ffffff] text-xl font-semibold absolute bottom-[-100px] duration-200 ease-in-out ">
          <p className="bg-[#382d52d5] pb-3 rounded-br-[12px] rounded-bl-[12px]">
            {props.title}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default FeaturedMoviesCards;
