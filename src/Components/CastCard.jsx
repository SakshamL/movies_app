import React from "react";
import { Link } from "react-router-dom";

function CastCard(props) {
  return (
    <>
      <Link>
        <div className="w-full h-full border-[1px] border-[#6f9fe656] rounded-[14px] flex flex-col ">
          <img
            src={props.image}
            alt={props.name}
            className="w-full h-[70%] rounded-tr-[14px] rounded-tl-[14px]"
          />
          <p className="text-center text-[14px] pr-[5px] pl-[5px] mt-[5px] krub-regular">
            {props.name}
          </p>
          <p className="text-center text-[14px] text-[#ffffff7e] mt-[3px] mb-[-20px] krub-regular">
            {props.char}
          </p>
        </div>
      </Link>
    </>
  );
}

export default CastCard;
