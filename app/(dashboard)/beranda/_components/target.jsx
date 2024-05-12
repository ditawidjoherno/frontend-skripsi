"use client"
import React from "react";
import { IoNewspaperSharp } from "react-icons/io5";
import { IoFilterSharp } from "react-icons/io5";
import { IoSearchOutline } from "react-icons/io5";
import Link from "next/link";
import { useState, useEffect } from 'react';
import useTargetHarianStaff from "@/hooks/use-target-harian";

const TargetHarian = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);
  const {  data, getUserData } = useTargetHarianStaff();

  const handleGetDataUser = async () => {
    await getUserData();
  }

  useEffect(() => {
    handleGetDataUser();
  }, [])

  const handleSearch = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
    setIsSearchActive(true);
  };

  useEffect(() => {
    getUserData();
  }, []);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

  return (
    <div className="bg-white md:flex-row flex-col sm:ml-11 sm:mt-10 mt-4 rounded-2xl sm:h-[250px] h-[220px] sm:w-auto w-[300px]">
      <div className="flex sm:mx-9 items-center mx-5 pt-4 justify-between ">
        {/* <Link href="/recentdata"> */}
          <div className="flex gap-2 items-center">
            <IoNewspaperSharp className="sm:text-3xl text-2xl" />
            <p className="sm:text-[22px] text-[16px] font-semibold">
              Target Harian
            </p>
          </div>
        {/* </Link> */}
      </div>
      <hr className="border-t border-black my-3 mx-6 " />
      <div className="bg-white rounded-b-2xl">
      <table className="table-auto border-collapse w-full">
          <thead>
            <tr>
              <th className="sm:px-3 px-7 sm:py-1 py-0">No</th>
              <th className="sm:px-12 px-7 sm:py-1 py-0">Target Harian</th>
            </tr>
          </thead>
          <tbody>
              {data && data.length > 0 ? (
                data.map((item, index) => (
                  <tr key={index}>
                    <td className="text-center">{index + 1}</td>
                  <td >{capitalizeFirstLetter(item)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">Belum ada data yang ditambahkan</td>
                </tr>
              )}
            </tbody>
        </table>
      </div>
    </div>

  );
};

export default TargetHarian;