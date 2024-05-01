import { useState, useEffect } from 'react';
import axios from 'axios';
import addTargetMingguan from '@/hooks/add-target-mingguan';
import { getCookie } from '@/lib/cookieFunction';

const TargetMingguan = () => {
    const cookie = process.env.NEXT_PUBLIC_COOKIE_NAME;
    const token = getCookie(cookie)
    const bearerToken = `Bearer ${token}`
    const [inputTargetMingguan, setInputTargetMingguan] = useState('');
    const [selectedStaff, setSelectedStaff] = useState('');
    const [namaStaff, setNamaStaff] = useState([]);
    const [targets, setTargets] = useState([]);
    const { loading, error, data, storeTargetMingguan } = addTargetMingguan();

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

    return (
        <div className='pl-8 mt-4 mr-5'>
            <h2 className="sm:text-[30px] text-[24px] font-semibold">
                Input Target Mingguan
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
                <label htmlFor="inputMingguan" className="block mb-2">Target Mingguan:</label>
                <div className="flex mb-2">
                    <input
                        type="text"
                        id="inputMingguan"
                        className="border border-gray-500 p-2 w-1/3 rounded-l-md bg-white"
                        value={inputTargetMingguan}
                        onChange={(e) => setInputTargetMingguan(e.target.value)}
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
                            <th className="border border-gray-500 p-2">Target Mingguan</th>
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
                    onClick={handleSubmitMingguan}
                >
                    Simpan Target Mingguan
                </button>
            </div>
        </div>
    );
};

export default TargetMingguan;
