"use client"
import React, { useState, useEffect } from 'react';
import { IoIosArrowDropleftCircle } from "react-icons/io";
import Button from "./_components/button";
import Link from "next/link";

import Search from "./_components/search";
import useAktivitasMingguan from "@/hooks/use-aktivitas-mingguan";

const Page = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchResults, setSearchResults] = useState([])
  const [bulanNama, setBulanNama] = useState(""); 
  const [minggu, setMinggu] = useState(""); 
  const { loading, error, data, getUserData } = useAktivitasMingguan();

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
    const minggu = urlParams.get('minggu');

    if (bulan && minggu) {
      setBulanNama(bulan);
      setMinggu(minggu);
      getUserData(bulan, minggu);
    }
  }, []);

  const bulanMap = {
    1: "Januari",
    2: "Februari",
    3: "Maret",
    4: "April",
    5: "Mei",
    6: "Juni",
    7: "Juli",
    8: "Agustus",
    9: "September",
    10: "Oktober",
    11: "November",
    12: "Desember"
  };

  const namaBulan = bulanMap[bulanNama];

  console.log(data)

  return (
    <div className={`bg-[#EAEAEA] h-full pb-4 flex flex-col items-center sm:pt-[75px] pt-[60px] sm:pr-5 pr-3 sm:ml-20 ml-10`}>
      <div className="sm:flex items-center w-full sm:justify-between">
        <div className="sm:ml-5 ml-3 flex items-center sm:gap-3 gap-1 ">
          <h2 className="sm:text-4xl text-[24px] sm:pt-2 pt-7 font-bold sm:-mt-2 -mt-7 ">
            Monitoring Mingguan
          </h2>
          <Link href="/monitoring-mingguan">
            <IoIosArrowDropleftCircle className="sm:h-10 sm:w-10 h-5 w-5 sm:ml-3 ml-0" />
          </Link>
        </div>
        <div>
          <Search onSearch={handleSearch} className="sm:mt-0 -mt-11 sm:h-9 h-6 sm:w-12 w-9" />
          <ul>
            {searchResults.map((result, index) => (
              <li key={index}>{result}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="sm:ml-5 ml-2 w-full sm:gap-9 gap-2 mt-5">
        <div className="bg-[#056AAA] rounded-t-2xl sm:h-[65px] h-[50px] flex justify-between sm:pr-5">
          <div className="pl-1 pt-1 sm:mt-1 flex items-center mb-2">
            <h1 className="font-bold text-[#FFE500] sm:text-3xl text-[20px] sm:pl-4 pl-2 sm:pt-2">{namaBulan}</h1>
            <h1 className="font-bold text-white sm:text-3xl text-[15px] sm:mt-0 sm:ml-0 ml-1 sm:pl-5 pl-0 sm:pt-2 pt-2">(300)</h1>
          </div>
          <div>
            <h3 className="font-bold text-white sm:text-md sm:text-[15px] text-[13px] sm:ml-2 ml-5 pt-2 sm:mt-0 mt- ">
              Minggu Pertama:
            </h3>
            <h3 className="font-bold text-white sm:text-md sm:text-[12px] text-[10px] sm:mr-0 mr-4 ml-2 sm:mt-0 mt-">
              01/FEB/2024-08/FEB/2024
            </h3>
          </div>
        </div>
        <div className="bg-white rounded-b-2xl h-[500px] overflow-x-scroll">
          <table className="table-auto border-collapse w-full text-center overflow-x-acroll" style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
            <thead>
              <tr>
                <th className="sm:px-5  px-2 sm:py-4 py-2">No</th>
                <th className="sm:px-14 px-8  sm:py-4 py-2">Tanggal Prospek</th>
                <th className="sm:px-14 px-8  sm:py-4 py-2">Aktivitas</th>
                <th className="sm:px-14 px-8  sm:py-4 py-2 ">Nama Nasabah</th>
                <th className="sm:px-14 px-8  sm:py-4 py-2">Tipe Nasabah</th>
                <th className="sm:px-14 px-8  sm:py-4 py-2">Alamat</th>
                <th className="sm:px-14 px-8  sm:py-4 py-2">Prospek</th>
                <th className="sm:px-14 px-8  sm:py-4 py-2">Nominal Prospek</th>
                <th className="sm:px-14 px-8  sm:py-4 py-2">Aktivitas Sales</th>
                <th className="sm:px-14 px-8  sm:py-4 py-2">Closing</th>
                <th className="sm:px-14 px-8  sm:py-4 py-2">Dokumentasi</th>
              </tr>
            </thead>
            <tbody>
  {data && data.length > 0 ? (
    data.map((item, index) => (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{item.tanggal_aktivitas}</td>
        <td>{item.nama_aktivitas}</td>
        <td>
          <Link href={`/profil_nasabah`}>
            <div className="text-black hover:text-blue-700 cursor-pointer">{item.nama_nasabah}</div>
          </Link>
        </td>
        <td>{item.tipe_nasabah}</td>
        <td>{item.alamat}</td>
        <td>{item.prospek}</td>
        <td>{item.nominal_prospek}</td>
        <td>{item.aktivitas_sales}</td>
        <td>{item.closing}</td>
        <td>{item.dokumentasi}</td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="12" className="text-center">Belum ada data yang ditambahkan</td>
    </tr>
  )}
</tbody>

          </table>
        </div>
      </div>
    </div>
  );
};

export default Page;
