"use client"
import { FaEdit } from "react-icons/fa";
import React, { useState, useEffect } from 'react';
import Search from '../_components/search';
import Link from 'next/link';
import { IoIosArrowDropleftCircle } from "react-icons/io";
import useDataAktivitas from "@/hooks/use-aktivitas";
import useUser from "@/hooks/use-user";
import { useParams } from 'next/navigation';
import { IoSearchOutline } from "react-icons/io5";



const page = () => {

  const { aktivitas } = useParams();

  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);
  const { loading: dataLoading, error: dataError, data, getUserData } = useDataAktivitas(aktivitas);
  const [tableData, setTableData] = useState([]);
  const { loading: userLoading, error: userError, data: userData, getUserData: userGetData } = useUser();


  useEffect(() => {
    getUserData();
    userGetData();
  }, []);


  // useEffect(() => {
  //     handleGetDataUser();
  // }, [])

  const handleSearch = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
    setIsSearchActive(true);
  };


  useEffect(() => {
    const jumlahAktivitas = tableData.length;
    console.log("Jumlah Nasabah:", jumlahAktivitas);
  }, [tableData]);

  useEffect(() => {
    if (data) {
      setTableData(data);
    }
  }, [data]);

  if (!userData) {
    return <div>No user data available</div>;
  }
  
  // Memeriksa apakah userData ada dan memiliki properti jabatan sebelum mengaksesnya
  const jabatan = userData && userData.jabatan;

  // if (loading) {
  //   return (
  //     <div>Loading</div>
  //   );
  // }

  // if (error) {
  //   return (
  //     <div>Error: {error.message}</div>
  //   );
  // }

  const handleInputClick = () => {
    window.location.href = '/inputdata';
  };


  return (
    <div className={`bg-[#EAEAEA] h-auto flex flex-col items-center sm:pt-[75px] pt-[60px] sm:pr-4 pr-3 sm:ml-20 ml-10`}>
      <div className="flex justify-between w-full">
        <div className='flex items-center'>
          <h2 className="sm:text-[40px] text-[24px] sm:ml-5 ml-4 font-semibold">
            Data Aktivitas
          </h2>
          <Link href="/beranda">
            <IoIosArrowDropleftCircle className="sm:h-10 sm:w-10 h-5 w-5 sm:ml-3 ml-1" />
          </Link>
        </div>
        <div className="flex items-center">
        <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
            className="border-2 border-gray-300 px-4 py-2 sm:rounded-l-2xl rounded-l-lg focus:outline-none focus:border-blue-500 sm:w-[270px] w-[100px] sm:h-[40px] h-[30px]"
          />
          <button type="submit" className="bg-[#FFE500] text-black border-black px-1 py-1 sm:rounded-r-2xl rounded-r-lg hover:bg-[#f6f0ba] sm:w-[40px] w-[30px] sm:h-[40px] h-[30px] focus:outline-none">
            <IoSearchOutline className="sm:w-6 w-4 sm:h-6 h-4" />
          </button>
        </div>

      </div>

      <div className="sm:ml-5 ml-3 w-full gap-9 mt-5">
        <div className="bg-[#251382] justify-between rounded-t-2xl h-[65px] flex">
        <div className='flex'>
            <h1 className="font-bold text-white sm:text-3xl text-[25px] pl-5 pt-4">Jumlah Aktivitas: {tableData.length} </h1>
            {/* <h1 className="font-bold text-white sm:text-3xl text-[25px] pl-5 pt-4">50</h1> */}
          </div>
          {userData.jabatan !== 'manager' && (
            <button
              className="bg-blue-500 hover:bg-[#77c9ff] text-white font-semibold px-4 py-2 sm:my-3 rounded-md mr-3"
              onClick={handleInputClick}
            >
              Tambah Data
            </button>
          )}
        </div>
        <div className="bg-white rounded-b-2xl sm:h-[700px] h-[500px] overflow-x-scroll">
          <table className="table-auto border-collapse w-full text-center overflow-x-acroll">
            <thead>
              <tr>
                <th className="px-5 sm:py-4 py-2">No</th>
                <th className="px-14 sm:py-4 py-2">Nama Nasabah</th>
                <th className="px-14 sm:py-4 py-2">Tipe Nasabah</th>
                <th className="px-14 sm:py-4 py-2 ">Prospek</th>
                <th className="px-14 sm:py-4 py-2">Nominal Prospek</th>
                <th className="px-14 sm:py-4 py-2">Aktivitas Sales</th>
                <th className="px-14 sm:py-4 py-2">Closing</th>
                <th className="px-14 sm:py-4 py-2">Key Person</th>
                <th className="px-14 sm:py-4 py-2">Status Aktivitas</th>
                <th className="px-14 sm:py-4 py-2">Status Prospek</th>
                <th className="px-14 sm:py-4 py-2">Detail</th>
              </tr>
            </thead>
            <tbody>
              {data && data.length > 0 ? (
                data.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.nama}</td>
                    <td>{item.tipe_nasabah}</td>
                    <td>{item.alamat}</td>
                    <td>{item.pekerjaan}</td>
                    <td>
                      <div className="w-full justify-center gap-3 flex items-center">
                        <Link href="/ubah-datanasabah">
                          <div className="bg-[#ffe946] hover:bg-[#f9ee98] py-2 px-2 rounded-md items-center flex">
                            <FaEdit className="sm:h-5 sm:w-5 h-3 w-3" />
                          </div>                    </Link>
                      </div>
                    </td>

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
    </div>
  );
}

export default page;