"use client";

import { useState, useEffect } from 'react';
import { IoIosArrowDropleftCircle } from "react-icons/io";
import axios from 'axios';
import updateTargetMingguan from '@/hooks/update-target-mingguan';
import { getCookie } from '@/lib/cookieFunction';
import Link from "next/link";
import { useRouter } from 'next/navigation';


const TargetMingguan = () => {
    const router = useRouter();
    const cookie = process.env.NEXT_PUBLIC_COOKIE_NAME;
    const token = getCookie(cookie)
    const bearerToken = `Bearer ${token}`
    const [inputTargetMingguan, setInputTargetMingguan] = useState('');
    const [selectedStaff, setSelectedStaff] = useState('');
    const [namaStaff, setNamaStaff] = useState([]);
    const [targets, setTargets] = useState([]);
    const { loading, error, data, storeTargetMingguan } = updateTargetMingguan();

    useEffect(() => {
        const fetchNamaStaff = async () => {
            try {
                const response = await axios.get(`https://back-btn-boost.vercel.app/nama-staff`, {
                    headers: {
                        Authorization: bearerToken
                    }
                });
                setNamaStaff(response.data.data);
            } catch (error) {
                console.error("Error fetching staff names: ", error);
            }
        };

        fetchNamaStaff();
    }, [bearerToken, selectedStaff]);

    const handleSubmitTarget = () => {
        if (inputTargetMingguan.trim() !== '') {
            setTargets([...targets, inputTargetMingguan.trim()]);
            setInputTargetMingguan('');
        }
    };

    const handleSubmitMingguan = async () => {
        try {
            await storeTargetMingguan(selectedStaff, { target_mingguan: targets });
            alert("Data target Mingguan berhasil disimpan");
        } catch (error) {
            console.error("Error: ", error);
            alert("Gagal menyimpan data target Mingguan");
        }
    };

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
      };

      const handleGoBack = () => {
        router.back();
    };
    
  return (
    <div className={`bg-[#EAEAEA] h-screen flex flex-col items-center sm:pt-[75px] pt-[60px] sm:pr-4 pr-3 sm:ml-20 ml-10`}>
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
      <div className="bg-white rounded-2xl h-auto mb-16 sm:ml-5 ml-3 w-full sm:pt-4 pt-6">
      <div className='sm:mx-9 mx-3'>
            <h2 className="sm:text-[30px] text-[20px] font-semibold">
                Input Target Mingguan
            </h2>
            <div className=''>
                <label htmlFor="staffSelect" className="block mb-2 sm:text-[17px] text-[14px]">Nama Staff:</label>
                <select
                    id="staffSelect"
                    className="border border-gray-300 sm:w-[200px] w-[200px] sm:h-[45px] h-[35px] sm:text-[17px] text-[12px] p-2 rounded-md bg-white"
                    value={selectedStaff}
                    onChange={(e) => setSelectedStaff(e.target.value)}
                >
                    <option value="">Select Nama Staff</option>
                    {namaStaff.map((staff, index) => (
                        <option key={index} value={staff.nip}>{staff.nama}</option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="inputMingguan" className="block mb-2 sm:text-[17px] text-[14px]">Target Mingguan:</label>
                <div className="flex mb-2">
                    <input
                        type="text"
                        id="inputMingguan"
                        className="border border-gray-500 p-2 sm:w-1/3 w-full sm:h-[45px] h-[30px] sm:text-[17px] text-[12px] rounded-l-md bg-white"
                        value={inputTargetMingguan}
                        onChange={(e) => setInputTargetMingguan(e.target.value)}
                    />
                    <button
                        className="bg-blue-500 text-white px-4 sm:py-2 py-0 sm:h-[45px] h-[30px] rounded-r-md sm:text-[17px] text-[12px]"
                        onClick={handleSubmitTarget}
                    >
                        Tambah
                    </button>
                </div>
                <table className="border border-gray-300 w-full mr-5">
                    <thead>
                        <tr>
                            <th className="border border-gray-500 p-1 sm:text-[17px] text-[12px]">No</th>
                            <th className="border border-gray-500 p-2 sm:text-[17px] text-[12px]">Target Mingguan</th>
                        </tr>
                    </thead>
                    <tbody>
                        {targets.map((target, index) => (
                            <tr key={index}>
                                <td className="border border-gray-500 p-1 sm:text-[17px] text-[12px] text-center">{index + 1}</td>
                                <td className="border border-gray-500 p-2 sm:text-[17px] text-[12px]">{capitalizeFirstLetter(target)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='justify-end mt-5 flex'>
                <button
                    className="bg-blue-500 text-white sm:px-4 px-3 sm:py-2 py-2 mb-10 sm:text-[17px] text-[12px] rounded-md"
                    onClick={handleSubmitMingguan}
                >
                    Simpan Target Mingguan
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default TargetMingguan;





