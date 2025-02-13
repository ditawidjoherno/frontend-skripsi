"use client"
import React, { useEffect, useState } from 'react';
import { IoIosArrowDropleftCircle } from "react-icons/io";
import TableKpi from './_components/tabelnilaikpi';
import TableKpiMonitoring from './_components/tabelnilaikpimonitoring';
import useUser from '@/hooks/use-user';
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { FaSpinner } from 'react-icons/fa';

const Page = () => {
  const router = useRouter();

  const { loading, error, data: userData, getUserData } = useUser();

  useEffect(() => {
    getUserData();
  }, []);


  if (error) {
    return;
  }

  if (!userData) {
    return;
  }

  if (loading) {
    return (
        <div className="fixed inset-0 flex items-center justify-center">
            <FaSpinner className="animate-spin mr-2" /> Loading
        </div>
    );
}

  const { jabatan } = userData;

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className={`bg-[#EAEAEA] h-auto flex flex-col items-center sm:pt-[75px] pt-[60px] sm:pr-4 pr-3 sm:ml-20 ml-10`}>
      <div className="flex items-center w-full">
        <h2 className="sm:text-[40px] text-[24px] sm:ml-5 ml-4 font-semibold">
          Target Staff
        </h2>
        <div>
          <IoIosArrowDropleftCircle
            className="sm:h-10 sm:w-10 h-5 w-5 sm:ml-3 ml-0 transition-colors duration-300 hover:text-gray-400 focus:text-gray-400 cursor-pointer"
            onClick={handleGoBack}
          />
        </div>
      </div>
      <div className="bg-white rounded-2xl h-auto sm:ml-5 ml-3 sm:mb-3 mb-1 w-full sm:pt-10 pt-6 ">
        <div className='mx-9'>
          {(jabatan === 'staff') && (
            <TableKpi />
          )}

          {(jabatan === 'manager') && (
            <TableKpiMonitoring />
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
