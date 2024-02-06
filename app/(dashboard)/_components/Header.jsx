"use client";
import React from "react";
import { IoMenu } from "react-icons/io5";
import { IoExitOutline } from "react-icons/io5";
import ProfileButton from "./ProfileButton";

const Header = ({ setIsCollapse, isCollapse }) => {
  return (
    <header className={`bg-white ${isCollapse ? "pl-12" : "pl-56"} transition-all duration-700 py-2 shadow`} >
      <div className="flex items-center justify-between px-5">
        <button onClick={() => setIsCollapse(!isCollapse)}>
          <IoMenu size={37} className="sm:ml-7" />
        </button>
        <div className="flex">
          <ProfileButton />
          <button>
            <IoExitOutline size={32} className="sm:ml-6 ml-4 my-2" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
