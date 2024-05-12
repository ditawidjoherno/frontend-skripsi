import { useState, useEffect } from 'react';
import axios from 'axios';
import addTargetHarian from '@/hooks/add-target-harian';
import { getCookie } from '@/lib/cookieFunction';

const TargetHarian = () => {
    const cookie = process.env.NEXT_PUBLIC_COOKIE_NAME;
    const token = getCookie(cookie)
    const bearerToken = `Bearer ${token}`
    const [inputTargetHarian, setInputTargetHarian] = useState('');
    const [selectedStaff, setSelectedStaff] = useState('');
    const [namaStaff, setNamaStaff] = useState([]);
    const [targets, setTargets] = useState([]);
    const { loading, error, data, storeTargetHarian } = addTargetHarian();

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
        <div className='sm:pl-8 pl-4 sm:mt-4 mt-2 mr-5 sm:mb-2 mb-3'>
            <h2 className="sm:text-[30px] text-[22px] font-semibold">
                Input Target Harian
            </h2>
            <div className=''>
                <label htmlFor="staffSelect" className="block sm:mb-2 mb-3 ">Nama Staff:</label>
                <select
                    id="staffSelect"
                    className="border border-gray-300 sm:w-[200px] w-[190px] p-2 sm:mb-2 mb-4 rounded-md bg-white"
                    value={selectedStaff}
                    onChange={(e) => setSelectedStaff(e.target.value)}
                >
                    <option className="sm:text-[15px] text-[12px]" value="">Select Nama Staff</option>
                    {namaStaff.map((staff, index) => (
                        <option className="sm:text-[15px] text-[12px]" key={index} value={staff.nip}>{staff.nama}</option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="inputHarian" className="block sm:mb-2 mb-3">Target Harian:</label>
                <div className="flex sm:mb-2 mb-4">
                    <input
                        type="text"
                        id="inputHarian"
                        className="border border-gray-500 p-2 sm:w-1/3 w-2/3 rounded-l-md bg-white "
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
            <div className='justify-end mt-5 flex sm:mr-3 mr-0'>
                <button
                    className="bg-blue-500 text-white px-4 py-2 mb-10 rounded-md sm:mr-2 mr-0"
                    onClick={handleSubmitHarian}
                >
                    Simpan Target Harian
                </button>
            </div>
        </div>
    );
};

export default TargetHarian;