"use client"
import { FaEdit } from "react-icons/fa";
import React, { useState, useEffect } from 'react';
import { IoIosArrowDropleftCircle } from "react-icons/io";
import useUser from "@/hooks/use-user";
import { useRouter } from 'next/navigation';
import { ImProfile } from "react-icons/im";
import { IoSearchOutline } from "react-icons/io5";
import useAktivitasBulanan from "@/hooks/use-aktivitas-bulan";
import Link from "next/link";



const Page = () => {

  const router = useRouter()

  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);
  const { data, getUserData } = useAktivitasBulanan();
  const [tableData, setTableData] = useState([]);
  const { data: userData, getUserData: userGetData } = useUser();


  useEffect(() => {
    getUserData();
    userGetData();
  }, []);


  const handleSearch = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
    setIsSearchActive(true);
  };

  console.log(data)

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


  const handleInputClick = () => {
    window.location.href = '/inputdata';
  };


  return (
    <div className={`bg-[#EAEAEA] h-auto flex flex-col items-center sm:pt-[75px] pt-[60px] sm:pr-4 pr-3 sm:ml-20 ml-10`}>
      <div className="sm:flex items-center w-full sm:justify-between">
        <div className="sm:ml-5 ml-3 flex items-center sm:gap-3 gap-1 ">
          <h2 className="sm:text-4xl text-[24px] sm:pt-2 pt-7 font-bold sm:-mt-2 -mt-7 ">
            Data Aktivitas
          </h2>
          <Link href="/monitoring">
            <IoIosArrowDropleftCircle className="sm:h-10 sm:w-10 h-5 w-5 sm:ml-3 ml-0" />
          </Link>
        </div>
        <div className='flex justify-center gap-1 sm:mr-5'>
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearch}
              className="border-2 border-gray-300 px-4 py-2 sm:rounded-l-2xl rounded-l-lg focus:outline-none focus:border-blue-500 sm:w-[270px] w-full sm:h-[40px] h-[30px]"
            />
            <button type="submit" className="bg-[#FFE500] text-black border-black px-1 py-1 sm:rounded-r-2xl rounded-r-lg hover:bg-[#f6f0ba] sm:w-[40px] w-[30px] sm:h-[40px] h-[30px] focus:outline-none">
              <IoSearchOutline className="sm:w-6 w-4 sm:h-6 h-4" />
            </button>
          </div>
        </div>
      </div>
      <div className="sm:ml-5 ml-3 w-full gap-9 mt-5">
        <div className="bg-[#251382] rounded-t-2xl sm:h-[65px] h-[50px] flex justify-between">
          <div className='flex'>
            <h1 className="font-bold text-white sm:text-3xl text-[16px] sm:pl-5 pl-2 sm:pt-3 pt-3">Jumlah Aktivitas: {tableData.length} </h1>
          </div>
          {userData.jabatan !== 'manager' && userData.jabatan !== 'unit_head' && (
            <button
              className="bg-blue-500 hover:bg-[#77c9ff] text-white sm:text-[20px] text-[10px] font-semibold sm:px-4 px-3 sm:py-2 py-0 sm:my-3 my-[10px] rounded-md mr-3"
              onClick={handleInputClick}
            >
              Tambah Data
            </button>
          )}
        </div>
        <div className="bg-white rounded-b-2xl sm:h-[450px] h-[500px] mb-6 overflow-x-scroll">
          <table className="table-auto border-collapse w-full text-center" >
            <thead>
              <tr>
                <th className="sm:px-5 px-2 sm:py-4 py-2">No</th>
                <th className="sm:px-14 px-6  sm:py-4 py-2">Nama Nasabah</th>
                <th className="sm:px-14 px-6  sm:py-4 py-2">Tipe Nasabah</th>
                <th className="sm:px-14 px-6  sm:py-4 py-2">Status Aktivitas</th>
                <th className="sm:px-14 px-6  sm:py-4 py-2">Keterangan Aktivitas</th>
                <th className="sm:px-14 px-6  sm:py-4 py-2">Detail</th>
              </tr>
            </thead>
            <tbody style={{ whiteSpace: 'nowrap' }}>
              {data && data.length > 0 ? (
                data.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="text-black hover:text-blue-700 cursor-pointer" onClick={() => router.push(`/profil-nasabah/${item.id_nasabah}`)}>{item.nama_nasabah}</div>
                    </td>
                    <td>{item.tipe_nasabah}</td>
                    <td>{item.status_aktivitas}</td>
                    <td>
                      <div className={`py-1 rounded-md sm:mx-6 mx-2 my-1 text-white font-semibold ${item.keterangan_aktivitas === 'diterima' ? 'bg-green-500 ' : item.keterangan_aktivitas === 'ditolak' ? 'bg-red-500' : ''}`}>
                        {item.keterangan_aktivitas}
                      </div>
                    </td>
                    <td>
                      <div className="w-full justify-center gap-3 flex items-center">
                        <div className="bg-[#ffe946] hover:bg-[#f9ee98] py-2 px-2 rounded-md items-center flex cursor-pointer" onClick={() => router.push(`/detail-aktivitas/${item.id}`)}>
                          <ImProfile className="sm:h-5 sm:w-5 h-3 w-3" />
                        </div>
                        <div className="bg-[#ffe946] hover:bg-[#f9ee98] py-2 px-2 rounded-md items-center flex cursor-pointer" onClick={() => router.push(`/update-data/${item.id}`)}>
                          <FaEdit className="sm:h-5 sm:w-5 h-3 w-3" />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">Belum ada data yang ditambahkan</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

export default Page;