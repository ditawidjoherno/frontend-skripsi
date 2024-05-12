"use client";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import Button from "./_components/button";
import React, { useEffect, useState } from 'react';
import Box from "./_components/box";
import { IoPodiumSharp } from "react-icons/io5";
import Link from "next/link";
import useTotalAktivitasBulanan from "@/hooks/use-total-aktivitas-bulanan";
import { useRouter } from 'next/navigation';

const Page = () => {

  const router = useRouter();

  const { loading, error, data, getTotalAktivitas } = useTotalAktivitasBulanan();

  useEffect(() => {
    const fetchTotalAktivitas = async () => {
      await getTotalAktivitas();
    };

    fetchTotalAktivitas();
  }, []);

  const dataArray = data ? Object.entries(data) : [];
  
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleGoBack = () => {
    router.back();
};

  return (
    <div className={`bg-[#EAEAEA] h-full pb-4 flex flex-col items-center sm:pt-[75px] pt-[60px] sm:pr-5 pr-3 sm:ml-20 ml-10`}>
      <div className="flex items-center w-full justify-between">
        <div className="sm:ml-5 ml-4 flex items-center gap-3">
          <h2 className="sm:text-[40px] text-[24px] font-semibold">Monitoring</h2>
          <div>
          <IoIosArrowDropleftCircle
                        className="sm:h-10 sm:w-10 h-5 w-5 sm:ml-3 ml-0 transition-colors duration-300 hover:text-gray-400 focus:text-gray-400 cursor-pointer"
                        onClick={handleGoBack}
                    />
                </div>
        </div>
      </div>
      <div className="sm:ml-5 ml-3 w-full ">
        <div className="bg-[#1D2B53] rounded-t-2xl h-[65px] flex">
          <h1 className="font-bold text-white text-4xl pl-11 pt-3">Bulanan</h1>
        </div>
        <div className="bg-white rounded-b-2xl h-auto">
          <div className="px-5 py-4">
            <div className="grid sm:grid-cols-3 grid-cols-2 gap-4 ">
              {dataArray.map(([month, total], index) => (
                <Box
                  key={index}
                  bgColor={"bg-[#1D2B53]"}
                  icon={<IoPodiumSharp className="text-[#FFCD27] ml-9 mt-7" />}
                  text={capitalizeFirstLetter(month)}
                  bulan={month}
                  number={total}
                  className={"hover:bg-[#293d74] transition duration-300"}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
