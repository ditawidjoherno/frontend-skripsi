"use client"
import { FaEdit } from "react-icons/fa";
import React, { useState, useEffect } from 'react';
import { IoIosArrowDropleft, IoIosArrowDropright, IoIosArrowDropleftCircle } from "react-icons/io";
import useUser from "@/hooks/use-user";
import { useRouter } from 'next/navigation';
import { ImProfile } from "react-icons/im";
import { IoSearchOutline } from "react-icons/io5";
import { MdDeleteForever } from "react-icons/md";
import useAktivitasBulanan from "@/hooks/use-aktivitas-bulan";
import { FaSpinner } from 'react-icons/fa';


const Page = () => {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('');
  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1)
  const [isSearchActive, setIsSearchActive] = useState(false);
  const { loading, data, getUserData } = useAktivitasBulanan();
  const { data: userData, getUserData: userGetData } = useUser();


  useEffect(() => {
    getUserData();
    userGetData();
  }, []);


  const handleSearch = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
    setCurrentPage(1);
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
    return;
  }

  const filteredData = tableData.filter(item =>
    (item.nama_user?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
    (item.nama_aktivitas?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
    (item.nama_nasabah?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
    (item.prospek?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
    (item.aktivitas_sales?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
    (item.keterangan_aktivitas?.toLowerCase() || "").includes(searchTerm.toLowerCase())
  );


  const itemsPerPage = 10;
  const offset = (currentPage - 1) * itemsPerPage;
  const indexOfLastItem = offset + itemsPerPage;
  const indexOfFirstItem = offset + 1;
  const currentItems = filteredData.slice(offset, indexOfLastItem);

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredData.length / 10)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const maxPages = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxPages / 2));
  let endPage = Math.min(startPage + maxPages - 1, Math.ceil(filteredData.length / 10));

  if (endPage - startPage + 1 < maxPages) {
    startPage = Math.max(1, endPage - maxPages + 1);
  }

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <FaSpinner className="animate-spin mr-2" /> Loading
      </div>
    );
  }
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className={`bg-[#EAEAEA] h-auto flex flex-col items-center sm:pt-[75px] pt-[60px] sm:pr-4 pr-3 sm:ml-20 ml-10`}>
      <div className="sm:flex items-center w-full sm:justify-between">
        <div className="sm:ml-5 ml-3 flex items-center sm:gap-3 gap-1 ">
          <h2 className="sm:text-4xl text-[24px] sm:pt-2 pt-7 font-bold sm:-mt-2 -mt-7 ">
            Data Aktivitas
          </h2>
          <div>
            <IoIosArrowDropleftCircle
              className="sm:h-10 sm:w-10 h-5 w-5 sm:ml-3 ml-0 transition-colors duration-300 hover:text-gray-400 focus:text-gray-400 cursor-pointer"
              onClick={handleGoBack}
            />
          </div>
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
            <h1 className="font-bold text-white sm:text-3xl text-[16px] sm:pl-5 pl-2 sm:pt-3 pt-4">Jumlah Aktivitas: {tableData.length} </h1>
          </div>
          {userData.jabatan !== 'manager' && userData.jabatan !== 'unit_head' && (
            <button
              className="bg-blue-500 hover:bg-[#77c9ff] text-white sm:text-[16px] text-[10px] font-semibold sm:px-4 px-3 sm:py-2 py-0 sm:my-3 my-[10px] rounded-md mr-3"
              onClick={() => router.push("/inputdata")}
            >
              Tambah Data
            </button>
          )}
        </div>
        <div className="bg-white rounded-b-2xl sm:h-[520px] h-[370px] mb-6 sm:overflow-hidden overflow-x-auto">
          <table className="table-auto border-collapse w-full text-center " >
            <thead>
              <tr>
                <th className="sm:px-5 px-2 sm:py-4 py-2">No</th>
                <th className="sm:px-14 px-6  sm:py-4 py-2">Nama Nasabah</th>
                <th className="sm:px-14 px-6  sm:py-4 py-2">Tipe Nasabah</th>
                <th className="sm:px-10 px-6 sm:text-lg text-sm  sm:py-4 py-2">Aktivitas Sales</th>
                <th className="sm:px-14 px-6  sm:py-4 py-2">Status Aktivitas</th>
                <th className="sm:px-14 px-6  sm:py-4 py-2">Detail</th>
              </tr>
            </thead>
            <tbody style={{ whiteSpace: 'nowrap' }}>
              {currentItems.length > 0 ? (
                currentItems.map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-200' : 'bg-white'}>
                    <td>{offset + index + 1}</td>
                    <td>
                      <div className="text-blue-500 hover:text-blue-700 cursor-pointer" onClick={() => router.push(`/profil-nasabah/${item.id_nasabah}`)}>{item.nama_nasabah}</div>
                    </td>
                    <td>{capitalizeFirstLetter(item.tipe_nasabah)}</td>
                    <td className="sm:text-lg text-sm">{capitalizeFirstLetter(item.aktivitas_sales)}</td>
                    <td>
                      <div className={`py-1 rounded-md sm:mx-6 mx-2 my-1 text-white font-semibold ${item.status_aktivitas === 'selesai' ? 'bg-green-500 ' : item.status_aktivitas === 'ditunda' ? 'bg-orange-500' : ''}`}>
                        {capitalizeFirstLetter(item.status_aktivitas)}
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
                        <div className="bg-[#ff3f3f] hover:bg-[#f99898] py-2 px-2 rounded-md items-center flex cursor-pointer" onClick={() => router.push(`/update-data/${item.id}`)}>
                          <MdDeleteForever className="sm:h-5 sm:w-5 h-3 w-3" />
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
        <div className="mt-5">
          <div className='flex items-center justify-center gap-4 mb-5 '>
            <button onClick={prevPage} disabled={currentPage === 1}>
              <IoIosArrowDropleft className="text-blue-500 text-3xl" />
            </button>
            {filteredData.length > 0 &&
              <ul className="pagination flex gap-4 text-xl]">
                {Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index).map((page) => (
                  <li key={page} className={`page-item ${currentPage === page ? 'bg-blue-500 text-white px-2 py-[2px] rounded-sm' : ''}`}>
                    <button onClick={() => setCurrentPage(page)} className="page-link">
                      {page}
                    </button>
                  </li>
                ))}
              </ul>
            }
            <button onClick={nextPage} disabled={currentPage === Math.ceil(filteredData.length / 10)}>
              <IoIosArrowDropright className="text-blue-500 text-3xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;