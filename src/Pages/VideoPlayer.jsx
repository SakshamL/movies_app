import React from "react";
import { useParams } from "react-router-dom";

const VideoPlayer = () => {
  const { id } = useParams();
  return (
    <>
      <title>{"WatchAll Media"}</title>
      <div className="searchBar-gradient absolute top-0 left-0 w-[100dvw] h-[100dvh]">
        {/* <iframe
        width="100%"
        height="100%"
        src={`https://vidsrc.in/embed/movie?tmdb=${id}`}
        allowfullscreen="true"
        sandbox="allow-forms allow-pointer-lock allow-same-origin allow-scripts allow-top-navigation"
      ></iframe> */}
        {/* <iframe
        width="100%"
        height="100%"
        src={`https://player.autoembed.cc/embed/movie/${id}`}
        allowfullscreen="true"
      ></iframe> */}
        {/* <iframe
        width="100%"
        height="100%"
        src={`https://player.vidplus.to/embed/movie/${id}?autoplay=true&autonext=true&nextbutton=true&poster=true&title=true&watchparty=false&chromecast=false&servericon=true&icons=vid&primarycolor=6C63FF&secondarycolor=9F9BFF&iconcolor=FFFFFF`}
        allowfullscreen="true"
      ></iframe> */}
        <iframe
          width="100%"
          height="100%"
          src={`https://vidfast.pro/movie/${id}?autoPlay=true&server=Bollywood`}
          allowFullscreen="true"
        ></iframe>
      </div>
    </>
  );
};

export default VideoPlayer;
