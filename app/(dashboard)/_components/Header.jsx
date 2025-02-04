"use client";
import React, { useState } from "react";
import { IoMenu } from "react-icons/io5";
import { IoExitOutline } from "react-icons/io5";
import ProfileButton from "./ProfileButton";
import Link from "next/link";
import { FaSpinner } from 'react-icons/fa';


const Header = ({ setIsCollapse, isCollapse }) => {
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
      setLoading(true);
  };
  return (
    <header className={`bg-white md:px-6 w-full fixed top-0 z-10 shadow-md transition-all duration-700 md:py-2`} >
      <div className="flex items-center justify-between px-5">
        <button onClick={() => setIsCollapse(!isCollapse)}>
          <IoMenu className={`${isCollapse ? "md:ml-12 ml-44" : "md:ml-56 ml-6"} md:text-4xl text-2xl transition-all duration-500`} />
        </button>
        <div className="flex">
          <ProfileButton />
          <Link href="/">
          <button onClick={handleLogout} className="flex items-center sm:ml-6 ml-2 my-2 sm:text-lg text-sm transition-colors duration-300 hover:text-gray-400 focus:text-gray-400 cursor-pointer">
                    {loading ? ( 
                        <FaSpinner className="animate-spin mr-2" />
                    ) : (
                        <IoExitOutline className="sm:w-10 sm:h-10  w-5 h-5" />
                    )}
                    Logout
                </button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
