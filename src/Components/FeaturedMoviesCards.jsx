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
        <div className="flex flex-row text-[#f4f4f47b] text-xl font-bold absolute top-0 m-5">
          <img
            src={props.poster}
            alt={props.title}
            className=" w-[35%] h-[70%]  rounded-2xl shadow-[2px_7px_14px_3px_rgba(0,_0,_0,_0.1)]"
          />
          <div className="pl-5">
            <p className="mb-5">{props.title}</p>
            {props.vote ? (
              <div className="flex items-center">
                {props.vote.toFixed(2)}
                <img src="/star.png" alt="star" className="w-[20px] h-full" />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FeaturedMoviesCards;
