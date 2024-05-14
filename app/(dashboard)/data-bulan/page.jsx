"use client"
import { IoIosArrowDropleft, IoIosArrowDropright, IoIosArrowDropleftCircle } from "react-icons/io";
import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { IoSearchOutline } from "react-icons/io5";
import useAktivitasBulanan from "@/hooks/use-aktivitas-bulanan";
import { useRouter } from 'next/navigation';
import { FaSpinner } from 'react-icons/fa';
import { ImProfile } from "react-icons/im";

const page = () => {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('');
  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchResults, setSearchResults] = useState([])
  const [bulanNama, setBulanNama] = useState("");
  const { loading, error, data, getUserData } = useAktivitasBulanan();

  useEffect(() => {
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

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const bulan = urlParams.get('bulan');

    if (bulan) {
      setBulanNama(bulan);
      getUserData(bulan);
    }
  }, []);

  useEffect(() => {
    if (data && data.length > 0) {
      const tanggalPertama = new Date(data[0].tanggal_aktivitas);
      const namaBulan = new Intl.DateTimeFormat('id-ID', { month: 'long' }).format(tanggalPertama);
      setBulanNama(namaBulan);
    }
  }, [data]);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <FaSpinner className="animate-spin mr-2" /> Loading
      </div>
    );
  }

  if (error) {
    return (
      <div>Error: {error.message}</div>
    );
  }

  if (data) {
    console.log(data)
  }

  const capitalizeFirstLetter = (string) => {
    if (string && typeof string === 'string' && string.length > 0) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    } else {
      return string;
    }
  };


  const filteredData = tableData.filter(item =>
    item.nama_user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.nama_aktivitas.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.nama_nasabah.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.prospek.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.aktivitas_sales.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.tipe_nasabah.toLowerCase().includes(searchTerm.toLowerCase()) ||
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

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className={`bg-[#EAEAEA] h-full pb-4 flex flex-col items-center sm:pt-[75px] pt-[55px] sm:pr-5 pr-3 sm:ml-20 ml-10`}>
      <div className="sm:flex items-center w-full sm:justify-between">
        <div className="sm:ml-5 ml-3 sm:mt-3 mt-0 flex items-center sm:gap-3 gap-1 ">
          <h2 className="sm:text-4xl text-[24px] font-bold ">
            Monitoring Bulanan
          </h2>
            <IoIosArrowDropleftCircle
              className="sm:h-10 sm:w-10 h-5 w-5 sm:ml-3 ml-0 transition-colors duration-300 hover:text-gray-400 focus:text-gray-400 cursor-pointer"
              onClick={handleGoBack}
            />
        </div>
        <div className='flex justify-center gap-1 sm:mr-5 sm:mt-2'>
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
      <div className="sm:ml-5 ml-3 w-full gap-9 mt-5 ">
        <div className="bg-[#1D2B53] rounded-t-2xl sm:h-[65px] h-[45px] flex justify-between">
          <h1 className="font-bold text-white sm:text-3xl text-[20px] pl-5 sm:pt-4 pt-2">{bulanNama} 2024</h1>
          <h1 className="font-bold text-white sm:text-2xl text-[14px] pl-5 sm:pt-4 pt-3 sm:mr-3 mr-2">Jumlah Aktivitas: {tableData.length} </h1>
        </div>
        <div className="bg-white rounded-b-2xl sm:h-[520px] h-[400px] sm:overflow-hidden overflow-x-scroll">
          <table className="table-auto border-collapse w-full text-center overflow-x-scroll" style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
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
                    <td className="sm:text-lg text-sm">{offset + index + 1}</td>
                    <td className="sm:text-lg text-sm">{item.tanggal_aktivitas}</td>
                    <td className="sm:text-lg text-sm">{capitalizeFirstLetter(item.nama_user)}</td>
                    <td className="sm:text-lg text-sm">{capitalizeFirstLetter(item.nama_aktivitas)}</td>
                    <td className="sm:text-lg text-sm">
                      <div className="text-blue-500 hover:text-blue-700 cursor-pointer" onClick={() => router.push(`/profil-nasabah/${item.id_nasabah}`)}>{capitalizeFirstLetter(item.nama_nasabah)}</div>
                    </td>
                    {/* <td>{capitalizeFirstLetter(item.tipe_nasabah)}</td>
                    <td>{capitalizeFirstLetter(item.prospek)}</td>
                    <td>{capitalizeFirstLetter(item.nominal_prospek)}</td> */}
                    {/* <td className="sm:text-lg text-sm">{capitalizeFirstLetter(item.aktivitas_sales)}</td> */}
                    {/* <td>{capitalizeFirstLetter(item.closing)}</td> */}

                    <div className="w-full justify-center gap-3 flex items-center">
                      <div className="bg-[#ffe946] hover:bg-[#f9ee98] py-2 px-2 rounded-md items-center flex cursor-pointer my-1" onClick={() => router.push(`/detail-aktivitas/${item.id}`)}>
                        <ImProfile className="sm:h-5 sm:w-5 h-3 w-3" />
                      </div>
                    </div>                  </tr>
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
};

export default page;

