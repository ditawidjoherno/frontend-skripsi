"use client";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import Button from "./_components/button";
import React, { useState } from 'react';
import Box from "./_components/box";
import { IoPodiumSharp } from "react-icons/io5";

const page = () => {

  return (
    <div className={`bg-[#EAEAEA] h-full pb-4 flex flex-col items-center sm:pt-[75px] pt-[60px] sm:pr-5 pr-3 sm:ml-20 ml-10`}>
      <div className="flex items-center w-full justify-between">
        <div className="sm:ml-5 ml-4 flex items-center gap-3">
          <h2 className="sm:text-[40px] text-[24px]  font-semibold">
            Monitoring
          </h2>
          <IoIosArrowDropleftCircle className="sm:h-10 sm:w-10 h-5 w-5  " />
        </div>
      </div>
      <div className="sm:ml-5 ml-3 w-full ">
        <div className="bg-[#1D2B53] rounded-t-2xl h-[65px] flex">
          <h1 className="font-bold text-white text-4xl pl-11 pt-3">Bulanan</h1>
        </div>
        <div className="bg-white rounded-b-2xl h-auto">
          <div className="px-5 py-4">
            <div className="flex gap-5 ">
              <Box
                bgColor={"bg-[#1D2B53]"}
                icon={<IoPodiumSharp className="text-[#FFCD27] ml-9 mt-7" />}
                text={"Januari"}
                number={25}
              />
              <Box
                bgColor={"bg-[#1D2B53]"}
                icon={<IoPodiumSharp className="text-[#FFCD27] ml-9 mt-7" />}
                text={"Februari"}
                number={25}
              />
              <Box
                bgColor={"bg-[#1D2B53]"}
                icon={<IoPodiumSharp className="text-[#FFCD27] ml-9 mt-7" />}
                text={"Maret"}
                number={25}
              />
            </div>
            <div className="flex gap-5 mt-5">
              <Box
                bgColor={"bg-[#1D2B53]"}
                icon={<IoPodiumSharp className="text-[#FFCD27] ml-9 mt-7" />}
                text={"April"}
                number={25}
              />
              <Box
                bgColor={"bg-[#1D2B53]"}
                icon={<IoPodiumSharp className="text-[#FFCD27] ml-9 mt-7" />}
                text={"Mei"}
                number={25}
              />
              <Box
                bgColor={"bg-[#1D2B53]"}
                icon={<IoPodiumSharp className="text-[#FFCD27] ml-9 mt-7" />}
                text={"Juni"}
                number={25}
              />
            </div>
            <div className="flex gap-5 mt-5">
              <Box
                bgColor={"bg-[#1D2B53]"}
                icon={<IoPodiumSharp className="text-[#FFCD27] ml-9 mt-7" />}
                text={"Juli"}
                number={25}
              />
              <Box
                bgColor={"bg-[#1D2B53]"}
                icon={<IoPodiumSharp className="text-[#FFCD27] ml-9 mt-7" />}
                text={"Agustus"}
                number={25}
              />
              <Box
                bgColor={"bg-[#1D2B53]"}
                icon={<IoPodiumSharp className="text-[#FFCD27] ml-9 mt-7" />}
                text={"September"}
                number={25}
              />
            </div>
            <div className="flex gap-5 mt-5">
              <Box
                bgColor={"bg-[#1D2B53]"}
                icon={<IoPodiumSharp className="text-[#FFCD27] ml-9 mt-7" />}
                text={"Okteber"}
                number={25}
              />
              <Box
                bgColor={"bg-[#1D2B53]"}
                icon={<IoPodiumSharp className="text-[#FFCD27] ml-9 mt-7" />}
                text={"November"}
                number={25}
              />
              <Box
                bgColor={"bg-[#1D2B53]"}
                icon={<IoPodiumSharp className="text-[#FFCD27] ml-9 mt-7" />}
                text={"Desember"}
                number={25}
              />
            </div>
          </div>

        </div>
      </div>
    </div>

  );
};

export default page;