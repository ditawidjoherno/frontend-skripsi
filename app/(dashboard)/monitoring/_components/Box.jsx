"use client";
import { IoTimeSharp } from "react-icons/io5";

const Box = ({ bgColor, icon, text, number, onClick, className }) => {
  return (
    <div
      className={`sm:h-[190px] sm:w-[420px] w-[315px] h-[120px] flex rounded-lg cursor-pointer ${bgColor} ${className}`} 
      onClick={onClick}
    >
      <div className="w-full h-full flex-col sm:pb-8 pb-4">
        <p className="text-white text-xl font-bold ml-7 sm:pt-6 pt-2 h-1/4">
          {text}
        </p>
        <div className="flex justify-between items-center h-3/4 px-6">
          <div className="h-full items-end flex sm:ml-7">
            <p className="font-semibold sm:text-5xl text-3xl mb-3 ml-2 text-white">
              {number}
            </p>
          </div>
          <div className="sm:mb-2 mb-10 text-7xl">{icon}</div>
        </div>
        <div className=" h-full items-end flex sm:ml-7"></div>
      </div>
    </div>
  );
};

export default Box;
