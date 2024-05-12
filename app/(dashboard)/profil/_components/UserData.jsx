"use client"
import useUser from "@/hooks/use-user"
import TeksProfil from "./TeksProfil"
import { useEffect, useState } from "react";
import { FaSpinner } from 'react-icons/fa';

const UserData = (userData) => {
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

    
    const capitalizeFirstLetter = (string) => {
        if (string && typeof string === 'string' && string.length > 0) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        } else {
            return string;
        }
    };

    if (data) {
        return (
            <div className="sm:mr-6 sm:flex">
                <div className="sm:ml-6 ml-0 flex justify-center items-center">
                    <img src={data.foto_profil || '/img/profil.png'} alt="Foto Profil" className="sm:w-[250px] w-[100px] sm:h-[250px] h-[100px]" />
                </div>
                <div>
                    <TeksProfil label="NIP:" value={data?.nip} />
                    <TeksProfil label="Nama:" value={capitalizeFirstLetter(data?.nama || "-")} />
                    <TeksProfil label="Tempat Lahir:" value={capitalizeFirstLetter(data?.tempat_lahir || "-")}/>
                    <TeksProfil label="Tanggal Lahir:" value={capitalizeFirstLetter(data?.tanggal_lahir || "-")} />
                    <TeksProfil label="Jenis Kelamin:" value={capitalizeFirstLetter(data?.jenis_kelamin || "-")} />
                </div>
                <div className="sm:ml-[120px]">
                    <TeksProfil label="Alamat:" value={capitalizeFirstLetter(data?.alamat || "-")} />
                    <TeksProfil label="Jabatan:" value={capitalizeFirstLetter(data?.jabatan || "-")} />
                    <TeksProfil label="Email:" value={capitalizeFirstLetter(data?.email || "-")} />
                    <TeksProfil label="Nomor Telepon:" value={capitalizeFirstLetter(data?.nomor_telepon || "-")} />
                </div>
            </div>
        )
    }
}

export default UserData
