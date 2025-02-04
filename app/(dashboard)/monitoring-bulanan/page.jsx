"use client";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { IoPodiumSharp } from "react-icons/io5";
import React, { useEffect, useState } from 'react';
import Box from "./_components/box";
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();
  const [tahunTersedia, setTahunTersedia] = useState([]);
  const [selectedYear, setSelectedYear] = useState(""); 
  const [aktivitasData, setAktivitasData] = useState({});

  const currentYear = new Date().getFullYear();
  const bulanNames = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus",
    "September", "Oktober", "November", "Desember"
  ];

  useEffect(() => {
    const fetchTahunTersedia = async () => {
      const response = await fetch('http://localhost:8000/api/aktivitas/tahun-per-bulan?tahun=2025'); // Contoh untuk mengambil data tahun 2025 pertama kali
      const result = await response.json();
      const updatedTahunTersedia = result.data.tahun_tersedia.includes(currentYear)
        ? result.data.tahun_tersedia
        : [currentYear, ...result.data.tahun_tersedia];
      setTahunTersedia(updatedTahunTersedia); 
      setSelectedYear(currentYear); 
    };

    fetchTahunTersedia();
  }, [currentYear]);

  useEffect(() => {
    const fetchAktivitasData = async () => {
      const yearToFetch = selectedYear || currentYear; 
      const response = await fetch(`http://localhost:8000/api/aktivitas/tahun-per-bulan?tahun=${yearToFetch}`);
      const result = await response.json();
      setAktivitasData(result.data.aktivitas_per_bulan); 
    };

    fetchAktivitasData();
  }, [selectedYear, currentYear]);

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value); 
  };

  const handleGoBack = () => {
    router.back();
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleBoxClick = (month, year) => {
    const monthIndex = bulanNames.indexOf(month) + 1; 
    router.push(`/data-bulan?bulan=${monthIndex}&tahun=${year}`); 
  };

  return (
    <div className={`bg-[#EAEAEA] h-full pb-4 flex flex-col items-center sm:pt-[75px] pt-[55px] sm:pr-5 pr-3 sm:ml-20 ml-10`}>
      <div className="flex items-center w-full justify-between">
        <div className="sm:ml-5 ml-4 flex items-center gap-3">
          <h2 className="sm:text-[40px] text-[24px] font-semibold">Monitoring</h2>
          <div>
            <IoIosArrowDropleftCircle
              className="sm:h-10 sm:w-10 h-5 w-5 sm:ml-3 ml-0 transition-colors duration-300 hover:text-gray-400 focus:text-gray-400 cursor-pointer"
              onClick={handleGoBack}
            />
          </div>
        </div>
      </div>
      <div className="sm:ml-5 ml-3 w-full">
        <div className="bg-[#1D2B53] rounded-t-2xl sm:h-[65px] h-[55px] flex">
          <h1 className="font-bold text-white sm:text-[40px] text-[24px] sm:pl-11 pl-7 ">Bulanan</h1>
        </div>
        <div className="bg-white rounded-b-2xl h-auto">
          <div className="mb-3 ml-5 mt-3">
            <label htmlFor="year" className="text-2xl font-semibold">Tahun:</label>
            <select
              id="year"
              value={selectedYear}
              onChange={handleYearChange}
              className="ml-2 p-2 border border-gray-300 rounded-md"
            >
              <option value="">Pilih Tahun</option>
              {tahunTersedia.map((tahun) => (
                <option key={tahun} value={tahun}>{tahun}</option>
              ))}
            </select>
          </div>
          <div className="px-5 pb-4">
            <div className="grid sm:grid-cols-3 grid-cols-2 gap-4">
              {Object.entries(aktivitasData).map(([month, total], index) => (
                <Box
                  key={index}
                  bgColor={"bg-[#1D2B53]"}
                  icon={<IoPodiumSharp className="text-[#FFCD27] ml-9 mt-7" />}
                  text={capitalizeFirstLetter(month)}
                  bulan={month}
                  number={total}
                  selectedYear={selectedYear}
                  className={"hover:bg-[#293d74] transition duration-300"}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
