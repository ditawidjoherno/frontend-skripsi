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

const Page = () => {
  const { nasabah } = useParams();
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);
  const [tableData, setTableData] = useState([]);
  const { loading: dataLoading, error: dataError, data, getUserData } = useDataNasabah(nasabah);
  const { loading, error, data: userData, getUserData: getDataUser } = useUser();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getDataUser();
  }, []);

  useEffect(() => {
    if (nasabah) {
      getUserData();
    }
  }, [nasabah]);

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

  const handleInputClick = () => {
    window.location.href = '/inputdata-nasabah';
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
            <h1 className="font-bold text-white sm:text-3xl text-[25px] pl-5 pt-4">Jumlah Nasabah: {filteredData.length} </h1>
          </div>
          {jabatan !== 'manager' && (
            <button
              className="bg-blue-500 hover:bg-[#77c9ff] text-white font-semibold px-4 py-2 sm:my-3 rounded-md mr-3"
              onClick={handleInputClick}
            >
              Tambah Nasabah
            </button>
          )}
        </div>
        <div className="bg-white rounded-b-2xl sm:h-[450px] h-[500px]">
          <table className="table-auto border-collapse w-full text-center">
            <thead>
              <tr>
                <th className="px-5 sm:py-4 py-2 ">No</th>
                <th className="px-17 sm:py-4 py-2 ">Nama Nasabah</th>
                <th className="px-17 sm:py-4 py-2 ">Tipe Nasabah</th>
                <th className="px-17 sm:py-4 py-2 ">Alamat</th>
                <th className="px-17 sm:py-4 py-2 ">Data Pekerjaan / Usaha</th>
                <th className="px-17 sm:py-4 py-2 ">Detail</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((item, index) => (
                  <tr key={index}>
                    <td>{offset + index + 1}</td>
                    <td onClick={() => router.push(`/profil-nasabah/${item.id}`)} className="cursor-pointer hover:text-blue-600 transition-all duration-500">{item.nama}</td>
                    <td>{item.tipe_nasabah}</td>
                    <td>{item.alamat}</td>
                    <td>{item.pekerjaan}</td>
                    <td>
                      <div className="w-full justify-center gap-3 flex items-center">
                        <div className="bg-[#ffe946] hover:bg-[#f9ee98] py-2 px-2 rounded-md items-center flex cursor-pointer" onClick={() => router.push(`/profil-nasabah/${item.id}`)}>
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
