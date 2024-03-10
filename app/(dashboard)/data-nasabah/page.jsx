"use client"
import { FaEdit } from "react-icons/fa";
import React, { useState } from 'react';
import Search from './_components/search';
import Link from 'next/link';
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { ImProfile } from "react-icons/im";


const page = () => {

  const [searchResults, setSearchResults] = useState([]);

  const handleInputClick = () => {
    window.location.href = '/inputdata-nasabah=';
  };

  const handleSearch = (query) => {
    console.log('Searching for:', query);
  };


  return (
    <div className={`bg-[#EAEAEA] h-auto flex flex-col items-center sm:pt-[75px] pt-[60px] sm:pr-4 pr-3 sm:ml-20 ml-10`}>
      <div className="flex justify-between w-full">
        <div className='flex items-center'>
          <h2 className="sm:text-[40px] text-[24px] sm:ml-5 ml-4 font-semibold">
            Data Nasabah
          </h2>
          <Link href="/beranda">
            <IoIosArrowDropleftCircle className="sm:h-10 sm:w-10 h-5 w-5 sm:ml-3 ml-1" />
          </Link>
        </div>
          <div className="flex items-center">
            <Search onSearch={handleSearch} className="sm:mt-0 -mt-11 sm:h-9 h-6 sm:w-12 w-9" />
            <ul>
              {searchResults.map((result, index) => (
                <li key={index}>{result}</li>
              ))}
            </ul>
          </div>

      </div>

      <div className="sm:ml-5 ml-3 w-full gap-9 mt-5">
        <div className="bg-[#251382] justify-between rounded-t-2xl h-[65px] flex">
          <div className='flex'>
            <h1 className="font-bold text-white sm:text-3xl text-[25px] pl-5 pt-4">Jumlah Nasabah: </h1>
            <h1 className="font-bold text-white sm:text-3xl text-[25px] pl-5 pt-4">50</h1>
          </div>
          <button
            className="bg-blue-500 hover:bg-[#77c9ff] text-white font-semibold px-4 py-2 sm:my-3 rounded-md mr-3"
            onClick={handleInputClick}
          >
            Tambah Data
          </button>
        </div>
        <div className="bg-white rounded-b-2xl sm:h-[700px] h-[500px] overflow-x-scroll">
          <table className="table-auto border-collapse w-full text-center overflow-x-acroll">
            <thead>
              <tr>
                <th className="px-5 sm:py-4 py-2">No</th>
                <th className="px-17 sm:py-4 py-2">Nama Nasabah</th>
                <th className="px-17 sm:py-4 py-2">Status Nasabah</th>
                <th className="px-17 sm:py-4 py-2">Alamat</th>
                <th className="px-17 sm:py-4 py-2 ">Data Pekerjaan / Usaha</th>
                <th className="px-17 sm:py-4 py-2">Detail</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td><Link href={`/profil-nasabah`}>
                  <div className="text-black hover:text-blue-700 cursor-pointer">lorem ipsum</div>
                </Link>
                </td>
                <td>tes</td>
                <td>Lorem Ipsum</td>
                <td>Lorem Ipsum</td>
                <td>
                  <div className="w-full justify-center gap-3 flex items-center">
                    <Link href="/profil-nasabah">
                    <div className="bg-[#ffe946] hover:bg-[#f9ee98] py-2 px-2 rounded-md items-center flex">
                    <ImProfile className="sm:h-5 sm:w-5 h-3 w-3" />
                    </div>
                    </Link>
                    <Link href="/ubah-datanasabah">
                    <div className="bg-[#ffe946] hover:bg-[#f9ee98] py-2 px-2 rounded-md items-center flex">
                    <FaEdit className="sm:h-5 sm:w-5 h-3 w-3" />
                    </div>                    </Link>
                  </div>
                </td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default page;