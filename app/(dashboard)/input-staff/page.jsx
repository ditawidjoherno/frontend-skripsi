"use client";
import React, { useState, useRef } from 'react';
import { IoIosArrowDropleftCircle } from "react-icons/io";
import Input from './_components/input';
import Button from './_components/button';
import Dropdown from './_components/dropdown';
import DateInput from './_components/Date';
import AddStaff from '@/hooks/add-users';
import DokumentasiButton from './_components/dokumentasibutton';
import Link from "next/link";


const Page = () => {
    // const [selectedOptions1, setSelectedOptions1] = useState('');
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
    const [dokumentasi, setDokumentasi] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    // const jeniskelamin = [
    //     { value: 'option1', label: 'Perempuan' },
    //     { value: 'option2', label: 'Laki-laki' }
    // ];

    // const agama = [
    //     { value: 'option1', label: 'Islam' },
    //     { value: 'option2', label: 'Kristen' },
    //     { value: 'option3', label: 'Katolik' },
    //     { value: 'option4', label: 'Hindu' },
    //     { value: 'option5', label: 'Budha' },
    //     { value: 'option6', label: 'Khonghucu' }
    // ];


    // const handleStatusNasabah = (selectedOption) => {
    //     setNasabahData({
    //         ...nasabahData,
    //         tipe_nasabah: selectedOption.value
    //     });
    // };


    // const handleJenisKelamin = (selectedOption) => {
    //     setNasabahData({
    //         ...nasabahData,
    //         jenis_kelamin: selectedOption.value
    //     });
    // };

    // const handleAgama = (selectedOption) => {
    //     setNasabahData({
    //         ...nasabahData,
    //         agama: selectedOption.value
    //     });
    // };

    const fileInputRef = useRef(null);

    const handleClick = () => {
        fileInputRef.current.click();
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];

    };
    const { updateData } = AddStaff();

    const handleSubmit = async () => {
        console.log("test");
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const body = {
                nama: namaStaff,
                nip: NIP,
                jabatan: jabatan,
                password: kataSandi,
                alamat: alamat,
                tanggal_lahir: tanggalLahir,
                tempat_lahir: tempatLahir,
                // nomor_hp: nomorTelepon,
                jenis_kelamin: jenisKelamin,
                email: email,
            };
            console.log(body)
            const response = await updateData(body);
            console.log(response)
            setSuccess(true);
        } catch (error) {
            setError(error.message || "Terjadi kesalahan saat mengirim data.");
        } finally {
            setLoading(false);
        }
    };

    function convertDateFormat(dateString) {
        const [month, day, year] = dateString.split('-');
        const newDateString = `${year}-${month}-${day}`;

        return newDateString;
    }

    const handleDateChange = () => {
        const formattedDate = convertDateFormat(e.target.value);
        setTanggalLahir(formattedDate);
    };

    // const handleFileUpload = (event) => {
    //     const file = event.target.files[0];
    // };

    // const handleClick = () => {
    //     fileInputRef.current.click();
    // };

    // const handleSubmit = async () => {
    //     try {
    //         const body = {
    //             nama_staff: 'nilai-namaStaff',
    //             nip: 'nilai-NIP',
    //             jabatan: 'nilai-jabatan',
    //             email: 'nilai-email',
    //             nomor_telepon: 'nilai-nomorTelepon',
    //             tanggal_mulai_bekerja: 'nilai-tanggalMulaiBekerja',
    //             agama: 'nilai-Agama',
    //             jenis_kelamin: 'nilai-jenisKelamin',
    //             kata_sandi_: 'nilai-kata_Sandi',
    //             dokumentasi: 'nilai-dokumentasi',
    //         };
    //         await updateData(body);
    //         setSuccess(true);
    //         alert("Berhasil ditambahkan")
    //     } catch (error) {
    //         setError(error.message || "Terjadi kesalahan saat mengirim data.");
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    return (
        <div className={"bg-[#EAEAEA] h-full flex flex-col items-center sm:pt-[75px] pt-[60px] sm:pr-4 pr-3 sm:ml-20 ml-10"}>
            <div className="flex items-center w-full">
                <h2 className="sm:text-[35px] text-[24px] sm:ml-5 ml-4 font-semibold">
                    Input Data Staff
                </h2>
                <Link href="/beranda">
                <IoIosArrowDropleftCircle className="sm:h-8 sm:w-8 h-5 w-5 sm:ml-3 ml-1 " />
                </Link>
            </div>
            <div className="bg-white rounded-2xl h-auto mt-2 sm:ml-5 ml-3 mb-6 w-full sm:pt-5 pt-6">
                <div className='sm:flex '>
                    <div className='sm:w-1/2 sm:mt-0 -mt-6 sm:ml-0 ml-2 sm:mr-0 -mr-2 mb-5'>
                        <Input text={"Nama Staff"} placeholder={"Masukkan Nama Lengkap"} value={namaStaff} onChange={e => setNamaStaff(e.target.value)} />
                        <div className="flex flex-col ">
                            <Input
                                text={"NIP"}
                                placeholder={"Masukkan NIP"}
                                value={NIP.toString()}
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
                                    { value: 'unit_head', label: 'Unit Head' },
                                    { value: 'staff', label: 'Staff' }
                                ]}
                                placeholder="Pilih Jabatan"
                            />
                        </div>
                        {/* <div className="flex flex-col ">
                            <Input text={"Email"} placeholder={"Masukkan Email"} />
                        </div> */}
                        <div className="flex flex-col ">
                            <Input text={"Nomor Telepon"} placeholder={"Masukkan Nomor Telepon"} value={nomorTelepon} onChange={e => setNomorTelepon(e.target.value)} />
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
                                    { value: 'wanita', label: 'wanita' },
                                    { value: 'pria', label: 'pria' }
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
                            <div className='flex gap-3 sm:justify-end justify-center mt-8 sm:mr-5'>
                    
                    <button onClick={handleSubmit} disabled={loading}>
                        <div className="sm:mt-10 mt-1 sm:mb-6 mb-5 flex justify-center">
                            <div className="cursor-pointer sm:bg-[#5293CE] bg-[#5293CE] items-center justify-center sm:w-[170px] w-[150px] sm:h-[40px] h-[35px] flex rounded-lg">
                                <p className="font-medium text-white text-semibold sm:text-[20px] text-[18px]">{loading ? "Loading..." : "Tambah"}</p>
                            </div>
                        </div>
                    </button>
                </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page;