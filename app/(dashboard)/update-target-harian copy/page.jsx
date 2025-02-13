"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import updateTargetHarian from '@/hooks/update-target-harian';
import { getCookie } from '@/lib/cookieFunction';

const TargetHarian = () => {
    const cookie = process.env.NEXT_PUBLIC_COOKIE_NAME;
    const token = getCookie(cookie)
    const bearerToken = `Bearer ${token}`
    const [inputTargetHarian, setInputTargetHarian] = useState('');
    const [selectedStaff, setSelectedStaff] = useState('');
    const [namaStaff, setNamaStaff] = useState([]);
    const [targets, setTargets] = useState([]);
    const { loading, error, data, storeTargetHarian } = updateTargetHarian();

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
        if (inputTargetHarian.trim() !== '') {
            setTargets([...targets, inputTargetHarian.trim()]);
            setInputTargetHarian('');
        }
    };

    const handleSubmitHarian = async () => {
        try {
            await storeTargetHarian(selectedStaff, { target_harian: targets });
            alert("Data target harian berhasil disimpan");
        } catch (error) {
            console.error("Error: ", error);
            alert("Gagal menyimpan data target harian");
        }
    };

  return (
    <div className={`bg-[#EAEAEA] h-full flex flex-col items-center sm:pt-[75px] pt-[60px] sm:pr-4 pr-3 sm:ml-20 ml-10`}>
      <div className="flex items-center w-full">
        <h2 className="sm:text-[40px] text-[24px] sm:ml-5 ml-4 font-semibold">
          Input Target Staff
        </h2>
        {/* <Link href="/beranda">
          <IoIosArrowDropleftCircle className="sm:h-10 sm:w-10 h-5 w-5 sm:ml-3 ml-1" />
        </Link> */}
      </div>
      <div className="bg-white rounded-2xl h-auto mb-16 sm:ml-5 ml-3 w-full sm:pt-4 pt-6 ">
      <div className='pl-8 mt-4 mr-5'>
            <h2 className="sm:text-[30px] text-[24px] font-semibold">
                Input Target Harian
            </h2>
            <div className=''>
                <label htmlFor="staffSelect" className="block mb-2">Nama Staff:</label>
                <select
                    id="staffSelect"
                    className="border border-gray-300 sm:w-[200px] w-[100px] p-2 rounded-md bg-white"
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
                <label htmlFor="inputHarian" className="block mb-2">Target Harian:</label>
                <div className="flex mb-2">
                    <input
                        type="text"
                        id="inputHarian"
                        className="border border-gray-500 p-2 w-1/3 rounded-l-md bg-white"
                        value={inputTargetHarian}
                        onChange={(e) => setInputTargetHarian(e.target.value)}
                    />
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-r-md"
                        onClick={handleSubmitTarget}
                    >
                        Tambah
                    </button>
                </div>
                <table className="border border-gray-300 w-full mr-5">
                    <thead>
                        <tr>
                            <th className="border border-gray-500 p-1">No</th>
                            <th className="border border-gray-500 p-2">Target Harian</th>
                        </tr>
                    </thead>
                    <tbody>
                        {targets.map((target, index) => (
                            <tr key={index}>
                                <td className="border border-gray-500 p-1 text-center">{index + 1}</td>
                                <td className="border border-gray-500 p-2">{target}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='justify-end mt-5 flex mr-3'>
                <button
                    className="bg-blue-500 text-white px-4 py-2 mb-10 rounded-md mr-2"
                    onClick={handleSubmitHarian}
                >
                    Simpan Target Harian
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default TargetHarian;





