"use client"
import React from 'react';
import { IoPodiumSharp } from "react-icons/io5";
import Box from './_components/Box';
import BoxProfil from './_components/BoxProfil';
import Link from 'next/link';
import { IoIosArrowDropleftCircle } from "react-icons/io";

const page = () => {

  const handleHarianClick = () => {
    window.location.href = '/data-harian';
  };

  const handleMingguanClick = () => {
    window.location.href = '/monitoring-mingguan';
  };

  const handleBulananClick = () => {
    window.location.href = '/monitoring-bulanan';
  };

  const handeSalesClick = () => {
    window.location.href = '/monitoring-sales';
  };



  return (
    <div className={`bg-[#EAEAEA] h-auto flex flex-col items-center sm:pt-[75px] pt-[60px] sm:pr-4 pr-3 sm:ml-20 ml-10`}>
      <div className="flex items-center w-full">
        <h2 className="sm:text-[40px] text-[24px] sm:ml-5 ml-4 font-semibold">
          Monitoring
        </h2>
        <Link href="/beranda">
          <IoIosArrowDropleftCircle className="sm:h-10 sm:w-10 h-5 w-5 sm:ml-3 ml-1" />
        </Link>
      </div>
      <div className="flex w-full px-6 gap-5">
        <Box
          bgColor={"bg-[#059BC7]"}
          icon={<IoPodiumSharp className="text-[#FFCD27] ml-9 mt-7" />}
          text={"Harian"}
          number={50}
          onClick={handleHarianClick}
        />
        <Box
          bgColor={"bg-[#056AAA]"}
          icon={<IoPodiumSharp className="text-[#FFCD27] ml-9 mt-7" />}
          text={"Mingguan"}
          number={120}
          onClick={handleMingguanClick}
        />
        <Box
          bgColor={"bg-[#1D2B53]"}
          icon={<IoPodiumSharp className="text-[#FFCD27] ml-9 mt-7" />}
          text={"Bulanan"}
          number={"1.200"}
          onClick={handleBulananClick}
        />

      </div>
      <div className="h-50 flex sm:w-full w-4/4 sm:mx-7 mx-6 flex-wrap justify-start sm:gap-5 gap-3 lg:items-start sm:pl-9 pl-1 pr-1 sm:mt-7 mt-5 px-4 sm:pt-0">
        <div className='w-full flex gap-3'>
          <div className='w-1/2 '>
            <BoxProfil
              bgColor={"bg-[#ffffff]"}
              image={"img/profil.png"}
              text={"Lorem ipsum"}
              onClick={handeSalesClick}
            />
            <BoxProfil
              bgColor={"bg-[#ffffff]"}
              image={"img/profil.png"}
              text={"Lorem ipsum"}
            />
            <BoxProfil
              bgColor={"bg-[#ffffff]"}
              image={"img/profil.png"}
              text={"Lorem ipsum"}
            />
            <BoxProfil
              bgColor={"bg-[#ffffff]"}
              image={"img/profil.png"}
              text={"Lorem ipsum"}
            />
          </div>
          <div className='sm:w-1/2 w-full sm:ml-0 ml-9'>
            <BoxProfil
              bgColor={"bg-[#ffffff]"}
              image={"img/profil.png"}
              text={"Lorem ipsum"}
            />
            <BoxProfil
              bgColor={"bg-[#ffffff]"}
              image={"img/profil.png"}
              text={"Lorem ipsum"}
            />
            <BoxProfil
              bgColor={"bg-[#ffffff]"}
              image={"img/profil.png"}
              text={"Lorem ipsum"}
            />
          </div>
        </div>

      </div>
    </div>
  );
}

export default page;