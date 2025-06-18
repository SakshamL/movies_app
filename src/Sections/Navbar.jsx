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
    <div className="flex flex-row place-content-between p-5 items-center ml-20 mr-20 max-sm:justify-center">
      <div
        className="text-white lg:hidden absolute top-[5%] right-[5%] text-2xl cursor-pointer z-20"
        onClick={handleResNavbar}
      >
        {!clicked ? <AiOutlineMenu /> : <AiOutlineClose />}
      </div>
      <Link to="/" className="w-[15%] max-sm:w-[70%] cursor-pointer">
        <img src="/logo.png" alt="logo" />
      </Link>
      <div>
        <ul
          id="navbar"
          className="max-lg:hidden flex text-white  mr-30 max-lg:flex-col max-lg:absolute max-lg:left-0 max-lg:top-0 max-lg:w-full max-lg:h-full max-lg:items-center max-lg:bg-[#1f2138] max-lg:z-10 max-lg:pt-20;"
        >
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
