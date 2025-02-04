"use client";
import React, { useEffect, useState } from 'react';
import { IoIosArrowDropleftCircle } from "react-icons/io";
import InputPopup from './_components/popup';
import TableKpi from './_components/tabelnilaikpi';
import Dropdown from './_components/dropdown';
import TabelKpiBulan from './_components/TabelKpiBulan';
import useUser from '@/hooks/use-user';
import TableKpiMonitoring from './_components/tabelnilaikpimonitoring';
import AllTarget from './_components/TargetHarian';
import TargetHarianMonitoring from './_components/TargetHarian';
import TargetMingguanMonitoring from './_components/TargetMingguan';
import TargetTahunanMonitoring from './_components/TargetTahunanMonitoring';
import { useRouter } from 'next/navigation';
import { FaSpinner } from 'react-icons/fa';

const Page = () => {
  const router = useRouter();
  const { loading, error, data: userData, getUserData } = useUser();
  const [inputData, setInputData] = useState([]);
  const [selectedTarget, setSelectedTarget] = useState('tahunan'); 
  useEffect(() => {
    getUserData();
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <FaSpinner className="animate-spin mr-2" /> Loading
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!userData) {
    return <div>No user data available</div>;
  }

  const { jabatan } = userData;

  const handleGoBack = () => {
    router.back();
  };

  const handleTargetChange = (event) => {
    setSelectedTarget(event.target.value);
  };

  return (
    <div className={`bg-[#EAEAEA] h-full flex flex-col items-center sm:pt-[75px] pt-[40px] sm:pr-4 pr-3 sm:ml-20 ml-10`}>
      <div className="flex items-center w-full">
        <h2 className="sm:text-[40px] text-[24px] sm:ml-5 ml-4 font-semibold">
          Target
        </h2>
        <div>
          <IoIosArrowDropleftCircle
            className="sm:h-10 sm:w-10 h-5 w-5 sm:ml-3 ml-0 transition-colors duration-300 hover:text-gray-400 focus:text-gray-400 cursor-pointer"
            onClick={handleGoBack}
          />
        </div>
      </div>
      <div className="bg-white rounded-2xl h-auto sm:ml-5 ml-3 w-full sm:pt-10 pt-6 mt-3 ">
        {jabatan === 'manager' && (
          <div className='sm:mx-9 mx-3'>
            <TableKpiMonitoring />
          </div>
        )}

        {jabatan === 'staff' && (
          <TableKpi data={inputData} />
        )}

        {(jabatan === 'admin') && (
          <div className='sm:mx-9 mx-3'>
            <TargetTahunanMonitoring />
          </div>
        )}

        {jabatan === 'unit head' && (
          <div className='sm:mx-9 mx-3'>
            <div className="mb-4">
              <label htmlFor="targetSelect" className="block text-lg font-semibold mb-2">Pilih Target:</label>
              <select
                id="targetSelect"
                className="border border-gray-300 p-2 rounded-md"
                value={selectedTarget}
                onChange={handleTargetChange}
              >
                <option value="tahunan">Target Tahunan</option>
                <option value="mingguan">Target Mingguan</option>
                <option value="harian">Target Harian</option>
              </select>
            </div>
            {selectedTarget === 'tahunan' && <TargetTahunanMonitoring />}
            {selectedTarget === 'mingguan' && <TargetMingguanMonitoring />}
            {selectedTarget === 'harian' && <TargetHarianMonitoring />}
          </div>
        )}
      </div>
    </div >
  );
};

export default Page;
