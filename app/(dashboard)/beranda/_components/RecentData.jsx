"use client"
import React from "react";
import { IoNewspaperSharp } from "react-icons/io5";
import { IoFilterSharp } from "react-icons/io5";
import { IoSearchOutline } from "react-icons/io5";
import Link from "next/link";
import { useState, useEffect } from 'react';
import useRecentData from "@/hooks/use-recent-data";

const RecentData = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);
  const { loading, error, data, getUserData } = useRecentData();

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


  return (
    <div className="bg-white md:flex-row flex-col sm:ml-11 sm:mt-10 mt-4 rounded-2xl sm:h-[350px] h-[220px] sm:w-auto w-[300px] ">
      <div className="flex sm:mx-9 items-center mx-5 pt-4 justify-between ">
        <Link href="/recentdata">
          <div className="flex gap-2 items-center">
            <IoNewspaperSharp className="sm:text-3xl text-2xl" />
            <p className="sm:text-[22px] text-[16px] font-semibold">
              Recent Data
            </p>
          </div>
        </Link>
        <div className='flex'>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
            className="border-2 border-gray-300 sm:w-[130px] w-[80px] sm:h-[32px] h-[30px] sm:rounded-l-xl rounded-l-lg focus:outline-none focus:border-blue-500 px-2 py-2"
          />
          <button type="submit" className="bg-[#FFE500] text-black border-black sm:rounded-r-xl rounded-r-lg hover:bg-[#f6f0ba] focus:outline-none sm:w-[40px] w-[30px] sm:h-[32px] h-[30px] items-center sm:px-2 px-1 sm:py-2 py-1
          ">
            <IoSearchOutline size={20} />
          </button>
        </div>
      </div>
      <hr className="border-t border-black my-3 mx-6 " />
      <div className="bg-white rounded-b-2xl sm:h-[250px] h-[150px] overflow-x-scroll">
        <table className="table-auto border-collapse w-full text-center">
          <thead>
            <tr>
              <th className="sm:px-12 px-7 sm:py-1 py-0">Nama</th>
              <th className="sm:px-12 px-7 sm:py-1 py-0">Tanggal Prospek</th>
              <th className="sm:px-12 px-7 sm:py-1 py-0">Nama Nasabah</th>
              <th className="sm:px-12 px-7 sm:py-1 py-0">Aktivitas</th>
            </tr>
          </thead>
          <tbody>
              {data && data.length > 0 ? (
                data.map((item, index) => (
                  <tr key={index}>
                    <td className="flex items-center sm:py-2 py-1 sm:px-4 px-1 ml-2">
                      <img src={item.profil} alt={item?.nama} className="sm:w-8 w-6 sm:h-8 h-6 sm:mr-4 mr-2" />
                      <span>{item.nama} </span>
                    </td>
                    <td>{item.tanggal}</td>
                    <td><Link href={`/profil_nasabah`}>
                      <div className="text-black hover:text-blue-700 cursor-pointer">{item.nama_nasabah}</div>
                    </Link>
                    </td>
                    <td>{item.aktivitas}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">Belum ada data yang ditambahkan</td>
                </tr>
              )}
            </tbody>
        </table>
      </div>
    </div>

  );
};

export default RecentData;