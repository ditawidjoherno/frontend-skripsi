"use client";
import React from "react";
import { IoMenu } from "react-icons/io5";
import { IoExitOutline } from "react-icons/io5";
import ProfileButton from "./ProfileButton";
import Link from "next/link";

const Header = ({ setIsCollapse, isCollapse }) => {
  return (
    <header className={`bg-white md:px-6 w-full fixed top-0 z-10 shadow-md transition-all duration-700 md:py-2`} >
      <div className="flex items-center justify-between px-5">
        <button onClick={() => setIsCollapse(!isCollapse)}>
          <IoMenu className={`${isCollapse ? "md:ml-12 ml-44" : "md:ml-56 ml-6"} md:text-4xl text-2xl transition-all duration-500`} />
        </button>
        <div className="flex">
          <ProfileButton />
          <Link href="/">
            <IoExitOutline size={32} className="sm:ml-6 ml-4 my-2 transition-colors duration-300 hover:text-gray-400 focus:text-gray-400 cursor-pointer" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
