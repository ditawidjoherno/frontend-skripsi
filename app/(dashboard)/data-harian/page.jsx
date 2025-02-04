"use client";
import React, { useState, useEffect } from 'react';
import { IoIosArrowDropleft, IoIosArrowDropright, IoIosArrowDropleftCircle } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import Link from "next/link";
import useAktivitasHarian from "@/hooks/use-aktivitas-harian";
import { FaSpinner } from 'react-icons/fa';
import { ImProfile } from "react-icons/im";
import { useRouter } from 'next/navigation';
import { jsPDF } from "jspdf";
import * as XLSX from "xlsx";
import "jspdf-autotable"; 
import { FaFilePdf } from "react-icons/fa";
import { FaFileExcel } from "react-icons/fa";
import { IoMdPrint } from "react-icons/io";


const Page = () => {
  const router = useRouter()

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
    item.aktivitas.toLowerCase().includes(searchTerm.toLowerCase()) ||
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

  const PrintButton = ({ currentItems, offset }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handlePrintPDF = () => {
      const doc = new jsPDF();
      doc.autoTable({
        head: [
          ["No", "Tanggal Prospek", "Nama Staff", "Aktivitas", "Nama Nasabah", "Tipe Nasabah", , "Prospek", "Nominal Prospek"],
        ],
        body: tableData.map((item, index) => [
          index + 1,
          item.created_at,
          item.nama_user,
          item.aktivitas,
          item.nama_nasabah,
          item.tipe_nasabah,
          item.nominal_prospek,
          item.prospek,
        ]),
      });

      doc.save("aktivitas_bulanan.pdf");
    };

    const handleDownloadExcel = () => {
      const worksheetData = [
        ["No", "Tanggal Prospek", "Nama Staff", "Aktivitas", "Nama Nasabah", "Tipe Nasabah", , "Prospek", "Nominal Prospek"],
        ...tableData.map((item, index) => [
          index + 1,
          item.created_at,
          item.nama_user,
          item.aktivitas,
          item.nama_nasabah,
          item.tipe_nasabah,
          item.nominal_prospek,
          item.prospek,
        ]),
      ];

      const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Aktivitas Bulanan");
      XLSX.writeFile(workbook, "aktivitas_bulanan.xlsx");
    };


    return (
      <div className="relative mr-5">
        <button
          className="bg-blue-500 text-white px-5 py-2 mt-3 rounded-md hover:bg-blue-600"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <div className="flex">
            <IoMdPrint className="mr-2" size={24} />
            Cetak
          </div>
        </button>

        {isDropdownOpen && (
          <div className="absolute bg-white shadow-lg rounded-md mt-2 right-0 z-10">
            <div className="flex">
              <button
                className="flex items-center w-full text-md px-5 py-2 text-black hover:bg-gray-100 whitespace-nowrap"
                onClick={() => {
                  handlePrintPDF();
                  setIsDropdownOpen(false);
                }}
              >
                <FaFilePdf className="mr-2" size={18} />
                Cetak PDF
              </button>

            </div>
            <div className="flex">
              <button
                className="flex items-center w-full text-md px-5 py-2 text-black hover:bg-gray-100 whitespace-nowrap"
                onClick={() => {
                  handleDownloadExcel();
                  setIsDropdownOpen(false);
                }}
              >
                <FaFileExcel className="mr-2" size={18} />
                Cetak Excel
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };


  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <FaSpinner className="animate-spin mr-2" /> Loading
      </div>
    );
  }

  const capitalizeFirstLetter = (string) => {
    if (string && typeof string === 'string' && string.length > 0) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    } else {
      return string;
    }
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className={`bg-[#EAEAEA] h-full pb-4 flex flex-col items-center sm:pt-[75px] pt-[55px] sm:pr-5 pr-3 sm:ml-20 ml-10`}>
      <div className="sm:flex items-center w-full sm:justify-between">
        <div className="sm:ml-5 ml-3 sm:mt-3 mt-0 flex items-center sm:gap-3 gap-1  ">
          <h2 className="sm:text-4xl text-[24px] sm:pt-2 pt-7 font-bold sm:-mt-2 -mt-7 ">
            Monitoring Harian
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
        <div className="bg-[#059BC7] rounded-t-2xl sm:h-[65px] h-[45px] flex justify-between">
          <h1 className="font-bold mr-4 text-white sm:text-3xl text-[18px] pl-5 sm:pt-4 pt-3">Jumlah Aktivitas: {tableData.length} </h1>
          <PrintButton currentItems={currentItems} offset={offset} />
        </div>
        <div className="bg-white rounded-b-2xl sm:h-[520px] h-[400px] sm:overflow-hidden overflow-x-scroll">
          <table className="table-auto border-collapse w-full text-center overflow-x-acroll" style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
            <thead>
              <tr>
                <th className="sm:px-5 sm:text-lg text-sm px-3 sm:py-4 py-2">No</th>
                <th className="sm:px-10 px-6 sm:text-lg text-sm  sm:py-4 py-2">Tanggal Prospek</th>
                <th className="sm:px-10 px-6 sm:text-lg text-sm  sm:py-4 py-2">Nama Staff</th>
                <th className="sm:px-10 px-6 sm:text-lg text-sm  sm:py-4 py-2">Aktivitas</th>
                <th className="sm:px-10 px-6 sm:text-lg text-sm  sm:py-4 py-2">Nama Nasabah</th>
                {/* <th className="sm:px-10 px-6 sm:text-lg text-sm  sm:py-4 py-2">Tipe Nasabah</th>
                <th className="sm:px-10 px-6 sm:text-lg text-sm  sm:py-4 py-2">Prospek</th>
                <th className="sm:px-10 px-6 sm:text-lg text-sm  sm:py-4 py-2">Nominal Prospek</th> */}
                {/* <th className="sm:px-10 px-6 sm:text-lg text-sm  sm:py-4 py-2">Aktivitas Sales</th> */}
                {/* <th className="sm:px-10 px-6 sm:text-lg text-sm  sm:py-4 py-2">Closing</th> */}
                <th className="sm:px-8 px-6 sm:text-lg text-sm  sm:py-4 py-2">Detail</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-200' : 'bg-white'}>
                    <td>{offset + index + 1}</td>
                    <td>{item.created_at}</td>
                    <td>{capitalizeFirstLetter(item.nama_user)}</td>
                    <td>{capitalizeFirstLetter(item.aktivitas)}</td>
                    <td>
                      <div className="text-blue-500 hover:text-blue-700 cursor-pointer" onClick={() => router.push(`/profil-nasabah/${item.nasabah_id}`)}>{capitalizeFirstLetter(item.nama_nasabah)}</div>
                    </td>
                    {/* <td>{capitalizeFirstLetter(item.tipe_nasabah)}</td>
                    <td>{capitalizeFirstLetter(item.prospek)}</td>
                    <td>{capitalizeFirstLetter(item.nominal_prospek)}</td> */}
                    {/* <td>{capitalizeFirstLetter(item.aktivitas_sales)}</td> */}
                    {/* <td>{capitalizeFirstLetter(item.closing)}</td> */}
                    <div className="w-full justify-center gap-3 flex items-center">
                      <div className="bg-[#ffe946] hover:bg-[#f9ee98] py-2 px-2 rounded-md items-center flex cursor-pointer my-1" onClick={() => router.push(`/detail-aktivitas/${item.id}`)}>
                        <ImProfile className="sm:h-5 sm:w-5 h-3 w-3" />
                      </div>
                    </div>
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

export default Page;
