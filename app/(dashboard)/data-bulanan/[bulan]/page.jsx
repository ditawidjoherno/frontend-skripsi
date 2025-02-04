"use client";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import Button from "../_components/button";
import React, { useState, useEffect } from 'react';
import Link from "next/link";
import Search from "../_components/search";
import useAktivitasBulanan from "@/hooks/use-aktivitas-bulanan";
import { useParams } from "next/navigation";

const page = () => {

  const [selectedMonth, setSelectedMonth] = useState("");


  const [searchResults, setSearchResults] = useState([]);
  const { bulan } = useParams()

  const handleSearch = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
    setIsSearchActive(true);

  };

  const { loading, error, data, getDataPerbulan } = useDataPerbulan()

  useEffect(() => {
    const fetchDataBulan = async () => {
      await getDataPerbulan(bulan)
      setSelectedMonth(bulan);
    }

    fetchDataBulan();
  }, [])

  // const capitalizeFirstLetter = (string) => {
  //   return string.charAt(0).toUpperCase() + string.slice(1);
  // };

  if (loading) {
    return (
      <div>Loading</div>
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

  return (
    <div className={`bg-[#EAEAEA] h-full pb-4 flex flex-col items-center sm:pt-[75px] pt-[60px] sm:pr-5 pr-3 sm:ml-20 ml-10`}>
      <div className="sm:flex items-center w-full sm:justify-between">
        <div className="sm:ml-5 ml-3 flex items-center gap-3 ">
          <h2 className="sm:text-4xl text-[24px] sm:pt-2 pt-7 font-bold sm:mt-0 -mt-9 ">
            Monitoring Bulanan
          </h2>
          <IoIosArrowDropleftCircle className="sm:mt-0 -mt-7 sm:h-9 h-6 sm:w-12 w-9 sm:ml-0 -ml-3 sm:mb-0 -mb-4" />
        </div>
        <div>
          <Search onSearch={handleSearch} />
          <ul>
            {searchResults.map((result, index) => (
              <li key={index}>{result}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="sm:ml-5 ml-3 w-full gap-9 mt-5 ">
        <div className="bg-[#1D2B53] rounded-t-2xl h-[65px] flex">
          {/* <h1 className="font-bold text-white sm:text-3xl text-[25px] pl-5 pt-3">{selectedMonth ? capitalizeFirstLetter(selectedMonth) : ""} 2024</h1> */}
          {/* <h1 className="font-bold text-white sm:text-3xl text-[25px] pl-5 pt-3">{data && data.jumlah ? `(${data.jumlah})` : ''}</h1> */}
        </div>
        <div className="bg-white rounded-b-2xl h-[500px] overflow-x-scroll">
          <table className="table-auto border-collapse w-full text-center overflow-x-acroll">
            <thead>
              <tr>
                <th className="px-5 sm:py-4 py-2">No</th>
                <th className="px-14 sm:py-4 py-2">Tanggal Prospek</th>
                <th className="px-14 sm:py-4 py-2">Nama Staff</th>
                <th className="px-14 sm:py-4 py-2">Aktivitas</th>
                <th className="px-14 sm:py-4 py-2 ">Nama Nasabah</th>
                {/* <th className="px-14 sm:py-4 py-2">No HP</th>
                <th className="px-14 sm:py-4 py-2">Alamat</th> */}
                <th className="px-14 sm:py-4 py-2">Tipe Nasabah</th>
                <th className="px-14 sm:py-4 py-2">prospek</th>
                <th className="px-14 sm:py-4 py-2">Nominal Prospek</th>
                <th className="px-14 sm:py-4 py-2">Aktivitas Sales</th>
                <th className="px-14 sm:py-4 py-2">Closing</th>
                <th className="px-14 sm:py-4 py-2">Key Person</th>
                <th className="px-14 sm:py-4 py-2">Dokumentasi</th>
              </tr>
            </thead>
            <tbody>
              {data && data.length > 0 ? (
                data.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.tanggal}</td>
                    <td>{item.nama}</td>
                    <td>{item.aktivitas}</td>
                    <td><Link href={`/profil_nasabah`}>
                      <div className="text-black hover:text-blue-700 cursor-pointer">{item.nama_nasabah}</div>
                    </Link>
                    </td>
                    <td>{item.tipe_nasabah}</td>
                    <td>{item.prospek}</td>
                    <td>{item.nominal_prospek}</td>
                    <td>{item.aktivitas_sales}</td>
                    <td>{item.closing}</td>
                    <td>{item.key_person}</td>
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
      </div>
    </div>

  );
};

export default page;