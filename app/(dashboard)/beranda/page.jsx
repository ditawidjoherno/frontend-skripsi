"use client"
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { IoTimeSharp } from "react-icons/io5";
import Box from "./_components/Box";
import React, { useEffect, useState } from 'react';
import useUser from "@/hooks/use-user";
import useAktivitasSelesai from "@/hooks/use-aktivitas-selesai";
import TodoList from "./_components/ToDoList";
import Calendar from "./_components/Calendar";
import RecentData from "./_components/RecentData";
import useAktivitasDitunda from "@/hooks/use-aktivitas-ditunda";
import TargetHarian from "./_components/target";
import KPIProgress from "./_components/progressDiagram";
import DashboardKPI from "./_components/progressKpi";
import { FaSpinner } from 'react-icons/fa';
import Link from "next/link";
import { HiOutlineClock } from "react-icons/hi2";
import TotalAktivitas from "./_components/totalAktivitas";

const Page = () => {
  const { loading, data: userData, getUserData: getUser } = useUser();
  const { data: selesaiData, getUserData: getSelesaiData } = useAktivitasSelesai();
  const { data: DitundaData, getUserData: getDitundaData } = useAktivitasDitunda();
  const [jumlahSelesaiData, setJumlahSelesaiData] = useState(0);
  const [jumlahDitundaData, setJumlahDitundaData] = useState(0);

  useEffect(() => {
    getUser();
    getSelesaiData();
    getDitundaData();
  }, []);



  useEffect(() => {
    if (selesaiData) {
      setJumlahSelesaiData(selesaiData.length);
    }
  }, [selesaiData]);

  useEffect(() => {
    if (DitundaData) {
      setJumlahDitundaData(DitundaData.length);
    }
  }, [DitundaData]);

  const handleSelesaiClick = () => {
    window.location.href = '/aktivitas-selesai';
  };

  const handleDitundaClick = () => {
    window.location.href = '/aktivitas-ditunda';
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <FaSpinner className="animate-spin mr-2" /> Loading
      </div>
    );
  }



  return (
    <div className={`bg-[#EAEAEA] h-auto transition-all sm:pl-11 pl-5 `}>
      <h2 className="sm:text-[40px] text-[24px] sm:pt-[79px] pt-[50px] sm:ml-16 ml-8 font-semibold">
        Dashboard
      </h2>
      {userData && (
        <div className="sm:ml-16 ml-8 mt-4 sm:mr-5 mr-3 mb-5 bg-white rounded-md shadow-lg sm:p-6 p-3 flex sm:flex-row flex-col items-center justify-between">
          <div className="flex items-center">
            <div className="bg-gradient-to-r p-3 rounded-full">
              <img
                src="/img/btn_boost.png"
                alt="Welcome Icon"
                className="sm:w-20 w-10 sm:h-16 h-8 animate-bounce"
              />
            </div>
            <div className="ml-4">
              <h3 className="text-[15px] sm:text-[24px] font-bold text-gray-800">Selamat Datang di BTN Boost!</h3>
              <p className="text-[13px] sm:text-[16px] text-gray-600">
                Hai <span className="text-[#4A90E2] font-semibold">{userData.nama}, </span>
                selamat bekerja!
              </p>
            </div>
          </div>
          {userData && userData.jabatan === 'staff' && (
            <Link href="/aktivitas-ditunda">
              <div className="w-full sm:w-auto mt-4 sm:mt-0">
                <button className="bg-[#F76B03] hover:bg-[#f08e42] text-white font-medium px-4 py-2 rounded-md transition sm:text-base text-xs">
                  Lihat Aktivitas Ditunda
                </button>
              </div>
            </Link>
          )}
        </div>
      )}



      <div className="flex md:flex-row flex-col md:justify-evenly justify-start sm:gap-5 gap-2 lg:items-start items-center sm:px-8  sm:mr-5 mr-0 ">
        {userData && userData.jabatan !== 'unit_head' && userData.jabatan !== 'staff' && (
          <button onClick={handleSelesaiClick}>
            <Box
              bgColor={"bg-white"}
              text={"Aktivitas Selesai"}
              icon={
                <div className="bg-[#c7ff9c] rounded-md flex items-center justify-center">
                  <IoCheckmarkDoneCircleOutline className="text-[#4b871d]" />
                </div>
              }
              number={jumlahSelesaiData}
              className={"hover:bg-[#b5ff9f] transition duration-300"}
            />
          </button>
        )}
        {userData && userData.jabatan !== 'unit_head' && userData.jabatan !== 'staff' && (
          <button onClick={handleDitundaClick}>
            <Box
              bgColor={"bg-white"}
              text={"Aktivitas Ditunda"}
              icon={
                <div className="bg-[#ffd5b5] rounded-md flex items-center justify-center">
                  <HiOutlineClock className="text-[#F76B03]" />
                </div>
              }
              number={jumlahDitundaData}
              className={"hover:bg-[#ffa25b] transition duration-300"}
            />
          </button>

        )}
      </div>
      <div className="flex  flex-col lg:flex-row ml-5 justfiy-center">
        <div className="sm:w-1/2">
          {userData && userData.jabatan !== 'staff' && <TotalAktivitas />}
          {userData && userData.jabatan !== 'staff' && <RecentData />}
          {/* {userData && userData.jabatan === 'admin' && <RecentData />} */}
          {userData && userData.jabatan === 'staff' && <TargetHarian />}
          <div className="ml-5">
            {userData && userData.jabatan === 'staff' && <TodoList />}
          </div>
        </div>

        <div className="sm:w-1/2">
          {userData && userData.jabatan === 'staff' && <KPIProgress />}
          {userData && userData.jabatan !== 'staff' && <DashboardKPI />}
          {userData && userData.jabatan !== 'staff' && <TodoList />}

          {/* <Calendar /> */}
        </div>
      </div>
    </div>
  );
};
export default Page;
