"use client"
import { IoIosArrowDropleftCircle } from "react-icons/io";
import TeksProfil from '../_components/TeksProfil';
import Button from '../_components/button';
import useDetailAktivitas from "@/hooks/use-detail-aktivitas";
import useDataAktivitas from "@/hooks/use-data-aktivitas";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { FaSpinner } from 'react-icons/fa';
import { useRouter } from 'next/navigation';


const Page = () => {
    const { id } = useParams();
    const router = useRouter()

    const { loading, error, data, getUserData } = useDetailAktivitas(id);
    const { data: dataAktivitas, getUserData: GetDataAktivitas } = useDataAktivitas();
    const handleGetDataUser = async () => {
        await getUserData();
    }

    console.log("id:", id);

    useEffect(() => {
        getUserData();
        GetDataAktivitas();
    }, []);

    if (!data) {
        return;
    }
    console.log(data)

    const handleGoBack = () => {
        router.back();
    };


    const capitalizeFirstLetter = (string) => {
        if (string && typeof string === 'string' && string.length > 0) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        } else {
            return string;
        }
    };

    if (loading) {
        return (
            <div className="fixed inset-0 flex items-center justify-center">
                <FaSpinner className="animate-spin mr-2" /> Loading
            </div>
        );
    }

    return (
        <div className='bg-[#EAEAEA] h-full flex flex-col items-center sm:pt-[75px] pt-[60px] sm:pr-4 pr-3 sm:ml-20 ml-10'>
            <div className="flex items-center w-full">
                <h2 className="sm:text-[40px] text-[24px] sm:ml-5 ml-4 font-semibold">
                    Detail Aktivitas
                </h2>
                <div>
                <IoIosArrowDropleftCircle
                        className="sm:h-10 sm:w-10 h-5 w-5 sm:ml-3 ml-0 transition-colors duration-300 hover:text-gray-400 focus:text-gray-400 cursor-pointer"
                        onClick={handleGoBack}
                    />
                </div>
            </div>
            <div className='flex md:flex-row flex-col w-full pr-9 sm:mb-5 mb-3'>
                <div className="bg-white sm:max-w-full sm:min-w-[50%] rounded-2xl h-auto sm:ml-5 ml-3 w-full sm:mb-0 mb-5 sm:py-3 pt-6 ">
                    <h2 className='font-medium sm:text-[28px] text-[20px] sm:ml-11 ml-7'>Data Aktivitas</h2>
                    <hr className="my-3 mx-6 border-t-2 justify-center items-center border-black mt-1" />
                    <div className="sm:flex justify-start flex-wrap mb-5 w-full ">
                        <div className='sm:w-1/2 w-auto'>
                            <TeksProfil label="Nama Nasabah" value={capitalizeFirstLetter(data.nama_nasabah)} />
                            <TeksProfil label="Alamat" value={capitalizeFirstLetter(data.alamat)} />
                            <TeksProfil label="Nomor Telepon Nasabah" value={capitalizeFirstLetter(data.nomor_hp_nasabah)} />
                            <TeksProfil label="Aktivitas" value={capitalizeFirstLetter(data.nama_aktivitas)} />
                            <TeksProfil label="Tipe Nasabah" value={capitalizeFirstLetter(data.tipe_nasabah)} />
                            <TeksProfil label="Prospek" value={capitalizeFirstLetter(data.prospek)} />
                        </div>
                        <div className="sm:w-1/2 w-auto">
                            <TeksProfil label="Nominal Prospek" value={capitalizeFirstLetter(data.nominal_prospek)} />
                            <TeksProfil label="Closing" value={capitalizeFirstLetter(data.closing)} />
                            <TeksProfil label="Status Aktivitas" value={capitalizeFirstLetter(data.status_aktivitas)} />
                            <TeksProfil label="Keterangan AKtivitas" value={capitalizeFirstLetter(data.keterangan_aktivitas)} />
                            <TeksProfil label="Aktivitas Sales" value={capitalizeFirstLetter(data.aktivitas_sales)} />
                        </div>

                    </div>
                </div>
            </div>
            <div className='flex w-full pr-9 sm:mb-5 -mb-3'>
                <div className="bg-white max-w-full  min-w-[50%] rounded-2xl h-auto sm:ml-5 ml-3 w-full sm:py-3 sm:pt-6 pt- ">
                    <h2 className='font-medium sm:text-[28px] text-[20px] sm:ml-11 ml-7'>Dokumentasi</h2>
                    <hr className="my-3 mx-6  border-t-2 justify-center items-center border-black mt-1" />
                    <div className='flex md:flex-row flex-col items-center justify-center mb-5'>
                        <img src={data.dokumentasi} alt={`Foto`} className="sm:w-[250px] w-[100px] sm:h-[250px] h-[100px] mx-9 sm:mb-0 mb-3" />
                    </div>
                </div>
            </div>
            {/* <div className='w-full flex justify-end items-start h-full'>
                <Button className="justify-end"
                    text={"Ubah Data"}
                />
            </div> */}
        </div>

    )
}

export default Page;
