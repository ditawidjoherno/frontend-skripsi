"use client"
import { IoIosArrowDropleftCircle } from "react-icons/io";
import TeksProfil from '../_components/TeksProfil';
import Button from '../_components/button';
import useProfileNasabah from '@/hooks/use-profile-nasabah';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';


const Page = () => {
    const { id } = useParams();
    const router = useRouter();
    const { loading, error, data, getUserData } = useProfileNasabah(id);
    // const handleGetDataUser = async () => {
    //     await getUserData();
    // }

    console.log("id:", id);

    console.log("Data:", data);
    console.log("Error:", error);

    // useEffect(() => {
    //     getUserData();
    //     GetDataAktivitas();
    // }, []);

    if (!data) {
        return <div>Data not found</div>;
    }
    console.log(data)

    const capitalizeFirstLetter = (string) => {
        if (string && typeof string === 'string' && string.length > 0) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        } else {
            return string;
        }
    };

    const handleGoBack = () => {
        router.back();
    };

    return (
        <div className='bg-[#EAEAEA] h-full flex flex-col items-center sm:pt-[75px] pt-[60px] sm:pr-4 pr-3 sm:ml-20 ml-10'>
            <div className="flex items-center w-full">
                <h2 className="sm:text-[40px] text-[24px] sm:ml-5 ml-4 font-semibold">
                    Profil Nasabah
                </h2>
                <div>
                    <IoIosArrowDropleftCircle
                        className="sm:h-10 sm:w-10 h-5 w-5 sm:ml-3 ml-0 transition-colors duration-300 hover:text-gray-400 focus:text-gray-400 cursor-pointer"
                        onClick={handleGoBack}
                    />
                </div>
            </div>

            <div className='flex md:flex-row flex-col w-full pr-9 mb-5'>
                <div className="bg-white sm:max-w-full sm:min-w-[50%] rounded-2xl h-auto sm:ml-5 ml-3 w-full sm:mb-0 mb-5 sm:py-3 pt-6 ">
                    <h2 className='font-medium sm:text-[28px] text-[20px] sm:ml-11 ml-6'>Data Nasabah</h2>
                    <hr className="my-3 mx-6 border-t-2 justify-center items-center border-black mt-1" />
                    <div className="sm:flex justify-start flex-wrap mb-5 w-full ">
                        <div className='w-auto sm:mr-14'>
                            <TeksProfil label="Nama Nasabah" value={capitalizeFirstLetter(data.nama) || "-"} />
                            <TeksProfil label="Tipe Nasabah" value={capitalizeFirstLetter(data.tipe_nasabah) || "-"} />
                            <TeksProfil label="Nomor Telepon" value={data.nomor_telepon || "-"} />
                            <TeksProfil label="Jenis Kelamin" value={capitalizeFirstLetter(data.jenis_kelamin) || "-"} />
                            <TeksProfil label="Agama" value={capitalizeFirstLetter(data.agama) || "-"} />
                            <TeksProfil label="Tempat Lahir" value={capitalizeFirstLetter(data.tempat_lahir) || "-"} />
                            <TeksProfil label="Tanggal Lahir" value={data.tanggal_lahir || "-"} />
                            <TeksProfil label="Alamat" value={capitalizeFirstLetter(data.alamat) || "-"} />
                        </div>
                        <div className="w-auto">
                            <TeksProfil label="Status Pernikahan" value={capitalizeFirstLetter(data.status_pernikahan) || "-"} />
                            <TeksProfil label="Email" value={capitalizeFirstLetter(data.email) || "-"} />
                            <TeksProfil label="Data Pekerjaan / Usaha" value={capitalizeFirstLetter(data.pekerjaan) || "-"} />
                            <TeksProfil label="Alamat Pekerjaan / Usaha" value={capitalizeFirstLetter(data.alamat_pekerjaan) || "-"} />
                            <TeksProfil label="Estimasi Penghasilan / Usaha" value={capitalizeFirstLetter(data.estimasi_penghasilan_bulanan) || "-"} />
                        </div>

                    </div>
                </div>
                {data.data_pasangan && (
                    <div className="bg-white sm:max-w-full sm:min-w-[50%] rounded-2xl h-auto sm:ml-5 ml-3 w-full sm:mb-0 mb-5 sm:py-3 pt-6 ">
                        <h2 className='font-medium sm:text-[28px] text-[20px] sm:ml-11 ml-6'>Data Pasangan Nasabah</h2>
                        <hr className="my-3 mx-6 border-t-2 justify-center items-center border-black mt-1" />
                        <div className="sm:flex justify-start flex-wrap mb-5 w-full ">
                            <div className='w-auto sm:mr-14'>
                                <TeksProfil label="Nama Pasangan" value={capitalizeFirstLetter(data.data_pasangan?.nama) || "-"} />
                                <TeksProfil label="Nomor Telepon" value={capitalizeFirstLetter(data.data_pasangan?.nomor_telepon) || "-"} />
                                <TeksProfil label="Jenis Kelamin" value={capitalizeFirstLetter(data.data_pasangan?.jenis_kelamin) || "-"} />
                                <TeksProfil label="Agama" value={capitalizeFirstLetter(data.data_pasangan?.agama) || "-"} />
                                <TeksProfil label="Tempat Lahir" value={capitalizeFirstLetter(data.data_pasangan?.tempat_lahir) || "-"} />
                            </div>
                            <div className="w-auto">
                                <TeksProfil label="Tanggal Lahir" value={capitalizeFirstLetter(data.data_pasangan?.tanggal_lahir) || "-"} />
                                <TeksProfil label="Alamat" value={capitalizeFirstLetter(data.data_pasangan?.alamat) || "-"} />
                                <TeksProfil label="Data Pekerjaan / Usaha" value={capitalizeFirstLetter(data.data_pasangan?.pekerjaan) || "-"} />
                                <TeksProfil label="Alamat Pekerjaan / Usaha" value={capitalizeFirstLetter(data.data_pasangan?.alamat_pekerjaan) || "-"} />
                                <TeksProfil label="Estimasi Penghasilan / Usaha" value={capitalizeFirstLetter(data.data_pasangan?.estimasi_penghasilan_bulanan) || "-"} />
                            </div>

                        </div>
                    </div>
                )}

            </div>
            <div className='flex md:flex-row flex-col w-full pr-9 mb-5'>
                {data.data_anak.map((item, index) => (
                    <div key={index} className="bg-white sm:max-w-full sm:min-w-[50%] rounded-2xl h-auto sm:ml-5 ml-3 w-full sm:mb-0 mb-5 sm:py-3 pt-6 ">
                        <h2 className='font-medium sm:text-[28px] text-[20px] sm:ml-11 ml-6'>Data Anak Nasabah</h2>
                        <hr className="my-3 mx-6 border-t-2 justify-center items-center border-black mt-1" />
                        <div className="sm:flex justify-start flex-wrap mb-5 w-full ">
                            <div className='w-auto sm:mr-14'>
                                <TeksProfil label="Nama Nasabah" value={capitalizeFirstLetter(item?.nama) || "-"} />
                                <TeksProfil label="Nomor Telepon" value={item?.nomor_telepon || "-"} />
                                <TeksProfil label="Jenis Kelamin" value={capitalizeFirstLetter(item?.jenis_kelamin) || "-"} />
                                <TeksProfil label="Agama" value={capitalizeFirstLetter(item?.agama) || "-"} />
                                <TeksProfil label="Tempat Lahir" value={capitalizeFirstLetter(item?.tempat_lahir) || "-"} />
                            </div>
                            <div className="w-auto">
                                <TeksProfil label="Tanggal Lahir" value={item?.tanggal_lahir || "-"} />
                                <TeksProfil label="Alamat" value={capitalizeFirstLetter(item?.alamat) || "-"} />
                                <TeksProfil label="Data Pekerjaan / Usaha" value={capitalizeFirstLetter(item?.pekerjaan) || "-"} />
                                <TeksProfil label="Alamat Pekerjaan / Usaha" value={capitalizeFirstLetter(item?.alamat_pekerjaan) || "-"} />
                                <TeksProfil label="Estimasi Penghasilan / Usaha" value={capitalizeFirstLetter(item?.estimasi_penghasilan_bulanan) || "-"} />
                            </div>

                        </div>
                    </div>
                ))}
            </div>
            {/* <div className='flex w-full pr-9 mb-5'>
                <div className="bg-white max-w-full  min-w-[50%] rounded-2xl h-auto sm:ml-5 ml-3 w-full sm:py-3 pt-6 ">
                    <h2 className='font-medium sm:text-[28px] text-[20px] sm:ml-11 ml-6'>Dokumentasi</h2>
                    <hr className="my-3 mx-6  border-t-2 justify-center items-center border-black mt-1" />
                    <div className='flex md:flex-row flex-col items-center justify-center mb-5'>
                        <img src={data.dokumentasi} alt={`Foto`} className="sm:w-[250px] w-[100px] sm:h-[250px] h-[100px] mx-9 sm:mb-0 mb-3" />
                    </div>
                </div>
            </div> */}
            {/* <div className='w-full flex justify-end items-start h-full'>
                <Button className="justify-end"
                    text={"Ubah Data"}
                />
            </div> */}
        </div>

    )
}

export default Page;
