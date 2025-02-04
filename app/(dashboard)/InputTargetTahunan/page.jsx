"use client";

import { useEffect, useState } from 'react';
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { getCookie } from '@/lib/cookieFunction';
import TargetHarian from './_components/TargetHarian';
import TargetMingguan from './_components/TargetMingguan';
import TargetTahunan from './_components/TargetTahunan';
import useUser from '@/hooks/use-user';


const Page = () => {
  const router = useRouter();
  const cookie = process.env.NEXT_PUBLIC_COOKIE_NAME;
  const token = getCookie(cookie);
  const bearerToken = `Bearer ${token}`;
  const { loading, error, data: userData, getUserData } = useUser();
  const [selectedStaff, setSelectedStaff] = useState();
  const [namaStaff, setNamaStaff] = useState();
  const [selectedTarget, setSelectedTarget] = useState('harian'); 

  useEffect(() => {
    const fetchNamaStaff = async () => {
      const response = await axios.get(`http://localhost:8000/api/nama-staff`, {
        headers: {
          Authorization: bearerToken
        }
      });
      setNamaStaff(response.data.data);
    };

    fetchNamaStaff();
  }, [bearerToken, selectedStaff]);

    useEffect(() => {
      getUserData();
    }, []);

  const handleGoBack = () => {
    router.back();
  };

  if (!userData) {
    return <div>No user data available</div>;
  }
  const { jabatan } = userData;


  const handleTargetChange = (e) => {
    setSelectedTarget(e.target.value);
  };

  

  return (
    <div className={`bg-[#EAEAEA] h-full pb-4 flex flex-col items-center sm:pt-[75px] pt-[55px] sm:pr-5 pr-3 sm:ml-20 ml-10`}>
      <div className="flex items-center w-full">
        <h2 className="sm:text-[40px] text-[24px] sm:ml-5 ml-4 font-semibold">
          Input Target Staff
        </h2>
        <div>
          <IoIosArrowDropleftCircle
            className="sm:h-10 sm:w-10 h-5 w-5 sm:ml-3 ml-0 transition-colors duration-300 hover:text-gray-400 focus:text-gray-400 cursor-pointer"
            onClick={handleGoBack}
          />
        </div>
      </div>
      <div className="bg-white rounded-2xl h-auto mb-16 sm:ml-5 ml-3 w-full sm:pt-4 pt-6 sm:mt-4 mt-3 ">
        {/* Dropdown for selecting the target type */}
        {(jabatan === 'admin') && (
          <div className='sm:mx-9 mx-3'>
            <TargetTahunan />
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
                <option value="harian">Target Harian</option>
                <option value="mingguan">Target Mingguan</option>
              </select>
            </div>

            {selectedTarget === 'harian' && <TargetHarian />}
            {selectedTarget === 'mingguan' && <TargetMingguan />}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
