"use client";

import { useState, useEffect } from "react";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import axios from "axios";
import updateTargetMingguan from "@/hooks/update-target-mingguan";
import { getCookie } from "@/lib/cookieFunction";
import { useRouter } from "next/navigation";

const TargetMingguan = () => {
    const router = useRouter();
    const cookie = process.env.NEXT_PUBLIC_COOKIE_NAME;
    const token = getCookie(cookie);
    const bearerToken = `Bearer ${token}`;
    const [inputTargetMingguan, setInputTargetMingguan] = useState("");
    const [selectedStaff, setSelectedStaff] = useState("");
    const [namaStaff, setNamaStaff] = useState([]);
    const [targets, setTargets] = useState([]);
    const [modalMessage, setModalMessage] = useState("");
    const [modalType, setModalType] = useState(""); 
    const [showModal, setShowModal] = useState(false);

    const { storeTargetMingguan } = updateTargetMingguan();

    useEffect(() => {
        const fetchNamaStaff = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/nama-staff`, {
                    headers: { Authorization: bearerToken },
                });
                setNamaStaff(response.data.data);
            } catch (error) {
                console.error("Error fetching staff names: ", error);
            }
        };

        fetchNamaStaff();
    }, [bearerToken]);

    const handleSubmitTarget = () => {
        if (inputTargetMingguan.trim() !== "") {
            setTargets([...targets, inputTargetMingguan.trim()]);
            setInputTargetMingguan("");
        }
    };

    const handleDeleteTarget = (index) => {
        const updatedTargets = targets.filter((_, i) => i !== index);
        setTargets(updatedTargets);
    };

    const handleSubmitMingguan = async () => {
        if (!selectedStaff) {
            setModalMessage("Silakan pilih nama staff terlebih dahulu.");
            setModalType("error");
            setShowModal(true);
            return;
        }

        if (targets.length === 0) {
            setModalMessage("Silakan tambahkan target mingguan terlebih dahulu.");
            setModalType("error");
            setShowModal(true);
            return;
        }

        try {
            const result = await storeTargetMingguan(selectedStaff, { target_mingguan: targets });
            if (result.success) {
                setModalMessage(result.message || "Data target mingguan berhasil disimpan.");
                setModalType("success");
                setTargets([]);
            } else {
                setModalMessage(result.message || "Gagal menyimpan data target mingguan.");
                setModalType("error");
            }
        } catch (error) {
            console.error("Error: ", error);
            setModalMessage("Terjadi kesalahan saat menyimpan data.");
            setModalType("error");
        } finally {
            setShowModal(true);
        }
    };

    
    const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

    const handleGoBack = () => {
        router.back();
    };

    return (
        <div className="bg-[#EAEAEA] h-screen flex flex-col items-center sm:pt-[75px] pt-[55px] sm:pr-4 pr-3 sm:ml-20 ml-10">
            <div className="flex items-center w-full">
                <h2 className="sm:text-[40px] text-[24px] sm:ml-5 ml-4 font-semibold">Ubah Target Staff</h2>
                <IoIosArrowDropleftCircle
                    className="sm:h-10 sm:w-10 h-5 w-5 sm:ml-3 ml-0 transition-colors duration-300 hover:text-gray-400 focus:text-gray-400 cursor-pointer"
                    onClick={handleGoBack}
                />
            </div>
            <div className="bg-white rounded-2xl h-auto mb-16 sm:ml-5 ml-3 w-full sm:pt-4 pt-6 mt-3">
                <div className="sm:mx-9 mx-3">
                    <h2 className="sm:text-[30px] text-[20px] font-semibold">Ubah Target Mingguan</h2>
                    <div>
                        <label htmlFor="staffSelect" className="block mb-2 sm:text-[17px] text-[14px]">Nama Staff:</label>
                        <select
                            id="staffSelect"
                            className="border border-gray-300 sm:w-[200px] w-[200px] sm:h-[45px] h-[35px] sm:text-[17px] text-[12px] p-2 rounded-md bg-white"
                            value={selectedStaff}
                            onChange={(e) => setSelectedStaff(e.target.value)}
                        >
                            <option value="">Pilih Nama Staff</option>
                            {namaStaff.map((staff, index) => (
                                <option key={index} value={staff.nip}>{staff.nama}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="inputMingguan" className="block mb-2 mt-3 sm:text-[17px] text-[14px]">Target Mingguan:</label>
                        <div className="flex mb-2">
                            <input
                                type="text"
                                id="inputMingguan"
                                className="border border-gray-500 p-2 sm:w-1/3 w-full sm:h-[45px] h-[30px] sm:text-[17px] text-[12px] rounded-l-md bg-white"
                                value={inputTargetMingguan}
                                onChange={(e) => setInputTargetMingguan(e.target.value)}
                            />
                            <button
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 sm:py-2 py-0 sm:h-[45px] h-[30px] sm:text-[17px] text-[12px] rounded-r-md"
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
                                    <th className="border border-gray-500 p-2 sm:text-[17px] text-[12px]">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {targets.map((target, index) => (
                                    <tr key={index}>
                                        <td className="border border-gray-500 p-1 text-center sm:text-[17px] text-[12px]">{index + 1}</td>
                                        <td className="border border-gray-500 p-2 sm:text-[17px] text-[12px]">{capitalizeFirstLetter(target)}</td>
                                        <td className="border border-gray-500 p-2 text-center">
                                            <button
                                                className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded sm:text-[14px] text-[10px]"
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
                            className="bg-blue-500 hover:bg-blue-600 text-white sm:px-4 px-3 sm:py-2 py-2 mb-10 sm:text-[17px] text-[12px] rounded-md"
                            onClick={handleSubmitMingguan}
                        >
                            Simpan Target Mingguan
                        </button>
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-5 rounded-md shadow-lg">
                        <h3 className={`text-lg font-bold ${modalType === "success" ? "text-green-600" : "text-red-600"}`}>
                            {modalType === "success" ? "Berhasil" : "Gagal"}
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
