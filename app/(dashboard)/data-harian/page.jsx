"use client";
import React, { useState, useEffect } from 'react';
import { IoIosArrowDropleft, IoIosArrowDropright, IoIosArrowDropleftCircle } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import Link from "next/link";
import useAktivitasHarian from "@/hooks/use-aktivitas-harian";

const page = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchResults, setSearchResults] = useState([])
  const { loading, error, data, getUserData } = useAktivitasHarian();

  const handleGetDataUser = async () => {
    await getUserData();
  }

  useEffect(() => {
    handleGetDataUser();
    getUserData();
  }, [])

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

  const filteredData = tableData.filter(item =>
    item.nama_user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.nama_aktivitas.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.nama_nasabah.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.prospek.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.aktivitas_sales.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.keterangan_aktivitas.toLowerCase().includes(searchTerm.toLowerCase())
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


  return (
    <div className={`bg-[#EAEAEA] h-full pb-4 flex flex-col items-center sm:pt-[75px] pt-[60px] sm:pr-5 pr-3 sm:ml-20 ml-10`}>
      <div className="sm:flex items-center w-full sm:justify-between">
        <div className="sm:ml-5 ml-3 flex items-center sm:gap-3 gap-1 ">
          <h2 className="sm:text-4xl text-[24px] sm:pt-2 pt-7 font-bold sm:-mt-2 -mt-7 ">
            Monitoring Harian
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
        <div className="bg-[#059BC7] rounded-t-2xl h-[65px] flex">
          <h1 className="font-bold text-white sm:text-3xl text-[20px] pl-5 pt-4">Jumlah Aktivitas: {tableData.length} </h1>
        </div>
        <div className="bg-white rounded-b-2xl sm:h-[700px] h-[500px] overflow-x-scroll">
          <table className="table-auto border-collapse w-auto text-center overflow-x-acroll">
            <thead>
              <tr>
                <th className="sm:px-5  px-3 sm:py-4 py-2">No</th>
                <th className="sm:px-14 px-6  sm:py-4 py-2">Tanggal Prospek</th>
                <th className="sm:px-14 px-6  sm:py-4 py-2">Nama Staff</th>
                <th className="sm:px-14 px-6  sm:py-4 py-2">Aktivitas</th>
                <th className="sm:px-14 px-6  sm:py-4 py-2 ">Nama Nasabah</th>
                {/* <th className="sm:px-14 px-6  sm:py-4 py-2">No HP</th>
                <th className="sm:px-14 px-6  sm:py-4 py-2">Alamat</th> */}
                <th className="sm:px-14 px-6  sm:py-4 py-2">Tipe Nasabah</th>
                <th className="sm:px-14 px-6  sm:py-4 py-2">prospek</th>
                <th className="sm:px-14 px-6  sm:py-4 py-2">Nominal Prospek</th>
                <th className="sm:px-14 px-6  sm:py-4 py-2">Aktivitas Sales</th>
                <th className="sm:px-14 px-6  sm:py-4 py-2">Closing</th>
                <th className="sm:px-14 px-6  sm:py-4 py-2">Dokumentasi</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.tanggal_aktivitas}</td>
                    <td>{item.nama_user}</td>
                    <td>{item.nama_aktivitas}</td>
                    <td><Link href={`/profil_nasabah`}>
                      <div className="text-black hover:text-blue-700 cursor-pointer">{item.nama_nasabah}</div>
                    </Link>
                    </td>
                    <td>{item.tipe_nasabah}</td>
                    <td>{item.prospek}</td>
                    <td>{item.nominal_prospek}</td>
                    <td>{item.aktivitas_sales}</td>
                    <td>{item.closing}</td>
                    <td>{item.dokumentasi}</td>
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
        <div className="mt-5">
                    <div className='flex items-center justify-center gap-4 sm:mb-5 mb-3'>
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
};

export default page;