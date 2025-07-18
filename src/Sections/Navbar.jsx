import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

function Navbar() {
  const [clicked, setClicked] = useState(false);

  function handleResNavbar() {
    setClicked(!clicked);
    if (!clicked) {
      document.getElementById("navbar").classList.add("responsive-navbar");
      // document.body.style.overflow = "hidden";
    } else {
      document.getElementById("navbar").classList.remove("responsive-navbar");
      // document.body.style.overflow = "auto";
    }
  }

  return (
    <div className="flex items-center mt-5 lg:justify-between">
      <Link to="/" className="w-[200px] ml-[3%] md:w-[250px]  cursor-pointer">
        <img src="/logo.png" alt="logo" />
      </Link>
      <div
        className="text-white lg:hidden text-2xl cursor-pointer z-20 absolute right-5 top-10"
        onClick={handleResNavbar}
      >
        {!clicked ? <AiOutlineMenu /> : <AiOutlineClose />}
      </div>
      <div>
        {/* <ul
          id="navbar"
          className="max-md:hidden flex text-white  mr-30 max-md:flex-col max-md:absolute max-md:left-0 max-md:top-0 max-md:w-full max-md:h-full max-md:items-center max-md:bg-[#1f2138] max-md:z-10 max-md:pt-20;"
        > */}
        <ul id="navbar" className="hidden text-white max-lg:flex-col lg:flex ">
          <li className="">
            <NavLink
              to="/"
              onClick={handleResNavbar}
              className="max-lg:pr-20 max-lg:pl-20 mr-5 navbar-menu-items"
            >
              Home
            </NavLink>
          </li>
          <li className="">
            <NavLink
              to="/movies"
              onClick={handleResNavbar}
              className="max-lg:pr-20 max-lg:pl-20 mr-5 navbar-menu-items"
            >
              Movies
            </NavLink>
          </li>
          <li className="">
            <NavLink
              to="/tv"
              onClick={handleResNavbar}
              className="max-lg:pr-20 max-lg:pl-20 mr-5 navbar-menu-items"
            >
              TV Shows
            </NavLink>
          </li>
          <li className="">
            <NavLink
              to="/genres"
              onClick={handleResNavbar}
              className="max-lg:pr-20 max-lg:pl-20 mr-5 navbar-menu-items"
            >
              Genres
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
