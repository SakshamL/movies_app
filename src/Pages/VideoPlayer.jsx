import React from "react";
import { useParams } from "react-router-dom";

const VideoPlayer = () => {
  const { id } = useParams();
  return (
    <div className="searchBar-gradient absolute top-0 left-0 w-[100dvw] h-[100dvh]">
      <iframe
        width="100%"
        height="100%"
        src={`https://vidsrc.xyz/embed/movie?tmdb=${id}`}
        allowfullscreen="true"
      ></iframe>
    </div>
  );
};

export default VideoPlayer;
