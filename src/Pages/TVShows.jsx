import React from "react";
import { useParams } from "react-router-dom";

function TVShows() {
  const { id } = useParams();

  return (
    <div className="text-2xl font-bold text-white flex justify-center mt-20">
      Here , we Can see list of all TV Shows
      <span className="text-amber-600">{id}</span>
    </div>
  );
}

export default TVShows;
