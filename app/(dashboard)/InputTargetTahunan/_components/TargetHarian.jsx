import { useState, useEffect } from 'react';
import axios from 'axios';
import addTargetHarian from '@/hooks/add-target-harian';
import { getCookie } from '@/lib/cookieFunction';

const TargetHarian = () => {
    const cookie = process.env.NEXT_PUBLIC_COOKIE_NAME;
    const token = getCookie(cookie);
    const bearerToken = `Bearer ${token}`;
    const [inputTargetHarian, setInputTargetHarian] = useState('');
    const [selectedStaff, setSelectedStaff] = useState('');
    const [namaStaff, setNamaStaff] = useState([]);
    const [targets, setTargets] = useState([]);
    const [modalMessage, setModalMessage] = useState('');
    const [modalType, setModalType] = useState('');
    const [showModal, setShowModal] = useState(false);
    const { storeTargetHarian } = addTargetHarian();

    useEffect(() => {
        const fetchNamaStaff = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/nama-staff`, {
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
    }, [bearerToken]);

    const handleSubmitTarget = () => {
        if (inputTargetHarian.trim() !== '') {
            setTargets([...targets, inputTargetHarian.trim()]);
            setInputTargetHarian('');
        }
    };

    const handleSubmitHarian = async () => {
        if (!selectedStaff) {
            setModalMessage("Silakan pilih nama staff terlebih dahulu.");
            setModalType("error");
            setShowModal(true);
            return;
        }

        if (targets.length === 0) {
            setModalMessage("Silakan tambahkan target harian terlebih dahulu.");
            setModalType("error");
            setShowModal(true);
            return;
        }

        const result = await storeTargetHarian(selectedStaff, { target_harian: targets });

        if (result.success) {
            setModalMessage(result.message);
            setModalType("success");
            setShowModal(true);
            setTargets([]);
        } else {
            setModalMessage(result.message);
            setModalType("error");
            setShowModal(true);
        }
    };

    const handleDeleteTarget = (indexToRemove) => {
        const updatedTargets = targets.filter((_, index) => index !== indexToRemove);
        setTargets(updatedTargets);
    };



    const capitalizeFirstLetter = (string) => {
        if (string && typeof string === 'string' && string.length > 0) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        } else {
            return string;
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
                    <option className="sm:text-[17px] text-[10px]" value="">Pilih Nama Staff</option>
                    {namaStaff.map((staff, index) => (
                        <option className="sm:text-[17px] text-[10px]" key={index} value={staff.nip}>{staff.nama}</option>
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
                            <th className="border border-gray-500 p-2">Target Harian</th>
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
            <div className='justify-end mt-5 flex sm:mr-3 mr-0'>
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 mb-10 rounded-md sm:mr-2 mr-0"
                    onClick={handleSubmitHarian}
                >
                    Simpan Target Harian
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

export default TargetHarian;
