"use client"
import React, { useState, useEffect } from 'react';
import { IoIosArrowDropleftCircle } from "react-icons/io";
import Input from './_components/Input';
import Dropdown from './_components/dropdown';
import AddAktivitas from '@/hooks/add-aktivitas';
import useNamaNasabah from '@/hooks/use-nama-nasabah';
import useNamaKpi from '@/hooks/use-nama-kpi';
import Link from "next/link";
import { getCookie } from '@/lib/cookieFunction';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Page = () => {
    const router = useRouter();
    const [aktivitas, setAktivitas] = useState('');
    const [namaNasabah, setNamaNasabah] = useState('');
    const [alamat, setAlamat] = useState('');
    const [nomorHP, setNomorHP] = useState('');
    const [tipeNasabah, setTipeNasabah] = useState('');
    const [prospek, setProspek] = useState('');
    const [nominalProspek, setNominalProspek] = useState('');
    const [aktivitasSales, setAktivitasSales] = useState('');
    const [closing, setClosing] = useState('');
    const [statusAktivitas, setStatusAktivitas] = useState('');
    const [keteranganAktivitas, setKeteranganAktivitas] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [modalType, setModalType] = useState("");
    const { data, getNamaNasabah } = useNamaNasabah();
    const { data: dataKpi, getNamaKpi } = useNamaKpi();

    useEffect(() => {
        const fetchNamaNasabah = async () => {
            await getNamaNasabah();
        }
        fetchNamaNasabah()
    }, []);

    useEffect(() => {
        const fetchNamaKpi = async () => {
            await getNamaKpi();
        }
        fetchNamaKpi()
    }, []);

    const { updateData } = AddAktivitas();
    const [selectedNasabah, setSelectedNasabah] = useState("");
    const [selectedKpi, setSelectedKpi] = useState("");
    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleFileChange = (e) => {
        const files = e.target.files;
        if (files.length > 0) {
            setSelectedFiles(prevFiles => [
                ...prevFiles,
                ...Array.from(files)
            ]);
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        const requiredFields = [
            { name: 'nama_nasabah', value: namaNasabah },
            { name: 'aktivitas', value: aktivitas },
            { name: 'tipe_nasabah', value: tipeNasabah },
            { name: 'prospek', value: prospek },
            { name: 'nominal_prospek', value: nominalProspek },
            { name: 'closing', value: closing },
            { name: 'status_aktivitas', value: statusAktivitas },
            { name: 'keterangan_aktivitas', value: keteranganAktivitas },
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
                nama_nasabah: namaNasabah,
                aktivitas: aktivitas,
                tipe_nasabah: tipeNasabah,
                prospek: prospek,
                nominal_prospek: parseInt(nominalProspek),
                closing: parseInt(closing),
                status_aktivitas: statusAktivitas,
                keterangan_aktivitas: keteranganAktivitas,
            };

            const dokumentasiFiles = selectedFiles.length > 0 ? selectedFiles : null;

            await updateData(body, dokumentasiFiles);

            setModalMessage("Berhasil menambahkan aktivitas");
            setModalType("success");
            setModalVisible(true);
        } catch (error) {
            setError(error.message || "Terjadi kesalahan saat mengirim data.");
            setModalType("error");
            setModalVisible(true);
        } finally {
            setLoading(false);
        }
    };

    const handleCloseModal = () => {
        setModalVisible(false);
        if (modalType === "success") {
            router.push("/inputdata");
        }
    };

    const handleRemoveFile = (index) => {
        setSelectedFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
    };


    const handleGoBack = () => {
        router.back();
    };

    return (
        <div className={'bg-[#EAEAEA] h-full flex flex-col items-center sm:pt-[75px] pt-[60px] sm:pr-4 pr-3 sm:ml-20 ml-10}'}>
            <div className="flex items-center w-full">
                <h2 className="sm:text-3xl text-[24px] sm:ml-5 ml-2 font-bold sm:mt-3 sm:mb-3 mb-1">
                    Input Data Harian
                </h2>
                <div>
                    <IoIosArrowDropleftCircle
                        className="sm:h-10 sm:w-10 h-5 w-5 sm:ml-3 ml-0 transition-colors duration-300 hover:text-gray-400 focus:text-gray-400 cursor-pointer"
                        onClick={handleGoBack}
                    />
                </div>
            </div>
            <div className="bg-white rounded-2xl h-auto mb-6 sm:ml-5 ml-3 w-full sm:pt-5 pt-4">
                <div className='sm:flex sm:ml-0 ml-1 sm:mr-0 mr-2'>
                    <div className='sm:w-1/2 w-full'>
                        <label htmlFor="dropdown" className="text-black  text-[20px] font-medium mb-1 sm:px-10 pt-3 sm:gap-0 gap-6">
                            Nama Nasabah
                        </label>
                        {data && (
                            <Dropdown
                                value={selectedNasabah}
                                onChange={(e) => {
                                    if (e.label === "==Tambah Nasabah Baru==") {
                                        router.push("/inputdata-nasabah");
                                    } else {
                                        setNamaNasabah(e.label);
                                    }
                                }}
                                options={[
                                    { value: 'tambah-nasabah-baru', label: '==Tambah Nasabah Baru==' },
                                    ...data.map((nasabah, index) => ({
                                        value: nasabah.id,
                                        label: nasabah.nama
                                    })),
                                ]}
                                placeholder={"Pilih Nama Nasabah"}
                            />
                        )}


                        {/* <Input text={"Alamat"} value={alamat} onChange={e => setAlamat(e.target.value)} placeholder={"Masukkan Alamat"} /> */}

                        {/* <Input
                            text={"Nomor Telepon"}
                            value={nomorHP}
                            onChange={(e) => {
                                const re = /^[0-9\b]+$/;
                                if (e.target.value === '' || re.test(e.target.value)) {
                                    setNomorHP(e.target.value)
                                }
                            }}
                            placeholder={"Masukkan Nomor Telepon"}
                            type="number"
                        /> */}
                        <label htmlFor="dropdown" className="text-black text-[20px] font-medium mb-1 sm:px-10 pt-3 sm:gap-0 gap-6">
                            Aktivitas Sales
                        </label>
                        <Dropdown
                            value={selectedKpi}
                            onChange={(e) => setAktivitas(e.label)}
                            options={
                                dataKpi && Array.isArray(dataKpi) && dataKpi.length > 0
                                    ? dataKpi.map(({ nama_kpi }) => ({
                                        value: nama_kpi,
                                        label: nama_kpi,
                                    }))
                                    : [{ value: '', label: 'Belum ada aktivitas tersedia', disabled: true }]
                            }
                            placeholder="Pilih Aktivitas"
                        />

                        <label htmlFor="dropdown" className="text-black  text-[20px] font-medium mb-1 sm:px-10 pt-3 sm:gap-0 gap-6">
                            Tipe Nasabah
                        </label>
                        <Dropdown
                            value={tipeNasabah}
                            onChange={(newValue) => setTipeNasabah(newValue.value)}
                            options={[
                                { value: 'eksisting', label: 'Nasabah Eksisting' },
                                { value: 'baru', label: 'Nasabah Baru' }
                            ]}
                            placeholder="Tipe Nasabah"
                        />
                        <div className="mb-3 flex flex-col ">
                            <label htmlFor="dokumentasi" className="text-black text-[20px] font-medium mb-1 sm:px-10 pt-3 sm:gap-0 gap-6">
                                Dokumentasi
                            </label>
                            <input
                                type="file"
                                id="dokumentasi"
                                className="mt-1 pl- py-1 w-full rounded-md mb-1 sm:px-10 sm:gap-0 gap-6"
                                onChange={handleFileChange}
                                multiple
                            />
                            <div className='mt-1 pl- py-1 w-full rounded-md mb-1 sm:px-10 sm:gap-0 gap-6'>
                                <ul>
                                    {selectedFiles.length > 0 ? (
                                        <>
                                            <li>Dokumentasi yang ditambahkan:</li>
                                            {selectedFiles.map((file, index) => (
                                                <li key={index} className="flex items-center justify-between">
                                                    {file.name}
                                                    <button
                                                        onClick={() => handleRemoveFile(index)}
                                                        className="ml-2 text-red-500 hover:text-red-700"
                                                    >
                                                        Hapus
                                                    </button>
                                                </li>
                                            ))}
                                        </>
                                    ) : (
                                        <li>Belum ada dokumentasi yang ditambahkan</li>
                                    )}
                                </ul>
                            </div>
                        </div>

                    </div>
                    <div className='sm:w-1/2 w-full'>
                        <Input text={"Prospek"} value={prospek} onChange={e => setProspek(e.target.value)} placeholder={"Masukkan Prospek"} />
                        <Input
                            text={"Nominal Prospek"}
                            value={nominalProspek}
                            onChange={(e) => {
                                const re = /^[0-9\b]+$/;
                                if (e.target.value === '' || re.test(e.target.value)) {
                                    setNominalProspek(e.target.value)
                                }
                            }}
                            placeholder={"Masukkan Nominal Prospek"}
                            type="number"
                        />
                        <Input
                            text={"Closing"}
                            value={closing}
                            onChange={(e) => {
                                const re = /^[0-9\b]+$/;
                                if (e.target.value === '' || re.test(e.target.value)) {
                                    setClosing(e.target.value)
                                }
                            }}
                            placeholder={"Masukkan Closing"}
                            type="number"
                        />
                        <label htmlFor="dropdown" className="text-black  text-[20px] font-medium mb-1 sm:px-10 pt-3 sm:gap-0 gap-6">
                            Status Aktivitas
                        </label>
                        <Dropdown
                            value={statusAktivitas}
                            onChange={(newValue) => setStatusAktivitas(newValue.value)}
                            options={[
                                { value: 'selesai', label: 'Selesai' },
                                { value: 'ditunda', label: 'Ditunda' }
                            ]}
                            placeholder="Pilih  Status Aktivitas"
                        />
                        <label htmlFor="dropdown" className="text-black  text-[20px] font-medium mb-1 sm:mx-10 pt-3 sm:gap-0 gap-6">
                            Keterangan Aktivitas
                        </label>
                        <Dropdown
                            value={keteranganAktivitas}
                            onChange={(newValue) => setKeteranganAktivitas(newValue.value)}
                            options={[
                                { value: 'belum diproses', label: 'Belum Diproses' },
                                { value: 'diterima', label: 'Diterima' },
                                { value: 'ditolak', label: 'Ditolak' }
                            ]}
                            placeholder="Pilih  keterangan Aktivitas"
                        />
                        {/* <label htmlFor="dropdown" className="text-black  text-[20px] font-medium sm:mx-10 ">
                            Aktivitas Sales
                        </label>
                        <Dropdown
                            value={aktivitasSales}
                            onChange={(newValue) => setAktivitasSales(newValue.value)}
                            options={[
                                { value: 'prospek', label: 'Prospek' }
                            ]}
                            placeholder="Pilih  keterangan Aktivitas"
                        /> */}

                    </div>
                </div>
                <div className='flex gap-3 sm:justify-end justify-center mt-8 sm:mr-5'>
                    <button onClick={handleSubmit} disabled={loading}>
                        <div className="sm:mt-10 mt-1 mb-6 flex justify-center">
                            <div className="cursor-pointer hover:bg-[#467bac] bg-[#5293CE] items-center justify-center w-[170px] h-[40px] flex rounded-lg">
                                <p className="font-medium text-white text-semibold">{loading ? "Loading..." : "Tambah"}</p>
                            </div>
                        </div>
                    </button>
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
    );
};

export default Page;
