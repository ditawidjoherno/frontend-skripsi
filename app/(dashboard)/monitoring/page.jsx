"use client"
import React, { useEffect, useState } from 'react';
import { IoPodiumSharp } from "react-icons/io5";
import Box from './_components/Box';
import BoxProfil from './_components/BoxProfil';
import Link from 'next/link';
import { IoIosArrowDropleftCircle } from "react-icons/io";
import useAktivitasHarian from "@/hooks/use-aktivitas-harian";
import useAktivitasBulanan from '@/hooks/use-aktivitas-bulanan';
import useStaff from '@/hooks/use-staff';
import { useRouter } from 'next/navigation';
import useAllBulanan from '@/hooks/use-all-bulanan';
import useTotalMingguan from '@/hooks/use-monitoring-mingguan';
import { FaSpinner } from 'react-icons/fa';

const Page = () => {
  const [jumlahHarianData, setJumlahHarianData] = useState(0);
  const { loading, data: HarianData, getUserData: getHarianData } = useAktivitasHarian();
  const [jumlahBulananData, setJumlahBulananData] = useState(0);
  const { data: BulananData, getUserData: getBulananData } = useAllBulanan();
  const { data: MingguanData, getTotalMingguan } = useTotalMingguan();
  const [jumlahMingguanData, setJumlahMingguanData] = useState(0);
  const { data: Staff, getUserData: getStaff } = useStaff();
  const router = useRouter();

  useEffect(() => {
    getHarianData();
    getBulananData();
    getStaff();
    getTotalMingguan();
  }, []);

  useEffect(() => {
    if (HarianData) {
      setJumlahHarianData(HarianData.length);
    }
  }, [HarianData]);

  useEffect(() => {
    if (BulananData) {
      setJumlahBulananData(BulananData.total_aktivitas_bulan_ini || 0);
    }
  }, [BulananData]);

  useEffect(() => {
    const getJumlahMingguIni = () => {
      const currentDate = new Date();
      const currentWeekNumber = Math.ceil(currentDate.getDate() / 7);
      const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
      const currentMonth = monthNames[currentDate.getMonth()];
      const currentWeekData = MingguanData?.[currentMonth]?.[`minggu ${currentWeekNumber}`];
      const jumlahMingguIni = currentWeekData ? currentWeekData.jumlah : 0;
      setJumlahMingguanData(jumlahMingguIni);
    };

    if (MingguanData) {
      getJumlahMingguIni();
    }
  }, [MingguanData]);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <FaSpinner className="animate-spin mr-2" /> Loading
      </div>
    );
  }

  const handleGoBack = () => {
    router.back();
  };

  const capitalizeFirstLetter = (string) => {
    if (string && typeof string === 'string') {
      return string.split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    } else {
      return string;
    }
  };

  return (
    <div className={`bg-[#EAEAEA] h-auto flex flex-col items-center sm:pt-[75px] pt-[60px] sm:pr-4 pr-3 sm:ml-20 ml-10`}>
      <div className="flex items-center w-full">
        <h2 className="sm:text-[40px] text-[24px] sm:ml-5 ml-4 font-semibold">
          Monitoring
        </h2>
        <div>
          <IoIosArrowDropleftCircle
            className="sm:h-10 sm:w-10 h-5 w-5 sm:ml-3 ml-0 transition-colors duration-300 hover:text-gray-400 focus:text-gray-400 cursor-pointer"
            onClick={handleGoBack}
          />
        </div>
      </div>
      <div className="flex md:flex-row flex-col w-full sm:px-6 px-3 gap-5">
        <Box
          bgColor={"bg-[#059BC7]"}
          icon={<IoPodiumSharp className="text-[#FFCD27] ml-9 mt-7" />}
          text={"Harian"}
          number={jumlahHarianData}
          onClick={() => router.push("/data-harian")}
          className={"hover:bg-[#29839b] transition duration-300"}
        />
        <Box
          bgColor={"bg-[#056AAA]"}
          icon={<IoPodiumSharp className="text-[#FFCD27] ml-9 mt-7" />}
          text={"Mingguan"}
          number={jumlahMingguanData}
          onClick={() => router.push("/monitoring-mingguan")}
          className={"hover:bg-[#1c5b82] transition duration-300"}
        />
        <Box
          bgColor={"bg-[#1D2B53]"}
          icon={<IoPodiumSharp className="text-[#FFCD27] ml-9 mt-7" />}
          text={"Bulanan"}
          number={jumlahBulananData}
          onClick={() => router.push("/monitoring-bulanan")}
          className={"hover:bg-[#1a425b] transition duration-300"}
        />
      </div>
      <div className="h-50 flex sm:w-full w-4/4 sm:mx-7 mx-4 flex-wrap justify-start sm:gap-5 gap-3 lg:items-start sm:pl-7 pl-1 pr-1 sm:mt-7 mt-5 px-4 sm:pt-0 mb-3">
        <h2 className="sm:text-[28px] text-[24px] sm:ml-5 ml-4 font-semibold">
          Monitoring Staff
        </h2>
        <div className='w-full flex gap-3'>
          <div className='w-full flex md:flex-row flex-col gap-3 justify-center'>
            <div className='sm:w-1/2 w-full flex flex-col gap-2'>
              {Staff && Staff.slice(0, Math.ceil(Staff.length / 2)).map((item, index) => (
                <BoxProfil
                  key={index}
                  bgColor={"bg-[#ffffff]"}
                  image={item.foto_profil || '/img/profil.png'}
                  nama={capitalizeFirstLetter(item.nama)}
                  nip={item.nip}
                  onClick={() => router.push(`/monitoring-sales/${item.nip}`)}
                  className={"hover:bg-[#dcdcdc] transition duration-300"}
                />
              ))}
            </div>
            <div className='sm:w-1/2 w-full flex flex-col gap-2'>
              {Staff && Staff.slice(Math.ceil(Staff.length / 2)).map((item, index) => (
                <BoxProfil
                  key={index}
                  bgColor={"bg-[#ffffff]"}
                  image={item.foto_profil || '/img/profil.png'}
                  nama={capitalizeFirstLetter(item.nama)}
                  nip={item.nip}
                  onClick={() => router.push(`/monitoring-sales/${item.nip}`)}
                  className={"hover:bg-[#dcdcdc] transition duration-300"}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
