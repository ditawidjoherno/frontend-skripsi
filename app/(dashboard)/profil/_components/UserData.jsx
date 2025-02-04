"use client"
import useUser from "@/hooks/use-user"
import TeksProfil from "./TeksProfil"
import { useEffect, useState } from "react";
import { FaSpinner } from 'react-icons/fa';
import PopUpBox from "./PopUpBox";
import { useRouter } from "next/navigation";
import { IoIosArrowDropleftCircle } from "react-icons/io";


const UserData = (userData) => {
    const router = useRouter();

    const { loading, error, data, getUserData } = useUser()

    const handleGetDataUser = async () => {
        await getUserData();
    }

    useEffect(() => {
        handleGetDataUser();
    }, [])

    if (loading) {
        return (
            <div className="fixed inset-0 flex items-center justify-center">
                <FaSpinner className="animate-spin mr-2" /> Loading
            </div>
        );
    }

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

    if (data) {
        return (
            <div className={`bg-[#EAEAEA] h-screen flex flex-col items-center sm:pt-[75px] pt-[60px] sm:pr-6 pr-3 sm:ml-20 ml-10`}>
                <div className="flex items-center w-full">
                    <h2 className="sm:text-[40px] text-[24px] sm:ml-5 ml-4 font-semibold">
                        Profil
                    </h2>
                    <div>
                        <IoIosArrowDropleftCircle
                            className="sm:h-10 sm:w-10 h-5 w-5 sm:ml-3 ml-0 transition-colors duration-300 hover:text-gray-400 focus:text-gray-400 cursor-pointer"
                            onClick={handleGoBack}
                        />
                    </div>
                </div>

                <div className="bg-white rounded-2xl h-auto mb-5 sm:ml-5 ml-3 w-full sm:pt-10 pt-6 ">
                    <div className="sm:flex  sm:text-start text-center">
                        <div className="sm:mr-6 sm:flex">
                            <div className="sm:ml-6 ml-0 flex justify-center items-center">
                                <img
                                    src={data.foto_profil || '/img/profil.png'}
                                    alt="Foto Profil"
                                    className="sm:w-[250px] w-[100px] sm:h-[250px] h-[100px]"
                                />

                            </div>
                            <div>
                                <TeksProfil label="NIP:" value={data?.nip} />
                                <TeksProfil label="Nama:" value={capitalizeFirstLetter(data?.nama || "-")} />
                                <TeksProfil label="Tempat Lahir:" value={capitalizeFirstLetter(data?.tempat_lahir || "-")} />
                                <TeksProfil label="Tanggal Lahir:" value={capitalizeFirstLetter(data?.tanggal_lahir || "-")} />
                                <TeksProfil label="Jenis Kelamin:" value={capitalizeFirstLetter(data?.jenis_kelamin || "-")} />
                            </div>
                            <div className="sm:ml-[120px]">
                                <TeksProfil label="Alamat:" value={capitalizeFirstLetter(data?.alamat || "-")} />
                                <TeksProfil label="Jabatan:" value={capitalizeFirstLetter(data?.jabatan || "-")} />
                                <TeksProfil label="Email:" value={capitalizeFirstLetter(data?.email || "-")} />
                                <TeksProfil label="Nomor Telepon:" value={capitalizeFirstLetter(data?.nomor_hp || "-")} />
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-3 justify-end mb-5 sm:mr-5 mr-3">
                        <PopUpBox />
                    </div>
                </div>
            </div>
        )
    }
}

export default UserData
