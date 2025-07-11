import React from "react";
import { useState, useEffect } from "react";
import { search_api } from "../Services/api";
import SearchCard from "./SearchCard";

const IMGPATH = "https://image.tmdb.org/t/p/w1280";

function SearchBar() {
  const [searched, setSearched] = useState("");
  const [searchedResults, setSearchResults] = useState([]);

  useEffect(() => {
    getSearchedItems();
  }, [searched]);

  const handleSearchResults = (e) => {
    e.target.value
      ? document.getElementById("searchResults").classList.add("search-results")
      : document
          .getElementById("searchResults")
          .classList.remove("search-results");
    setSearched(e.target.value);
  };

  const getSearchedItems = async () => {
    const response = await fetch(search_api[0] + searched + search_api[2]);
    const responseJSON = await response.json();
    setSearchResults(responseJSON.results);
  };

  return (
    <div className="relative w-full">
      <input
        id="search"
        type="text"
        placeholder="Search Movies and TV Shows"
        className="rounded-[10px] w-full outline-0 border-2 p-3 pl-5 border-[#8080803b] text-[grey]"
        onChange={handleSearchResults}
        value={searched}
      />
      <div
        id="searchResults"
        className="text-2xl text-[grey] flex justify-center items-center searchBar-gradient h-0 invisible  "
      >
        {" "}
        {searchedResults.length > 0 ? (
          searchedResults.map((result) => {
            return (
              <>
                <div className="h-[200px] w-[150px] relative">
                  <SearchCard
                    key={result.id}
                    id={result.id}
                    title={result.title}
                    poster_path={
                      result.poster_path === null
                        ? `no-poster.jpg`
                        : IMGPATH + result.poster_path
                    }
                    vote={result.vote_average}
                  />
                </div>
              </>
            );
          })
        ) : (
          <p>No Result Found..!!</p>
        )}
      </div>
    </div>
  );
}

export default SearchBar;
