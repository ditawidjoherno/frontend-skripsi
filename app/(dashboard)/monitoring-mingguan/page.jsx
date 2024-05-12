"use client";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import MonitoringMingguan from "./_components/monitoringMingguan";

const page = () => {
    const router = useRouter();

    const handleGoBack = () => {
        router.back();
    };

    return (
        <div className={`bg-[#EAEAEA] h-full pb-4 flex flex-col items-center sm:pt-[75px] pt-[60px] sm:pr-5 pr-3 sm:ml-20 ml-10`}>
            <div className="flex items-center w-full justify-between">
                <div className="sm:ml-5 ml-4 flex items-center gap-3">
                    <h2 className="sm:text-[40px] text-[24px]  font-semibold">
                        Monitoring
                    </h2>
                    <div>
                    <IoIosArrowDropleftCircle
                        className="sm:h-10 sm:w-10 h-5 w-5 sm:ml-3 ml-0 transition-colors duration-300 hover:text-gray-400 focus:text-gray-400 cursor-pointer"
                        onClick={handleGoBack}
                    />
                </div>
                </div>
            </div>
            <div className="sm:ml-5 ml-3 w-full ">
                <div className="bg-[#056AAA] rounded-t-2xl sm:h-[65px] h-auto flex">
                    <h1 className="font-bold text-white sm:text-4xl text-xl sm:pl-11 pl-5 py-3">Mingguan</h1>
                </div>
                <div className="bg-white rounded-b-2xl h-auto">
                    <div className="container mx-auto py-3 gap-1">
                        <MonitoringMingguan />
                    </div>

                </div>
            </div>
        </div>

    );
};

export default page;

