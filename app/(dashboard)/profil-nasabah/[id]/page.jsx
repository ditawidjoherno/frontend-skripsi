"use client"
import { IoIosArrowDropleftCircle } from "react-icons/io";
import TeksProfil from '../_components/TeksProfil';
import Button from '../_components/button';
import useProfileNasabah from '@/hooks/use-profile-nasabah';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';


const page = () => {
    const { id } = useParams();
    const { loading, error, data, getUserData } = useProfileNasabah(id);

    const handleGetDataUser = async () => {
        await getUserData();
    }


    console.log("id:", id);


    useEffect(() => {
        getUserData();
    }, []);

    if (!data) {
        return <div>Data not found</div>;
    }

    return (
        <div className='bg-[#EAEAEA] h-full flex flex-col items-center sm:pt-[75px] pt-[60px] sm:pr-4 pr-3 sm:ml-20 ml-10'>
            <div className="flex items-center w-full">
                <h2 className="sm:text-[40px] text-[24px] sm:ml-5 ml-4 font-semibold">
                    Profil Nasabah
                </h2>
                <IoIosArrowDropleftCircle className="sm:h-10 sm:w-10 h-5 w-5 sm:ml-3 ml-1" />
            </div>

            <div className='flex md:flex-row flex-col w-full pr-9 mb-5'>
                <div className="bg-white sm:max-w-full sm:min-w-[50%] rounded-2xl h-auto sm:ml-5 ml-3 w-full sm:mb-0 mb-5 sm:py-3 pt-6 ">
                    <h2 className='font-medium text-[28px] ml-11'>Data Nasabah</h2>
                    <hr className="my-3 mx-6 border-t-2 justify-center items-center border-black mt-1" />
                    <div className="sm:flex justify-start flex-wrap mb-5 w-full ">
                        <div className='w-auto sm:mr-14'>
                            <TeksProfil label="Nama Nasabah" value={data.nama} />
                            <TeksProfil label="Tipe Nasabah" value={data.tipe_nasabah} />
                            <TeksProfil label="Nomor Telepon" value={data.nomor_telepon} />
                            <TeksProfil label="Jenis Kelamin" value={data.jenis_kelamin} />
                            <TeksProfil label="Agama" value={data.agama} />
                            <TeksProfil label="Tempat Lahir" value={data.tempat_lahir} />
                            <TeksProfil label="Tanggal Lahir" value={data.tanggal_lahir} />
                            <TeksProfil label="Alamat" value={data.alamat} />
                        </div>
                        <div className="w-auto">
                            <TeksProfil label="Status Pernikahan" value={data.status_pernikahan} />
                            <TeksProfil label="Email" value={data.email} />
                            <TeksProfil label="Data Pekerjaan / Usaha" value={data.pekerjaan} />
                            <TeksProfil label="Alamat Pekerjaan / Usaha" value={data.alamat_pekerjaan} />
                            <TeksProfil label="Estimasi Penghasilan / Usaha" value={data.estimasi_penghasilan_bulanan} />
                        </div>
                    </div>
                </div>
                {data.data_pasangan && (
                    <div className="bg-white sm:max-w-full sm:min-w-[50%] rounded-2xl h-auto sm:ml-5 ml-3 w-full sm:mb-0 mb-5 sm:py-3 pt-6 ">
                        <h2 className='font-medium text-[28px] ml-11'>Data Pasangan Nasabah</h2>
                        <hr className="my-3 mx-6 border-t-2 justify-center items-center border-black mt-1" />
                        <div className="sm:flex justify-start flex-wrap mb-5 w-full ">
                            <div className='w-auto sm:mr-14'>
                                <TeksProfil label="Nama Pasangan" value={data.data_pasangan.nama} />
                                <TeksProfil label="Status Nasabah" value={data.data_pasangan.tipe_nasabah} />
                                <TeksProfil label="Nomor Telepon" value={data.data_pasangan.nomor_telepon} />
                                <TeksProfil label="Jenis Kelamin" value={data.data_pasangan.jenis_kelamin} />
                                <TeksProfil label="Agama" value={data.data_pasangan.agama} />
                                <TeksProfil label="Tempat Lahir" value={data.data_pasangan.tempat_lahir} />
                                <TeksProfil label="Tanggal Lahir" value={data.data_pasangan.tanggal_lahir} />
                                <TeksProfil label="Alamat" value={data.data_pasangan.alamat} />
                            </div>
                            <div className="w-auto">
                                <TeksProfil label="Status Pernikahan" value={data.data_pasangan.status_pernikahan} />
                                <TeksProfil label="Email" value={data.data_pasangan.email} />
                                <TeksProfil label="Data Pekerjaan / Usaha" value={data.data_pasangan.pekerjaan} />
                                <TeksProfil label="Alamat Pekerjaan / Usaha" value={data.data_pasangan.alamat_pekerjaan} />
                                <TeksProfil label="Estimasi Penghasilan / Usaha" value={data.data_pasangan.estimasi_penghasilan_bulanan} />
                            </div>
                        </div>
                    </div>
                )}

            </div>
            <div className='flex w-full pr-9 mb-5'>
                {data.data_anak.map((item, index) => (
                    <div key={index} className="bg-white sm:max-w-full sm:min-w-[50%] rounded-2xl h-auto sm:ml-5 ml-3 w-full sm:mb-0 mb-5 sm:py-3 pt-6 ">
                        <h2 className='font-medium text-[28px] ml-11'>Data Anak Nasabah</h2>
                        <hr className="my-3 mx-6 border-t-2 justify-center items-center border-black mt-1" />
                        <div className="sm:flex justify-start flex-wrap mb-5 w-full ">
                            <div className='w-auto sm:mr-14'>
                                <TeksProfil label="Nama Nasabah" value={item.nama} />
                                <TeksProfil label="Status Nasabah" value={item.tipe_nasabah} />
                                <TeksProfil label="Nomor Telepon" value={item.nomor_telepon} />
                                <TeksProfil label="Jenis Kelamin" value={item.jenis_kelamin} />
                                <TeksProfil label="Agama" value={item.agama} />
                                <TeksProfil label="Tempat Lahir" value={item.tempat_lahir} />
                                <TeksProfil label="Tanggal Lahir" value={item.tanggal_lahir} />
                                <TeksProfil label="Alamat" value={item.alamat} />
                            </div>
                            <div className="w-auto">
                                <TeksProfil label="Status Pernikahan" value={item.status_pernikahan} />
                                <TeksProfil label="Email" value={item.email} />
                                <TeksProfil label="Data Pekerjaan / Usaha" value={item.pekerjaan} />
                                <TeksProfil label="Alamat Pekerjaan / Usaha" value={item.alamat_pekerjaan} />
                                <TeksProfil label="Estimasi Penghasilan / Usaha" value={item.estimasi_penghasilan_bulanan} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className='flex w-full pr-9 mb-5'>
                <div className="bg-white max-w-full  min-w-[50%] rounded-2xl h-auto sm:ml-5 ml-3 w-full sm:py-3 pt-6 ">
                    <h2 className='font-medium text-[28px] ml-11'>Dokumentasi</h2>
                    <hr className="my-3 mx-6  border-t-2 justify-center items-center border-black mt-1" />
                    <div className='flex md:flex-row flex-col items-center justify-center mb-5'>
                        <img src={"/img/profil.png"} alt="Foto Profil" className="sm:w-[250px] w-[100px] sm:h-[250px] h-[100px] mx-9 sm:mb-0 mb-3" />
                        <img src={"/img/profil.png"} alt="Foto Profil" className="sm:w-[250px] w-[100px] sm:h-[250px] h-[100px] mx-9 sm:mb-0 mb-3" />
                        <img src={"/img/profil.png"} alt="Foto Profil" className="sm:w-[250px] w-[100px] sm:h-[250px] h-[100px] mx-9 sm:mb-0 mb-3" />
                    </div>
                </div>

            </div>
            <div className='w-full flex justify-end items-start h-full'>
                <Button className="justify-end"
                    text={"Ubah Data"}
                />
            </div>
        </div>

    )
}

export default page
