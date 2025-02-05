"use client";
import React, { useState, useRef } from 'react';
import { IoIosArrowDropleftCircle } from "react-icons/io";
import Input from './_components/input';
import { useRouter } from 'next/navigation';
import Dropdown from './_components/dropdown';
import DateInput from './_components/Date';
import AddStaff from '@/hooks/add-users';
import SuccessMessage from './_components/popup';
import Link from "next/link";


const Page = () => {
    const router = useRouter();
    const [namaStaff, setNamaStaff] = useState('');
    const [NIP, setNIP] = useState('');
    const [jabatan, setJabatan] = useState('');
    const [alamat, setAlamat] = useState('');
    const [nomorTelepon, setNomorTelepon] = useState('');
    const [jenisKelamin, setJenisKelamin] = useState('');
    const [tempatLahir, setTempatLahir] = useState('');
    const [tanggalLahir, setTanggalLahir] = useState('');
    const [kataSandi, setKataSandi] = useState('');
    const [email, setEmail] = useState('');
    const [isDataUpdated, setIsDataUpdated] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [modalType, setModalType] = useState("");


    const [modalOpen, setModalOpen] = useState(false);


    const { updateData } = AddStaff();

    const handleSubmit = async () => {
        setLoading(true);
        setError(null);
        setSuccess(false); 

        const requiredFields = [
            { name: 'nama', value: namaStaff },
            { name: 'nip', value: NIP },
            { name: 'jabatan', value: jabatan },
            { name: 'password', value: kataSandi },
            { name: 'nomor_hp', value: nomorTelepon },
            { name: 'alamat', value: alamat },
            { name: 'tanggal_lahir', value: tanggalLahir },
            { name: 'tempat_lahir', value: tempatLahir },
            { name: 'jenis_kelamin', value: jenisKelamin },
            { name: 'email', value: email },

        ];

        const emptyFields = requiredFields.filter(field => !field.value);

        if (emptyFields.length > 0) {
            setModalMessage("Harap mengisi semua data.");
            setModalType("error");
            setModalVisible(true);
            setLoading(false);
            return;
        }

        try {
            const body = {
                nama: namaStaff,
                nip: NIP,
                jabatan: jabatan,
                password: kataSandi,
                nomor_hp: nomorTelepon,
                alamat: alamat,
                tanggal_lahir: tanggalLahir,
                tempat_lahir: tempatLahir,
                jenis_kelamin: jenisKelamin,
                email: email,
            };
            console.log(body);
            const response = await updateData(body);
            console.log(response);

            setModalMessage("Berhasil menambahkan User");
            setModalType("success");
            setModalVisible(true);
        } catch (error) {
            setError(error.message || "Terjadi kesalahan saat mengirim data.");
            setModalType("error");
            setModalVisible(true);
        } finally {
            setLoading(false);
            setModalOpen(true); 
        }
    };

    const handleCloseModal = () => {
        setModalVisible(false);
        if (modalType === "success") {
            router.push("/input-staff");
        }
    };

    const handleGoBack = () => {
        router.back();
    };

    return (
        <div className={"bg-[#EAEAEA] h-full flex flex-col items-center sm:pt-[75px] pt-[60px] sm:pr-4 pr-3 sm:ml-20 ml-10"}>
            <div className="flex items-center w-full">
                <h2 className="sm:text-[35px] text-[24px] sm:ml-5 ml-4 font-semibold">
                    Input Data Staff
                </h2>
                <div>
                    <IoIosArrowDropleftCircle
                        className="sm:h-10 sm:w-10 h-5 w-5 sm:ml-3 ml-0 transition-colors duration-300 hover:text-gray-400 focus:text-gray-400 cursor-pointer"
                        onClick={handleGoBack}
                    />
                </div>
            </div>
            <div className="bg-white rounded-2xl h-auto mt-2 sm:ml-5 ml-3 mb-6 w-full sm:pt-5 pt-6">
                <div className='sm:flex '>
                    <div className='sm:w-1/2 sm:mt-0 -mt-6 sm:ml-0 ml-2 sm:mr-0 -mr-2 mb-5'>
                        <Input text={"Nama Staff"} placeholder={"Masukkan Nama Lengkap"} value={namaStaff} onChange={e => setNamaStaff(e.target.value)} />
                        <div className="flex flex-col">
                            <Input
                                text={"NIP"}
                                placeholder={"Masukkan NIP"}
                                value={isNaN(NIP) ? "" : NIP.toString()} // Jika NIP adalah NaN, gunakan string kosong
                                onChange={e => setNIP(parseInt(e.target.value))}
                            />
                        </div>

                        <div className="flex flex-col ">
                            <label htmlFor="dropdown" className="text-black sm:text-[20px] text-[16px] font-medium flex sm:mb-1 -mb-1 sm:px-10 pt-3">
                                Jabatan
                            </label>
                            <Dropdown
                                value={jabatan}
                                onChange={(e) => setJabatan(e.value)}
                                options={[
                                    { value: 'manager', label: 'Manager' },
                                    { value: 'unit head', label: 'Unit Head' },
                                    { value: 'staff', label: 'Staff' }
                                ]}
                                placeholder="Pilih Jabatan"
                            />
                        </div>
                        {/* <div className="flex flex-col ">
                            <Input text={"Email"} placeholder={"Masukkan Email"} />
                        </div> */}
                        <div className="flex flex-col ">
                            <Input
                                text={"Nomor Telepon"}
                                value={nomorTelepon}
                                onChange={(e) => {
                                    const re = /^[0-9\b]+$/;
                                    if (e.target.value === '' || re.test(e.target.value)) {
                                        setNomorTelepon(e.target.value)
                                    }
                                }}
                                placeholder={"Masukkan Nomor Telepon"}
                                type="number"
                            />
                        </div>
                        <div className="flex flex-col ">
                            <Input text={"Alamat"} placeholder={"Masukkan Alamat"} value={alamat} onChange={e => setAlamat(e.target.value)} />
                        </div>

                    </div>
                    <div className='sm:w-1/2 w-full sm:ml-0 ml-2 -mt-3'>
                        <div className="flex flex-col ">
                            <DateInput text="Tanggal Lahir" placeholder="Masukkan Tanggal Lahir" name="tanggal_lahir" value={tanggalLahir} onChange={e => setTanggalLahir(e.target.value)} />
                        </div>
                        <div className="flex flex-col ">
                            <Input text={"Tempat Lahir"} placeholder={"Masukkan Tempat Lahir"} value={tempatLahir} onChange={e => setTempatLahir(e.target.value)} />
                        </div>
                        <div>
                            {/* <label htmlFor="dropdown" className="text-black sm:text-[20px] text-[20px] font-medium flex sm:mb-1 -mb-1 sm:px-10 pt-3">
                                Agama
                            </label>
                            <Dropdown
                                value={agama}
                                onChange={(newValue) => setAgama(newValue.value)}
                                options={[
                                    { value: 'option1', label: 'Islam' },
                                    { value: 'option2', label: 'Kristen' },
                                    { value: 'option3', label: 'Katolik' },
                                    { value: 'option4', label: 'Hindu' },
                                    { value: 'option5', label: 'Budha' },
                                    { value: 'option6', label: 'Khonghucu' }
                                ]}
                                placeholder="Pilih Agama"
                            /> */}
                            <label htmlFor="dropdown" className="text-black sm:text-[20px] text-[16px] font-medium sm:mb-1 -mb-1 sm:px-10 flex items-center sm:mt-3 mt-3 sm:pb-0 pb- ">
                                Jenis Kelamin</label>
                            <Dropdown
                                value={jenisKelamin}
                                onChange={(e) => setJenisKelamin(e.value)}
                                options={[
                                    { value: 'Perempuan', label: 'Wanita' },
                                    { value: 'Laki-laki', label: 'Pria' }
                                ]}
                                placeholder="Pilih Jenis Kelamin"
                            />
                            <div className="flex flex-col ">
                                <Input text={"Kata Sandi"} placeholder={"Masukkan Kata Sandi"} value={kataSandi} onChange={e => setKataSandi(e.target.value)} />
                            </div>
                            <div className="flex flex-col ">
                                <Input text={"E-mail"} placeholder={"Masukkan E-mail"} value={email} onChange={e => setEmail(e.target.value)} />
                            </div>
                            {/* <div className='flex gap-3 sm:justify-start justify-center sm:mt-1 mt-4 sm:mr-5'>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileUpload}
                                    style={{ display: 'none' }}
                                    ref={fileInputRef}
                                />
                                <button onClick={handleClick} className='bg-red-600'>Unggah Foto</button>
                                <DokumentasiButton onClick={handleClick} />
                            </div> */}
                            <div className='flex gap-3 sm:justify-end justify-center mt-1 sm:mr-5'>
                                <button onClick={handleSubmit} disabled={loading}>
                                    <div className="sm:mt-10 mt-5 sm:mb-6 mb-5 flex justify-center">
                                        <div className="cursor-pointer hover:bg-[#467bac] bg-[#5293CE] items-center justify-center sm:w-[170px] w-[100px] sm:h-[40px] h-[35px] flex rounded-lg">
                                            <p className="font-medium text-white text-semibold sm:text-[16px] text-[12px]">{loading ? "Loading..." : "Tambah"}</p>
                                        </div>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {modalVisible && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] sm:w-[400px] text-center">
                        <h3 className={`text-xl font-semibold ${modalType === "success" ? "text-green-600" : "text-red-600"}`}>
                            {modalType === "success" ? "Berhasil!" : "Gagal"}
                        </h3>
                        <p className="mt-4 text-lg">{modalMessage}</p>
                        <button
                            className="mt-6 bg-blue-500 text-white px-4 py-2 rounded"
                            onClick={handleCloseModal}
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}

        </div>
    )
}

export default Page;