"use client";
import { IoTimeSharp } from "react-icons/io5";

const Box = ({ bgColor, icon, text, number }) => {
  return (
    <div
      className={`${bgColor} sm:h-[180px] sm:w-[400px] h-[120px] w-full flex rounded-lg`}
    >
      <div className="w-full h-full flex-col sm:pb-8 pb-4">
        <p className="text-white text-3xl font-semibold ml-7 sm:pt-6 pt-2 h-1/4">
          {text}
        </p>
        <div className="flex justify-between items-center h-3/4 px-6">
          <div className="h-full items-end flex sm:ml-7">
            <p className="font-semibold sm:text-6xl text-5xl text-white">
              {number}
            </p>
          </div>
          <div className="sm:mb-5 mb-10 text-8xl">{icon}</div>
        </div>
      </div>
    </div>
  );
};

export default Box;
