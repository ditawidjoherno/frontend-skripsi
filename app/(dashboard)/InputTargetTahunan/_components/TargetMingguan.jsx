"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import addTargetMingguan from '@/hooks/add-target-mingguan';
import { getCookie } from '@/lib/cookieFunction';

const TargetMingguan = () => {
    const cookie = process.env.NEXT_PUBLIC_COOKIE_NAME;
    const token = getCookie(cookie);
    const bearerToken = `Bearer ${token}`;
    const [inputTargetMingguan, setInputTargetMingguan] = useState('');
    const [selectedStaff, setSelectedStaff] = useState('');
    const [namaStaff, setNamaStaff] = useState([]);
    const [targets, setTargets] = useState([]);
    const [modalMessage, setModalMessage] = useState('');
    const [modalType, setModalType] = useState('');
    const [showModal, setShowModal] = useState(false);
    const { loading, storeTargetMingguan } = addTargetMingguan();

    useEffect(() => {
        const fetchNamaStaff = async () => {
            try {
                const response = await axios.get(`https://backend-monitoring-btn-production.up.railway.app/api/nama-staff`, {
                    headers: {
                        Authorization: bearerToken,
                    },
                });
                setNamaStaff(response.data.data);
            } catch (error) {
                console.error('Error fetching staff names:', error);
            }
        };

        fetchNamaStaff();
    }, [bearerToken]);

    const handleSubmitTarget = () => {
        if (inputTargetMingguan.trim() !== '') {
            setTargets([...targets, inputTargetMingguan.trim()]);
            setInputTargetMingguan('');
        }
    };

    const handleSubmitMingguan = async () => {
        if (!selectedStaff) {
            setModalMessage('Silakan pilih nama staff terlebih dahulu.');
            setModalType('error');
            setShowModal(true);
            return;
        }

        if (targets.length === 0) {
            setModalMessage('Silakan tambahkan target mingguan terlebih dahulu.');
            setModalType('error');
            setShowModal(true);
            return;
        }

        try {
            const result = await storeTargetMingguan(selectedStaff, { target_mingguan: targets });

            if (result.success) {
                setModalMessage(result.message);
                setModalType('success');
                setShowModal(true);
                setTargets([]);
            } else {
                setModalMessage(result.message);
                setModalType('error');
                setShowModal(true);
            }
        } catch (error) {
            console.error('Error:', error);
            setModalMessage('Gagal menyimpan data target mingguan.');
            setModalType('error');
            setShowModal(true);
        }
    };

    const capitalizeFirstLetter = (string) => {
        if (string && typeof string === 'string' && string.length > 0) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        } else {
            return string;
        }
    };

    const handleDeleteTarget = (indexToRemove) => {
        const updatedTargets = targets.filter((_, index) => index !== indexToRemove);
        setTargets(updatedTargets);
    };


    return (
        <div className="sm:pl-8 pl-4 sm:mt-4 mt-2 mr-5 sm:mb-2 mb-3">
            <h2 className="sm:text-[30px] text-[22px] font-semibold">Input Target Mingguan</h2>
            <div>
                <label htmlFor="staffSelect" className="block sm:mb-2 mb-3">Nama Staff:</label>
                <select
                    id="staffSelect"
                    className="border border-gray-300 sm:w-[200px] w-[190px] p-2 rounded-md bg-white"
                    value={selectedStaff}
                    onChange={(e) => setSelectedStaff(e.target.value)}
                >
                    <option value="">Pilih Nama Staff</option>
                    {namaStaff.map((staff, index) => (
                        <option key={index} value={staff.nip}>{capitalizeFirstLetter(staff.nama)}</option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="inputMingguan" className="block sm:mb-2 mb-3">Target Mingguan:</label>
                <div className="flex sm:mb-2 mb-4">
                    <input
                        type="text"
                        id="inputMingguan"
                        className="border border-gray-500 p-2 sm:w-1/3 w-2/3 rounded-l-md bg-white"
                        value={inputTargetMingguan}
                        onChange={(e) => setInputTargetMingguan(e.target.value)}
                    />
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-md"
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
                            <th className="border border-gray-500 p-2">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {targets.map((target, index) => (
                            <tr key={index}>
                                <td className="border border-gray-500 p-1 text-center">{index + 1}</td>
                                <td className="border border-gray-500 p-2">{capitalizeFirstLetter(target)}</td>
                                <td className="border border-gray-500 p-2 text-center">
                                    <button
                                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
                                        onClick={() => handleDeleteTarget(index)}
                                    >
                                        Hapus
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
            <div className="justify-end mt-5 flex">
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                    onClick={handleSubmitMingguan}
                    disabled={loading}
                >
                    Simpan Target Mingguan
                </button>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-5 rounded-md shadow-lg">
                        <h3 className={`text-lg font-bold ${modalType === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                            {modalType === 'success' ? 'Berhasil' : 'Gagal'}
                        </h3>
                        <p className="mt-2">{modalMessage}</p>
                        <button
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 mt-4 rounded-md"
                            onClick={() => setShowModal(false)}
                        >
                            Tutup
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TargetMingguan;
