"use client"
import React, { useEffect, useState } from 'react';
import { IoIosArrowDropleftCircle } from "react-icons/io";
import TableKpi from './_components/tabelnilaikpi';
import TableKpiMonitoring from './_components/tabelnilaikpimonitoring';
import useUser from '@/hooks/use-user';
import Link from "next/link";


const Page = () => {
  const { loading, error, data: userData, getUserData } = useUser();

  useEffect(() => {
    getUserData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!userData) {
    return <div>No user data available</div>;
  }

  const { jabatan } = userData;


  return (
    <div className={`bg-[#EAEAEA] h-auto flex flex-col items-center sm:pt-[75px] pt-[60px] sm:pr-4 pr-3 sm:ml-20 ml-10`}>
      <div className="flex items-center w-full">
        <h2 className="sm:text-[40px] text-[24px] sm:ml-5 ml-4 font-semibold">
          Target Staff
        </h2>
        <Link href="/beranda">
        <IoIosArrowDropleftCircle className="sm:h-10 sm:w-10 h-5 w-5 sm:ml-3 ml-1" />
        </Link>
      </div>
      <div className="bg-white rounded-2xl h-auto sm:ml-5 ml-3 w-full sm:pt-10 pt-6 ">
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
