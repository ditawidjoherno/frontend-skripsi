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

const Page = () => {
  const { data: userData, getUserData: getUser } = useUser();
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



  return (
    <div className={`bg-[#EAEAEA] h-auto transition-all sm:pl-11 pl-5 `}>
      <h2 className="sm:text-[40px] text-[24px] sm:pt-[79px] pt-[75px] sm:ml-16 ml-8 font-semibold">
        Dashboard
      </h2>
      {userData && userData.jabatan === 'staff' && (
        <p className="sm:text-[25px] text-[24px] bg-[#92b5fb] mr-4 -mb-4 rounded-md font-normal sm:ml-16 ml-8 pl-4 py-2">
          Selamat Datang!
        </p>
      )
      }

      <div className="flex md:flex-row flex-col md:justify-evenly justify-start lg:gap-0 gap-5 lg:items-start items-center px-8">
        {userData && userData.jabatan === 'manager' && (
          <button onClick={handleSelesaiClick}>
            <Box
              bgColor={"bg-[#6EE014]"}
              icon={
                <IoCheckmarkDoneCircleOutline className="text-white ml-9 mt-7" />
              }
              text={"Selesai"}
              number={jumlahSelesaiData}
              hoverColor={"bg-blue-600"}
            />
          </button>
        )}
        {userData && userData.jabatan === 'manager' && (
          <button onClick={handleDitundaClick}>
            <Box
              bgColor={"bg-[#F76B03]"}
              icon={<IoTimeSharp className="text-white ml-9 mt-7" />}
              text={"Ditunda"}
              number={jumlahDitundaData}
              hoverColor={"bg-blue-600"}
            />
          </button>

        )}
      </div>
      <div className="flex  flex-col lg:flex-row ml-5 justfiy-center">
        <div className="sm:w-1/2">
          {userData && userData.jabatan === 'manager' && <RecentData />}
          {userData && userData.jabatan === 'admin' && <RecentData />}
          {userData && userData.jabatan === 'staff' && <TargetHarian />}
          
          <TodoList />
        </div>

        <div className="sm:w-1/2">
          <Calendar />
        </div>
      </div>
    </div>
  );
};
export default Page;
