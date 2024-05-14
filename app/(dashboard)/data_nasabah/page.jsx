"use client"
import React, { useState, useEffect } from 'react';
import { IoSearchOutline } from "react-icons/io5";
import { IoIosArrowDropleft, IoIosArrowDropright, IoIosArrowDropleftCircle } from "react-icons/io";
import { ImProfile } from "react-icons/im";
import { FaEdit } from "react-icons/fa";
import useDataNasabah from "@/hooks/use-data-nasabah";
import { useParams, useRouter } from 'next/navigation';
import useUser from "@/hooks/use-user";
import Link from "next/link";
import { FaSpinner } from 'react-icons/fa';

const Page = () => {
  const { nasabah } = useParams();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [tableData, setTableData] = useState([]);
  const { loading: dataLoading, error: dataError, data, getUserData } = useDataNasabah();
  const { loading, error, data: userData, getUserData: getDataUser } = useUser();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getDataUser();
    getUserData();
  }, []);


  useEffect(() => {
    if (data) {
      setTableData(data);
    }
  }, [data]);

  const handleSearch = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
    setCurrentPage(1);
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  const { jabatan } = userData;

  const filteredData = tableData.filter(item =>
    item.nama.toLowerCase().includes(searchTerm.toLowerCase())
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

  const capitalizeFirstLetter = (string) => {
    if (string && typeof string === 'string' && string.length > 0) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    } else {
      return string;
    }
  };

  if (dataLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <FaSpinner className="animate-spin mr-2" /> Loading
      </div>
    );
  }

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className={`bg-[#EAEAEA] sm:h-auto h-screen flex flex-col items-center sm:pt-[75px] pt-[60px] sm:pr-4 pr-3 sm:ml-20 ml-10`}>
      <div className="sm:flex items-center w-full sm:justify-between">
        <div className="sm:ml-5 ml-3 flex items-center sm:gap-3 gap-1 ">
          <h2 className="sm:text-4xl text-[24px] sm:pt-2 pt-7 font-bold sm:-mt-2 -mt-7 ">
            Data Nasabah
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
        <div className="bg-[#251382] rounded-t-2xl sm:h-[65px] h-[55px] flex justify-between">
          <div className='flex'>
            <h1 className="font-bold text-white sm:text-3xl text-[16px] sm:pl-5 pl-2 sm:pt-4 pt-4">Jumlah Nasabah: {filteredData.length} </h1>
          </div>
          {jabatan !== 'manager' && (
            <button
              className="bg-blue-500 hover:bg-[#77c9ff] text-white sm:text-[20px] text-[10px] font-semibold sm:px-4 px-3 sm:py-2 py-0 sm:my-3 my-[10px] rounded-md mr-3"
              onClick={() => router.push("/inputdata-nasabah")}
            >
              Tambah Nasabah
            </button>
          )}
        </div>
        <div className="bg-white rounded-b-2xl sm:h-[530px] h-[370px] sm:overflow-hidden overflow-x-scroll">
          <table className="table-auto border-collapse w-full text-center">
            <thead>
              <tr>
                <th className="sm:px-5 px-2 sm:py-4 py-2 sm:text-[16px] text-[14px] ">No</th>
                <th className="sm:px-17 px-6  sm:py-4 py-2 sm:text-[16px] text-[14px] ">Nama Nasabah</th>
                <th className="sm:px-17 px-6  sm:py-4 py-2 sm:text-[16px] text-[14px] ">Tipe Nasabah</th>
                <th className="sm:px-17 px-6  sm:py-4 py-2 sm:text-[16px] text-[14px] ">Alamat</th>
                <th className="sm:px-14 px-6  sm:py-4 py-2 sm:text-[16px] text-[14px] ">Data Pekerjaan / Usaha</th>
                <th className="sm:px-17 px-6  sm:py-4 py-2 sm:text-[16px] text-[14px] ">Detail</th>
              </tr>
            </thead>
            <tbody style={{ whiteSpace: 'nowrap' }} className='sm:text-[18px] text-[14px]'>
              {currentItems.length > 0 ? (
                currentItems.map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-200' : 'bg-white'}>
                    <td>{offset + index + 1}</td>
                    <td>{capitalizeFirstLetter(item.nama)}</td>
                    <td>{capitalizeFirstLetter(item.tipe_nasabah)}</td>
                    <td style={{ paddingRight: '10px', maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{capitalizeFirstLetter(item.alamat)}</td>
                    <td style={{ paddingLeft: '20px', maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{capitalizeFirstLetter(item.pekerjaan)}</td>
                    <td>
                      <div className="w-full justify-center gap-3 flex items-center">
                        <div className="bg-[#ffe946] hover:bg-[#f9ee98] py-2 px-2 my-1 rounded-md items-center flex cursor-pointer" onClick={() => router.push(`/profil-nasabah/${item.id}`)}>
                          <ImProfile className="sm:h-5 sm:w-5 h-3 w-3" />
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
