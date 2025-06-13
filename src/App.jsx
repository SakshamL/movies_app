import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./Sections/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import Movies from "./Pages/Movies";
import HomePage from "./Pages/HomePage";
import TVShows from "./Pages/TVShows";
import Genres from "./Pages/Genres";
import VideoPlayer from "./Pages/VideoPlayer";

function App() {
  const [count, setCount] = useState(0);

  // This Code is to implement Scroll to Top on URL Change, in order to provide better user Experience..
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  // ----------------------------------

  return (
    <>
      <div>
        {/* Navbar */}

        <Navbar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/tv" element={<TVShows />} />
          <Route path="/genres" element={<Genres />} />
          <Route path="/movie/:id" element={<Movies />} />
          <Route path="/tv/:id" element={<TVShows />} />
          <Route path="/movie/:id/watch" element={<VideoPlayer />} />
        </Routes>

        {/* --------------------------------------- */}
      </div>
    </>
  );
}

export default App;
